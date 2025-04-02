
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Activity, Shield, BarChart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sportBlue to-sportBlue-light text-white px-6 py-12">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl font-bold mb-6">SportWise RiskSight</h1>
        <p className="text-xl mb-12">
          AI-powered movement analysis to prevent knee and ACL injuries
        </p>

        <div className="grid grid-cols-1 gap-6 w-full max-w-md mb-12">
          <div className="flex gap-4 items-center bg-white/10 p-4 rounded-lg">
            <div className="bg-white/20 p-3 rounded-full">
              <Activity size={28} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Movement Analysis</h3>
              <p className="text-white/80 text-sm">Capture and analyze your movement patterns</p>
            </div>
          </div>

          <div className="flex gap-4 items-center bg-white/10 p-4 rounded-lg">
            <div className="bg-white/20 p-3 rounded-full">
              <Shield size={28} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Risk Assessment</h3>
              <p className="text-white/80 text-sm">Identify potential ACL injury risk factors</p>
            </div>
          </div>

          <div className="flex gap-4 items-center bg-white/10 p-4 rounded-lg">
            <div className="bg-white/20 p-3 rounded-full">
              <BarChart size={28} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Progress Tracking</h3>
              <p className="text-white/80 text-sm">Monitor improvements in your movement patterns</p>
            </div>
          </div>
        </div>

        <Button 
          onClick={() => navigate("/dashboard")} 
          className="w-full max-w-md bg-white text-sportBlue hover:bg-white/90"
          size="lg"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
