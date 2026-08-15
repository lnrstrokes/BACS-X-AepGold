import React from 'react';
import {
  CandidateDraftState,
  CanadianStudyEntry,
  CanadianWorkEntry,
} from '../types';
import { TextField } from '../components/TextField';
import { SelectField } from '../components/SelectField';
import { Checkbox } from '../components/CheckboxGroup';
import { RepeaterCard } from '../components/RepeaterCard';
import {
  CANADIAN_PROVINCES,
  EDUCATION_LEVEL_OPTIONS,
  WORK_PERMIT_TYPES,
  OFFICIAL_NOC_FINDER_URL,
} from '../constants';
import { MapPin, Plus, School, Briefcase, ExternalLink, Search } from 'lucide-react';

interface CanadaStepProps {
  draft: CandidateDraftState;
  onChange: (fields: Partial<CandidateDraftState>) => void;
}

export const CanadaStep: React.FC<CanadaStepProps> = ({ draft, onChange }) => {
  const handleAddStudy = () => {
    const newStudy: CanadianStudyEntry = {
      id: 'can-study-' + Math.random().toString(36).substring(2, 9),
      institution: '',
      credential_level: 'Two-year post-secondary diploma',
      province: 'Ontario',
      start_date: '',
      end_date: '',
      is_completed: true,
      is_pgwp_eligible: true,
    };
    onChange({ canadian_studies: [...draft.canadian_studies, newStudy] });
  };

  const handleRemoveStudy = (id: string) => {
    onChange({
      canadian_studies: draft.canadian_studies.filter((s) => s.id !== id),
    });
  };

  const handleUpdateStudy = (id: string, updates: Partial<CanadianStudyEntry>) => {
    onChange({
      canadian_studies: draft.canadian_studies.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    });
  };

  const handleAddWork = () => {
    const newWork: CanadianWorkEntry = {
      id: 'can-work-' + Math.random().toString(36).substring(2, 9),
      job_title: '',
      employer: '',
      province_or_city: 'Ontario',
      is_current: true,
      start_date: '',
      end_date: '',
      noc_or_teer: '',
      weekly_hours: '40',
      work_permit_type: 'Open Work Permit (e.g. PGWP, SOWP, Working Holiday)',
    };
    onChange({ canadian_work_entries: [...draft.canadian_work_entries, newWork] });
  };

  const handleRemoveWork = (id: string) => {
    onChange({
      canadian_work_entries: draft.canadian_work_entries.filter((w) => w.id !== id),
    });
  };

  const handleUpdateWork = (id: string, updates: Partial<CanadianWorkEntry>) => {
    onChange({
      canadian_work_entries: draft.canadian_work_entries.map((w) =>
        w.id === id ? { ...w, ...updates } : w
      ),
    });
  };

  return (
    <div className="space-y-6">
      {/* Experience Toggle */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-2xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <MapPin className="w-4 h-4 text-[#0B192C]" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
            Canadian In-Country Experience
          </h3>
        </div>

        <Checkbox
          id="has_canadian_experience"
          label="I have Canadian study or work experience (past or current)"
          description="Select if you have studied at a Canadian DLI or worked in Canada on a valid permit."
          checked={draft.has_canadian_experience}
          onChange={(checked) => onChange({ has_canadian_experience: checked })}
        />
      </div>

      {draft.has_canadian_experience ? (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Canadian Studies */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5">
                <School className="w-4 h-4 text-[#0B192C]" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                  Canadian Study Programs
                </h4>
              </div>
              <button
                type="button"
                onClick={handleAddStudy}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Add Canadian Study</span>
              </button>
            </div>

            {draft.canadian_studies.length === 0 ? (
              <div className="p-4 bg-[#F4F7FB] border border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-500">
                No Canadian study programs logged. Click &quot;Add Canadian Study&quot; if you attended a Canadian designated learning institution.
              </div>
            ) : (
              draft.canadian_studies.map((s, idx) => (
                <RepeaterCard
                  key={s.id}
                  id={s.id}
                  title={`Study Program #${idx + 1}: ${s.institution || 'Canadian Institution'}`}
                  onRemove={() => handleRemoveStudy(s.id)}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <TextField
                      id={`can-inst-${s.id}`}
                      label="Institution / College / University"
                      placeholder="e.g. Seneca College, University of Toronto"
                      value={s.institution}
                      onChange={(e) => handleUpdateStudy(s.id, { institution: e.target.value })}
                    />

                    <SelectField
                      id={`can-prov-${s.id}`}
                      label="Province / Territory"
                      options={CANADIAN_PROVINCES}
                      value={s.province}
                      onChange={(e) => handleUpdateStudy(s.id, { province: e.target.value })}
                    />

                    <div className="sm:col-span-2">
                      <SelectField
                        id={`can-cred-${s.id}`}
                        label="Credential Level"
                        options={EDUCATION_LEVEL_OPTIONS}
                        value={s.credential_level}
                        onChange={(e) => handleUpdateStudy(s.id, { credential_level: e.target.value })}
                      />
                    </div>

                    <TextField
                      id={`can-start-${s.id}`}
                      label="Start Date"
                      type="month"
                      value={s.start_date}
                      onChange={(e) => handleUpdateStudy(s.id, { start_date: e.target.value })}
                    />

                    <TextField
                      id={`can-end-${s.id}`}
                      label="Completion / End Date"
                      type="month"
                      value={s.end_date}
                      onChange={(e) => handleUpdateStudy(s.id, { end_date: e.target.value })}
                    />

                    <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 pt-1">
                      <Checkbox
                        id={`can-comp-${s.id}`}
                        label="Program successfully completed"
                        checked={s.is_completed}
                        onChange={(checked) => handleUpdateStudy(s.id, { is_completed: checked })}
                      />
                      <Checkbox
                        id={`can-pgwp-${s.id}`}
                        label="Eligible for Post-Graduation Work Permit (PGWP)"
                        checked={s.is_pgwp_eligible}
                        onChange={(checked) => handleUpdateStudy(s.id, { is_pgwp_eligible: checked })}
                      />
                    </div>
                  </div>
                </RepeaterCard>
              ))
            )}
          </div>

          {/* Canadian Work History */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-[#0B192C]" />
                <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                  Canadian Work Experience
                </h4>
              </div>
              <button
                type="button"
                onClick={handleAddWork}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Add Canadian Job</span>
              </button>
            </div>

            {draft.canadian_work_entries.length === 0 ? (
              <div className="p-4 bg-[#F4F7FB] border border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-500">
                No Canadian work positions logged. Click &quot;Add Canadian Job&quot; to add employment physically located in Canada.
              </div>
            ) : (
              draft.canadian_work_entries.map((cw, idx) => (
                <RepeaterCard
                  key={cw.id}
                  id={cw.id}
                  title={`Canadian Job #${idx + 1}: ${cw.job_title || 'Position'} (${cw.province_or_city || 'Canada'})`}
                  onRemove={() => handleRemoveWork(cw.id)}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <TextField
                      id={`cw-title-${cw.id}`}
                      label="Job Title"
                      placeholder="e.g. Graphic Designer, Project Lead"
                      value={cw.job_title}
                      onChange={(e) => handleUpdateWork(cw.id, { job_title: e.target.value })}
                    />

                    <TextField
                      id={`cw-emp-${cw.id}`}
                      label="Employer Name"
                      placeholder="e.g. Canadian Employer Inc."
                      value={cw.employer}
                      onChange={(e) => handleUpdateWork(cw.id, { employer: e.target.value })}
                    />

                    <TextField
                      id={`cw-loc-${cw.id}`}
                      label="City / Province"
                      placeholder="e.g. Calgary, Alberta"
                      value={cw.province_or_city}
                      onChange={(e) => handleUpdateWork(cw.id, { province_or_city: e.target.value })}
                    />

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs sm:text-sm font-medium text-slate-700 block">
                          NOC Code / TEER
                        </label>
                        <a
                          href={OFFICIAL_NOC_FINDER_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0B192C] hover:text-[#C59B27] transition-colors"
                        >
                          <Search className="w-3 h-3 text-[#C59B27]" />
                          <span>Find NOC</span>
                          <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                        </a>
                      </div>
                      <TextField
                        id={`cw-noc-${cw.id}`}
                        label=""
                        placeholder="e.g. NOC 21234 / TEER 1"
                        value={cw.noc_or_teer}
                        onChange={(e) => handleUpdateWork(cw.id, { noc_or_teer: e.target.value })}
                        helperText="Canadian 5-digit NOC code or TEER level."
                      />
                    </div>

                    <TextField
                      id={`cw-start-${cw.id}`}
                      label="Start Date"
                      type="month"
                      value={cw.start_date}
                      onChange={(e) => handleUpdateWork(cw.id, { start_date: e.target.value })}
                    />

                    <div>
                      <TextField
                        id={`cw-end-${cw.id}`}
                        label="End Date"
                        type="month"
                        value={cw.end_date}
                        disabled={cw.is_current}
                        onChange={(e) => handleUpdateWork(cw.id, { end_date: e.target.value })}
                      />
                      <div className="mt-1.5">
                        <Checkbox
                          id={`cw-curr-${cw.id}`}
                          label="Currently active in this Canadian role"
                          checked={cw.is_current}
                          onChange={(checked) => handleUpdateWork(cw.id, { is_current: checked })}
                        />
                      </div>
                    </div>

                    <TextField
                      id={`cw-hrs-${cw.id}`}
                      label="Weekly Hours"
                      type="number"
                      placeholder="e.g. 37.5 or 40"
                      value={cw.weekly_hours}
                      onChange={(e) => handleUpdateWork(cw.id, { weekly_hours: e.target.value })}
                    />

                    <SelectField
                      id={`cw-permit-${cw.id}`}
                      label="Work Authorization / Permit Type"
                      options={WORK_PERMIT_TYPES}
                      value={cw.work_permit_type}
                      onChange={(e) => handleUpdateWork(cw.id, { work_permit_type: e.target.value })}
                    />
                  </div>
                </RepeaterCard>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 bg-[#F4F7FB] border border-slate-200 rounded-2xl text-xs text-slate-600">
          No Canadian study or work experience selected. If you do not have in-Canada background, you can proceed directly to the next step.
        </div>
      )}
    </div>
  );
};
