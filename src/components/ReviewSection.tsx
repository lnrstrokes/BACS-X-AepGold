import React from 'react';
import { Pencil } from 'lucide-react';
import { StepKey } from '../types';

interface ReviewSectionProps {
  id: string;
  title: string;
  stepKey: StepKey;
  onEdit: (stepKey: StepKey) => void;
  children: React.ReactNode;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  id,
  title,
  stepKey,
  onEdit,
  children,
}) => {
  return (
    <div
      id={id}
      className="p-5 rounded-2xl border border-slate-200 bg-[#F4F7FB]/70 hover:bg-[#F4F7FB] transition-colors"
    >
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-3.5">
        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0B192C]">
          {title}
        </h3>
        <button
          type="button"
          onClick={() => onEdit(stepKey)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-[#0B192C] bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs"
        >
          <Pencil className="w-3 h-3 text-slate-500" />
          <span>Edit</span>
        </button>
      </div>
      <div className="space-y-2.5 text-sm text-slate-700">{children}</div>
    </div>
  );
};

export const ReviewItem: React.FC<{
  label: string;
  value: React.ReactNode;
  fullWidth?: boolean;
}> = ({ label, value, fullWidth = false }) => {
  return (
    <div className={fullWidth ? 'w-full' : 'grid grid-cols-1 sm:grid-cols-3 gap-1 py-1'}>
      <span className="text-xs font-semibold text-slate-500">{label}</span>
      <span className={`text-sm text-slate-900 font-medium ${fullWidth ? 'block mt-0.5' : 'sm:col-span-2'}`}>
        {value || <span className="text-slate-400 font-normal italic">Not provided / None</span>}
      </span>
    </div>
  );
};
