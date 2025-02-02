import { Card } from "@/components/ui/card";
import { Heart, Star, Cloud } from "lucide-react";
import { useState } from "react";

const DailyOverview = () => {
  const [mood, setMood] = useState<string>("happy");
  
  return (
    <Card className="p-6 bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-xl shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-quicksand font-bold text-gray-700">Today's Overview</h2>
          <div className="flex gap-2">
            <Heart className="text-pink-400 animate-float" size={24} />
            <Star className="text-yellow-400 animate-float" size={24} />
            <Cloud className="text-blue-400 animate-float" size={24} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/50 p-4 rounded-lg">
            <h3 className="font-quicksand font-semibold mb-2">Today's Mood</h3>
            <div className="flex gap-2">
              {["happy", "calm", "excited", "tired"].map((emotion) => (
                <button
                  key={emotion}
                  onClick={() => setMood(emotion)}
                  className={`p-2 rounded-full ${
                    mood === emotion ? "bg-pastel-pink" : "bg-white/70"
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-white/50 p-4 rounded-lg">
            <h3 className="font-quicksand font-semibold mb-2">Daily Affirmation</h3>
            <p className="text-gray-600 italic">"I am capable of amazing things"</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DailyOverview;