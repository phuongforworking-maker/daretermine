import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

type TimeFrame = "7days" | "1month" | "3months" | "1year";

interface GrowthChartProps {
  impactScore: number;
  growthScore: number;
}

const GrowthChart = ({ impactScore, growthScore }: GrowthChartProps) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("7days");

  // Generate sample data based on time frame
  const generateData = (frame: TimeFrame) => {
    const dataPoints: { [key in TimeFrame]: number } = {
      "7days": 7,
      "1month": 30,
      "3months": 12,
      "1year": 12,
    };

    const labels: { [key in TimeFrame]: string[] } = {
      "7days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      "1month": Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      "3months": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].slice(0, 12),
      "1year": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    };

    const points = dataPoints[frame];
    const currentImpact = impactScore;
    const currentGrowth = growthScore;

    return Array.from({ length: points }, (_, i) => {
      const progress = (i + 1) / points;
      return {
        name: labels[frame][i] || `Point ${i + 1}`,
        impact: Math.round(currentImpact * progress * (0.7 + Math.random() * 0.3)),
        growth: Math.round(currentGrowth * progress * (0.7 + Math.random() * 0.3)),
      };
    });
  };

  const data = generateData(timeFrame);

  const timeFrameButtons: { value: TimeFrame; label: string }[] = [
    { value: "7days", label: "7 Days" },
    { value: "1month", label: "1 Month" },
    { value: "3months", label: "3 Months" },
    { value: "1year", label: "1 Year" },
  ];

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Growth Analytics
        </h2>
        <div className="flex gap-2">
          {timeFrameButtons.map((btn) => (
            <Button
              key={btn.value}
              variant={timeFrame === btn.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeFrame(btn.value)}
              className="text-xs"
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="name" 
            className="text-xs"
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            className="text-xs"
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '14px' }}
          />
          <Line 
            type="monotone" 
            dataKey="impact" 
            stroke="hsl(217, 91%, 60%)" 
            strokeWidth={2}
            name="Social Impact"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="growth" 
            stroke="hsl(20, 100%, 60%)" 
            strokeWidth={2}
            name="Personal Growth"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'hsl(217, 91%, 60%)' }} />
          <span>Social Impact</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: 'hsl(20, 100%, 60%)' }} />
          <span>Personal Growth</span>
        </div>
      </div>
    </Card>
  );
};

export default GrowthChart;
