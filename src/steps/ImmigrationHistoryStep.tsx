import React from 'react';
import { CandidateDraftState } from '../types';
import { TextField } from '../components/TextField';
import { TextArea } from '../components/TextArea';
import { Checkbox } from '../components/CheckboxGroup';
import { History, AlertCircle } from 'lucide-react';

interface ImmigrationHistoryStepProps {
  draft: CandidateDraftState;
  onChange: (fields: Partial<CandidateDraftState>) => void;
}

export const ImmigrationHistoryStep: React.FC<ImmigrationHistoryStepProps> = ({
  draft,
  onChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Intro Context Banner */}
      <div className="p-4 bg-[#F4F7FB] border border-slate-200 rounded-2xl flex items-start gap-3 text-xs text-slate-700 shadow-2xs">
        <AlertCircle className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Accurate declaration of visa history, past applications, and any previous refusals allows your consultant to provide a comprehensive, compliant professional review.
        </p>
      </div>

      {/* Prior Canadian Applications */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <History className="w-4 h-4 text-[#0B192C]" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
            Previous Canadian Applications
          </h3>
        </div>

        <Checkbox
          id="has_previous_canadian_applications"
          label="I have previously applied for a Canadian visa, study permit, work permit, or permanent residence"
          checked={draft.has_previous_canadian_applications}
          onChange={(checked) => onChange({ has_previous_canadian_applications: checked })}
        />

        {draft.has_previous_canadian_applications && (
          <div className="pt-2 animate-in fade-in duration-150">
            <TextArea
              id="previous_applications_details"
              label="Application Details"
              placeholder="List application types, approximate years, and outcomes (e.g. Visitor visa 2021 approved, Study permit 2023)."
              rows={3}
              value={draft.previous_applications_details}
              onChange={(e) => onChange({ previous_applications_details: e.target.value })}
            />
          </div>
        )}
      </div>

      {/* Refusals & Disclosures */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-3">
          Visa Refusals & Inadmissibility Disclosures
        </h3>

        <div className="space-y-4">
          <div>
            <Checkbox
              id="has_previous_refusals"
              label="I have previously been refused a visa or entry to Canada or any other country"
              checked={draft.has_previous_refusals}
              onChange={(checked) => onChange({ has_previous_refusals: checked })}
            />
            {draft.has_previous_refusals && (
              <div className="mt-3 pl-7 animate-in fade-in duration-150">
                <TextArea
                  id="refusal_details"
                  label="Refusal Details & Countries"
                  placeholder="Provide country, approximate year, visa type, and stated reason for refusal (e.g. Canada TRV 2022 216(1)(b) ties to home country, USA B1/B2 2019 214(b))."
                  rows={3}
                  value={draft.refusal_details}
                  onChange={(e) => onChange({ refusal_details: e.target.value })}
                />
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 pt-3">
            <Checkbox
              id="has_inadmissibility_concerns"
              label="I have potential admissibility considerations (medical conditions, criminality, removal orders)"
              checked={draft.has_inadmissibility_concerns}
              onChange={(checked) => onChange({ has_inadmissibility_concerns: checked })}
            />
            {draft.has_inadmissibility_concerns && (
              <div className="mt-3 pl-7 animate-in fade-in duration-150">
                <TextArea
                  id="inadmissibility_details"
                  label="Details of Admissibility Considerations"
                  placeholder="Provide relevant facts for consultant review."
                  rows={3}
                  value={draft.inadmissibility_details}
                  onChange={(e) => onChange({ inadmissibility_details: e.target.value })}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Express Entry Profile */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
        <Checkbox
          id="has_active_express_entry"
          label="I currently have an active Express Entry profile in the IRCC pool"
          checked={draft.has_active_express_entry}
          onChange={(checked) => onChange({ has_active_express_entry: checked })}
        />

        {draft.has_active_express_entry && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 pl-7 animate-in fade-in duration-150">
            <TextField
              id="express_entry_profile_number"
              label="EE Profile Number"
              placeholder="e.g. E001234567"
              value={draft.express_entry_profile_number}
              onChange={(e) => onChange({ express_entry_profile_number: e.target.value })}
            />

            <TextField
              id="express_entry_job_seeker_code"
              label="Job Seeker Code"
              placeholder="e.g. 1234"
              value={draft.express_entry_job_seeker_code}
              onChange={(e) => onChange({ express_entry_job_seeker_code: e.target.value })}
            />

            <TextField
              id="express_entry_submission_date"
              label="Profile Submission Date"
              type="date"
              value={draft.express_entry_submission_date}
              onChange={(e) => onChange({ express_entry_submission_date: e.target.value })}
            />
          </div>
        )}
      </div>
    </div>
  );
};
