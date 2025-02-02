import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const VisionBoard = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-xl shadow-lg">
      <h2 className="text-2xl font-quicksand font-bold text-gray-700 mb-4">Vision Board</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="aspect-square rounded-lg overflow-hidden">
            <img src={image} alt={`Vision ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
        <label className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-pink-300 transition-colors">
          <div className="flex flex-col items-center gap-2">
            <Upload className="text-gray-400" size={24} />
            <span className="text-sm text-gray-500">Upload Image</span>
          </div>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
      </div>
    </Card>
  );
};

export default VisionBoard;