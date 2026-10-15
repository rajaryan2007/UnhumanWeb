import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** GitHub mark. Brand icons are no longer shipped by lucide, so it is inlined. */
export function GithubMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

/** Micro-type for labels, indices and units. */
export function MonoLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("mono-label", className)}>{children}</span>;
}

/** Numbered section header with a hairline rule, e.g. `02 / BUILD`. */
export function SectionHeading({
  index,
  title,
  aside,
  children,
  className,
}: {
  index: string;
  title: string;
  aside?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("mb-6 border-b border-border pb-4", className)}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <MonoLabel>{index}</MonoLabel>
        <h2 className="text-xl font-medium tracking-tight text-foreground md:text-2xl">{title}</h2>
        {aside ? <div className="ml-auto">{aside}</div> : null}
      </div>
      {children ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{children}</p>
      ) : null}
    </header>
  );
}

/** Terminal-style block: optional caption strip plus preformatted lines. */
export function CodeBlock({
  caption,
  lines,
  className,
}: {
  caption?: string;
  lines: string[];
  className?: string;
}) {
  return (
    <figure className={cn("panel overflow-hidden", className)}>
      {caption ? (
        <figcaption className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2">
          <span className="status-dot text-muted-foreground/70" />
          <MonoLabel>{caption}</MonoLabel>
        </figcaption>
      ) : null}
      <pre className="code-block rounded-none border-0">
        <code>
          {lines.map((line, i) => (
            <span key={i} className="block whitespace-pre">
              {line.startsWith("#") || line.trim() === "" ? (
                <span className="opacity-50">{line}</span>
              ) : (
                <>
                  <span className="select-none text-accent-text">$ </span>
                  {line}
                </>
              )}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
