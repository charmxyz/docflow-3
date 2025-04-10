import { QuestionComponent } from './QuestionComponent';
import { Metadata } from 'next';

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

type PageProps = {
  params: {
    testType: string;
    questionNumber: string;
  };
};

export default function Page({ params }: PageProps) {
  const questionNumber = parseInt(params.questionNumber, 10);
  const currentQuestionData = questions[questionNumber - 1];

  return <QuestionComponent params={params} currentQuestionData={currentQuestionData} />;
} 