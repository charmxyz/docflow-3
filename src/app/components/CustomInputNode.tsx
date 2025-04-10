import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

interface CustomInputNodeProps {
  data: {
    label: string;
    placeholder?: string;
    initialValue?: string;
  };
}

const CustomInputNode = ({ data }: CustomInputNodeProps) => {
  const [age, setAge] = useState(data.initialValue || '');
  const [cognitiveResult, setCognitiveResult] = useState(data.initialValue || '');
  const [familyHistory, setFamilyHistory] = useState(data.initialValue || '');
  const [patientName, setPatientName] = useState(data.initialValue || '');
  const isPatientName = data.label.startsWith('Patient name: David Anderson');

  return (
    <div className={`react-flow__node ${isPatientName ? 'w-[500px]' : ''}`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className={isPatientName ? 'left-1/2 transform -translate-x-1/2' : ''}
      />
      <div className="flex flex-col">
        <div>{data.label}</div>
        {data.label === 'Age' && (
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-2 p-1 border border-gray-300 rounded text-sm text-center placeholder-[#000000] placeholder:text-xs"
            placeholder={data.placeholder || "67"}
          />
        )}
        {data.label === 'Cognitive Test Result' && (
          <input
            type="text"
            value={cognitiveResult}
            onChange={(e) => setCognitiveResult(e.target.value)}
            className="mt-2 p-1 border border-gray-300 rounded text-sm text-center placeholder-[#000000] placeholder:text-xs"
            placeholder={data.placeholder || "88"}
          />
        )}
        {data.label === 'Family History' && (
          <input
            type="text"
            value={familyHistory}
            onChange={(e) => setFamilyHistory(e.target.value)}
            className="mt-2 p-1 border border-gray-300 rounded text-sm text-center placeholder-[#000000] placeholder:text-xs"
            placeholder={data.placeholder || "My maternal grandmother had dementia in her 80s, but she lived to be 92. My mother is 85 and has mild cognitive impairment that was diagnosed 2 years ago. My father passed away at 78 from cancer with no cognitive issues. My brother is 65 and healthy"}
          />
        )}
        {isPatientName && (
          <div className="mt-2 p-1 border border-gray-300 rounded text-sm text-center bg-white">
            {data.label.replace('Patient name: David Anderson', 'David Anderson')}
          </div>
        )}
      </div>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className={isPatientName ? 'left-1/2 transform -translate-x-1/2' : ''}
      />
    </div>
  );
};

export default CustomInputNode; 