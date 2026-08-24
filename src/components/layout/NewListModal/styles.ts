export interface NewListModalStyles {
  form: string;
  folderGroup: string;
  folderLabel: string;
  folderSelect: string;
  actions: string;
}

const styles: NewListModalStyles = {
  form: "flex flex-col gap-4",
  folderGroup: "flex flex-col gap-1.5",
  folderLabel: "text-xs font-medium text-ebony-300",
  folderSelect: `
    w-full cursor-pointer rounded-lg border border-border-subtle
    bg-surface-overlay px-3 py-2 text-sm text-ebony-100 transition-colors
    focus:border-congress-500 focus:outline-hidden focus:ring-1
    focus:ring-congress-500 [&>option]:bg-surface-overlay
  `,
  actions: "flex justify-end gap-2 pt-1",
};

export { styles };
