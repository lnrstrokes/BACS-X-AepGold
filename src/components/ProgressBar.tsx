import React from 'react';
import { STEPS } from '../constants';
import { StepKey } from '../types';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStepIndex: number;
  onStepClick: (stepKey: StepKey) => void;
  maxStepReached: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStepIndex,
  onStepClick,
  maxStepReached,
}) => {
  const currentStep = STEPS[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex + 1) / STEPS.length) * 100);

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs mb-6">
      {/* Category & Status Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0B192C] bg-[#F4F7FB] px-2.5 py-1 rounded-md border border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
            PROFILE INTAKE
          </span>
          <span className="text-xs font-semibold text-slate-600">
            Step {currentStepIndex + 1} of {STEPS.length}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-[#0B192C]">
            {progressPercent}% Complete
          </span>
        </div>
      </div>

      {/* Step Title & Description */}
      <div className="mb-3">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
          {currentStep.title}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
          {currentStep.description}
        </p>
      </div>

      {/* Progress Track */}
      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-3">
        <div
          className="bg-[#0B192C] h-2 rounded-full transition-all duration-300 ease-out relative"
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-[#C59B27]" />
        </div>
      </div>

      {/* Desktop/Tablet Steps Pill Navigation */}
      <div className="hidden lg:grid grid-cols-11 gap-1 pt-1.5 border-t border-slate-100">
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isAccessible = idx <= maxStepReached;

          return (
            <button
              key={step.key}
              type="button"
              disabled={!isAccessible}
              onClick={() => isAccessible && onStepClick(step.key)}
              title={`${step.number}. ${step.title}`}
              className={`flex flex-col items-center text-center p-1.5 rounded-lg transition-all text-[11px]
                ${
                  isCurrent
                    ? 'bg-[#0B192C] text-white font-semibold shadow-xs'
                    : isCompleted
                    ? 'text-slate-700 hover:bg-slate-100'
                    : isAccessible
                    ? 'text-slate-500 hover:bg-slate-50'
                    : 'text-slate-300 cursor-not-allowed'
                }`}
            >
              <div className="flex items-center justify-center w-4 h-4 rounded-full text-[9px] mb-0.5">
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                ) : (
                  <span className={isCurrent ? 'text-[#C59B27] font-bold' : ''}>
                    {idx + 1}
                  </span>
                )}
              </div>
              <span className="truncate max-w-full block font-medium">
                {step.shortTitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
