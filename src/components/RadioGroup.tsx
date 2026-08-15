import React from 'react';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  id: string;
  label: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  helperText?: string;
  error?: string;
  required?: boolean;
  inline?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  id,
  label,
  options,
  selectedValue,
  onChange,
  helperText,
  error,
  required,
  inline = false,
}) => {
  return (
    <fieldset className="w-full flex flex-col space-y-2" id={id}>
      <legend className="text-sm font-medium text-slate-700 flex items-center">
        <span>{label}</span>
        {required && <span className="text-rose-500 ml-1 font-semibold">*</span>}
      </legend>
      
      <div className={inline ? 'grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap' : 'flex flex-col space-y-2'}>
        {options.map((opt) => {
          const isChecked = selectedValue === opt.value;
          const optId = `${id}-${opt.value.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
          return (
            <label
              key={opt.value}
              htmlFor={optId}
              className={`relative flex items-start p-3 rounded-xl border cursor-pointer transition-all duration-150 text-left
                ${isChecked 
                  ? 'border-[#0B192C] bg-[#F4F7FB] ring-1 ring-[#0B192C] shadow-2xs' 
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'}`}
            >
              <div className="flex items-center h-5">
                <input
                  id={optId}
                  name={id}
                  type="radio"
                  checked={isChecked}
                  onChange={() => onChange(opt.value)}
                  className="w-4 h-4 text-[#0B192C] border-slate-300 focus:ring-[#0B192C] focus:ring-2 accent-[#0B192C] cursor-pointer"
                />
              </div>
              <div className="ml-3 text-sm">
                <span className={`block font-medium ${isChecked ? 'text-[#0B192C]' : 'text-slate-700'}`}>
                  {opt.label}
                </span>
                {opt.description && (
                  <span className="block text-xs text-slate-500 mt-0.5">
                    {opt.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      {!error && helperText && <p className="text-xs text-slate-500">{helperText}</p>}
    </fieldset>
  );
};
