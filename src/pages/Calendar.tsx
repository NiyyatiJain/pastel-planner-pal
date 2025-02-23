
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sun, Cloud, Coffee, Dumbbell, Flag, Cat, Timer, Mail, Package, Laptop, Plus } from "lucide-react";

interface Task {
  id: string;
  content: string;
  time?: string;
  icon?: string;
  color?: string;
}

interface CalendarDay {
  date: number;
  tasks: Task[];
}

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<number>(new Date().getDate());
  const [newTask, setNewTask] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string>("timer");
  const [calendar, setCalendar] = useState<CalendarDay[]>(
    Array.from({ length: 31 }, (_, i) => ({
      date: i + 1,
      tasks: i === new Date().getDate() - 1 ? [
        { id: "1", content: "Me time", color: "bg-pink-100" },
        { id: "2", content: "Work from home", icon: "laptop", color: "bg-purple-100" },
        { id: "3", content: "Coffee 10am", icon: "coffee", color: "bg-yellow-100" },
      ] : [],
    }))
  );

  const colors = [
    "bg-pink-100",
    "bg-purple-100",
    "bg-yellow-100",
    "bg-blue-100",
    "bg-green-100"
  ];

  const StickerIcon = ({ name }: { name: string }) => {
    const icons: { [key: string]: React.ReactNode } = {
      sun: <Sun className="w-5 h-5 text-yellow-500" />,
      cloud: <Cloud className="w-5 h-5 text-gray-400" />,
      coffee: <Coffee className="w-5 h-5 text-brown-500" />,
      gym: <Dumbbell className="w-5 h-5 text-blue-500" />,
      flag: <Flag className="w-5 h-5 text-red-400" />,
      cat: <Cat className="w-5 h-5 text-gray-600" />,
      timer: <Timer className="w-5 h-5 text-purple-500" />,
      mail: <Mail className="w-5 h-5 text-blue-400" />,
      package: <Package className="w-5 h-5 text-brown-400" />,
      laptop: <Laptop className="w-5 h-5 text-gray-500" />
    };
    return <>{icons[name]}</>;
  };

  const addTask = () => {
    if (newTask.trim() === "") return;

    const updatedCalendar = [...calendar];
    const dayIndex = selectedDate - 1;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    updatedCalendar[dayIndex].tasks.push({
      id: Date.now().toString(),
      content: newTask,
      icon: selectedIcon,
      color: randomColor
    });

    setCalendar(updatedCalendar);
    setNewTask("");
  };

  const removeTask = (taskId: string) => {
    const updatedCalendar = [...calendar];
    const dayIndex = selectedDate - 1;
    updatedCalendar[dayIndex].tasks = updatedCalendar[dayIndex].tasks.filter(
      task => task.id !== taskId
    );
    setCalendar(updatedCalendar);
  };

  const generateCalendarDays = () => {
    const days = [];
    const totalDays = 31;
    const firstDay = new Date(2023, 11, 1).getDay(); // December 2023

    // Add empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />);
    }

    // Add actual days
    for (let i = 1; i <= totalDays; i++) {
      const isSelected = i === selectedDate;
      const hasEvents = calendar[i - 1].tasks.length > 0;
      
      days.push(
        <button
          key={i}
          onClick={() => setSelectedDate(i)}
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm transition-colors
            ${isSelected ? 'bg-purple-500 text-white' : 'hover:bg-purple-100'}
            ${hasEvents ? 'font-bold' : ''}
          `}
        >
          {i}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-50 p-6">
      <Card className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Page */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-quicksand font-bold text-gray-700">
                December 2023
              </h2>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-pastel-pink animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-pastel-purple animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-pastel-blue animate-pulse"></div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white/50 p-4 rounded-lg">
              <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-600 mb-2">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {generateCalendarDays()}
              </div>
            </div>

            {/* Add Task Form */}
            <div className="bg-white/50 p-4 rounded-lg space-y-3">
              <h3 className="text-lg font-semibold text-gray-700">Add New Task</h3>
              <div className="flex gap-2">
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Enter task..."
                  className="flex-1"
                />
                <Button onClick={addTask} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {Object.keys(StickerIcon({name: ''}).props.icons).map((iconName) => (
                  <button
                    key={iconName}
                    onClick={() => setSelectedIcon(iconName)}
                    className={`p-2 rounded-lg transition-colors ${
                      selectedIcon === iconName ? 'bg-purple-100' : 'hover:bg-gray-100'
                    }`}
                  >
                    <StickerIcon name={iconName} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Page - Tasks List */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Tasks for December {selectedDate}
            </h3>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-2">
                {calendar[selectedDate - 1]?.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-lg ${task.color || 'bg-blue-100'} flex items-center gap-2 group`}
                  >
                    {task.icon && <StickerIcon name={task.icon} />}
                    <span className="text-gray-700">{task.content}</span>
                    {task.time && (
                      <span className="text-xs text-gray-500 ml-auto">{task.time}</span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 ml-auto"
                      onClick={() => removeTask(task.id)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Calendar;
