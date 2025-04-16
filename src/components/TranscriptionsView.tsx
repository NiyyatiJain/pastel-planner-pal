
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Trash2, Copy, Calendar } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import TranscriptionWindow from "./TranscriptionWindow";

// Update the interface name to match the new branding
export interface EchoEntry {
  id: string;
  text: string;
  date: Date;
  audioUrl: string;
}

const EchoEntriesView = () => {
  const [echoEntries, setEchoEntries] = useState<EchoEntry[]>([]);
  const [selectedEchoEntry, setSelectedEchoEntry] = useState<EchoEntry | null>(null);
  const [transcriptionOpen, setTranscriptionOpen] = useState(false);
  const { toast } = useToast();

  // Update localStorage key to match new branding
  useEffect(() => {
    const savedEchoEntries = localStorage.getItem("echoEntries");
    if (savedEchoEntries) {
      try {
        const parsed = JSON.parse(savedEchoEntries);
        const withDates = parsed.map((t: any) => ({
          ...t,
          date: new Date(t.date)
        }));
        setEchoEntries(withDates);
      } catch (error) {
        console.error("Error loading echo entries:", error);
      }
    }
  }, []);

  const handleDeleteEchoEntry = (id: string) => {
    const updatedEchoEntries = echoEntries.filter((t) => t.id !== id);
    setEchoEntries(updatedEchoEntries);
    localStorage.setItem("echoEntries", JSON.stringify(updatedEchoEntries));
    
    toast({
      title: "Echo Entry deleted",
      description: "The echo entry has been removed from your journal",
    });
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Echo entry text copied to clipboard"
    });
  };

  const openEchoEntryDetails = (echoEntry: EchoEntry) => {
    setSelectedEchoEntry(echoEntry);
    setTranscriptionOpen(true);
  };

  return (
    <>
      <Card className="p-6 bg-gradient-to-r from-pastel-blue to-pastel-green rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-quicksand font-bold text-gray-700">Echo Entries</h2>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-600" />
            <span className="text-sm text-gray-600 font-medium">
              {format(new Date(), "MMMM d, yyyy")}
            </span>
          </div>
        </div>

        {echoEntries.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 bg-white/30 rounded-lg">
            <FileText className="h-12 w-12 text-gray-400 mb-3" />
            <p className="text-gray-600 text-center">No Echo Entries saved yet</p>
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
                {echoEntries.map((echoEntry) => (
                  <TableRow key={echoEntry.id}>
                    <TableCell className="font-medium">
                      {format(echoEntry.date, "MMM d, yyyy - h:mm a")}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[300px] truncate">
                        {echoEntry.text.substring(0, 100)}
                        {echoEntry.text.length > 100 ? "..." : ""}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCopyToClipboard(echoEntry.text)}
                          className="h-8 px-2"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEchoEntryDetails(echoEntry)}
                          className="h-8 px-2 bg-pastel-pink/20 hover:bg-pastel-pink/30"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteEchoEntry(echoEntry.id)}
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

      {selectedEchoEntry && (
        <TranscriptionWindow 
          open={transcriptionOpen} 
          onOpenChange={setTranscriptionOpen}
          audioUrl={selectedEchoEntry.audioUrl} 
          initialTranscription={selectedEchoEntry.text}
        />
      )}
    </>
  );
};

export default EchoEntriesView;
