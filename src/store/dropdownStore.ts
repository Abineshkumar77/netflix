import { create } from "zustand";

type DropdownState = {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
};

export const useDropdownStore = create<DropdownState>((set) => ({
  selectedValue: "",
  setSelectedValue: (value) => set({ selectedValue: value }),
}));
