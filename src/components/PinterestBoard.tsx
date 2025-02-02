import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const PinterestBoard = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handlePinterestConnect = () => {
    // Pinterest OAuth flow would go here
    window.open("https://www.pinterest.com/oauth/", "_blank");
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-pastel-pink to-pastel-purple rounded-xl shadow-lg">
      <h2 className="text-2xl font-quicksand font-bold text-gray-700 mb-4">Pinterest Inspiration</h2>
      <div className="space-y-4">
        {!isConnected ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Connect your Pinterest account to sync your inspiration boards!</p>
            <Button 
              onClick={handlePinterestConnect}
              className="bg-red-500 hover:bg-red-600"
            >
              Connect Pinterest
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {/* Pinterest boards would be displayed here */}
            <div className="bg-white/50 p-4 rounded-lg">
              <p className="text-gray-600">Your Pinterest boards will appear here</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PinterestBoard;