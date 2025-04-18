
import { format, addHours, isBefore } from "date-fns";
import { DroppableArea } from "./DroppableArea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Music, AlertCircle } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: Date;
  category: string;
  color: string;
  recurring: string;
}

interface CalendarDayViewProps {
  selectedDate: Date;
  tasks: Task[];
  onTaskDrop: (taskId: string, date: Date) => void;
}

export default function CalendarDayView({ selectedDate, tasks, onTaskDrop }: CalendarDayViewProps) {
  // Create time slots for the day (hourly)
  const startHour = 6; // 6 AM
  const endHour = 22; // 10 PM
  const timeSlots = [];
  
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(startHour, 0, 0, 0);
  
  for (let i = 0; i <= (endHour - startHour); i++) {
    const slotTime = addHours(startOfDay, i);
    timeSlots.push(slotTime);
  }

  const handleDropOnTimeSlot = (timeSlot: Date, data: { taskId: string }) => {
    const newDate = new Date(timeSlot);
    onTaskDrop(data.taskId, newDate);
  };

  // Function to check if a task belongs to a specific time slot
  const getTasksForTimeSlot = (timeSlot: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.date);
      const slotStartHour = timeSlot.getHours();
      return taskDate.getHours() === slotStartHour;
    });
  };

  const now = new Date();
  const isCurrentDay = selectedDate.toDateString() === now.toDateString();

  return (
    <div className="p-3 h-full overflow-auto">
      <div className="space-y-3">
        {timeSlots.map((timeSlot, index) => {
          const timeslotTasks = getTasksForTimeSlot(timeSlot);
          const isPast = isBefore(timeSlot, now) && isCurrentDay;
          const isCurrent = isCurrentDay && timeSlot.getHours() === now.getHours();
          
          return (
            <DroppableArea 
              key={index}
              onDrop={(data) => handleDropOnTimeSlot(timeSlot, data)}
              className={`rounded-md transition-all ${
                isCurrent ? "bg-primary/20 border border-primary" : 
                isPast ? "bg-gray-100" : "bg-white hover:bg-gray-50"
              }`}
            >
              <div className="p-3 min-h-[100px]">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium">{format(timeSlot, "h:00 a")}</span>
                  {isCurrent && (
                    <Badge variant="outline" className="bg-primary text-primary-foreground animate-pulse">
                      Current
                    </Badge>
                  )}
                </div>
                
                {timeslotTasks.length > 0 ? (
                  <div className="space-y-2">
                    {timeslotTasks.map(task => (
                      <div 
                        key={task.id} 
                        className={`p-2 rounded-md ${task.color} bg-opacity-30 border border-opacity-30 animate-fade-in`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.title}</span>
                          <div className="flex gap-1">
                            {task.category === "Focus" && (
                              <HoverCard>
                                <HoverCardTrigger>
                                  <Music className="h-4 w-4 text-indigo-500" />
                                </HoverCardTrigger>
                                <HoverCardContent className="w-60">
                                  <div className="space-y-2">
                                    <h3 className="font-medium">Focus Playlist</h3>
                                    <p className="text-sm text-muted-foreground">Deep Focus by Spotify</p>
                                  </div>
                                </HoverCardContent>
                              </HoverCard>
                            )}
                            {task.recurring !== "none" && (
                              <HoverCard>
                                <HoverCardTrigger>
                                  <AlertCircle className="h-4 w-4 text-amber-500" />
                                </HoverCardTrigger>
                                <HoverCardContent className="w-60">
                                  <div className="space-y-2">
                                    <h3 className="font-medium">Recurring Task</h3>
                                    <p className="text-sm text-muted-foreground">
                                      {task.recurring === "daily" ? "Repeats every day" : 
                                       task.recurring === "weekly" ? "Repeats every week" : 
                                       task.recurring === "mon-wed-fri" ? "Repeats on Mon/Wed/Fri" : ""}
                                    </p>
                                  </div>
                                </HoverCardContent>
                              </HoverCard>
                            )}
                            <Badge className={`${task.color} text-xs`}>{task.category}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-400 text-sm italic">
                    {isPast ? "No completed tasks" : "Drop a task here"}
                  </div>
                )}
              </div>
              {index < timeSlots.length - 1 && <Separator />}
            </DroppableArea>
          );
        })}
      </div>
    </div>
  );
}
