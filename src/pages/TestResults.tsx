
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import { ChevronLeft, Download, Share2, PlayCircle, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { getTestById } from "@/data/testsData";
import { assessmentHistory, getAssessmentById } from "@/data/historyData";
import { getRecommendedExercises } from "@/data/exercisesData";
import RiskScore from "@/components/RiskScore";
import ExerciseCard from "@/components/ExerciseCard";

const TestResults = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const assessmentId = searchParams.get("assessmentId");
  
  const [test, setTest] = useState(testId ? getTestById(testId) : undefined);
  const [assessment, setAssessment] = useState(assessmentId ? 
    getAssessmentById(assessmentId) : 
    assessmentHistory.find(a => a.testId === testId)
  );
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [exercises, setExercises] = useState(assessment ? getRecommendedExercises(assessment.riskScore) : []);

  useEffect(() => {
    if (testId) {
      const testData = getTestById(testId);
      setTest(testData);

      if (!testData) {
        navigate("/tests");
      }
    }
    
    if (assessmentId) {
      const assessmentData = getAssessmentById(assessmentId);
      setAssessment(assessmentData);
      
      if (assessmentData) {
        setExercises(getRecommendedExercises(assessmentData.riskScore));
      }
    } else if (testId) {
      const latestAssessment = assessmentHistory.find(a => a.testId === testId);
      setAssessment(latestAssessment);
      
      if (latestAssessment) {
        setExercises(getRecommendedExercises(latestAssessment.riskScore));
      }
    }
  }, [testId, assessmentId, navigate]);

  if (!test || !assessment) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <div className="bg-sportBlue text-white p-6">
        <div className="flex items-center mb-2">
          <Link to="/dashboard" className="text-white mr-2">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold">{test.title} Results</h1>
        </div>
        <p className="text-white/80">{assessment.date}</p>
      </div>

      {/* Risk Score */}
      <div className="p-6">
        <Card className="mb-6">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-1">ACL Injury Risk</h2>
              <p className="text-sm text-gray-600">Based on your movement patterns</p>
            </div>
            <RiskScore score={assessment.riskScore} />
          </CardContent>
        </Card>

        {/* Video Analysis */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Movement Analysis</h2>
          <Card className="overflow-hidden">
            <div className="aspect-video bg-gray-900 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white bg-black/30 hover:bg-black/50 rounded-full h-12 w-12"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause size={24} />
                  ) : (
                    <PlayCircle size={24} />
                  )}
                </Button>
              </div>
              
              {/* Joint Markers (Positioned absolutely in a real implementation) */}
              <div className="joint-marker" style={{ left: `${assessment.jointData.hip.x}%`, top: `${assessment.jointData.hip.y}%` }}></div>
              <div className="joint-marker" style={{ left: `${assessment.jointData.knee.x}%`, top: `${assessment.jointData.knee.y}%` }}></div>
              <div className="joint-marker" style={{ left: `${assessment.jointData.ankle.x}%`, top: `${assessment.jointData.ankle.y}%` }}></div>
              
              {/* Joint Lines */}
              <div className="joint-line" style={{ 
                left: `${assessment.jointData.hip.x}%`, 
                top: `${assessment.jointData.hip.y}%`,
                width: `${Math.sqrt(
                  Math.pow(assessment.jointData.knee.x - assessment.jointData.hip.x, 2) + 
                  Math.pow(assessment.jointData.knee.y - assessment.jointData.hip.y, 2)
                )}%`,
                transform: `rotate(${Math.atan2(
                  assessment.jointData.knee.y - assessment.jointData.hip.y,
                  assessment.jointData.knee.x - assessment.jointData.hip.x
                ) * (180 / Math.PI)}deg)`
              }}></div>
              
              <div className="joint-line" style={{ 
                left: `${assessment.jointData.knee.x}%`, 
                top: `${assessment.jointData.knee.y}%`,
                width: `${Math.sqrt(
                  Math.pow(assessment.jointData.ankle.x - assessment.jointData.knee.x, 2) + 
                  Math.pow(assessment.jointData.ankle.y - assessment.jointData.knee.y, 2)
                )}%`,
                transform: `rotate(${Math.atan2(
                  assessment.jointData.ankle.y - assessment.jointData.knee.y,
                  assessment.jointData.ankle.x - assessment.jointData.knee.x
                ) * (180 / Math.PI)}deg)`
              }}></div>
            </div>
            <div className="p-4 flex justify-between">
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </Card>
        </div>

        {/* Tabs for Findings and Recommendations */}
        <Tabs defaultValue="findings">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="findings" className="flex-1">Findings</TabsTrigger>
            <TabsTrigger value="exercises" className="flex-1">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="findings">
            <div className="space-y-4">
              {assessment.findings.map((finding, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        finding.severity === "high" ? "bg-riskRed" :
                        finding.severity === "moderate" ? "bg-riskYellow" : "bg-riskGreen"
                      }`}></div>
                      <h3 className="font-semibold">{finding.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{finding.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="exercises">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                These exercises are recommended based on your movement patterns to help reduce your injury risk.
              </p>
              
              {exercises.map(exercise => (
                <ExerciseCard
                  key={exercise.id}
                  title={exercise.title}
                  description={exercise.description}
                  imageUrl={exercise.imageUrl}
                  sets={exercise.sets}
                  reps={exercise.reps}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TestResults;
