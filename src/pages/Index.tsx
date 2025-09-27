import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ChallengeFeed from "@/components/ChallengeFeed";
import { ArrowRight, Zap, Target, TrendingUp, Users } from "lucide-react";
import heroImage from "@/assets/hero-challenges.jpg";

const Index = () => {
  const [showFeed, setShowFeed] = useState(false);

  if (showFeed) {
    return <ChallengeFeed />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Turn Scrolling Into{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Growing
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Stop endless scrolling. Start meaningful challenges. Join thousands building better habits through gamified productivity.
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button 
                  onClick={() => setShowFeed(true)}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
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
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <img 
                src={heroImage} 
                alt="People doing productive activities"
                className="relative rounded-3xl shadow-2xl w-full"
              />
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
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Engagement</h3>
              <p className="text-muted-foreground">
                Swipe through challenges like TikTok, but build real skills instead of just watching.
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-secondary/20 to-secondary-light/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Scoring</h3>
              <p className="text-muted-foreground">
                Earn Impact and Growth points based on challenge difficulty and duration.
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-success/20 to-success-light/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real Progress</h3>
              <p className="text-muted-foreground">
                Track meaningful metrics that reflect actual personal development.
              </p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-accent/20 to-accent/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-accent" />
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
          <Card className="p-12 text-center bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Habits?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the movement of people choosing growth over passive consumption. Your future self will thank you.
            </p>
            <Button 
              onClick={() => setShowFeed(true)}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
              Start Your First Challenge
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <div className="mt-8 text-sm text-muted-foreground">
              🚀 Join 45,000+ users already growing daily
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;