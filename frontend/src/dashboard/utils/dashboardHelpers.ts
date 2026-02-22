/**
 * Dashboard Utilities
 * Helper functions and calculators for dashboard
 */

/**
 * Calculate growth percentage
 */
export function calculateGrowthPercentage(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

/**
 * Format large numbers with suffixes (e.g., 1K, 1M)
 */
export function formatLargeNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

/**
 * Get trend indicator (up/down/stable)
 */
export function getTrendIndicator(
  current: number,
  previous: number
): { symbol: string; color: string; text: string } {
  const change = current - previous;
  if (change > 0) return { symbol: '📈', color: '#4caf50', text: 'up' };
  if (change < 0) return { symbol: '📉', color: '#f44336', text: 'down' };
  return { symbol: '➡️', color: '#ff9800', text: 'stable' };
}

/**
 * Validate stats data
 */
export function validateDashboardStats(stats: any): boolean {
  return (
    typeof stats.totalCampuses === 'number' &&
    typeof stats.totalShops === 'number' &&
    typeof stats.activeShops === 'number' &&
    typeof stats.inactiveShops === 'number'
  );
}

/**
 * Check if data is stale (older than 5 minutes)
 */
export function isDataStale(lastUpdated: Date): boolean {
  const fiveMinutes = 5 * 60 * 1000;
  return new Date().getTime() - lastUpdated.getTime() > fiveMinutes;
}

/**
 * Get empty stats object
 */
export function getEmptyStats() {
  return {
    totalCampuses: 0,
    totalShops: 0,
    activeShops: 0,
    inactiveShops: 0,
    executionModeCounts: {},
    paymentModeCounts: {},
  };
}

/**
 * Merge stats from multiple sources
 */
export function mergeStats(stats1: any, stats2: any) {
  return {
    totalCampuses: Math.max(stats1.totalCampuses || 0, stats2.totalCampuses || 0),
    totalShops: Math.max(stats1.totalShops || 0, stats2.totalShops || 0),
    activeShops: Math.max(stats1.activeShops || 0, stats2.activeShops || 0),
    inactiveShops: Math.max(stats1.inactiveShops || 0, stats2.inactiveShops || 0),
    executionModeCounts: { ...stats1.executionModeCounts, ...stats2.executionModeCounts },
    paymentModeCounts: { ...stats1.paymentModeCounts, ...stats2.paymentModeCounts },
  };
}
