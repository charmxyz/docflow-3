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
  {
    id: 9,
    text: "Count the dots",
    type: "image",
    image: "/dot9.jpg",
  },
  {
    id: 10,
    text: "Count the dots",
    type: "image",
    image: "/dot10.jpg",
  },
  {
    id: 11,
    text: "Count the dots",
    type: "image",
    image: "/dot11.jpg",
  },
];

export async function generateStaticParams() {
  return questions.map((q) => ({
    testType: 'ace',
    questionNumber: q.id.toString(),
  }));
}

export default async function Page({
  params,
}: {
  params: { testType: string; questionNumber: string };
}) {
  const questionNumber = parseInt(params.questionNumber, 10);
  const currentQuestionData = questions[questionNumber - 1];

  return <QuestionComponent 
    params={{ testType: params.testType, questionNumber: params.questionNumber }} 
    currentQuestionData={currentQuestionData} 
  />;
} 