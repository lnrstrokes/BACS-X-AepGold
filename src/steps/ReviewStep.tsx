import React from 'react';
import { CandidateDraftState, StepKey } from '../types';
import { ReviewSection, ReviewItem } from '../components/ReviewSection';
import { Checkbox } from '../components/CheckboxGroup';
import { calculateCompletedAge, formatFriendlyDate } from '../lib/dates';
import { ShieldCheck, Lock, AlertCircle } from 'lucide-react';

interface ReviewStepProps {
  draft: CandidateDraftState;
  onChange: (fields: Partial<CandidateDraftState>) => void;
  onEditSection: (stepKey: StepKey) => void;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  draft,
  onChange,
  onEditSection,
}) => {
  const calculatedAge = calculateCompletedAge(draft.date_of_birth);
  const isMarriedOrCommonLaw =
    draft.marital_status === 'Married' || draft.marital_status === 'Common-Law';

  const allConsentsChecked =
    draft.consent_accuracy &&
    draft.consent_non_advice &&
    draft.consent_local_storage;

  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      <div className="p-4 bg-[#0B192C] text-white rounded-2xl flex items-start gap-3 shadow-xs">
        <ShieldCheck className="w-5 h-5 text-[#C59B27] shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold text-slate-100 text-sm">
            Intake Review & Data Verification
          </p>
          <p className="text-slate-300 leading-relaxed">
            Please review your intake summary below. Click &quot;Edit&quot; on any section to make corrections before generating your structured candidate profile JSON.
          </p>
        </div>
      </div>

      {/* Section 1: Personal & Contact */}
      <ReviewSection
        id="rev-personal"
        title="1. Personal & Contact Information"
        stepKey="personal"
        onEdit={onEditSection}
      >
        <ReviewItem label="Full Legal Name" value={draft.full_name} />
        <ReviewItem label="Email Address" value={draft.email} />
        <ReviewItem label="Phone Number" value={draft.phone} />
        <ReviewItem label="Citizenship" value={draft.country_of_citizenship} />
        <ReviewItem
          label="Current Residence"
          value={`${draft.city_of_residence ? draft.city_of_residence + ', ' : ''}${draft.country_of_residence}`}
        />
        <ReviewItem
          label="Date of Birth / Age"
          value={`${formatFriendlyDate(draft.date_of_birth)} (${calculatedAge !== null ? `${calculatedAge} years old` : 'Age pending'})`}
        />
        <ReviewItem label="Gender" value={draft.gender} />
        <ReviewItem label="Marital Status" value={draft.marital_status} />
      </ReviewSection>

      {/* Section 2: Family */}
      <ReviewSection
        id="rev-family"
        title="2. Family Information"
        stepKey="family"
        onEdit={onEditSection}
      >
        {isMarriedOrCommonLaw ? (
          <>
            <ReviewItem label="Spouse Full Name" value={draft.spouse_full_name} />
            <ReviewItem label="Spouse Date of Birth" value={formatFriendlyDate(draft.spouse_date_of_birth)} />
            <ReviewItem label="Spouse Citizenship" value={draft.spouse_citizenship} />
            <ReviewItem label="Spouse Education" value={draft.spouse_education_level} />
            <ReviewItem label="Spouse Language Test" value={draft.spouse_language_test} />
            <ReviewItem label="Spouse Canadian Exp." value={draft.spouse_canadian_work_or_study} />
          </>
        ) : (
          <ReviewItem label="Spouse" value="Not Applicable (Single / Non-partnered)" />
        )}
        <ReviewItem
          label="Dependent Children"
          value={
            draft.dependents.length > 0
              ? `${draft.dependents.length} child(ren) recorded (${draft.dependents.filter((d) => d.accompanying).length} accompanying)`
              : 'None'
          }
        />
      </ReviewSection>

      {/* Section 3: Education */}
      <ReviewSection
        id="rev-education"
        title="3. Education History"
        stepKey="education"
        onEdit={onEditSection}
      >
        <ReviewItem label="Highest Credential" value={draft.highest_education_level} />
        <ReviewItem label="Field of Study" value={draft.field_of_study} />
        <ReviewItem label="Institution & Country" value={`${draft.institution_name}, ${draft.education_country}`} />
        <ReviewItem label="Study Period" value={`${draft.education_start_year || '—'} to ${draft.education_end_year}`} />
        <ReviewItem
          label="ECA Status"
          value={
            draft.has_eca
              ? `Yes (${draft.eca_organization || 'ECA Org'} - Ref: ${draft.eca_reference_number || 'N/A'}) [Equiv: ${draft.eca_canadian_equivalency || 'Stated'}]`
              : 'No ECA obtained yet'
          }
        />
        {draft.additional_education.length > 0 && (
          <ReviewItem
            label="Additional Degrees"
            value={`${draft.additional_education.length} additional credential(s) listed`}
          />
        )}
      </ReviewSection>

      {/* Section 4: Language Ability */}
      <ReviewSection
        id="rev-language"
        title="4. Official Language Test Results"
        stepKey="language"
        onEdit={onEditSection}
      >
        <ReviewItem label="First Test Type" value={draft.first_language_test} />
        {draft.first_language_test !== 'None' && (
          <>
            <ReviewItem label="Test Date & TRF" value={`${formatFriendlyDate(draft.first_test_date)} (TRF: ${draft.first_registration_number || 'N/A'})`} />
            <ReviewItem
              label="Raw Scores (L / R / W / S)"
              value={`Listening: ${draft.first_listening || '—'} | Reading: ${draft.first_reading || '—'} | Writing: ${draft.first_writing || '—'} | Speaking: ${draft.first_speaking || '—'}`}
            />
          </>
        )}
        {draft.has_second_language_test && draft.second_language_test !== 'None' && (
          <ReviewItem
            label="Second Language Test"
            value={`${draft.second_language_test} (Scores: L:${draft.second_listening || '—'}, R:${draft.second_reading || '—'}, W:${draft.second_writing || '—'}, S:${draft.second_speaking || '—'})`}
          />
        )}
      </ReviewSection>

      {/* Section 5: Foreign Work Experience */}
      <ReviewSection
        id="rev-work"
        title="5. Foreign Work Experience"
        stepKey="work"
        onEdit={onEditSection}
      >
        <ReviewItem label="Primary Occupation" value={draft.primary_occupation} />
        <ReviewItem label="NOC / TEER" value={draft.noc_code_or_teer} />
        <ReviewItem label="Total Years" value={draft.total_foreign_work_years} />
        <ReviewItem
          label="Employment Positions"
          value={
            draft.foreign_work_entries.length > 0
              ? `${draft.foreign_work_entries.length} position(s) entered`
              : 'None detailed'
          }
        />
      </ReviewSection>

      {/* Section 6: Canadian Experience */}
      <ReviewSection
        id="rev-canada"
        title="6. Canadian In-Country Experience"
        stepKey="canada"
        onEdit={onEditSection}
      >
        <ReviewItem
          label="In-Canada Experience"
          value={
            draft.has_canadian_experience
              ? `${draft.canadian_studies.length} study program(s), ${draft.canadian_work_entries.length} Canadian work position(s)`
              : 'None'
          }
        />
      </ReviewSection>

      {/* Section 7: Immigration History */}
      <ReviewSection
        id="rev-immigration"
        title="7. Immigration & Visa History"
        stepKey="immigration"
        onEdit={onEditSection}
      >
        <ReviewItem
          label="Prior Canadian Applications"
          value={draft.has_previous_canadian_applications ? draft.previous_applications_details || 'Yes' : 'No'}
        />
        <ReviewItem
          label="Visa Refusals (Any Country)"
          value={draft.has_previous_refusals ? draft.refusal_details || 'Yes' : 'No'}
        />
        <ReviewItem
          label="Admissibility Disclosures"
          value={draft.has_inadmissibility_concerns ? draft.inadmissibility_details || 'Yes' : 'No concerns'}
        />
        <ReviewItem
          label="Active Express Entry Pool"
          value={
            draft.has_active_express_entry
              ? `Yes (EE: ${draft.express_entry_profile_number || 'Active'})`
              : 'No'
          }
        />
      </ReviewSection>

      {/* Section 8: Provincial Connections */}
      <ReviewSection
        id="rev-provincial"
        title="8. Provincial Connections & Ties"
        stepKey="provincial"
        onEdit={onEditSection}
      >
        <ReviewItem
          label="Province Flexibility"
          value={draft.open_to_any_province ? 'Open to any province/territory' : 'Specific provinces only'}
        />
        <ReviewItem
          label="Preferred Provinces"
          value={draft.preferred_provinces?.length ? draft.preferred_provinces.join(', ') : 'None selected'}
        />
        <ReviewItem
          label="Canadian Family Ties"
          value={draft.has_family_in_canada ? draft.family_ties_details || 'Yes' : 'No'}
        />
        <ReviewItem
          label="Canadian Job Offer"
          value={
            draft.has_canadian_job_offer
              ? `${draft.job_offer_title || 'Position'} at ${draft.job_offer_employer || 'Employer'} (${draft.job_offer_lmia_status || 'Status'})`
              : 'No'
          }
        />
      </ReviewSection>

      {/* Section 9: Settlement Funds */}
      <ReviewSection
        id="rev-financial"
        title="9. Settlement Funds & Financials"
        stepKey="financial"
        onEdit={onEditSection}
      >
        <ReviewItem
          label="Available Funds"
          value={
            draft.available_funds_cad
              ? `$${parseFloat(draft.available_funds_cad).toLocaleString()} CAD equivalent (${draft.funds_currency})`
              : '—'
          }
        />
        <ReviewItem label="Funding Source" value={draft.funds_source_type} />
        <ReviewItem
          label="Supported Family Count"
          value={`${draft.family_members_count_for_funds || 1} person(s)`}
        />
      </ReviewSection>

      {/* Section 10: Career & Documents */}
      <ReviewSection
        id="rev-career"
        title="10. Career Goals & Documents"
        stepKey="career"
        onEdit={onEditSection}
      >
        <ReviewItem label="Target Roles in Canada" value={draft.target_job_titles} />
        <ReviewItem label="Target Timeline" value={draft.target_immigration_timeline} />
        <ReviewItem
          label="Regional / Rural Programs"
          value={draft.open_to_regional_or_rural_programs ? 'Open to regional opportunities' : 'Major metropolitan only'}
        />
        <ReviewItem
          label="Document Readiness"
          value={`Passport: ${draft.doc_valid_passport ? 'Yes' : 'No'}, ECA: ${draft.doc_eca_report ? 'Yes' : 'No'}, Language: ${draft.doc_language_test_report ? 'Yes' : 'No'}, Bank: ${draft.doc_bank_statements ? 'Yes' : 'No'}`}
        />
      </ReviewSection>

      {/* Mandatory Consents Box */}
      <div className="p-6 bg-[#FBF6EB] border border-[#E8D399] rounded-2xl space-y-4 shadow-2xs">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#8A6A14]" />
          <h3 className="text-sm font-bold text-[#3E2F08] uppercase tracking-wide">
            Mandatory Candidate Consents & Acknowledgments
          </h3>
        </div>
        <p className="text-xs text-[#5D460E] leading-relaxed">
          You must check all three acknowledgments below to enable profile generation:
        </p>

        <div className="space-y-3 bg-white p-4 rounded-xl border border-[#E8D399]/60">
          <Checkbox
            id="consent_accuracy"
            required
            label="I confirm the information provided is accurate to the best of my knowledge."
            checked={draft.consent_accuracy}
            onChange={(checked) => onChange({ consent_accuracy: checked })}
          />

          <Checkbox
            id="consent_non_advice"
            required
            label="I understand this tool does not provide immigration advice, eligibility determination, or a professional assessment."
            checked={draft.consent_non_advice}
            onChange={(checked) => onChange({ consent_non_advice: checked })}
          />

          <Checkbox
            id="consent_local_storage"
            required
            label="I understand my information will remain in this browser until I download, copy, or clear it."
            checked={draft.consent_local_storage}
            onChange={(checked) => onChange({ consent_local_storage: checked })}
          />
        </div>

        {!allConsentsChecked && (
          <div className="flex items-center gap-2 text-xs text-[#8A6A14] font-medium pt-1">
            <AlertCircle className="w-4 h-4 text-[#C59B27] shrink-0" />
            <span>Please accept all 3 acknowledgments above to enable the &quot;Generate Profile&quot; button below.</span>
          </div>
        )}
      </div>
    </div>
  );
};
