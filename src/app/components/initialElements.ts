import { Position } from "@xyflow/react";

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

// Dementia estimation value (hardcoded for now)
const dementiaEst = 50;

// Calculate positive and negative percentages based on likelihood ratios
const calculatePercentages = (positiveLikelihood: number, negativeLikelihood: number, baseEstimation: number) => {
  // Convert base probability to odds
  const baseOdds = baseEstimation / (100 - baseEstimation);
  
  // Calculate odds after positive test
  const positiveOdds = baseOdds * positiveLikelihood;
  
  // Calculate odds after negative test
  const negativeOdds = baseOdds * negativeLikelihood;
  
  // Convert odds back to probabilities
  const positivePercentage = Math.round((positiveOdds / (1 + positiveOdds)) * 100);
  const negativePercentage = Math.round((negativeOdds / (1 + negativeOdds)) * 100);
  
  return {
    positivePercentage: Math.min(100, Math.max(0, positivePercentage)),
    negativePercentage: Math.min(100, Math.max(0, negativePercentage))
  };
};

// Calculate percentages for each biomarker
const pTauPercentages = calculatePercentages(9.8, 0.11, dementiaEst);
const csfPercentages = calculatePercentages(10.3, 0.06, dementiaEst);
const nflPercentages = calculatePercentages(3.8, 0.21, dementiaEst);
const gfapPercentages = calculatePercentages(4.2, 0.14, dementiaEst);
const mriPercentages = calculatePercentages(9.9, 0.4, dementiaEst);
const amyloidPercentages = calculatePercentages(12, 0.15, dementiaEst);

export const initialNodes = [
  {
    id: "age",
    type: "customInput",
    position: { x: 100, y: 100 },
    data: { label: "Age" },
  },
  {
    id: "cognitive",
    type: "customInput",
    position: { x: 100, y: 200 },
    data: { label: "Cognitive Test Result" },
  },
  {
    id: "family",
    type: "customInput",
    position: { x: 100, y: 300 },
    data: { label: "Family History" },
  },
  {
    id: "output",
    type: "default",
    position: { x: 400, y: 200 },
    data: { label: "Patient name: John" },
  },
  {
    id: "result",
    type: "customResult",
    position: { x: 700, y: 200 },
    data: {
      label: "Result",
    },
  },
  {
    id: "noAction",
    type: "default",
    position: { x: 1000, y: 200 },
    data: { label: "No Action Needed" },
  },
  {
    id: "biomarker1",
    type: "biomarker",
    position: { x: 700, y: 100 },
    data: {
      label: "Plasma pTau217",
    },
  },
  {
    id: "biomarker2",
    type: "biomarker",
    position: { x: 700, y: 150 },
    data: {
      label: "Neurofilament Light",
    },
  },
  {
    id: "biomarker3",
    type: "biomarker",
    position: { x: 700, y: 200 },
    data: {
      label: "CSF AB 42:40 ratio",
    },
  },
  {
    id: "biomarker4",
    type: "biomarker",
    position: { x: 700, y: 250 },
    data: {
      label: "MRI Scan",
    },
  },
  {
    id: "biomarker5",
    type: "biomarker",
    position: { x: 700, y: 300 },
    data: {
      label: "Amyloid PET",
    },
  },
  {
    id: "biomarker6",
    type: "biomarker",
    position: { x: 700, y: 350 },
    data: {
      label: "Plasma GFAP",
    },
  },
];

export const initialEdges = [
  { id: "e1", source: "age", target: "output", type: edgeType, animated: true },
  { id: "e2", source: "cognitive", target: "output", type: edgeType, animated: true },
  { id: "e3", source: "family", target: "output", type: edgeType, animated: true },
  { id: "e4", source: "output", target: "result", type: edgeType, animated: true },
  { id: "e5", source: "result", target: "noAction", type: edgeType, animated: true },
  { id: "e6", source: "result", target: "biomarker1", type: edgeType, animated: true },
  { id: "e7", source: "result", target: "biomarker2", type: edgeType, animated: true },
  { id: "e8", source: "result", target: "biomarker3", type: edgeType, animated: true },
  { id: "e9", source: "result", target: "biomarker4", type: edgeType, animated: true },
  { id: "e10", source: "result", target: "biomarker5", type: edgeType, animated: true },
  { id: "e11", source: "result", target: "biomarker6", type: edgeType, animated: true },
]; 