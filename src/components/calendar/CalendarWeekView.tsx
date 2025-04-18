
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { DroppableArea } from "./DroppableArea";
import { Badge } from "@/components/ui/badge";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: Date;
  category: string;
  color: string;
  recurring: string;
}

interface CalendarWeekViewProps {
  selectedDate: Date;
  tasks: Task[];
  onTaskDrop: (taskId: string, date: Date) => void;
}

export default function CalendarWeekView({ selectedDate, tasks, onTaskDrop }: CalendarWeekViewProps) {
  // Create a week view starting from Sunday
  const startDate = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const handleDropOnDay = (day: Date, data: { taskId: string }) => {
    const newDate = new Date(day);
    onTaskDrop(data.taskId, newDate);
  };

  // Filter tasks for a specific day
  const getTasksForDay = (day: Date) => {
    return tasks.filter(task => isSameDay(new Date(task.date), day));
  };

  return (
    <div className="grid grid-cols-7 gap-2 h-full">
      {weekDays.map((day, index) => {
        const dayTasks = getTasksForDay(day);
        const isSelected = isSameDay(day, selectedDate);
        
        return (
          <div key={index} className="flex flex-col h-full">
            <div className={`text-center p-2 font-medium ${
              isSelected ? "bg-primary text-primary-foreground rounded-t-md" : 
              "bg-muted"
            }`}>
              <div>{format(day, "EEE")}</div>
              <div className={`text-2xl ${isSelected ? "font-bold" : ""}`}>
                {format(day, "d")}
              </div>
            </div>
            
            <DroppableArea 
              onDrop={(data) => handleDropOnDay(day, data)}
              className={`flex-1 overflow-auto p-2 ${
                isSelected ? "bg-primary/10 border border-primary rounded-b-md" : 
                "bg-white border border-gray-200 rounded-b-md"
              }`}
            >
              {dayTasks.length > 0 ? (
                <div className="space-y-2">
                  {dayTasks.map(task => (
                    <div 
                      key={task.id} 
                      className={`p-2 rounded-md ${task.color} bg-opacity-30 text-sm transition-all duration-200 hover:translate-x-1 border border-opacity-30`}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`${task.completed ? 'line-through text-gray-500' : ''} truncate`}>
                          {task.title}
                        </span>
                        <Badge className={`${task.color} text-xs`} variant="outline">
                          {task.category.charAt(0)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-400 text-xs">
                  Drop tasks here
                </div>
              )}
            </DroppableArea>
          </div>
        );
      })}
    </div>
  );
}
