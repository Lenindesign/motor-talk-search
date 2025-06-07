export const reliabilityData = {
  // Rivian R1S data
  rivianR1S: {
    overallScore: 4,
    maxScore: 5,
    metrics: [
      { name: 'Powertrain', score: 4, maxScore: 5, description: 'Electric motors and battery reliability' },
      { name: 'Body & Interior', score: 4, maxScore: 5, description: 'Build quality and materials' },
      { name: 'Electronics', score: 3, maxScore: 5, description: 'Infotainment and electrical systems' },
      { name: 'Suspension', score: 4, maxScore: 5, description: 'Ride quality and durability' }
    ],
    recallCount: 1,
    warrantyYears: 5,
    warrantyMiles: 60000,
    ownerSatisfaction: 92,
    expertVerdict: "The Rivian R1S shows promising reliability for a new EV model. While there have been minor software issues, the powertrain and build quality are excellent. Battery longevity data is still limited but initial reports are positive.",
    isRecommended: true
  },
  
  // Tesla Model Y data
  teslaModelY: {
    overallScore: 3,
    maxScore: 5,
    metrics: [
      { name: 'Powertrain', score: 4, maxScore: 5, description: 'Electric motors and battery reliability' },
      { name: 'Body & Interior', score: 2, maxScore: 5, description: 'Build quality and materials' },
      { name: 'Electronics', score: 4, maxScore: 5, description: 'Infotainment and electrical systems' },
      { name: 'Suspension', score: 3, maxScore: 5, description: 'Ride quality and durability' }
    ],
    recallCount: 3,
    warrantyYears: 4,
    warrantyMiles: 50000,
    ownerSatisfaction: 86,
    expertVerdict: "The Model Y has excellent powertrain reliability but continues to face build quality inconsistencies. Panel gaps and interior fit issues are common complaints, though the electronics are generally robust.",
    isRecommended: true
  },
  
  // Ford Mustang Mach-E data
  fordMachE: {
    overallScore: 3,
    maxScore: 5,
    metrics: [
      { name: 'Powertrain', score: 3, maxScore: 5, description: 'Electric motors and battery reliability' },
      { name: 'Body & Interior', score: 4, maxScore: 5, description: 'Build quality and materials' },
      { name: 'Electronics', score: 2, maxScore: 5, description: 'Infotainment and electrical systems' },
      { name: 'Suspension', score: 4, maxScore: 5, description: 'Ride quality and durability' }
    ],
    recallCount: 2,
    warrantyYears: 3,
    warrantyMiles: 36000,
    ownerSatisfaction: 78,
    expertVerdict: "The Mustang Mach-E has good overall build quality but has experienced software glitches and infotainment issues. Battery system reliability is average for the segment.",
    isRecommended: false
  }
};

export default reliabilityData;
