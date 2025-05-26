export const mockCompetitors = [
  {
    name: 'Tesla Model X',
    imageUrl: '/src/assets/images/competitors/model-x.jpg',
    price: 114990,
    specs: {
      engine: 'Dual Motor AWD',
      acceleration: '3.8 seconds 0-60 mph',
      range: '360 miles EPA',
      charging: '250kW DC Fast Charging',
      drivetrain: 'All-Wheel Drive',
      seating: '7 passengers',
      cargo: '25.5 cu ft',
      warranty: '4 years/50,000 miles'
    },
    pros: [
      'Faster acceleration',
      'Larger cargo space',
      'Better range'
    ],
    cons: [
      'Higher price',
      'Less comfortable ride',
      'More expensive maintenance'
    ]
  },
  {
    name: 'Ford Mustang Mach-E',
    imageUrl: '/src/assets/images/competitors/mustang-mache.jpg',
    price: 60900,
    specs: {
      engine: 'Dual Motor AWD',
      acceleration: '4.8 seconds 0-60 mph',
      range: '312 miles EPA',
      charging: '150kW DC Fast Charging',
      drivetrain: 'All-Wheel Drive',
      seating: '5 passengers',
      cargo: '29.7 cu ft',
      warranty: '4 years/50,000 miles'
    },
    pros: [
      'More affordable',
      'Good range',
      'Large cargo space'
    ],
    cons: [
      'Slower acceleration',
      'Less advanced tech',
      'Smaller seating capacity'
    ]
  },
  {
    name: 'BMW iX',
    imageUrl: '/src/assets/images/competitors/bmw-ix.jpg',
    price: 83200,
    specs: {
      engine: 'Dual Motor AWD',
      acceleration: '4.6 seconds 0-60 mph',
      range: '324 miles EPA',
      charging: '200kW DC Fast Charging',
      drivetrain: 'All-Wheel Drive',
      seating: '5 passengers',
      cargo: '30.5 cu ft',
      warranty: '4 years/50,000 miles'
    },
    pros: [
      'Luxurious interior',
      'Good range',
      'High-quality build'
    ],
    cons: [
      'Expensive',
      'Less cargo space',
      'Higher maintenance costs'
    ]
  }
];

export const comparisonMetrics = [
  {
    label: 'Price',
    unit: 'k',
    ours: 85,
    competitors: [
      { value: 114.99, name: 'Tesla Model X' },
      { value: 60.9, name: 'Ford Mustang Mach-E' },
      { value: 83.2, name: 'BMW iX' }
    ]
  },
  {
    label: 'Acceleration',
    unit: '0-60 mph',
    ours: 4.2,
    competitors: [
      { value: 3.8, name: 'Tesla Model X' },
      { value: 4.8, name: 'Ford Mustang Mach-E' },
      { value: 4.6, name: 'BMW iX' }
    ]
  },
  {
    label: 'Range',
    unit: 'miles EPA',
    ours: 405,
    competitors: [
      { value: 360, name: 'Tesla Model X' },
      { value: 312, name: 'Ford Mustang Mach-E' },
      { value: 324, name: 'BMW iX' }
    ]
  },
  {
    label: 'Cargo Space',
    unit: 'cu ft',
    ours: 28.1,
    competitors: [
      { value: 25.5, name: 'Tesla Model X' },
      { value: 29.7, name: 'Ford Mustang Mach-E' },
      { value: 30.5, name: 'BMW iX' }
    ]
  },
  {
    label: 'Seating Capacity',
    unit: 'passengers',
    ours: 5,
    competitors: [
      { value: 7, name: 'Tesla Model X' },
      { value: 5, name: 'Ford Mustang Mach-E' },
      { value: 5, name: 'BMW iX' }
    ]
  }
];
