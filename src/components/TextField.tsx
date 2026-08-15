import React from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  helperText?: string;
  error?: string;
  required?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  helperText,
  error,
  required,
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
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={helperText || error ? `${id}-desc` : undefined}
        className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-slate-900 text-sm placeholder-slate-400 
          transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0B192C] focus:border-transparent
          ${error ? 'border-rose-300 ring-1 ring-rose-300 bg-rose-50/20' : 'border-slate-300 hover:border-slate-400'} 
          disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed ${className}`}
        {...props}
      />
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
