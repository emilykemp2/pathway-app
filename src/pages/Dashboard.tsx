
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, TrendingDown, Calendar, Users } from "lucide-react";
import RiskScore from "@/components/RiskScore";
import HistoryCard from "@/components/HistoryCard";
import { assessmentHistory, getLatestAssessment } from "@/data/historyData";
import { useRole } from "@/contexts/RoleContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isTrainer } = useRole();
  const latestAssessment = getLatestAssessment();

  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <div className="bg-sportBlue text-white p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-white/80">
          {isTrainer 
            ? "Manage your athletes and track their assessment progress" 
            : "Track your movement assessment progress"}
        </p>
      </div>

      {/* Trainer-specific section */}
      {isTrainer && (
        <div className="p-6">
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">Your Athletes</h2>
                  <p className="text-sm text-gray-500">Manage and assess your athletes</p>
                </div>
                <Button 
                  onClick={() => navigate("/athletes")} 
                  variant="outline"
                  className="text-sportBlue"
                >
                  <Users size={18} className="mr-2" />
                  Manage Athletes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Risk Overview */}
      <div className="p-6">
        <Card>
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">
              {isTrainer ? "Latest Assessment Overview" : "Current Risk Overview"}
            </h2>
            <div className="flex justify-between items-center">
              <RiskScore score={latestAssessment.riskScore} size="lg" />

              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Last Assessment</p>
                <p className="text-sm font-medium">{latestAssessment.testName}</p>
                <p className="text-xs text-gray-500">{latestAssessment.date}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-4">
        <Button 
          onClick={() => navigate("/tests")} 
          className="w-full bg-sportBlue hover:bg-sportBlue/90 text-white"
        >
          <PlusCircle size={18} className="mr-2" />
          {isTrainer ? "New Athlete Assessment" : "New Assessment"}
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="px-6 mb-6">
        <h2 className="text-lg font-semibold mb-3">Key Metrics</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <TrendingDown className="text-sportGreen mb-2" size={24} />
              <p className="text-sm text-gray-500">Risk Trend</p>
              <p className="font-bold text-lg">↓ 14%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center">
              <Calendar className="text-sportBlue-light mb-2" size={24} />
              <p className="text-sm text-gray-500">Assessments</p>
              <p className="font-bold text-lg">{assessmentHistory.length}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Assessments */}
      <div className="px-6">
        <h2 className="text-lg font-semibold mb-3">
          {isTrainer ? "Recent Athlete Assessments" : "Recent Assessments"}
        </h2>
        <div className="space-y-3">
          {assessmentHistory.slice(0, 3).map(assessment => (
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
        {assessmentHistory.length > 3 && (
          <Button
            variant="link"
            className="mt-3 text-sportBlue"
            onClick={() => navigate("/history")}
          >
            View all assessments
          </Button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
