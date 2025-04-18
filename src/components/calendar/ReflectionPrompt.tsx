
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BookMarked } from "lucide-react";

interface ReflectionPromptProps {
  date: Date;
}

export const ReflectionPrompt = ({ date }: ReflectionPromptProps) => {
  return (
    <div className="rounded-md border p-3 bg-gradient-to-r from-pastel-green to-pastel-blue bg-opacity-20">
      <div className="flex items-center gap-2 mb-2">
        <BookMarked className="h-5 w-5 text-green-600" />
        <h3 className="font-medium">Daily Reflection</h3>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">
        Reflect on your day of {format(date, "MMMM d")}. What went well? What can you improve tomorrow?
      </p>
      
      <Textarea 
        placeholder="Write your reflections here..."
        className="mb-3 min-h-[100px] bg-white/80"
      />
      
      <div className="flex justify-end">
        <Button size="sm">Save Reflection</Button>
      </div>
    </div>
  );
};
