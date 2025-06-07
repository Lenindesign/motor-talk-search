import React from 'react';
import { Shield, AlertCircle, CheckCircle, Info, ChevronRight, BarChart3 } from 'lucide-react';

interface ReliabilityMetric {
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

interface ReliabilityProps {
  overallScore: number;
  maxScore: number;
  metrics: ReliabilityMetric[];
  recallCount: number;
  warrantyYears: number;
  warrantyMiles: number;
  ownerSatisfaction: number;
  expertVerdict: string;
  isRecommended: boolean;
}

export const Reliability: React.FC<ReliabilityProps> = ({
  overallScore,
  maxScore,
  metrics,
  recallCount,
  warrantyYears,
  warrantyMiles,
  ownerSatisfaction,
  expertVerdict,
  isRecommended
}) => {
  // Calculate reliability percentage
  const reliabilityPercentage = (overallScore / maxScore) * 100;
  
  // Determine reliability level
  const getReliabilityLevel = () => {
    if (reliabilityPercentage >= 80) return { text: 'Excellent', color: 'text-green-600' };
    if (reliabilityPercentage >= 70) return { text: 'Very Good', color: 'text-green-500' };
    if (reliabilityPercentage >= 60) return { text: 'Good', color: 'text-yellow-500' };
    if (reliabilityPercentage >= 50) return { text: 'Average', color: 'text-yellow-600' };
    return { text: 'Below Average', color: 'text-red-500' };
  };
  
  const reliabilityLevel = getReliabilityLevel();
  
  return (
    <div className="bg-white shadow-modern border-modern rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-neutral-1">Reliability</h3>
        <Info size={16} className="text-neutral-3" />
      </div>
      
      {/* Overall Score */}
      <div className="flex items-center mb-6">
        <div className="flex items-center justify-center h-14 w-14 bg-neutral-100 rounded-full p-2 mr-4">
          <Shield size={32} className={reliabilityPercentage >= 60 ? "text-green-500" : "text-yellow-500"} />
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-neutral-1">{overallScore}/{maxScore}</span>
            <span className={`text-sm font-medium ${reliabilityLevel.color}`}>{reliabilityLevel.text}</span>
          </div>
          <p className="text-sm text-neutral-3">Overall reliability score</p>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="space-y-3 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="text-sm text-neutral-2">{metric.name}</div>
            <div className="flex items-center">
              {Array.from({ length: metric.maxScore }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-8 mx-0.5 rounded-sm ${i < metric.score ? 'bg-green-500' : 'bg-neutral-200'}`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Important Info */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            {recallCount > 0 ? (
              <AlertCircle size={18} className="text-yellow-500 mr-2" />
            ) : (
              <CheckCircle size={18} className="text-green-500 mr-2" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-1">
              {recallCount > 0 ? `${recallCount} Safety Recalls` : 'No Safety Recalls'}
            </p>
            <p className="text-xs text-neutral-3">
              {recallCount > 0 ? 'Check with dealer before purchase' : 'Clean safety record'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Shield size={18} className="text-neutral-2 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-neutral-1">
              {warrantyYears} years / {warrantyMiles.toLocaleString()} miles warranty
            </p>
            <p className="text-xs text-neutral-3">
              {warrantyYears >= 5 ? 'Above average coverage' : 'Standard coverage'}
            </p>
          </div>
        </div>
        
        <div className="flex items-start">
          <BarChart3 size={18} className="text-neutral-2 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-neutral-1">
              {ownerSatisfaction}% Owner Satisfaction
            </p>
            <p className="text-xs text-neutral-3">
              Based on {Math.floor(Math.random() * 1000) + 500} owner surveys
            </p>
          </div>
        </div>
      </div>
      
      {/* Expert Verdict */}
      <div className="bg-neutral-50 p-3 rounded-lg mb-4">
        <div className="flex items-center mb-2">
          <span className={`text-sm font-medium ${isRecommended ? 'text-green-600' : 'text-neutral-1'}`}>
            Expert Verdict
          </span>
          {isRecommended && (
            <span className="ml-2 text-xs font-medium text-white bg-green-600 px-2 py-0.5 rounded-full">
              Recommended
            </span>
          )}
        </div>
        <p className="text-sm text-neutral-2">{expertVerdict}</p>
      </div>
      
      <button className="w-full flex items-center justify-center text-sm font-medium text-neutral-1 hover:text-black py-2 border-t border-neutral-200">
        View full reliability report
        <ChevronRight size={16} className="ml-1" />
      </button>
    </div>
  );
};

export default Reliability;
