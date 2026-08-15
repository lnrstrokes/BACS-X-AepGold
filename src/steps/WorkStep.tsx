import React, { useState } from 'react';
import { CandidateDraftState, ForeignWorkEntry, StepErrors } from '../types';
import { TextField } from '../components/TextField';
import { TextArea } from '../components/TextArea';
import { Checkbox } from '../components/CheckboxGroup';
import { RepeaterCard } from '../components/RepeaterCard';
import { OFFICIAL_NOC_FINDER_URL } from '../constants';
import {
  Briefcase,
  Plus,
  ExternalLink,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
} from 'lucide-react';

interface WorkStepProps {
  draft: CandidateDraftState;
  onChange: (fields: Partial<CandidateDraftState>) => void;
  errors?: StepErrors;
}

export const WorkStep: React.FC<WorkStepProps> = (props) => {
  const { draft, onChange, errors = {} } = props;
  const [showNocGuide, setShowNocGuide] = useState(false);

  const handleAddJob = () => {
    const newJob: ForeignWorkEntry = {
      id: 'work-' + Math.random().toString(36).substring(2, 9),
      job_title: '',
      employer: '',
      country: '',
      is_current: true,
      start_date: '',
      end_date: '',
      is_full_time: true,
      weekly_hours: '40',
      main_duties: '',
    };
    onChange({ foreign_work_entries: [...draft.foreign_work_entries, newJob] });
  };

  const handleRemoveJob = (id: string) => {
    onChange({
      foreign_work_entries: draft.foreign_work_entries.filter((w) => w.id !== id),
    });
  };

  const handleUpdateJob = (id: string, updates: Partial<ForeignWorkEntry>) => {
    onChange({
      foreign_work_entries: draft.foreign_work_entries.map((w) =>
        w.id === id ? { ...w, ...updates } : w
      ),
    });
  };

  return (
    <div className="space-y-6">
      {/* Primary Occupation Overview */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#0B192C]" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              Primary Occupation & Experience
            </h3>
          </div>

          {/* Direct official link to find NOC Code */}
          <a
            href={OFFICIAL_NOC_FINDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F7FB] hover:bg-[#E8EDF5] text-[#0B192C] text-xs font-semibold rounded-xl border border-slate-200 hover:border-slate-300 transition-colors shadow-2xs group"
          >
            <Search className="w-3.5 h-3.5 text-[#C59B27] group-hover:scale-110 transition-transform" />
            <span>Find your NOC Code (Official ESDC Portal)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <TextField
              id="primary_occupation"
              label="Primary Occupation / Job Title"
              placeholder="e.g. Software Engineer, Financial Analyst, Registered Nurse"
              value={draft.primary_occupation}
              onChange={(e) => onChange({ primary_occupation: e.target.value })}
              required
              error={errors.primary_occupation}
              helperText="The primary skilled occupation in which you have the most continuous work experience."
            />
          </div>

          <div>
            <TextField
              id="noc_code_or_teer"
              label="NOC Code / TEER (If known)"
              placeholder="e.g. NOC 21232 / TEER 1"
              value={draft.noc_code_or_teer}
              onChange={(e) => onChange({ noc_code_or_teer: e.target.value })}
              helperText="5-digit NOC 2021 code or TEER category (0, 1, 2, or 3)."
            />
          </div>

          {/* Collapsible NOC & TEER Helper Guidance Card */}
          <div className="sm:col-span-3">
            <div className="bg-[#F8FAFC] border border-slate-200/90 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setShowNocGuide(!showNocGuide)}
                className="w-full flex items-center justify-between p-3.5 text-left text-xs font-semibold text-slate-800 hover:bg-slate-100/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#C59B27]" />
                  <span>Don&apos;t know your NOC Code? How to find your code &amp; TEER category</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                  <span>{showNocGuide ? 'Hide guide' : 'View guide'}</span>
                  {showNocGuide ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </div>
              </button>

              {showNocGuide && (
                <div className="p-4 pt-1 border-t border-slate-200/80 text-xs text-slate-600 space-y-3 animate-in fade-in duration-150">
                  <p className="leading-relaxed">
                    Canada uses the <strong>National Occupational Classification (NOC 2021)</strong> 5-digit system. Your NOC is determined by your <em>actual daily job duties</em> (lead statement and main responsibilities), not necessarily your official company job title.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wide">
                        Skilled TEER Categories (Express Entry Eligible):
                      </span>
                      <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-0.5">
                        <li><strong>TEER 0:</strong> Management occupations (e.g. Directors, Managers).</li>
                        <li><strong>TEER 1:</strong> Occupations requiring a university degree (e.g. Engineers, Accountants, Doctors).</li>
                        <li><strong>TEER 2:</strong> Occupations requiring 2-3 years of college or apprenticeship (e.g. Technicians, Plumbers).</li>
                        <li><strong>TEER 3:</strong> Occupations requiring less than 2 years of college or on-the-job training (e.g. Administrative Assistants).</li>
                      </ul>
                    </div>

                    <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wide">
                          Official Search Resources:
                        </span>
                        <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                          Use Canada&apos;s official database to type your job title, compare lead duties, and copy your 5-digit code.
                        </p>
                      </div>

                      <div className="pt-1">
                        <a
                          href={OFFICIAL_NOC_FINDER_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B192C] text-white text-[11px] font-semibold rounded-lg hover:bg-[#152844] transition-colors"
                        >
                          <span>Open Canada NOC Matrix (noc.esdc.gc.ca)</span>
                          <ExternalLink className="w-3 h-3 text-[#C59B27]" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 italic">
                    Note: If you are uncertain of your exact NOC code, you can leave it blank or approximate it; your immigration consultant will accurately classify your duties during your case review.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <TextField
              id="total_foreign_work_years"
              label="Total Years of Skilled Foreign Experience"
              placeholder="e.g. 5 years, 3.5 years"
              value={draft.total_foreign_work_years}
              onChange={(e) => onChange({ total_foreign_work_years: e.target.value })}
              helperText="Continuous full-time (30+ hrs/week) or equivalent part-time skilled foreign employment within the last 10 years."
            />
          </div>
        </div>
      </div>

      {/* Employment History Repeater */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
              Foreign Work History Entries
            </h3>
            <p className="text-xs text-slate-500">
              List positions held in the last 10 years for consultant review.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddJob}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Add Work Position</span>
          </button>
        </div>

        {draft.foreign_work_entries.length === 0 ? (
          <div className="p-4 border border-dashed border-slate-200 rounded-xl text-center">
            <p className="text-xs text-slate-500">
              No detailed work positions added. Click &quot;Add Work Position&quot; above to log your employment history.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {draft.foreign_work_entries.map((w, index) => (
              <RepeaterCard
                key={w.id}
                id={w.id}
                title={`Position #${index + 1}: ${w.job_title || 'Untitled Role'}`}
                subtitle={w.employer ? `at ${w.employer}` : undefined}
                onRemove={() => handleRemoveJob(w.id)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <TextField
                    id={`work-title-${w.id}`}
                    label="Job Title"
                    placeholder="e.g. Senior Backend Developer"
                    value={w.job_title}
                    onChange={(e) => handleUpdateJob(w.id, { job_title: e.target.value })}
                  />

                  <TextField
                    id={`work-emp-${w.id}`}
                    label="Employer / Company Name"
                    placeholder="e.g. Apex Tech Solutions"
                    value={w.employer}
                    onChange={(e) => handleUpdateJob(w.id, { employer: e.target.value })}
                  />

                  <TextField
                    id={`work-cty-${w.id}`}
                    label="Country of Employment"
                    placeholder="e.g. India, United Kingdom"
                    value={w.country}
                    onChange={(e) => handleUpdateJob(w.id, { country: e.target.value })}
                  />

                  <TextField
                    id={`work-hrs-${w.id}`}
                    label="Average Weekly Hours"
                    placeholder="e.g. 40"
                    type="number"
                    value={w.weekly_hours}
                    onChange={(e) => handleUpdateJob(w.id, { weekly_hours: e.target.value })}
                  />

                  <TextField
                    id={`work-start-${w.id}`}
                    label="Start Date"
                    type="month"
                    value={w.start_date}
                    onChange={(e) => handleUpdateJob(w.id, { start_date: e.target.value })}
                  />

                  <div>
                    <TextField
                      id={`work-end-${w.id}`}
                      label="End Date"
                      type="month"
                      value={w.end_date}
                      disabled={w.is_current}
                      onChange={(e) => handleUpdateJob(w.id, { end_date: e.target.value })}
                    />
                    <div className="mt-1.5">
                      <Checkbox
                        id={`work-curr-${w.id}`}
                        label="Currently working in this position"
                        checked={w.is_current}
                        onChange={(checked) => handleUpdateJob(w.id, { is_current: checked })}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <TextArea
                      id={`work-duties-${w.id}`}
                      label="Main Duties & Responsibilities Summary"
                      placeholder="Briefly describe your day-to-day tasks, key tools, and scope of responsibilities."
                      rows={3}
                      value={w.main_duties}
                      onChange={(e) => handleUpdateJob(w.id, { main_duties: e.target.value })}
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
