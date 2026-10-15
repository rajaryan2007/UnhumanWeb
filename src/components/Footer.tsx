import { Link } from "react-router-dom";
import { MonoLabel } from "@/components/kit";
import { BUILD, links } from "@/lib/site";

const columns = [
  {
    title: "Engine",
    items: [
      { label: "Source", href: links.repo },
      { label: "Releases", href: links.releases },
      { label: "Roadmap", href: links.roadmap },
      { label: "Issue tracker", href: links.issues },
    ],
  },
  {
    title: "Docs",
    items: [
      { label: "Docs index", href: links.docsIndex },
      { label: "Vulkan sync & render graph", href: links.architecture("vulkan-sync-and-rendergraph.md") },
      { label: "Job system", href: links.architecture("jobsystem.md") },
      { label: "Libraries", href: `${links.repo}/blob/master/docs/reference/libraries.md` },
    ],
  },
  {
    title: "Project",
    items: [
      { label: "Contributing", href: links.contributing },
      { label: "IDEA.md", href: links.idea },
      { label: "MIT licence", href: links.license },
      { label: "Discord", href: links.discord },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_repeat(3,1fr)] md:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/icon.png" alt="" className="brand-mark h-6 w-auto" />
            <span className="flex items-baseline gap-1.5">
              <span className="text-[15px] font-medium tracking-tight text-foreground">unhuman</span>
              <MonoLabel>engine</MonoLabel>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A hand-written real-time 3D engine for robotics and games. Open source under MIT, Linux
            first, developed in the open.
          </p>
          <Link
            to="/docs"
            className="link-underline mono-label mt-5 inline-block text-foreground"
          >
            Read the docs
          </Link>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <MonoLabel>{column.title}</MonoLabel>
            <ul className="mt-4 space-y-2.5">
              {column.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Status bar — mirrors the engine's build string. */}
      <div className="border-t border-border">
        <div className="mono-label mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3 md:px-8">
          <span className="flex items-center gap-2 text-foreground">
            <span className="status-dot" />
            {BUILD.version}
          </span>
          <span>{BUILD.standard}</span>
          <span>{BUILD.api}</span>
          <span>{BUILD.platform}</span>
          <span>{BUILD.license}</span>
          <span className="ml-auto normal-case tracking-normal">
            © {new Date().getFullYear()} Unhuman Engine
          </span>
        </div>
      </div>
    </footer>
  );
}
