import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface CreateChallengeForm {
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  category: string;
}

interface CreateChallengeModalProps {
  onCreateChallenge?: (challenge: CreateChallengeForm) => void;
}

const CreateChallengeModal = ({ onCreateChallenge }: CreateChallengeModalProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CreateChallengeForm>({
    title: "",
    description: "",
    duration: "",
    difficulty: "",
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateChallenge?.(form);
    setForm({
      title: "",
      description: "",
      duration: "",
      difficulty: "",
      category: "",
    });
    setOpen(false);
  };

  const categories = [
    "Fitness & Health",
    "Learning & Skills", 
    "Creativity & Arts",
    "Mindfulness & Wellness",
    "Productivity & Goals",
    "Social & Community"
  ];

  const difficulties = ["Easy", "Medium", "Hard", "Expert"];
  const durations = ["3 days", "7 days", "14 days", "21 days", "30 days", "60 days", "100 days"];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-success to-success-light hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
          <Plus className="w-4 h-4 mr-2" />
          Create Challenge
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Create New Challenge
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Challenge Title</Label>
            <Input
              id="title"
              placeholder="e.g., 30-Day Morning Yoga Journey"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your challenge and what participants will do..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Duration</Label>
              <Select value={form.duration} onValueChange={(value) => setForm({ ...form, duration: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Difficulty</Label>
              <Select value={form.difficulty} onValueChange={(value) => setForm({ ...form, difficulty: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label>Category</Label>
            <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-primary-glow">
            Create Challenge
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChallengeModal;