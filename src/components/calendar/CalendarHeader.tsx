
import { format } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarHeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export const CalendarHeader = ({ selectedDate, onDateChange }: CalendarHeaderProps) => {
  const goToPrevDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    onDateChange(prevDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    onDateChange(nextDay);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={goToPrevDay}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={goToNextDay}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="text-lg font-medium">
        {format(selectedDate, "MMMM d, yyyy")}
      </div>
      <Button variant="outline" size="sm" onClick={goToToday}>
        Today
      </Button>
    </div>
  );
};
