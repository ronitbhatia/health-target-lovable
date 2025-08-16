import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Prospect } from "./Dashboard";
import { Calendar, Clock, MapPin, Video, User, CheckCircle, Plus } from "lucide-react";

interface MeetingSchedulerProps {
  prospects: Prospect[];
  conferenceDate: string;
}

interface Meeting {
  id: string;
  prospect: Prospect;
  date: string;
  time: string;
  duration: number;
  type: "in-person" | "video" | "phone";
  location?: string;
  status: "confirmed" | "pending" | "cancelled";
  notes?: string;
}

const mockMeetings: Meeting[] = [
  {
    id: "1",
    prospect: {
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
      status: "meeting_scheduled"
    },
    date: "2024-03-15",
    time: "10:00 AM",
    duration: 30,
    type: "in-person",
    location: "Conference Center - Room A",
    status: "confirmed",
    notes: "Interested in our EHR integration solutions"
  },
  {
    id: "2", 
    prospect: {
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
    },
    date: "2024-03-15",
    time: "2:30 PM", 
    duration: 45,
    type: "video",
    status: "confirmed",
    notes: "Follow-up on telemedicine platform discussion"
  }
];

export const MeetingScheduler = ({ prospects, conferenceDate }: MeetingSchedulerProps) => {
  const [meetings] = useState<Meeting[]>(mockMeetings);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "in-person": return <MapPin className="w-4 h-4" />;
      case "video": return <Video className="w-4 h-4" />;
      case "phone": return <User className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "in-person": return "bg-success";
      case "video": return "bg-healthcare-blue";
      case "phone": return "bg-warning";
      default: return "bg-secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Meeting Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed Meetings</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{meetings.filter(m => m.status === "confirmed").length}</div>
            <p className="text-xs text-muted-foreground">Ready for {conferenceDate}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Prospects</CardTitle>
            <User className="h-4 w-4 text-healthcare-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prospects.filter(p => p.status === "responded").length}</div>
            <p className="text-xs text-muted-foreground">Ready to schedule</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Meeting Hours</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{meetings.reduce((total, meeting) => total + meeting.duration, 0) / 60}h</div>
            <p className="text-xs text-muted-foreground">Across all meetings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confirmed Meetings */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-healthcare-blue" />
              <span>Confirmed Meetings</span>
            </CardTitle>
            <CardDescription>Your scheduled meetings for {conferenceDate}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="p-4 border rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={meeting.prospect.avatar} 
                      alt={meeting.prospect.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-sm">{meeting.prospect.name}</h4>
                      <p className="text-xs text-muted-foreground">{meeting.prospect.company}</p>
                    </div>
                  </div>
                  <Badge className={`${getTypeColor(meeting.type)} text-white text-xs`}>
                    <div className="flex items-center space-x-1">
                      {getTypeIcon(meeting.type)}
                      <span className="capitalize">{meeting.type.replace('-', ' ')}</span>
                    </div>
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{meeting.time} ({meeting.duration}min)</span>
                  </div>
                  {meeting.location && (
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{meeting.location}</span>
                    </div>
                  )}
                  {meeting.notes && (
                    <p className="text-xs text-muted-foreground italic">{meeting.notes}</p>
                  )}
                </div>
                
                <div className="flex justify-between items-center mt-3 pt-3 border-t">
                  <Badge className="bg-success text-white text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Confirmed
                  </Badge>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Reschedule
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 text-xs border-healthcare-blue text-healthcare-blue hover:bg-healthcare-blue hover:text-white">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {meetings.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No meetings scheduled yet</p>
                <p className="text-sm">Start scheduling meetings with your responded prospects</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Time Slots */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5 text-healthcare-blue" />
              <span>Schedule New Meeting</span>
            </CardTitle>
            <CardDescription>Available time slots for {conferenceDate}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Available Prospects</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {prospects.filter(p => p.status === "responded" && !meetings.find(m => m.prospect.id === p.id)).map((prospect) => (
                    <div key={prospect.id} className="flex items-center justify-between p-2 border rounded bg-white/50">
                      <div className="flex items-center space-x-2">
                        <img 
                          src={prospect.avatar} 
                          alt={prospect.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium">{prospect.name}</span>
                        <Badge variant="outline" className="text-xs">
                          Score: {prospect.score}
                        </Badge>
                      </div>
                      <Button size="sm" className="h-6 text-xs bg-gradient-primary hover:opacity-90">
                        Schedule
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Available Time Slots</h4>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => {
                    const isBooked = meetings.some(m => m.time === time);
                    return (
                      <Button
                        key={time}
                        variant={selectedTimeSlot === time ? "default" : "outline"}
                        size="sm"
                        disabled={isBooked}
                        className={`h-8 text-xs ${
                          selectedTimeSlot === time 
                            ? "bg-gradient-primary hover:opacity-90" 
                            : isBooked 
                              ? "opacity-50 cursor-not-allowed"
                              : "border-healthcare-blue text-healthcare-blue hover:bg-healthcare-blue hover:text-white"
                        }`}
                        onClick={() => setSelectedTimeSlot(isBooked ? null : time)}
                      >
                        {time}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90"
                  disabled={!selectedTimeSlot}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};