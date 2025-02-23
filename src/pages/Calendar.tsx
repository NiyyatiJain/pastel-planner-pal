
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sun, Cloud, Coffee, Dumbbell, Flag, Cat, Timer, Mail, Package, Laptop } from "lucide-react";

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
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Cleaning</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package className="w-4 h-4" />
                  <span>Collect parcel</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Timer className="w-4 h-4" />
                  <span>Me time</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Page */}
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-600">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {calendar[selectedDate - 1]?.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-lg ${task.color || 'bg-blue-100'} flex items-center gap-2`}
                  >
                    {task.icon && <StickerIcon name={task.icon} />}
                    <span className="text-gray-700">{task.content}</span>
                    {task.time && (
                      <span className="text-xs text-gray-500 ml-auto">{task.time}</span>
                    )}
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
