"use client";

import React, { useCallback, useState, useEffect } from "react";
import {
  Background,
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Controls,
  Position,
  MarkerType,
  NodeTypes,
  NodeProps,
  EdgeProps,
  Connection
} from "@xyflow/react";
import dagre from "@dagrejs/dagre";
import Image from "next/image";
import { PlayIcon } from "@heroicons/react/24/solid";
import { Patient } from "../data/patients";
import { Node as XYFlowNode, Edge as XYFlowEdge } from '@xyflow/react';

import "@xyflow/react/dist/style.css";

import { initialNodes, initialEdges } from "./initialElements";
import CustomInputNode from "./CustomInputNode";
import CustomResultNode from "./CustomResultNode";
import BiomarkerNode from "./BiomarkerNode";
import { AnimatedSVGEdge } from "./AnimatedSVGEdge";

// Initialize dagre graph
const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

interface CustomNodeData {
  label: string;
  initialValue?: string;
  details?: string;
  positivePercentage?: number;
  negativePercentage?: number;
  [key: string]: any;
}

interface CustomEdgeData {
  animated?: boolean;
}

type CustomNode = Node<CustomNodeData> & { type: string };
type CustomEdge = Edge<CustomEdgeData> & { type: string };

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

const getLayoutedElements = (nodes: CustomNode[], edges: CustomEdge[], direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  // Clear the graph
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Add nodes to the graph
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 150, height: 50 });
  });

  // Add edges to the graph
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Apply layout
  dagre.layout(dagreGraph);

  // Get the layout results
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 75,
        y: nodeWithPosition.y - 25
      }
    };
  });

  return { nodes: layoutedNodes, edges };
};

const updateNodesWithPatientData = (nodes: CustomNode[], patient: Patient | null): CustomNode[] => {
  return nodes.map(node => {
    if (node.id === "age") {
      return {
        ...node,
        data: {
          ...node.data,
          initialValue: patient ? patient.age.toString() : ""
        }
      };
    }
    if (node.id === "cognitive") {
      return {
        ...node,
        data: {
          ...node.data,
          initialValue: patient ? patient.cognitiveTestResult : ""
        }
      };
    }
    if (node.id === "family") {
      return {
        ...node,
        data: {
          ...node.data,
          initialValue: patient ? patient.familyHistory : ""
        }
      };
    }
    if (node.id === "output") {
      return {
        ...node,
        data: {
          ...node.data,
          label: patient ? `Patient name: ${patient.name}` : "Patient name: David Anderson"
        }
      };
    }
    return node;
  });
};

export default function Flow({ patient }: { patient: Patient | null }) {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<CustomEdge[]>(initialEdges);
  const [layoutDirection, setLayoutDirection] = useState("TB");
  const [isCalculating, setIsCalculating] = useState(false);
  const [showBiomarkers, setShowBiomarkers] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showNoAction, setShowNoAction] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isFlowReady, setIsFlowReady] = useState(false);

  // Initialize nodes and edges with patient data
  useEffect(() => {
    const updatedNodes = updateNodesWithPatientData(initialNodes, patient);
    const layoutedElements = getLayoutedElements(updatedNodes, initialEdges, layoutDirection);
    
    // Initially hide result and biomarker nodes
    const initialHiddenNodes = layoutedElements.nodes.map(node => {
      if (node.id === "result" || node.id === "noAction" || node.id.startsWith("biomarker")) {
        return { ...node, hidden: true };
      }
      return node;
    });

    // Initially hide edges connected to hidden nodes
    const initialHiddenEdges = layoutedElements.edges.map(edge => {
      if (
        edge.source === "result" || 
        edge.target === "result" || 
        edge.source === "noAction" || 
        edge.target === "noAction" || 
        edge.source.startsWith("biomarker") || 
        edge.target.startsWith("biomarker")
      ) {
        return { ...edge, hidden: true };
      }
      return edge;
    });

    setNodes(initialHiddenNodes);
    setEdges(initialHiddenEdges);
    setIsFlowReady(true);
  }, [patient, layoutDirection]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
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

  const handleCalculate = useCallback(() => {
    if (isCalculating) return;
    
    setIsCalculating(true);
    setAnimationStep(1);
    
    // Step 1: Animate edges from input nodes to patient name
    updateEdgeTypes(["e1", "e2", "e3"], "animated");
    
    // Step 2: After 4 seconds, show result node and animate edge to it
    setTimeout(() => {
      setAnimationStep(2);
      showNodes(["result"]);
      showEdges(["e4"]);
      updateEdgeTypes(["e4"], "animated");
      
      // Step 3: After 2 seconds, show all biomarker nodes
      setTimeout(() => {
        setAnimationStep(3);
        showNodes(["noAction", "biomarker1", "biomarker2", "biomarker3", "biomarker4", "biomarker5", "biomarker6"]);
        showEdges(["e5", "e6", "e7", "e8", "e9", "e10", "e11"]);
        
        // Animate edge to Plasma pTau217
        updateEdgeTypes(["e6"], "animated");
        
        // Reset animation state after completion
        setTimeout(() => {
          setIsCalculating(false);
          setAnimationStep(0);
        }, 2000);
      }, 2000);
    }, 4000);
  }, [isCalculating, updateEdgeTypes, showNodes, showEdges]);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
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
            className={`flex items-center gap-2 px-4 py-2 ${isCalculating ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white rounded shadow transition-colors`}
          >
            <PlayIcon className="h-5 w-5" />
            <span>{isCalculating ? "Calculating..." : "Calculate"}</span>
          </button>
        </Panel>
        <Panel position="bottom-left">
          <div className="flex gap-2">
            <button 
              onClick={() => onLayout("TB")}
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
              onClick={() => onLayout("LR")}
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
      </ReactFlow>
    </div>
  );
} 