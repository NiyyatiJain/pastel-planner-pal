
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MemoryVault = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Memory Vault</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Coming soon: Store and organize your precious memories, photos, and special moments.
        </p>
      </CardContent>
    </Card>
  );
};

export default MemoryVault;
