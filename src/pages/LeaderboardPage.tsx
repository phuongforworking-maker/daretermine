import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Trophy, Flame, Crown, Swords, Shield, Search } from "lucide-react";
import LevelButton from "@/components/LevelButton";
import BottomNav from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";

interface LeaderboardUser {
  id: string;
  username: string;
  avatar: string;
  impactScore: number;
  growthScore: number;
  rank: number;
  league: string;
  challengeWins: number;
  defenseWins: number;
}

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<LeaderboardUser | null>(null);
  const [challengeDialog, setChallengeDialog] = useState(false);
  const [wagerAmount, setWagerAmount] = useState(10);

  const currentUser = {
    id: "current",
    username: "You",
    impactScore: 1240,
    growthScore: 890,
  };

  // Calculate user's league
  const totalScore = currentUser.impactScore + currentUser.growthScore;
  const getUserLeague = () => {
    if (totalScore >= 1000) return "Diamond League";
    if (totalScore >= 600) return "Gold League";
    if (totalScore >= 400) return "Silver League";
    return "Bronze League";
  };

  const userLeague = getUserLeague();

  const [leaderboard] = useState<LeaderboardUser[]>([
    {
      id: "1",
      username: "ChampionMike",
      avatar: "/api/placeholder/100/100",
      impactScore: 2500,
      growthScore: 3200,
      rank: 1,
      league: "Diamond League",
      challengeWins: 45,
      defenseWins: 32,
    },
    {
      id: "2",
      username: "YogaQueen",
      avatar: "/api/placeholder/100/100",
      impactScore: 2100,
      growthScore: 2800,
      rank: 2,
      league: "Diamond League",
      challengeWins: 38,
      defenseWins: 28,
    },
    {
      id: "3",
      username: "FitWarrior",
      avatar: "/api/placeholder/100/100",
      impactScore: 1850,
      growthScore: 2400,
      rank: 3,
      league: "Gold League",
      challengeWins: 30,
      defenseWins: 22,
    },
    {
      id: "4",
      username: "ArtMaster",
      avatar: "/api/placeholder/100/100",
      impactScore: 1650,
      growthScore: 2100,
      rank: 4,
      league: "Gold League",
      challengeWins: 25,
      defenseWins: 18,
    },
    {
      id: "5",
      username: "StudyPro",
      avatar: "/api/placeholder/100/100",
      impactScore: 1420,
      growthScore: 1800,
      rank: 5,
      league: "Silver League",
      challengeWins: 20,
      defenseWins: 15,
    },
  ]);

  const handleChallenge = (user: LeaderboardUser) => {
    setSelectedUser(user);
    setChallengeDialog(true);
  };

  const sendChallenge = () => {
    if (!selectedUser) return;

    const maxWager = Math.floor(selectedUser.impactScore * 0.5);
    if (wagerAmount < 10 || wagerAmount > maxWager) {
      toast({
        title: "Invalid Wager",
        description: `Wager must be between 10 and ${maxWager} points (50% of user's score)`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Challenge Sent! ⚔️",
      description: `Your challenge to ${selectedUser.username} for ${wagerAmount} points has been sent. They have 3 days to respond.`,
    });

    setChallengeDialog(false);
    setSelectedUser(null);
    setWagerAmount(10);
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Trophy className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Trophy className="w-5 h-5 text-orange-600" />;
    return null;
  };

  const filteredLeaderboard = leaderboard.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Leaderboard
              </h1>
              <p className="text-muted-foreground">
                Challenge top players and climb the ranks
              </p>
            </div>
          </div>

          {/* Current User Score with Level Button */}
          <div className="flex items-center justify-between">
            <LevelButton impactScore={currentUser.impactScore} growthScore={currentUser.growthScore} />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* League Tabs */}
        <Tabs defaultValue={userLeague} className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-4">
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Diamond League">💎 Diamond</TabsTrigger>
            <TabsTrigger value="Gold League">🏆 Gold</TabsTrigger>
            <TabsTrigger value="Silver League">🥈 Silver</TabsTrigger>
          </TabsList>

          <TabsContent value="All" className="space-y-4 mt-6">
            {filteredLeaderboard.map((user) => (
              <Card key={user.id} className="p-3 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <div className="flex items-center gap-1 w-8 flex-shrink-0">
                    {getRankIcon(user.rank)}
                    <span className="text-sm font-bold text-muted-foreground">
                      #{user.rank}
                    </span>
                  </div>

                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-xs truncate">{user.username}</h3>
                    <div className="flex items-center gap-1.5 text-xs">
                      <Badge variant="secondary" className="text-[8px] px-1 py-0 max-w-[60px] truncate">
                        {user.league.replace(' League', '')}
                      </Badge>
                      <div className="flex items-center gap-0.5">
                        <Trophy className="w-2.5 h-2.5 text-primary" />
                        <span className="text-muted-foreground text-[9px]">{user.impactScore}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5 text-secondary" />
                        <span className="text-muted-foreground text-[9px]">{user.growthScore}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    onClick={() => handleChallenge(user)}
                    className="bg-gradient-to-r from-primary to-primary-glow text-[9px] h-6 px-1.5"
                    size="sm"
                  >
                    <Swords className="w-3 h-3" />
                  </Button>
                </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="Diamond League" className="space-y-4 mt-6">
            {filteredLeaderboard
              .filter(user => user.league === "Diamond League")
              .map((user) => (
                <Card key={user.id} className="p-3 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="flex items-center gap-1 w-8 flex-shrink-0">
                        {getRankIcon(user.rank)}
                        <span className="text-sm font-bold text-muted-foreground">
                          #{user.rank}
                        </span>
                      </div>

                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-xs truncate">{user.username}</h3>
                        <div className="flex items-center gap-1.5 text-xs">
                          <Badge variant="secondary" className="text-[8px] px-1 py-0 max-w-[60px] truncate">
                            {user.league.replace(' League', '')}
                          </Badge>
                          <div className="flex items-center gap-0.5">
                            <Trophy className="w-2.5 h-2.5 text-primary" />
                            <span className="text-muted-foreground text-[9px]">{user.impactScore}</span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <Flame className="w-2.5 h-2.5 text-secondary" />
                            <span className="text-muted-foreground text-[9px]">{user.growthScore}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button
                        onClick={() => handleChallenge(user)}
                        className="bg-gradient-to-r from-primary to-primary-glow text-[9px] h-6 px-1.5"
                        size="sm"
                      >
                        <Swords className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="Gold League" className="space-y-4 mt-6">
            {filteredLeaderboard
              .filter(user => user.league === "Gold League")
              .map((user) => (
                <Card key={user.id} className="p-3 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="flex items-center gap-1 w-8 flex-shrink-0">
                        {getRankIcon(user.rank)}
                        <span className="text-sm font-bold text-muted-foreground">
                          #{user.rank}
                        </span>
                      </div>

                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-xs truncate">{user.username}</h3>
                        <div className="flex items-center gap-1.5 text-xs">
                          <Badge variant="secondary" className="text-[8px] px-1 py-0 max-w-[60px] truncate">
                            {user.league.replace(' League', '')}
                          </Badge>
                          <div className="flex items-center gap-0.5">
                            <Trophy className="w-2.5 h-2.5 text-primary" />
                            <span className="text-muted-foreground text-[9px]">{user.impactScore}</span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <Flame className="w-2.5 h-2.5 text-secondary" />
                            <span className="text-muted-foreground text-[9px]">{user.growthScore}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button
                        onClick={() => handleChallenge(user)}
                        className="bg-gradient-to-r from-primary to-primary-glow text-[9px] h-6 px-1.5"
                        size="sm"
                      >
                        <Swords className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="Silver League" className="space-y-4 mt-6">
            {filteredLeaderboard
              .filter(user => user.league === "Silver League")
              .map((user) => (
                <Card key={user.id} className="p-3 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="flex items-center gap-1 w-8 flex-shrink-0">
                        {getRankIcon(user.rank)}
                        <span className="text-sm font-bold text-muted-foreground">
                          #{user.rank}
                        </span>
                      </div>

                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.username[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-xs truncate">{user.username}</h3>
                        <div className="flex items-center gap-1.5 text-xs">
                          <Badge variant="secondary" className="text-[8px] px-1 py-0 max-w-[60px] truncate">
                            {user.league.replace(' League', '')}
                          </Badge>
                          <div className="flex items-center gap-0.5">
                            <Trophy className="w-2.5 h-2.5 text-primary" />
                            <span className="text-muted-foreground text-[9px]">{user.impactScore}</span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <Flame className="w-2.5 h-2.5 text-secondary" />
                            <span className="text-muted-foreground text-[9px]">{user.growthScore}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button
                        onClick={() => handleChallenge(user)}
                        className="bg-gradient-to-r from-primary to-primary-glow text-[9px] h-6 px-1.5"
                        size="sm"
                      >
                        <Swords className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Challenge Dialog */}
      {/* Challenge Dialog */}
      <Dialog open={challengeDialog} onOpenChange={setChallengeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Swords className="w-5 h-5 text-primary" />
              Challenge {selectedUser?.username}
            </DialogTitle>
            <DialogDescription>
              Set your wager and challenge them to maintain their streak!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Choose Activity</label>
              <Select defaultValue="active">
                <SelectTrigger>
                  <SelectValue placeholder="Select an activity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Use Active Challenge</SelectItem>
                  <SelectItem value="new">Create New Activity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Wager Amount (Points)</label>
              <Input
                type="number"
                min={10}
                max={selectedUser ? Math.floor(selectedUser.impactScore * 0.5) : 10}
                value={wagerAmount}
                onChange={(e) => setWagerAmount(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground">
                Min: 10 points | Max: {selectedUser ? Math.floor(selectedUser.impactScore * 0.5) : 0} points (50% of their score)
              </p>
            </div>

            <Card className="p-4 bg-muted/50">
              <h4 className="font-semibold mb-2">Challenge Rules:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Both users must accept the challenge</li>
                <li>• If they fail their daily goal, you gain {wagerAmount} points</li>
                <li>• If they succeed, they keep their points + {Math.floor(wagerAmount * 0.05)} bonus (5%)</li>
                <li>• Challenge expires after 3 days if not accepted</li>
                <li>• Visible on both profiles for accountability</li>
              </ul>
            </Card>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setChallengeDialog(false)}>
              Cancel
            </Button>
            <Button onClick={sendChallenge} className="bg-gradient-to-r from-primary to-primary-glow">
              Send Challenge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default LeaderboardPage;
