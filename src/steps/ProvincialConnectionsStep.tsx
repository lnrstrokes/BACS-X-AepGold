import React from 'react';
import { CandidateDraftState } from '../types';
import { TextField } from '../components/TextField';
import { SelectField } from '../components/SelectField';
import { TextArea } from '../components/TextArea';
import { Checkbox } from '../components/CheckboxGroup';
import { CANADIAN_PROVINCES } from '../constants';
import { Compass, Users, Briefcase } from 'lucide-react';

interface ProvincialConnectionsStepProps {
  draft: CandidateDraftState;
  onChange: (fields: Partial<CandidateDraftState>) => void;
}

export const ProvincialConnectionsStep: React.FC<ProvincialConnectionsStepProps> = ({
  draft,
  onChange,
}) => {
  const toggleProvince = (prov: string) => {
    const current = draft.preferred_provinces || [];
    if (current.includes(prov)) {
      onChange({ preferred_provinces: current.filter((p) => p !== prov) });
    } else {
      onChange({ preferred_provinces: [...current, prov] });
    }
  };

  return (
    <div className="space-y-6">
      {/* Provincial Preferences */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Compass className="w-4 h-4 text-[#0B192C]" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
            Provincial Preferences & Destination
          </h3>
        </div>

        <div className="space-y-3">
          <Checkbox
            id="open_to_any_province"
            label="Open to settling in any Canadian Province or Territory"
            description="Select if you are flexible regarding settlement location across Canada."
            checked={draft.open_to_any_province}
            onChange={(checked) => onChange({ open_to_any_province: checked })}
          />

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Specific Provinces of Interest (Select all that apply)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CANADIAN_PROVINCES.map((prov) => {
                const isSelected = (draft.preferred_provinces || []).includes(prov);
                return (
                  <button
                    key={prov}
                    type="button"
                    onClick={() => toggleProvince(prov)}
                    className={`text-left px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer
                      ${
                        isSelected
                          ? 'border-[#0B192C] bg-[#0B192C] text-white shadow-2xs font-semibold'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                  >
                    {prov}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Family Ties in Canada */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Users className="w-4 h-4 text-[#0B192C]" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
            Canadian Family Ties
          </h3>
        </div>

        <Checkbox
          id="has_family_in_canada"
          label="I have close family members who are Canadian Citizens or Permanent Residents"
          description="Brother, sister, parent, grandparent, aunt, or uncle currently living in Canada."
          checked={draft.has_family_in_canada}
          onChange={(checked) => onChange({ has_family_in_canada: checked })}
        />

        {draft.has_family_in_canada && (
          <div className="pt-2 pl-7 animate-in fade-in duration-150">
            <TextArea
              id="family_ties_details"
              label="Family Member Details"
              placeholder="e.g. Sibling (Sister) residing in Toronto, Ontario - Canadian Citizen."
              rows={2}
              value={draft.family_ties_details}
              onChange={(e) => onChange({ family_ties_details: e.target.value })}
            />
          </div>
        )}
      </div>

      {/* Canadian Job Offer */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Briefcase className="w-4 h-4 text-[#0B192C]" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
            Arranged Canadian Employment
          </h3>
        </div>

        <Checkbox
          id="has_canadian_job_offer"
          label="I have a written, genuine job offer from a Canadian employer"
          checked={draft.has_canadian_job_offer}
          onChange={(checked) => onChange({ has_canadian_job_offer: checked })}
        />

        {draft.has_canadian_job_offer && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pl-7 animate-in fade-in duration-150">
            <TextField
              id="job_offer_employer"
              label="Canadian Employer Name"
              placeholder="e.g. Acme Corp Canada Ltd."
              value={draft.job_offer_employer}
              onChange={(e) => onChange({ job_offer_employer: e.target.value })}
            />

            <TextField
              id="job_offer_title"
              label="Job Offer Title"
              placeholder="e.g. Senior Systems Specialist"
              value={draft.job_offer_title}
              onChange={(e) => onChange({ job_offer_title: e.target.value })}
            />

            <SelectField
              id="job_offer_province"
              label="Job Location Province"
              options={CANADIAN_PROVINCES}
              value={draft.job_offer_province}
              onChange={(e) => onChange({ job_offer_province: e.target.value })}
            />

            <SelectField
              id="job_offer_lmia_status"
              label="LMIA / Status"
              options={[
                'LMIA Approved (Positive Labour Market Impact Assessment)',
                'LMIA in Progress / Applied',
                'LMIA-Exempt (e.g. Intra-Company, CUSMA, C10)',
                'Employer willing to support LMIA',
                'Uncertain / Need consultant guidance',
              ]}
              value={draft.job_offer_lmia_status}
              onChange={(e) => onChange({ job_offer_lmia_status: e.target.value })}
            />
          </div>
        )}
      </div>
    </div>
  );
};
