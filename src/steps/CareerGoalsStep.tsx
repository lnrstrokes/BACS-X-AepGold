import React from 'react';
import { CandidateDraftState } from '../types';
import { TextField } from '../components/TextField';
import { SelectField } from '../components/SelectField';
import { TextArea } from '../components/TextArea';
import { Checkbox } from '../components/CheckboxGroup';
import { TIMELINE_OPTIONS } from '../constants';
import { Target, FileCheck } from 'lucide-react';

interface CareerGoalsStepProps {
  draft: CandidateDraftState;
  onChange: (fields: Partial<CandidateDraftState>) => void;
}

export const CareerGoalsStep: React.FC<CareerGoalsStepProps> = ({ draft, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Career Objectives & Timeline */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Target className="w-4 h-4 text-[#0B192C]" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
            Career Goals & Timeline
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <TextField
              id="target_job_titles"
              label="Target Occupations / Job Titles in Canada"
              placeholder="e.g. Senior Software Developer, Cloud Architect, IT Project Manager"
              value={draft.target_job_titles}
              onChange={(e) => onChange({ target_job_titles: e.target.value })}
              helperText="Roles you plan to pursue upon arrival in Canada."
            />
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label className="text-sm font-medium text-slate-700 block">
              Target Immigration Timeline
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {TIMELINE_OPTIONS.map((timeline) => {
                const isSelected = draft.target_immigration_timeline === timeline;
                return (
                  <button
                    key={timeline}
                    type="button"
                    id={`timeline-opt-${timeline.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => onChange({ target_immigration_timeline: timeline })}
                    className={`relative flex items-center justify-between p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer min-h-[44px]
                      ${
                        isSelected
                          ? 'border-[#0B192C] bg-[#0B192C] text-white shadow-2xs font-semibold ring-2 ring-[#0B192C]/20'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                  >
                    <span className="truncate pr-1">{timeline}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#C59B27] shrink-0 ml-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="sm:col-span-2 pt-2">
            <Checkbox
              id="open_to_regional_or_rural_programs"
              label="Open to Regional & Rural Community Programs"
              description="E.g. Atlantic Immigration Program, Rural Community Immigration Pilot, Northern opportunities."
              checked={draft.open_to_regional_or_rural_programs}
              onChange={(checked) =>
                onChange({ open_to_regional_or_rural_programs: checked })
              }
            />
          </div>

          <div className="sm:col-span-2">
            <TextArea
              id="additional_notes"
              label="Additional Context / Special Circumstances (Optional)"
              placeholder="Any other relevant details or questions for your consultant (e.g. pending certifications, self-employment nuances, sibling citizenship proof)."
              rows={3}
              value={draft.additional_notes}
              onChange={(e) => onChange({ additional_notes: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Document Availability Readiness Checklist */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <FileCheck className="w-4 h-4 text-[#0B192C]" />
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              Document Readiness Checklist
            </h3>
            <p className="text-xs text-slate-500">
              Indicate which supporting documents you currently have on hand.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Checkbox
            id="doc_valid_passport"
            label="Valid Passport (6+ months validity)"
            checked={draft.doc_valid_passport}
            onChange={(checked) => onChange({ doc_valid_passport: checked })}
          />

          <Checkbox
            id="doc_education_certificates"
            label="Original Degree / Diploma Certificates"
            checked={draft.doc_education_certificates}
            onChange={(checked) => onChange({ doc_education_certificates: checked })}
          />

          <Checkbox
            id="doc_transcripts"
            label="Complete Academic Transcripts"
            checked={draft.doc_transcripts}
            onChange={(checked) => onChange({ doc_transcripts: checked })}
          />

          <Checkbox
            id="doc_eca_report"
            label="Official ECA Report (WES, ICAS, etc.)"
            checked={draft.doc_eca_report}
            onChange={(checked) => onChange({ doc_eca_report: checked })}
          />

          <Checkbox
            id="doc_language_test_report"
            label="Official Language Test TRF / Result"
            checked={draft.doc_language_test_report}
            onChange={(checked) => onChange({ doc_language_test_report: checked })}
          />

          <Checkbox
            id="doc_reference_letters"
            label="Work Reference Letters / Proof of Employment"
            checked={draft.doc_reference_letters}
            onChange={(checked) => onChange({ doc_reference_letters: checked })}
          />

          <Checkbox
            id="doc_bank_statements"
            label="Proof of Funds / Bank Statements (6 mos)"
            checked={draft.doc_bank_statements}
            onChange={(checked) => onChange({ doc_bank_statements: checked })}
          />

          <Checkbox
            id="doc_police_clearance"
            label="Police Clearance Certificates (PCC)"
            checked={draft.doc_police_clearance}
            onChange={(checked) => onChange({ doc_police_clearance: checked })}
          />
        </div>
      </div>
    </div>
  );
};
