
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Calendar, MessageSquare } from "lucide-react";

const RelationshipList = () => {
  const relationships = [
    {
      name: "Sarah Johnson",
      type: "Family",
      lastInteraction: "2 days ago",
      nextCheckIn: "Tomorrow",
      moodScore: 4,
      tags: ["Sister", "Weekly calls", "Book club"],
    },
    {
      name: "Mike Chen",
      type: "Friend",
      lastInteraction: "5 days ago",
      nextCheckIn: "In 2 days",
      moodScore: 5,
      tags: ["College friend", "Gaming buddy", "Monthly meetup"],
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {relationships.map((relationship) => (
        <Card key={relationship.name} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">{relationship.name}</CardTitle>
            <Badge variant="outline">{relationship.type}</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                Last interaction: {relationship.lastInteraction}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Next check-in: {relationship.nextCheckIn}
              </div>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < relationship.moodScore
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {relationship.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RelationshipList;
