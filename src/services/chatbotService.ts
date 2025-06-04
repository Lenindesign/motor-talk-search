import { commonAnswers } from '../data/chatbot/commonAnswers';

export interface ChatbotResponse {
  answer: string;
  relatedLinks: {
    type: 'article' | 'video' | 'carDetail';
    title: string;
    url: string;
    thumbnail?: string;
  }[];
  confidence: number;  // 0-1 score of how confident we are in the answer
}

export const findBestAnswer = (query: string): ChatbotResponse | null => {
  // Normalize the query
  const normalizedQuery = query.toLowerCase().trim();
  
  // Find the best matching answer
  let bestMatch: {
    answer: typeof commonAnswers[0];
    score: number;
  } | null = null;

  for (const answer of commonAnswers) {
    // Check exact matches in questions
    for (const question of answer.question) {
      if (normalizedQuery === question.toLowerCase()) {
        return {
          answer: answer.answer,
          relatedLinks: answer.relatedLinks,
          confidence: 1
        };
      }
    }

    // Calculate similarity score based on question matches and tags
    let score = 0;
    
    // Check for word matches in questions
    const queryWords = new Set(normalizedQuery.split(' '));
    for (const question of answer.question) {
      const questionWords = new Set(question.toLowerCase().split(' '));
      const commonWords = [...queryWords].filter(word => questionWords.has(word));
      score = Math.max(score, commonWords.length / Math.max(queryWords.size, questionWords.size));
    }

    // Check for tag matches
    const tagMatches = answer.tags.filter(tag => 
      normalizedQuery.includes(tag) || 
      tag.split('-').some(part => normalizedQuery.includes(part))
    );
    score += tagMatches.length * 0.2;  // Each tag match adds 0.2 to the score

    // Update best match if this score is higher
    if (score > (bestMatch?.score || 0)) {
      bestMatch = {
        answer,
        score
      };
    }
  }

  // Return the best match if it meets our confidence threshold
  if (bestMatch && bestMatch.score >= 0.4) {
    return {
      answer: bestMatch.answer.answer,
      relatedLinks: bestMatch.answer.relatedLinks,
      confidence: bestMatch.score
    };
  }

  return null;
};
