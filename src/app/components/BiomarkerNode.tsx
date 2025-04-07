import React from "react";
import { Handle, Position } from "@xyflow/react";

interface BiomarkerNodeProps {
  data: {
    label: string;
    positivePercentage: number;
    negativePercentage: number;
  };
}

const BiomarkerNode = ({ data }: BiomarkerNodeProps) => {
  return (
    <div className="react-flow__node" style={{ width: "143.1px" }}>
      <Handle type="target" position={Position.Top} />
      <div className="flex flex-col">
        <div className="font-medium">{data.label}</div>
        <div className="mt-1 text-xs">
          <div className="text-gray-400">If positive: {data.positivePercentage}%</div>
          <div className="text-gray-400">If negative: {data.negativePercentage}%</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default BiomarkerNode; 