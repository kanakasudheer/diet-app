
import React from 'react';
import type { DietPlan, FoodSuggestion, KeyNutrient, FoodToLimit } from '@/types';
import { LeafIcon, InfoIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@/constants';

// Card component is now internal to DietPlanDisplay to simplify prop drilling for animation delays
// It's not exported but used by MealCard and InfoListCard structure

interface MealCardProps {
  title: string;
  items: FoodSuggestion[];
  icon: React.ReactNode;
  cardAnimationDelay: string;
  listItemBaseDelay: number;
}

const MealCardInternal: React.FC<MealCardProps> = ({ title, items, icon, cardAnimationDelay, listItemBaseDelay }) => (
  <div 
    className="bg-white p-6 rounded-xl shadow-lg transition-shadow hover:shadow-xl opacity-0 animate-slideInUpStagger"
    style={{ animationDelay: cardAnimationDelay }}
  >
    <div className="flex items-center mb-4">
      {icon && <span className="mr-3 text-emerald-600">{icon}</span>}
      <h3 className="text-2xl font-semibold text-emerald-700" style={{fontFamily: "'Inter', sans-serif"}}>{title}</h3>
    </div>
    {items && items.length > 0 ? (
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li 
            key={index} 
            className="p-3 bg-emerald-50 rounded-lg shadow-sm opacity-0 animate-slideInUpStagger"
            style={{ animationDelay: `${listItemBaseDelay + index * 0.05 + 0.1}s` }}
          >
            <p className="font-semibold text-gray-800">{item.food}</p>
            <p className="text-sm text-gray-600 italic">{item.benefit}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No suggestions provided for this meal.</p>
    )}
  </div>
);

interface InfoListCardInternalProps<T> {
  title: string;
  items: T[];
  renderItem: (item: T, index: number, baseDelay: number) => React.ReactNode;
  icon: React.ReactNode;
  cardAnimationDelay: string;
  listItemBaseDelay: number;
}

const InfoListCardInternal = <T,>({ title, items, renderItem, icon, cardAnimationDelay, listItemBaseDelay }: InfoListCardInternalProps<T>) => (
  <div 
    className="bg-white p-6 rounded-xl shadow-lg transition-shadow hover:shadow-xl opacity-0 animate-slideInUpStagger"
    style={{ animationDelay: cardAnimationDelay }}
  >
    <div className="flex items-center mb-4">
      {icon && <span className="mr-3 text-emerald-600">{icon}</span>}
      <h3 className="text-2xl font-semibold text-emerald-700" style={{fontFamily: "'Inter', sans-serif"}}>{title}</h3>
    </div>
    {items && items.length > 0 ? (
      <ul className="space-y-3">
        {items.map((item, index) => renderItem(item, index, listItemBaseDelay))}
      </ul>
    ) : (
      <p className="text-gray-500">No information provided for this section.</p>
    )}
  </div>
);

export const DietPlanDisplay: React.FC<{ dietPlan: DietPlan }> = ({ dietPlan }) => {
  // Base delays for cards themselves
  const cardDelays = {
    header: '0s',
    breakfast: '0.2s',
    lunch: '0.3s',
    dinner: '0.4s',
    snacks: '0.5s',
    keyNutrients: '0.6s',
    foodsToLimit: '0.7s',
    generalTips: '0.8s',
  };

  // Base delays for items within cards (starts after card animation begins)
  // These are relative to the card's appearance.
  const listItemBaseDelayValue = 0.1; // A small delay for items to start after card appears

  return (
    <div className="space-y-8">
      <div 
        className="text-center p-6 bg-emerald-600 text-white rounded-xl shadow-md opacity-0 animate-popIn"
        style={{ animationDelay: cardDelays.header }}
      >
        <h2 className="text-3xl font-bold mb-2" style={{fontFamily: "'Pacifico', cursive"}}>{dietPlan.goal}</h2>
        <p className="text-lg italic">{dietPlan.overview}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <MealCardInternal 
            title="🍳 Breakfast" 
            items={dietPlan.meals.breakfast} 
            icon={<LeafIcon className="w-7 h-7" />}
            cardAnimationDelay={cardDelays.breakfast}
            listItemBaseDelay={parseFloat(cardDelays.breakfast) + listItemBaseDelayValue}
        />
        <MealCardInternal 
            title="🥗 Lunch" 
            items={dietPlan.meals.lunch} 
            icon={<LeafIcon className="w-7 h-7" />}
            cardAnimationDelay={cardDelays.lunch}
            listItemBaseDelay={parseFloat(cardDelays.lunch) + listItemBaseDelayValue}
        />
        <MealCardInternal 
            title="🍲 Dinner" 
            items={dietPlan.meals.dinner} 
            icon={<LeafIcon className="w-7 h-7" />}
            cardAnimationDelay={cardDelays.dinner}
            listItemBaseDelay={parseFloat(cardDelays.dinner) + listItemBaseDelayValue}
        />
        <MealCardInternal 
            title="🍎 Snacks" 
            items={dietPlan.meals.snacks} 
            icon={<LeafIcon className="w-7 h-7" />}
            cardAnimationDelay={cardDelays.snacks}
            listItemBaseDelay={parseFloat(cardDelays.snacks) + listItemBaseDelayValue}
        />
      </div>
      
      <InfoListCardInternal<KeyNutrient>
        title="🔑 Key Nutrients"
        items={dietPlan.keyNutrients}
        icon={<InfoIcon className="w-7 h-7" />}
        cardAnimationDelay={cardDelays.keyNutrients}
        listItemBaseDelay={parseFloat(cardDelays.keyNutrients) + listItemBaseDelayValue}
        renderItem={(item, index, baseDelay) => (
          <li 
            key={index} 
            className="p-3 bg-sky-50 rounded-lg shadow-sm opacity-0 animate-slideInUpStagger"
            style={{ animationDelay: `${baseDelay + index * 0.05 + 0.1}s` }}
          >
            <p className="font-semibold text-sky-800">{item.nutrient}</p>
            <p className="text-sm text-gray-600">{item.explanation}</p>
          </li>
        )}
      />

      <InfoListCardInternal<FoodToLimit>
        title="🚫 Foods to Limit"
        items={dietPlan.foodsToLimit}
        icon={<ExclamationTriangleIcon className="w-7 h-7" />}
        cardAnimationDelay={cardDelays.foodsToLimit}
        listItemBaseDelay={parseFloat(cardDelays.foodsToLimit) + listItemBaseDelayValue}
        renderItem={(item, index, baseDelay) => (
          <li 
            key={index} 
            className="p-3 bg-red-50 rounded-lg shadow-sm opacity-0 animate-slideInUpStagger"
            style={{ animationDelay: `${baseDelay + index * 0.05 + 0.1}s` }}
          >
            <p className="font-semibold text-red-800">{item.foodType}</p>
            <p className="text-sm text-gray-600">{item.reason}</p>
          </li>
        )}
      />

      <InfoListCardInternal<string>
        title="💡 General Tips"
        items={dietPlan.generalTips}
        icon={<CheckCircleIcon className="w-7 h-7" />}
        cardAnimationDelay={cardDelays.generalTips}
        listItemBaseDelay={parseFloat(cardDelays.generalTips) + listItemBaseDelayValue}
        renderItem={(tip, index, baseDelay) => (
          <li 
            key={index} 
            className="p-3 bg-yellow-50 rounded-lg shadow-sm text-yellow-800 flex items-start opacity-0 animate-slideInUpStagger"
            style={{ animationDelay: `${baseDelay + index * 0.05 + 0.1}s` }}
          >
            <CheckCircleIcon className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-yellow-600" />
            <span>{tip}</span>
          </li>
        )}
      />
    </div>
  );
};
