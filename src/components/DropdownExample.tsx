"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useDropdownStore } from "@/store/dropdownStore";

export default function DropdownExample() {
  const { selectedValue, setSelectedValue } = useDropdownStore();

  return (
    <div className="flex flex-col gap-4">
      <Select value={selectedValue} onValueChange={setSelectedValue}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">🍎 Apple</SelectItem>
          <SelectItem value="banana">🍌 Banana</SelectItem>
          <SelectItem value="orange">🍊 Orange</SelectItem>
        </SelectContent>
      </Select>

      <p className="text-sm text-muted-foreground">
        Selected:{" "}
        <span className="font-semibold">{selectedValue || "None"}</span>
      </p>
    </div>
  );
}
