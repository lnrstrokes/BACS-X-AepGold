/**
 * Date calculations and helpers
 */

/**
 * Calculates completed full years from a date string (YYYY-MM-DD)
 */
export function calculateCompletedAge(dateOfBirthString: string): number | null {
  if (!dateOfBirthString || !dateOfBirthString.trim()) {
    return null;
  }

  const dob = new Date(dateOfBirthString);
  if (isNaN(dob.getTime())) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age >= 0 ? age : null;
}

/**
 * Returns current ISO-8601 string
 */
export function getISO8601Timestamp(): string {
  return new Date().toISOString();
}

/**
 * Friendly date formatter for UI
 */
export function formatFriendlyDate(isoOrDateString: string): string {
  if (!isoOrDateString) return '—';
  try {
    const d = new Date(isoOrDateString);
    if (isNaN(d.getTime())) return isoOrDateString;
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return isoOrDateString;
  }
}
