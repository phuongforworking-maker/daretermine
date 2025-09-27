import { useEffect, useState } from "react";
import { Trophy, Sparkles, Crown, Flame, Star } from "lucide-react";

interface AchievementCelebrationProps {
  show: boolean;
  message: string;
  type?: "challenge_joined" | "milestone" | "level_up" | "streak";
}

const AchievementCelebration = ({ 
  show, 
  message, 
  type = "challenge_joined" 
}: AchievementCelebrationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // Generate particles
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      setParticles(newParticles);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [show]);

  const getIcon = () => {
    switch (type) {
      case "milestone":
        return <Crown className="w-8 h-8 text-yellow-400" />;
      case "level_up":
        return <Star className="w-8 h-8 text-purple-400" />;
      case "streak":
        return <Flame className="w-8 h-8 text-orange-400" />;
      default:
        return <Trophy className="w-8 h-8 text-primary" />;
    }
  };

  const getColor = () => {
    switch (type) {
      case "milestone":
        return "from-yellow-400 to-yellow-600";
      case "level_up":
        return "from-purple-400 to-purple-600";
      case "streak":
        return "from-orange-400 to-orange-600";
      default:
        return "from-primary to-primary-glow";
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-all duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Animated Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute w-2 h-2 bg-gradient-to-r ${getColor()} rounded-full animate-ping`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: "1.5s",
          }}
        />
      ))}

      {/* Main Achievement Card */}
      <div 
        className={`bg-card border border-border/20 rounded-2xl p-8 mx-4 max-w-sm w-full text-center shadow-2xl transform transition-all duration-500 ${
          show ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Icon with glow effect */}
        <div className="relative mb-6">
          <div 
            className={`absolute inset-0 bg-gradient-to-r ${getColor()} rounded-full blur-xl opacity-30 scale-150`}
          />
          <div className="relative bg-card border border-border/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
            {getIcon()}
            <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
        </div>

        {/* Success Message */}
        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Awesome Achievement! 🎉
        </h3>
        
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {message}
        </p>

        {/* Animated Progress Bars */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Impact Score</span>
            <span className="text-primary font-medium">+150 XP</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getColor()} rounded-full transition-all duration-1000 delay-300`}
              style={{ width: show ? "75%" : "0%" }}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Growth Score</span>
            <span className="text-secondary font-medium">+200 XP</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r from-secondary to-secondary/80 rounded-full transition-all duration-1000 delay-500`}
              style={{ width: show ? "60%" : "0%" }}
            />
          </div>
        </div>

        {/* Celebration Text */}
        <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm text-primary font-medium">
            🚀 You're on fire! Keep up the amazing progress!
          </p>
        </div>
      </div>

      {/* Floating Icons Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float text-2xl transition-all duration-1000 ${
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: "3s",
            }}
          >
            {["🎉", "🏆", "⭐", "🔥", "💎", "🎯"][i]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementCelebration;