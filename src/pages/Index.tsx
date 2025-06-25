
import React from 'react';
import ChatInterface from '@/components/ChatInterface';
import { ChefHat, Heart, Star, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Receitas da Frida</h1>
                <p className="text-sm text-gray-600">Cardápios inteligentes e deliciosos</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>+10k usuários</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>4.9/5</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Receitas testadas</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Gere seu cardápio semanal personalizado
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nossa assistente culinária inteligente cria cardápios únicos baseados nas suas 
            preferências e restrições alimentares. Praticidade e sabor na medida certa!
          </p>
        </div>

        <ChatInterface />

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Receitas Testadas</h3>
            <p className="text-gray-600 text-sm">
              Todas as receitas são testadas pela Frida e aprovadas pela comunidade
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Personalizado</h3>
            <p className="text-gray-600 text-sm">
              Cardápios únicos que respeitam suas restrições e preferências
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Praticidade</h3>
            <p className="text-gray-600 text-sm">
              Receitas rápidas e ingredientes que você já tem em casa
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2024 Receitas da Frida - Todos os direitos reservados</p>
            <p className="text-sm">
              Feito com <Heart className="w-4 h-4 text-red-500 inline" /> para amantes da boa comida
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
