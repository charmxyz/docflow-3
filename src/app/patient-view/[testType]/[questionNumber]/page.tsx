import { QuestionComponent } from './QuestionComponent';

interface Question {
  id: number;
  text: string;
  type: 'text' | 'image';
  image?: string;
}

// Question data
const questions: Question[] = [
  {
    id: 1,
    text: "What is the day?",
    type: "text",
  },
  {
    id: 2,
    text: "What is the date?",
    type: "text",
  },
  {
    id: 3,
    text: "What is the month?",
    type: "text",
  },
  {
    id: 4,
    text: "What is the year?",
    type: "text",
  },
  {
    id: 5,
    text: "What is the season?",
    type: "text",
  },
  {
    id: 6,
    text: "Name this object",
    type: "image",
    image: "/book.jpg",
  },
  {
    id: 7,
    text: "Name this object",
    type: "image",
    image: "/spoon.jpg",
  },
  {
    id: 8,
    text: "Name this object",
    type: "image",
    image: "/camel.jpg",
  },
];

export async function generateStaticParams() {
  return [
    { testType: 'ace', questionNumber: '1' },
    { testType: 'ace', questionNumber: '2' },
    { testType: 'ace', questionNumber: '3' },
    { testType: 'ace', questionNumber: '4' },
    { testType: 'ace', questionNumber: '5' },
    { testType: 'ace', questionNumber: '6' },
    { testType: 'ace', questionNumber: '7' },
    { testType: 'ace', questionNumber: '8' },
  ];
}

export default function Page({
  params,
}: {
  params: { testType: string; questionNumber: string };
}) {
  // Use URL parameters with fallback values
  const testType = params.testType || "ace";
  const questionNumber = parseInt(params.questionNumber, 10) || 1;
  const currentQuestionData = questions[questionNumber - 1];

  return <QuestionComponent 
    params={{ testType, questionNumber: questionNumber.toString() }} 
    currentQuestionData={currentQuestionData} 
  />;
} 