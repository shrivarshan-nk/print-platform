/**
 * Dashboard Middleware Layer
 * Orchestrates data fetching and business logic for dashboard
 */

export interface DashboardStats {
  totalCampuses: number;
  totalShops: number;
  activeShops: number;
  inactiveShops: number;
  executionModeCounts: Record<string, number>;
  paymentModeCounts: Record<string, number>;
}

export interface DashboardMiddlewareResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Calculate dashboard statistics from Raw context data
 */
export async function getDashboardStats(
  campusCount: number,
  shopCount: number,
  shops: any[]
): Promise<DashboardMiddlewareResponse<DashboardStats>> {
  try {
    const executionModeCounts: Record<string, number> = {};
    const paymentModeCounts: Record<string, number> = {};

    shops.forEach((shop) => {
      // Count by execution mode
      executionModeCounts[shop.execution_mode] =
        (executionModeCounts[shop.execution_mode] || 0) + 1;

      // Count by payment mode
      paymentModeCounts[shop.payment_mode] = (paymentModeCounts[shop.payment_mode] || 0) + 1;
    });

    const stats: DashboardStats = {
      totalCampuses: campusCount,
      totalShops: shopCount,
      activeShops: shops.filter((s) => s.is_active).length,
      inactiveShops: shops.filter((s) => !s.is_active).length,
      executionModeCounts,
      paymentModeCounts,
    };

    return {
      success: true,
      data: stats,
      message: 'Dashboard stats calculated successfully',
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to calculate dashboard stats',
    };
  }
}

/**
 * Get dashboard summary metrics
 */
export function getDashboardMetrics(stats: DashboardStats) {
  return {
    totalItems: stats.totalCampuses + stats.totalShops,
    activeShopsPercentage:
      stats.totalShops > 0 ? Math.round((stats.activeShops / stats.totalShops) * 100) : 0,
    campusToShopRatio: stats.totalCampuses > 0 ? stats.totalShops / stats.totalCampuses : 0,
  };
}
