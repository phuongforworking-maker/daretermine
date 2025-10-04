import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  niches: string[];
  difficulties: string[];
}

const NICHES = [
  { value: "reading", label: "📚 Reading", icon: "📚" },
  { value: "sports", label: "⚽ Sports", icon: "⚽" },
  { value: "cooking", label: "🍳 Cooking", icon: "🍳" },
  { value: "work", label: "💼 Work", icon: "💼" },
  { value: "study", label: "📖 Study", icon: "📖" },
  { value: "fitness", label: "💪 Fitness", icon: "💪" },
  { value: "mindfulness", label: "🧘 Mindfulness", icon: "🧘" },
  { value: "creativity", label: "🎨 Creativity", icon: "🎨" },
];

const DIFFICULTIES = ["Easy", "Medium", "Hard", "Expert"];

const SearchFilter = ({ onSearch, onFilterChange }: SearchFilterProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    niches: [],
    difficulties: [],
  });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleNicheToggle = (niche: string) => {
    const newNiches = filters.niches.includes(niche)
      ? filters.niches.filter((n) => n !== niche)
      : [...filters.niches, niche];
    
    const newFilters = { ...filters, niches: newNiches };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDifficultyToggle = (difficulty: string) => {
    const newDifficulties = filters.difficulties.includes(difficulty)
      ? filters.difficulties.filter((d) => d !== difficulty)
      : [...filters.difficulties, difficulty];
    
    const newFilters = { ...filters, difficulties: newDifficulties };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = { niches: [], difficulties: [] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const activeFilterCount = filters.niches.length + filters.difficulties.length;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search challenges..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuLabel>Filter by Niche</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {NICHES.map((niche) => (
              <DropdownMenuCheckboxItem
                key={niche.value}
                checked={filters.niches.includes(niche.value)}
                onCheckedChange={() => handleNicheToggle(niche.value)}
              >
                <span className="mr-2">{niche.icon}</span>
                {niche.label.split(" ")[1]}
              </DropdownMenuCheckboxItem>
            ))}
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter by Difficulty</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {DIFFICULTIES.map((difficulty) => (
              <DropdownMenuCheckboxItem
                key={difficulty}
                checked={filters.difficulties.includes(difficulty)}
                onCheckedChange={() => handleDifficultyToggle(difficulty)}
              >
                {difficulty}
              </DropdownMenuCheckboxItem>
            ))}

            {activeFilterCount > 0 && (
              <>
                <DropdownMenuSeparator />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.niches.map((niche) => {
            const nicheData = NICHES.find((n) => n.value === niche);
            return (
              <Badge key={niche} variant="secondary" className="cursor-pointer" onClick={() => handleNicheToggle(niche)}>
                {nicheData?.icon} {nicheData?.label.split(" ")[1]}
                <span className="ml-2">×</span>
              </Badge>
            );
          })}
          {filters.difficulties.map((difficulty) => (
            <Badge key={difficulty} variant="outline" className="cursor-pointer" onClick={() => handleDifficultyToggle(difficulty)}>
              {difficulty}
              <span className="ml-2">×</span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
