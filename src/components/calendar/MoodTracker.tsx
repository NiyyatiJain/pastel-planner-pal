
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { SmilePlus, Frown, Meh, Smile } from "lucide-react";

interface MoodTrackerProps {
  date: Date;
}

export const MoodTracker = ({ date }: MoodTrackerProps) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const moods = [
    { name: "Happy", icon: Smile, color: "text-green-500 hover:bg-green-50" },
    { name: "Neutral", icon: Meh, color: "text-amber-500 hover:bg-amber-50" },
    { name: "Sad", icon: Frown, color: "text-blue-500 hover:bg-blue-50" },
  ];

  return (
    <div className="rounded-md border p-3 bg-gradient-to-r from-pastel-blue to-pastel-purple bg-opacity-20">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">How are you feeling today?</h3>
        <SmilePlus className="h-4 w-4 text-purple-500" />
      </div>
      
      <p className="text-xs text-gray-500 mb-3">
        Track your mood for {format(date, "MMMM d")}
      </p>
      
      <div className="flex justify-between items-center gap-2">
        {moods.map((mood) => (
          <Button
            key={mood.name}
            variant="ghost"
            className={`flex-1 flex flex-col items-center gap-1 ${mood.color} ${
              selectedMood === mood.name ? "ring-2 ring-offset-1 ring-primary" : ""
            }`}
            onClick={() => setSelectedMood(mood.name)}
          >
            <mood.icon className="h-5 w-5" />
            <span className="text-xs">{mood.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
