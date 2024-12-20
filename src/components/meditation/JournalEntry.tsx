import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface JournalEntryProps {
  value?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
  disabled?: boolean;
}

const JournalEntry = ({
  value = "",
  onChange = () => {},
  maxLength = 500,
  placeholder = "Share your thoughts and feelings about this meditation session...",
  disabled = false,
}: JournalEntryProps) => {
  const characterCount = value.length;

  return (
    <div className="w-full max-w-[500px] p-4 sm:p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-medium">Journal Entry</h3>
        </div>
        <span className="text-sm text-gray-500">
          {characterCount}/{maxLength} characters
        </span>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[120px] sm:min-h-[150px] resize-none transition-colors duration-200 focus:ring-2 focus:ring-blue-100 border-gray-200"
        maxLength={maxLength}
        disabled={disabled}
      />

      <div className="flex justify-end mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange("")}
          disabled={disabled || !value}
          className="text-sm hover:bg-gray-50"
        >
          Clear
        </Button>
      </div>

      <p className="text-xs sm:text-sm text-gray-500 mt-4 italic">
        Optional: Use this space to reflect on your meditation experience
      </p>
    </div>
  );
};

export default JournalEntry;
