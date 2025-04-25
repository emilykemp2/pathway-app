
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import RiskScore from "./RiskScore";

interface HistoryCardProps {
  id: string;
  testId: string;
  testName: string;
  date: string;
  riskScore: number;
}

const HistoryCard = ({ id, testId, testName, date, riskScore }: HistoryCardProps) => {
  return (
    <Link to={`/tests/${testId}/results?assessmentId=${id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{testName}</h3>
              <p className="text-sm text-gray-500">{date}</p>
            </div>
            <div className="flex items-center gap-3">
              <RiskScore degrees={riskScore} size="sm" />
              <ArrowRight size={18} className="text-sportBlue" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default HistoryCard;
