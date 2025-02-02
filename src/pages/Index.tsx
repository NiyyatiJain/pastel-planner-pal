import DailyOverview from "@/components/DailyOverview";
import VoiceJournal from "@/components/VoiceJournal";
import VisionBoard from "@/components/VisionBoard";
import Challenges from "@/components/Challenges";
import MusicRecommendations from "@/components/MusicRecommendations";
import PinterestBoard from "@/components/PinterestBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Star, Music, Image, Mic, Trophy } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink via-white to-pastel-purple p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-quicksand font-bold text-gray-700 text-center mb-8">
          My Daily Planner
        </h1>
        
        <DailyOverview />
        
        <Tabs defaultValue="journal" className="w-full">
          <TabsList className="w-full grid grid-cols-3 md:grid-cols-6 bg-white/50">
            <TabsTrigger value="journal" className="flex items-center gap-2">
              <Mic className="w-4 h-4" />
              <span className="hidden md:inline">Journal</span>
            </TabsTrigger>
            <TabsTrigger value="vision" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              <span className="hidden md:inline">Vision</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span className="hidden md:inline">Goals</span>
            </TabsTrigger>
            <TabsTrigger value="pinterest" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden md:inline">Pinterest</span>
            </TabsTrigger>
            <TabsTrigger value="music" className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              <span className="hidden md:inline">Music</span>
            </TabsTrigger>
            <TabsTrigger value="mood" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span className="hidden md:inline">Mood</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="journal" className="mt-4">
            <VoiceJournal />
          </TabsContent>

          <TabsContent value="vision" className="mt-4">
            <VisionBoard />
          </TabsContent>

          <TabsContent value="challenges" className="mt-4">
            <Challenges />
          </TabsContent>

          <TabsContent value="pinterest" className="mt-4">
            <PinterestBoard />
          </TabsContent>

          <TabsContent value="music" className="mt-4">
            <MusicRecommendations />
          </TabsContent>

          <TabsContent value="mood" className="mt-4">
            <div className="grid gap-4">
              <DailyOverview />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;