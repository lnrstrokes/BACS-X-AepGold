import { CandidateDraftState, StepMetadata } from './types';

export const STEPS: StepMetadata[] = [
  {
    key: 'personal',
    number: 1,
    title: 'Personal & Contact Information',
    shortTitle: 'Personal',
    description: 'Basic identifying details and current residential contact information.',
  },
  {
    key: 'family',
    number: 2,
    title: 'Family & Marital Status',
    shortTitle: 'Family',
    description: 'Spouse or common-law partner and accompanying dependent children.',
  },
  {
    key: 'education',
    number: 3,
    title: 'Education History',
    shortTitle: 'Education',
    description: 'Completed degrees, diplomas, institutions, and ECA status.',
  },
  {
    key: 'language',
    number: 4,
    title: 'Language Test Results',
    shortTitle: 'Language',
    description: 'Raw test scores for official languages (English / French).',
  },
  {
    key: 'work',
    number: 5,
    title: 'Foreign Work Experience',
    shortTitle: 'Work Exp.',
    description: 'Primary occupation and international employment history.',
  },
  {
    key: 'canada',
    number: 6,
    title: 'Canadian Experience',
    shortTitle: 'In Canada',
    description: 'Prior or current study and work experience inside Canada.',
  },
  {
    key: 'immigration',
    number: 7,
    title: 'Immigration & Visa History',
    shortTitle: 'History',
    description: 'Previous Canadian applications, visa refusals, or Express Entry details.',
  },
  {
    key: 'provincial',
    number: 8,
    title: 'Provincial Connections & Ties',
    shortTitle: 'Provinces',
    description: 'Provincial preferences, Canadian family ties, or existing job offers.',
  },
  {
    key: 'financial',
    number: 9,
    title: 'Settlement Funds & Financials',
    shortTitle: 'Financial',
    description: 'Available unencumbered settlement funds and family size support.',
  },
  {
    key: 'career',
    number: 10,
    title: 'Career Preferences & Documents',
    shortTitle: 'Goals & Docs',
    description: 'Target occupations, regional readiness, and document readiness checklist.',
  },
  {
    key: 'review',
    number: 11,
    title: 'Review & Generate Profile',
    shortTitle: 'Review',
    description: 'Confirm all entered information and generate structured profile JSON.',
  },
];

export const INITIAL_DRAFT_STATE: CandidateDraftState = {
  // Step 1
  full_name: '',
  email: '',
  phone: '',
  country_of_citizenship: '',
  country_of_residence: '',
  city_of_residence: '',
  date_of_birth: '',
  gender: '',
  marital_status: 'Single',

  // Step 2
  has_spouse: false,
  spouse_full_name: '',
  spouse_date_of_birth: '',
  spouse_citizenship: '',
  spouse_education_level: '',
  spouse_language_test: '',
  spouse_canadian_work_or_study: 'None',
  dependents: [],

  // Step 3
  highest_education_level: 'Bachelor’s Degree (3+ years)',
  field_of_study: '',
  institution_name: '',
  education_country: '',
  education_start_year: '',
  education_end_year: '',
  has_eca: false,
  eca_organization: '',
  eca_reference_number: '',
  eca_canadian_equivalency: '',
  additional_education: [],

  // Step 4
  first_language_test: 'None',
  first_test_date: '',
  first_registration_number: '',
  first_listening: '',
  first_reading: '',
  first_writing: '',
  first_speaking: '',
  
  has_second_language_test: false,
  second_language_test: 'None',
  second_test_date: '',
  second_registration_number: '',
  second_listening: '',
  second_reading: '',
  second_writing: '',
  second_speaking: '',

  // Step 5
  primary_occupation: '',
  noc_code_or_teer: '',
  total_foreign_work_years: '',
  foreign_work_entries: [],

  // Step 6
  has_canadian_experience: false,
  canadian_studies: [],
  canadian_work_entries: [],

  // Step 7
  has_previous_canadian_applications: false,
  previous_applications_details: '',
  has_previous_refusals: false,
  refusal_details: '',
  has_inadmissibility_concerns: false,
  inadmissibility_details: '',
  has_active_express_entry: false,
  express_entry_profile_number: '',
  express_entry_job_seeker_code: '',
  express_entry_submission_date: '',

  // Step 8
  preferred_provinces: [],
  open_to_any_province: true,
  has_family_in_canada: false,
  family_ties_details: '',
  has_canadian_job_offer: false,
  job_offer_employer: '',
  job_offer_title: '',
  job_offer_province: '',
  job_offer_lmia_status: 'Not Applicable',

  // Step 9
  available_funds_cad: '',
  funds_currency: 'CAD',
  funds_source_type: 'Personal Savings & Liquid Assets',
  family_members_count_for_funds: '1',

  // Step 10
  target_job_titles: '',
  open_to_regional_or_rural_programs: true,
  target_immigration_timeline: 'Within 6-12 months',
  additional_notes: '',

  doc_valid_passport: false,
  doc_education_certificates: false,
  doc_transcripts: false,
  doc_eca_report: false,
  doc_language_test_report: false,
  doc_reference_letters: false,
  doc_bank_statements: false,
  doc_police_clearance: false,

  // Step 11
  consent_accuracy: false,
  consent_non_advice: false,
  consent_local_storage: false,
};

export const MARITAL_STATUS_OPTIONS = [
  'Single',
  'Married',
  'Common-Law',
  'Divorced',
  'Separated',
  'Widowed',
  'Legally Separated',
];

export const GENDER_OPTIONS = [
  'Female',
  'Male',
  'Non-binary / Other',
  'Prefer not to disclose',
];

export const EDUCATION_LEVEL_OPTIONS = [
  'Secondary school (High School diploma)',
  'One-year post-secondary certificate or diploma',
  'Two-year post-secondary diploma',
  'Bachelor’s Degree (3+ years)',
  'Two or more post-secondary certificates/degrees (one being 3+ yrs)',
  'Master’s Degree or professional degree (e.g. Medicine, Law)',
  'Doctoral level (Ph.D.)',
  'Less than secondary school',
];

export const ECA_ORGANIZATIONS = [
  'WES (World Education Services)',
  'ICAS (International Credential Assessment Service)',
  'CES (Comparative Education Service - Univ. of Toronto)',
  'IQAS (International Qualifications Assessment Service)',
  'BCIT (British Columbia Institute of Technology)',
  'MCC (Medical Council of Canada)',
  'PEBC (Pharmacy Examining Board of Canada)',
  'In progress / Not yet received',
  'Other',
];

export const LANGUAGE_TEST_OPTIONS = [
  'None',
  'IELTS General Training',
  'CELPIP - General',
  'PTE Core',
  'TEF Canada (French)',
  'TCF Canada (French)',
];

export const CANADIAN_PROVINCES = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Northwest Territories',
  'Nunavut',
  'Yukon',
];

export const WORK_PERMIT_TYPES = [
  'Open Work Permit (e.g. PGWP, SOWP, Working Holiday)',
  'Employer-Specific with LMIA',
  'LMIA-Exempt Employer-Specific (e.g. C10, Intra-Company)',
  'Study Permit Off-Campus Authorization',
  'Maintained Status (Applied for extension)',
  'Visitor Record / No active permit',
  'Other',
];

export const TIMELINE_OPTIONS = [
  'Immediately / As soon as ready',
  'Within 3-6 months',
  'Within 6-12 months',
  '1 to 2 years',
  'Exploring future options',
];

export const CONSULTANT_WHATSAPP_NUMBER = '+2347089711946';
export const CONSULTANT_WHATSAPP_RAW = '2347089711946';

export const OFFICIAL_NOC_FINDER_URL = 'https://noc.esdc.gc.ca/';

export const CURRENCY_OPTIONS = [
  'CAD - Canadian Dollar (Official IRCC Standard)',
  'USD - US Dollar',
  'NGN - Nigerian Naira (Auto-conversion coming soon)',
  'GBP - British Pound',
  'EUR - Euro',
  'INR - Indian Rupee',
  'AED - UAE Dirham',
  'Other Currency',
];
