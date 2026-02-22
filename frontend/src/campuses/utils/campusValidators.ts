/**
 * Campus Utilities
 * Helper functions and validators specific to campus operations
 */

import { CampusCreate, CampusUpdate } from '@/api';

export interface ValidationResult {
  valid: boolean;
  error?: string;
  errors?: Record<string, string>;
}

/**
 * Validate campus data
 */
export function validateCampusData(
  data: CampusCreate | CampusUpdate,
  isUpdate: boolean = false
): ValidationResult {
  const errors: Record<string, string> = {};

  // Name validation
  if ('name' in data) {
    if (!data.name || data.name.trim().length === 0) {
      errors.name = 'Campus name is required';
    } else if (data.name.length > 255) {
      errors.name = 'Campus name must be less than 255 characters';
    } else if (data.name.length < 2) {
      errors.name = 'Campus name must be at least 2 characters';
    }
  }

  // Location validation
  if ('location' in data) {
    if (!data.location || data.location.trim().length === 0) {
      errors.location = 'Location is required';
    } else if (data.location.length > 255) {
      errors.location = 'Location must be less than 255 characters';
    } else if (data.location.length < 2) {
      errors.location = 'Location must be at least 2 characters';
    }
  }

  // For create, both fields are required
  if (!isUpdate) {
    if (!('name' in data) || !data.name) {
      errors.name = 'Campus name is required';
    }
    if (!('location' in data) || !data.location) {
      errors.location = 'Location is required';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    error: Object.keys(errors).length > 0 ? Object.values(errors)[0] : undefined,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

/**
 * Sanitize campus input
 */
export function sanitizeCampusInput(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}

/**
 * Get error message for campus field
 */
export function getCampusFieldError(field: string, value: string): string | null {
  switch (field) {
    case 'name':
      if (!value || value.trim().length === 0) return 'Campus name is required';
      if (value.length > 255) return 'Campus name must be less than 255 characters';
      if (value.length < 2) return 'Campus name must be at least 2 characters';
      return null;

    case 'location':
      if (!value || value.trim().length === 0) return 'Location is required';
      if (value.length > 255) return 'Location must be less than 255 characters';
      if (value.length < 2) return 'Location must be at least 2 characters';
      return null;

    default:
      return null;
  }
}

/**
 * Check if campus name is valid
 */
export function isValidCampusName(name: string): boolean {
  return name && name.trim().length >= 2 && name.length <= 255;
}

/**
 * Check if location is valid
 */
export function isValidLocation(location: string): boolean {
  return location && location.trim().length >= 2 && location.length <= 255;
}

/**
 * Generate campus short code from name
 */
export function generateCampusCode(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 3);
}

/**
 * Format campus name consistently
 */
export function formatCampusName(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
