import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const Challenges = () => {
  const challenges = [
    { title: "Gratitude Journal", description: "Write down 3 things you're grateful for each day", duration: "7 days" },
    { title: "Morning Routine", description: "Establish a consistent morning routine", duration: "30 days" },
    { title: "Mindfulness", description: "Practice 10 minutes of mindfulness daily", duration: "21 days" }
  ];

  return (
    <Card className="p-6 bg-gradient-to-r from-pastel-blue to-pastel-green rounded-xl shadow-lg">
      <h2 className="text-2xl font-quicksand font-bold text-gray-700 mb-4">Daily Challenges</h2>
      <div className="space-y-4">
        {challenges.map((challenge, index) => (
          <div key={index} className="bg-white/50 p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="font-quicksand font-semibold flex items-center gap-2">
                <Star className="text-yellow-400" size={20} />
                {challenge.title}
              </h3>
              <p className="text-sm text-gray-600">{challenge.description}</p>
              <span className="text-xs text-pink-500">{challenge.duration}</span>
            </div>
            <Button variant="outline" className="bg-white hover:bg-pink-50">
              Join Challenge
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Challenges;