import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, Trophy } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"trainer" | "athlete" | null>(null);

  const handleRoleSelect = () => {
    if (!role) {
      toast.error("Please select a role to continue");
      return;
    }
    
    // Navigate to role-specific dashboard URL instead of using localStorage
    if (role === "trainer") {
      navigate("/dashboard/trainer");
    } else {
      navigate("/dashboard/athlete");
    }
    
    toast.success(`Logged in as ${role === "trainer" ? "Athletic Trainer" : "Athlete"}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black px-6 py-12">
      
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        <h1 className="text-3xl font-bold mb-6">Welcome to Pathway</h1>
        <Card className="w-full max-w-xl mb-8 border border-gray-200 shadow-sm">
          <CardContent className="pt-8 px-8 pb-10">
            <h2 className="text-2xl font-bold mb-4 text-black">Select Your Role</h2>
            <p className="mb-8 text-gray-600">Choose how you plan to use the app</p>
            
            <RadioGroup className="gap-6" value={role || ""} onValueChange={(value) => setRole(value as "trainer" | "athlete")}>
              <div className="flex items-center space-x-3 rounded-lg border border-gray-200 p-5 cursor-pointer hover:bg-gray-50" onClick={() => setRole("trainer")}>
                <RadioGroupItem value="trainer" id="trainer" />
                <Label htmlFor="trainer" className="flex items-center gap-4 cursor-pointer w-full">
                  <div className="bg-sportBlue p-3 rounded-full text-white">
                    <Users size={24} />
                  </div>
                  <div className="text-left gap-2 flex flex-col">
                    <p className="font-bold text-black text-lg">Athletic Trainer</p>
                    <p className="text-sm text-gray-600">Manage multiple athletes and track their progress</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 rounded-lg border border-gray-200 p-5 cursor-pointer hover:bg-gray-50" onClick={() => setRole("athlete")}>
                <RadioGroupItem value="athlete" id="athlete" />
                <Label htmlFor="athlete" className="flex items-center gap-4 cursor-pointer w-full">
                  <div className="bg-sportBlue p-3 rounded-full text-white">
                    <Trophy size={24} />
                  </div>
                  <div className="text-left gap-2 flex flex-col">
                    <p className="font-bold text-black text-lg">Athlete</p>
                    <p className="text-sm text-gray-600">Track your individual assessment data</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
            
            <Button 
              onClick={handleRoleSelect} 
              className="w-full mt-10 bg-sportBlue text-white hover:bg-sportBlue-light"
              size="lg"
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
