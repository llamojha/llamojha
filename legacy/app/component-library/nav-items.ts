export type LibraryNavItem = {
  href: string;
  label: string;
  variant?: "subtle" | "secondary";
  isExternal?: boolean;
};

export const libraryNavItems: LibraryNavItem[] = [
  { href: "#foundations", label: "Foundations" },
  { href: "#interactions", label: "Interactions" },
  { href: "#content", label: "Content" },
  { href: "#utilities", label: "Utilities" },
  { href: "/component-library/download", label: "Download CSS", isExternal: true },
  { href: "/", label: "Back to portfolio", variant: "secondary" }
];
