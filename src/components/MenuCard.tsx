
import React from 'react';
import { Clock, Users, ChefHat } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MenuCardProps {
  day: string;
  meals: {
    name: string;
    link: string;
    ingredients: string[];
    prepTime: string;
    type: string;
  }[];
}

const MenuCard = ({ day, meals }: MenuCardProps) => {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="w-5 h-5" />
          {day}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {meals.map((meal, index) => (
          <div key={index} className="border-l-4 border-orange-200 pl-4 py-2">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-800">{meal.name}</h4>
              <Badge variant="secondary" className="text-xs">
                {meal.type}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Ingredientes:</strong> {meal.ingredients.join(', ')}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {meal.prepTime}
              </span>
              <a 
                href={meal.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-800 underline"
              >
                Ver receita completa
              </a>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MenuCard;
