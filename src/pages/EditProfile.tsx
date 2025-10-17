import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Camera, 
  Video, 
  Upload, 
  X, 
  Save, 
  ArrowLeft, 
  Plus, 
  Trash2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Globe,
  Instagram,
  Youtube,
  Facebook,
  Twitter
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../utils/cn';

export const EditProfile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // Refs para inputs de arquivo
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  
  // Estados do formulário
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    birthDate: user?.birthDate || '',
    website: user?.website || '',
    socialMedia: {
      instagram: user?.socialMedia?.instagram || '',
      facebook: user?.socialMedia?.facebook || '',
      twitter: user?.socialMedia?.twitter || '',
    }
  });

  // Estados para bailarinos
  const [dancerData, setDancerData] = useState({
    skills: [] as string[],
    danceStyles: [] as string[],
    experience: '',
    availability: {
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
    },
    portfolio: {
      photos: [] as string[],
      videos: [] as string[],
    }
  });

  // Estados para contratantes
  const [contractorData, setContractorData] = useState({
    companyName: '',
    companyDescription: '',
    companyLogo: '',
  });

  // Estados de UI
  const [activeTab, setActiveTab] = useState<'basic' | 'portfolio' | 'social' | 'availability'>('basic');
  const [isLoading, setIsLoading] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newDanceStyle, setNewDanceStyle] = useState('');

  // Opções disponíveis
  const availableSkills = [
    'Ballet Clássico', 'Dança Contemporânea', 'Hip-Hop', 'Jazz', 'Street Dance', 
    'Breaking', 'Salsa', 'Bachata', 'Tango', 'Flamenco', 'Dança do Ventre', 
    'K-Pop', 'Afro', 'Axé', 'Forró', 'Samba', 'Funk', 'Pole Dance'
  ];

  const availableDanceStyles = [
    'Ballet Clássico', 'Dança Contemporânea', 'Hip-Hop', 'Jazz', 'Street Dance', 
    'Breaking', 'Salsa', 'Bachata', 'Tango', 'Flamenco', 'Dança do Ventre', 
    'K-Pop', 'Afro', 'Axé', 'Forró', 'Samba', 'Funk', 'Pole Dance', 'Vogue'
  ];

  const daysOfWeek = [
    { key: 'sunday', label: 'Domingo' },
    { key: 'monday', label: 'Segunda' },
    { key: 'tuesday', label: 'Terça' },
    { key: 'wednesday', label: 'Quarta' },
    { key: 'thursday', label: 'Quinta' },
    { key: 'friday', label: 'Sexta' },
    { key: 'saturday', label: 'Sábado' },
  ];

  // Carregar dados do usuário
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
        birthDate: user.birthDate || '',
        website: user.website || '',
        socialMedia: {
          instagram: user.socialMedia?.instagram || '',
          facebook: user.socialMedia?.facebook || '',
          twitter: user.socialMedia?.twitter || '',
        }
      });

      // Carregar dados específicos do tipo de usuário
      if (user.type === 'dancer') {
        // Aqui você carregaria os dados específicos do bailarino
        // Por enquanto, vamos usar dados padrão
      } else if (user.type === 'contractor') {
        // Aqui você carregaria os dados específicos do contratante
        // Por enquanto, vamos usar dados padrão
      }
    }
  }, [user]);

  // Função para alterar avatar
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatarUrl = e.target?.result as string;
        updateProfile({ avatar: newAvatarUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  // Função para adicionar foto ao portfólio
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhotoUrl = e.target?.result as string;
          setDancerData(prev => ({
            ...prev,
            portfolio: {
              ...prev.portfolio,
              photos: [...prev.portfolio.photos, newPhotoUrl]
            }
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Função para adicionar vídeo ao portfólio
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newVideoUrl = e.target?.result as string;
          setDancerData(prev => ({
            ...prev,
            portfolio: {
              ...prev.portfolio,
              videos: [...prev.portfolio.videos, newVideoUrl]
            }
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Função para remover foto/vídeo do portfólio
  const removeFromPortfolio = (type: 'photos' | 'videos', index: number) => {
    setDancerData(prev => ({
      ...prev,
      portfolio: {
        ...prev.portfolio,
        [type]: prev.portfolio[type].filter((_, i) => i !== index)
      }
    }));
  };

  // Função para adicionar habilidade
  const addSkill = () => {
    if (newSkill && !dancerData.skills.includes(newSkill)) {
      setDancerData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill('');
    }
  };

  // Função para remover habilidade
  const removeSkill = (skill: string) => {
    setDancerData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  // Função para adicionar estilo de dança
  const addDanceStyle = () => {
    if (newDanceStyle && !dancerData.danceStyles.includes(newDanceStyle)) {
      setDancerData(prev => ({
        ...prev,
        danceStyles: [...prev.danceStyles, newDanceStyle]
      }));
      setNewDanceStyle('');
    }
  };

  // Função para remover estilo de dança
  const removeDanceStyle = (style: string) => {
    setDancerData(prev => ({
      ...prev,
      danceStyles: prev.danceStyles.filter(s => s !== style)
    }));
  };

  // Função para salvar perfil
  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      // Salvar dados básicos
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        birthDate: formData.birthDate,
        website: formData.website,
        socialMedia: formData.socialMedia,
      });

      // Aqui você salvaria os dados específicos do tipo de usuário
      // Por exemplo, para bailarinos: skills, danceStyles, portfolio, etc.
      
      alert('Perfil atualizado com sucesso!');
      navigate(`/profile/${user?.id}`);
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      alert('Erro ao salvar perfil. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para lidar com mudanças no formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('socialMedia.')) {
      const socialKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h1>
            <p className="text-gray-600 mb-6">Você precisa estar logado para editar o perfil.</p>
            <Button onClick={() => navigate('/login')}>
              Fazer Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate(`/profile/${user.id}`)}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Editar Perfil</h1>
            </div>
            <Button
              onClick={handleSaveProfile}
              disabled={isLoading}
              className="flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de Navegação */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {[
                    { id: 'basic', label: 'Informações Básicas', icon: User },
                    { id: 'portfolio', label: 'Portfólio', icon: Camera },
                    { id: 'social', label: 'Redes Sociais', icon: Globe },
                    { id: 'availability', label: 'Disponibilidade', icon: Calendar },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                          'w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors',
                          activeTab === tab.id
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        )}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-3">
            {/* Aba Informações Básicas */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                {/* Avatar */}
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-gray-900">Foto do Perfil</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <img
                          src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                          alt={user.name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        <button
                          onClick={() => avatarInputRef.current?.click()}
                          className="absolute -bottom-2 -right-2 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
                        >
                          <Camera className="h-4 w-4" />
                        </button>
                        <input
                          ref={avatarInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => avatarInputRef.current?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Alterar Foto
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Informações Pessoais */}
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-gray-900">Informações Pessoais</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          label="Nome completo"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <Input
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          disabled
                          helperText="O email não pode ser alterado"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          label="Telefone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(11) 99999-9999"
                        />
                        <Input
                          label="Data de Nascimento"
                          name="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          label="Localização"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="Cidade, Estado"
                        />
                        <Input
                          label="Website"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="https://seu-site.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Biografia
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          rows={4}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="Fale um pouco sobre você..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dados específicos para bailarinos */}
                {user.type === 'dancer' && (
                  <>
                    {/* Habilidades */}
                    <Card>
                      <CardHeader>
                        <h3 className="font-semibold text-gray-900">Habilidades</h3>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex space-x-2">
                            <select
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            >
                              <option value="">Selecione uma habilidade</option>
                              {availableSkills.map(skill => (
                                <option key={skill} value={skill}>{skill}</option>
                              ))}
                            </select>
                            <Button onClick={addSkill} disabled={!newSkill}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {dancerData.skills.map(skill => (
                              <span
                                key={skill}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-700"
                              >
                                {skill}
                                <button
                                  onClick={() => removeSkill(skill)}
                                  className="ml-2 text-primary-500 hover:text-primary-700"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Estilos de Dança */}
                    <Card>
                      <CardHeader>
                        <h3 className="font-semibold text-gray-900">Estilos de Dança</h3>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex space-x-2">
                            <select
                              value={newDanceStyle}
                              onChange={(e) => setNewDanceStyle(e.target.value)}
                              className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            >
                              <option value="">Selecione um estilo</option>
                              {availableDanceStyles.map(style => (
                                <option key={style} value={style}>{style}</option>
                              ))}
                            </select>
                            <Button onClick={addDanceStyle} disabled={!newDanceStyle}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {dancerData.danceStyles.map(style => (
                              <span
                                key={style}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary-100 text-secondary-700"
                              >
                                {style}
                                <button
                                  onClick={() => removeDanceStyle(style)}
                                  className="ml-2 text-secondary-500 hover:text-secondary-700"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Experiência */}
                    <Card>
                      <CardHeader>
                        <h3 className="font-semibold text-gray-900">Experiência</h3>
                      </CardHeader>
                      <CardContent>
                        <textarea
                          value={dancerData.experience}
                          onChange={(e) => setDancerData(prev => ({ ...prev, experience: e.target.value }))}
                          rows={4}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                          placeholder="Descreva sua experiência em dança..."
                        />
                      </CardContent>
                    </Card>
                  </>
                )}

                {/* Dados específicos para contratantes */}
                {user.type === 'contractor' && (
                  <Card>
                    <CardHeader>
                      <h3 className="font-semibold text-gray-900">Informações da Empresa</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <Input
                          label="Nome da Empresa"
                          value={contractorData.companyName}
                          onChange={(e) => setContractorData(prev => ({ ...prev, companyName: e.target.value }))}
                          placeholder="Nome da sua empresa"
                        />
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Descrição da Empresa
                          </label>
                          <textarea
                            value={contractorData.companyDescription}
                            onChange={(e) => setContractorData(prev => ({ ...prev, companyDescription: e.target.value }))}
                            rows={4}
                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            placeholder="Descreva sua empresa..."
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Aba Portfólio (apenas para bailarinos) */}
            {activeTab === 'portfolio' && user.type === 'dancer' && (
              <div className="space-y-6">
                {/* Fotos */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Fotos</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => photoInputRef.current?.click()}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Fotos
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    {dancerData.portfolio.photos.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {dancerData.portfolio.photos.map((photo, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={photo}
                              alt={`Foto ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => removeFromPortfolio('photos', index)}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Camera className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Nenhuma foto no portfólio</p>
                        <p className="text-sm">Clique em "Adicionar Fotos" para começar</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Vídeos */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Vídeos</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => videoInputRef.current?.click()}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Vídeos
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      multiple
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    {dancerData.portfolio.videos.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dancerData.portfolio.videos.map((video, index) => (
                          <div key={index} className="relative group">
                            <video
                              src={video}
                              className="w-full h-48 object-cover rounded-lg"
                              controls
                            />
                            <button
                              onClick={() => removeFromPortfolio('videos', index)}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Video className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Nenhum vídeo no portfólio</p>
                        <p className="text-sm">Clique em "Adicionar Vídeos" para começar</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Aba Redes Sociais */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-gray-900">Redes Sociais</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <Instagram className="h-5 w-5 text-pink-500" />
                        <Input
                          label="Instagram"
                          name="socialMedia.instagram"
                          value={formData.socialMedia.instagram}
                          onChange={handleChange}
                          placeholder="@seuusuario"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Facebook className="h-5 w-5 text-blue-500" />
                        <Input
                          label="Facebook"
                          name="socialMedia.facebook"
                          value={formData.socialMedia.facebook}
                          onChange={handleChange}
                          placeholder="https://facebook.com/seuperfil"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Twitter className="h-5 w-5 text-blue-400" />
                        <Input
                          label="Twitter"
                          name="socialMedia.twitter"
                          value={formData.socialMedia.twitter}
                          onChange={handleChange}
                          placeholder="@seuusuario"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Aba Disponibilidade (apenas para bailarinos) */}
            {activeTab === 'availability' && user.type === 'dancer' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-gray-900">Disponibilidade</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-4">
                      {daysOfWeek.map((day) => (
                        <div key={day.key} className="text-center">
                          <div className="text-sm font-medium text-gray-700 mb-2">
                            {day.label}
                          </div>
                          <button
                            onClick={() => setDancerData(prev => ({
                              ...prev,
                              availability: {
                                ...prev.availability,
                                [day.key]: !prev.availability[day.key as keyof typeof prev.availability]
                              }
                            }))}
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                              dancerData.availability[day.key as keyof typeof dancerData.availability]
                                ? 'bg-green-100 text-green-800 border-2 border-green-300'
                                : 'bg-gray-100 text-gray-600 border-2 border-gray-300 hover:bg-gray-200'
                            }`}
                          >
                            {dancerData.availability[day.key as keyof typeof dancerData.availability] ? '✓' : '✗'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
