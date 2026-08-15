import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: (string | SelectOption)[];
  helperText?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  options,
  helperText,
  error,
  required,
  placeholder,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full flex flex-col space-y-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-700 flex items-center justify-between"
      >
        <span>
          {label}
          {required && <span className="text-rose-500 ml-1 font-semibold">*</span>}
        </span>
      </label>
      <div className="relative">
        <select
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={helperText || error ? `${id}-desc` : undefined}
          className={`w-full min-h-[44px] px-3.5 pr-10 py-2.5 bg-white border rounded-xl text-slate-900 text-sm appearance-none cursor-pointer
            transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:border-transparent
            ${error ? 'border-rose-300 ring-1 ring-rose-300 bg-rose-50/20' : 'border-slate-300 hover:border-slate-400'} 
            disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt, idx) => {
            const val = typeof opt === 'string' ? opt : opt.value;
            const lbl = typeof opt === 'string' ? opt : opt.label;
            const disabled = typeof opt === 'object' ? opt.disabled : false;
            return (
              <option key={idx} value={val} disabled={disabled}>
                {lbl}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {error && (
        <p id={`${id}-desc`} className="text-xs text-rose-600 font-medium">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p id={`${id}-desc`} className="text-xs text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
};
