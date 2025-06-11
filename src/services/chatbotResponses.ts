// Chatbot Q&A responses for car enthusiast and buyer questions
// Define ContentType here to avoid circular imports
export type ContentType = "all" | "articles" | "newCars" | "usedCars" | "photos" | "videos";

export interface ChatbotResponse {
  questionPatterns: RegExp[];
  response: string;
  suggestedContentType?: ContentType;
}

export const chatbotResponses: ChatbotResponse[] = [
  // Enthusiast Questions
  {
    questionPatterns: [/fastest car/i, /what.*fastest.*car/i, /quickest car/i],
    response: "The fastest production car currently is the Bugatti Chiron Super Sport 300+, reaching speeds over 300 mph. For more details and the latest contenders, check out our supercar reviews and speed tests.",
    suggestedContentType: "articles"
  },
  {
    questionPatterns: [/most powerful car/i, /highest horsepower/i],
    response: "The most powerful cars on the market include the Rimac Nevera and the Lotus Evija, both offering over 1,900 horsepower. Explore our latest articles and comparisons for more high-performance vehicles.",
    suggestedContentType: "articles"
  },
  {
    questionPatterns: [/best handling car/i, /best cornering/i],
    response: "For best handling, enthusiasts often recommend the Porsche 911 GT3, Mazda MX-5 Miata, and Chevrolet Corvette Z06. Check out our reviews for detailed driving impressions.",
    suggestedContentType: "articles"
  },

  // Buyer Questions
  {
    questionPatterns: [/best suv/i, /top suv/i, /which.*suv.*buy/i],
    response: "Some of the best SUVs this year include the Kia Telluride, Hyundai Palisade, and BMW X5. See our SUV buying guides and comparison tests for more details.",
    suggestedContentType: "newCars"
  },
  {
    questionPatterns: [/best electric car/i, /top ev/i, /which.*electric.*car/i],
    response: "Popular electric cars include the Tesla Model Y, Hyundai Ioniq 5, and Ford Mustang Mach-E. Explore our EV reviews and range tests for the latest info.",
    suggestedContentType: "newCars"
  },
  {
    questionPatterns: [/most reliable car/i, /reliable.*car/i],
    response: "Toyota and Lexus frequently top reliability rankings, with models like the Toyota Camry and Lexus RX. See our reliability reports for more recommendations.",
    suggestedContentType: "articles"
  },
  {
    questionPatterns: [/best used car/i, /top used car/i, /which.*used.*car/i],
    response: "Great used cars include the Honda Accord, Toyota Corolla, and Mazda3. Check our used car listings and buying guides for more options.",
    suggestedContentType: "usedCars"
  },
];

export function getChatbotResponse(query: string) {
  for (const entry of chatbotResponses) {
    if (entry.questionPatterns.some(pattern => pattern.test(query))) {
      return entry;
    }
  }
  return null;
}
