import React from 'react';

interface CheckboxProps {
  id: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  description,
  checked,
  onChange,
  disabled = false,
  error,
  required = false,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor={id}
        className={`relative flex items-start p-3 rounded-xl border transition-all duration-150 select-none
          ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-100 border-slate-200' : 'cursor-pointer'}
          ${checked 
            ? 'border-[#0B192C] bg-[#F4F7FB] ring-1 ring-[#0B192C]' 
            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/40'}`}
      >
        <div className="flex items-center h-5">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className="w-4 h-4 rounded text-[#0B192C] border-slate-300 focus:ring-[#0B192C] accent-[#0B192C] cursor-pointer"
          />
        </div>
        <div className="ml-3 text-sm">
          <span className={`block font-medium ${checked ? 'text-[#0B192C]' : 'text-slate-700'}`}>
            {label}
            {required && <span className="text-rose-500 ml-1 font-semibold">*</span>}
          </span>
          {description && (
            <span className="block text-xs text-slate-500 mt-0.5 leading-relaxed">
              {description}
            </span>
          )}
        </div>
      </label>
      {error && <p className="text-xs text-rose-600 font-medium pl-1">{error}</p>}
    </div>
  );
};
