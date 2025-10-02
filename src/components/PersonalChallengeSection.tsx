import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Users } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ChallengeSuggestion {
  id: string;
  title: string;
  duration: string;
  participants: number;
  category: string;
}

const suggestedChallenges: ChallengeSuggestion[] = [
  { id: "1", title: "7-Day Early Morning Routine", duration: "7 days", participants: 5420, category: "Productivity" },
  { id: "2", title: "14-Day Reading Challenge", duration: "14 days", participants: 3240, category: "Learning" },
  { id: "3", title: "30-Day No Sugar Challenge", duration: "30 days", participants: 8900, category: "Health" },
  { id: "4", title: "21-Day Gratitude Journal", duration: "21 days", participants: 6700, category: "Mindfulness" },
  { id: "5", title: "7-Day Digital Detox", duration: "7 days", participants: 4100, category: "Wellness" },
  { id: "6", title: "30-Day Coding Challenge", duration: "30 days", participants: 2800, category: "Skills" },
  { id: "7", title: "14-Day Cold Shower Challenge", duration: "14 days", participants: 1900, category: "Health" },
  { id: "8", title: "7-Day Vegan Challenge", duration: "7 days", participants: 3500, category: "Lifestyle" },
];

const PersonalChallengeSection = () => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");

  const filteredSuggestions = suggestedChallenges.filter((challenge) =>
    challenge.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleCreateCustom = () => {
    // This will be handled by the CreateChallengeModal
    console.log("Create custom challenge", { searchValue, selectedDuration });
  };

  return (
    <Card className="p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Create Your Personal Challenge</h2>
      
      <div className="space-y-4">
        {/* Search/Input Field */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            What do you want to accomplish?
          </label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {searchValue || "Type your challenge or browse suggestions..."}
                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput
                  placeholder="Search challenges..."
                  value={searchValue}
                  onValueChange={setSearchValue}
                />
                <CommandList>
                  <CommandEmpty>
                    <div className="p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-3">
                        No matching challenges found
                      </p>
                      <Button
                        size="sm"
                        onClick={handleCreateCustom}
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        Create "{searchValue}"
                      </Button>
                    </div>
                  </CommandEmpty>
                  <CommandGroup heading="Popular Challenges">
                    {filteredSuggestions.map((challenge) => (
                      <CommandItem
                        key={challenge.id}
                        onSelect={() => {
                          setSearchValue(challenge.title);
                          setOpen(false);
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex-1">
                            <p className="font-medium">{challenge.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {challenge.duration}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {challenge.participants.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Duration Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            How long do you want to commit?
          </label>
          <div className="flex flex-wrap gap-2">
            {["7 days", "14 days", "21 days", "30 days", "60 days", "90 days"].map((duration) => (
              <Badge
                key={duration}
                variant={selectedDuration === duration ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => setSelectedDuration(duration)}
              >
                {duration}
              </Badge>
            ))}
          </div>
        </div>

        {/* Create Button */}
        <Button
          className="w-full"
          disabled={!searchValue || !selectedDuration}
          onClick={handleCreateCustom}
        >
          <Plus className="w-4 h-4 mr-2" />
          Start Your Challenge
        </Button>
      </div>
    </Card>
  );
};

export default PersonalChallengeSection;