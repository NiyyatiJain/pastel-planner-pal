
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Trash } from "lucide-react";
import { useState } from "react";
import { Draggable } from "@/components/calendar/Draggable";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: Date;
  category: string;
  color: string;
  recurring: string;
}

interface TaskListProps {
  tasks: Task[];
  date: Date;
  onTaskDrop: (taskId: string, date: Date) => void;
}

export const TaskList = ({ tasks, date, onTaskDrop }: TaskListProps) => {
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No tasks for this day</p>
        <p className="text-sm">Drag tasks here or add a new one</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <Draggable key={task.id} id={task.id} data={{ taskId: task.id, date }}>
          <div 
            className={`p-2 rounded-md border ${task.color} bg-opacity-20 flex items-center gap-2 transition-all duration-200 hover:translate-x-1`}
            onMouseEnter={() => setHoveredTask(task.id)}
            onMouseLeave={() => setHoveredTask(null)}
          >
            <Checkbox id={`task-${task.id}`} checked={task.completed} />
            <label 
              htmlFor={`task-${task.id}`} 
              className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
            >
              {task.title}
            </label>
            <div className="flex items-center gap-1">
              {task.recurring !== "none" && (
                <span className="text-xs bg-gray-100 px-1 rounded">
                  {task.recurring === "daily" ? "Daily" : 
                   task.recurring === "weekly" ? "Weekly" : 
                   task.recurring === "mon-wed-fri" ? "M/W/F" : ""}
                </span>
              )}
              {hoveredTask === task.id && (
                <button className="text-red-500 p-1 rounded-full hover:bg-red-50">
                  <Trash className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        </Draggable>
      ))}
    </div>
  );
};
