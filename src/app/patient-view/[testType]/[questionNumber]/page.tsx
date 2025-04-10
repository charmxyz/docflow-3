"use client";

import { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Question {
  id: number;
  text: string;
  type: "text" | "image";
  image?: string;
}

// Question data
const questions: Question[] = [
  {
    id: 1,
    text: "What is your name?",
    type: "text",
  },
  {
    id: 2,
    text: "How old are you?",
    type: "text",
  },
  {
    id: 3,
    text: "Where were you born?",
    type: "text",
  },
  {
    id: 4,
    text: "What is your occupation?",
    type: "text",
  },
  {
    id: 5,
    text: "Do you have any allergies?",
    type: "text",
  },
  {
    id: 6,
    text: "What is this object?",
    type: "image",
    image: "/book.jpg",
  },
  {
    id: 7,
    text: "What is this object?",
    type: "image",
    image: "/spoon.jpg",
  },
  {
    id: 8,
    text: "What is this object?",
    type: "image",
    image: "/camel.jpg",
  },
];

interface Props {
  params: {
    testType: string;
    questionNumber: string;
  };
}

export default function Page({ params }: Props) {
  const router = useRouter();
  const testType = params.testType;
  const questionNumber = parseInt(params.questionNumber, 10);
  const currentQuestionData = questions[questionNumber - 1];
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 25;

  // Calculate pagination
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6 h-full">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Question {questionNumber}</h2>
              <p className="text-lg text-gray-700">{currentQuestionData.text}</p>
              {currentQuestionData.type === "image" && currentQuestionData.image && (
                <div className="flex justify-center">
                  <div className="relative w-64 h-64">
                    <Image
                      src={currentQuestionData.image}
                      alt="Object to name"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}
              <div className="mt-4">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type your answer here..."
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => router.push(`/patient-view/${testType}/${questionNumber - 1}`)}
                disabled={questionNumber === 1}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => router.push(`/patient-view/${testType}/${questionNumber + 1}`)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
              </button>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <Link
                    key={number}
                    href={`/patient-view/${testType}/${number}`}
                    className={`flex items-center justify-center h-10 w-10 rounded-md text-sm font-medium ${
                      number === questionNumber
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {number}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 