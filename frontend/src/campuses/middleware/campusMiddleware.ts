/**
 * Campus Middleware Layer
 * Orchestrates API calls and handles business logic
 * Acts as a bridge between components and global services
 */

import { campusService, Campus, CampusCreate, CampusUpdate } from '@/api';
import { transformCampusResponse, transformCampusPayload } from '../services/campusTransformer';
import { validateCampusData } from '../utils/campusValidators';

export interface CampusMiddlewareResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Fetch all campuses with transformation
 */
export async function fetchAllCampuses(): Promise<CampusMiddlewareResponse<Campus[]>> {
  try {
    const campuses = await campusService.listAll();
    const transformed = campuses.map((campus) => transformCampusResponse(campus));
    return {
      success: true,
      data: transformed,
      message: 'Campuses fetched successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to fetch campuses',
    };
  }
}

/**
 * Create a new campus with payload transformation
 */
export async function createNewCampus(
  payload: CampusCreate
): Promise<CampusMiddlewareResponse<Campus>> {
  try {
    // Validate payload
    const validation = validateCampusData(payload);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    // Transform payload
    const transformedPayload = transformCampusPayload(payload);

    // Call service (cast as CampusCreate for creation)
    const response = await campusService.create(transformedPayload as CampusCreate);

    // Transform response
    const transformed = transformCampusResponse(response);

    return {
      success: true,
      data: transformed,
      message: 'Campus created successfully',
    };
  } catch (error: any) {
    // Check for HTTP error response from backend
    if (error.response?.status === 400) {
      // Backend returned a validation/business logic error
      return {
        success: false,
        error: error.response.data.detail || 'Unable to create campus',
      };
    }
    // Check for duplicate name error
    if (error.response?.status === 409 || error.message?.includes('unique')) {
      return {
        success: false,
        error: `A campus with the name "${payload.name}" already exists. Please use a different name.`,
      };
    }
    return {
      success: false,
      error: error.response?.data?.detail || error.message || 'Failed to create campus',
    };
  }
}

/**
 * Update an existing campus
 */
export async function updateExistingCampus(
  id: string,
  payload: CampusUpdate
): Promise<CampusMiddlewareResponse<Campus>> {
  try {
    // Validate payload
    const validation = validateCampusData(payload, true);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    // Transform payload
    const transformedPayload = transformCampusPayload(payload);

    // Call service
    const response = await campusService.update(id, transformedPayload);

    // Transform response
    const transformed = transformCampusResponse(response);

    return {
      success: true,
      data: transformed,
      message: 'Campus updated successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to update campus',
    };
  }
}

/**
 * Delete a campus
 */
export async function deleteExistingCampus(id: string): Promise<CampusMiddlewareResponse<null>> {
  try {
    await campusService.delete(id);
    return {
      success: true,
      data: null,
      message: 'Campus deleted successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to delete campus',
    };
  }
}
