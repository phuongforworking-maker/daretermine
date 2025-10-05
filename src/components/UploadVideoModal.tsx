import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UploadVideoModal = () => {
  const [open, setOpen] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Video Challenge Created! 🎥",
      description: "Your challenge has been added to the video feed",
    });
    setOpen(false);
    setVideoPreview(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-20 md:bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-primary-glow hover:shadow-xl z-20"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Video</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="video">Challenge Video</Label>
            <div className="mt-2">
              <Input
                id="video"
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                required
              />
            </div>
            {videoPreview && (
              <div className="mt-4 relative rounded-lg overflow-hidden">
                <video src={videoPreview} className="w-full h-48 object-cover" controls />
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="title">Challenge Title</Label>
            <Input
              id="title"
              placeholder="e.g., 30-Day Morning Yoga Journey"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your challenge with hashtags..."
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              placeholder="e.g., 30 days"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fitness & Health">Fitness & Health</SelectItem>
                <SelectItem value="Mindfulness & Wellness">Mindfulness & Wellness</SelectItem>
                <SelectItem value="Creativity & Arts">Creativity & Arts</SelectItem>
                <SelectItem value="Learning & Skills">Learning & Skills</SelectItem>
                <SelectItem value="Social Impact">Social Impact</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            <Video className="w-4 h-4 mr-2" />
            Create Challenge
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadVideoModal;
