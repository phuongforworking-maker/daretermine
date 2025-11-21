import { useNavigate, useLocation } from "react-router-dom";
import { Home, Grid, Trophy, User } from "lucide-react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Video", path: "/", state: { defaultView: "video" } },
    { icon: Grid, label: "Grid", path: "/", state: { defaultView: "grid" } },
    { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
    { icon: User, label: "Account", path: "/account" },
  ];

  const isActive = (path: string, state?: any) => {
    if (path === "/" && location.pathname === "/") {
      if (state?.defaultView === "video" && !location.state?.defaultView) return true;
      return location.state?.defaultView === state?.defaultView;
    }
    return location.pathname === path;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 glass-card border-t border-primary/30 z-50 backdrop-blur-xl">
      <nav className="flex items-center justify-around h-10 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path, item.state);
          
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path, { state: item.state })}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 ${
                active
                  ? "text-primary drop-shadow-[0_0_8px_hsl(220_100%_60%/0.8)]"
                  : "text-foreground/50 hover:text-foreground/70"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "fill-current" : ""}`} />
              <span className="text-[9px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
