import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Square, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import TranscriptionWindow from "./TranscriptionWindow";

const VoiceJournal = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<string[]>([]);
  const [transcriptionOpen, setTranscriptionOpen] = useState(false);
  const [selectedRecording, setSelectedRecording] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordings((prev) => [...prev, audioUrl]);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Your voice journal entry is being recorded",
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast({
        title: "Recording saved",
        description: "Your voice journal entry has been saved",
      });
    }
  };

  const openTranscriptionWindow = (audioUrl: string) => {
    setSelectedRecording(audioUrl);
    setTranscriptionOpen(true);
  };

  return (
    <>
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
            {recordings.map((audioUrl, index) => (
              <div key={index} className="bg-white/50 p-3 rounded-lg flex justify-between items-center">
                <span className="font-quicksand">Recording {index + 1}</span>
                <div className="flex items-center gap-2">
                  <audio controls src={audioUrl} className="h-8" />
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1 bg-white/70 hover:bg-pastel-pink/50"
                    onClick={() => openTranscriptionWindow(audioUrl)}
                  >
                    <FileText size={14} />
                    <span className="hidden sm:inline">Transcribe</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <TranscriptionWindow 
        open={transcriptionOpen} 
        onOpenChange={setTranscriptionOpen}
        audioUrl={selectedRecording} 
      />
    </>
  );
};

export default VoiceJournal;
