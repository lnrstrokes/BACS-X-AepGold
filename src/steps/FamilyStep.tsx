import React from 'react';
import { CandidateDraftState, DependentEntry } from '../types';
import { TextField } from '../components/TextField';
import { SelectField } from '../components/SelectField';
import { Checkbox } from '../components/CheckboxGroup';
import { RepeaterCard } from '../components/RepeaterCard';
import { EDUCATION_LEVEL_OPTIONS, LANGUAGE_TEST_OPTIONS } from '../constants';
import { Plus, Users, Heart } from 'lucide-react';

interface FamilyStepProps {
  draft: CandidateDraftState;
  onChange: (fields: Partial<CandidateDraftState>) => void;
}

export const FamilyStep: React.FC<FamilyStepProps> = ({ draft, onChange }) => {
  const isMarriedOrCommonLaw =
    draft.marital_status === 'Married' || draft.marital_status === 'Common-Law';

  const handleAddDependent = () => {
    const newDependent: DependentEntry = {
      id: 'dep-' + Math.random().toString(36).substring(2, 9),
      relationship: 'Child',
      date_of_birth: '',
      accompanying: true,
    };
    onChange({ dependents: [...draft.dependents, newDependent] });
  };

  const handleRemoveDependent = (id: string) => {
    onChange({ dependents: draft.dependents.filter((d) => d.id !== id) });
  };

  const handleUpdateDependent = (id: string, updates: Partial<DependentEntry>) => {
    onChange({
      dependents: draft.dependents.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    });
  };

  return (
    <div className="space-y-6">
      {/* Spouse Section (Conditional) */}
      {isMarriedOrCommonLaw ? (
        <div className="p-5 bg-[#F4F7FB] border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
          <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
            <Heart className="w-4 h-4 text-[#0B192C]" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              Spouse / Common-Law Partner Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <TextField
                id="spouse_full_name"
                label="Spouse / Partner Full Name"
                placeholder="e.g. John Doe"
                value={draft.spouse_full_name}
                onChange={(e) => onChange({ spouse_full_name: e.target.value })}
              />
            </div>

            <TextField
              id="spouse_date_of_birth"
              label="Spouse Date of Birth"
              type="date"
              value={draft.spouse_date_of_birth}
              onChange={(e) => onChange({ spouse_date_of_birth: e.target.value })}
            />

            <TextField
              id="spouse_citizenship"
              label="Spouse Country of Citizenship"
              placeholder="e.g. India, United Kingdom"
              value={draft.spouse_citizenship}
              onChange={(e) => onChange({ spouse_citizenship: e.target.value })}
            />

            <div className="sm:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700 block">
                Spouse Highest Education Level
              </label>
              <SelectField
                id="spouse_education_level"
                label=""
                placeholder="Select spouse education level"
                options={EDUCATION_LEVEL_OPTIONS}
                value={draft.spouse_education_level}
                onChange={(e) => onChange({ spouse_education_level: e.target.value })}
              />
            </div>

            {/* Spouse Official Language Test */}
            <div className="sm:col-span-2 space-y-2 pt-2 border-t border-slate-200/80">
              <label className="text-sm font-medium text-slate-700 block">
                Spouse Official Language Test
              </label>
              <p className="text-xs text-slate-500">
                Select the approved official language test completed by your spouse (or None).
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                {LANGUAGE_TEST_OPTIONS.map((test) => {
                  const isSelected = (draft.spouse_language_test || 'None') === test;
                  return (
                    <button
                      key={test}
                      type="button"
                      id={`spouse-lang-${test.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      onClick={() => onChange({ spouse_language_test: test })}
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

            {/* Spouse Prior Canadian Experience */}
            <div className="sm:col-span-2 space-y-2 pt-2 border-t border-slate-200/80">
              <label className="text-sm font-medium text-slate-700 block">
                Spouse Prior Canadian Experience
              </label>
              <p className="text-xs text-slate-500">
                Prior Canadian skilled work or post-secondary education completed by your spouse.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {[
                  'None',
                  '1+ years of Canadian full-time skilled work',
                  'Completed Canadian post-secondary credential (2+ years)',
                  'Completed Canadian post-secondary credential (1 year)',
                  'Currently on valid Canadian work permit',
                  'Currently studying in Canada',
                ].map((exp) => {
                  const isSelected = (draft.spouse_canadian_work_or_study || 'None') === exp;
                  return (
                    <button
                      key={exp}
                      type="button"
                      id={`spouse-exp-${exp.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20)}`}
                      onClick={() => onChange({ spouse_canadian_work_or_study: exp })}
                      className={`relative flex items-center justify-between p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer min-h-[44px]
                        ${
                          isSelected
                            ? 'border-[#0B192C] bg-[#0B192C] text-white shadow-2xs font-semibold ring-2 ring-[#0B192C]/20'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                        }`}
                    >
                      <span className="leading-snug pr-2">{exp}</span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#C59B27] shrink-0 ml-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-[#F4F7FB] border border-slate-200 rounded-2xl text-sm text-slate-600">
          <p>
            Candidate marital status is marked as <strong className="text-slate-900">{draft.marital_status}</strong>.
            Spouse details are not applicable.
          </p>
        </div>
      )}

      {/* Dependent Children Section */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#0B192C]" />
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
                Dependent Children
              </h3>
              <p className="text-xs text-slate-500">
                Children under 22 years of age who may accompany the candidate.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddDependent}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Add Child / Dependent</span>
          </button>
        </div>

        {draft.dependents.length === 0 ? (
          <div className="p-6 border border-dashed border-slate-200 rounded-2xl text-center">
            <p className="text-xs text-slate-500">
              No dependent children recorded. Click &quot;Add Child / Dependent&quot; above if you have accompanying or non-accompanying children.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {draft.dependents.map((dep, index) => (
              <RepeaterCard
                key={dep.id}
                id={dep.id}
                title={`Dependent #${index + 1}`}
                onRemove={() => handleRemoveDependent(dep.id)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                  <SelectField
                    id={`dep-rel-${dep.id}`}
                    label="Relationship"
                    options={['Child', 'Step-child', 'Adopted child', 'Other dependent']}
                    value={dep.relationship}
                    onChange={(e) => handleUpdateDependent(dep.id, { relationship: e.target.value })}
                  />

                  <TextField
                    id={`dep-dob-${dep.id}`}
                    label="Date of Birth"
                    type="date"
                    value={dep.date_of_birth}
                    onChange={(e) => handleUpdateDependent(dep.id, { date_of_birth: e.target.value })}
                  />

                  <div className="pt-2 sm:pt-0">
                    <Checkbox
                      id={`dep-acc-${dep.id}`}
                      label="Accompanying to Canada"
                      checked={dep.accompanying}
                      onChange={(checked) => handleUpdateDependent(dep.id, { accompanying: checked })}
                    />
                  </div>
                </div>
              </RepeaterCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
