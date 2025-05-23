
/**
 * Utility functions for preparing data for the charts
 */

import { formatCurrency } from './formatting';

// Define chart data item type
export interface ChartDataItem {
  name: string;
  classAvg: number;
  vehicleValue: number;
  percentDiff: number;
  isBetter: boolean;
  format: (val: number) => string;
  tooltip: string;
  key: string;
}

/**
 * Prepare comparison data for charts
 */
export const prepareComparisonData = (vehicle: any): ChartDataItem[] => {
  const classData = vehicle.classComparison;
  
  // These are the categories we want to compare
  const categories = [
    { key: 'price', label: 'Price', format: formatCurrency, vehicleValue: vehicle.price.base, 
      tooltip: 'Vehicle price compared to class average. Lower is better.' },
    { key: 'mpg', label: 'MPG', format: (val: number) => `${val}`, vehicleValue: vehicle.specs.mpg.combined,
      tooltip: 'Combined MPG compared to class average. Higher is better.' },
    { key: 'cargo', label: 'Cargo', format: (val: number) => `${val} ft³`, vehicleValue: vehicle.specs.dimensions.cargo,
      tooltip: 'Cargo volume compared to class average. Higher is better.' },
    { key: 'safety', label: 'Safety', format: (val: number) => `${val.toFixed(1)}`, vehicleValue: vehicle.ratings.expert.safety,
      tooltip: 'Safety rating compared to class average. Higher is better.' },
    { key: 'reliability', label: 'Reliability', format: (val: number) => `${val.toFixed(1)}`, vehicleValue: vehicle.ratings.expert.reliability,
      tooltip: 'Reliability rating compared to class average. Higher is better.' },
    { key: 'tech', label: 'Technology', format: (val: number) => `${val.toFixed(1)}`, vehicleValue: vehicle.ratings.expert.technology,
      tooltip: 'Technology rating compared to class average. Higher is better.' },
  ];
  
  return categories.map(category => {
    // Get the class average from our data
    let classAverage = 0;
    
    switch(category.key) {
      case 'price':
        classAverage = classData.avgPrice;
        break;
      case 'mpg':
        classAverage = classData.avgMpg;
        break;
      case 'cargo':
        classAverage = classData.avgCargoSpace;
        break;
      case 'safety':
        classAverage = classData.avgSafetyRating;
        break;
      case 'reliability':
        classAverage = classData.avgReliabilityRating;
        break;
      case 'tech':
        classAverage = classData.avgTechRating;
        break;
    }
    
    // Calculate the percentage difference
    const percentDiff = ((category.vehicleValue - classAverage) / classAverage) * 100;
    
    // Determine if this is better or worse than average
    // For price, lower is better, for everything else higher is better
    const isBetter = category.key === 'price' ? percentDiff < 0 : percentDiff > 0;
    
    return {
      name: category.label,
      classAvg: classAverage,
      vehicleValue: category.vehicleValue,
      percentDiff,
      isBetter,
      format: category.format,
      tooltip: category.tooltip,
      key: category.key,
    };
  });
};

/**
 * Prepare data for pie chart
 */
export const preparePieData = (chartData: ChartDataItem[]) => {
  return chartData.map(item => ({
    name: item.name,
    value: Math.abs(item.percentDiff), // Use absolute value for pie size
    isBetter: item.isBetter,
    color: item.isBetter ? '#4ade80' : '#f87171',
  }));
};

/**
 * Prepare data for radar chart
 */
export const prepareRadarData = (chartData: ChartDataItem[]) => {
  return [
    {
      subject: 'This Vehicle',
      ...chartData.reduce((acc, item) => {
        acc[item.name] = item.vehicleValue;
        return acc;
      }, {} as Record<string, number>),
    },
    {
      subject: 'Class Average',
      ...chartData.reduce((acc, item) => {
        acc[item.name] = item.classAvg;
        return acc;
      }, {} as Record<string, number>),
    },
  ];
};
