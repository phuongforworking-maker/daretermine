import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, Heart, Share, MessageCircle, Trophy, Crown, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AchievementCelebration from "./AchievementCelebration";
import UploadVideoModal from "./UploadVideoModal";
import ScoreDisplay from "./ScoreDisplay";
import LevelButton from "./LevelButton";
import { useToast } from "@/hooks/use-toast";

interface VideoChallenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  category: string;
  videoUrl: string;
  thumbnailUrl: string;
  user: {
    id: string;
    username: string;
    avatar: string;
    isVerified?: boolean;
  };
  participants: number;
  impactPoints: number;
  growthPoints: number;
  likes: number;
  isLiked: boolean;
  isJoined: boolean;
  isPrivate: boolean;
  joinedUsers: Array<{
    id: string;
    username: string;
    avatar: string;
  }>;
}

// Sample video challenges data
const sampleVideoChallenges: VideoChallenge[] = [
  {
    id: "1",
    title: "30-Day Morning Yoga Journey",
    description: "Transform your mornings with this incredible yoga challenge! 🧘‍♀️ Join thousands who are already seeing amazing results. #YogaChallenge #MorningRoutine #Wellness",
    duration: "30 days",
    difficulty: "Medium",
    category: "Fitness & Health",
    videoUrl: "/api/placeholder/400/800",
    thumbnailUrl: "/api/placeholder/400/800",
    user: {
      id: "user1",
      username: "yogamasterjen",
      avatar: "/api/placeholder/100/100",
      isVerified: true,
    },
    participants: 15420,
    impactPoints: 150,
    growthPoints: 200,
    likes: 2841,
    isLiked: false,
    isJoined: false,
    isPrivate: false,
    joinedUsers: [
      { id: "1", username: "alice_fit", avatar: "/api/placeholder/50/50" },
      { id: "2", username: "bob_wellness", avatar: "/api/placeholder/50/50" },
      { id: "3", username: "carol_yoga", avatar: "/api/placeholder/50/50" },
    ],
  },
  {
    id: "2",
    title: "100-Day Digital Art Mastery",
    description: "From sketches to masterpieces! 🎨 Watch my art journey and join the challenge to unlock your creative potential. Every day brings new skills! #DigitalArt #ArtChallenge #Creativity",
    duration: "100 days",
    difficulty: "Expert",
    category: "Creativity & Arts",
    videoUrl: "/api/placeholder/400/800",
    thumbnailUrl: "/api/placeholder/400/800",
    user: {
      id: "user2",
      username: "artcreator_maya",
      avatar: "/api/placeholder/100/100",
      isVerified: true,
    },
    participants: 3240,
    impactPoints: 500,
    growthPoints: 800,
    likes: 5691,
    isLiked: true,
    isJoined: true,
    isPrivate: false,
    joinedUsers: [
      { id: "4", username: "david_art", avatar: "/api/placeholder/50/50" },
      { id: "5", username: "emma_creative", avatar: "/api/placeholder/50/50" },
    ],
  },
  {
    id: "3",
    title: "21-Day 10K Steps Challenge",
    description: "Walking my way to better health! 👟 Join me for daily 10K steps and see the incredible transformation. Your future self will thank you! #Walking #HealthyLifestyle #FitnessMotivation",
    duration: "21 days",
    difficulty: "Easy",
    category: "Fitness & Health",
    videoUrl: "/api/placeholder/400/800",
    thumbnailUrl: "/api/placeholder/400/800",
    user: {
      id: "user3",
      username: "stepcount_sam",
      avatar: "/api/placeholder/100/100",
    },
    participants: 28750,
    impactPoints: 100,
    growthPoints: 120,
    likes: 1247,
    isLiked: false,
    isJoined: false,
    isPrivate: false,
    joinedUsers: [
      { id: "6", username: "frank_walker", avatar: "/api/placeholder/50/50" },
      { id: "7", username: "grace_steps", avatar: "/api/placeholder/50/50" },
      { id: "8", username: "henry_fitness", avatar: "/api/placeholder/50/50" },
    ],
  },
];

interface VideoChallengeFeedProps {
  onUserProfile?: (userId: string) => void;
}

const VideoChallengeFeed = ({ onUserProfile }: VideoChallengeFeedProps) => {
  const [challenges, setChallenges] = useState<VideoChallenge[]>(sampleVideoChallenges);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [userScores] = useState({ impact: 1240, growth: 890 });
  const { toast } = useToast();

  const currentChallenge = challenges[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % challenges.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + challenges.length) % challenges.length);
  };

  const handleLike = () => {
    setChallenges((prev) =>
      prev.map((challenge, index) =>
        index === currentIndex
          ? {
              ...challenge,
              isLiked: !challenge.isLiked,
              likes: challenge.isLiked ? challenge.likes - 1 : challenge.likes + 1,
            }
          : challenge
      )
    );
  };

  const handleJoinChallenge = () => {
    setChallenges((prev) =>
      prev.map((challenge, index) =>
        index === currentIndex
          ? {
              ...challenge,
              isJoined: true,
              participants: challenge.participants + 1,
            }
          : challenge
      )
    );

    // Show achievement celebration
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);

    toast({
      title: "Challenge Joined! 🎉",
      description: `You've joined the ${currentChallenge.title}`,
    });
  };

  const handleShare = () => {
    toast({
      title: "Challenge Shared! 📤",
      description: "Challenge link copied to clipboard",
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") handlePrevious();
      if (e.key === "ArrowDown") handleNext();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const difficultyColors = {
    Easy: "bg-success/20 text-success border-success/30",
    Medium: "bg-primary/20 text-primary border-primary/30",
    Hard: "bg-accent/20 text-accent border-accent/30",
    Expert: "bg-destructive/20 text-destructive border-destructive/30",
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Achievement Celebration Overlay */}
      <AchievementCelebration 
        show={showCelebration} 
        message={`Welcome to ${currentChallenge.title}!`} 
      />

      {/* Video Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${currentChallenge.thumbnailUrl})`,
          filter: 'brightness(0.7)'
        }}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center z-10">
        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          className="bg-black/30 hover:bg-black/50 text-white border-white/20"
        >
          <ChevronUp className="w-6 h-6" />
        </Button>
        {/* User Avatar */}
        <div 
          className="cursor-pointer hover:scale-105 transition-transform"
          onClick={() => onUserProfile?.(currentChallenge.user.id)}
        >
          <Avatar className="w-12 h-12 border-2 border-white">
            <AvatarImage src={currentChallenge.user.avatar} />
            <AvatarFallback>{currentChallenge.user.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          {currentChallenge.user.isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
              <Crown className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* Like Button */}
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLike}
            className={`rounded-full ${
              currentChallenge.isLiked 
                ? "bg-red-500 hover:bg-red-600 text-white" 
                : "bg-black/30 hover:bg-black/50 text-white"
            }`}
          >
            <Heart className={`w-6 h-6 ${currentChallenge.isLiked ? "fill-current" : ""}`} />
          </Button>
          <span className="text-white text-xs mt-1">{currentChallenge.likes}</span>
        </div>

        {/* Share Button */}
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="bg-black/30 hover:bg-black/50 text-white rounded-full"
          >
            <Share className="w-6 h-6" />
          </Button>
        </div>

        {/* Comments */}
        <div className="flex flex-col items-center">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/30 hover:bg-black/50 text-white rounded-full"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
          <span className="text-white text-xs mt-1">24</span>
        </div>

        {/* Down Arrow */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="bg-black/30 hover:bg-black/50 text-white border-white/20"
        >
          <ChevronDown className="w-6 h-6" />
        </Button>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-20 p-6 z-10">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          <div 
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => onUserProfile?.(currentChallenge.user.id)}
          >
            <span className="text-white font-semibold">@{currentChallenge.user.username}</span>
            {currentChallenge.user.isVerified && (
              <Crown className="w-4 h-4 text-primary inline ml-1" />
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-white text-white hover:bg-white hover:text-black"
          >
            Follow
          </Button>
        </div>

        {/* Challenge Description */}
        <p className="text-white text-sm mb-4 leading-relaxed">
          {currentChallenge.description}
        </p>

        {/* Challenge Details */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={difficultyColors[currentChallenge.difficulty]}>
            {currentChallenge.difficulty}
          </Badge>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            {currentChallenge.duration}
          </Badge>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            {currentChallenge.category}
          </Badge>
          {currentChallenge.isPrivate && (
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-200 border-purple-300/30">
              Private
            </Badge>
          )}
        </div>

        {/* Rewards */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-white text-sm">+{currentChallenge.impactPoints} Impact</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4 text-secondary" />
            <span className="text-white text-sm">+{currentChallenge.growthPoints} Growth</span>
          </div>
        </div>

        {/* Joined Users Preview */}
        {currentChallenge.joinedUsers.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex -space-x-2">
              {currentChallenge.joinedUsers.slice(0, 3).map((user) => (
                <Avatar key={user.id} className="w-6 h-6 border-2 border-white">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-xs">{user.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-white text-xs">
              {currentChallenge.joinedUsers[0]?.username} and {currentChallenge.participants.toLocaleString()} others joined
            </span>
          </div>
        )}

        {/* Join Button */}
        <Button
          onClick={handleJoinChallenge}
          disabled={currentChallenge.isJoined}
          className={`w-full ${
            currentChallenge.isJoined
              ? "bg-success hover:bg-success/90 text-white"
              : "bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          }`}
        >
          {currentChallenge.isJoined ? (
            <>
              <Trophy className="w-4 h-4 mr-2" />
              Challenge Joined!
            </>
          ) : (
            `Join Challenge (${currentChallenge.participants.toLocaleString()} participants)`
          )}
        </Button>
      </div>


      {/* Progress Indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
        {challenges.map((_, index) => (
          <div
            key={index}
            className={`w-8 h-1 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Upload Video Button */}
      <UploadVideoModal />
    </div>
  );
};

export default VideoChallengeFeed;