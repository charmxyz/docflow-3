export interface Patient {
  name: string;
  email: string;
  cognitiveTestResult: string;
  testType: string;
  status: 'good' | 'warning';
  age: string;
  image: string;
  lastUpdated: string;
  familyHistory: string;
}

export const patients: Patient[] = [
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    cognitiveTestResult: '85/100',
    testType: 'ACE-III',
    status: 'good' as const,
    age: '72',
    image: 'https://avatar.iran.liara.run/public/2',
    lastUpdated: '2023-05-15',
    familyHistory: 'I do not have any family history of dementia. My parents lived into their 90s with good cognitive function, and my siblings are all healthy. I am the oldest in my family and have been fortunate to maintain good health so far.',
  },
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    cognitiveTestResult: '65/100',
    testType: 'MMSE',
    status: 'warning' as const,
    age: '68',
    image: 'https://avatar.iran.liara.run/public/67',
    lastUpdated: '2023-06-22',
    familyHistory: 'My mother was diagnosed with Alzheimers disease at the age of 75. She lived with the condition for about 8 years before passing away. Her sister also showed signs of cognitive decline in her late 70s. My father had no cognitive issues and lived to be 88.',
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    cognitiveTestResult: '92/100',
    testType: 'ACE-III',
    status: 'good' as const,
    age: '75',
    image: 'https://avatar.iran.liara.run/public/46',
    lastUpdated: '2023-04-10',
    familyHistory: 'My maternal grandmother had dementia in her 80s, but she lived a very long life and was 95 when she passed away. My mother is now 82 and shows no signs of cognitive decline. My fathers side of the family has no history of dementia.',
  },
  {
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    cognitiveTestResult: '58/100',
    testType: 'MMSE',
    status: 'warning' as const,
    age: '70',
    image: 'https://avatar.iran.liara.run/public/23',
    lastUpdated: '2023-07-05',
    familyHistory: 'Both of my parents had dementia. My father was diagnosed with vascular dementia at 72 and passed away at 78. My mother developed Alzheimers at 75 and lived with it for 7 years. My older brother is showing early signs of memory problems at 73.',
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    cognitiveTestResult: '78/100',
    testType: 'ACE-III',
    status: 'good' as const,
    age: '69',
    image: 'https://avatar.iran.liara.run/public/81',
    lastUpdated: '2023-03-18',
    familyHistory: 'I have no known family history of dementia. My parents both passed away in their 80s from other causes, and they maintained good cognitive function until the end. My siblings are all healthy, and I have no children to worry about inheriting any potential genetic risks.',
  },
  {
    name: 'Robert Wilson',
    email: 'robert.wilson@example.com',
    cognitiveTestResult: '82/100',
    testType: 'ACE-III',
    status: 'good' as const,
    age: '71',
    image: 'https://avatar.iran.liara.run/public/34',
    lastUpdated: '2023-05-30',
    familyHistory: 'My paternal grandfather had dementia in his late 80s, but he was a heavy smoker and drinker which may have contributed. My father is 90 and still sharp as a tack. My mother passed away at 85 from heart disease with no cognitive issues. My sister is 68 and healthy.',
  },
  {
    name: 'Patricia Martinez',
    email: 'patricia.martinez@example.com',
    cognitiveTestResult: '62/100',
    testType: 'MMSE',
    status: 'warning' as const,
    age: '73',
    image: 'https://avatar.iran.liara.run/public/59',
    lastUpdated: '2023-06-12',
    familyHistory: 'My mother had early-onset Alzheimers, diagnosed at just 58 years old. She passed away at 65. Her sister also developed dementia in her early 60s. My father had no cognitive issues and lived to be 82. I have two children in their 40s who are concerned about their risk.',
  },
  {
    name: 'David Anderson',
    email: 'david.anderson@example.com',
    cognitiveTestResult: '88/100',
    testType: 'ACE-III',
    status: 'good' as const,
    age: '67',
    image: 'https://avatar.iran.liara.run/public/12',
    lastUpdated: '2023-04-25',
    familyHistory: 'My maternal grandmother had dementia in her 80s, but she lived to be 92. My mother is 85 and has mild cognitive impairment that was diagnosed 2 years ago. My father passed away at 78 from cancer with no cognitive issues. My brother is 65 and healthy.',
  },
  {
    name: 'Jennifer Taylor',
    email: 'jennifer.taylor@example.com',
    cognitiveTestResult: '55/100',
    testType: 'MMSE',
    status: 'warning' as const,
    age: '74',
    image: 'https://avatar.iran.liara.run/public/78',
    lastUpdated: '2023-07-01',
    familyHistory: 'My father had dementia with Lewy bodies, diagnosed at 70. He had a rapid decline and passed away at 74. His brother also had dementia in his late 70s. My mother is 80 and healthy. I have three children who are concerned about their risk, especially my oldest who is 45.',
  },
  {
    name: 'Thomas Garcia',
    email: 'thomas.garcia@example.com',
    cognitiveTestResult: '90/100',
    testType: 'ACE-III',
    status: 'good' as const,
    age: '70',
    image: 'https://avatar.iran.liara.run/public/45',
    lastUpdated: '2023-05-08',
    familyHistory: 'I have no family history of dementia. My parents both lived into their 90s with good cognitive function. My father passed away at 92 from heart disease, and my mother is still alive at 88 with no cognitive issues. My siblings are all healthy, and I have no children.',
  },
].sort((a, b) => a.name.localeCompare(b.name)); 