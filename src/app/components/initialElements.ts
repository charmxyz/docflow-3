import { Position } from '@xyflow/react';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

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
    id: 'age',
    type: 'customInput',
    data: { label: 'Age' },
    position,
  },
  {
    id: 'cognitive',
    type: 'customInput',
    data: { label: 'Cognitive Test Result' },
    position,
  },
  {
    id: 'family',
    type: 'customInput',
    data: { label: 'Family History' },
    position,
  },
  {
    id: 'output',
    type: 'default',
    data: { label: 'Patient name: John' },
    position,
  },
  {
    id: 'result',
    type: 'customResult',
    data: { 
      label: 'Result',
      details: `Dementia Estimation: ${dementiaEst}%`
    },
    position,
  },
  {
    id: 'noAction',
    type: 'default',
    data: { label: 'No Action Needed' },
    position,
  },
  {
    id: 'biomarker1',
    type: 'biomarker',
    data: { 
      label: 'Plasma pTau217',
      positivePercentage: pTauPercentages.positivePercentage,
      negativePercentage: pTauPercentages.negativePercentage
    },
    position,
  },
  {
    id: 'biomarker2',
    type: 'biomarker',
    data: { 
      label: 'Neurofilament Light',
      positivePercentage: nflPercentages.positivePercentage,
      negativePercentage: nflPercentages.negativePercentage
    },
    position,
  },
  {
    id: 'biomarker3',
    type: 'biomarker',
    data: { 
      label: 'CSF AB 42:40 ratio',
      positivePercentage: csfPercentages.positivePercentage,
      negativePercentage: csfPercentages.negativePercentage
    },
    position,
  },
  {
    id: 'biomarker4',
    type: 'biomarker',
    data: { 
      label: 'MRI Scan',
      positivePercentage: mriPercentages.positivePercentage,
      negativePercentage: mriPercentages.negativePercentage
    },
    position,
  },
  {
    id: 'biomarker5',
    type: 'biomarker',
    data: { 
      label: 'Amyloid PET',
      positivePercentage: amyloidPercentages.positivePercentage,
      negativePercentage: amyloidPercentages.negativePercentage
    },
    position,
  },
  {
    id: 'biomarker6',
    type: 'biomarker',
    data: { 
      label: 'Plasma GFAP',
      positivePercentage: gfapPercentages.positivePercentage,
      negativePercentage: gfapPercentages.negativePercentage
    },
    position,
  },
];

export const initialEdges = [
  { id: 'e1', source: 'age', target: 'output', type: edgeType, animated: true },
  { id: 'e2', source: 'cognitive', target: 'output', type: edgeType, animated: true },
  { id: 'e3', source: 'family', target: 'output', type: edgeType, animated: true },
  { id: 'e4', source: 'output', target: 'result', type: edgeType, animated: true },
  { id: 'e5', source: 'result', target: 'noAction', type: edgeType, animated: true },
  { id: 'e6', source: 'result', target: 'biomarker1', type: edgeType, animated: true },
  { id: 'e7', source: 'result', target: 'biomarker2', type: edgeType, animated: true },
  { id: 'e8', source: 'result', target: 'biomarker3', type: edgeType, animated: true },
  { id: 'e9', source: 'result', target: 'biomarker4', type: edgeType, animated: true },
  { id: 'e10', source: 'result', target: 'biomarker5', type: edgeType, animated: true },
  { id: 'e11', source: 'result', target: 'biomarker6', type: edgeType, animated: true },
]; 