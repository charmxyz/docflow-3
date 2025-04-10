"use client";

import { QuestionComponent } from './QuestionComponent';
import { useSearchParams } from 'next/navigation';

interface Question {
  id: number;
  text: string;
  type: 'text' | 'image';
  image?: string;
}

const questions: Question[] = [
  { id: 1, text: "What is the day?", type: "text" },
  { id: 2, text: "What is the date?", type: "text" },
  { id: 3, text: "What is the month?", type: "text" },
  { id: 4, text: "What is the year?", type: "text" },
  { id: 5, text: "What is the season?", type: "text" },
  { id: 6, text: "Name this object", type: "image", image: "/book.jpg" },
  { id: 7, text: "Name this object", type: "image", image: "/spoon.jpg" },
  { id: 8, text: "Name this object", type: "image", image: "/camel.jpg" },
];

export default function PatientViewPage() {
  const searchParams = useSearchParams();
  const testType = searchParams.get('testType') || 'ace';
  const questionNumber = parseInt(searchParams.get('question') || '1', 10);

  const currentQuestionData = questions.find(q => q.id === questionNumber);

  return currentQuestionData ? (
    <QuestionComponent
      testType={testType}
      questionNumber={questionNumber}
      currentQuestionData={currentQuestionData}
    />
  ) : (
    <div>Invalid question</div>
  );
} 