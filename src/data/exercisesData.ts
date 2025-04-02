
export interface Exercise {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  sets?: string;
  reps?: string;
  targetAreas: string[];
  riskLevel: "low" | "moderate" | "high";
}

export const exercisesData: Exercise[] = [
  {
    id: "lateral-band-walk",
    title: "Lateral Band Walks",
    description: "Strengthens hip abductors to improve knee alignment during movement",
    imageUrl: "https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?q=80&w=500",
    sets: "3",
    reps: "10-12 each side",
    targetAreas: ["hip", "glutes"],
    riskLevel: "moderate"
  },
  {
    id: "single-leg-rdl",
    title: "Single-Leg Romanian Deadlift",
    description: "Improves hamstring strength and single-leg stability",
    imageUrl: "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=500",
    sets: "3",
    reps: "8-10 each leg",
    targetAreas: ["hamstrings", "glutes", "core"],
    riskLevel: "high"
  },
  {
    id: "wall-sits",
    title: "Wall Sits",
    description: "Builds quadricep endurance and improves knee stability",
    imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=500",
    sets: "3",
    reps: "30-45 seconds",
    targetAreas: ["quadriceps", "knees"],
    riskLevel: "low"
  },
  {
    id: "single-leg-balance",
    title: "Single-Leg Balance",
    description: "Improves proprioception and ankle stability",
    imageUrl: "https://images.unsplash.com/photo-1434682772747-f16d3ea162c3?q=80&w=500",
    sets: "2",
    reps: "30 seconds each leg",
    targetAreas: ["ankle", "core"],
    riskLevel: "low"
  },
  {
    id: "hip-bridge",
    title: "Hip Bridge",
    description: "Activates glutes and hamstrings to support proper knee alignment",
    imageUrl: "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=500",
    sets: "3",
    reps: "12-15",
    targetAreas: ["glutes", "hamstrings"],
    riskLevel: "moderate"
  },
  {
    id: "jump-landing",
    title: "Controlled Jump Landings",
    description: "Practices proper landing mechanics to reduce ACL stress",
    imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=500",
    sets: "3",
    reps: "8-10",
    targetAreas: ["knees", "neuromuscular control"],
    riskLevel: "high"
  }
];

export const getExercisesByRiskLevel = (riskLevel: "low" | "moderate" | "high"): Exercise[] => {
  return exercisesData.filter(exercise => exercise.riskLevel === riskLevel);
};

export const getRecommendedExercises = (riskScore: number): Exercise[] => {
  let riskLevel: "low" | "moderate" | "high" = "low";
  
  if (riskScore < 30) {
    riskLevel = "low";
  } else if (riskScore < 70) {
    riskLevel = "moderate";
  } else {
    riskLevel = "high";
  }
  
  // Get exercises for the current risk level and one level below if applicable
  const exercises = getExercisesByRiskLevel(riskLevel);
  
  if (riskLevel === "moderate") {
    exercises.push(...getExercisesByRiskLevel("low").slice(0, 2));
  } else if (riskLevel === "high") {
    exercises.push(...getExercisesByRiskLevel("moderate").slice(0, 2));
  }
  
  return exercises;
};
