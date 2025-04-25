import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

// Sample exercise recommendations for each day
const exerciseRecommendations = {
    Monday: "Nordic hamstring curls + plank variations - 15 min",
    Tuesday: "Romanian deadlifts + Pallof press core work",
    Wednesday: "Single-leg RDLs + side planks with reach-under",
    Thursday: "Active recovery with dynamic hamstring mobility & dead bugs",
    Friday: "Glute-ham raises + farmer’s carries for core and hip stability",
    Saturday: "Jump-landing mechanics + lunge matrix with core engagement",
    Sunday: "Recovery flow: light yoga + posterior chain stretching"
};

type DayProps = {
  name: string;
  recommendation: string;
  isToday: boolean;
};

const Day: React.FC<DayProps> = ({ name, recommendation, isToday }) => (
  <div className={`p-2 rounded-md ${isToday ? 'bg-sportBlue/10 border border-sportBlue/30' : ''}`}>
    <p className={`text-sm font-medium ${isToday ? 'text-sportBlue' : ''}`}>{name}</p>
    <p className="text-xs text-gray-600 mt-1">{recommendation}</p>
  </div>
);

const WeeklyCalendar: React.FC = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const today = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
  // Convert to our array index (where Monday is 0)
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <Calendar className="text-sportBlue mr-2" size={18} />
          <h2 className="text-lg font-semibold">Weekly Plan</h2>
        </div>
        <div className="space-y-2">
          {days.map((day, index) => (
            <Day
              key={day}
              name={day}
              recommendation={exerciseRecommendations[day as keyof typeof exerciseRecommendations]}
              isToday={index === todayIndex}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyCalendar; 