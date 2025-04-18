
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  isSameDay, 
  isSameMonth, 
  eachDayOfInterval, 
  addDays, 
  startOfWeek, 
  endOfWeek 
} from "date-fns";
import { DroppableArea } from "./DroppableArea";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: Date;
  category: string;
  color: string;
  recurring: string;
}

interface CalendarMonthViewProps {
  selectedDate: Date;
  tasks: Task[];
  onTaskDrop: (taskId: string, date: Date) => void;
  onDateSelect: (date: Date) => void;
}

export default function CalendarMonthView({ selectedDate, tasks, onTaskDrop, onDateSelect }: CalendarMonthViewProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  // Create weeks array from days
  const weeks = [];
  let week = [];
  
  for (let i = 0; i < days.length; i++) {
    week.push(days[i]);
    
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  
  const handleDropOnDay = (day: Date, data: { taskId: string }) => {
    const newDate = new Date(day);
    onTaskDrop(data.taskId, newDate);
  };

  // Get tasks for a specific day
  const getTasksForDay = (day: Date) => {
    return tasks.filter(task => isSameDay(new Date(task.date), day));
  };

  // Function to render task summary for a day
  const renderDayTasks = (day: Date) => {
    const dayTasks = getTasksForDay(day);
    
    if (dayTasks.length === 0) return null;
    
    return (
      <div className="mt-1 space-y-1 max-h-[80px] overflow-hidden">
        {dayTasks.slice(0, 3).map((task, index) => (
          <div 
            key={index} 
            className={`px-1 py-0.5 text-xs rounded ${task.color} bg-opacity-30 truncate ${task.completed ? 'line-through opacity-50' : ''}`}
          >
            {task.title}
          </div>
        ))}
        {dayTasks.length > 3 && (
          <div className="text-xs text-center text-gray-500">
            +{dayTasks.length - 3} more
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full">
      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
          <div key={i} className="text-center font-medium text-sm py-2 bg-muted rounded">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-rows-6 gap-1 h-[calc(100%-3rem)]">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1 h-full">
            {week.map((day, dayIndex) => {
              const isCurrentMonth = isSameMonth(day, monthStart);
              const isSelected = isSameDay(day, selectedDate);
              const isToday = isSameDay(day, new Date());
              
              return (
                <DroppableArea 
                  key={dayIndex}
                  onDrop={(data) => handleDropOnDay(day, data)}
                  className={`p-1 h-full rounded-md border ${
                    !isCurrentMonth ? "bg-gray-50 text-gray-400" :
                    isSelected ? "bg-primary/10 border-primary" :
                    isToday ? "bg-amber-50 border-amber-200" :
                    "bg-white hover:bg-gray-50"
                  }`}
                >
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onDateSelect(day)}
                    className={`h-6 w-6 p-0 mb-1 font-normal ${
                      isSelected ? "bg-primary text-primary-foreground" :
                      isToday ? "bg-amber-200 text-amber-900" : ""
                    }`}
                  >
                    {format(day, "d")}
                  </Button>
                  
                  {renderDayTasks(day)}
                </DroppableArea>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
