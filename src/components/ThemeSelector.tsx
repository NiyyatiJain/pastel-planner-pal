
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
  },
  // Dark themes
  {
    name: "Dark Sapphire",
    from: "from-[#1A1F2C]",
    via: "via-[#2A3242]",
    to: "to-[#3B4358]",
  },
  {
    name: "Dark Rose",
    from: "from-[#2C1A1F]",
    via: "via-[#422A32]",
    to: "to-[#583B43]",
  },
  {
    name: "Dark Forest",
    from: "from-[#1F2C1A]",
    via: "via-[#32422A]",
    to: "to-[#43583B]",
  },
  {
    name: "Dark Violet",
    from: "from-[#221F26]",
    via: "via-[#2F2B33]",
    to: "to-[#3D3847]",
  },
  {
    name: "Night Sky",
    from: "from-[#0F172A]",
    via: "via-[#1E293B]",
    to: "to-[#334155]",
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
        <DropdownMenuItem className="font-semibold" disabled>
          Light Themes
        </DropdownMenuItem>
        {themes.slice(0, 5).map((theme) => (
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
        <DropdownMenuItem className="font-semibold" disabled>
          Dark Themes
        </DropdownMenuItem>
        {themes.slice(5).map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => handleThemeChange(theme)}
            className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 ${
              currentTheme.name === theme.name ? "bg-accent" : ""
            }`}
          >
            <div 
              className={`w-6 h-6 rounded-full bg-gradient-to-br ${theme.from} ${theme.via} ${theme.to} transition-transform duration-200 hover:scale-110 border border-white/10`} 
            />
            {theme.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
