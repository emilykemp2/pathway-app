
export interface Test {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  instructions: string[];
  demoVideoUrl: string;
  jointMarkers: {
    hip: { x: number; y: number };
    knee: { x: number; y: number };
    ankle: { x: number; y: number };
  };
}

export const testsData: Test[] = [
  {
    id: "drop-jump",
    title: "Drop Jump Test",
    description: "Evaluates landing mechanics and neuromuscular control",
    imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=500",
    duration: "2-3 min",
    instructions: [
      "Stand on a box approximately 30cm high",
      "Drop off the box and immediately jump as high as possible upon landing",
      "Land softly with knees aligned over toes",
      "Perform the test 3 times",
      "Ensure you can see your entire body in the frame"
    ],
    demoVideoUrl: "https://example.com/demo-drop-jump",
    jointMarkers: {
      hip: { x: 50, y: 40 },
      knee: { x: 50, y: 60 },
      ankle: { x: 50, y: 80 }
    }
  },
  {
    id: "single-leg-squat",
    title: "Single-Leg Squat",
    description: "Assesses stability and alignment during single-leg loading",
    imageUrl: "https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?q=80&w=500",
    duration: "3-4 min",
    instructions: [
      "Stand on one leg with your hands on your hips",
      "Squat down to approximately 60 degrees of knee flexion",
      "Return to the starting position",
      "Perform 5 repetitions on each leg",
      "Ensure your knee does not collapse inward"
    ],
    demoVideoUrl: "https://example.com/demo-single-leg-squat",
    jointMarkers: {
      hip: { x: 50, y: 40 },
      knee: { x: 50, y: 60 },
      ankle: { x: 50, y: 80 }
    }
  },
  {
    id: "single-leg-hop",
    title: "Single-Leg Hop",
    description: "Evaluates power and landing control on a single leg",
    imageUrl: "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=500",
    duration: "3-4 min",
    instructions: [
      "Stand on one leg with your hands on your hips",
      "Hop forward as far as possible and land on the same leg",
      "Hold the landing position for 2-3 seconds",
      "Perform 3 hops on each leg",
      "Focus on soft landings with good knee alignment"
    ],
    demoVideoUrl: "https://example.com/demo-single-leg-hop",
    jointMarkers: {
      hip: { x: 50, y: 40 },
      knee: { x: 50, y: 60 },
      ankle: { x: 50, y: 80 }
    }
  }
];

export const getTestById = (id: string): Test | undefined => {
  return testsData.find(test => test.id === id);
};
