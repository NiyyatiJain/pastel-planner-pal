
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ListTodo } from "lucide-react";

interface CalendarViewSelectorProps {
  selectedView: "day" | "week" | "month";
  onViewChange: (view: "day" | "week" | "month") => void;
}

export const CalendarViewSelector = ({ selectedView, onViewChange }: CalendarViewSelectorProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium mb-2">View Options</h3>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={selectedView === "day" ? "default" : "outline"} 
          size="sm"
          onClick={() => onViewChange("day")}
          className="flex items-center gap-1"
        >
          <Clock className="h-4 w-4" />
          <span>Day</span>
        </Button>
        <Button 
          variant={selectedView === "week" ? "default" : "outline"}
          size="sm" 
          onClick={() => onViewChange("week")}
          className="flex items-center gap-1"
        >
          <ListTodo className="h-4 w-4" />
          <span>Week</span>
        </Button>
        <Button 
          variant={selectedView === "month" ? "default" : "outline"}
          size="sm" 
          onClick={() => onViewChange("month")}
          className="flex items-center gap-1"
        >
          <Calendar className="h-4 w-4" />
          <span>Month</span>
        </Button>
      </div>
    </div>
  );
};
