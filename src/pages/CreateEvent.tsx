import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, DollarSign, Upload, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { createEvent } from '../services/api';

export const CreateEvent: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    duration: '',
    maxParticipants: '',
    budgetMin: '',
    budgetMax: '',
    requirements: [''],
    danceStyles: [] as string[],
    images: [] as string[],
    category: 'dance' as 'dance' | 'theater' | 'clowning' | 'music'
  });
  const [isLoading, setIsLoading] = useState(false);

  const danceStylesOptions = [
    'Ballet Clássico',
    'Dança Contemporânea',
    'Hip-Hop',
    'Jazz',
    'Street Dance',
    'Breaking',
    'Salsa',
    'Bachata',
    'Forró',
    'Samba',
    'Funk',
    'Dança do Ventre'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload: any = {
        title: formData.title,
        description: formData.description,
        contractor_id: user!.id,
        category: formData.category,
        location: formData.location,
        date: formData.date,
        time: formData.time,
        duration: formData.duration ? Number(formData.duration) : null,
        requirements: formData.requirements.filter(r => (r || '').trim() !== ''),
        genres: formData.danceStyles,
        budget_min: formData.budgetMin ? Number(formData.budgetMin) : null,
        budget_max: formData.budgetMax ? Number(formData.budgetMax) : null,
        max_participants: formData.maxParticipants ? Number(formData.maxParticipants) : null,
        images: formData.images
      };
      const res = await createEvent(payload);
      if (!res.ok) {
        console.error('Erro ao criar evento', res.error);
        alert('Não foi possível criar o evento. Verifique sua sessão e tente novamente.');
        setIsLoading(false);
        return;
      }
      navigate('/events');
    } catch (err) {
      console.error(err);
      alert('Ocorreu um erro inesperado ao criar o evento.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const toggleDanceStyle = (style: string) => {
    setFormData(prev => ({
      ...prev,
      danceStyles: prev.danceStyles.includes(style)
        ? prev.danceStyles.filter(s => s !== style)
        : [...prev.danceStyles, style]
    }));
  };

  if (user?.type !== 'contractor') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h1>
          <p className="text-gray-600 mb-6">Apenas contratantes podem criar eventos.</p>
          <Button asChild>
            <a href="/events">Voltar aos Eventos</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
          Criar Novo Evento
        </h1>
        <p className="text-lg text-gray-600">
          Publique uma oportunidade para bailarinos
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Informações Básicas</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    <option value="dance">Dança</option>
                    <option value="theater">Teatro</option>
                    <option value="clowning">Clown</option>
                    <option value="music">Música</option>
                  </select>
                </div>
                <Input
                  label="Título do Evento"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Audição para Espetáculo de Dança Contemporânea"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descreva o evento, o que você está procurando, etc."
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Local"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Ex: Teatro Municipal - São Paulo, SP"
                    leftIcon={<MapPin className="h-5 w-5" />}
                    required
                  />

                  <Input
                    label="Data"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    leftIcon={<Calendar className="h-5 w-5" />}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Horário"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    leftIcon={<Clock className="h-5 w-5" />}
                    required
                  />

                  <Input
                    label="Duração (horas)"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Ex: 3"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget and Participants */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Orçamento e Participantes</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número Máximo de Participantes
                  </label>
                  <Input
                    name="maxParticipants"
                    type="number"
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    placeholder="Ex: 10"
                    leftIcon={<Users className="h-5 w-5" />}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Orçamento (opcional)
                  </label>
                  <div className="flex space-x-2">
                    <Input
                      name="budgetMin"
                      type="number"
                      value={formData.budgetMin}
                      onChange={handleChange}
                      placeholder="Mínimo"
                      leftIcon={<DollarSign className="h-5 w-5" />}
                    />
                    <Input
                      name="budgetMax"
                      type="number"
                      value={formData.budgetMax}
                      onChange={handleChange}
                      placeholder="Máximo"
                      leftIcon={<DollarSign className="h-5 w-5" />}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dance Styles */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Estilos de Dança</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {danceStylesOptions.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => toggleDanceStyle(style)}
                    className={`p-3 rounded-lg border-2 text-center transition-colors ${
                      formData.danceStyles.includes(style)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Requisitos</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      value={requirement}
                      onChange={(e) => handleRequirementChange(index, e.target.value)}
                      placeholder="Ex: Experiência mínima de 3 anos"
                      className="flex-1"
                    />
                    {formData.requirements.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeRequirement(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addRequirement}
                  className="w-full"
                >
                  Adicionar Requisito
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">Imagens (opcional)</h3>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Arraste e solte imagens aqui ou clique para selecionar</p>
                <p className="text-sm text-gray-500">PNG, JPG até 10MB cada</p>
                <Button type="button" variant="outline" className="mt-4">
                  Selecionar Imagens
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/events')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={!formData.title || !formData.description || !formData.location || !formData.date || !formData.time}
            >
              Criar Evento
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};


