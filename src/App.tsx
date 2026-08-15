import React, { useState, useEffect, useCallback } from 'react';
import { CandidateDraftState, CandidateProfileExport, StepKey } from './types';
import { INITIAL_DRAFT_STATE, STEPS } from './constants';
import {
  saveDraftToStorage,
  loadDraftFromStorage,
  clearDraftFromStorage,
} from './lib/storage';
import { generateCandidateProfile } from './lib/json';
import { ProgressBar } from './components/ProgressBar';
import { StepLayout } from './components/StepLayout';
import { OutputScreen } from './components/OutputScreen';
import { ConfirmModal } from './components/ConfirmModal';
import { BrandLockup } from './components/BrandLockup';

// Steps
import { PersonalStep } from './steps/PersonalStep';
import { FamilyStep } from './steps/FamilyStep';
import { EducationStep } from './steps/EducationStep';
import { LanguageStep } from './steps/LanguageStep';
import { WorkStep } from './steps/WorkStep';
import { CanadaStep } from './steps/CanadaStep';
import { ImmigrationHistoryStep } from './steps/ImmigrationHistoryStep';
import { ProvincialConnectionsStep } from './steps/ProvincialConnectionsStep';
import { FinancialStep } from './steps/FinancialStep';
import { CareerGoalsStep } from './steps/CareerGoalsStep';
import { ReviewStep } from './steps/ReviewStep';

import { RotateCcw, ShieldCheck, ArrowRight } from 'lucide-react';

export default function App() {
  const [draft, setDraft] = useState<CandidateDraftState>(INITIAL_DRAFT_STATE);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [maxStepReached, setMaxStepReached] = useState<number>(0);
  const [generatedProfile, setGeneratedProfile] = useState<CandidateProfileExport | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [draftSavedMessage, setDraftSavedMessage] = useState<string | null>(null);
  const [showClearDraftModal, setShowClearDraftModal] = useState<boolean>(false);
  const [hasRestoredDraft, setHasRestoredDraft] = useState<boolean>(false);

  // Initial load: Restore from localStorage if exists
  useEffect(() => {
    const { data } = loadDraftFromStorage();
    if (data) {
      setDraft(data);
      setHasRestoredDraft(true);
      // Auto-expire restored notification
      setTimeout(() => setHasRestoredDraft(false), 4000);
    }
  }, []);

  // Debounced auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraftToStorage(draft);
    }, 600);
    return () => clearTimeout(timer);
  }, [draft]);

  const handleDraftChange = useCallback((fields: Partial<CandidateDraftState>) => {
    setDraft((prev) => ({ ...prev, ...fields }));
    // Clear validation error when field changes
    setValidationErrors((prev) => {
      const copy = { ...prev };
      Object.keys(fields).forEach((k) => delete copy[k]);
      return copy;
    });
  }, []);

  const handleManualSave = () => {
    saveDraftToStorage(draft);
    setDraftSavedMessage('Draft saved locally');
    setTimeout(() => setDraftSavedMessage(null), 2500);
  };

  const validateStep = (stepIdx: number): boolean => {
    const errors: Record<string, string> = {};

    if (stepIdx === 0) {
      // Step 1: Personal
      if (!draft.full_name.trim()) errors.full_name = 'Full legal name is required.';
      if (!draft.email.trim()) errors.email = 'Email address is required.';
      else if (!/^\S+@\S+\.\S+$/.test(draft.email.trim())) errors.email = 'Enter a valid email address.';
      if (!draft.phone.trim()) errors.phone = 'Phone number is required.';
      if (!draft.country_of_citizenship.trim()) errors.country_of_citizenship = 'Citizenship is required.';
      if (!draft.country_of_residence.trim()) errors.country_of_residence = 'Country of residence is required.';
      if (!draft.date_of_birth.trim()) errors.date_of_birth = 'Date of birth is required.';
    } else if (stepIdx === 2) {
      // Step 3: Education
      if (!draft.field_of_study.trim()) errors.field_of_study = 'Field of study is required.';
      if (!draft.institution_name.trim()) errors.institution_name = 'Institution name is required.';
      if (!draft.education_country.trim()) errors.education_country = 'Country of study is required.';
      if (!draft.education_end_year.trim()) errors.education_end_year = 'Completion year is required.';
    } else if (stepIdx === 4) {
      // Step 5: Work Experience
      if (!draft.primary_occupation.trim()) errors.primary_occupation = 'Primary occupation is required.';
    } else if (stepIdx === 8) {
      // Step 9: Financial
      if (!draft.available_funds_cad.trim()) errors.available_funds_cad = 'Settlement funds amount is required.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinue = () => {
    if (!validateStep(currentStepIndex)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentStepIndex < STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      if (nextIdx > maxStepReached) {
        setMaxStepReached(nextIdx);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJumpToStep = (stepKey: StepKey) => {
    const targetIdx = STEPS.findIndex((s) => s.key === stepKey);
    if (targetIdx !== -1) {
      setCurrentStepIndex(targetIdx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleGenerateProfile = () => {
    // Generate normalized JSON
    const profile = generateCandidateProfile(draft);
    setGeneratedProfile(profile);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartOver = () => {
    clearDraftFromStorage();
    setDraft(INITIAL_DRAFT_STATE);
    setGeneratedProfile(null);
    setCurrentStepIndex(0);
    setMaxStepReached(0);
    setValidationErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentStep = STEPS[currentStepIndex];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      {/* Top Application Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between">
          {/* Brand Lockup and Sub-identity */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <BrandLockup size="md" />
              <span className="text-[11px] font-medium text-slate-500 tracking-tight mt-0.5 sm:hidden">
                Canada Immigration Candidate Profile
              </span>
            </div>
          </div>

          {/* Desktop Right Context & Controls */}
          <div className="flex items-center gap-2.5">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
              Candidate Profile Intake
            </span>

            {!generatedProfile && (
              <button
                type="button"
                onClick={() => setShowClearDraftModal(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-2xs"
                title="Reset intake form"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-8">
        {/* Restored Draft Notice */}
        {hasRestoredDraft && (
          <div className="mb-5 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Previously saved browser draft restored. You can continue where you left off.</span>
            </div>
            <button
              type="button"
              onClick={() => setHasRestoredDraft(false)}
              className="text-emerald-700 hover:text-emerald-900 font-bold px-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {generatedProfile ? (
          /* Output / Completion Screen */
          <OutputScreen
            profile={generatedProfile}
            onStartOver={handleStartOver}
          />
        ) : (
          /* Step-by-Step Intake Form */
          <div>
            {/* Primary Product Title & Hierarchy */}
            <div className="mb-6 space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#0B192C]">
                <span>BACS</span>
                <span className="text-[#C59B27] font-black">×</span>
                <span className="font-semibold text-slate-700">EapGold Travels</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Canada Immigration Candidate Profile Generator
              </h1>
              <p className="text-sm font-semibold text-slate-700">
                Structured Candidate Intake & Profile Generation
              </p>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed pt-0.5">
                A structured profile intake tool designed to collect and organize candidate information for professional immigration assessment.
              </p>
            </div>

            <ProgressBar
              currentStepIndex={currentStepIndex}
              onStepClick={handleJumpToStep}
              maxStepReached={maxStepReached}
            />

            <StepLayout
              stepNumber={currentStep.number}
              totalSteps={STEPS.length}
              title={currentStep.title}
              description={currentStep.description}
              onBack={currentStepIndex > 0 ? handleBack : undefined}
              onContinue={
                currentStepIndex === STEPS.length - 1
                  ? handleGenerateProfile
                  : handleContinue
              }
              continueText={
                currentStepIndex === STEPS.length - 1
                  ? 'Generate Profile'
                  : 'Continue'
              }
              continueDisabled={
                currentStepIndex === STEPS.length - 1 &&
                (!draft.consent_accuracy ||
                  !draft.consent_non_advice ||
                  !draft.consent_local_storage)
              }
              onSaveDraft={handleManualSave}
              draftSavedMessage={draftSavedMessage}
            >
              {currentStepIndex === 0 && (
                <PersonalStep
                  draft={draft}
                  onChange={handleDraftChange}
                  errors={validationErrors}
                />
              )}
              {currentStepIndex === 1 && (
                <FamilyStep
                  draft={draft}
                  onChange={handleDraftChange}
                />
              )}
              {currentStepIndex === 2 && (
                <EducationStep
                  draft={draft}
                  onChange={handleDraftChange}
                  errors={validationErrors}
                />
              )}
              {currentStepIndex === 3 && (
                <LanguageStep
                  draft={draft}
                  onChange={handleDraftChange}
                />
              )}
              {currentStepIndex === 4 && (
                <WorkStep
                  draft={draft}
                  onChange={handleDraftChange}
                  errors={validationErrors}
                />
              )}
              {currentStepIndex === 5 && (
                <CanadaStep
                  draft={draft}
                  onChange={handleDraftChange}
                />
              )}
              {currentStepIndex === 6 && (
                <ImmigrationHistoryStep
                  draft={draft}
                  onChange={handleDraftChange}
                />
              )}
              {currentStepIndex === 7 && (
                <ProvincialConnectionsStep
                  draft={draft}
                  onChange={handleDraftChange}
                />
              )}
              {currentStepIndex === 8 && (
                <FinancialStep
                  draft={draft}
                  onChange={handleDraftChange}
                  errors={validationErrors}
                />
              )}
              {currentStepIndex === 9 && (
                <CareerGoalsStep
                  draft={draft}
                  onChange={handleDraftChange}
                />
              )}
              {currentStepIndex === 10 && (
                <ReviewStep
                  draft={draft}
                  onChange={handleDraftChange}
                  onEditSection={handleJumpToStep}
                />
              )}
            </StepLayout>
          </div>
        )}
      </main>

      {/* Global Disclaimer & Branded Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-slate-500">
        <div className="max-w-4xl mx-auto px-4 space-y-5">
          {/* Brand & Workflow Positioning */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <BrandLockup size="sm" />
              <p className="text-xs font-semibold text-slate-700 mt-1">
                Canada Immigration Candidate Profile Generator
              </p>
            </div>

            {/* Workflow Breadcrumb */}
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium overflow-x-auto py-1">
              <span>Candidate</span>
              <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="font-bold text-[#0B192C]">Profile Intake</span>
              <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
              <span>Structured JSON</span>
              <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
              <span>Professional Assessment</span>
            </div>
          </div>

          {/* Mandatory Disclaimers */}
          <div className="border-b border-slate-100 pb-4 text-xs leading-relaxed text-slate-600 space-y-1.5">
            <strong className="text-slate-800 block">Important Notice & Mandatory Disclaimer:</strong>
            <p>
              This application is a structured candidate intake profile tool only. It does not provide immigration advice, legal counsel, CRS calculation, eligibility assessment, or pathway recommendations.
            </p>
          </div>

          {/* Legal & Local Storage Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
            <p>
              Independent profile intake tool. Not affiliated with Immigration, Refugees and Citizenship Canada (IRCC) or the Government of Canada.
            </p>
            <p className="shrink-0 font-medium">
              Client-side JSON Generator &middot; Local Storage Only
            </p>
          </div>
        </div>
      </footer>

      {/* Confirm Reset / Clear Modal */}
      <ConfirmModal
        isOpen={showClearDraftModal}
        title="Reset intake form?"
        message="Are you sure you want to clear all entered information? All unexported candidate data will be removed from your browser."
        confirmLabel="Yes, reset all"
        cancelLabel="Cancel"
        isDestructive={true}
        onConfirm={() => {
          setShowClearDraftModal(false);
          handleStartOver();
        }}
        onCancel={() => setShowClearDraftModal(false)}
      />
    </div>
  );
}
