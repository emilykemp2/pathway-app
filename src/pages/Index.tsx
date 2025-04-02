
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Activity, Shield, BarChart, Users, UserCircle } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"trainer" | "athlete" | null>(null);
  const [showRoleSelection, setShowRoleSelection] = useState(true);

  const handleRoleSelect = () => {
    if (!role) {
      toast.error("Please select a role to continue");
      return;
    }
    
    // Store the selected role in localStorage
    localStorage.setItem("userRole", role);
    setShowRoleSelection(false);
    toast.success(`Logged in as ${role === "trainer" ? "Athletic Trainer" : "Athlete"}`);
  };

  if (showRoleSelection) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-sportBlue to-sportBlue-light text-white px-6 py-12">
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl font-bold mb-6">SportWise RiskSight</h1>
          <p className="text-xl mb-8">
            AI-powered movement analysis to prevent knee and ACL injuries
          </p>
          
          <Card className="w-full max-w-md mb-8 bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="pt-6 px-6 pb-8">
              <h2 className="text-2xl font-bold mb-4">Select Your Role</h2>
              <p className="mb-6 text-white/80">Choose how you plan to use SportWise RiskSight</p>
              
              <RadioGroup className="gap-4" value={role || ""} onValueChange={(value) => setRole(value as "trainer" | "athlete")}>
                <div className="flex items-center space-x-3 rounded-lg border border-white/20 p-4 cursor-pointer hover:bg-white/5" onClick={() => setRole("trainer")}>
                  <RadioGroupItem value="trainer" id="trainer" />
                  <Label htmlFor="trainer" className="flex items-center gap-3 cursor-pointer">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Users size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Athletic Trainer</p>
                      <p className="text-sm text-white/70">Manage multiple athletes and track their progress</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border border-white/20 p-4 cursor-pointer hover:bg-white/5" onClick={() => setRole("athlete")}>
                  <RadioGroupItem value="athlete" id="athlete" />
                  <Label htmlFor="athlete" className="flex items-center gap-3 cursor-pointer">
                    <div className="bg-white/20 p-2 rounded-full">
                      <UserCircle size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">Athlete</p>
                      <p className="text-sm text-white/70">Track your individual assessment data</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              
              <Button 
                onClick={handleRoleSelect} 
                className="w-full mt-8 bg-white text-sportBlue hover:bg-white/90"
                size="lg"
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
