
import React from 'react';
import { WellnessGoal } from './types';

export const WELLNESS_GOALS_OPTIONS: { value: WellnessGoal; label: string }[] = [
  { value: WellnessGoal.BUILD_MUSCLE, label: "💪 Build Muscle" },
  { value: WellnessGoal.GLOWING_SKIN, label: "✨ Glowing Skin" },
  { value: WellnessGoal.HEALTHY_AGING, label: "⏳ Healthy Aging" },
  { value: WellnessGoal.MANAGE_CONDITION, label: "🩺 Manage a Specific Health Condition" },
];

export const GEMINI_TEXT_MODEL = 'gemini-2.5-flash-preview-04-17';

// SVG Icons
export const AppTitleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6 11h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
     <path fillRule="evenodd" d="M15.048 6.41A6.53 6.53 0 0012.002 5C8.69 5 6.002 7.686 6.002 11v.038c.002.002.004.004.006.007a5.07 5.07 0 01.058.579C6.37 15.04 8.44 17 11.002 17c.104 0 .207-.007.31-.018l.06-.006c.05-.006.1-.013.148-.02.182-.023.36-.05.533-.081a4.51 4.51 0 003.304-3.983A4.501 4.501 0 0015.048 6.41zm-8.046 5.129c0-2.205 1.794-3.999 4-3.999s4 1.794 4 3.999c0 2.204-1.794 3.999-4 3.999s-4-1.795-4-3.999z" clipRule="evenodd" />
    <path d="M21.677 10.382a.864.864 0 00-.523-.813l-3.67-1.602a.808.808 0 00-.99.238.79.79 0 00-.097.968l1.093 2.558a3.486 3.486 0 01-2.195 2.866 3.486 3.486 0 01-3.714-.76L10.5 13.016a3.69 3.69 0 01-.025-4.416 3.739 3.739 0 014.485-.076l.004.003.017.014a.79.79 0 00.96-.23.808.808 0 00.145-.983l-1.32-2.883a5.28 5.28 0 00-6.406.108 5.22 5.22 0 00.036 6.307l1.08 1.016a1.938 1.938 0 002.758.013l.002-.002a1.92 1.92 0 00.615-2.25l-1.092-2.557a.79.79 0 00-.96-.438.808.808 0 00-.56.856l.865 2.024a.363.363 0 01-.05.329.37.37 0 01-.51.026L8.7 10.368a.808.808 0 00-1.05.076.79.79 0 00-.014 1.004l2.23 2.77a5.023 5.023 0 003.83 1.763h.002a5.024 5.024 0 004.593-3.216l1.45-3.387a.808.808 0 00-.064-.897z" />
  </svg>
);


export const LeafIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10 2c-1.717 0-3.362.443-4.78 1.254a.75.75 0 00-.604 1.224C5.47 6.19 6.5 7.673 6.5 9.5c0 1.596-.776 3.02-1.938 4.019a.75.75 0 00.538 1.33C6.34 14.97 8.098 15.5 10 15.5c1.717 0 3.362-.443 4.78-1.254a.75.75 0 00.604-1.224C14.53 11.81 13.5 10.327 13.5 8.5c0-1.596.776-3.02 1.938-4.019a.75.75 0 00-.538-1.33C13.66 2.03 11.902 1.5 10 1.5A3.501 3.501 0 0010 2zm0 12c-1.38 0-2.64-.36-3.71-.995.269-.04.545-.087.836-.137A5.001 5.001 0 0112.5 9.5c0-.782-.182-1.522-.5-2.164a2.474 2.474 0 00-.29-.392c1.114.674 1.79 1.83 1.79 3.056 0 1.826-1.141 3.37-2.73 3.928A6.973 6.973 0 0010 14z" clipRule="evenodd" />
  </svg>
);

export const MuscleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
  <path d="M7.5 4.25A2.25 2.25 0 005.25 6.5V7.5h9V6.5A2.25 2.25 0 0012.001 4.25H7.5zM16.5 9V7.585A3.75 3.75 0 0012.001 3h-4.502A3.75 3.75 0 003 6.585V9h13.5zM4.5 10.5v2.25A2.25 2.25 0 006.75 15h6.5A2.25 2.25 0 0015.5 12.75v-2.25H4.5z"/>
</svg>
);

export const SkinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
  <path fillRule="evenodd" d="M15.312 3.207c1.098.233 1.688 1.303 1.455 2.401l-.748 3.491c-.097.455-.33.873-.668 1.211l-3.492 3.491a.75.75 0 01-1.061 0l-2.121-2.121a.75.75 0 010-1.06L12.172 6.42c.338-.338.756-.57 1.21-.668l3.492-.748A.75.75 0 0115.312 3.207zM8.828 8.828a2.25 2.25 0 010 3.182L6.273 14.566a3.75 3.75 0 01-5.303-5.303L3.515 6.71a2.25 2.25 0 013.182 0l2.131 2.118z" clipRule="evenodd"/>
</svg>
);

export const AgingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd"/>
</svg>
);

export const ConditionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.823a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
  </svg>
);

export const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
);

export const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export const ExclamationTriangleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);
