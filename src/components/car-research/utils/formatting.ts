
/**
 * Utility functions for formatting values in the car research components
 */

/**
 * Format currency to nearest thousand with k suffix
 */
export const formatCurrency = (value: number) => {
  return `$${Math.abs(value) >= 1000 ? `${(value / 1000).toFixed(0)}k` : value}`;
};

/**
 * Format percentage with + or - sign
 */
export const formatPercentage = (value: number) => {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
};

/**
 * Determine if higher or lower value is better for each category
 */
export const isHigherBetter = (category: string) => {
  return category !== 'price'; // For price, lower is better
};

/**
 * Get appropriate color for difference based on whether higher or lower is better
 */
export const getDifferenceColor = (category: string, diff: number) => {
  const better = isHigherBetter(category) ? diff > 0 : diff < 0;
  return better ? 'text-green-600' : 'text-red-600';
};
