import { useState } from "react";
import ChallengeCard from "./ChallengeCard";
import CreateChallengeModal from "./CreateChallengeModal";
import PersonalChallengeSection from "./PersonalChallengeSection";
import ScoreDisplay from "./ScoreDisplay";
import UploadPhotoModal from "./UploadPhotoModal";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

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

// Sample challenges data
const sampleChallenges: Challenge[] = [
  {
    id: "1",
    title: "30-Day Morning Yoga Journey",
    description: "Start each day with 20 minutes of mindful yoga. Build flexibility, strength, and inner peace one morning at a time.",
    duration: "30 days",
    difficulty: "Medium",
    category: "Fitness & Health",
    participants: 15420,
    impactPoints: 150,
    growthPoints: 200,
  },
  {
    id: "2", 
    title: "100-Day Digital Art Mastery",
    description: "Create one digital artwork every day for 100 days. From sketches to masterpieces, unlock your creative potential.",
    duration: "100 days",
    difficulty: "Expert",
    category: "Creativity & Arts",
    participants: 3240,
    impactPoints: 500,
    growthPoints: 800,
  },
  {
    id: "3",
    title: "21-Day 10K Steps Challenge",
    description: "Walk 10,000 steps daily for 21 days. Transform your health, boost energy, and build lasting habits.",
    duration: "21 days", 
    difficulty: "Easy",
    category: "Fitness & Health",
    participants: 28750,
    impactPoints: 100,
    growthPoints: 120,
  },
  {
    id: "4",
    title: "7-Day Meditation Streak",
    description: "Meditate for 15 minutes each day. Find calm, reduce stress, and develop mindfulness in just one week.",
    duration: "7 days",
    difficulty: "Easy",
    category: "Mindfulness & Wellness", 
    participants: 45200,
    impactPoints: 50,
    growthPoints: 80,
  },
  {
    id: "5",
    title: "60-Day Language Learning Sprint",
    description: "Dedicate 30 minutes daily to learning a new language. Unlock global communication and expand your worldview.",
    duration: "60 days",
    difficulty: "Hard",
    category: "Learning & Skills",
    participants: 8900,
    impactPoints: 300,
    growthPoints: 450,
  }
];

const ChallengeFeed = () => {
  const [challenges, setChallenges] = useState<Challenge[]>(sampleChallenges);
  const [userScores, setUserScores] = useState({ impact: 1240, growth: 890 });

  const handleJoinChallenge = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, isJoined: true, participants: challenge.participants + 1 }
          : challenge
      )
    );
    
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      setUserScores(prev => ({
        impact: prev.impact + challenge.impactPoints,
        growth: prev.growth + challenge.growthPoints
      }));
    }
  };

  const handleCreateChallenge = (newChallenge: any) => {
    const challenge: Challenge = {
      id: Date.now().toString(),
      ...newChallenge,
      participants: 1,
      impactPoints: Math.floor(Math.random() * 200) + 50,
      growthPoints: Math.floor(Math.random() * 300) + 100,
      isJoined: true,
    };
    
    setChallenges(prev => [challenge, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Challenge Feed
            </h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
              <CreateChallengeModal onCreateChallenge={handleCreateChallenge} />
            </div>
          </div>
          
          <ScoreDisplay impactScore={userScores.impact} growthScore={userScores.growth} />
        </div>
      </div>

      {/* Challenge Feed */}
      <div className="container mx-auto px-4 py-6">
        {/* Personal Challenge Section */}
        <PersonalChallengeSection />
        
        <div className="space-y-6">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onJoin={handleJoinChallenge}
            />
          ))}
        </div>
        
        {/* Load more */}
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            className="hover:bg-primary/5 hover:border-primary/20"
          >
            Load More Challenges
          </Button>
        </div>

        {/* Motivational footer */}
        <div className="text-center mt-12 mb-8">
          <p className="text-muted-foreground">
            🚀 Ready to transform scrolling into growing? Join a challenge today!
          </p>
        </div>
      </div>

      {/* Upload Photo Button */}
      <UploadPhotoModal />
    </div>
  );
};

export default ChallengeFeed;