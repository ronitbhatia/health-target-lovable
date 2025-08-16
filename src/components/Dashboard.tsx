import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OnboardingData } from "./OnboardingForm";
import { ProspectCard } from "./ProspectCard";
import { MeetingScheduler } from "./MeetingScheduler";
import { 
  Search, 
  Filter, 
  Download, 
  Users, 
  Calendar, 
  Target, 
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  BarChart3 
} from "lucide-react";

interface DashboardProps {
  userData: OnboardingData;
  onBack: () => void;
}

export interface Prospect {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  score: number;
  avatar: string;
  location: string;
  linkedinUrl: string;
  companySize: string;
  interests: string[];
  priority: "high" | "medium" | "low";
  status: "new" | "contacted" | "responded" | "meeting_scheduled";
  lastContact?: string;
  meetingScheduled?: boolean;
}

// Mock data for demo
const mockProspects: Prospect[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    title: "Chief Medical Officer",  
    company: "MedTech Solutions",
    industry: "Medical Devices",
    score: 95,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
    location: "San Francisco, CA",
    linkedinUrl: "https://linkedin.com/in/sarahchen",
    companySize: "500-1000",
    interests: ["AI in Healthcare", "Digital Transformation", "Patient Outcomes"],
    priority: "high",
    status: "new"
  },
  {
    id: "2", 
    name: "Michael Rodriguez",
    title: "VP of Sales",
    company: "HealthFlow Systems",
    industry: "Healthcare IT",
    score: 88,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
    location: "Austin, TX",
    linkedinUrl: "https://linkedin.com/in/mrodriguez",
    companySize: "1000+",
    interests: ["EHR Integration", "Workflow Optimization", "Revenue Cycle"],
    priority: "high",
    status: "contacted"
  },
  {
    id: "3",
    name: "Jennifer Park",
    title: "Director of Innovation",
    company: "CardioVascular Inc",
    industry: "Medical Devices", 
    score: 82,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format",
    location: "Boston, MA",
    linkedinUrl: "https://linkedin.com/in/jenniferpark",
    companySize: "250-500",
    interests: ["Medical Innovation", "Cardiac Care", "FDA Compliance"],
    priority: "medium",
    status: "responded"
  },
  {
    id: "4",
    name: "David Kim",
    title: "Head of Digital Health",
    company: "NextGen Medical",
    industry: "Digital Health",
    score: 79,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
    location: "Seattle, WA", 
    linkedinUrl: "https://linkedin.com/in/davidkim",
    companySize: "100-250",
    interests: ["Telemedicine", "Remote Monitoring", "Digital Therapeutics"],
    priority: "medium",
    status: "meeting_scheduled"
  }
];

export const Dashboard = ({ userData, onBack }: DashboardProps) => {
  const [prospects] = useState<Prospect[]>(mockProspects);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);

  const filteredProspects = prospects.filter(prospect => {
    const matchesSearch = prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prospect.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prospect.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = filterPriority === "all" || prospect.priority === filterPriority;
    const matchesStatus = filterStatus === "all" || prospect.status === filterStatus;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const stats = {
    totalProspects: prospects.length,
    highPriority: prospects.filter(p => p.priority === "high").length,
    meetingsScheduled: prospects.filter(p => p.status === "meeting_scheduled").length,
    responseRate: Math.round(((prospects.filter(p => p.status === "responded" || p.status === "meeting_scheduled").length) / prospects.length) * 100)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50/20 to-teal-50/20">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                ← Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{userData.conference} Strategy</h1>
                <p className="text-muted-foreground">{userData.company} • {userData.industry}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-success text-white">Live Dashboard</Badge>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Prospects</CardTitle>
              <Users className="h-4 w-4 text-healthcare-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProspects}</div>
              <p className="text-xs text-muted-foreground">From {userData.conference}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Priority</CardTitle>
              <Star className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.highPriority}</div>
              <p className="text-xs text-muted-foreground">Top scoring prospects</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meetings Booked</CardTitle>
              <Calendar className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.meetingsScheduled}</div>
              <p className="text-xs text-muted-foreground">Before conference</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-healthcare-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.responseRate}%</div>
              <p className="text-xs text-muted-foreground">Above industry avg</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="prospects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="prospects">Prospects</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="prospects" className="space-y-6">
            {/* Filters */}
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search prospects..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-full lg:w-[150px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full lg:w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="responded">Responded</SelectItem>
                    <SelectItem value="meeting_scheduled">Meeting Scheduled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="border-healthcare-blue text-healthcare-blue hover:bg-healthcare-blue hover:text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced
                </Button>
              </div>
            </Card>

            {/* Prospects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProspects.map((prospect) => (
                <ProspectCard 
                  key={prospect.id} 
                  prospect={prospect}
                  onClick={() => setSelectedProspect(prospect)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="meetings" className="space-y-6">
            <MeetingScheduler 
              prospects={prospects.filter(p => p.status === "responded" || p.status === "meeting_scheduled")}
              conferenceDate={userData.conference}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-healthcare-blue" />
                    <span>Outreach Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Emails Sent</span>
                      <span>24/30</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-healthcare-blue h-2 rounded-full" style={{ width: '80%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Responses</span>
                      <span>8/24</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '33%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Meetings Booked</span>
                      <span>4/8</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-warning h-2 rounded-full" style={{ width: '50%' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-6 bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle>Goal Progress</CardTitle>
                  <CardDescription>Track your conference objectives</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="text-sm">Target: {userData.budget}</span>
                    </div>
                    <Badge className="bg-success text-white">On Track</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-warning" />
                      <span className="text-sm">Days Until Conference</span>
                    </div>
                    <span className="font-semibold">23 days</span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground mb-2">Conference ROI Projection</div>
                    <div className="text-2xl font-bold text-success">$2.4M</div>
                    <div className="text-sm text-muted-foreground">Based on current pipeline</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Meeting Scheduler Modal would go here */}
      {selectedProspect && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{selectedProspect.name}</CardTitle>
                  <CardDescription>{selectedProspect.title} at {selectedProspect.company}</CardDescription>
                </div>
                <Button variant="ghost" onClick={() => setSelectedProspect(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={selectedProspect.avatar} 
                    alt={selectedProspect.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Score: {selectedProspect.score}</Badge>
                      <Badge className={`${selectedProspect.priority === 'high' ? 'bg-warning' : 'bg-secondary'} text-white`}>
                        {selectedProspect.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{selectedProspect.location}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProspect.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary">{interest}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button className="bg-gradient-primary hover:opacity-90">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                  <Button variant="outline">
                    View LinkedIn
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};