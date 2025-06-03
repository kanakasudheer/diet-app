
import React from 'react';
import { ExclamationTriangleIcon } from '@/constants';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div 
      className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md shadow-md opacity-0 animate-slideDownEnter" 
      role="alert"
      style={{ animationDelay: '0.1s' }} // Slight delay so it doesn't clash with other elements if they also appear
    >
      <div className="flex">
        <div className="py-1">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-3" />
        </div>
        <div>
          <p className="font-bold">Oops! Something went wrong.</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};
