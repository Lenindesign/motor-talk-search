import React from 'react';

const CarComparisonTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Car Comparison Test</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-lg text-center">
            🎉 Success! The comparison route is working!
          </p>
          <p className="text-center mt-4 text-gray-600">
            This is a test version of the comparison page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarComparisonTest;