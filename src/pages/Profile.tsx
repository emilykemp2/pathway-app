
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { assessmentHistory } from "@/data/historyData";
import { 
  User, 
  Settings, 
  LogOut, 
  FileText, 
  Share2, 
  HelpCircle,
  ChevronRight
} from "lucide-react";

const Profile = () => {
  const totalAssessments = assessmentHistory.length;
  const averageRisk = Math.round(
    assessmentHistory.reduce((acc, curr) => acc + curr.riskScore, 0) / totalAssessments
  );

  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <div className="bg-sportBlue text-white p-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-white/80">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="p-6">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Avatar className="h-16 w-16 mr-4">
                <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p className="text-sm text-gray-500">Athlete</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Assessments</p>
                <p className="font-bold text-xl">{totalAssessments}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Avg. Risk</p>
                <p className="font-bold text-xl">{averageRisk}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <h2 className="text-lg font-semibold mb-3">Settings</h2>
        <Card className="mb-6">
          <CardContent className="p-0">
            <Button variant="ghost" className="w-full justify-start py-3 px-4 h-auto rounded-none">
              <User size={18} className="mr-3 text-gray-500" />
              <span className="flex-1 text-left">Edit Profile</span>
              <ChevronRight size={18} className="text-gray-400" />
            </Button>
            <Separator />
            <Button variant="ghost" className="w-full justify-start py-3 px-4 h-auto rounded-none">
              <Settings size={18} className="mr-3 text-gray-500" />
              <span className="flex-1 text-left">App Settings</span>
              <ChevronRight size={18} className="text-gray-400" />
            </Button>
            <Separator />
            <Button variant="ghost" className="w-full justify-start py-3 px-4 h-auto rounded-none">
              <Share2 size={18} className="mr-3 text-gray-500" />
              <span className="flex-1 text-left">Share with Coach</span>
              <ChevronRight size={18} className="text-gray-400" />
            </Button>
          </CardContent>
        </Card>

        {/* Support */}
        <h2 className="text-lg font-semibold mb-3">Support</h2>
        <Card className="mb-6">
          <CardContent className="p-0">
            <Button variant="ghost" className="w-full justify-start py-3 px-4 h-auto rounded-none">
              <HelpCircle size={18} className="mr-3 text-gray-500" />
              <span className="flex-1 text-left">Help & Support</span>
              <ChevronRight size={18} className="text-gray-400" />
            </Button>
            <Separator />
            <Button variant="ghost" className="w-full justify-start py-3 px-4 h-auto rounded-none">
              <FileText size={18} className="mr-3 text-gray-500" />
              <span className="flex-1 text-left">Privacy Policy</span>
              <ChevronRight size={18} className="text-gray-400" />
            </Button>
          </CardContent>
        </Card>

        <Button variant="outline" className="w-full text-gray-700">
          <LogOut size={18} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
