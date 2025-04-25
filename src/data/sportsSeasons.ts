export interface SportSeason {
  sport: string;
  status: 'In Season' | 'Off-Season' | 'Pre-Season' | 'Post-Season';
  timeline: {
    preSeasonStart: number; // percentage position on timeline
    preSeasonEnd: number;
    inSeasonStart: number;
    inSeasonEnd: number;
    postSeasonStart: number;
    postSeasonEnd: number;
    offSeasonStart: number;
    offSeasonEnd: number;
  };
  assessments: {
    past: number[]; // percentage positions on timeline
    upcoming: number[];
  };
  currentPosition: number; // percentage position indicating "now"
}

export const sportsSeasonsData: SportSeason[] = [
  {
    sport: "Volleyball",
    status: "In Season",
    timeline: {
      preSeasonStart: 0,
      preSeasonEnd: 15,
      inSeasonStart: 15,
      inSeasonEnd: 60,
      postSeasonStart: 60,
      postSeasonEnd: 75,
      offSeasonStart: 75,
      offSeasonEnd: 100
    },
    assessments: {
      past: [18],
      upcoming: [45, 80]
    },
    currentPosition: 40
  },
  {
    sport: "Men's Basketball",
    status: "Off-Season",
    timeline: {
      preSeasonStart: 65,
      preSeasonEnd: 80,
      inSeasonStart: 80,
      inSeasonEnd: 100,
      postSeasonStart:0,
      postSeasonEnd: 30,
      offSeasonStart: 30,
      offSeasonEnd: 65
    },
    assessments: {
      past: [15],
      upcoming: [70, 90]
    },
    currentPosition: 45
  },
  {
    sport: "Women's Basketball",
    status: "Off-Season",
    timeline: {
      preSeasonStart: 65,
      preSeasonEnd: 80,
      inSeasonStart: 80,
      inSeasonEnd: 100,
      postSeasonStart: 0,
      postSeasonEnd: 20,
      offSeasonStart: 20,
      offSeasonEnd: 65
    },
    assessments: {
      past: [22],
      upcoming: [72, 85]
    },
    currentPosition: 45
  },
  {
    sport: "Women's Soccer",
    status: "Off-Season",
    timeline: {
      preSeasonStart: 50,
      preSeasonEnd: 65,
      inSeasonStart: 65,
      inSeasonEnd: 90,
      postSeasonStart: 90,
      postSeasonEnd: 100,
      offSeasonStart: 0,
      offSeasonEnd: 50
    },
    assessments: {
      past: [30],
      upcoming: [55, 75]
    },
    currentPosition: 35
  },
  {
    sport: "Women's Lacrosse",
    status: "Post-Season",
    timeline: {
      preSeasonStart: 80,
      preSeasonEnd: 100,
      inSeasonStart: 0,
      inSeasonEnd: 20,
      postSeasonStart: 20,
      postSeasonEnd: 35,
      offSeasonStart: 35,
      offSeasonEnd: 80
    },
    assessments: {
      past: [10],
      upcoming: [50, 80]
    },
    currentPosition: 25
  },
  {
    sport: "Football",
    status: "Pre-Season",
    timeline: {
      preSeasonStart: 0,
      preSeasonEnd: 35,
      inSeasonStart: 35,
      inSeasonEnd: 65,
      postSeasonStart: 65,
      postSeasonEnd: 75,
      offSeasonStart: 75,
      offSeasonEnd: 100
    },
    assessments: {
      past: [10],
      upcoming: [40, 70]
    },
    currentPosition: 30
  },
  {
    sport: "Men's Lacrosse",
    status: "In Season",
    timeline: {
      preSeasonStart: 70,
      preSeasonEnd:100,
      inSeasonStart: 0,
      inSeasonEnd: 20,
      postSeasonStart: 20,
      postSeasonEnd: 55,
      offSeasonStart: 55,
      offSeasonEnd: 70
    },
    assessments: {
      past: [5],
      upcoming: [15, 40]
    },
    currentPosition: 10
  }
]; 