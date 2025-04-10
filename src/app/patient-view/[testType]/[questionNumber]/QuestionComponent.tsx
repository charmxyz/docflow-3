"use client";

import { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface Question {
  id: number;
  text: string;
  type: "text" | "image";
  image?: string;
}

interface QuestionComponentProps {
  params: {
    testType: string;
    questionNumber: string;
  };
  currentQuestionData: Question;
}

export function QuestionComponent({ params, currentQuestionData }: QuestionComponentProps) {
  const router = useRouter();
  const testType = params.testType;
  const questionNumber = parseInt(params.questionNumber, 10);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 25;
  const totalPages = Math.ceil(100 / questionsPerPage);

  const startQuestion = (currentPage - 1) * questionsPerPage + 1;
  const endQuestion = Math.min(currentPage * questionsPerPage, 100);

  return (
    <div className="flex h-[calc(100vh-200px)]">
      {/* Left side - Question (75%) */}
      <div className="w-3/4 pr-8">
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                placeholder="Enter your answer"
              />
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
          </div>
        </div>
      </div>

      {/* Right side - Question Navigation (25%) */}
      <div className="w-1/4">
        <div className="bg-white shadow rounded-lg p-6 h-full">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Questions</h3>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {Array.from({ length: endQuestion - startQuestion + 1 }, (_, i) => startQuestion + i).map((number) => (
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
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="text-sm text-gray-700">
              {startQuestion}-{endQuestion} of 100
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 