import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Crown, 
  Trophy, 
  Flame, 
  Users, 
  Calendar, 
  MapPin, 
  Link,
  Heart,
  MessageCircle,
  Share,
  Award,
  Target,
  Zap
} from "lucide-react";
import yogaChallengeImg from "@/assets/yoga-challenge.jpg";
import meditationChallengeImg from "@/assets/meditation-challenge.jpg";

interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  isVerified: boolean;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  followers: number;
  following: number;
  isFollowing: boolean;
  impactScore: number;
  growthScore: number;
  totalChallenges: number;
  completedChallenges: number;
  activeStreak: number;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    dateEarned: string;
    rarity: "common" | "rare" | "epic" | "legendary";
  }>;
  recentChallenges: Array<{
    id: string;
    title: string;
    thumbnail: string;
    likes: number;
    isCompleted: boolean;
    progress: number;
  }>;
}

interface UserProfileModalProps {
  userId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

// Sample user data
const sampleUser: UserProfile = {
  id: "user1",
  username: "yogamasterjen",
  displayName: "Jennifer Thompson",
  avatar: "/api/placeholder/150/150",
  isVerified: true,
  bio: "Yoga instructor & wellness coach 🧘‍♀️ Helping others find their inner peace through mindful movement. Join me on this journey! ✨",
  location: "San Francisco, CA",
  website: "yogawithjen.com",
  joinDate: "March 2023",
  followers: 24500,
  following: 186,
  isFollowing: false,
  impactScore: 3250,
  growthScore: 4180,
  totalChallenges: 23,
  completedChallenges: 18,
  activeStreak: 45,
  achievements: [
    {
      id: "1",
      title: "Yoga Master",
      description: "Completed 10 yoga challenges",
      icon: "🧘‍♀️",
      dateEarned: "2024-09-15",
      rarity: "epic"
    },
    {
      id: "2",
      title: "Streak Warrior",
      description: "Maintained a 30-day streak",
      icon: "🔥",
      dateEarned: "2024-09-10",
      rarity: "rare"
    },
    {
      id: "3",
      title: "Community Leader",
      description: "Helped 1000+ users join challenges",
      icon: "👑",
      dateEarned: "2024-08-20",
      rarity: "legendary"
    },
  ],
  recentChallenges: [
    {
      id: "1",
      title: "30-Day Morning Yoga",
      thumbnail: yogaChallengeImg,
      likes: 2841,
      isCompleted: false,
      progress: 73,
    },
    {
      id: "2", 
      title: "Mindful Meditation Week",
      thumbnail: meditationChallengeImg,
      likes: 1205,
      isCompleted: true,
      progress: 100,
    },
  ],
};

const UserProfileModal = ({ userId, isOpen, onClose }: UserProfileModalProps) => {
  const [user] = useState<UserProfile>(sampleUser);
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [activeTab, setActiveTab] = useState("challenges");

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white";
      case "epic":
        return "bg-gradient-to-r from-purple-400 to-pink-500 text-white";
      case "rare":
        return "bg-gradient-to-r from-blue-400 to-cyan-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (!userId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl h-[80vh] overflow-y-auto">
        <DialogHeader>
          {/* Profile Header */}
          <div className="flex items-start gap-6 p-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-primary/30 shadow-lg shadow-primary/30">
                <AvatarImage src={user.avatar} className="img-futuristic" />
                <AvatarFallback className="text-2xl">
                  {user.displayName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {user.isVerified && (
                <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold">{user.displayName}</h2>
                {user.isVerified && <Crown className="w-5 h-5 text-primary" />}
              </div>
              <p className="text-muted-foreground mb-1">@{user.username}</p>
              
              {/* Stats */}
              <div className="flex gap-6 text-sm mb-4">
                <div>
                  <span className="font-semibold">{user.followers.toLocaleString()}</span>
                  <span className="text-muted-foreground ml-1">followers</span>
                </div>
                <div>
                  <span className="font-semibold">{user.following}</span>
                  <span className="text-muted-foreground ml-1">following</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={handleFollow}
                  variant={isFollowing ? "outline" : "default"}
                  className={isFollowing ? "" : "bg-gradient-to-r from-primary to-primary-glow"}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline" size="icon">
                  <MessageCircle className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Bio & Info */}
          <div className="px-6 pb-4">
            <p className="text-sm mb-4 leading-relaxed">{user.bio}</p>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {user.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center gap-1">
                  <Link className="w-4 h-4" />
                  <span className="text-primary hover:underline cursor-pointer">{user.website}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {user.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 px-6 pb-6">
            <Card className="p-4 text-center">
              <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-lg font-bold">{user.impactScore}</div>
              <div className="text-xs text-muted-foreground">Impact</div>
            </Card>
            <Card className="p-4 text-center">
              <Flame className="w-6 h-6 text-secondary mx-auto mb-2" />
              <div className="text-lg font-bold">{user.growthScore}</div>
              <div className="text-xs text-muted-foreground">Growth</div>
            </Card>
            <Card className="p-4 text-center">
              <Target className="w-6 h-6 text-accent mx-auto mb-2" />
              <div className="text-lg font-bold">{user.completedChallenges}/{user.totalChallenges}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </Card>
            <Card className="p-4 text-center">
              <Zap className="w-6 h-6 text-orange-500 mx-auto mb-2" />
              <div className="text-lg font-bold">{user.activeStreak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </Card>
          </div>
        </DialogHeader>

        {/* Tabs Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="challenges" className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              {user.recentChallenges.map((challenge) => (
                <Card key={challenge.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <img 
                      src={challenge.thumbnail} 
                      alt={challenge.title}
                      className="w-full h-40 object-cover"
                    />
                    {challenge.isCompleted && (
                      <div className="absolute top-2 right-2 bg-success rounded-full p-1">
                        <Trophy className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 text-sm line-clamp-2">{challenge.title}</h4>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span>{challenge.likes}</span>
                      </div>
                      <span>{challenge.progress}% complete</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="space-y-4">
              {user.achievements.map((achievement) => (
                <Card key={achievement.id} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <Badge className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {achievement.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Earned on {new Date(achievement.dateEarned).toLocaleDateString()}
                      </p>
                    </div>
                    <Award className="w-6 h-6 text-muted-foreground" />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;