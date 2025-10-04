import React from 'react';
import { Loader2 } from 'lucide-react';

interface ProgressDisplayProps {
  percentage: number;
  className?: string;
}

export function ProgressDisplay({ percentage, className = '' }: ProgressDisplayProps) {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 56}`}
            strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
            className="text-blue-600 transition-all duration-500 ease-out"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-700">{percentage}%</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-gray-600">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm font-medium">Génération du code en cours...</span>
      </div>
    </div>
  );
}
