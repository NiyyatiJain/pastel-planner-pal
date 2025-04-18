
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus, Users, Calendar, Heart, MessageSquare } from "lucide-react";
import RelationshipList from "@/components/relationships/RelationshipList";
import MemoryVault from "@/components/relationships/MemoryVault";
import InteractionTracker from "@/components/relationships/InteractionTracker";
import ConnectionGoals from "@/components/relationships/ConnectionGoals";

const RelationshipsPage = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Heart className="text-pink-500" />
          <span>Relationships</span>
        </h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Relationship
        </Button>
      </div>

      <Tabs defaultValue="relationships" className="space-y-4">
        <TabsList>
          <TabsTrigger value="relationships" className="gap-2">
            <Users className="h-4 w-4" />
            <span>Profiles</span>
          </TabsTrigger>
          <TabsTrigger value="memories" className="gap-2">
            <Heart className="h-4 w-4" />
            <span>Memory Vault</span>
          </TabsTrigger>
          <TabsTrigger value="interactions" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>Interactions</span>
          </TabsTrigger>
          <TabsTrigger value="goals" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span>Goals</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="relationships" className="space-y-4">
          <RelationshipList />
        </TabsContent>

        <TabsContent value="memories" className="space-y-4">
          <MemoryVault />
        </TabsContent>

        <TabsContent value="interactions" className="space-y-4">
          <InteractionTracker />
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <ConnectionGoals />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RelationshipsPage;
