import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-primary-600 mb-4">404</div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Página não encontrada
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Voltar ao Início
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ver Eventos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};


