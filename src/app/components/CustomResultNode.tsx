import React from "react";
import { Handle, Position } from "@xyflow/react";

interface CustomResultNodeProps {
  data: {
    label: string;
    details: string;
  };
}

const CustomResultNode = ({ data }: CustomResultNodeProps) => {
  return (
    <div className="react-flow__node" style={{ width: "143.1px" }}>
      <Handle type="target" position={Position.Top} />
      <div className="flex flex-col">
        <div>{data.label}</div>
        <div className="mt-2 text-xs text-gray-400">{data.details}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomResultNode; 