import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Award } from "lucide-react";

interface LevelButtonProps {
  impactScore: number;
  growthScore: number;
}

const LevelButton = ({ impactScore, growthScore }: LevelButtonProps) => {
  const [showDetails, setShowDetails] = useState(false);

  // Calculate level based on the scoring table
  const calculateLevel = (score: number) => {
    if (score >= 1000) return { name: "Diamond League", points: 1000, next: 2000, color: "from-blue-400 to-purple-500", icon: "💎" };
    if (score >= 600) return { name: "Gold League", points: 600, next: 1000, color: "from-yellow-400 to-yellow-600", icon: "🏆" };
    if (score >= 400) return { name: "Silver League", points: 400, next: 600, color: "from-gray-300 to-gray-500", icon: "🥈" };
    if (score >= 250) return { name: "Bronze League", points: 250, next: 400, color: "from-orange-400 to-orange-600", icon: "🥉" };
    if (score >= 150) return { name: "Metal League", points: 150, next: 250, color: "from-gray-500 to-gray-700", icon: "⚙️" };
    if (score >= 80) return { name: "Wood League", points: 80, next: 150, color: "from-amber-700 to-amber-900", icon: "🪵" };
    if (score >= 40) return { name: "Bronze Leaf", points: 40, next: 80, color: "from-green-600 to-green-800", icon: "🍂" };
    if (score >= 15) return { name: "Explorer Badge", points: 15, next: 40, color: "from-green-400 to-green-600", icon: "🧭" };
    return { name: "Starter Badge", points: 5, next: 15, color: "from-blue-300 to-blue-500", icon: "⭐" };
  };

  const totalScore = impactScore + growthScore;
  const level = calculateLevel(totalScore);
  const progress = ((totalScore - level.points) / (level.next - level.points)) * 100;

  return (
    <>
      <Button
        onClick={() => setShowDetails(true)}
        className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg"
        size="sm"
      >
        <Trophy className="w-4 h-4 mr-2" />
        {level.icon} {level.name}
      </Button>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              Your Progression
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Current Level */}
            <div className={`p-6 rounded-lg bg-gradient-to-r ${level.color} text-white text-center`}>
              <div className="text-5xl mb-2">{level.icon}</div>
              <h3 className="text-2xl font-bold">{level.name}</h3>
              <p className="text-sm opacity-90">Total Score: {totalScore}</p>
            </div>

            {/* Progress to Next Level */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Next Level</span>
                <span className="font-semibold">{totalScore} / {level.next}</span>
              </div>
              <Progress value={progress} className="h-3" />
              <p className="text-xs text-muted-foreground text-center">
                {level.next - totalScore} points until next level
              </p>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <Trophy className="w-5 h-5 text-primary mb-2" />
                <div className="text-2xl font-bold text-primary">{impactScore}</div>
                <div className="text-xs text-muted-foreground">Impact Score</div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                <Trophy className="w-5 h-5 text-secondary mb-2" />
                <div className="text-2xl font-bold text-secondary">{growthScore}</div>
                <div className="text-xs text-muted-foreground">Growth Score</div>
              </div>
            </div>

            {/* Active Challenges Link */}
            <Button
              onClick={() => window.location.href = "/account"}
              className="w-full bg-gradient-to-r from-primary to-primary-glow"
            >
              View Active Challenges
            </Button>

            {/* Nudging Users */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Nudge Friends</h4>
              <div className="space-y-2">
                {[
                  { id: "1", name: "Alice Johnson", streak: 5 },
                  { id: "2", name: "Bob Smith", streak: 3 },
                  { id: "3", name: "Carol White", streak: 7 },
                ].map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-2 rounded bg-muted/50"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.streak} day streak</span>
                    </div>
                    <Button size="sm" variant="outline">
                      Nudge 👋
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LevelButton;
