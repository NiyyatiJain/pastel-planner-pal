import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { analyzeImage } from "@/utils/imageAnalysis";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface VisionItem {
  imageUrl: string;
  goals: string[];
}

const VisionBoard = () => {
  const [items, setItems] = useState<VisionItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!apiKey) {
      toast.error("Please enter your Perplexity API key first");
      return;
    }

    try {
      setIsAnalyzing(true);
      
      // Convert image to base64 for analysis
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageUrl = reader.result as string;
        
        try {
          const goals = await analyzeImage(imageUrl, apiKey);
          setItems([...items, { imageUrl, goals }]);
          toast.success("Image analyzed successfully!");
        } catch (error) {
          console.error("Error analyzing image:", error);
          toast.error("Failed to analyze image. Please try again.");
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image. Please try again.");
      setIsAnalyzing(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-xl shadow-lg">
      <div className="space-y-4">
        <h2 className="text-2xl font-quicksand font-bold text-gray-700 mb-4">Vision Board</h2>
        
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Enter your Perplexity API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="max-w-md"
          />
          <p className="text-sm text-gray-500 mt-1">
            Get your API key from{" "}
            <a
              href="https://www.perplexity.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Perplexity AI
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <Card key={index} className="p-4 bg-white/80 rounded-lg shadow">
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img src={item.imageUrl} alt={`Vision ${index + 1}`} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700">Suggested Goals:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {item.goals.map((goal, goalIndex) => (
                    <li key={goalIndex} className="text-gray-600">{goal}</li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}

          <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-pink-300 transition-colors">
            <div className="flex flex-col items-center gap-2">
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                  <span className="text-sm text-gray-500">Analyzing...</span>
                </>
              ) : (
                <>
                  <Upload className="text-gray-400" size={24} />
                  <span className="text-sm text-gray-500">Upload Image</span>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isAnalyzing}
            />
          </label>
        </div>
      </div>
    </Card>
  );
};

export default VisionBoard;