import React from 'react';
import { Trash2 } from 'lucide-react';

interface RepeaterCardProps {
  id: string;
  title: string;
  subtitle?: string;
  onRemove: () => void;
  children: React.ReactNode;
}

export const RepeaterCard: React.FC<RepeaterCardProps> = ({
  id,
  title,
  subtitle,
  onRemove,
  children,
}) => {
  return (
    <div
      id={id}
      className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-4 relative transition-all hover:border-slate-300"
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h4 className="text-sm font-bold text-slate-900">{title}</h4>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${title}`}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Remove</span>
        </button>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
};
