import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";

const VoiceJournal = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<string[]>([]);

  const startRecording = () => {
    setIsRecording(true);
    // Implement actual recording logic here
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordings([...recordings, new Date().toLocaleString()]);
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-pastel-blue to-pastel-green rounded-xl shadow-lg">
      <h2 className="text-2xl font-quicksand font-bold text-gray-700 mb-4">Voice Journal</h2>
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <Button
            onClick={isRecording ? stopRecording : startRecording}
            className={`rounded-full p-6 ${
              isRecording ? "bg-red-400 hover:bg-red-500" : "bg-pastel-pink hover:bg-pink-200"
            }`}
          >
            {isRecording ? <Square size={24} /> : <Mic size={24} />}
          </Button>
        </div>
        <div className="space-y-2">
          {recordings.map((timestamp, index) => (
            <div key={index} className="bg-white/50 p-3 rounded-lg flex justify-between items-center">
              <span className="font-quicksand">Recording {index + 1}</span>
              <span className="text-sm text-gray-500">{timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default VoiceJournal;