
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Palette } from "lucide-react";
import { useState } from "react";

const themes = [
  {
    name: "Sweet Rose",
    from: "from-[#FF8FAB]",
    via: "via-[#FFC2D4]",
    to: "to-[#FFE5EC]",
  },
  {
    name: "Ocean Dream",
    from: "from-[#48CAE4]",
    via: "via-[#90E0EF]",
    to: "to-[#CAF0F8]",
  },
  {
    name: "Sunset Gold",
    from: "from-[#FF9E44]",
    via: "via-[#FFB877]",
    to: "to-[#FFD4AA]",
  },
  {
    name: "Lavender Mist",
    from: "from-[#9B5DE5]",
    via: "via-[#C490E4]",
    to: "to-[#E5C9FF]",
  },
  {
    name: "Mint Breeze",
    from: "from-[#2EC4B6]",
    via: "via-[#80DDD2]",
    to: "to-[#BCECE7]",
  }
];

const ThemeSelector = ({ onThemeChange }: { onThemeChange: (theme: typeof themes[0]) => void }) => {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  const handleThemeChange = (theme: typeof themes[0]) => {
    setCurrentTheme(theme);
    onThemeChange(theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className={`fixed top-4 right-4 bg-white/50 backdrop-blur-sm transition-colors duration-300 ${currentTheme.from} hover:opacity-80`}
        >
          <Palette className="h-4 w-4 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => handleThemeChange(theme)}
            className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 ${
              currentTheme.name === theme.name ? "bg-accent" : ""
            }`}
          >
            <div 
              className={`w-6 h-6 rounded-full bg-gradient-to-br ${theme.from} ${theme.via} ${theme.to} transition-transform duration-200 hover:scale-110`} 
            />
            {theme.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
