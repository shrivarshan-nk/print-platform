/**
 * Campus Services Layer
 * Transforms payloads from components and responses from API
 * Ensures consistent data structure across the application
 */

import { Campus, CampusCreate, CampusUpdate } from '@/api';

export interface CampusDisplay extends Campus {
  formattedDate: string;
  displayName: string;
}

/**
 * Transform API response to display format
 * Adds computed fields and formatting
 */
export function transformCampusResponse(campus: Campus): Campus {
  return {
    ...campus,
    // Add any transformations here
    // Example: format dates, add computed fields, etc.
  };
}

/**
 * Transform component payload to API format
 * Cleans and validates data before sending
 */
export function transformCampusPayload(
  payload: CampusCreate | CampusUpdate
): CampusCreate | CampusUpdate {
  return {
    ...payload,
    // Trim whitespace
    name: 'name' in payload && payload.name ? payload.name.trim() : undefined,
    location: 'location' in payload && payload.location ? payload.location.trim() : undefined,
  };
}

/**
 * Get display version of campus with formatted data
 */
export function getCampusDisplay(campus: Campus): CampusDisplay {
  return {
    ...campus,
    formattedDate: new Date(campus.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    displayName: `${campus.name} • ${campus.location}`,
  };
}

/**
 * Get campus summary text
 */
export function getCampusSummary(campus: Campus): string {
  return `${campus.name} is located at ${campus.location}`;
}

/**
 * Check if campus is empty/uninitialized
 */
export function isCampusEmpty(campus: Campus): boolean {
  return !campus.name || campus.name.trim().length === 0;
}

/**
 * Get campus icon based on properties
 */
export function getCampusIcon(campus: Campus): string {
  if (campus.location.toLowerCase().includes('downtown')) return '🏙️';
  if (campus.location.toLowerCase().includes('north')) return '⬆️';
  if (campus.location.toLowerCase().includes('south')) return '⬇️';
  if (campus.location.toLowerCase().includes('east')) return '➡️';
  if (campus.location.toLowerCase().includes('west')) return '⬅️';
  return '🏫';
}
