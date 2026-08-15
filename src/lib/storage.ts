import { CandidateDraftState } from '../types';
import { INITIAL_DRAFT_STATE } from '../constants';

const DRAFT_STORAGE_KEY = 'canada_candidate_intake_draft_v1';
const DRAFT_TIMESTAMP_KEY = 'canada_candidate_intake_draft_time_v1';

export function saveDraftToStorage(state: CandidateDraftState): void {
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem(DRAFT_TIMESTAMP_KEY, new Date().toISOString());
  } catch (err) {
    console.warn('Unable to persist draft to localStorage:', err);
  }
}

export function loadDraftFromStorage(): {
  data: CandidateDraftState | null;
  savedAt: string | null;
} {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    const savedAt = localStorage.getItem(DRAFT_TIMESTAMP_KEY);

    if (!raw) {
      return { data: null, savedAt: null };
    }

    const parsed = JSON.parse(raw);
    // Merge with INITIAL_DRAFT_STATE to ensure any newly added keys are present
    const merged: CandidateDraftState = {
      ...INITIAL_DRAFT_STATE,
      ...parsed,
    };

    return { data: merged, savedAt };
  } catch (err) {
    console.warn('Unable to read draft from localStorage:', err);
    return { data: null, savedAt: null };
  }
}

export function clearDraftFromStorage(): void {
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    localStorage.removeItem(DRAFT_TIMESTAMP_KEY);
  } catch (err) {
    console.warn('Unable to clear draft from localStorage:', err);
  }
}
