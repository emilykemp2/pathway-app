
export interface Athlete {
  id: string;
  name: string;
  sport: string;
  age: number;
  height: string;
  weight: string;
  lastAssessment: string;
  riskScore: number;
}

export const athletesData: Athlete[] = [
  { 
    id: "1", 
    name: "Alex Johnson", 
    sport: "Basketball",
    age: 19, 
    height: "6'2\"",
    weight: "185 lbs",
    lastAssessment: "May 15, 2023", 
    riskScore: 72 
  },
  { 
    id: "2", 
    name: "Taylor Smith", 
    sport: "Soccer",
    age: 21, 
    height: "5'8\"",
    weight: "150 lbs", 
    lastAssessment: "June 2, 2023", 
    riskScore: 45 
  },
  { 
    id: "3", 
    name: "Jordan Williams", 
    sport: "Football",
    age: 20, 
    height: "6'0\"",
    weight: "195 lbs", 
    lastAssessment: "May 28, 2023", 
    riskScore: 58 
  },
  { 
    id: "4", 
    name: "Casey Brown", 
    sport: "Volleyball",
    age: 22, 
    height: "5'11\"",
    weight: "165 lbs", 
    lastAssessment: "June 10, 2023", 
    riskScore: 23 
  },
];

export const getAthleteById = (id: string): Athlete | undefined => {
  return athletesData.find(athlete => athlete.id === id);
};
