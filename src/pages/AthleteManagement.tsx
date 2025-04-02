
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  PlusCircle, 
  UserCircle, 
  Search, 
  BarChart
} from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { toast } from "sonner";
import { athletesData, Athlete } from "@/data/athletesData";

const AthleteManagement = () => {
  const navigate = useNavigate();
  const { isTrainer } = useRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [athletes] = useState<Athlete[]>(athletesData);

  // Redirect non-trainers
  if (!isTrainer) {
    navigate("/dashboard");
    return null;
  }

  const filteredAthletes = athletes.filter(athlete => 
    athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    athlete.sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAthlete = () => {
    // In a real app, this would open a form to add a new athlete
    toast.info("Add athlete functionality would open a form in a real app");
  };

  const handleViewAthlete = (id: string) => {
    // In a real app, this would navigate to the athlete's profile
    toast.info(`Viewing athlete ${id} in a real app would show their profile`);
  };

  const handleAssessAthlete = (id: string) => {
    // In a real app, this would start a new assessment for the selected athlete
    navigate("/tests");
  };

  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <div className="bg-sportBlue text-white p-6">
        <h1 className="text-2xl font-bold">Athletes</h1>
        <p className="text-white/80">Manage and track your athletes</p>
      </div>

      {/* Search and Add */}
      <div className="p-6">
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search athletes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={handleAddAthlete} className="bg-sportBlue hover:bg-sportBlue/90">
            <PlusCircle size={18} className="mr-2" />
            Add Athlete
          </Button>
        </div>

        {/* Athletes List */}
        {filteredAthletes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No athletes found matching your search.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAthletes.map((athlete) => (
              <Card key={athlete.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-sportBlue/10 p-2 rounded-full text-sportBlue">
                          <UserCircle size={32} />
                        </div>
                        <div>
                          <h3 className="font-bold">{athlete.name}</h3>
                          <p className="text-sm text-gray-500">{athlete.sport}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col items-end mr-2">
                          <div className="flex items-center gap-1">
                            <BarChart size={14} className="text-sportBlue" />
                            <span className="font-semibold text-sm">Risk: {athlete.riskScore}</span>
                          </div>
                          <p className="text-xs text-gray-500">Last: {athlete.lastAssessment}</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2 px-4 pb-2">
                      <div className="text-center border-r">
                        <p className="text-xs text-gray-500">Age</p>
                        <p className="text-sm font-medium">{athlete.age}</p>
                      </div>
                      <div className="text-center border-r">
                        <p className="text-xs text-gray-500">Height</p>
                        <p className="text-sm font-medium">{athlete.height}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Weight</p>
                        <p className="text-sm font-medium">{athlete.weight}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t">
                    <button 
                      className="flex-1 py-2 text-sm font-medium text-sportBlue hover:bg-gray-50"
                      onClick={() => handleViewAthlete(athlete.id)}
                    >
                      View Profile
                    </button>
                    <div className="w-px bg-gray-200"></div>
                    <button 
                      className="flex-1 py-2 text-sm font-medium text-sportBlue hover:bg-gray-50"
                      onClick={() => handleAssessAthlete(athlete.id)}
                    >
                      New Assessment
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AthleteManagement;
