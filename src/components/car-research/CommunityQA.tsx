
import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface CommunityQAProps {
  vehicle: any;
}

interface Question {
  id: number;
  author: string;
  authorRole: 'owner' | 'expert' | 'user';
  avatar?: string;
  question: string;
  date: string;
  answers: Answer[];
  likes: number;
  views: number;
  expanded: boolean;
}

interface Answer {
  id: number;
  author: string;
  authorRole: 'owner' | 'expert' | 'user';
  avatar?: string;
  content: string;
  date: string;
  likes: number;
  dislikes: number;
  verified: boolean;
}

const CommunityQA: React.FC<CommunityQAProps> = ({ vehicle }) => {
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      author: 'Michael T.',
      authorRole: 'owner',
      avatar: 'https://i.pravatar.cc/150?img=1',
      question: 'How is the road noise at highway speeds in this vehicle?',
      date: '2 days ago',
      likes: 12,
      views: 156,
      expanded: true,
      answers: [
        {
          id: 1,
          author: 'Sarah J.',
          authorRole: 'owner',
          avatar: 'https://i.pravatar.cc/150?img=5',
          content: "I've owned this for 6 months and the road noise is minimal. The insulation is excellent for this class of vehicle. Even at 70mph, conversation is easy.",
          date: '1 day ago',
          likes: 8,
          dislikes: 0,
          verified: true
        },
        {
          id: 2,
          author: 'MotorTrend Expert',
          authorRole: 'expert',
          avatar: '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
          content: "In our testing, this vehicle registered 68db at highway speeds, which is better than average for this segment. The acoustic glass and sound insulation contribute to a quiet cabin experience.",
          date: '1 day ago',
          likes: 15,
          dislikes: 1,
          verified: true
        }
      ]
    },
    {
      id: 2,
      author: 'Jason R.',
      authorRole: 'user',
      avatar: 'https://i.pravatar.cc/150?img=3',
      question: 'Does the infotainment system support wireless Apple CarPlay?',
      date: '5 days ago',
      likes: 8,
      views: 98,
      expanded: false,
      answers: [
        {
          id: 3,
          author: 'David L.',
          authorRole: 'owner',
          avatar: 'https://i.pravatar.cc/150?img=4',
          content: "Yes, it supports both wireless Apple CarPlay and Android Auto. The connection is reliable and I've had no issues with it dropping.",
          date: '4 days ago',
          likes: 5,
          dislikes: 0,
          verified: true
        }
      ]
    },
    {
      id: 3,
      author: 'Alex P.',
      authorRole: 'user',
      avatar: 'https://i.pravatar.cc/150?img=7',
      question: 'How does the fuel economy compare to the previous model year?',
      date: '1 week ago',
      likes: 15,
      views: 204,
      expanded: false,
      answers: [
        {
          id: 4,
          author: 'MotorTrend Expert',
          authorRole: 'expert',
          avatar: '/lovable-uploads/6f8fd40c-6013-4f96-89f0-8406d6febb7c.png',
          content: "The current model year shows a 5% improvement in fuel economy over the previous generation. City driving is up from 26 to 28 mpg, and highway improved from 34 to 36 mpg based on our real-world testing.",
          date: '6 days ago',
          likes: 12,
          dislikes: 0,
          verified: true
        }
      ]
    }
  ]);

  const handleSubmitQuestion = () => {
    if (!newQuestion.trim()) return;
    
    const newQuestionObj: Question = {
      id: questions.length + 1,
      author: 'You',
      authorRole: 'user',
      question: newQuestion,
      date: 'Just now',
      likes: 0,
      views: 1,
      expanded: true,
      answers: []
    };
    
    setQuestions([newQuestionObj, ...questions]);
    setNewQuestion('');
    toast.success("Question submitted! Our experts will respond soon.");
  };
  
  const toggleExpanded = (id: number) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, expanded: !q.expanded } : q
    ));
  };
  
  const handleLike = (id: number) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, likes: q.likes + 1 } : q
    ));
    toast.success("Thanks for your feedback!");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Community Q&A</CardTitle>
            <CardDescription>Ask and answer questions about the {vehicle.year} {vehicle.make} {vehicle.model}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10">
            {questions.length} Questions
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Ask a question */}
        <div className="rounded-lg border p-4">
          <h3 className="mb-2 font-medium">Ask a question about this vehicle</h3>
          <div className="space-y-3">
            <Textarea 
              placeholder="What would you like to know about this vehicle?" 
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="min-h-[80px] resize-none"
            />
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Our community of owners and experts will answer your question.
              </div>
              <Button 
                onClick={handleSubmitQuestion} 
                disabled={!newQuestion.trim()}
                className="flex items-center gap-1"
              >
                <Send className="h-4 w-4" />
                Submit Question
              </Button>
            </div>
          </div>
        </div>
        
        {/* Questions and Answers */}
        <div className="space-y-5">
          {questions.map((question) => (
            <div key={question.id} className="rounded-lg border overflow-hidden">
              {/* Question */}
              <div className="bg-gray-50 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={question.avatar} alt={question.author} />
                      <AvatarFallback>{question.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{question.author}</h4>
                        {question.authorRole === 'owner' && <Badge variant="outline" className="bg-green-100 text-green-800 text-xs">Owner</Badge>}
                        {question.authorRole === 'expert' && <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">Expert</Badge>}
                      </div>
                      <p className="mt-1">{question.question}</p>
                      <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                        <span>{question.date}</span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-3.5 w-3.5" /> {question.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3.5 w-3.5" /> {question.answers.length}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleExpanded(question.id)}
                  >
                    {question.expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              {/* Answers */}
              {question.expanded && (
                <div className="divide-y">
                  {question.answers.map((answer) => (
                    <div key={answer.id} className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={answer.avatar} alt={answer.author} />
                          <AvatarFallback>{answer.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{answer.author}</h4>
                            {answer.authorRole === 'owner' && <Badge variant="outline" className="bg-green-100 text-green-800 text-xs">Owner</Badge>}
                            {answer.authorRole === 'expert' && <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">Expert</Badge>}
                            {answer.verified && <Badge variant="outline" className="bg-yellow-100 text-yellow-800 text-xs">Verified Purchase</Badge>}
                          </div>
                          <p className="mt-1 text-gray-700">{answer.content}</p>
                          <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                            <span>{answer.date}</span>
                            <div className="flex items-center gap-3">
                              <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500 hover:text-gray-900">
                                <ThumbsUp className="mr-1 h-3.5 w-3.5" /> {answer.likes}
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500 hover:text-gray-900">
                                <ThumbsDown className="mr-1 h-3.5 w-3.5" /> {answer.dislikes}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Add answer form */}
                  <div className="p-4">
                    <Textarea 
                      placeholder="Add your answer..." 
                      className="min-h-[80px] resize-none mb-2"
                    />
                    <Button size="sm">Post Answer</Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-gray-50 py-3">
        <Button variant="link" className="mx-auto">
          View all {questions.length} questions
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommunityQA;
