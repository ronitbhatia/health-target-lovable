import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Prospect } from "./Dashboard";
import { MapPin, Building, Star, Calendar, MessageCircle, CheckCircle } from "lucide-react";

interface ProspectCardProps {
  prospect: Prospect;
  onClick: () => void;
}

export const ProspectCard = ({ prospect, onClick }: ProspectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-gray-500";
      case "contacted": return "bg-healthcare-blue";
      case "responded": return "bg-warning";
      case "meeting_scheduled": return "bg-success";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "contacted": return <MessageCircle className="w-3 h-3" />;
      case "responded": return <MessageCircle className="w-3 h-3" />;
      case "meeting_scheduled": return <CheckCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-warning";
      case "medium": return "text-healthcare-blue";
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  return (
    <Card 
      className="group hover:shadow-glow transition-all duration-300 cursor-pointer border-0 bg-gradient-card"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="relative">
              <img 
                src={prospect.avatar} 
                alt={prospect.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getStatusColor(prospect.status)} flex items-center justify-center`}>
                {getStatusIcon(prospect.status) && (
                  <div className="text-white">
                    {getStatusIcon(prospect.status)}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm group-hover:text-healthcare-blue transition-colors">
                {prospect.name}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {prospect.title}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className={`w-4 h-4 ${getPriorityColor(prospect.priority)}`} />
            <span className="text-xs font-medium">{prospect.score}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Building className="w-3 h-3" />
            <span className="truncate">{prospect.company}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span>{prospect.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {prospect.interests.slice(0, 2).map((interest, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs px-2 py-0 h-5"
            >
              {interest}
            </Badge>
          ))}
          {prospect.interests.length > 2 && (
            <Badge variant="outline" className="text-xs px-2 py-0 h-5">
              +{prospect.interests.length - 2}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <Badge 
            className={`${getStatusColor(prospect.status)} text-white text-xs capitalize`}
          >
            {prospect.status.replace('_', ' ')}
          </Badge>
          
          {prospect.status === "responded" && (
            <Button 
              size="sm" 
              className="h-7 text-xs bg-gradient-primary hover:opacity-90"
              onClick={(e) => {
                e.stopPropagation();
                // Handle meeting scheduling
              }}
            >
              <Calendar className="w-3 h-3 mr-1" />
              Schedule
            </Button>
          )}
          
          {prospect.status === "meeting_scheduled" && (
            <Badge className="bg-success text-white text-xs">
              <CheckCircle className="w-3 h-3 mr-1" />
              Booked
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};