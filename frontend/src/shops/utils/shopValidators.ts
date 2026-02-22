/**
 * Shop Utilities
 * Helper functions and validators specific to shop operations
 */

import { ShopCreate, ShopUpdate, ExecutionMode, PaymentMode } from '@/api';

export interface ValidationResult {
  valid: boolean;
  error?: string;
  errors?: Record<string, string>;
}

/**
 * Validate shop data
 */
export function validateShopData(
  data: ShopCreate | ShopUpdate,
  isUpdate: boolean = false
): ValidationResult {
  const errors: Record<string, string> = {};

  // Campus ID validation (only for create)
  if (!isUpdate && 'campus_id' in data) {
    if (!data.campus_id || data.campus_id.trim().length === 0) {
      errors.campus_id = 'Campus selection is required';
    }
  }

  // Shop name validation
  if ('name' in data) {
    if (!data.name || data.name.trim().length === 0) {
      errors.name = 'Shop name is required';
    } else if (data.name.length > 255) {
      errors.name = 'Shop name must be less than 255 characters';
    } else if (data.name.length < 2) {
      errors.name = 'Shop name must be at least 2 characters';
    }
  }

  // Execution mode validation
  if ('execution_mode' in data) {
    const validModes: ExecutionMode[] = ['manual', 'assisted', 'auto'];
    if (!data.execution_mode || !validModes.includes(data.execution_mode)) {
      errors.execution_mode = 'Valid execution mode is required';
    }
  }

  // Payment mode validation
  if ('payment_mode' in data) {
    const validModes: PaymentMode[] = ['counter', 'prepaid', 'both'];
    if (!data.payment_mode || !validModes.includes(data.payment_mode)) {
      errors.payment_mode = 'Valid payment mode is required';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    error: Object.keys(errors).length > 0 ? Object.values(errors)[0] : undefined,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

/**
 * Sanitize shop input
 */
export function sanitizeShopInput(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}

/**
 * Get error message for shop field
 */
export function getShopFieldError(field: string, value: any): string | null {
  switch (field) {
    case 'campus_id':
      if (!value || value.trim().length === 0) return 'Campus selection is required';
      return null;

    case 'name':
      if (!value || value.trim().length === 0) return 'Shop name is required';
      if (value.length > 255) return 'Shop name must be less than 255 characters';
      if (value.length < 2) return 'Shop name must be at least 2 characters';
      return null;

    case 'execution_mode':
      const validExecModes: ExecutionMode[] = ['manual', 'assisted', 'auto'];
      if (!value || !validExecModes.includes(value))
        return 'Valid execution mode is required';
      return null;

    case 'payment_mode':
      const validPayModes: PaymentMode[] = ['counter', 'prepaid', 'both'];
      if (!value || !validPayModes.includes(value)) return 'Valid payment mode is required';
      return null;

    default:
      return null;
  }
}

/**
 * Check if shop name is valid
 */
export function isValidShopName(name: string): boolean {
  return !!(name && name.trim().length >= 2 && name.length <= 255);
}

/**
 * Check if campus ID is valid
 */
export function isValidCampusId(campusId: string): boolean {
  return !!(campusId && campusId.trim().length > 0);
}

/**
 * Check if execution mode is valid
 */
export function isValidExecutionMode(mode: any): boolean {
  const validModes: ExecutionMode[] = ['manual', 'assisted', 'auto'];
  return validModes.includes(mode);
}

/**
 * Check if payment mode is valid
 */
export function isValidPaymentMode(mode: any): boolean {
  const validModes: PaymentMode[] = ['counter', 'prepaid', 'both'];
  return validModes.includes(mode);
}

/**
 * Generate shop short code from name
 */
export function generateShopCode(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 3);
}

/**
 * Format shop name consistently
 */
export function formatShopName(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get execution mode description
 */
export function getExecutionModeDescription(mode: ExecutionMode): string {
  const descriptions: Record<ExecutionMode, string> = {
    manual: 'Shop staff manually prints from browser',
    assisted: 'Desktop agent automates print process',
    auto: 'Fully automatic printing (requires payment)',
  };
  return descriptions[mode];
}

/**
 * Get payment mode description
 */
export function getPaymentModeDescription(mode: PaymentMode): string {
  const descriptions: Record<PaymentMode, string> = {
    counter: 'Students pay when collecting prints',
    prepaid: 'Students prepay via wallet',
    both: 'Both payment options available',
  };
  return descriptions[mode];
}
