"use client";

import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useState } from "react";
import { patients, Patient } from "../data/patients";
import Flow from "../components/Flow";
import "../styles/xy-theme.css";

export default function DoctorDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const patientsPerPage = 5;
  
  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);
  
  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // Handle patient selection
  const handlePatientSelection = (email: string) => {
    if (selectedPatient === email) {
      setSelectedPatient(null);
    } else {
      setSelectedPatient(email);
    }
  };

  return (
    <div className="space-y-6">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Patients</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all your patients including their cognitive test results, age, and status.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Add patient
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mt-4">
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Cognitive Test Result
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Age
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Last Updated
                    </th>
                    <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                      <span className="sr-only">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {currentPatients.map((patient) => (
                    <tr 
                      key={patient.email}
                      className={`${
                        selectedPatient === patient.email 
                          ? "bg-blue-50 rounded-lg shadow-sm" 
                          : ""
                      }`}
                    >
                      <td className={`py-5 pr-3 pl-6 text-sm whitespace-nowrap sm:pl-6 ${
                        selectedPatient === patient.email ? "rounded-l-lg" : ""
                      }`}>
                        <div className="flex items-center">
                          <div className="size-11 shrink-0">
                            <img alt="" src={patient.image} className="size-11 rounded-full" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{patient.name}</div>
                            <div className="mt-1 text-gray-500">{patient.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-sm whitespace-nowrap text-gray-500">
                        <div className="text-gray-900">{patient.cognitiveTestResult}</div>
                        <div className="mt-1 text-gray-500">{patient.testType}</div>
                      </td>
                      <td className="px-4 py-5 text-sm whitespace-nowrap text-gray-500">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          patient.status === 'good' 
                            ? 'bg-green-50 text-green-700 ring-green-600/20' 
                            : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
                        }`}>
                          {patient.status === 'good' ? 'Good' : 'Warning'}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-sm whitespace-nowrap text-gray-500">{patient.age}</td>
                      <td className="px-4 py-5 text-sm whitespace-nowrap text-gray-500">{patient.lastUpdated}</td>
                      <td className={`relative py-5 pr-6 pl-3 text-right text-sm whitespace-nowrap sm:pr-6 ${
                        selectedPatient === patient.email ? "rounded-r-lg" : ""
                      }`}>
                        <button 
                          onClick={() => handlePatientSelection(patient.email)}
                          className={`${
                            selectedPatient === patient.email 
                              ? "text-blue-600 hover:text-blue-900" 
                              : "text-blue-600 hover:text-blue-900"
                          }`}
                        >
                          {selectedPatient === patient.email ? "Unselect" : "Calculate Risk"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{indexOfFirstPatient + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastPatient, filteredPatients.length)}
                </span>{' '}
                of <span className="font-medium">{filteredPatients.length}</span> results
              </p>
            </div>
            <div>
              <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon aria-hidden="true" className="size-5" />
                </button>
                
                {getPageNumbers().map((number) => (
                  <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      currentPage === number
                        ? 'z-10 bg-blue-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    }`}
                  >
                    {number}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon aria-hidden="true" className="size-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-5">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Dementia Risk Assessment Tool</h3>
          <div className="mt-5" style={{ height: "600px" }}>
            <Flow />
          </div>
        </div>
      </div>
    </div>
  );
} 