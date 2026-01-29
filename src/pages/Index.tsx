import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChallengeFeed from "@/components/ChallengeFeed";
import VideoChallengeFeed from "@/components/VideoChallengeFeed";
import UserProfileModal from "@/components/UserProfileModal";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Grid, ArrowRight, Zap, Target, TrendingUp, Users, User, Trophy } from "lucide-react";
import LevelButton from "@/components/LevelButton";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-challenges.jpg";
const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    toast
  } = useToast();
  const [viewMode, setViewMode] = useState<"video" | "grid" | "landing">("landing");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userScores, setUserScores] = useState({
    impact: 1240,
    growth: 890
  });
  const [hasSeenWelcomeBack, setHasSeenWelcomeBack] = useState(false);

  // Handle navigation from other pages
  useEffect(() => {
    if (location.state?.defaultView) {
      setViewMode(location.state.defaultView);
    }
  }, [location]);

  // Welcome back bonus - Add +1 point when user returns
  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit");
    const now = new Date().getTime();
    if (lastVisit && !hasSeenWelcomeBack) {
      const timeDiff = now - parseInt(lastVisit);
      const hoursDiff = timeDiff / (1000 * 60 * 60);

      // If more than 1 hour has passed, give welcome back bonus
      if (hoursDiff >= 1) {
        setUserScores(prev => ({
          impact: prev.impact + 1,
          growth: prev.growth
        }));
        toast({
          title: "Welcome back! 🎉",
          description: "+1 Impact point for returning!"
        });
        setHasSeenWelcomeBack(true);
      }
    }
    localStorage.setItem("lastVisit", now.toString());
  }, [hasSeenWelcomeBack, toast]);
  const handleUserProfile = (userId: string) => {
    setSelectedUserId(userId);
  };

  // Landing page view
  if (viewMode === "landing") {
    return <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 animate-pulse" style={{
          animationDuration: '8s'
        }} />
          <div className="container mx-auto px-4 py-20 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl font-bold leading-tight font-serif lg:text-7xl text-left">
                    Turn Scrolling Into{" "}
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-7xl bg-primary">
                      Growing
                    </span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">Transform endless scrolling into meaningful action. Join thousands building better habits through challenges that matter. </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button onClick={() => setViewMode("video")} size="lg" variant="glow" className="text-lg font-semibold">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button onClick={() => navigate("/auth")} variant="outline" size="lg" className="text-lg">
                    Sign In
                  </Button>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-8 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">45K+</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">12K+</div>
                    <div className="text-sm text-muted-foreground">Challenges</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">98%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl blur-3xl animate-pulse" style={{
                animationDuration: '4s'
              }} />
                
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Why Choose Challenge Over Scroll?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform your screen time into skill time with our gamified approach to personal growth.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="p-6 text-center hover:scale-105 hover:glow-blue transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-primary/30 to-primary-glow/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary drop-shadow-[0_0_8px_hsl(220_100%_60%/0.8)]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Engagement</h3>
                <p className="text-muted-foreground">
                  Swipe through challenges like TikTok, but build real skills instead of just watching.
                </p>
              </Card>
              
              <Card className="p-6 text-center hover:scale-105 hover:glow-orange transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-secondary/30 to-secondary-light/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-secondary drop-shadow-[0_0_8px_hsl(16_100%_60%/0.8)]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Scoring</h3>
                <p className="text-muted-foreground">
                  Earn Impact and Growth points based on challenge difficulty and duration.
                </p>
              </Card>
              
              <Card className="p-6 text-center hover:scale-105 hover:glow-cyan transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-success/30 to-success-light/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-success drop-shadow-[0_0_8px_hsl(180_100%_50%/0.8)]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real Progress</h3>
                <p className="text-muted-foreground">
                  Track meaningful metrics that reflect actual personal development.
                </p>
              </Card>
              
              <Card className="p-6 text-center hover:scale-105 hover:glow-purple transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-accent/30 to-accent/40 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-accent drop-shadow-[0_0_8px_hsl(270_80%_60%/0.8)]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                <p className="text-muted-foreground">
                  Join thousands of others on similar journeys. Create and share your own challenges.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="p-12 text-center bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30 glow-blue">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Transform Your Habits?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join the movement of people choosing growth over passive consumption. Your future self will thank you.
              </p>
              <Button onClick={() => setViewMode("video")} size="lg" variant="glow" className="text-lg font-semibold">
                Start Your First Challenge
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <div className="mt-8 text-sm text-muted-foreground">
                🚀 Join 45,000+ users already growing daily
              </div>
            </Card>
          </div>
        </section>
      </div>;
  }
  return <div className="relative">
      {/* Desktop Top Navigation - Hidden on mobile */}
      <div className="hidden md:flex fixed top-4 left-4 z-20 gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate("/auth")} className="glass-card border-primary/30 hover:glow-blue">
          Sign In
        </Button>
        <Button variant={viewMode === "video" ? "default" : "outline"} size="sm" onClick={() => setViewMode("video")} className={viewMode === "video" ? "glow-blue" : "glass-card border-primary/30 hover:glow-blue"}>
          <Play className="w-4 h-4 mr-1" />
          Video
        </Button>
        <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")} className={viewMode === "grid" ? "glow-blue" : "glass-card border-primary/30 hover:glow-blue"}>
          <Grid className="w-4 h-4 mr-1" />
          Grid
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigate("/account")} className="glass-card border-primary/30 hover:glow-blue">
          <User className="w-4 h-4 mr-1" />
          Account
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigate("/leaderboard")} className="glass-card border-primary/30 hover:glow-blue">
          <Trophy className="w-4 h-4 mr-1" />
          Leaderboard
        </Button>
      </div>

      {/* Level Button - Top Right - Only show in video mode */}
      {viewMode === "video" && <div className="fixed top-4 right-4 z-20">
          <LevelButton impactScore={userScores.impact} growthScore={userScores.growth} compact={true} />
        </div>}

      {/* Content */}
      {viewMode === "video" ? <VideoChallengeFeed onUserProfile={handleUserProfile} /> : <ChallengeFeed />}

      {/* User Profile Modal */}
      <UserProfileModal userId={selectedUserId} isOpen={!!selectedUserId} onClose={() => setSelectedUserId(null)} />

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>;
};
export default Index;