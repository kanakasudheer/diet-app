
import React from 'react';
import type { WellnessGoal } from '@/types';
import { WellnessGoal as WellnessGoalEnum } from '@/types'; // Named import for enum value usage
import { WELLNESS_GOALS_OPTIONS, MuscleIcon, SkinIcon, AgingIcon, ConditionIcon } from '@/constants';

interface GoalSelectorProps {
  selectedGoal: WellnessGoal | null;
  onGoalChange: (goal: WellnessGoal | null) => void;
  conditionDetails: string;
  onConditionChange: (details: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const goalIcons: Record<WellnessGoal, React.FC<React.SVGProps<SVGSVGElement>>> = {
  [WellnessGoalEnum.BUILD_MUSCLE]: MuscleIcon,
  [WellnessGoalEnum.GLOWING_SKIN]: SkinIcon,
  [WellnessGoalEnum.HEALTHY_AGING]: AgingIcon,
  [WellnessGoalEnum.MANAGE_CONDITION]: ConditionIcon,
};


export const GoalSelector: React.FC<GoalSelectorProps> = ({
  selectedGoal,
  onGoalChange,
  conditionDetails,
  onConditionChange,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="goal" className="block text-lg font-semibold text-gray-800 mb-2">
          What's Your Wellness Goal?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {WELLNESS_GOALS_OPTIONS.map((option) => {
            const Icon = goalIcons[option.value];
            const isSelected = selectedGoal === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onGoalChange(option.value)}
                className={`p-4 rounded-lg border-2 flex flex-col items-center justify-center text-center transition-all duration-300 ease-out 
                  ${isSelected 
                    ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500 scale-105 shadow-lg' 
                    : 'border-gray-300 bg-white hover:border-emerald-400 hover:shadow-md hover:-translate-y-0.5 transform'}`}
                aria-pressed={isSelected}
              >
                <Icon className={`w-10 h-10 mb-2 transition-colors duration-300 ${isSelected ? 'text-emerald-600' : 'text-gray-500'}`} />
                <span className={`font-medium transition-colors duration-300 ${isSelected ? 'text-emerald-700' : 'text-gray-700'}`}>{option.label.substring(2)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${selectedGoal === WellnessGoalEnum.MANAGE_CONDITION ? 'max-h-48 opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0'}`}>
        <div> {/* Added a wrapper for potentially better animation control if needed, and margin consistency */}
          <label htmlFor="condition" className="block text-md font-medium text-gray-700 mb-1">
            Please specify your health condition:
          </label>
          <input
            type="text"
            id="condition"
            value={conditionDetails}
            onChange={(e) => onConditionChange(e.target.value)}
            placeholder="e.g., Type 2 Diabetes, IBS, High Cholesterol"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-colors"
            disabled={isLoading}
            aria-label="Health condition details"
          />
        </div>
      </div>
      

      <button
        onClick={onSubmit}
        disabled={isLoading || !selectedGoal || (selectedGoal === WellnessGoalEnum.MANAGE_CONDITION && !conditionDetails.trim())}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transform hover:scale-102 active:scale-98 disabled:transform-none flex items-center justify-center text-lg"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Plan...
          </>
        ) : (
          'Get My Diet Plan'
        )}
      </button>
    </div>
  );
};
