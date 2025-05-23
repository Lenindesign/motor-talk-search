
import React from "react";
import { ArrowRight, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ComparisonItem {
  id: string;
  title: string;
  cars: [string, string];
  imageUrls: [string, string]; 
  views: string;
  url: string;
}

interface TrendingComparisonsProps {
  items: ComparisonItem[];
  className?: string;
}

const TrendingComparisons: React.FC<TrendingComparisonsProps> = ({
  items,
  className
}) => {
  return (
    <Card className={cn("bg-gray-50 shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <Flame size={18} className="text-motortrend-red" />
          Trending Comparisons
        </CardTitle>
        <a href="/compare" className="flex items-center gap-1 text-xs font-medium text-motortrend-red hover:underline">
          See All
          <ArrowRight size={12} />
        </a>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {items.map((item) => (
            <a 
              key={item.id}
              href={item.url}
              className="group flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-white hover:shadow-sm"
            >
              <div className="flex w-24 flex-shrink-0 items-center justify-center">
                <div className="relative h-14 w-14">
                  <img
                    src={item.imageUrls[0]}
                    alt={item.cars[0]}
                    className="absolute left-0 top-0 h-10 w-10 rounded-md object-cover shadow-sm"
                  />
                  <img
                    src={item.imageUrls[1]}
                    alt={item.cars[1]}
                    className="absolute bottom-0 right-0 h-10 w-10 rounded-md object-cover shadow-sm"
                  />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-100 p-1 text-xs font-bold">
                    VS
                  </div>
                </div>
              </div>
              <div className="flex-grow">
                <h4 className="text-sm font-medium group-hover:text-motortrend-red">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {item.views} views
                </p>
              </div>
              <ArrowRight size={14} className="text-gray-400 group-hover:text-motortrend-red" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingComparisons;
