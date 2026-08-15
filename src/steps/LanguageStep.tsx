import React from 'react';
import { CandidateDraftState } from '../types';
import { TextField } from '../components/TextField';
import { SelectField } from '../components/SelectField';
import { Checkbox } from '../components/CheckboxGroup';
import { LANGUAGE_TEST_OPTIONS } from '../constants';
import { Languages, Info } from 'lucide-react';

interface LanguageStepProps {
  draft: CandidateDraftState;
  onChange: (fields: Partial<CandidateDraftState>) => void;
}

export const LanguageStep: React.FC<LanguageStepProps> = ({ draft, onChange }) => {
  const hasFirstTest = draft.first_language_test !== 'None';

  return (
    <div className="space-y-6">
      {/* Neutral Notice */}
      <div className="p-4 bg-[#F4F7FB] border border-slate-200 rounded-2xl flex items-start gap-3 text-xs text-slate-700 shadow-2xs">
        <Info className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Please enter your official language test details and raw scores exactly as printed on your official Test Report Form. Raw test scores will be preserved without automated CLB translation.
        </p>
      </div>

      {/* Primary Language Test */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Languages className="w-4 h-4 text-[#0B192C]" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
            First Official Language Test (English or French)
          </h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">
              Language Test Type
            </label>
            <p className="text-xs text-slate-500">
              Select your approved test or choose &quot;None&quot; if you have not completed an official language test.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              {LANGUAGE_TEST_OPTIONS.map((test) => {
                const isSelected = (draft.first_language_test || 'None') === test;
                return (
                  <button
                    key={test}
                    type="button"
                    id={`first-lang-opt-${test.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => onChange({ first_language_test: test })}
                    className={`relative flex items-center justify-between p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer min-h-[44px]
                      ${
                        isSelected
                          ? 'border-[#0B192C] bg-[#0B192C] text-white shadow-2xs font-semibold ring-2 ring-[#0B192C]/20'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                  >
                    <span className="truncate pr-1">{test}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#C59B27] shrink-0 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {hasFirstTest && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 animate-in fade-in duration-150">
              <TextField
                id="first_test_date"
                label="Test Date"
                type="date"
                value={draft.first_test_date}
                onChange={(e) => onChange({ first_test_date: e.target.value })}
              />

              <div className="sm:col-span-2">
                <TextField
                  id="first_registration_number"
                  label="TRF / Registration / Candidate Number"
                  placeholder="e.g. 21AA001234... or Registration ID"
                  value={draft.first_registration_number}
                  onChange={(e) => onChange({ first_registration_number: e.target.value })}
                />
              </div>

              {/* Raw Scores Grid */}
              <div className="sm:col-span-3 pt-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Raw Test Scores (As recorded on TRF)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <TextField
                    id="first_listening"
                    label="Listening"
                    placeholder="e.g. 8.5"
                    value={draft.first_listening}
                    onChange={(e) => onChange({ first_listening: e.target.value })}
                  />
                  <TextField
                    id="first_reading"
                    label="Reading"
                    placeholder="e.g. 7.0"
                    value={draft.first_reading}
                    onChange={(e) => onChange({ first_reading: e.target.value })}
                  />
                  <TextField
                    id="first_writing"
                    label="Writing"
                    placeholder="e.g. 7.5"
                    value={draft.first_writing}
                    onChange={(e) => onChange({ first_writing: e.target.value })}
                  />
                  <TextField
                    id="first_speaking"
                    label="Speaking"
                    placeholder="e.g. 8.0"
                    value={draft.first_speaking}
                    onChange={(e) => onChange({ first_speaking: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Second Official Language Test */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
        <Checkbox
          id="has_second_language_test"
          label="Second Official Language Test (Optional)"
          description="Check if you have taken a second approved test in Canada's other official language (e.g. French test if your first test was English)."
          checked={draft.has_second_language_test}
          onChange={(checked) => onChange({ has_second_language_test: checked })}
        />

        {draft.has_second_language_test && (
          <div className="pt-3 border-t border-slate-100 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 block">
                Second Test Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                {LANGUAGE_TEST_OPTIONS.filter((t) => t !== draft.first_language_test).map((test) => {
                  const isSelected = (draft.second_language_test || 'None') === test;
                  return (
                    <button
                      key={test}
                      type="button"
                      id={`second-lang-opt-${test.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      onClick={() => onChange({ second_language_test: test })}
                      className={`relative flex items-center justify-between p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer min-h-[44px]
                        ${
                          isSelected
                            ? 'border-[#0B192C] bg-[#0B192C] text-white shadow-2xs font-semibold ring-2 ring-[#0B192C]/20'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                        }`}
                    >
                      <span className="truncate pr-1">{test}</span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#C59B27] shrink-0 ml-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {draft.second_language_test && draft.second_language_test !== 'None' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 animate-in fade-in duration-150">
                <TextField
                  id="second_test_date"
                  label="Test Date"
                  type="date"
                  value={draft.second_test_date}
                  onChange={(e) => onChange({ second_test_date: e.target.value })}
                />

                <div className="sm:col-span-2">
                  <TextField
                    id="second_registration_number"
                    label="TRF / Registration Number"
                    placeholder="e.g. TRF Registration Number"
                    value={draft.second_registration_number}
                    onChange={(e) => onChange({ second_registration_number: e.target.value })}
                  />
                </div>

                <div className="sm:col-span-3 pt-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Second Test Raw Scores
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <TextField
                      id="second_listening"
                      label="Listening"
                      placeholder="Score"
                      value={draft.second_listening}
                      onChange={(e) => onChange({ second_listening: e.target.value })}
                    />
                    <TextField
                      id="second_reading"
                      label="Reading"
                      placeholder="Score"
                      value={draft.second_reading}
                      onChange={(e) => onChange({ second_reading: e.target.value })}
                    />
                    <TextField
                      id="second_writing"
                      label="Writing"
                      placeholder="Score"
                      value={draft.second_writing}
                      onChange={(e) => onChange({ second_writing: e.target.value })}
                    />
                    <TextField
                      id="second_speaking"
                      label="Speaking"
                      placeholder="Score"
                      value={draft.second_speaking}
                      onChange={(e) => onChange({ second_speaking: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
