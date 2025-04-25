import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, TrendingDown, Calendar, ArrowRight, ArrowLeft, Volleyball } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RiskScore from "@/components/RiskScore";
import HistoryCard from "@/components/HistoryCard";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import { assessmentHistory } from "@/data/historyData";
import { getAthleteById } from "@/data/athletesData";

const AthleteProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [athlete, setAthlete] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const athleteData = getAthleteById(id);
      setAthlete(athleteData);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading athlete profile...</div>;
  }

  if (!athlete) {
    return (
      <div className="p-6">
        <div className="mb-4">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Dashboard
          </Button>
        </div>
        <div className="text-center p-10">
          <h2 className="text-xl font-bold text-red-500">Athlete Not Found</h2>
          <p className="text-gray-600 mt-2">The athlete you're looking for doesn't exist or was removed.</p>
        </div>
      </div>
    );
  }

  // Filter assessment history for this athlete (in a real app, this would be athlete-specific)
  // Here we're just using the same data for all athletes as a demo
  const athleteAssessments = assessmentHistory;

  return (
    <div className="flex flex-col pb-20">
      {/* Header with Back Button */}
      <div className="bg-white px-6 py-4">
        <div className="flex flex-col mb-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-3 self-start"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl text-bgSportBlue font-bold">{athlete.name}</h1>
            <p className="text-gray-600">
              {athlete.sport} • {athlete.age} years old
            </p>
          </div>
        </div>
      </div>

      {/* Athlete Overview */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex flex-col gap-4">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-4">Athlete Overview</h2>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-sportBlue/10 p-3 rounded-full">
                      <Volleyball className="text-sportBlue" size={44} />
                    </div>
                    <div className="ml-3">
                      <p className="text-md font-medium text-sportBlue">{athlete.sport}</p>
                      <p className="text-sm text-gray-600">
                        Height: <span className="font-medium">{athlete.height}</span> • 
                        Weight: <span className="font-medium">{athlete.weight}</span>
                      </p>
                    </div>
                  </div>
                
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Last Assessment</p>
                    <p className="text-sm font-medium">{athlete.lastAssessment}</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col text-right justify-end">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></div>
                    <p className="text-sm">Left knee: <span className="font-medium">{athlete.leftKneeDegrees}° valgus</span></p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div>
                    <p className="text-sm">Right knee: <span className="font-medium">{athlete.rightKneeDegrees}° valgus</span></p>
                  </div>
                </div>
                  
                {/* Currently Working On section */}
                <div className="mt-4 border-t pt-3">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Currently Working On:</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="bg-sportGreen/20 p-1.5 rounded-full mr-2">
                        <TrendingDown size={14} className="text-sportGreen" />
                      </div>
                      <span className="text-sm">Strengthening Hamstrings</span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-sportBlue/20 p-1.5 rounded-full mr-2">
                        <PlusCircle size={14} className="text-sportBlue" />
                      </div>
                      <span className="text-sm">Trunk Stability</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-row gap-4">
              <Card className="w-1/2">
                <CardContent className="p-4 flex flex-col items-center">
                  <TrendingDown className="text-sportGreen mb-2" size={24} />
                  <p className="text-sm text-gray-500">Risk Trend</p>
                  <p className="font-bold text-lg">↓ 14%</p>
                </CardContent>
              </Card>
              <Card className="w-1/2">
                <CardContent className="p-4 flex flex-col items-center">
                  <Calendar className="text-sportBlue-light mb-2" size={24} />
                  <p className="text-sm text-gray-500">Assessments</p>
                  <p className="font-bold text-lg">{athleteAssessments.length}</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Quick Actions */}
            <div className="mb-4">
              <Button 
                onClick={() => navigate(`/tests?athleteId=${athlete.id}`)} 
                className="w-full bg-sportBlue hover:bg-sportBlue/90 text-white"
              >
                <PlusCircle size={18} className="mr-2" />
                New Assessment for {athlete.name}
              </Button>
            </div>
          </div>

          <div className="flex-1">
            <WeeklyCalendar />
          </div>
        </div>
      </div>

      {/* Knee Valgus Details */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold mb-3">Knee Valgus Progress</h2>
        <Card>
          <CardContent className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Current Angle</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Change (30 days)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Left Knee</TableCell>
                  <TableCell>{athlete.leftKneeDegrees}°</TableCell>
                  <TableCell>
                    <RiskScore degrees={athlete.leftKneeDegrees} size="sm" />
                  </TableCell>
                  <TableCell className="text-sportGreen">↓ 2°</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Right Knee</TableCell>
                  <TableCell>{athlete.rightKneeDegrees}°</TableCell>
                  <TableCell>
                    <RiskScore degrees={athlete.rightKneeDegrees} size="sm" />
                  </TableCell>
                  <TableCell className="text-sportGreen">↓ 3°</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Recent Assessments */}
      <div className="px-6">
        <h2 className="text-lg font-semibold mb-3">
          Recent Assessments
        </h2>
        <div className="space-y-3 flex flex-col">
          {athleteAssessments.slice(0, 3).map(assessment => (
            <HistoryCard
              key={assessment.id}
              id={assessment.id}
              testId={assessment.testId}
              testName={assessment.testName}
              date={assessment.date}
              riskScore={assessment.riskScore}
            />
          ))}
        </div>
        {athleteAssessments.length > 3 && (
          <Button
            variant="link"
            className="mt-3 text-sportBlue"
            onClick={() => navigate(`/history?athleteId=${athlete.id}`)}
          >
            View all assessments <ArrowRight size={18} className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AthleteProfile; 