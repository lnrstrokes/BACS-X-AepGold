import React, { useState } from 'react';
import { CandidateDraftState, StepErrors } from '../types';
import { TextField } from '../components/TextField';
import { SelectField } from '../components/SelectField';
import { CURRENCY_OPTIONS } from '../constants';
import { DollarSign, Info, HelpCircle, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

interface FinancialStepProps {
  draft: CandidateDraftState;
  onChange: (fields: Partial<CandidateDraftState>) => void;
  errors?: StepErrors;
}

// 2024-2025 IRCC Express Entry Proof of Funds Benchmarks (CAD)
const IRCC_FUNDS_BENCHMARK: Record<number, number> = {
  1: 14690,
  2: 18288,
  3: 22483,
  4: 27297,
  5: 30958,
  6: 34917,
  7: 38875,
};

export const FinancialStep: React.FC<FinancialStepProps> = (props) => {
  const { draft, onChange, errors = {} } = props;
  const [showFundsGuide, setShowFundsGuide] = useState(false);

  const familyCount = Math.max(1, parseInt(draft.family_members_count_for_funds || '1', 10) || 1);
  const requiredBenchmark = familyCount <= 7 
    ? IRCC_FUNDS_BENCHMARK[familyCount] 
    : IRCC_FUNDS_BENCHMARK[7] + (familyCount - 7) * 3958;

  const enteredFunds = parseFloat(draft.available_funds_cad || '0');
  const hasEnteredFunds = !isNaN(enteredFunds) && enteredFunds > 0;
  const meetsBenchmark = hasEnteredFunds && enteredFunds >= requiredBenchmark;

  return (
    <div className="space-y-6">
      {/* Informational Callout */}
      <div className="p-4 bg-[#F4F7FB] border border-slate-200 rounded-2xl flex items-start gap-3 text-xs text-slate-700 shadow-2xs">
        <Info className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="leading-relaxed">
            Settlement funds demonstrate that you and your family have unencumbered, transferable funds to establish yourselves in Canada. All evaluations are measured in <strong>Canadian Dollars (CAD)</strong>.
          </p>
          <p className="text-[11px] text-slate-500">
            * Note: Automated Nigerian Naira (NGN) and live exchange rate conversion will be integrated in an upcoming release. Please enter the approximate CAD equivalent.
          </p>
        </div>
      </div>

      {/* Funds Input Card */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <DollarSign className="w-4 h-4 text-[#0B192C]" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide">
            Settlement Funds &amp; Financial Capacity (CAD)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            id="available_funds_cad"
            label="Approximate Available Funds (in CAD)"
            placeholder="e.g. 25000"
            type="number"
            value={draft.available_funds_cad}
            onChange={(e) => onChange({ available_funds_cad: e.target.value })}
            required
            error={errors.available_funds_cad}
            helperText="Enter numerical amount in Canadian Dollars (CAD)."
          />

          <SelectField
            id="funds_currency"
            label="Holding / Native Currency"
            options={CURRENCY_OPTIONS}
            value={draft.funds_currency || 'CAD - Canadian Dollar (Official IRCC Standard)'}
            onChange={(e) => onChange({ funds_currency: e.target.value })}
            helperText="Currency currently held in your home bank accounts."
          />

          <SelectField
            id="funds_source_type"
            label="Primary Source of Funds"
            options={[
              'Personal Savings & Bank Deposits',
              'Fixed Deposits / Term Deposits',
              'Liquid Investment Accounts (Stocks/Bonds/Mutual Funds)',
              'Provident Fund / Retirement Liquidation',
              'Gift Deed / Family Inheritance',
              'Property Sale Proceeds (Liquidated)',
              'Multiple combined liquid sources',
            ]}
            value={draft.funds_source_type}
            onChange={(e) => onChange({ funds_source_type: e.target.value })}
          />

          <TextField
            id="family_members_count_for_funds"
            label="Number of Family Members (Self + Dependents)"
            placeholder="e.g. 1, 2, 3, 4"
            type="number"
            min={1}
            value={draft.family_members_count_for_funds}
            onChange={(e) => onChange({ family_members_count_for_funds: e.target.value })}
            helperText="Total count of people you must support (including spouse and children, even if not accompanying)."
          />
        </div>

        {/* Dynamic IRCC Proof of Funds Benchmark Indicator */}
        <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-800">
              IRCC Minimum Settlement Funds Benchmark ({familyCount} {familyCount === 1 ? 'person' : 'people'}):
            </span>
            <span className="text-xs font-mono font-bold text-[#0B192C] bg-slate-200/80 px-2 py-0.5 rounded">
              ${requiredBenchmark.toLocaleString()} CAD
            </span>
          </div>

          {hasEnteredFunds && (
            <div className="pt-1 flex items-center gap-2 text-xs">
              {meetsBenchmark ? (
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Your declared funds (${enteredFunds.toLocaleString()} CAD) meet or exceed the standard Federal Skilled Worker settlement requirement.
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-amber-700 font-medium">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Your declared funds (${enteredFunds.toLocaleString()} CAD) are below the standard threshold (${requiredBenchmark.toLocaleString()} CAD). Your consultant can advise on provincial programs, job offers, or acceptable gift deeds.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Collapsible Proof of Funds Context & Guidance */}
        <div className="border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => setShowFundsGuide(!showFundsGuide)}
            className="w-full flex items-center justify-between text-left text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>What counts as valid settlement funds for Canada?</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <span>{showFundsGuide ? 'Hide details' : 'View acceptable funds guidance'}</span>
              {showFundsGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </div>
          </button>

          {showFundsGuide && (
            <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-2.5 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-2.5 bg-emerald-50/50 border border-emerald-200/60 rounded-lg">
                  <span className="font-bold text-emerald-900 block text-[11px] uppercase tracking-wider mb-1">
                    Acceptable Proof of Funds:
                  </span>
                  <ul className="list-disc list-inside text-[11px] text-emerald-800 space-y-0.5">
                    <li>Liquid savings or chequing account deposits</li>
                    <li>Fixed/term deposits (with unencumbered withdrawal access)</li>
                    <li>Mutual funds, stocks, bonds, treasury bills</li>
                    <li>Official gift deeds from immediate family with bank proof</li>
                  </ul>
                </div>

                <div className="p-2.5 bg-rose-50/50 border border-rose-200/60 rounded-lg">
                  <span className="font-bold text-rose-900 block text-[11px] uppercase tracking-wider mb-1">
                    Not Acceptable:
                  </span>
                  <ul className="list-disc list-inside text-[11px] text-rose-800 space-y-0.5">
                    <li>Real estate or land equity value</li>
                    <li>Vehicles, jewelry, or physical asset valuations</li>
                    <li>Borrowed loans or temporary credit lines</li>
                    <li>Funds with withdrawal encumbrances</li>
                  </ul>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                * Candidates applying under the Canadian Experience Class (CEC) or with a valid LMIA-supported Canadian job offer are typically exempt from settlement fund requirements.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
