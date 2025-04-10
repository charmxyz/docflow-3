"use client";

import Link from "next/link";
import Flow from "../components/Flow";
import { AcademicCapIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

const testTypes = [
  {
    title: "Addenbrooke's Cognitive Examination",
    description: "A comprehensive cognitive test that assesses multiple domains including memory, attention, language, and visuospatial abilities.",
    icon: AcademicCapIcon,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50',
    route: 'ace',
  },
  {
    title: "Mini Mental State Examination",
    description: "A brief screening test that evaluates cognitive function including orientation, memory, attention, and language.",
    icon: ClipboardDocumentCheckIcon,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
    route: 'mmse',
  },
];

export default function PatientDashboard() {
  const [selectedTestType, setSelectedTestType] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTestType) {
      const test = testTypes.find(t => t.title === selectedTestType);
      if (test) {
        router.push(`/patient-view/${test.route}/1`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome to Cogni</h1>
          <h2 className="text-2xl font-bold text-gray-900">Start Dementia Assessment</h2>
          
          <div className="bg-white shadow rounded-lg p-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                  placeholder="Enter your age"
                />
              </div>

              <div>
                <label htmlFor="familyHistory" className="block text-sm font-medium text-gray-700">
                  Family History of Dementia
                </label>
                <input
                  type="text"
                  name="familyHistory"
                  id="familyHistory"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                  placeholder="List family members with dementia and age of onset"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Test Type
                </label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {testTypes.map((test) => (
                    <div
                      key={test.title}
                      onClick={() => setSelectedTestType(test.title)}
                      className={classNames(
                        'relative rounded-lg border p-6 cursor-pointer transition-all duration-200',
                        selectedTestType === test.title 
                          ? 'border-blue-500 bg-blue-50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <div>
                        <span
                          className={classNames(
                            test.iconBackground,
                            test.iconForeground,
                            'inline-flex rounded-lg p-3 ring-4 ring-white',
                          )}
                        >
                          <test.icon aria-hidden="true" className="size-6" />
                        </span>
                      </div>
                      <div className="mt-8">
                        <h3 className="text-base font-semibold text-gray-900">
                          {test.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {test.description}
                        </p>
                      </div>
                      {selectedTestType === test.title && (
                        <div className="absolute top-4 right-4">
                          <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={!selectedTestType}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 