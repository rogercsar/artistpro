import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Camera, Save, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Layout } from '../components/layout/Layout';

export const Settings: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
    birthDate: user?.birthDate || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      push: true,
      sms: false,
      eventUpdates: true,
      newMessages: true,
      profileViews: false,
      reviews: true
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false,
      showLocation: true,
      allowMessages: true
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      phone: formData.phone,
      location: formData.location,
      bio: formData.bio,
      birthDate: formData.birthDate
    });
    // Aqui você adicionaria lógica para salvar outras configurações
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => {
        const parentValue = prev[parent as keyof typeof prev] as Record<string, any>;
        return {
          ...prev,
          [parent]: {
            ...parentValue,
            [child]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
          }
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'privacy', label: 'Privacidade', icon: Shield },
    { id: 'appearance', label: 'Aparência', icon: Palette }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Configurações
          </h1>
          <p className="text-lg text-gray-600">
            Gerencie suas preferências e configurações da conta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de navegação */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
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

          {/* Conteúdo principal */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit}>
              {/* Aba Perfil */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <h3 className="font-semibold text-gray-900">Informações Pessoais</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-center space-x-6">
                          <div className="relative">
                            <img
                              src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                              alt={user?.name}
                              className="w-20 h-20 rounded-full object-cover"
                            />
                            <button
                              type="button"
                              className="absolute -bottom-2 -right-2 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
                            >
                              <Camera className="h-4 w-4" />
                            </button>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{user?.name}</h4>
                            <p className="text-sm text-gray-600">{user?.email}</p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Alterar Foto
                            </Button>
                          </div>
                        </div>

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
                            label="Localização"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Cidade, Estado"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Input
                            label="Data de Nascimento"
                            name="birthDate"
                            type="date"
                            value={formData.birthDate}
                            onChange={handleChange}
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
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                            placeholder="Conte um pouco sobre você..."
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="font-semibold text-gray-900">Alterar Senha</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Input
                          label="Senha atual"
                          name="currentPassword"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.currentPassword}
                          onChange={handleChange}
                          rightIcon={
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          }
                        />
                        <Input
                          label="Nova senha"
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleChange}
                        />
                        <Input
                          label="Confirmar nova senha"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Aba Notificações */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <h3 className="font-semibold text-gray-900">Preferências de Notificação</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-4">Canais de Notificação</h4>
                          <div className="space-y-3">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="notifications.email"
                                checked={formData.notifications.email}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              />
                              <span className="ml-3 text-sm text-gray-700">Email</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="notifications.push"
                                checked={formData.notifications.push}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              />
                              <span className="ml-3 text-sm text-gray-700">Notificações push</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="notifications.sms"
                                checked={formData.notifications.sms}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              />
                              <span className="ml-3 text-sm text-gray-700">SMS</span>
                            </label>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-4">Tipos de Notificação</h4>
                          <div className="space-y-3">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="notifications.eventUpdates"
                                checked={formData.notifications.eventUpdates}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              />
                              <span className="ml-3 text-sm text-gray-700">Atualizações de eventos</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="notifications.newMessages"
                                checked={formData.notifications.newMessages}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              />
                              <span className="ml-3 text-sm text-gray-700">Novas mensagens</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="notifications.profileViews"
                                checked={formData.notifications.profileViews}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              />
                              <span className="ml-3 text-sm text-gray-700">Visualizações do perfil</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="notifications.reviews"
                                checked={formData.notifications.reviews}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              />
                              <span className="ml-3 text-sm text-gray-700">Novas avaliações</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Aba Privacidade */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <h3 className="font-semibold text-gray-900">Configurações de Privacidade</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Visibilidade do Perfil
                          </label>
                          <select
                            name="privacy.profileVisibility"
                            value={formData.privacy.profileVisibility}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                          >
                            <option value="public">Público</option>
                            <option value="private">Privado</option>
                            <option value="contacts">Apenas contatos</option>
                          </select>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-4">Informações Visíveis</h4>
                          <div className="space-y-3">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="privacy.showEmail"
                                checked={formData.privacy.showEmail}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              />
                              <span className="ml-3 text-sm text-gray-700">Mostrar email</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="privacy.showPhone"
                                checked={formData.privacy.showPhone}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              />
                              <span className="ml-3 text-sm text-gray-700">Mostrar telefone</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="privacy.showLocation"
                                checked={formData.privacy.showLocation}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              />
                              <span className="ml-3 text-sm text-gray-700">Mostrar localização</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="privacy.allowMessages"
                                checked={formData.privacy.allowMessages}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              />
                              <span className="ml-3 text-sm text-gray-700">Permitir mensagens</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Aba Aparência */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <h3 className="font-semibold text-gray-900">Preferências de Aparência</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Idioma
                          </label>
                          <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                            <option value="pt-BR">Português (Brasil)</option>
                            <option value="en-US">English (US)</option>
                            <option value="es-ES">Español</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tema
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setTheme('light')}
                              className={`p-4 border-2 rounded-lg text-center transition-all ${
                                theme === 'light'
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-gray-300 bg-white hover:border-gray-400'
                              }`}
                            >
                              <div className="w-full h-8 bg-white border border-gray-300 rounded mb-2"></div>
                              <span className="text-sm font-medium">Claro</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setTheme('dark')}
                              className={`p-4 border-2 rounded-lg text-center transition-all ${
                                theme === 'dark'
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                              }`}
                            >
                              <div className="w-full h-8 bg-gray-800 border border-gray-600 rounded mb-2"></div>
                              <span className="text-sm font-medium">Escuro</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Botão de salvar */}
              <div className="flex justify-end pt-6">
                <Button type="submit" className="flex items-center">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

