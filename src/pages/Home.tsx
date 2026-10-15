import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import EngineDiagram from "@/components/EngineDiagram";
import { CodeBlock, GithubMark, MonoLabel, SectionHeading } from "@/components/kit";
import ContributionSkyline from "@/components/ui/contribution-skyline";
import ScrollExpandVideo from "@/components/ui/scroll-expansion-video";
import SculptureHero, { type HeroLinkRenderer } from "@/components/ui/liquid-sculpture-hero";
import contributions from "@/lib/contributions.json";
import { useTheme } from "@/lib/theme";
import { links } from "@/lib/site";

/** Hero links go through the router, except the ones that leave the site. */
const RouterLink: HeroLinkRenderer = ({ href, className, children }) => {
  if (/^https?:/.test(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
};

const specs = [
  { key: "Domain", value: "Robotics · Games" },
  { key: "RHI", value: "Vulkan 1.1+" },
  { key: "Shaders", value: "Slang → SPIR-V" },
  { key: "ECS", value: "entt" },
  { key: "Physics", value: "Jolt 3D · Box2D 2D" },
  { key: "Tooling", value: "ImGui · Tracy" },
];

/** Layer names, test labels and API names are real entry points in the repository. */
const readouts = [
  ["capture", "1920 × 1080 · webm"],
  ["layer", "sandbox · ModelTestLayer"],
  ["editor", "ImGui · docking"],
  ["tests", "ctest -L unit"],
] as const;

/** What a robotics/simulation workload actually leans on, all present in UHE/src. */
const simulation = [
  ["Physics stepping", "Jolt bodies advanced by PhysicsSystem3D::Update(Timestep); Box2D for 2D."],
  ["Parallel work", "Job system and task graph keep batches off the frame thread."],
  ["Headless runs", "The CI smoke test renders offscreen on Lavapipe — no display needed."],
  ["Scene as text", "YAML serialisation and fastgltf import keep scenes diffable."],
];

const legend = [
  { label: "Built", color: "text-foreground" },
  { label: "In progress", color: "text-warn" },
  { label: "Coming soon", color: "text-muted-foreground" },
];

const subsystems = [
  {
    index: "01",
    title: "Vulkan RHI",
    body: "Hand-written backend on volk and VMA: instance, device, swapchain, pipeline state, deferred deletion, modernised descriptors. Sync2 path with a 1.1 fallback in progress.",
    href: links.module("UHE/src/Platform/Vulkan"),
  },
  {
    index: "02",
    title: "Shader system",
    body: "Slang compiled to SPIR-V at runtime, resolved through the shader manager and a virtual file system so asset paths stay portable.",
    href: links.module("UHE/src/UHE/Renderer"),
  },
  {
    index: "03",
    title: "Scene and editor",
    body: "entt ECS with an ImGui editor: docking, gizmos, drag-and-drop, yaml-cpp scene serialisation and fastgltf model import.",
    href: links.module("UHE/src/UHE/Scene"),
  },
  {
    index: "04",
    title: "Runtime",
    body: "Job system and task graph, miniaudio backend, MSDF text, Tracy instrumentation, and CI that builds both platforms under sanitizers.",
    href: links.module("UHE/src/UHE/Jobsystem"),
  },
];

const build = [
  "# recursive: engine vendors its deps",
  `git clone --recursive ${links.repo}`,
  "cmake --preset default && cmake --build --preset default -j",
];

export default function Home() {
  const { mode } = useTheme();

  return (
    <>
      {/* ---------------------------------------------------------- hero */}
      <SculptureHero
        showNav={false}
        loadFonts={false}
        linkComponent={RouterLink}
        theme={mode}
        height="calc(100svh - 3.5rem)"
        eyebrow="Open source engine — C++23 · Vulkan · MIT"
        headline={"A robotics and games engine,\nwritten by hand."}
        headlineAccent="by hand."
        body="Vulkan RHI without a framework doing the thinking, Slang shaders compiled at runtime, entt ECS, and Jolt and Box2D physics stepped on the engine clock."
        primaryCta={{ label: "Read the docs", href: "/docs" }}
        secondaryCta={{ label: "Source on GitHub", href: links.repo }}
        backdropText="unhuman"
        background="#EBE9E5"
        darkBackground="#111110"
        accentColor="hsl(var(--accent-text))"
        sculptureScale={1.12}
        sculptureY={-3}
        still
      />

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        {/* ------------------------------------------------------- spec strip */}
        <section className="pt-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pb-4">
            <MonoLabel className="text-foreground/60">UHE / REV v0.01-alpha</MonoLabel>
            <span className="flex items-center gap-2">
              <span className="status-dot text-accent-text" />
              <MonoLabel className="text-accent-text">Active development</MonoLabel>
            </span>
            <a
              href={links.repo}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 text-[13.5px] text-foreground/70 transition-colors hover:text-foreground"
            >
              <GithubMark className="h-3.5 w-3.5" />
              unhuman-engine/UNHUMAN
            </a>
          </div>

          <dl className="panel grid grid-cols-2 overflow-hidden sm:grid-cols-3 lg:grid-cols-6">
            {specs.map((spec) => (
              <div
                key={spec.key}
                className="border-b border-r border-border px-4 py-2.5 last:border-r-0"
              >
                <dt className="mono-label">{spec.key}</dt>
                <dd className="mono mt-1 text-[13px] text-foreground">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {/* ------------------------------------------- capture, the ink chapter */}
      <section className="ink mt-14 py-14">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading index="01" title="Capture">
            The sandbox runs the model test layer with the editor attached — the same loop the
            engine ships, rendered on the engine clock.
          </SectionHeading>
        </div>

        <ScrollExpandVideo
          src="/demo.webm"
          poster="/demo-poster.webp"
          title="unhuman sandbox"
          hint="Keep scrolling"
          facts={readouts}
        />
      </section>

      <div className="mx-auto max-w-6xl px-5 md:px-8">

        {/* -------------------------------------------------- commit history */}
        <section className="pt-16">
          <SectionHeading
            index="02"
            title="Commit history"
            aside={
              <a
                href={`${links.repo}/commits/master`}
                target="_blank"
                rel="noreferrer"
                className="link-underline mono-label inline-flex items-center gap-1.5 text-foreground"
              >
                Commits on GitHub
                <ArrowUpRight className="h-3 w-3" />
              </a>
            }
          >
            Every commit on master, counted by day — snapshot {contributions.generated}. The flat heat
            map folds up into the skyline of the same grid: drag to orbit, hover a day for its count.
          </SectionHeading>

          <ContributionSkyline data={contributions.days} unit="commit" palette="mono" />
        </section>

        {/* --------------------------------------------- engine loop + sim */}
        <section id="pipeline" className="scroll-mt-20 pt-16">
          <SectionHeading
            index="03"
            title="Engine loop"
            aside={
              <a
                href={links.architecture("vulkan-sync-and-rendergraph.md")}
                target="_blank"
                rel="noreferrer"
                className="link-underline mono-label inline-flex items-center gap-1.5 text-foreground"
              >
                Sync &amp; render graph doc
                <ArrowUpRight className="h-3 w-3" />
              </a>
            }
          >
            Application and LayerStack feed the entt scene, the task graph drives the renderer, and
            the Vulkan RHI presents through the swapchain.
          </SectionHeading>

          <div className="panel p-4 md:p-6">
            <EngineDiagram />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            {legend.map((item) => (
              <span key={item.label} className="flex items-center gap-2">
                <span className={`status-dot ${item.color}`} />
                <MonoLabel className={item.color}>{item.label}</MonoLabel>
              </span>
            ))}
            <MonoLabel className="ml-auto text-foreground/45">
              Every node opens its source
            </MonoLabel>
          </div>

          {/* What a simulation workload leans on */}
          <dl
            id="simulation"
            className="mt-10 grid scroll-mt-20 grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4"
          >
            {simulation.map(([title, body]) => (
              <div key={title} className="border-b border-r border-border px-5 py-4">
                <dt className="text-[13.5px] font-medium text-foreground">{title}</dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{body}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------------------------------------------------- subsystems */}
        <section id="architecture" className="scroll-mt-20 pt-16">
          <SectionHeading
            index="04"
            title="Subsystems"
            aside={
              <a
                href={links.module("UHE/src")}
                target="_blank"
                rel="noreferrer"
                className="link-underline mono-label inline-flex items-center gap-1.5 text-foreground"
              >
                Browse the tree
                <ArrowUpRight className="h-3 w-3" />
              </a>
            }
          />

          <div className="grid grid-cols-1 border-l border-t border-border md:grid-cols-2">
            {subsystems.map((item) => (
              <a
                key={item.index}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group border-b border-r border-border p-6 transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none md:p-7"
              >
                <div className="flex items-baseline justify-between">
                  <MonoLabel>{item.index}</MonoLabel>
                  <ArrowUpRight className="h-4 w-4 text-foreground/25 transition-colors group-hover:text-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-medium tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </a>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------- start here */}
        <section className="pt-16">
          <SectionHeading index="05" title="Build it">
            Submodules are vendored, Slang is fetched by the setup script, and CMake presets cover
            debug, release and every sanitizer.
          </SectionHeading>

          <div className="panel grid gap-6 p-6 md:grid-cols-[1fr_1.2fr] md:items-center md:p-7">
            <div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Clone, configure, build — no external dependencies to chase. The in-repo documents
                carry the build matrix, the presets and the status of every subsystem.
              </p>
              <a
                href={links.docsIndex}
                target="_blank"
                rel="noreferrer"
                className="link-underline mono-label mt-5 inline-flex items-center gap-1.5 text-foreground"
              >
                In-repo documentation
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
            <CodeBlock caption="shell" lines={build} />
          </div>
        </section>
      </div>
    </>
  );
}
