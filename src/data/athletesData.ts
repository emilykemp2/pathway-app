
export interface Athlete {
  id: string;
  name: string;
  sport: string;
  age: number;
  height: string;
  weight: string;
  lastAssessment: string;
  riskScore: number;
  leftKneeDegrees: number;
  rightKneeDegrees: number;
}

export const athletesData: Athlete[] = [
  { 
    id: "1", 
    name: "Alex Johnson", 
    sport: "Men's Basketball",
    age: 19, 
    height: "6'2\"",
    weight: "185 lbs",
    lastAssessment: "May 15, 2023", 
    riskScore: 72,
    leftKneeDegrees: 4,
    rightKneeDegrees: 10
  },
  { 
    id: "2", 
    name: "Taylor Smith", 
    sport: "Women's Soccer",
    age: 21, 
    height: "5'8\"",
    weight: "150 lbs", 
    lastAssessment: "June 2, 2023", 
    riskScore: 47,
    leftKneeDegrees: 6,
    rightKneeDegrees: 10
  },
  { 
    id: "3", 
    name: "Jordan Williams", 
    sport: "Football",
    age: 20, 
    height: "6'0\"",
    weight: "195 lbs", 
    lastAssessment: "May 28, 2023", 
    riskScore: 58,
    leftKneeDegrees: 5,
    rightKneeDegrees: 3
  },
  { 
    id: "4", 
    name: "Casey Brown", 
    sport: "Volleyball",
    age: 22, 
    height: "5'11\"",
    weight: "165 lbs", 
    lastAssessment: "June 10, 2023", 
    riskScore: 23,
    leftKneeDegrees: 1,
    rightKneeDegrees: 2
  },
  { 
    id: "5", 
    name: "Macy Brown", 
    sport: "Women's Basketball",
    age: 22, 
    height: "5'11\"",
    weight: "165 lbs", 
    lastAssessment: "June 11, 2023", 
    riskScore: 13,
    leftKneeDegrees: 1,
    rightKneeDegrees: 1
  },
  { 
    id: "6", 
    name: "Sydney Smith", 
    sport: "Women's Soccer",
    age: 22, 
    height: "5'11\"",
    weight: "165 lbs", 
    lastAssessment: "June 11, 2023", 
    riskScore: 10,
    leftKneeDegrees: 1,
    rightKneeDegrees: 1
  },
  {
    id: "7",
    name: "Jamie Lee",
    sport: "Women's Lacrosse",
    age: 20,
    height: "5'6\"",
    weight: "130 lbs",
    lastAssessment: "July 1, 2023",
    riskScore: 59,
    leftKneeDegrees: 8,
    rightKneeDegrees: 9
  },
  {
    id: "8",
    name: "Morgan Carter",
    sport: "Women's Soccer",
    age: 18,
    height: "5'7\"",
    weight: "140 lbs",
    lastAssessment: "August 3, 2023",
    riskScore: 65,
    leftKneeDegrees: 7,
    rightKneeDegrees: 11
  },
  {
    id: "9",
    name: "Chris Nguyen",
    sport: "Football",
    age: 21,
    height: "6'1\"",
    weight: "190 lbs",
    lastAssessment: "August 5, 2023",
    riskScore: 53,
    leftKneeDegrees: 6,
    rightKneeDegrees: 7
  },
  {
    id: "10",
    name: "Jordan Patel",
    sport: "Men's Lacrosse",
    age: 20,
    height: "5'10\"",
    weight: "175 lbs",
    lastAssessment: "July 22, 2023",
    riskScore: 41,
    leftKneeDegrees: 9,
    rightKneeDegrees: 8
  },
  {
    id: "11",
    name: "Taylor Brooks",
    sport: "Football",
    age: 22,
    height: "5'11\"",
    weight: "185 lbs",
    lastAssessment: "August 10, 2023",
    riskScore: 87,
    leftKneeDegrees: 11,
    rightKneeDegrees: 13
  },
  {
    id: "12",
    name: "Drew Kim",
    sport: "Men's Basketball",
    age: 19,
    height: "6'3\"",
    weight: "200 lbs",
    lastAssessment: "September 1, 2023",
    riskScore: 29,
    leftKneeDegrees: 4,
    rightKneeDegrees: 7
  },
  {
    id: "13",
    name: "Avery Thompson",
    sport: "Women's Lacrosse",
    age: 21,
    height: "5'9\"",
    weight: "155 lbs",
    lastAssessment: "September 8, 2023",
    riskScore: 37,
    leftKneeDegrees: 6,
    rightKneeDegrees: 6
  },
  {
    id: "14",
    name: "Jesse Rivera",
    sport: "Men's Lacrosse",
    age: 20,
    height: "5'8\"",
    weight: "170 lbs",
    lastAssessment: "September 15, 2023",
    riskScore: 44,
    leftKneeDegrees: 5,
    rightKneeDegrees: 5
  },
  {
    id: "15",
    name: "Charlie Adams",
    sport: "Football",
    age: 23,
    height: "6'0\"",
    weight: "185 lbs",
    lastAssessment: "October 1, 2023",
    riskScore: 41,
    leftKneeDegrees: 1,
    rightKneeDegrees: 8
  },
  {
    id: "16",
    name: "Lena Garcia",
    sport: "Women's Soccer",
    age: 20,
    height: "5'6\"",
    weight: "135 lbs",
    lastAssessment: "October 12, 2023",
    riskScore: 68,
    leftKneeDegrees: 7,
    rightKneeDegrees: 8
  },
  {
    id: "17",
    name: "Zoe Martinez",
    sport: "Women's Soccer",
    age: 19,
    height: "5'5\"",
    weight: "125 lbs",
    lastAssessment: "October 18, 2023",
    riskScore: 30,
    leftKneeDegrees: 6,
    rightKneeDegrees: 9
  },
  {
    id: "18",
    name: "Nia Robinson",
    sport: "Women's Soccer",
    age: 21,
    height: "5'7\"",
    weight: "140 lbs",
    lastAssessment: "October 25, 2023",
    riskScore: 64,
    leftKneeDegrees: 12,
    rightKneeDegrees: 13
  },
  {
    id: "19",
    name: "Harper Lin",
    sport: "Women's Soccer",
    age: 22,
    height: "5'4\"",
    weight: "130 lbs",
    lastAssessment: "November 1, 2023",
    riskScore: 15,
    leftKneeDegrees: 3,
    rightKneeDegrees: 2
  },
  {
    id: "20",
    name: "Aaliyah Thompson",
    sport: "Women's Soccer",
    age: 20,
    height: "5'8\"",
    weight: "145 lbs",
    lastAssessment: "November 5, 2023",
    riskScore: 55,
    leftKneeDegrees: 11,
    rightKneeDegrees: 14
  },
  {
    id: "21",
    name: "Jasmine Okoro",
    sport: "Women's Soccer",
    age: 23,
    height: "5'9\"",
    weight: "150 lbs",
    lastAssessment: "November 10, 2023",
    riskScore: 38,
    leftKneeDegrees: 8,
    rightKneeDegrees: 6
  },
  {
    id: "22",
    name: "Emilia Park",
    sport: "Women's Basketball",
    age: 20,
    height: "5'10\"",
    weight: "160 lbs",
    lastAssessment: "November 12, 2023",
    riskScore: 42,
    leftKneeDegrees: 9,
    rightKneeDegrees: 10
  }
];

export const getAthleteById = (id: string): Athlete | undefined => {
  return athletesData.find(athlete => athlete.id === id);
};
