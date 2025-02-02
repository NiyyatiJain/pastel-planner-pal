import DailyOverview from "@/components/DailyOverview";
import VoiceJournal from "@/components/VoiceJournal";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink via-white to-pastel-purple p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-quicksand font-bold text-gray-700 text-center mb-8">
          My Daily Planner
        </h1>
        <DailyOverview />
        <VoiceJournal />
      </div>
    </div>
  );
};

export default Index;