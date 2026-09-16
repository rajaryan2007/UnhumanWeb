import { Wrench, Code2, Film, FileText, Download, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import IconLogo from "@/components/ui/logo-icon.svg?react";

const navLinks = [
  { to: "/", label: "Home", icon: Code2 },
  { to: "/features", label: "Features", icon: Code2 },
  { to: "/showcase", label: "Showcase", icon: Film },
  { to: "/docs", label: "Docs", icon: FileText },
  { to: "/download", label: "Download", icon: Download },
];

function NavLinkButton({ to, label, icon: Icon }: { to: string; label: string; icon: React.ElementType }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-2 text-sm font-medium transition-colors text-white/70 hover:text-white",
          isActive && "text-primary"
        )
      }
    >
      <Icon
        className={cn(
          "h-4 w-4 transition-colors",
          isActive ? "text-primary" : "text-white/50 group-hover:text-white"
        )}
        aria-hidden="true"
      />
      {label}
    </NavLink>
  );
}

export function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans flex flex-col relative">
      {/* Ambient base layers */}
      <div className="pointer-events-none fixed inset-0 -z-20 scanline-gradient" aria-hidden="true" />
      <div
        className="pointer-events-none fixed top-1/3 left-1/4 h-[60vh] w-[60vw] rounded-full opacity-20 blur-[120px] -z-10"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, rgba(120, 130, 255, 0.55), transparent 70%)" } }
      />
      <div
        className="pointer-events-none fixed bottom-0 right-0 h-[50vh] w-[50vw] rounded-full opacity-15 blur-[120px] -z-10"
        aria-hidden="true"
        style={{ background: "radial-gradient(circle, rgba(255, 110, 200, 0.45), transparent 70%)" } }
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 h-[72px] flex justify-between items-center px-6 md:px-10 z-50 glass">
        <NavLink
          to="/"
          className="flex items-center gap-2 group"
          aria-label="Unhuman Engine home"
        >
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 ring-1 ring-primary/30 transition-colors group-hover:bg-primary/20">
            <Code2 className="h-4 w-4 text-primary" aria-hidden="true" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            <span className="text-white/90">UNHUMAN</span>
            <span className="text-primary">ENGINE</span>
          </span>
        </NavLink>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLinkButton key={link.to} {...link} />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button asChild className="hidden sm:inline-flex">
            <a
              href="https://github.com/rajaryan2007/UNHUMAN"
              target="_blank"
              rel="noreferrer"
              className="gap-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.29 3.495.975.105-.78.42-1.29.765-1.695-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </Button>
        </div>
      </nav>

      <main className="flex-1 pt-[72px]">
        <Outlet />
      </main>

      <footer className="relative z-10 border-t border-white/5 backdrop-blur-sm bg-background/40">
        <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col items-center justify-between gap-4 md:flex-row text-sm text-white/50">
          <div>
            &copy; {new Date().getFullYear()} Unhuman Engine. Open source under the hood.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/rajaryan2007/UNHUMAN"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a href="/docs" className="hover:text-white transition-colors">
              Documentation
            </a>
            <a href="/download" className="hover:text-white transition-colors">
              Downloads
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
