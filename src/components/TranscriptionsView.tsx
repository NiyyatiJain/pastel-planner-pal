
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Trash2, Copy, Calendar } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import TranscriptionWindow from "./TranscriptionWindow";

// Define the transcription type
export interface Transcription {
  id: string;
  text: string;
  date: Date;
  audioUrl: string;
}

const TranscriptionsView = () => {
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const [selectedTranscription, setSelectedTranscription] = useState<Transcription | null>(null);
  const [transcriptionOpen, setTranscriptionOpen] = useState(false);
  const { toast } = useToast();

  // Load transcriptions from localStorage on component mount
  useEffect(() => {
    const savedTranscriptions = localStorage.getItem("transcriptions");
    if (savedTranscriptions) {
      try {
        // Parse dates properly when loading from localStorage
        const parsed = JSON.parse(savedTranscriptions);
        const withDates = parsed.map((t: any) => ({
          ...t,
          date: new Date(t.date)
        }));
        setTranscriptions(withDates);
      } catch (error) {
        console.error("Error loading transcriptions:", error);
      }
    }
  }, []);

  const handleDeleteTranscription = (id: string) => {
    const updatedTranscriptions = transcriptions.filter((t) => t.id !== id);
    setTranscriptions(updatedTranscriptions);
    localStorage.setItem("transcriptions", JSON.stringify(updatedTranscriptions));
    
    toast({
      title: "Transcription deleted",
      description: "The transcription has been removed from your journal",
    });
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Transcription text copied to clipboard"
    });
  };

  const openTranscriptionDetails = (transcription: Transcription) => {
    setSelectedTranscription(transcription);
    setTranscriptionOpen(true);
  };

  return (
    <>
      <Card className="p-6 bg-gradient-to-r from-pastel-blue to-pastel-green rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-quicksand font-bold text-gray-700">Saved Transcriptions</h2>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            <span className="text-sm text-gray-600 font-medium">
              {format(new Date(), "MMMM d, yyyy")}
            </span>
          </div>
        </div>

        {transcriptions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 bg-white/30 rounded-lg">
            <FileText className="h-12 w-12 text-gray-400 mb-3" />
            <p className="text-gray-600 text-center">No transcriptions saved yet</p>
            <p className="text-gray-500 text-sm text-center mt-2">
              Transcribed voice entries will appear here
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Preview</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transcriptions.map((transcription) => (
                  <TableRow key={transcription.id}>
                    <TableCell className="font-medium">
                      {format(transcription.date, "MMM d, yyyy - h:mm a")}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[300px] truncate">
                        {transcription.text.substring(0, 100)}
                        {transcription.text.length > 100 ? "..." : ""}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCopyToClipboard(transcription.text)}
                          className="h-8 px-2"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openTranscriptionDetails(transcription)}
                          className="h-8 px-2 bg-pastel-pink/20 hover:bg-pastel-pink/30"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteTranscription(transcription.id)}
                          className="h-8 px-2 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </Card>

      {selectedTranscription && (
        <TranscriptionWindow 
          open={transcriptionOpen} 
          onOpenChange={setTranscriptionOpen}
          audioUrl={selectedTranscription.audioUrl} 
          initialTranscription={selectedTranscription.text}
        />
      )}
    </>
  );
};

export default TranscriptionsView;
