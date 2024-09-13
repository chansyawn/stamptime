"use client";

import { Input } from "@/components/ui/input";

interface TimestampBreakdownInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  width: string;
}

const handleWheel = (e: WheelEvent) => {
  e.stopPropagation();
};

export function TimestampBreakdownInput({
  label,
  value,
  onChange,
  width,
}: TimestampBreakdownInputProps) {
  return (
    <div className="relative">
      <Input
        ref={(node) => {
          node?.addEventListener("wheel", handleWheel);
          return () => {
            node?.removeEventListener("wheel", handleWheel);
          };
        }}
        onFocus={(e) => {
          e.target.select();
        }}
        type="number"
        style={{ width }}
        className="bg-transparent"
        value={value}
        onChange={(e) => {
          if (isNaN(e.target.valueAsNumber)) {
            return;
          }
          onChange(e.target.valueAsNumber);
        }}
      />
      <div className="absolute inset-y-0 right-4 -z-10 flex items-center text-xs leading-none opacity-40">
        {label}
      </div>
    </div>
  );
}
