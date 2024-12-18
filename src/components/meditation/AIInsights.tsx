import React from "react";
import { Card } from "@/components/ui/card";
import { Sparkles, Brain, ArrowRight } from "lucide-react";

interface AIInsightsProps {
  insights?: string[];
  suggestions?: string[];
  isLoading?: boolean;
}

const AIInsights = ({
  insights = [
    "Your meditation practice is becoming more consistent",
    "You tend to feel more peaceful after longer sessions",
  ],
  suggestions = [
    "Try focusing on breath awareness in your next session",
    "Consider meditating at the same time each day",
  ],
  isLoading = false,
}: AIInsightsProps) => {
  return (
    <div className="w-[500px] bg-white rounded-lg shadow-sm">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-medium">AI Wellness Insights</h3>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <div className="animate-pulse flex gap-2 text-gray-400">
              <Sparkles className="w-5 h-5" />
              <span>Generating insights...</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Insights Section */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-600">
                Observations
              </h4>
              <ul className="space-y-2">
                {insights.map((insight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <Sparkles className="w-4 h-4 mt-0.5 text-purple-400" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggestions Section */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-600">Suggestions</h4>
              <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <ArrowRight className="w-4 h-4 mt-0.5 text-blue-400" />
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AIInsights;
