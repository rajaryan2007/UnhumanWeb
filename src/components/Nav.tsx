import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { MonoLabel } from "@/components/kit";
import { BUILD, links } from "@/lib/site";
import { useTheme } from "@/lib/theme";

const sections = [
  { to: "/#pipeline", label: "Engine" },
  { to: "/#simulation", label: "Simulation" },
  { to: "/docs", label: "Docs" },
];

const navLink = "text-[13.5px] tracking-[-0.005em] transition-colors";

export function Nav() {
  const { pathname } = useLocation();
  const { mode, toggle } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-5 md:gap-6 md:px-8">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="Unhuman Engine home"
        >
          <img src="/icon.png" alt="" className="brand-mark h-6 w-auto" />
          <span className="flex items-baseline gap-1.5">
            <span className="text-[15px] font-medium tracking-tight text-foreground">unhuman</span>
            <MonoLabel className="hidden sm:inline">engine</MonoLabel>
          </span>
        </Link>

        <div className="ml-auto flex shrink-0 items-center gap-3 md:gap-5">
          {sections.map((section) =>
            section.to.startsWith("/#") ? (
              <a
                key={section.to}
                href={pathname === "/" ? section.to.slice(1) : section.to}
                className={cn(navLink, "hidden text-foreground/70 hover:text-foreground md:inline")}
              >
                {section.label}
              </a>
            ) : (
              <NavLink
                key={section.to}
                to={section.to}
                className={({ isActive }) =>
                  cn(
                    navLink,
                    isActive
                      ? "text-foreground underline decoration-accent-text decoration-[3px] underline-offset-[6px]"
                      : "text-foreground/70 hover:text-foreground"
                  )
                }
              >
                {section.label}
              </NavLink>
            )
          )}

          <a
            href={links.repo}
            target="_blank"
            rel="noreferrer"
            className={cn(navLink, "hidden text-foreground/70 hover:text-foreground md:inline")}
          >
            GitHub
          </a>

          <button
            type="button"
            onClick={toggle}
            aria-label={mode === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="grid h-[34px] w-[34px] place-items-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            {mode === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href={links.releases}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-foreground/20 px-3.5 py-2 text-foreground/80 transition-colors hover:bg-foreground hover:text-background"
          >
            <span className="status-dot text-accent-text" />
            <span className="mono text-[11px] tracking-[0.02em]">{BUILD.version}</span>
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
          </a>
        </div>
      </nav>
    </header>
  );
}
