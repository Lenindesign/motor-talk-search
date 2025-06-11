import React from 'react';

interface Trim {
  name: string;
  price: string;
  features: string[];
}

interface TrimLevelsProps {
  trims: Trim[];
  selectedTrim: string;
  onTrimSelect: (trim: string) => void;
}

const TrimLevels: React.FC<TrimLevelsProps> = ({ trims, selectedTrim, onTrimSelect }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Trim Levels</h2>
      <div className="space-y-4">
        {trims.map((trim) => (
          <div
            key={trim.name}
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              selectedTrim === trim.name
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => onTrimSelect(trim.name)}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{trim.name}</h3>
              {trim.price && <span>${trim.price}</span>}
            </div>
            <ul className="list-disc list-inside space-y-1">
              {trim.features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-300">{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrimLevels;
