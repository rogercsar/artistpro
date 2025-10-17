import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { MessageCircle, Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactName: string;
  contactType: 'dancer' | 'contractor';
  contactInfo?: {
    email?: string;
    phone?: string;
    whatsapp?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  contactName,
  contactType,
  contactInfo = {}
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  const contactMethods = [
    {
      id: 'chat',
      name: 'Chat Interno',
      description: 'Enviar mensagem através da plataforma',
      icon: <MessageCircle className="h-6 w-6" />,
      available: true
    },
    {
      id: 'email',
      name: 'Email',
      description: contactInfo.email || 'Email não disponível',
      icon: <Mail className="h-6 w-6" />,
      available: !!contactInfo.email
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      description: contactInfo.whatsapp || contactInfo.phone || 'WhatsApp não disponível',
      icon: <Phone className="h-6 w-6" />,
      available: !!(contactInfo.whatsapp || contactInfo.phone)
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: contactInfo.instagram || 'Instagram não disponível',
      icon: <Instagram className="h-6 w-6" />,
      available: !!contactInfo.instagram
    },
    {
      id: 'facebook',
      name: 'Facebook',
      description: contactInfo.facebook || 'Facebook não disponível',
      icon: <Facebook className="h-6 w-6" />,
      available: !!contactInfo.facebook
    },
    {
      id: 'twitter',
      name: 'Twitter',
      description: contactInfo.twitter || 'Twitter não disponível',
      icon: <Twitter className="h-6 w-6" />,
      available: !!contactInfo.twitter
    }
  ];

  const handleContact = () => {
    if (!selectedMethod) return;

    switch (selectedMethod) {
      case 'chat':
        // Implementar navegação para chat interno
        alert('Redirecionando para o chat interno...');
        onClose();
        break;
      case 'email':
        if (contactInfo.email) {
          window.open(`mailto:${contactInfo.email}`, '_blank');
        }
        break;
      case 'whatsapp':
        const phone = contactInfo.whatsapp || contactInfo.phone;
        if (phone) {
          const cleanPhone = phone.replace(/\D/g, '');
          window.open(`https://wa.me/55${cleanPhone}`, '_blank');
        }
        break;
      case 'instagram':
        if (contactInfo.instagram) {
          window.open(`https://instagram.com/${contactInfo.instagram.replace('@', '')}`, '_blank');
        }
        break;
      case 'facebook':
        if (contactInfo.facebook) {
          window.open(contactInfo.facebook, '_blank');
        }
        break;
      case 'twitter':
        if (contactInfo.twitter) {
          window.open(`https://twitter.com/${contactInfo.twitter.replace('@', '')}`, '_blank');
        }
        break;
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Contatar ${contactName}`}
      className="max-w-md"
    >
      <div className="space-y-4">
        <p className="text-gray-600 text-sm">
          Escolha como você gostaria de entrar em contato com {contactName}:
        </p>

        <div className="space-y-3">
          {contactMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              disabled={!method.available}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                selectedMethod === method.id
                  ? 'border-primary-500 bg-primary-50'
                  : method.available
                  ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`${method.available ? 'text-primary-600' : 'text-gray-400'}`}>
                  {method.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className={`font-medium ${method.available ? 'text-gray-900' : 'text-gray-500'}`}>
                    {method.name}
                  </h3>
                  <p className={`text-sm ${method.available ? 'text-gray-600' : 'text-gray-400'}`}>
                    {method.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {selectedMethod && (
          <div className="pt-4 border-t">
            <div className="flex space-x-3">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleContact}
                className="flex-1"
              >
                Contatar
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

