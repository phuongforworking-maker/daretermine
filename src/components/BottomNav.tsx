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
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50">
      <nav className="flex items-center justify-around h-12 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path, item.state);
          
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path, { state: item.state })}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors py-1 ${
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "fill-current" : ""}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;
