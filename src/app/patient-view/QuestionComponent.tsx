"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Question {
  id: number;
  text: string;
  type: 'text' | 'image';
  image?: string;
}

interface QuestionComponentProps {
  testType: string;
  questionNumber: number;
  currentQuestionData: Question;
}

export function QuestionComponent({ testType, questionNumber, currentQuestionData }: QuestionComponentProps) {
  const router = useRouter();
  const [answer, setAnswer] = useState('');

  const handleNext = () => {
    const nextQuestion = questionNumber + 1;
    router.push(`/patient-view?testType=${testType}&question=${nextQuestion}`);
  };

  const handlePrevious = () => {
    const prevQuestion = questionNumber - 1;
    if (prevQuestion > 0) {
      router.push(`/patient-view?testType=${testType}&question=${prevQuestion}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Question {questionNumber}</h2>
            
            <div className="mb-6">
              <p className="text-lg text-gray-700">{currentQuestionData.text}</p>
              {currentQuestionData.type === 'image' && currentQuestionData.image && (
                <div className="mt-4">
                  <img 
                    src={currentQuestionData.image} 
                    alt="Question image" 
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="mb-6">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your answer"
              />
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={questionNumber === 1}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 