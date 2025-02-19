
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
    name: "Default",
    from: "from-pastel-pink",
    via: "via-white",
    to: "to-pastel-purple",
  },
  {
    name: "Ocean Breeze",
    from: "from-pastel-blue",
    via: "via-white",
    to: "to-pastel-green",
  },
  {
    name: "Sunset",
    from: "from-pastel-yellow",
    via: "via-white",
    to: "to-pastel-peach",
  },
  {
    name: "Lavender Dream",
    from: "from-[#E5DEFF]",
    via: "via-white",
    to: "to-[#FFDEE2]",
  },
  {
    name: "Mint Fresh",
    from: "from-[#F2FCE2]",
    via: "via-white",
    to: "to-[#D3E4FD]",
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
        <Button variant="outline" size="icon" className="fixed top-4 right-4 bg-white/50 backdrop-blur-sm">
          <Palette className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => handleThemeChange(theme)}
            className={`flex items-center gap-2 cursor-pointer ${
              currentTheme.name === theme.name ? "bg-accent" : ""
            }`}
          >
            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${theme.from} ${theme.via} ${theme.to}`} />
            {theme.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
