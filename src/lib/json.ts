import { CandidateDraftState, CandidateProfileExport } from '../types';
import { calculateCompletedAge, getISO8601Timestamp } from './dates';

/**
 * Generates strict, normalized JSON data object matching the intake schema.
 * All optional values use null when not present or not applicable.
 * Lists default to empty arrays.
 * Raw language scores are stored as strings without CLB translation.
 * No scoring or assessment fields are added.
 */
export function generateCandidateProfile(draft: CandidateDraftState): CandidateProfileExport {
  const profileId = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : 'cand-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36);

  const timestamp = getISO8601Timestamp();
  const calculatedAge = calculateCompletedAge(draft.date_of_birth);

  const isMarriedOrCommonLaw =
    draft.marital_status === 'Married' || draft.marital_status === 'Common-Law';

  const spouseData = isMarriedOrCommonLaw && draft.has_spouse
    ? {
        full_name: draft.spouse_full_name.trim() || null,
        date_of_birth: draft.spouse_date_of_birth.trim() || null,
        citizenship: draft.spouse_citizenship.trim() || null,
        education_level: draft.spouse_education_level.trim() || null,
        language_test: draft.spouse_language_test.trim() || null,
        canadian_work_or_study: draft.spouse_canadian_work_or_study.trim() || null,
      }
    : null;

  const dependentsList = Array.isArray(draft.dependents)
    ? draft.dependents.map((dep) => ({
        id: dep.id,
        relationship: dep.relationship.trim() || 'Dependent child',
        date_of_birth: dep.date_of_birth.trim() || null,
        accompanying: Boolean(dep.accompanying),
      }))
    : [];

  const additionalEducationList = Array.isArray(draft.additional_education)
    ? draft.additional_education.map((edu) => ({
        id: edu.id,
        level: edu.level.trim() || '',
        field_of_study: edu.field_of_study.trim() || '',
        institution: edu.institution.trim() || '',
        country: edu.country.trim() || '',
        completion_year: edu.completion_year.trim() || '',
        has_eca: Boolean(edu.has_eca),
      }))
    : [];

  const foreignWorkList = Array.isArray(draft.foreign_work_entries)
    ? draft.foreign_work_entries.map((w) => ({
        id: w.id,
        job_title: w.job_title.trim() || '',
        employer: w.employer.trim() || '',
        country: w.country.trim() || '',
        is_current: Boolean(w.is_current),
        start_date: w.start_date.trim() || '',
        end_date: w.is_current ? null : (w.end_date.trim() || null),
        is_full_time: Boolean(w.is_full_time),
        weekly_hours: w.weekly_hours ? parseFloat(w.weekly_hours) || null : null,
        main_duties: w.main_duties.trim() || '',
      }))
    : [];

  const canadianStudiesList = draft.has_canadian_experience && Array.isArray(draft.canadian_studies)
    ? draft.canadian_studies.map((s) => ({
        id: s.id,
        institution: s.institution.trim() || '',
        credential_level: s.credential_level.trim() || '',
        province: s.province.trim() || '',
        start_date: s.start_date.trim() || '',
        end_date: s.end_date.trim() || null,
        is_completed: Boolean(s.is_completed),
        is_pgwp_eligible: Boolean(s.is_pgwp_eligible),
      }))
    : [];

  const canadianWorkList = draft.has_canadian_experience && Array.isArray(draft.canadian_work_entries)
    ? draft.canadian_work_entries.map((cw) => ({
        id: cw.id,
        job_title: cw.job_title.trim() || '',
        employer: cw.employer.trim() || '',
        province_or_city: cw.province_or_city.trim() || '',
        is_current: Boolean(cw.is_current),
        start_date: cw.start_date.trim() || '',
        end_date: cw.is_current ? null : (cw.end_date.trim() || null),
        noc_or_teer: cw.noc_or_teer.trim() || '',
        weekly_hours: cw.weekly_hours ? parseFloat(cw.weekly_hours) || null : null,
        work_permit_type: cw.work_permit_type.trim() || '',
      }))
    : [];

  const secondOfficialLanguage = draft.has_second_language_test && draft.second_language_test !== 'None'
    ? {
        test_type: draft.second_language_test,
        test_date: draft.second_test_date.trim() || null,
        registration_number: draft.second_registration_number.trim() || null,
        scores: {
          listening: draft.second_listening.trim() || null,
          reading: draft.second_reading.trim() || null,
          writing: draft.second_writing.trim() || null,
          speaking: draft.second_speaking.trim() || null,
        },
      }
    : null;

  const expressEntryDetails = draft.has_active_express_entry
    ? {
        profile_number: draft.express_entry_profile_number.trim() || null,
        job_seeker_code: draft.express_entry_job_seeker_code.trim() || null,
        submission_date: draft.express_entry_submission_date.trim() || null,
      }
    : null;

  const jobOfferDetails = draft.has_canadian_job_offer
    ? {
        employer_name: draft.job_offer_employer.trim() || null,
        job_title: draft.job_offer_title.trim() || null,
        province: draft.job_offer_province.trim() || null,
        is_lmia_approved_or_exempt: draft.job_offer_lmia_status.trim() || null,
      }
    : null;

  const profile: CandidateProfileExport = {
    profile_version: '1.0.0',
    profile_id: profileId,
    generated_at: timestamp,
    source_tool: 'Canada Immigration Candidate Profile Generator',
    consent: {
      accuracy_confirmed: Boolean(draft.consent_accuracy),
      non_advice_acknowledged: Boolean(draft.consent_non_advice),
      local_storage_understood: Boolean(draft.consent_local_storage),
      consent_timestamp: timestamp,
    },
    contact: {
      full_name: draft.full_name.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      current_country: draft.country_of_residence.trim(),
      current_city: draft.city_of_residence.trim(),
    },
    candidate: {
      date_of_birth: draft.date_of_birth.trim(),
      calculated_age: calculatedAge,
      country_of_citizenship: draft.country_of_citizenship.trim(),
      gender: draft.gender.trim(),
      marital_status: draft.marital_status.trim(),
    },
    family: {
      has_spouse: Boolean(spouseData),
      spouse: spouseData,
      dependents_count: dependentsList.length,
      dependents: dependentsList,
    },
    education: {
      highest_level: draft.highest_education_level.trim(),
      field_of_study: draft.field_of_study.trim(),
      institution: draft.institution_name.trim(),
      country: draft.education_country.trim(),
      start_year: draft.education_start_year.trim(),
      end_year: draft.education_end_year.trim(),
      has_eca: Boolean(draft.has_eca),
      eca_organization: draft.has_eca ? (draft.eca_organization.trim() || null) : null,
      eca_reference_number: draft.has_eca ? (draft.eca_reference_number.trim() || null) : null,
      eca_canadian_equivalency: draft.has_eca ? (draft.eca_canadian_equivalency.trim() || null) : null,
      additional_credentials: additionalEducationList,
    },
    language: {
      first_official: {
        test_type: draft.first_language_test,
        test_date: draft.first_test_date.trim() || null,
        registration_number: draft.first_registration_number.trim() || null,
        scores: {
          listening: draft.first_listening.trim() || null,
          reading: draft.first_reading.trim() || null,
          writing: draft.first_writing.trim() || null,
          speaking: draft.first_speaking.trim() || null,
        },
      },
      second_official: secondOfficialLanguage,
    },
    work_experience: {
      primary_occupation: draft.primary_occupation.trim(),
      noc_code_or_teer: draft.noc_code_or_teer.trim(),
      total_years_foreign_experience: draft.total_foreign_work_years.trim(),
      foreign_entries: foreignWorkList,
    },
    canadian_experience: {
      has_canadian_experience: Boolean(draft.has_canadian_experience),
      study_history: canadianStudiesList,
      work_history: canadianWorkList,
    },
    immigration_history: {
      has_previous_canadian_applications: Boolean(draft.has_previous_canadian_applications),
      previous_applications_details: draft.has_previous_canadian_applications
        ? (draft.previous_applications_details.trim() || null)
        : null,
      has_previous_refusals: Boolean(draft.has_previous_refusals),
      refusal_details: draft.has_previous_refusals ? (draft.refusal_details.trim() || null) : null,
      has_inadmissibility_or_removal_concerns: Boolean(draft.has_inadmissibility_concerns),
      inadmissibility_details: draft.has_inadmissibility_concerns
        ? (draft.inadmissibility_details.trim() || null)
        : null,
      has_active_express_entry: Boolean(draft.has_active_express_entry),
      express_entry_details: expressEntryDetails,
    },
    provincial_connections: {
      preferred_provinces: draft.preferred_provinces || [],
      willing_to_relocate_anywhere: Boolean(draft.open_to_any_province),
      has_family_in_canada: Boolean(draft.has_family_in_canada),
      family_ties_details: draft.has_family_in_canada ? (draft.family_ties_details.trim() || null) : null,
      has_canadian_job_offer: Boolean(draft.has_canadian_job_offer),
      job_offer_details: jobOfferDetails,
    },
    financial_information: {
      available_settlement_funds_cad: draft.available_funds_cad ? parseFloat(draft.available_funds_cad) || null : null,
      settlement_funds_currency: draft.funds_currency.trim(),
      funds_source_type: draft.funds_source_type.trim(),
      family_members_count_for_funds: draft.family_members_count_for_funds ? parseInt(draft.family_members_count_for_funds, 10) || 1 : 1,
    },
    career_preferences: {
      target_job_titles: draft.target_job_titles.trim(),
      open_to_regional_or_rural_programs: Boolean(draft.open_to_regional_or_rural_programs),
      target_immigration_timeline: draft.target_immigration_timeline.trim(),
    },
    additional_information: {
      candidate_notes: draft.additional_notes.trim(),
    },
    document_availability: {
      valid_passport: Boolean(draft.doc_valid_passport),
      educational_certificates: Boolean(draft.doc_education_certificates),
      official_transcripts: Boolean(draft.doc_transcripts),
      eca_report: Boolean(draft.doc_eca_report),
      language_test_report: Boolean(draft.doc_language_test_report),
      employment_reference_letters: Boolean(draft.doc_reference_letters),
      proof_of_funds_bank_statements: Boolean(draft.doc_bank_statements),
      police_clearance_certificates: Boolean(draft.doc_police_clearance),
    },
  };

  return profile;
}
