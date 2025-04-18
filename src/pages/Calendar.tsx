
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalendarDayView from "@/components/calendar/CalendarDayView";
import CalendarWeekView from "@/components/calendar/CalendarWeekView";
import CalendarMonthView from "@/components/calendar/CalendarMonthView";
import { TaskList } from "@/components/calendar/TaskList";
import { CalendarViewSelector } from "@/components/calendar/CalendarViewSelector";
import { Button } from "@/components/ui/button";
import { Mic, Plus, Calendar as CalendarIcon } from "lucide-react";
import { addDays, format, isSameDay } from "date-fns";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { MoodTracker } from "@/components/calendar/MoodTracker";
import { ReflectionPrompt } from "@/components/calendar/ReflectionPrompt";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedView, setSelectedView] = useState<"day" | "week" | "month">("day");
  
  // Sample task data
  const [tasks, setTasks] = useState([
    { 
      id: "1", 
      title: "Morning Meditation", 
      completed: false, 
      date: new Date(), 
      category: "Health",
      color: "bg-pastel-blue",
      recurring: "daily"
    },
    { 
      id: "2", 
      title: "Team Meeting", 
      completed: false, 
      date: new Date(),
      category: "Career",
      color: "bg-pastel-purple",
      recurring: "none"
    },
    { 
      id: "3", 
      title: "Gym Workout", 
      completed: false, 
      date: addDays(new Date(), 1),
      category: "Health",
      color: "bg-pastel-green",
      recurring: "mon-wed-fri"
    },
  ]);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const filteredTasks = tasks.filter(task => 
    isSameDay(task.date, selectedDate)
  );

  // Function to handle drag and drop of tasks
  const handleTaskDrop = (taskId: string, newDate: Date) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, date: newDate } : task
    ));
  };

  const addNewTask = () => {
    const newTask = { 
      id: String(tasks.length + 1), 
      title: "New Task", 
      completed: false, 
      date: selectedDate,
      category: "Personal",
      color: "bg-pastel-pink",
      recurring: "none"
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="grid md:grid-cols-7 gap-4 h-full">
      {/* Left sidebar */}
      <Card className="md:col-span-2 h-full">
        <CardContent className="p-4 flex flex-col h-full space-y-4">
          <CalendarHeader 
            selectedDate={selectedDate} 
            onDateChange={handleDateChange}
          />
          <Separator className="my-2" />
          
          <div className="mb-4 overflow-hidden"> {/* Added overflow-hidden to prevent spillover */}
            <CalendarComponent 
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              className="rounded-md border"
              classNames={{
                month: "w-full", // Ensure full width
                caption: "flex justify-center items-center mb-2", // Added margin bottom
                head_row: "flex justify-between mb-1", // Added margin between header and days
                cell: "p-1 text-center", // Reduced padding
                day: "w-full h-full flex items-center justify-center", // Centered digits
              }}
            />
          </div>
          
          <div className="mb-4">
            <CalendarViewSelector 
              selectedView={selectedView} 
              onViewChange={setSelectedView} 
            />
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Tasks for {format(selectedDate, "MMM d")}</h3>
            <div className="flex justify-between items-center mb-3">
              <Button variant="outline" size="sm" onClick={addNewTask} className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Add Task</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Mic className="h-4 w-4" />
                <span>Voice</span>
              </Button>
            </div>
            <TaskList tasks={filteredTasks} date={selectedDate} onTaskDrop={handleTaskDrop} />
          </div>

          <div className="mt-auto">
            <MoodTracker date={selectedDate} />
          </div>
        </CardContent>
      </Card>

      {/* Main calendar area */}
      <Card className="md:col-span-5 h-full">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-primary" />
              <span>Zenith Planner</span>
            </h2>
            <div className="flex gap-2">
              {["Health", "Career", "Personal", "Relationships"].map(category => (
                <Badge key={category} className={`bg-pastel-${category.toLowerCase() === 'health' ? 'green' : category.toLowerCase() === 'career' ? 'purple' : category.toLowerCase() === 'personal' ? 'pink' : 'yellow'}`}>
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          <Tabs defaultValue={selectedView} className="flex-1" onValueChange={(value) => setSelectedView(value as "day" | "week" | "month")}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
            <TabsContent value="day" className="flex-1 overflow-auto">
              <CalendarDayView 
                selectedDate={selectedDate} 
                tasks={tasks.filter(task => isSameDay(task.date, selectedDate))} 
                onTaskDrop={handleTaskDrop}
              />
            </TabsContent>
            <TabsContent value="week" className="flex-1 overflow-auto">
              <CalendarWeekView 
                selectedDate={selectedDate} 
                tasks={tasks} 
                onTaskDrop={handleTaskDrop}
              />
            </TabsContent>
            <TabsContent value="month" className="flex-1 overflow-auto">
              <CalendarMonthView 
                selectedDate={selectedDate} 
                tasks={tasks} 
                onTaskDrop={handleTaskDrop}
                onDateSelect={handleDateChange}
              />
            </TabsContent>
          </Tabs>

          <Separator className="my-4" />
          
          <ReflectionPrompt date={selectedDate} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage;
