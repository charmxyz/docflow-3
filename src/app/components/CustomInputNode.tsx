import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

interface CustomInputNodeProps {
  data: {
    label: string;
  };
}

const CustomInputNode = ({ data }: CustomInputNodeProps) => {
  const [age, setAge] = useState('');
  const [cognitiveResult, setCognitiveResult] = useState('');
  const isFamilyHistory = data.label === 'Family History';

  return (
    <div className={`react-flow__node ${isFamilyHistory ? 'w-[344px]' : ''}`}>
      <Handle 
        type="target" 
        position={Position.Top} 
        className={isFamilyHistory ? 'left-1/2 transform -translate-x-1/2' : ''}
      />
      <div className="flex flex-col">
        <div>{data.label}</div>
        {data.label === 'Age' && (
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-2 p-1 border border-gray-300 rounded text-sm text-center placeholder-[#E5E5E5] placeholder:text-xs"
            placeholder="Enter age"
          />
        )}
        {data.label === 'Cognitive Test Result' && (
          <input
            type="text"
            value={cognitiveResult}
            onChange={(e) => setCognitiveResult(e.target.value)}
            className="mt-2 p-1 border border-gray-300 rounded text-sm text-center placeholder-[#E5E5E5] placeholder:text-xs"
            placeholder="Enter result"
          />
        )}
        {isFamilyHistory && (
          <div className="mt-2 text-xs text-gray-400 text-left">
            My late grandmother started becoming forgetful around her early 70s—she would misplace things, repeat herself, and later had trouble recognizing close relatives. She was never formally diagnosed but we always suspected dementia. One of my uncles on my father's side also had similar issues and eventually needed full-time care in a nursing home.
          </div>
        )}
      </div>
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className={isFamilyHistory ? 'left-1/2 transform -translate-x-1/2' : ''}
      />
    </div>
  );
};

export default CustomInputNode; 