import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

const MusicRecommendations = () => {
  const playlists = [
    { title: "Calm & Peaceful", mood: "relaxed", songs: ["Peaceful Piano", "Soft Ambient", "Nature Sounds"] },
    { title: "Happy Vibes", mood: "happy", songs: ["Upbeat Pop", "Feel Good Hits", "Summer Breeze"] },
    { title: "Focus Flow", mood: "focused", songs: ["Deep Focus", "Study Beats", "Concentration"] }
  ];

  return (
    <Card className="p-6 bg-gradient-to-r from-pastel-yellow to-pastel-peach rounded-xl shadow-lg">
      <h2 className="text-2xl font-quicksand font-bold text-gray-700 mb-4">Music For Your Mood</h2>
      <div className="space-y-4">
        {playlists.map((playlist, index) => (
          <div key={index} className="bg-white/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-quicksand font-semibold">{playlist.title}</h3>
              <Heart className="text-pink-400" size={20} />
            </div>
            <p className="text-sm text-gray-500 mb-2">Mood: {playlist.mood}</p>
            <ul className="text-sm text-gray-600 space-y-1">
              {playlist.songs.map((song, songIndex) => (
                <li key={songIndex} className="pl-4">• {song}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MusicRecommendations;