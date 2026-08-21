import type { NewSpaceModalStyles } from "./types";

const styles: NewSpaceModalStyles = {
  form: "flex flex-col gap-4",
  colorsFieldset: "border-0 p-0 m-0",
  legend: "mb-1.5 text-xs font-medium text-ebony-300",
  colors: "flex flex-wrap gap-2",
  colorSwatch: `
    size-7 cursor-pointer rounded-full ring-2 ring-transparent
    transition-transform hover:scale-110 focus-visible:outline-hidden
  `,
  colorSelected: "ring-2 ring-white scale-110",
  actions: "flex justify-end gap-2 pt-1",
};

export { styles };
