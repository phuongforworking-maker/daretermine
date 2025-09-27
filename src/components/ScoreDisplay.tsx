import { Card } from "@/components/ui/card";
import { TrendingUp, Target } from "lucide-react";

interface ScoreDisplayProps {
  impactScore: number;
  growthScore: number;
}

const ScoreDisplay = ({ impactScore, growthScore }: ScoreDisplayProps) => {
  return (
    <div className="flex gap-4">
      <Card className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
        <div className="p-2 rounded-full bg-primary/20">
          <Target className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Impact Score</p>
          <p className="text-xl font-bold text-primary">{impactScore}</p>
        </div>
      </Card>
      
      <Card className="flex items-center gap-3 p-4 bg-gradient-to-r from-secondary/10 to-secondary-light/10 border-secondary/20">
        <div className="p-2 rounded-full bg-secondary/20">
          <TrendingUp className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Growth Score</p>
          <p className="text-xl font-bold text-secondary">{growthScore}</p>
        </div>
      </Card>
    </div>
  );
};

export default ScoreDisplay;