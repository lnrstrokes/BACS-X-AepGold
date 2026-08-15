import React, { useState } from 'react';
import { CandidateDraftState, AdditionalEducationEntry, StepErrors } from '../types';
import { TextField } from '../components/TextField';
import { SelectField } from '../components/SelectField';
import { Checkbox } from '../components/CheckboxGroup';
import { RepeaterCard } from '../components/RepeaterCard';
import { EDUCATION_LEVEL_OPTIONS, ECA_ORGANIZATIONS } from '../constants';
import { Plus, GraduationCap, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface EducationStepProps {
  draft: CandidateDraftState;
  onChange: (fields: Partial<CandidateDraftState>) => void;
  errors?: StepErrors;
}

export const EducationStep: React.FC<EducationStepProps> = (props) => {
  const { draft, onChange, errors = {} } = props;
  const [showEcaGuide, setShowEcaGuide] = useState(false);

  const handleAddCredential = () => {
    const newCred: AdditionalEducationEntry = {
      id: 'edu-' + Math.random().toString(36).substring(2, 9),
      level: 'Bachelor’s Degree (3+ years)',
      field_of_study: '',
      institution: '',
      country: '',
      completion_year: '',
      has_eca: false,
    };
    onChange({ additional_education: [...draft.additional_education, newCred] });
  };

  const handleRemoveCredential = (id: string) => {
    onChange({
      additional_education: draft.additional_education.filter((e) => e.id !== id),
    });
  };

  const handleUpdateCredential = (id: string, updates: Partial<AdditionalEducationEntry>) => {
    onChange({
      additional_education: draft.additional_education.map((e) =>
        e.id === id ? { ...e, ...updates } : e
      ),
    });
  };

  return (
    <div className="space-y-6">
      {/* Primary Highest Credential */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <GraduationCap className="w-4 h-4 text-[#0B192C]" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
            Highest Completed Education
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <SelectField
              id="highest_education_level"
              label="Highest Education Level Completed"
              options={EDUCATION_LEVEL_OPTIONS}
              value={draft.highest_education_level}
              onChange={(e) => onChange({ highest_education_level: e.target.value })}
              required
            />
          </div>

          <TextField
            id="field_of_study"
            label="Field of Study / Major"
            placeholder="e.g. Computer Science, Mechanical Engineering, Accounting"
            value={draft.field_of_study}
            onChange={(e) => onChange({ field_of_study: e.target.value })}
            required
            error={errors.field_of_study}
          />

          <TextField
            id="institution_name"
            label="Institution / University Name"
            placeholder="e.g. University of Lagos, Delhi University, University of Leeds"
            value={draft.institution_name}
            onChange={(e) => onChange({ institution_name: e.target.value })}
            required
            error={errors.institution_name}
          />

          <TextField
            id="education_country"
            label="Country of Study"
            placeholder="e.g. India, United Kingdom, Nigeria, Canada"
            value={draft.education_country}
            onChange={(e) => onChange({ education_country: e.target.value })}
            required
            error={errors.education_country}
          />

          <div className="grid grid-cols-2 gap-2">
            <TextField
              id="education_start_year"
              label="Start Year"
              placeholder="e.g. 2016"
              maxLength={4}
              value={draft.education_start_year}
              onChange={(e) => onChange({ education_start_year: e.target.value })}
            />
            <TextField
              id="education_end_year"
              label="Completion Year"
              placeholder="e.g. 2020"
              maxLength={4}
              value={draft.education_end_year}
              onChange={(e) => onChange({ education_end_year: e.target.value })}
              required
              error={errors.education_end_year}
            />
          </div>
        </div>

        {/* ECA Information */}
        <div className="border-t border-slate-100 pt-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <Checkbox
              id="has_eca"
              label="Educational Credential Assessment (ECA) obtained"
              description="Official foreign credential assessment required for Federal programs (WES, ICAS, CES, etc.)"
              checked={draft.has_eca}
              onChange={(checked) => onChange({ has_eca: checked })}
            />

            <button
              type="button"
              onClick={() => setShowEcaGuide(!showEcaGuide)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-lg transition-colors cursor-pointer self-start sm:self-auto shrink-0"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>{showEcaGuide ? 'Hide ECA Info' : 'What is an ECA?'}</span>
              {showEcaGuide ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {showEcaGuide && (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-2 animate-in fade-in duration-150">
              <p className="leading-relaxed">
                An <strong>Educational Credential Assessment (ECA)</strong> verifies that your foreign degree, diploma, or certificate is valid and equal to a completed credential in Canada. An ECA report is valid for <strong>5 years</strong> from the date of issue.
              </p>
              <div className="text-[11px] text-slate-500 space-y-1 bg-white p-2.5 rounded-lg border border-slate-200/80">
                <span className="font-bold text-slate-800 block">Designated IRCC Assessing Bodies:</span>
                <p>• World Education Services (WES) • ICAS • CES (University of Toronto) • IQAS • BCIT</p>
                <p>• <em>Specialist bodies:</em> Medical Council of Canada (MCC for Physicians) • Pharmacy Examining Board of Canada (PEBC for Pharmacists)</p>
              </div>
            </div>
          )}

          {draft.has_eca && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#F4F7FB] border border-slate-200 rounded-xl">
              <SelectField
                id="eca_organization"
                label="ECA Organization"
                options={ECA_ORGANIZATIONS}
                value={draft.eca_organization}
                onChange={(e) => onChange({ eca_organization: e.target.value })}
              />

              <TextField
                id="eca_reference_number"
                label="ECA Reference Number"
                placeholder="e.g. 5429188IMM"
                value={draft.eca_reference_number}
                onChange={(e) => onChange({ eca_reference_number: e.target.value })}
              />

              <TextField
                id="eca_canadian_equivalency"
                label="Canadian Equivalency Stated"
                placeholder="e.g. Canadian Master's degree"
                value={draft.eca_canadian_equivalency}
                onChange={(e) => onChange({ eca_canadian_equivalency: e.target.value })}
              />
            </div>
          )}
        </div>
      </div>

      {/* Additional Credentials Repeater */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              Additional Degrees / Diplomas (Optional)
            </h3>
            <p className="text-xs text-slate-500">
              Add any secondary diploma, bachelor degree, or post-graduate certificate.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddCredential}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Add Additional Degree / Diploma</span>
          </button>
        </div>

        {draft.additional_education.length === 0 ? (
          <div className="p-4 border border-dashed border-slate-200 rounded-xl text-center">
            <p className="text-xs text-slate-500">
              No additional credentials added. (Click above if you have multiple completed degrees or certificates).
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {draft.additional_education.map((cred, index) => (
              <RepeaterCard
                key={cred.id}
                id={cred.id}
                title={`Additional Credential #${index + 1}`}
                onRemove={() => handleRemoveCredential(cred.id)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <SelectField
                    id={`add-level-${cred.id}`}
                    label="Credential Level"
                    options={EDUCATION_LEVEL_OPTIONS}
                    value={cred.level}
                    onChange={(e) => handleUpdateCredential(cred.id, { level: e.target.value })}
                  />

                  <TextField
                    id={`add-field-${cred.id}`}
                    label="Field of Study"
                    placeholder="e.g. Business Administration"
                    value={cred.field_of_study}
                    onChange={(e) => handleUpdateCredential(cred.id, { field_of_study: e.target.value })}
                  />

                  <TextField
                    id={`add-inst-${cred.id}`}
                    label="Institution Name"
                    placeholder="e.g. University Name"
                    value={cred.institution}
                    onChange={(e) => handleUpdateCredential(cred.id, { institution: e.target.value })}
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <TextField
                      id={`add-country-${cred.id}`}
                      label="Country"
                      placeholder="e.g. Nigeria"
                      value={cred.country}
                      onChange={(e) => handleUpdateCredential(cred.id, { country: e.target.value })}
                    />
                    <TextField
                      id={`add-year-${cred.id}`}
                      label="Year"
                      placeholder="e.g. 2017"
                      maxLength={4}
                      value={cred.completion_year}
                      onChange={(e) => handleUpdateCredential(cred.id, { completion_year: e.target.value })}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Checkbox
                      id={`add-eca-${cred.id}`}
                      label="ECA obtained for this credential"
                      checked={cred.has_eca}
                      onChange={(checked) => handleUpdateCredential(cred.id, { has_eca: checked })}
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
