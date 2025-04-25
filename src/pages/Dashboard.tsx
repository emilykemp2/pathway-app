import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, TrendingDown, TrendingUp, Calendar, Users, ArrowRight, Volleyball } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import RiskScore from "@/components/RiskScore";
import HistoryCard from "@/components/HistoryCard";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import { assessmentHistory, getLatestAssessment } from "@/data/historyData";
import { useRole } from "@/contexts/RoleContext";
import { athletesData } from "@/data/athletesData";
import { sportsSeasonsData } from "@/data/sportsSeasons";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const { role: urlRole } = useParams<{ role: string }>();
  const { isTrainer, setRole } = useRole();
  const latestAssessment = getLatestAssessment();
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const [showHighRiskOnly, setShowHighRiskOnly] = useState<boolean>(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(new Date());
  const [scheduleSport, setScheduleSport] = useState<string>("");
  
  // Set role from URL parameter if provided
  useEffect(() => {
    if (urlRole && (urlRole === "trainer" || urlRole === "athlete")) {
      setRole(urlRole);
    }
  }, [urlRole, setRole]);
  
  // Get unique sports from athletes data
  const sports = ["All Sports", ...Array.from(new Set(athletesData.map(athlete => athlete.sport)))];
  
  // Sort athletes by sport
  const sortedAthletes = [...athletesData].sort((a, b) => 
    a.sport.localeCompare(b.sport)
  );
  
  // Filter athletes by selected sport and risk status
  const filteredAthletes = sortedAthletes
    .filter(athlete => selectedSport === "all" || athlete.sport === selectedSport)
    .filter(athlete => !showHighRiskOnly || athlete.riskScore >= 70);

  // Navigate to Athletes page with the selected sport
  const handleViewAllAthletes = () => {
    navigate("/athletes", { state: { selectedSport } });
  };

  // Helper function to get assessment date based on sport and position
  const getAssessmentDate = (sport: string, position: number, isPast: boolean) => {
    // Get the current date as a reference point
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // For past assessments, go back 1-6 months depending on position
    // For upcoming assessments, go forward 1-3 months
    let monthOffset = 0;
    
    if (isPast) {
      // Past assessments are 1-4 months ago
      monthOffset = -Math.floor(Math.random() * 4 + 1);
    } else {
      // Upcoming assessments are 1-3 months in the future
      monthOffset = Math.floor(Math.random() * 3 + 1);
    }
    
    const assessmentDate = new Date(currentYear, currentMonth + monthOffset, Math.floor(Math.random() * 28 + 1));
    return assessmentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Handle the schedule form submission
  const handleScheduleAssessment = () => {
    if (!scheduleSport || !scheduleDate) {
      toast.error("Please select both a sport and a date");
      return;
    }
    
    // In a real app, we would save this to the database
    // For now, just show a success message
    toast.success(`Assessment scheduled for ${scheduleSport} on ${format(scheduleDate, "MMMM d, yyyy")}`);
    setIsScheduleDialogOpen(false);
    
    // Reset form
    setScheduleDate(new Date());
    setScheduleSport("");
  };

  return (
    <div className="flex flex-col pb-20">
      {/* Header */}
      <div className="bg-white p-6">
        <h1 className="text-2xl text-bgSportBlue font-bold">Dashboard</h1>
        <p className="text-gray-600">
          {isTrainer 
            ? "Manage your athletes and track their assessment progress" 
            : "Track your movement assessment progress"}
        </p>
      </div>

      {/* Trainer-specific section */}
      {isTrainer && (
        <div className="p-6">

          {/* Athletes Overview for Trainers */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Athletes Overview</h2>
              <div className="flex gap-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="highRiskFilter"
                    checked={showHighRiskOnly}
                    onChange={() => setShowHighRiskOnly(!showHighRiskOnly)}
                    className="mr-2"
                  />
                  <label htmlFor="highRiskFilter" className="text-sm text-gray-600">
                    High Risk Only
                  </label>
                </div>
                <div className="w-48">
                  <Select
                    value={selectedSport}
                    onValueChange={(value) => setSelectedSport(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by sport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sports</SelectItem>
                      {sports.filter(sport => sport !== "All Sports").map((sport) => (
                        <SelectItem key={sport} value={sport}>
                          {sport}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <Card>
              <CardContent className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Sport</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Current Valgus</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAthletes
                      .slice(0, 5)
                      .map((athlete) => (
                        <TableRow 
                          key={athlete.id}
                          className={athlete.riskScore >= 70 ? "bg-red-50" : ""}
                        >
                          <TableCell className="font-medium">{athlete.name}</TableCell>
                          <TableCell>{athlete.sport}</TableCell>
                          <TableCell>{athlete.age}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className={`font-medium ${athlete.riskScore >= 70 ? "text-red-600" : ""}`}>
                                {athlete.riskScore}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <div>
                                <span className="text-amber-500 text-xs">L: {athlete.leftKneeDegrees}°</span> / 
                                <span className="text-red-500 text-xs ml-1">R: {athlete.rightKneeDegrees}°</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => navigate(`/athlete/${athlete.id}`)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            {filteredAthletes.length > 3 && (
              <Button
                variant="link"
                className="mt-2 text-sportBlue"
                onClick={handleViewAllAthletes}
              >
                View all athletes
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Show individual's risk overview for athletes only */}
      {!isTrainer && (
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col gap-4">
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold mb-4">Overview</h2>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-sportBlue/10 p-3 rounded-full">
                        <Volleyball className="text-sportBlue" size={44} />
                      </div>
                      <div className="ml-3">
                        <p className="text-md font-medium text-sportBlue">Week 3 of Preseason</p>
                        <p className="text-sm text-gray-600">Next game: <span className="font-medium">33 days away</span></p>
                      </div>
                    </div>
                
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">Last Assessment</p>
                      <p className="text-sm font-medium">{latestAssessment.testName}</p>
                      <p className="text-xs text-gray-500">{latestAssessment.date}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col text-right justify-end">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></div>
                            <p className="text-sm">Left knee: <span className="font-medium">  4° valgus</span></p>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></div>
                            <p className="text-sm">Right knee: <span className="font-medium">10° valgus</span></p>
                          </div>
                    </div>
                  
                  {/* Currently Working On section */}
                  <div className="mt-4 border-t pt-3">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Currently Working On:</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="bg-sportGreen/20 p-1.5 rounded-full mr-2">
                          <TrendingUp size={14} className="text-sportGreen" />
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
                    <p className="font-bold text-lg">{assessmentHistory.length}</p>
                    </CardContent>
                  </Card>
              </div>
              {/* Shared Quick Actions */}
              <div className="mb-4">
                <Button 
                  onClick={() => navigate("/tests")} 
                  className="w-full bg-sportBlue hover:bg-sportBlue/90 text-white"
                >
                  <PlusCircle size={18} className="mr-2" />
                  {isTrainer ? "New Athlete Assessment" : "New Assessment"}
                </Button>
              </div>
            </div>

            <div className="flex-1">
              <WeeklyCalendar />
            </div>
          </div>
        </div>
      )}

      

      {/* Key Metrics - shown to both but has different context */}
      <div className="px-6 mb-6">
          {isTrainer && (
            <>
            <h2 className="text-lg font-semibold mb-3">Key Metrics</h2>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <Users className="text-sportBlue mb-2" size={24} />
                  <p className="text-sm text-gray-500">Total Athletes</p>
                  <p className="font-bold text-lg">{athletesData.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <Users className="text-sportBlue mb-2" size={24} />
                  <p className="text-sm text-gray-500">Total Teams</p>
                  <p className="font-bold text-lg">14</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex flex-col items-center">
                  <Calendar className="text-sportBlue-light mb-2" size={24} />
                  <p className="text-sm text-gray-500">Team Assessments</p>
                  <p className="font-bold text-lg">{assessmentHistory.length}</p>
                </CardContent>
              </Card>
              </div>
            </>
          )}
      </div>

      {/* Recent Assessments - shown to both users with different context */}
      <div className="px-6">
        {!isTrainer && (
          <>
          <h2 className="text-lg font-semibold mb-3">
            Recent Athlete Assessments
          </h2>
        <div className="space-y-3 flex flex-col">
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
            View all assessments <ArrowRight size={18} className="ml-2" />
          </Button>
        )}
      </>
      )}

      {isTrainer && (
        <>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Sports Seasons Timeline</h2>
            <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-sportBlue hover:bg-sportBlue/90">
                  <PlusCircle className="mr-2 h-4 w-4" /> Schedule
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Schedule Team Assessment</DialogTitle>
                  <DialogDescription>
                    Select a sports team and date to schedule a new team assessment.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sport">Sports Team</Label>
                    <Select value={scheduleSport} onValueChange={setScheduleSport}>
                      <SelectTrigger id="sport">
                        <SelectValue placeholder="Select a team" />
                      </SelectTrigger>
                      <SelectContent>
                        {sports.filter(sport => sport !== "All Sports").map((sport) => (
                          <SelectItem key={sport} value={sport}>
                            {sport}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Date</Label>
                    <div className="border rounded-md p-1">
                      <CalendarComponent
                        mode="single"
                        selected={scheduleDate}
                        onSelect={setScheduleDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>Cancel</Button>
                  <Button type="submit" onClick={handleScheduleAssessment}>Schedule</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Card className="mb-6">
          <div className="mt-6 flex items-center justify-center text-xs text-gray-500">
                <div className="flex items-center mr-4">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mr-1"></div> Past Assessment
                </div>
                <div className="flex items-center mr-4">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div> Upcoming Assessment
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-sportBlue rounded-full mr-1"></div> Current Date
                </div>
              </div>
            <CardContent className="p-4">
              <div className="space-y-8">
                {/* Track for each sport */}
                {sports.filter(sport => sport !== "All Sports").map((sport) => {
                  // Find the sport season data
                  const sportData = sportsSeasonsData.find(s => s.sport === sport);
                  
                  // Default values if sport data is not found
                  const defaultData = {
                    status: "Off-Season",
                    timeline: {
                      preSeasonStart: 15,
                      preSeasonEnd: 35,
                      inSeasonStart: 35,
                      inSeasonEnd: 65,
                      postSeasonStart: 65,
                      postSeasonEnd: 80,
                      offSeasonStart: 80,
                      offSeasonEnd: 15
                    },
                    assessments: {
                      past: [25],
                      upcoming: [60, 85]
                    },
                    currentPosition: 40
                  };
                  
                  // Use sport data if found, otherwise use default
                  const {
                    status = defaultData.status,
                    timeline = defaultData.timeline,
                    assessments = defaultData.assessments,
                    currentPosition = defaultData.currentPosition
                  } = sportData || {};
                  
                  return (
                    <div key={sport} className="relative pb-8 border-b mt-2 border-gray-100 last:border-b-0">
                      <div className="flex items-center mb-7">
                        <h3 className="text-md font-medium">{sport}</h3>
                        
                        {/* Season status pill */}
                        {(() => {
                          // Color based on season status
                          const bgColor = {
                            "In Season": "bg-green-100 text-green-800",
                            "Pre-Season": "bg-blue-100 text-blue-800",
                            "Post-Season": "bg-amber-100 text-amber-800",
                            "Off-Season": "bg-gray-100 text-gray-800"
                          }[status];
                          
                          return (
                            <span className={`ml-3 px-2 py-0.5 text-xs rounded-full ${bgColor}`}>
                              {status}
                            </span>
                          );
                        })()}
                      </div>
                      
                      {/* Timeline track */}
                      <div className="h-14 bg-gray-100 rounded-md relative">
                        {/* Current month marker */}
                        <div className="absolute top-0 bottom-0 border-r-2 border-sportBlue" 
                             style={{ left: `${currentPosition}%` }}>
                          <div className="absolute -top-1 -left-2 w-4 h-4 rounded-full bg-sportBlue"></div>
                          <div className="absolute -top-7 -left-8 text-xs font-medium text-sportBlue">Now</div>
                        </div>
                        
                        {/* Past Assessment markers */}
                        {assessments.past.map((position, index) => (
                          <div 
                            key={`past-${index}`}
                            className="absolute top-0 bottom-0 flex items-center" 
                            style={{ left: `${position}%` }}
                          >
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div 
                                    className="w-3 h-3 bg-gray-500 rounded-full cursor-pointer hover:bg-sportBlue transition-colors"
                                  ></div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs font-medium">{sport} Team Assessment</p>
                                  <p className="text-xs">Completed on {getAssessmentDate(sport, position, true)}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        ))}
                        
                        {/* Upcoming Assessment markers */}
                        {assessments.upcoming.map((position, index) => (
                          <div 
                            key={`upcoming-${index}`}
                            className="absolute top-0 bottom-0 flex items-center" 
                            style={{ left: `${position}%` }}
                          >
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div 
                                    className="w-3 h-3 bg-gray-400 rounded-full cursor-pointer hover:bg-sportBlue transition-colors"
                                  ></div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs font-medium">{sport} Team Assessment</p>
                                  <p className="text-xs">Scheduled for {getAssessmentDate(sport, position, false)}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        ))}
                        
                        {/* Season period markers */}
                        <div 
                          className="absolute bottom-0 h-2 bg-blue-200 rounded-sm" 
                          style={{ 
                            left: `${timeline.preSeasonStart}%`, 
                            width: `${timeline.preSeasonEnd - timeline.preSeasonStart}%` 
                          }}
                        >
                          <span className="absolute -bottom-5 text-xs text-gray-500" style={{ left: '50%', transform: 'translateX(-50%)' }}>Pre-Season</span>
                        </div>
                        <div 
                          className="absolute bottom-0 h-2 bg-green-200 rounded-sm" 
                          style={{ 
                            left: `${timeline.inSeasonStart}%`, 
                            width: `${timeline.inSeasonEnd - timeline.inSeasonStart}%` 
                          }}
                        >
                          <span className="absolute -bottom-5 text-xs text-gray-500" style={{ left: '50%', transform: 'translateX(-50%)' }}>In-Season</span>
                        </div>
                        <div 
                          className="absolute bottom-0 h-2 bg-amber-200 rounded-sm" 
                          style={{ 
                            left: `${timeline.postSeasonStart}%`, 
                            width: `${timeline.postSeasonEnd - timeline.postSeasonStart}%` 
                          }}
                        >
                          <span className="absolute -bottom-5 text-xs text-gray-500" style={{ left: '50%', transform: 'translateX(-50%)' }}>Post</span>
                        </div>
                        <div 
                          className="absolute bottom-0 h-2 bg-gray-200 rounded-sm" 
                          style={{ 
                            left: `${timeline.offSeasonStart}%`, 
                            width: `${timeline.offSeasonEnd - timeline.offSeasonStart}%` 
                          }}
                        >
                          <span className="absolute -bottom-5 text-xs text-gray-500" style={{ left: '50%', transform: 'translateX(-50%)' }}>Off-Season</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
            </CardContent>
          </Card>
        </>
      )}
      </div>
    </div>
  );
};

export default Dashboard;
