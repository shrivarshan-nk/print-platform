/**
 * Shop Middleware Layer
 * Orchestrates API calls and handles business logic
 * Acts as a bridge between components and global services
 */

import { shopService, Shop, ShopCreate, ShopUpdate } from '@/api';
import { transformShopResponse, transformShopPayload } from '../services/shopTransformer';
import { validateShopData } from '../utils/shopValidators';

export interface ShopMiddlewareResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Fetch all shops with transformation
 */
export async function fetchAllShops(): Promise<ShopMiddlewareResponse<Shop[]>> {
  try {
    const shops = await shopService.listAll();
    const transformed = shops.map((shop) => transformShopResponse(shop));
    return {
      success: true,
      data: transformed,
      message: 'Shops fetched successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to fetch shops',
    };
  }
}

/**
 * Fetch shops for a specific campus
 */
export async function fetchShopsByCampus(
  campusId: string
): Promise<ShopMiddlewareResponse<Shop[]>> {
  try {
    const shops = await shopService.listByCampus(campusId);
    const transformed = shops.map((shop) => transformShopResponse(shop));
    return {
      success: true,
      data: transformed,
      message: `Shops for campus fetched successfully`,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to fetch shops',
    };
  }
}

/**
 * Create a new shop with payload transformation
 */
export async function createNewShop(payload: ShopCreate): Promise<ShopMiddlewareResponse<Shop>> {
  try {
    // Validate payload
    const validation = validateShopData(payload);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    // Transform payload
    const transformedPayload = transformShopPayload(payload);

    // Call service (cast as ShopCreate for creation)
    const response = await shopService.create(transformedPayload as ShopCreate);

    // Transform response
    const transformed = transformShopResponse(response);

    return {
      success: true,
      data: transformed,
      message: 'Shop created successfully',
    };
  } catch (error: any) {
    // Check for HTTP error response from backend
    if (error.response?.status === 400) {
      // Backend returned a validation/business logic error
      return {
        success: false,
        error: error.response.data.detail || 'Unable to create shop',
      };
    }
    // Check for duplicate name error
    if (error.response?.status === 409 || error.message?.includes('unique')) {
      return {
        success: false,
        error: `A shop with the name "${payload.name}" already exists in this campus. Please use a different name.`,
      };
    }
    return {
      success: false,
      error: error.response?.data?.detail || error.message || 'Failed to create shop',
    };
  }
}

/**
 * Update an existing shop
 */
export async function updateExistingShop(
  id: string,
  payload: ShopUpdate
): Promise<ShopMiddlewareResponse<Shop>> {
  try {
    // Validate payload
    const validation = validateShopData(payload, true);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    // Transform payload
    const transformedPayload = transformShopPayload(payload);

    // Call service
    const response = await shopService.update(id, transformedPayload);

    // Transform response
    const transformed = transformShopResponse(response);

    return {
      success: true,
      data: transformed,
      message: 'Shop updated successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to update shop',
    };
  }
}

/**
 * Delete a shop
 */
export async function deleteExistingShop(id: string): Promise<ShopMiddlewareResponse<null>> {
  try {
    await shopService.delete(id);
    return {
      success: true,
      data: null,
      message: 'Shop deleted successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to delete shop',
    };
  }
}
