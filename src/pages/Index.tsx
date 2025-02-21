
import DailyOverview from "@/components/DailyOverview";
import VoiceJournal from "@/components/VoiceJournal";
import VisionBoard from "@/components/VisionBoard";
import Challenges from "@/components/Challenges";
import MusicRecommendations from "@/components/MusicRecommendations";
import PinterestBoard from "@/components/PinterestBoard";
import ChatBot from "@/components/ChatBot";
import ThemeSelector from "@/components/ThemeSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Star, Music, Image, Mic, Trophy, MessageCircle } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [currentTheme, setCurrentTheme] = useState({
    from: "from-[#FF8FAB]",
    via: "via-[#FFC2D4]",
    to: "to-[#FFE5EC]",
  });

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.from} ${currentTheme.via} ${currentTheme.to} p-6 transition-colors duration-700`}>
      <ThemeSelector onThemeChange={setCurrentTheme} />
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-quicksand font-bold text-gray-700 text-center mb-8">
          My Daily Planner
        </h1>
        
        <DailyOverview />
        
        <Tabs defaultValue="journal" className="w-full">
          <TabsList className="w-full grid grid-cols-3 md:grid-cols-7 bg-white/50">
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
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden md:inline">Chat</span>
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

          <TabsContent value="chat" className="mt-4">
            <ChatBot />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
