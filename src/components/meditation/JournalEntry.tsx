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
    <div className="w-[500px] p-6 bg-white rounded-lg shadow-sm">
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
        className="min-h-[120px] resize-none transition-colors duration-200"
        maxLength={maxLength}
        disabled={disabled}
      />

      <div className="flex justify-end mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange("")}
          disabled={disabled || !value}
          className="text-sm"
        >
          Clear
        </Button>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Optional: Use this space to reflect on your meditation experience
      </p>
    </div>
  );
};

export default JournalEntry;
