'use client';

import React, { useCallback, useState, useEffect, useRef } from 'react';
import {
  Background,
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  Controls,
  MiniMap,
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import Image from 'next/image';
import { PlayIcon } from '@heroicons/react/24/solid';

import '@xyflow/react/dist/style.css';

import { initialNodes, initialEdges } from './initialElements';
import CustomInputNode from './CustomInputNode';
import CustomResultNode from './CustomResultNode';
import BiomarkerNode from './BiomarkerNode';
import { AnimatedSVGEdge } from './AnimatedSVGEdge';
import { calculateDementiaRisk } from './calculations';

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 108; // Increased height for input nodes

const nodeTypes = {
  customInput: CustomInputNode,
  customResult: CustomResultNode,
  biomarker: BiomarkerNode,
};

const edgeTypes = {
  animated: AnimatedSVGEdge,
};

// Function to hide nodes and edges
const hide = (hidden: boolean) => (nodeOrEdge: any) => {
  return {
    ...nodeOrEdge,
    hidden,
  };
};

const getLayoutedElements = (nodes: any[], edges: any[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    // Use double width for Family History node
    const width = node.data.label === 'Family History' ? nodeWidth * 2 : nodeWidth;
    dagreGraph.setNode(node.id, { width, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const width = node.data.label === 'Family History' ? nodeWidth * 2 : nodeWidth;
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: nodeWithPosition.x - width / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  // Log positions for each node
  console.log('Node Positions:');
  newNodes.forEach(node => {
    console.log(`${node.data.label}: x=${Math.round(node.position.x)}, y=${Math.round(node.position.y)}`);
  });

  return { nodes: newNodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
);

// Initially hide result and biomarker nodes
const initialHiddenNodes = layoutedNodes.map(node => {
  if (
    node.id === 'result' || 
    node.id === 'noAction' || 
    node.id.startsWith('biomarker')
  ) {
    return { ...node, hidden: true };
  }
  return node;
});

// Initially hide edges connected to hidden nodes
const initialHiddenEdges = layoutedEdges.map(edge => {
  if (
    edge.source === 'result' || 
    edge.target === 'result' || 
    edge.source === 'noAction' || 
    edge.target === 'noAction' || 
    edge.source.startsWith('biomarker') || 
    edge.target.startsWith('biomarker')
  ) {
    return { ...edge, hidden: true };
  }
  return edge;
});

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialHiddenNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialHiddenEdges);
  const [animationStep, setAnimationStep] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showBiomarkers, setShowBiomarkers] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showNoAction, setShowNoAction] = useState(false);
  const [resultText, setResultText] = useState("");
  const [noActionText, setNoActionText] = useState("");
  const flowWrapper = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onLayout = useCallback(
    (direction: string) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges],
  );

  // Function to update edge types for animation
  const updateEdgeTypes = useCallback((edgeIds: string[], type: string) => {
    setEdges((eds) => 
      eds.map((edge) => {
        if (edgeIds.includes(edge.id)) {
          return { ...edge, type };
        }
        return edge;
      })
    );
  }, []);

  // Function to show nodes
  const showNodes = useCallback((nodeIds: string[]) => {
    setNodes((nds) => 
      nds.map((node) => {
        if (nodeIds.includes(node.id)) {
          return { ...node, hidden: false };
        }
        return node;
      })
    );
  }, []);

  // Function to show edges
  const showEdges = useCallback((edgeIds: string[]) => {
    setEdges((eds) => 
      eds.map((edge) => {
        if (edgeIds.includes(edge.id)) {
          return { ...edge, hidden: false };
        }
        return edge;
      })
    );
  }, []);

  const handleCalculate = () => {
    setIsCalculating(true);
    setShowResult(false);
    setShowNoAction(false);

    // Get input values
    const ageNode = nodes.find((node) => node.id === "age");
    const cognitiveNode = nodes.find((node) => node.id === "cognitive");
    const familyNode = nodes.find((node) => node.id === "family");

    const age = ageNode?.data?.value ? parseInt(ageNode.data.value) : 0;
    const cognitiveScore = cognitiveNode?.data?.value
      ? parseFloat(cognitiveNode.data.value)
      : 0;
    const familyHistory = familyNode?.data?.value === "yes";

    // Calculate initial risk
    const initialRisk = calculateDementiaRisk(age, cognitiveScore, familyHistory);

    // Show biomarkers after a delay
    setTimeout(() => {
      setShowBiomarkers(true);
      setIsCalculating(false);

      // Show result after biomarkers are visible
      setTimeout(() => {
        setShowResult(true);
        setResultText(
          `Based on initial assessment, the patient's risk of dementia is ${initialRisk.toFixed(
            1
          )}%. Further biomarker testing is recommended.`
        );

        // Show no action node if risk is low
        if (initialRisk < 15) {
          setTimeout(() => {
            setShowNoAction(true);
            setNoActionText(
              "Current risk level is low. Regular monitoring recommended."
            );
          }, 1000);
        }
      }, 1000);
    }, 2000);
  };

  return (
    <div ref={flowWrapper} style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        style={{ backgroundColor: "#F7F9FB" }}
      >
        <Panel position="top-right">
          <button 
            onClick={handleCalculate}
            disabled={isCalculating}
            className={`flex items-center gap-2 px-4 py-2 ${isCalculating ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded shadow transition-colors`}
          >
            <PlayIcon className="h-5 w-5" />
            <span>{isCalculating ? 'Calculating...' : 'Calculate'}</span>
          </button>
        </Panel>
        <Panel position="bottom-left">
          <div className="flex gap-2">
            <button 
              onClick={() => onLayout('TB')}
              className="p-2 bg-white rounded shadow hover:bg-gray-50"
              title="Vertical Layout"
            >
              <Image
                src="/icons/ve.png"
                alt="Vertical Layout"
                width={24}
                height={24}
              />
            </button>
            <button 
              onClick={() => onLayout('LR')}
              className="p-2 bg-white rounded shadow hover:bg-gray-50"
              title="Horizontal Layout"
            >
              <Image
                src="/icons/horizontal.png"
                alt="Horizontal Layout"
                width={24}
                height={24}
              />
            </button>
          </div>
        </Panel>
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default Flow; 