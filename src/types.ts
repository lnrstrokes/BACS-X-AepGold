/**
 * Canada Immigration Candidate Profile Generator - Type Definitions
 * Strict intake data structures adhering to non-advisory, neutral standards.
 */

export interface CandidateDraftState {
  // Step 1: Personal & Contact
  full_name: string;
  email: string;
  phone: string;
  country_of_citizenship: string;
  country_of_residence: string;
  city_of_residence: string;
  date_of_birth: string;
  gender: string;
  marital_status: string;

  // Step 2: Family
  has_spouse: boolean;
  spouse_full_name: string;
  spouse_date_of_birth: string;
  spouse_citizenship: string;
  spouse_education_level: string;
  spouse_language_test: string;
  spouse_canadian_work_or_study: string;
  dependents: DependentEntry[];

  // Step 3: Education
  highest_education_level: string;
  field_of_study: string;
  institution_name: string;
  education_country: string;
  education_start_year: string;
  education_end_year: string;
  has_eca: boolean;
  eca_organization: string;
  eca_reference_number: string;
  eca_canadian_equivalency: string;
  additional_education: AdditionalEducationEntry[];

  // Step 4: Language
  first_language_test: string;
  first_test_date: string;
  first_registration_number: string;
  first_listening: string;
  first_reading: string;
  first_writing: string;
  first_speaking: string;
  
  has_second_language_test: boolean;
  second_language_test: string;
  second_test_date: string;
  second_registration_number: string;
  second_listening: string;
  second_reading: string;
  second_writing: string;
  second_speaking: string;

  // Step 5: Work Experience
  primary_occupation: string;
  noc_code_or_teer: string;
  total_foreign_work_years: string;
  foreign_work_entries: ForeignWorkEntry[];

  // Step 6: Canadian Experience
  has_canadian_experience: boolean;
  canadian_studies: CanadianStudyEntry[];
  canadian_work_entries: CanadianWorkEntry[];

  // Step 7: Immigration History
  has_previous_canadian_applications: boolean;
  previous_applications_details: string;
  has_previous_refusals: boolean;
  refusal_details: string;
  has_inadmissibility_concerns: boolean;
  inadmissibility_details: string;
  has_active_express_entry: boolean;
  express_entry_profile_number: string;
  express_entry_job_seeker_code: string;
  express_entry_submission_date: string;

  // Step 8: Provincial Connections
  preferred_provinces: string[];
  open_to_any_province: boolean;
  has_family_in_canada: boolean;
  family_ties_details: string;
  has_canadian_job_offer: boolean;
  job_offer_employer: string;
  job_offer_title: string;
  job_offer_province: string;
  job_offer_lmia_status: string;

  // Step 9: Financial Information
  available_funds_cad: string;
  funds_currency: string;
  funds_source_type: string;
  family_members_count_for_funds: string;

  // Step 10: Career Goals & Documents
  target_job_titles: string;
  open_to_regional_or_rural_programs: boolean;
  target_immigration_timeline: string;
  additional_notes: string;
  
  doc_valid_passport: boolean;
  doc_education_certificates: boolean;
  doc_transcripts: boolean;
  doc_eca_report: boolean;
  doc_language_test_report: boolean;
  doc_reference_letters: boolean;
  doc_bank_statements: boolean;
  doc_police_clearance: boolean;

  // Step 11: Consent
  consent_accuracy: boolean;
  consent_non_advice: boolean;
  consent_local_storage: boolean;
}

export interface DependentEntry {
  id: string;
  relationship: string;
  date_of_birth: string;
  accompanying: boolean;
}

export interface AdditionalEducationEntry {
  id: string;
  level: string;
  field_of_study: string;
  institution: string;
  country: string;
  completion_year: string;
  has_eca: boolean;
}

export interface ForeignWorkEntry {
  id: string;
  job_title: string;
  employer: string;
  country: string;
  is_current: boolean;
  start_date: string;
  end_date: string;
  is_full_time: boolean;
  weekly_hours: string;
  main_duties: string;
}

export interface CanadianStudyEntry {
  id: string;
  institution: string;
  credential_level: string;
  province: string;
  start_date: string;
  end_date: string;
  is_completed: boolean;
  is_pgwp_eligible: boolean;
}

export interface CanadianWorkEntry {
  id: string;
  job_title: string;
  employer: string;
  province_or_city: string;
  is_current: boolean;
  start_date: string;
  end_date: string;
  noc_or_teer: string;
  weekly_hours: string;
  work_permit_type: string;
}

/**
 * Strict Final JSON Export Schema
 */
export interface CandidateProfileExport {
  profile_version: string;
  profile_id: string;
  generated_at: string;
  source_tool: string;
  consent: {
    accuracy_confirmed: boolean;
    non_advice_acknowledged: boolean;
    local_storage_understood: boolean;
    consent_timestamp: string;
  };
  contact: {
    full_name: string;
    email: string;
    phone: string;
    current_country: string;
    current_city: string;
  };
  candidate: {
    date_of_birth: string;
    calculated_age: number | null;
    country_of_citizenship: string;
    gender: string;
    marital_status: string;
  };
  family: {
    has_spouse: boolean;
    spouse: {
      full_name: string | null;
      date_of_birth: string | null;
      citizenship: string | null;
      education_level: string | null;
      language_test: string | null;
      canadian_work_or_study: string | null;
    } | null;
    dependents_count: number;
    dependents: Array<{
      id: string;
      relationship: string;
      date_of_birth: string | null;
      accompanying: boolean;
    }>;
  };
  education: {
    highest_level: string;
    field_of_study: string;
    institution: string;
    country: string;
    start_year: string;
    end_year: string;
    has_eca: boolean;
    eca_organization: string | null;
    eca_reference_number: string | null;
    eca_canadian_equivalency: string | null;
    additional_credentials: Array<{
      id: string;
      level: string;
      field_of_study: string;
      institution: string;
      country: string;
      completion_year: string;
      has_eca: boolean;
    }>;
  };
  language: {
    first_official: {
      test_type: string;
      test_date: string | null;
      registration_number: string | null;
      scores: {
        listening: string | null;
        reading: string | null;
        writing: string | null;
        speaking: string | null;
      };
    };
    second_official: {
      test_type: string;
      test_date: string | null;
      registration_number: string | null;
      scores: {
        listening: string | null;
        reading: string | null;
        writing: string | null;
        speaking: string | null;
      };
    } | null;
  };
  work_experience: {
    primary_occupation: string;
    noc_code_or_teer: string;
    total_years_foreign_experience: string;
    foreign_entries: Array<{
      id: string;
      job_title: string;
      employer: string;
      country: string;
      is_current: boolean;
      start_date: string;
      end_date: string | null;
      is_full_time: boolean;
      weekly_hours: number | null;
      main_duties: string;
    }>;
  };
  canadian_experience: {
    has_canadian_experience: boolean;
    study_history: Array<{
      id: string;
      institution: string;
      credential_level: string;
      province: string;
      start_date: string;
      end_date: string | null;
      is_completed: boolean;
      is_pgwp_eligible: boolean;
    }>;
    work_history: Array<{
      id: string;
      job_title: string;
      employer: string;
      province_or_city: string;
      is_current: boolean;
      start_date: string;
      end_date: string | null;
      noc_or_teer: string;
      weekly_hours: number | null;
      work_permit_type: string;
    }>;
  };
  immigration_history: {
    has_previous_canadian_applications: boolean;
    previous_applications_details: string | null;
    has_previous_refusals: boolean;
    refusal_details: string | null;
    has_inadmissibility_or_removal_concerns: boolean;
    inadmissibility_details: string | null;
    has_active_express_entry: boolean;
    express_entry_details: {
      profile_number: string | null;
      job_seeker_code: string | null;
      submission_date: string | null;
    } | null;
  };
  provincial_connections: {
    preferred_provinces: string[];
    willing_to_relocate_anywhere: boolean;
    has_family_in_canada: boolean;
    family_ties_details: string | null;
    has_canadian_job_offer: boolean;
    job_offer_details: {
      employer_name: string | null;
      job_title: string | null;
      province: string | null;
      is_lmia_approved_or_exempt: string | null;
    } | null;
  };
  financial_information: {
    available_settlement_funds_cad: number | null;
    settlement_funds_currency: string;
    funds_source_type: string;
    family_members_count_for_funds: number | null;
  };
  career_preferences: {
    target_job_titles: string;
    open_to_regional_or_rural_programs: boolean;
    target_immigration_timeline: string;
  };
  additional_information: {
    candidate_notes: string;
  };
  document_availability: {
    valid_passport: boolean;
    educational_certificates: boolean;
    official_transcripts: boolean;
    eca_report: boolean;
    language_test_report: boolean;
    employment_reference_letters: boolean;
    proof_of_funds_bank_statements: boolean;
    police_clearance_certificates: boolean;
  };
}

export type StepKey =
  | 'personal'
  | 'family'
  | 'education'
  | 'language'
  | 'work'
  | 'canada'
  | 'immigration'
  | 'provincial'
  | 'financial'
  | 'career'
  | 'review';

export interface StepMetadata {
  key: StepKey;
  number: number;
  title: string;
  shortTitle: string;
  description: string;
}

export type StepErrors = Record<string, string | undefined>;

