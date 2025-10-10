import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trophy, Flame, Award, Clock, Target, TrendingUp, ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

interface ActiveChallenge {
  id: string;
  title: string;
  daysCompleted: number;
  totalDays: number;
  category: string;
}

const AccountPage = () => {
  const navigate = useNavigate();
  
  const handleBackToVideos = () => {
    navigate('/', { state: { defaultView: 'video' } });
  };
  const [userStats] = useState({
    impactScore: 1240,
    growthScore: 890,
    totalChallenges: 12,
    completedChallenges: 8,
    currentStreak: 7,
  });

  const [badges] = useState<Badge[]>([
    {
      id: "1",
      name: "First Steps",
      description: "Completed your first challenge",
      icon: "🎯",
      earned: true,
      earnedDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Week Warrior",
      description: "Maintained a 7-day streak",
      icon: "🔥",
      earned: true,
      earnedDate: "2024-01-22",
    },
    {
      id: "3",
      name: "Social Butterfly",
      description: "Joined 10 community challenges",
      icon: "🦋",
      earned: true,
      earnedDate: "2024-02-05",
    },
    {
      id: "4",
      name: "Consistency King",
      description: "Complete a 30-day challenge",
      icon: "👑",
      earned: false,
    },
    {
      id: "5",
      name: "Impact Master",
      description: "Reach 2000 Impact points",
      icon: "⚡",
      earned: false,
    },
    {
      id: "6",
      name: "Growth Guru",
      description: "Reach 2000 Growth points",
      icon: "🌱",
      earned: false,
    },
  ]);

  const [activeChallenges] = useState<ActiveChallenge[]>([
    {
      id: "1",
      title: "30-Day Morning Yoga Journey",
      daysCompleted: 7,
      totalDays: 30,
      category: "Fitness & Health",
    },
    {
      id: "2",
      title: "7-Day Meditation Streak",
      daysCompleted: 4,
      totalDays: 7,
      category: "Mindfulness & Wellness",
    },
  ]);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToVideos}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Videos
        </Button>
        {/* Profile Header - Centered Layout */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src="/api/placeholder/100/100" />
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
            
            {/* Username */}
            <h1 className="text-2xl font-bold mb-1">@yourprofile</h1>
            <p className="text-sm text-muted-foreground mb-4">
              {userStats.currentStreak}-day streak 🔥
            </p>
            
            {/* Edit Profile Button */}
            <Button variant="outline" size="sm" className="mb-4">
              Edit Profile
            </Button>
            
            {/* Followers/Following - Centered */}
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-xl font-bold">245</div>
                <div className="text-xs text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">180</div>
                <div className="text-xs text-muted-foreground">Following</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
              <div className="text-center p-3 rounded-lg bg-primary/5">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="text-xl font-bold text-primary">{userStats.impactScore}</span>
                </div>
                <p className="text-xs text-muted-foreground">Impact</p>
              </div>
              
              <div className="text-center p-3 rounded-lg bg-secondary/5">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Flame className="w-4 h-4 text-secondary" />
                  <span className="text-xl font-bold text-secondary">{userStats.growthScore}</span>
                </div>
                <p className="text-xs text-muted-foreground">Growth</p>
              </div>
              
              <div className="text-center p-3 rounded-lg bg-success/5">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target className="w-4 h-4 text-success" />
                  <span className="text-xl font-bold text-success">{userStats.completedChallenges}</span>
                </div>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              
              <div className="text-center p-3 rounded-lg bg-accent/5">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="text-xl font-bold text-accent">{userStats.currentStreak}</span>
                </div>
                <p className="text-xs text-muted-foreground">Streak</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Active Challenges */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              Active Challenges
            </h2>
            
            <div className="space-y-4">
              {activeChallenges.map((challenge, index) => (
                <Card key={challenge.id} className="p-4">
                  {/* Photo Grid for Challenge */}
                  <div className="grid grid-cols-3 gap-1 mb-3 rounded-lg overflow-hidden">
                    {[1, 2, 3, 4, 5, 6].map((photoIndex) => (
                      <div
                        key={photoIndex}
                        className="aspect-square bg-muted flex items-center justify-center"
                      >
                        <span className="text-xs text-muted-foreground">
                          Day {photoIndex}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0 mr-2">
                      <h3 className="font-semibold mb-1 text-sm truncate">{challenge.title}</h3>
                      <Badge variant="secondary" className="text-[10px] truncate">
                        {challenge.category}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {challenge.daysCompleted}/{challenge.totalDays}
                    </span>
                  </div>
                  
                  <Progress 
                    value={(challenge.daysCompleted / challenge.totalDays) * 100} 
                    className="h-2"
                  />
                </Card>
              ))}
            </div>
          </div>

          {/* Milestone Badges */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-secondary" />
              Milestone Badges
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge) => (
                <Card 
                  key={badge.id} 
                  className={`p-4 text-center transition-all ${
                    badge.earned 
                      ? "bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20" 
                      : "opacity-50 grayscale"
                  }`}
                >
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h3 className="font-semibold text-xs mb-1 truncate">{badge.name}</h3>
                  <p className="text-[10px] text-muted-foreground mb-2 line-clamp-2">
                    {badge.description}
                  </p>
                  {badge.earned && badge.earnedDate && (
                    <Badge variant="secondary" className="text-xs">
                      Earned {new Date(badge.earnedDate).toLocaleDateString()}
                    </Badge>
                  )}
                  {!badge.earned && (
                    <Badge variant="outline" className="text-xs">
                      Locked
                    </Badge>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default AccountPage;