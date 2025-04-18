
import { useState, useRef, ReactNode } from "react";

interface DraggableProps {
  id: string;
  children: ReactNode;
  data: any;
}

export const Draggable = ({ id, children, data }: DraggableProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", JSON.stringify(data));
    
    if (dragRef.current) {
      // Create a ghost image for dragging
      const rect = dragRef.current.getBoundingClientRect();
      const ghostElement = dragRef.current.cloneNode(true) as HTMLDivElement;
      
      // Add styling to the ghost element
      ghostElement.style.position = "absolute";
      ghostElement.style.top = "-1000px";
      ghostElement.style.opacity = "0.8";
      ghostElement.style.transform = "scale(0.9)";
      ghostElement.style.width = `${rect.width}px`;
      
      document.body.appendChild(ghostElement);
      e.dataTransfer.setDragImage(ghostElement, 0, 0);
      
      // Remove the ghost element after the drag starts
      setTimeout(() => {
        document.body.removeChild(ghostElement);
      }, 0);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={dragRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`cursor-grab ${isDragging ? "opacity-50" : "opacity-100"}`}
      data-draggable-id={id}
    >
      {children}
    </div>
  );
};
