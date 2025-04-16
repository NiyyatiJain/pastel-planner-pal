
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Copy, Save, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TranscriptionWindowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  audioUrl: string | null;
}

const TranscriptionWindow = ({ open, onOpenChange, audioUrl }: TranscriptionWindowProps) => {
  const [transcription, setTranscription] = useState<string>("");
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [editedTranscription, setEditedTranscription] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // Mock transcription function (in a real app, this would use a speech-to-text API)
  const transcribeAudio = async () => {
    if (!audioUrl) return;
    
    setIsTranscribing(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, we would call a speech-to-text API here
      const mockTranscription = "This is a sample transcription of your voice journal entry. In a real implementation, this would be the actual text from your recording.";
      
      setTranscription(mockTranscription);
      setEditedTranscription(mockTranscription);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      toast({
        variant: "destructive",
        title: "Transcription failed",
        description: "There was an error transcribing your audio. Please try again."
      });
    } finally {
      setIsTranscribing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editedTranscription);
    toast({
      title: "Copied to clipboard",
      description: "Your transcription has been copied to clipboard"
    });
  };

  const saveTranscription = () => {
    // In a real app, we would save the transcription to a database
    toast({
      title: "Transcription saved",
      description: "Your transcription has been saved successfully"
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-pastel-pink" />
            Voice Journal Transcription
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {audioUrl && (
            <div className="flex justify-center mb-4">
              <audio 
                ref={audioRef} 
                src={audioUrl} 
                controls 
                className="w-full max-w-md rounded-lg"
              />
            </div>
          )}
          
          {!transcription && !isTranscribing && (
            <Button 
              onClick={transcribeAudio} 
              className="w-full bg-pastel-pink hover:bg-pink-300"
            >
              <FileText className="mr-2 h-4 w-4" />
              Transcribe Recording
            </Button>
          )}
          
          {isTranscribing && (
            <div className="flex flex-col items-center justify-center p-8">
              <Loader2 className="h-8 w-8 text-pastel-pink animate-spin mb-4" />
              <p className="text-gray-600">Transcribing your recording...</p>
            </div>
          )}
          
          {transcription && !isTranscribing && (
            <>
              <div className="space-y-2">
                <Label htmlFor="transcription">Transcription</Label>
                <Textarea
                  id="transcription"
                  value={editedTranscription}
                  onChange={(e) => setEditedTranscription(e.target.value)}
                  className="min-h-[150px] font-quicksand"
                  placeholder="Your transcribed text will appear here..."
                />
              </div>
              
              <div className="flex gap-3 justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className="flex items-center gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
                
                <Button 
                  size="sm" 
                  onClick={saveTranscription}
                  className="flex items-center gap-1 bg-pastel-pink hover:bg-pink-300"
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TranscriptionWindow;
