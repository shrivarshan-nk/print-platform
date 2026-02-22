/**
 * Dashboard Services Layer
 * Transforms and formats dashboard data for display
 */

import { DashboardStats } from '../middleware/dashboardMiddleware';

/**
 * Format stats for display with percentages and labels
 */
export function formatDashboardStats(stats: DashboardStats) {
  const totalShops = stats.totalShops || 1; // Avoid division by zero
  const activePercentage = Math.round((stats.activeShops / totalShops) * 100);
  const inactivePercentage = Math.round((stats.inactiveShops / totalShops) * 100);

  return {
    ...stats,
    activePercentage,
    inactivePercentage,
  };
}

/**
 * Get execution mode labels with counts
 */
export function getExecutionModeStats(
  counts: Record<string, number>
): Array<{ mode: string; label: string; count: number }> {
  const modeLabels: Record<string, string> = {
    manual: '✍️ Manual',
    assisted: '⚙️ Assisted',
    auto: '🚀 Automated',
  };

  return Object.entries(counts)
    .map(([mode, count]) => ({
      mode,
      label: modeLabels[mode] || mode,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get payment mode labels with counts
 */
export function getPaymentModeStats(
  counts: Record<string, number>
): Array<{ mode: string; label: string; count: number }> {
  const modeLabels: Record<string, string> = {
    counter: '💳 Pay @ Counter',
    prepaid: '💰 Prepaid Wallet',
    both: '🔄 Both Options',
  };

  return Object.entries(counts)
    .map(([mode, count]) => ({
      mode,
      label: modeLabels[mode] || mode,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get status color based on percentage
 */
export function getStatusColor(percentage: number): string {
  if (percentage >= 80) return '#4caf50'; // Green
  if (percentage >= 50) return '#2196f3'; // Blue
  if (percentage >= 20) return '#ff9800'; // Orange
  return '#f44336'; // Red
}

/**
 * Get dashboard summary text
 */
export function getDashboardSummary(stats: DashboardStats): string {
  return `Total: ${stats.totalCampuses} campuses, ${stats.totalShops} shops (${stats.activeShops} active)`;
}
