
export interface Assessment {
  id: string;
  testId: string;
  testName: string;
  date: string;
  riskScore: number;
  videoUrl: string;
  findings: {
    title: string;
    description: string;
    severity: "low" | "moderate" | "high";
  }[];
  jointData: {
    hip: { x: number; y: number };
    knee: { x: number; y: number };
    ankle: { x: number; y: number };
    kneeValgusAngle: number;
  };
}

export const assessmentHistory: Assessment[] = [
  {
    id: "a1",
    testId: "drop-jump",
    testName: "Drop Jump Test",
    date: "May 12, 2023",
    riskScore: 72,
    videoUrl: "https://example.com/assessment-a1",
    findings: [
      {
        title: "Knee Valgus",
        description: "Significant inward knee movement during landing",
        severity: "high"
      },
      {
        title: "Landing Mechanics",
        description: "Stiff landing with minimal hip/knee flexion",
        severity: "moderate"
      }
    ],
    jointData: {
      hip: { x: 50, y: 40 },
      knee: { x: 42, y: 60 },
      ankle: { x: 48, y: 80 },
      kneeValgusAngle: 15
    }
  },
  {
    id: "a2",
    testId: "single-leg-squat",
    testName: "Single-Leg Squat",
    date: "May 18, 2023",
    riskScore: 45,
    videoUrl: "https://example.com/assessment-a2",
    findings: [
      {
        title: "Hip Drop",
        description: "Moderate hip drop on the non-weight bearing side",
        severity: "moderate"
      },
      {
        title: "Trunk Lean",
        description: "Excessive forward trunk lean during descent",
        severity: "low"
      }
    ],
    jointData: {
      hip: { x: 52, y: 40 },
      knee: { x: 46, y: 60 },
      ankle: { x: 48, y: 80 },
      kneeValgusAngle: 8
    }
  },
  {
    id: "a3",
    testId: "drop-jump",
    testName: "Drop Jump Test",
    date: "June 10, 2023",
    riskScore: 58,
    videoUrl: "https://example.com/assessment-a3",
    findings: [
      {
        title: "Knee Valgus",
        description: "Moderate inward knee movement during landing",
        severity: "moderate"
      },
      {
        title: "Asymmetrical Loading",
        description: "Uneven weight distribution during landing",
        severity: "moderate"
      }
    ],
    jointData: {
      hip: { x: 51, y: 40 },
      knee: { x: 45, y: 60 },
      ankle: { x: 48, y: 80 },
      kneeValgusAngle: 10
    }
  },
  {
    id: "a4",
    testId: "single-leg-hop",
    testName: "Single-Leg Hop",
    date: "June 22, 2023",
    riskScore: 25,
    videoUrl: "https://example.com/assessment-a4",
    findings: [
      {
        title: "Ankle Stability",
        description: "Good ankle stability during landing",
        severity: "low"
      },
      {
        title: "Knee Alignment",
        description: "Proper knee alignment maintained throughout movement",
        severity: "low"
      }
    ],
    jointData: {
      hip: { x: 50, y: 40 },
      knee: { x: 49, y: 60 },
      ankle: { x: 48, y: 80 },
      kneeValgusAngle: 3
    }
  }
];

export const getAssessmentById = (id: string): Assessment | undefined => {
  return assessmentHistory.find(assessment => assessment.id === id);
};

export const getLatestAssessment = (): Assessment => {
  return assessmentHistory[0];
};

export const getAssessmentsByTest = (testId: string): Assessment[] => {
  return assessmentHistory.filter(assessment => assessment.testId === testId);
};
