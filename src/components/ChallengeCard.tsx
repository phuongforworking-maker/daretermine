import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Flame, Trophy, Target } from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  category: string;
  participants: number;
  impactPoints: number;
  growthPoints: number;
  image?: string;
  isJoined?: boolean;
}

interface ChallengeCardProps {
  challenge: Challenge;
  onJoin?: (challengeId: string) => void;
}

const difficultyColors = {
  Easy: "bg-success/20 text-success border-success/30",
  Medium: "bg-primary/20 text-primary border-primary/30", 
  Hard: "bg-accent/20 text-accent border-accent/30",
  Expert: "bg-destructive/20 text-destructive border-destructive/30"
};

const ChallengeCard = ({ challenge, onJoin }: ChallengeCardProps) => {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50">
      {challenge.image && (
        <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
          <img 
            src={challenge.image} 
            alt={challenge.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <Badge className={difficultyColors[challenge.difficulty]}>
              {challenge.difficulty}
            </Badge>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge variant="secondary" className="text-xs">
            {challenge.category}
          </Badge>
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-foreground">{challenge.title}</h3>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
          {challenge.description}
        </p>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{challenge.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{challenge.participants.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <div className="p-1 rounded bg-primary/20">
              <Target className="w-3 h-3 text-primary" />
            </div>
            <span className="text-sm font-medium">+{challenge.impactPoints} Impact</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="p-1 rounded bg-secondary/20">
              <Trophy className="w-3 h-3 text-secondary" />
            </div>
            <span className="text-sm font-medium">+{challenge.growthPoints} Growth</span>
          </div>
        </div>
        
        <Button 
          onClick={() => onJoin?.(challenge.id)}
          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          disabled={challenge.isJoined}
        >
          {challenge.isJoined ? (
            <>
              <Flame className="w-4 h-4 mr-2" />
              Joined!
            </>
          ) : (
            "Join Challenge"
          )}
        </Button>
      </div>
    </Card>
  );
};

export default ChallengeCard;