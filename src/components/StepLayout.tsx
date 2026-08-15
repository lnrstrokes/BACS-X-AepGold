import React from 'react';
import { ArrowLeft, ArrowRight, Save, Check, Sparkles } from 'lucide-react';

interface StepLayoutProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  description?: string;
  onBack?: () => void;
  onContinue: () => void;
  continueText?: string;
  continueDisabled?: boolean;
  onSaveDraft?: () => void;
  draftSavedMessage?: string | null;
  children: React.ReactNode;
}

export const StepLayout: React.FC<StepLayoutProps> = ({
  stepNumber,
  totalSteps,
  title,
  description,
  onBack,
  onContinue,
  continueText = 'Continue',
  continueDisabled = false,
  onSaveDraft,
  draftSavedMessage,
  children,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-xs">
      {/* Step Header */}
      <div className="border-b border-slate-100 pb-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Step {stepNumber} of {totalSteps}
          </span>
          {draftSavedMessage && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60 animate-in fade-in duration-150">
              <Check className="w-3 h-3 text-emerald-600" />
              {draftSavedMessage}
            </span>
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-1.5 text-sm text-slate-600 leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>

      {/* Body Form Fields */}
      <div className="space-y-6">{children}</div>

      {/* Navigation Footer */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4 text-slate-500" />
              <span>Back</span>
            </button>
          )}
          {onSaveDraft && (
            <button
              type="button"
              onClick={onSaveDraft}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-700 text-sm font-medium transition-colors shadow-2xs"
            >
              <Save className="w-4 h-4 text-slate-500" />
              <span>Save draft</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={onContinue}
          disabled={continueDisabled}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-150 shadow-xs
            ${
              continueDisabled
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#0B192C] text-white hover:bg-[#152844] active:bg-[#07101E] focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:ring-offset-2 hover:shadow-md'
            }`}
        >
          {continueText === 'Generate Profile' && (
            <Sparkles className="w-4 h-4 text-[#C59B27]" />
          )}
          <span>{continueText}</span>
          {continueText !== 'Generate Profile' && (
            <ArrowRight className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
