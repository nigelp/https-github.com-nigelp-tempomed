import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface SessionRatingProps {
  rating?: number;
  onRatingChange?: (rating: number) => void;
  disabled?: boolean;
}

const SessionRating = ({
  rating = 0,
  onRatingChange = () => {},
  disabled = false,
}: SessionRatingProps) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="w-full max-w-[500px] p-4 sm:p-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Rate your session</h3>

      <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto py-2">
        {stars.map((star) => (
          <button
            key={star}
            onClick={() => !disabled && onRatingChange(star)}
            className={cn(
              "p-1 sm:p-2 transition-all duration-200 hover:scale-110",
              disabled && "cursor-not-allowed opacity-50",
            )}
            disabled={disabled}
            aria-label={`Rate ${star} stars`}
          >
            <Star
              className={cn(
                "w-6 h-6 sm:w-8 sm:h-8",
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300",
              )}
            />
          </button>
        ))}
      </div>

      <div className="text-center mt-2 text-sm text-gray-500">
        {rating === 0
          ? "Select a rating"
          : rating === 1
            ? "Could be better"
            : rating === 2
              ? "It was okay"
              : rating === 3
                ? "Good session"
                : rating === 4
                  ? "Great session"
                  : "Excellent session!"}
      </div>
    </div>
  );
};

export default SessionRating;
