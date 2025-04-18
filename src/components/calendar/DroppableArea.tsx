
import { useState } from "react";

interface DroppableAreaProps {
  onDrop: (data: any) => void;
  children: React.ReactNode;
  className?: string;
}

export const DroppableArea = ({ onDrop, children, className = "" }: DroppableAreaProps) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isOver) {
      setIsOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    
    try {
      const data = JSON.parse(e.dataTransfer.getData("text/plain"));
      onDrop(data);
    } catch (error) {
      console.error("Failed to parse dropped data:", error);
    }
  };

  return (
    <div
      className={`${className} ${isOver ? "bg-primary/10 border-2 border-dashed border-primary" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};
