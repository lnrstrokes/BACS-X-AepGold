import React from 'react';
import { CandidateDraftState, StepErrors } from '../types';
import { TextField } from '../components/TextField';
import { MARITAL_STATUS_OPTIONS, GENDER_OPTIONS } from '../constants';
import { Check, Heart, User } from 'lucide-react';

interface PersonalStepProps {
  draft: CandidateDraftState;
  onChange: (fields: Partial<CandidateDraftState>) => void;
  errors?: StepErrors;
}

export const PersonalStep: React.FC<PersonalStepProps> = (props) => {
  const { draft, onChange, errors = {} } = props;

  const handleGenderSelect = (gender: string) => {
    onChange({ gender });
  };

  const handleMaritalStatusSelect = (status: string) => {
    const isMarried = status === 'Married' || status === 'Common-Law';
    onChange({
      marital_status: status,
      has_spouse: isMarried,
    });
  };

  return (
    <div className="space-y-6">
      {/* Contact Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <TextField
            id="full_name"
            label="Full Legal Name"
            placeholder="e.g. Jane Doe"
            value={draft.full_name}
            onChange={(e) => onChange({ full_name: e.target.value })}
            required
            error={errors.full_name}
            helperText="As shown on your official passport or travel document."
          />
        </div>

        <TextField
          id="email"
          label="Email Address"
          type="email"
          placeholder="e.g. jane.doe@example.com"
          value={draft.email}
          onChange={(e) => onChange({ email: e.target.value })}
          required
          error={errors.email}
          helperText="Primary email for receiving communication."
        />

        <TextField
          id="phone"
          label="Phone / WhatsApp Number"
          type="tel"
          placeholder="e.g. +1 555-0199 or +44 7700 900077"
          value={draft.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          required
          error={errors.phone}
          helperText="Include country code."
        />
      </div>

      {/* Citizenship and Residence */}
      <div className="border-t border-slate-100 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField
          id="country_of_citizenship"
          label="Country of Citizenship (Passport)"
          placeholder="e.g. India, Philippines, Nigeria, UK"
          value={draft.country_of_citizenship}
          onChange={(e) => onChange({ country_of_citizenship: e.target.value })}
          required
          error={errors.country_of_citizenship}
        />

        <TextField
          id="country_of_residence"
          label="Current Country of Residence"
          placeholder="e.g. United Arab Emirates, Canada, United States"
          value={draft.country_of_residence}
          onChange={(e) => onChange({ country_of_residence: e.target.value })}
          required
          error={errors.country_of_residence}
        />

        <TextField
          id="city_of_residence"
          label="Current City / Region"
          placeholder="e.g. Dubai, London, Toronto, Lagos, Mumbai"
          value={draft.city_of_residence}
          onChange={(e) => onChange({ city_of_residence: e.target.value })}
          helperText="Optional: Used for consultation timezone scheduling and nearest Visa Application Centre (VAC) identification."
        />

        <TextField
          id="date_of_birth"
          label="Date of Birth"
          type="date"
          value={draft.date_of_birth}
          onChange={(e) => onChange({ date_of_birth: e.target.value })}
          required
          error={errors.date_of_birth}
          helperText="Used to accurately establish candidate age."
        />
      </div>

      {/* Gender Selection */}
      <div className="border-t border-slate-100 pt-5 space-y-2">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-[#0B192C]" />
          <label className="text-sm font-semibold text-slate-900">
            Gender
          </label>
        </div>
        <p className="text-xs text-slate-500">
          Select the gender category indicated on your official passport or identification.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {GENDER_OPTIONS.map((gender) => {
            const isSelected = draft.gender === gender;
            return (
              <button
                key={gender}
                type="button"
                id={`gender-opt-${gender.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => handleGenderSelect(gender)}
                className={`relative flex items-center justify-between p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer min-h-[44px]
                  ${
                    isSelected
                      ? 'border-[#0B192C] bg-[#0B192C] text-white shadow-2xs font-semibold ring-2 ring-[#0B192C]/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
              >
                <span className="truncate pr-1">{gender}</span>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-[#C59B27] shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Marital Status Selection */}
      <div className="border-t border-slate-100 pt-5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#0B192C]" />
            <label className="text-sm font-semibold text-slate-900">
              Marital Status <span className="text-rose-500 font-semibold">*</span>
            </label>
          </div>
          {draft.has_spouse && (
            <span className="text-[11px] font-semibold text-[#C59B27] bg-[#C59B27]/10 px-2 py-0.5 rounded-full border border-[#C59B27]/20">
              Spouse details enabled in Step 2
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500">
          Your marital status determines comprehensive CRS points calculation and whether spouse / common-law partner details are evaluated.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 pt-1">
          {MARITAL_STATUS_OPTIONS.map((status) => {
            const isSelected = draft.marital_status === status;
            return (
              <button
                key={status}
                type="button"
                id={`marital-opt-${status.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => handleMaritalStatusSelect(status)}
                className={`relative flex items-center justify-between p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer min-h-[44px]
                  ${
                    isSelected
                      ? 'border-[#0B192C] bg-[#0B192C] text-white shadow-2xs font-semibold ring-2 ring-[#0B192C]/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
              >
                <span className="truncate pr-1">{status}</span>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-[#C59B27] shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
