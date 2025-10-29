"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { libraryNavItems } from "./nav-items";

export function LibraryHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 48rem)");

    const handleChange = () => {
      if (mediaQuery.matches) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    handleChange();

    const addChangeListener = () => {
      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      }

      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    };

    const removeChangeListener = addChangeListener();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      removeChangeListener();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="navbar container-content docs-header" aria-expanded={isOpen}>
      <div className="navbar-inner">
        <div className="cluster">
          <span className="badge">llamojha.css</span>
          <span className="small">Warm-tech design tokens & components</span>
        </div>
        <nav
          className="navbar-menu"
          id="component-library-menu"
          aria-label="Component library shortcuts"
          onClick={() => setIsOpen(false)}
        >
          {libraryNavItems.map(({ href, label, variant = "subtle", isExternal }) => {
            const className = `button button-${variant}`;
            if (isExternal) {
              return (
                <a key={href} className={className} href={href}>
                  {label}
                </a>
              );
            }

            return (
              <Link key={href} className={className} href={href}>
                {label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          className="navbar-toggle"
          aria-expanded={isOpen}
          aria-controls="component-library-menu"
          aria-haspopup="true"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsOpen((previous) => !previous)}
        >
          <span aria-hidden="true">☰</span>
        </button>
      </div>
    </header>
  );
}
