/**
 * Shop Services Layer
 * Transforms payloads from components and responses from API
 * Ensures consistent data structure across the application
 */

import { Shop, ShopCreate, ShopUpdate, ExecutionMode, PaymentMode, shopService } from '@/api';

export interface ShopDisplay extends Shop {
  formattedDate: string;
  displayName: string;
  executionModeLabel: string;
  paymentModeLabel: string;
  statusLabel: string;
}

/**
 * Transform API response to display format
 */
export function transformShopResponse(shop: Shop): Shop {
  return {
    ...shop,
    // Add any transformations here
  };
}

/**
 * Transform component payload to API format
 */
export function transformShopPayload(payload: ShopCreate | ShopUpdate): ShopCreate | ShopUpdate {
  return {
    ...payload,
    // Trim whitespace
    name: 'name' in payload ? payload.name.trim() : undefined,
  };
}

/**
 * Get display version of shop with formatted data
 */
export function getShopDisplay(shop: Shop): ShopDisplay {
  return {
    ...shop,
    formattedDate: new Date(shop.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }),
    displayName: shop.name,
    executionModeLabel: shopService.getExecutionModeLabel(shop.execution_mode),
    paymentModeLabel: shopService.getPaymentModeLabel(shop.payment_mode),
    statusLabel: shop.is_active ? 'Active' : 'Inactive',
  };
}

/**
 * Get shop summary text
 */
export function getShopSummary(shop: Shop): string {
  const execution = shopService.getExecutionModeLabel(shop.execution_mode);
  const payment = shopService.getPaymentModeLabel(shop.payment_mode);
  const status = shop.is_active ? 'Active' : 'Inactive';
  return `${shop.name} - ${execution} | ${payment} | ${status}`;
}

/**
 * Check if shop is empty/uninitialized
 */
export function isShopEmpty(shop: Shop): boolean {
  return !shop.name || shop.name.trim().length === 0;
}

/**
 * Group shops by execution mode
 */
export function groupShopsByExecutionMode(shops: Shop[]): Record<ExecutionMode, Shop[]> {
  return shops.reduce(
    (acc, shop) => {
      if (!acc[shop.execution_mode]) {
        acc[shop.execution_mode] = [];
      }
      acc[shop.execution_mode].push(shop);
      return acc;
    },
    { manual: [], assisted: [], auto: [] } as Record<ExecutionMode, Shop[]>
  );
}

/**
 * Group shops by payment mode
 */
export function groupShopsByPaymentMode(shops: Shop[]): Record<PaymentMode, Shop[]> {
  return shops.reduce(
    (acc, shop) => {
      if (!acc[shop.payment_mode]) {
        acc[shop.payment_mode] = [];
      }
      acc[shop.payment_mode].push(shop);
      return acc;
    },
    { counter: [], prepaid: [], both: [] } as Record<PaymentMode, Shop[]>
  );
}

/**
 * Get execution mode color
 */
export function getExecutionModeColor(mode: ExecutionMode): string {
  const colors: Record<ExecutionMode, string> = {
    manual: '#667eea',
    assisted: '#f5576c',
    auto: '#4facfe',
  };
  return colors[mode];
}

/**
 * Get payment mode color
 */
export function getPaymentModeColor(mode: PaymentMode): string {
  const colors: Record<PaymentMode, string> = {
    counter: '#ff9800',
    prepaid: '#4caf50',
    both: '#2196f3',
  };
  return colors[mode];
}

/**
 * Filter shops by execution mode
 */
export function filterShopsByExecutionMode(
  shops: Shop[],
  mode: ExecutionMode | 'all'
): Shop[] {
  if (mode === 'all') return shops;
  return shops.filter((shop) => shop.execution_mode === mode);
}

/**
 * Filter shops by payment mode
 */
export function filterShopsByPaymentMode(shops: Shop[], mode: PaymentMode | 'all'): Shop[] {
  if (mode === 'all') return shops;
  return shops.filter((shop) => shop.payment_mode === mode);
}

/**
 * Filter shops by campus
 */
export function filterShopsByCampus(shops: Shop[], campusId: string): Shop[] {
  return shops.filter((shop) => shop.campus_id === campusId);
}

/**
 * Filter active/inactive shops
 */
export function filterShopsByStatus(shops: Shop[], isActive: boolean): Shop[] {
  return shops.filter((shop) => shop.is_active === isActive);
}
