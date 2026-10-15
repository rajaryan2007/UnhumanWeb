import type { ReactNode } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { CodeBlock, MonoLabel } from "@/components/kit";
import { REPO, links } from "@/lib/site";

/* Every value on this page is traceable to the engine repository:
   IDEA.md, CONTRIBUTING.md, CMakeLists.txt, CMakePresets.json, .gitmodules,
   docs/reference/libraries.md and the checked-in source tree. */

const sections = [
  { id: "overview", label: "Overview" },
  { id: "requirements", label: "Requirements" },
  { id: "build", label: "Build" },
  { id: "presets", label: "Presets" },
  { id: "tests", label: "Tests & profiling" },
  { id: "layout", label: "Source layout" },
  { id: "libraries", label: "Third-party" },
  { id: "status", label: "Status" },
  { id: "roadmap", label: "Roadmap · coming soon" },
  { id: "docs-to-write", label: "Docs to write" },
  { id: "contributing", label: "Contributing" },
  { id: "in-repo-docs", label: "In-repo docs" },
  { id: "releases", label: "Releases" },
];

const requirements = [
  ["OS", "Linux (primary target) · Windows"],
  ["GPU", "Vulkan 1.1+ — low-end floor is Vega 7 / GFX9 class hardware"],
  ["Headless", "The renderer also runs offscreen (CI smoke test renders on Lavapipe, no display needed)"],
  ["Compiler", "C++23 capable: GCC, Clang or MSVC"],
  ["Build", "CMake ≥ 3.21 (presets) + Ninja"],
  ["Git", "clone with submodules — dependencies are vendored"],
  ["Python", "python3, used by script/Setup.py to fetch Slang"],
];

const presets = [
  ["default", "build/", "no sanitizer, multi-config style"],
  ["debug", "build_debug/", "Debug, asserts on"],
  ["release", "build-release/", "Release, optimised"],
  ["sanitizer", "build_san/", "Debug + the sanitizers you pass in -DUHE_SANITIZER=<name>"],
  ["asan · ubsan · asan-ubsan · lsan", "build_asan/ · build_ubsan/ · build_asan_ubsan/ · build_lsan/", "one dedicated build dir each"],
  ["tsan", "build_tsan/", "ThreadSanitizer — must run alone"],
  ["msan", "build_msan/", "MemorySanitizer — Clang + instrumented libc++ only"],
];

const layout = [
  ["UHE/src/UHE/Core", "application and layer loop, entry point, logging, window/input abstraction"],
  ["UHE/src/UHE/RHI", "backend-agnostic device, command buffer, swapchain, shader and texture interfaces"],
  ["UHE/src/Platform/Vulkan", "the Vulkan backend: instance, physical/logical device, swapchain, pipelines, descriptor manager, render graph (builder · compiler · executor · resources), VMA usage"],
  ["UHE/src/Platform/Linux · Windows", "platform windows, input, platform utils"],
  ["UHE/src/UHE/Renderer · Renderer2D · Renderer3D", "camera and editor camera, framebuffer, Slang compiler, sprite/2D path, 3D path with lights, SSAO and animator"],
  ["UHE/src/UHE/Scene", "entt entities and components, scene camera, YAML scene serialisation"],
  ["UHE/src/UHE/Jobsystem", "worker threads and task graph"],
  ["UHE/src/UHE/Audio", "audio engine on a miniaudio backend"],
  ["UHE/src/UHE/Physics", "3D physics system; Box2D handles the 2D path"],
  ["UHE/src/UHE/ImGui", "editor layer, docking, input routing, log sink"],
  ["UHE/src/UHE/Debug", "Tracy instrumentation setup"],
  ["UHE/src/UHE/AssestsManager", "shader manager and virtual file system (path-based; naming debt tracked in the roadmap)"],
  ["UHE/src/UHE/Animation", "sprite animation"],
  ["UHE/src/UHE/Math · Utils · Events", "math, object pool, YAML and platform utils, event types"],
  ["sandbox/", "the test application — layers that exercise renderer and editor, used as the acceptance test"],
  ["tests/", "CTest unit tests (rendergraph, scene)"],
];

const libraries = [
  ["ECS", "entt"],
  ["Rendering", "volk, VulkanMemoryAllocator, GLFW, glm, Glad, Slang (fetched by script/Setup.py)"],
  ["Shaders & text", "msdf-atlas-gen"],
  ["Scene & assets", "fastgltf, yaml-cpp, stb_image"],
  ["Editor", "imgui, imGuizmo"],
  ["Physics", "Jolt (3D), Box2D (2D)"],
  ["Audio", "miniaudio"],
  ["Profiling & logging", "Tracy, spdlog"],
];

/** Status chips use the engine's own vocabulary (docs/ROADMAP.md). */
const tones = {
  built: "text-foreground border-foreground/25 bg-foreground/[0.04]",
  progress: "text-warn border-warn/30 bg-warn/10",
  soon: "text-muted-foreground border-border bg-foreground/[0.02]",
} as const;

function Chip({ label, tone }: { label: string; tone: keyof typeof tones }) {
  return (
    <span
      className={`mono-label inline-flex whitespace-nowrap rounded-full border px-2.5 py-0.5 ${tones[tone]}`}
    >
      {label}
    </span>
  );
}

/** Area, state, chip label, chip tone — from IDEA.md plus the docs/ status blocks. */
const status = [
  ["Vulkan backend", "Works on GFX9; descriptor backend modernised; sync2 path plus a Vulkan 1.1 fallback in progress (PR #27)", "in progress", "progress"],
  ["JobSystem + TaskGraph", "Implemented and documented", "built", "built"],
  ["Rendering", "Deferred-ish single-pass renderer, PBR-ish shading, MSDF text", "partial", "progress"],
  ["glTF", "Partial: baseColor + metallicRoughness only — foliage and multi-node models render wrong (#29)", "partial", "progress"],
  ["Audio", "miniaudio integration landed; assets, voices and buses not designed in yet", "partial", "progress"],
  ["Assets", "Path-based, no registry, AssestsManager naming debt; registry and async load are phase A of a design doc (#24)", "design", "soon"],
  ["Render graph", "Designed in detail, empty stub in the tree — RenderGraphVulkan.* has no bodies and no callers", "stub", "soon"],
  ["Scripting", "Lua 5.4 + sol2 designed in docs/architecture/scripting.md (#28); no code yet", "design", "soon"],
  ["Compute pipeline", "VulkanComputePipeline.* exists but is referenced nowhere else", "unused", "soon"],
  ["CI", "Builds both platforms, headless Lavapipe smoke test, sanitizer workflows; unit-test rollout still partial", "partial", "progress"],
  ["Editor", "ImGui editor, docking, gizmos, drag-and-drop; entity hierarchy is single-parent only (#17)", "partial", "progress"],
] as const;

/** Order and status from docs/WORK_ORDER.md — the repo's short "what comes next" list. */
const roadmap = [
  ["1", "Vulkan sync", "Capability tiers, barrier and submit encoders, legacy fallback toggle, CI legacy leg, timeline semaphores, deferred destruction", "in progress", "progress", [2, 27, 31]],
  ["2", "Multithreading", "Per-thread command pools, work-stealing queues, coroutine continuations, secondary command-buffer recording, TaskGraph driving the frame", "in progress", "progress", [5, 37]],
  ["3", "RHI core and descriptors", "Explicit barriers, copy and dispatch, queues and SubmitDesc, descriptor frontend with a global set bound once and per-pass sets", "coming soon", "soon", [30, 14]],
  ["4", "Render graph backend", "Resource-state tracking, builder and compiler (sort, cull, barriers), executor on TaskGraph, pipeline and render-pass caches", "coming soon", "soon", [4, 32, 35]],
  ["5", "Renderer and materials", "glTF correctness (alpha, cull, sRGB, normal, AO, node transforms), culling, instancing, shadows, IBL, post stack, extended PBR, KTX2", "coming soon", "soon", [29, 25, 7, 36, 42, 34, 43]],
  ["6", "Assets and audio", "Registry and stable IDs, async load on jobs, VFS with scenes storing IDs, dependency graph, audio voices and buses, cooked runtime format", "coming soon", "soon", [38, 45, 24]],
  ["7", "Editor, UI, animation, scripting", "Entity hierarchy, editor ergonomics (console, undo/redo, asset browser, play-in-editor), runtime UI, animation systems, Lua and sol2", "coming soon", "soon", [17, 28, 24, 41, 44]],
  ["8", "CI/CD", "Tier-0 gates and caching, sanitizer matrix and unit tests, Android compile gate, validation-strict GPU job with golden images, release and nightly", "coming soon", "soon", [9, 10, 39]],
] as const;

/** "Documents still to write" — copied verbatim in intent from docs/README.md (issue #12). */
const docsToWrite = [
  ["architecture/rendering-pipeline.md", "How a frame flows today, from draw list to RHI to Vulkan, for people landing pull requests. The existing docs describe where it should go rather than where it is."],
  ["architecture/ecs-and-scene.md", "entt usage, scene serialisation and the entity hierarchy (#17)."],
  ["dev/testing.md", "Running the headless renderer smoke and the sanitizer builds, and later CTest."],
  ["dev/build.md", "Presets, CMakePresets.json, sanitizer builds, and the Slang and vendor fetch."],
];

const contributing = [
  "C++23 only. Use modern standard-library and language features where they earn their place.",
  "Run clang-format before pushing; clang-tidy is advisory — apply common sense instead of obeying rules that hurt performance or readability.",
  "Include uhepch.h first in every .cpp; in headers prefer forward declarations over includes to keep build times down.",
  "One feature or fix per pull request, and never break the build on either platform.",
  "Complex systems (solvers, allocators) need a sandbox test layer proving they work and do not leak.",
  "Design docs live in docs/ with a status block, one topic per file, kebab-case names.",
  "Open an issue and add a roadmap row for new work; name the row in the PR body.",
  "Commit messages are prefixed with the subsystem: Vulkan:, Renderer:, AssetSystem:, Core:, Doc:.",
  "Sign the CLA before a first pull request is merged.",
];

/** File, covers, chip label, chip tone (docs/README.md status blocks). */
const inRepoDocs: (readonly [string, string] | readonly [string, string, string, keyof typeof tones])[] = [
  ["docs/README.md", "documentation index — start here"],
  ["docs/ROADMAP.md", "work order, status vocabulary, milestones, decision register"],
  ["docs/WORK_ORDER.md", "the short 'what comes next' list"],
  ["docs/architecture/vulkan-sync-and-rendergraph.md", "sync2 and legacy tiers, barrier and submit encoders, render-graph backend", "design", "soon"],
  ["docs/architecture/framegraph-and-rendergraph.md", "frame graph frontend vs render graph backend — the separate frontend layer was dropped", "archived", "soon"],
  ["docs/architecture/jobsystem.md", "job-system thread pool and TaskGraph DAG executor", "implemented", "built"],
  ["docs/architecture/assets-and-audio.md", "asset identity, refcounting, async load; audio voices and buses", "design", "soon"],
  ["docs/architecture/scripting.md", "Lua 5.4 with sol2: VM, bindings, ECS integration, hot reload", "design", "soon"],
  ["docs/architecture/ci-cd.md", "CI tiers, sanitizers, test infrastructure, rollout order", "partial", "progress"],
  ["docs/backlog/renderer.md", "Vulkan renderer status, mirroring issue #7"],
  ["docs/reference/libraries.md", "third-party library shortlist"],
  ["IDEA.md", "what the engine is, why it exists, what it is not"],
];

function DocLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`link-underline inline-flex items-baseline gap-1 text-foreground/90 hover:text-foreground ${className}`}
    >
      {children}
      <ArrowUpRight className="h-3 w-3 shrink-0 text-foreground/40" />
    </a>
  );
}

function Section({
  id,
  index,
  title,
  summary,
  children,
}: {
  id: string;
  index: string;
  title: string;
  summary?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border pt-8 pb-4">
      <header className="mb-5">
        <div className="flex items-baseline gap-3">
          <MonoLabel>{index}</MonoLabel>
          <h2 className="text-xl font-medium tracking-tight text-foreground md:text-2xl">
            {title}
          </h2>
        </div>
        {summary ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{summary}</p>
        ) : null}
      </header>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function KeyValue({ rows }: { rows: (string | ReactNode)[][] }) {
  return (
    <dl className="divide-y divide-border border-y border-border">
      {rows.map(([key, value], i) => (
        <div key={i} className="grid gap-1 py-3 sm:grid-cols-[220px_1fr] sm:gap-6">
          <dt className="mono text-[13px] text-foreground/60">{key}</dt>
          <dd className="text-sm leading-relaxed text-muted-foreground">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr>
            {head.map((cell) => (
              <th
                key={cell}
                className="mono-label border-b border-border pb-2 pr-6 font-normal text-foreground/50"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr key={i} className="align-top">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`py-3 pr-6 leading-relaxed ${j === 0 ? "mono text-[13px] text-foreground/85" : "text-muted-foreground"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Docs() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-8 md:px-8">
      <header className="pt-16 pb-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border pb-4">
          <MonoLabel className="text-foreground/40">~ / unhuman / docs</MonoLabel>
          <MonoLabel className="text-foreground/20">branch</MonoLabel>
          <span className="mono text-[11px] text-foreground/70">master</span>
          <span className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-1">
            {["C++23", "Vulkan 1.1+", "MIT"].map((chip) => (
              <MonoLabel key={chip} className="text-foreground/40">
                {chip}
              </MonoLabel>
            ))}
          </span>
        </div>

        <MonoLabel className="mt-8 block text-foreground/40">Documentation</MonoLabel>
        <h1 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Unhuman Engine, <span className="accent">as it actually is.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Build it, read the tree, and know which parts are finished. These pages track{" "}
          <DocLink href={REPO}>unhuman-engine/UNHUMAN</DocLink> — the repository stays the source of
          truth, including everything below marked as in progress.
        </p>
      </header>

      <div className="grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
        <nav aria-label="Documentation sections" className="lg:sticky lg:top-20 lg:self-start">
          <MonoLabel className="text-foreground/40">Sections</MonoLabel>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 lg:block lg:space-y-2.5">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="mono-label inline-flex items-baseline gap-2 transition-colors hover:text-foreground lg:flex"
                >
                  <span className="text-foreground/25">{String(i).padStart(2, "0")}</span>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={links.repo}
            target="_blank"
            rel="noreferrer"
            className="mt-6 hidden items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open the repository
          </a>
        </nav>

        <article>
          <Section
            id="overview"
            index="00"
            title="Overview"
            summary="UHE is a hand-written, cross-platform C++23 real-time 3D engine for robotics and games: a Vulkan RHI written directly against the API, Slang shaders compiled to SPIR-V at runtime, entt ECS, Jolt (3D) and Box2D (2D) physics stepped from the engine loop, an ImGui editor, a job system with a task graph, Tracy profiling, and a sandbox layer that acts as the only honest acceptance test."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="panel p-5">
                <MonoLabel>Non-negotiable</MonoLabel>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  <li>Vulkan 1.1–1.2 floor: a design that silently needs 1.3+ is wrong.</li>
                  <li>Linux primary, Windows supported; Android only to keep the fallback path honest.</li>
                  <li>One developer — work is phased, big-bang rewrites are rejected.</li>
                  <li>Nothing claimed without a scene or CI job that shows it.</li>
                </ul>
              </div>
              <div className="panel p-5">
                <MonoLabel>Deliberately not yet</MonoLabel>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  <li>A shipping engine for third parties: no marketplace, no scripting sandbox, no editor polish budget.</li>
                  <li>Multi-backend: the RHI is thin so a second backend is possible, not so it gets written now.</li>
                  <li>A feature checklist for its own sake — features land when a sandbox scene needs them.</li>
                </ul>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Read the reasoning in <DocLink href={links.idea}>IDEA.md</DocLink> and the order of work
              in <DocLink href={links.roadmap}>docs/ROADMAP.md</DocLink>.
            </p>
          </Section>

          <Section
            id="requirements"
            index="01"
            title="Requirements"
            summary="Anything else is not supported yet, and the engine does not pretend otherwise."
          >
            <KeyValue rows={requirements} />
          </Section>

          <Section
            id="build"
            index="02"
            title="Build"
            summary="Dependencies are vendored as submodules, so clone recursively. Setup.py fetches Slang; the presets handle the rest."
          >
            <CodeBlock
              caption="one-shot helper — setup, Ninja files, compile_commands"
              lines={[
                "git clone --recursive " + REPO,
                "cd UNHUMAN",
                "./GenerateProject.sh   # Windows: GenerateProject.bat",
                "cmake --build build -j",
              ]}
            />
            <CodeBlock
              caption="or drive CMake presets directly"
              lines={[
                "cmake --preset default",
                "cmake --build --preset default -j",
                "# artifacts land in bin/<cfg>-<sys>-x64-<sanitizers>/",
              ]}
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Debugging with clangd? Both paths symlink{" "}
              <span className="mono text-foreground/80">compile_commands.json</span> into the repository
              root. Sanitized binaries keep their own directory, so a sanitizer build never
              overwrites a normal one.
            </p>
          </Section>

          <Section
            id="presets"
            index="03"
            title="Presets"
            summary="Presets exist because mixing instrumented and clean objects in one build directory is a correctness bug. Use one directory per sanitizer; the build deletes stale objects when the flags change."
          >
            <Table head={["Preset", "Build dir", "Purpose"]} rows={presets} />
            <CodeBlock
              caption="pick a sanitizer without re-configuring"
              lines={[
                "cmake --preset sanitizer -DUHE_SANITIZER=address,undefined",
                "cmake --build --preset sanitizer -j",
                "cmake --preset sanitizer -DUHE_SANITIZER=none   # back to a plain build",
              ]}
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              ThreadSanitizer and MemorySanitizer must run alone; MemorySanitizer additionally needs
              Clang with an instrumented libc++.
            </p>
          </Section>

          <Section
            id="tests"
            index="04"
            title="Tests and profiling"
            summary="No-GPU unit tests are registered with CTest and built by default."
          >
            <CodeBlock
              caption="unit tests"
              lines={[
                "ctest -L unit              # or: ctest --test-dir build -L unit",
                "cmake --preset default -DUHE_TESTS=OFF   # skip building them",
              ]}
            />
            <KeyValue
              rows={[
                ["Tracy profiling", "On by default; disable with -DVG_PROFILE=OFF."],
                ["CI", "Builds Linux and Windows, runs a headless Lavapipe smoke test and the sanitizer workflows."],
                ["Acceptance test", "The sandbox application — layers such as TriangleTestLayer and ModelTestLayer exercise the renderer and editor."],
              ]}
            />
          </Section>

          <Section
            id="layout"
            index="05"
            title="Source layout"
            summary="One directory per subsystem, documented in-tree. Browse any row on GitHub."
          >
            <Table
              head={["Path", "Contents"]}
              rows={layout.map(([path, what]) => [
                <DocLink key={path} href={links.module(path.includes(" · ") ? path.split(" · ")[0] : path)}>
                  {path}
                </DocLink>,
                what,
              ])}
            />
          </Section>

          <Section
            id="libraries"
            index="06"
            title="Third-party"
            summary="Vendored as submodules and built from source; several are patched forks maintained alongside the engine. Slang is fetched by script/Setup.py."
          >
            <KeyValue rows={libraries} />
          </Section>

          <Section
            id="status"
            index="07"
            title="Status"
            summary="Snapshot taken from IDEA.md and the status blocks in docs/, dated 2026-09-13. Check the roadmap and issue tracker before relying on any row."
          >
            <Table
              head={["Area", "State", "Status"]}
              rows={status.map(([area, state, label, tone]) => [
                area,
                state,
                <Chip key={label} label={label} tone={tone} />,
              ])}
            />
          </Section>

          <Section
            id="roadmap"
            index="08"
            title="Roadmap"
            summary="The engine's work order, copied from docs/WORK_ORDER.md and docs/ROADMAP.md. Stages 1 and 2 are the current focus; the rest are coming soon, not started."
          >
            <Table
              head={["Stage", "Work", "Status", "Issues"]}
              rows={roadmap.map(([order, stage, work, label, tone, issues]) => [
                <span key={stage}>
                  <span className="mono mr-2 text-foreground/30">{order}</span>
                  {stage}
                </span>,
                work,
                <Chip key={label} label={label} tone={tone} />,
                <span key={`${order}-i`} className="mono text-[12px]">
                  {issues.map((issue, i) => (
                    <span key={issue}>
                      {i > 0 ? " · " : ""}
                      <a
                        href={`${REPO}/issues/${issue}`}
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline text-foreground/70 hover:text-foreground"
                      >
                        #{issue}
                      </a>
                    </span>
                  ))}
                </span>,
              ])}
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Dropped on 2026-09-24: the standalone FrameGraph frontend — feature code declares passes
              into the render graph backend directly. Deferred: terrain, water/SSR, memory aliasing.
            </p>
          </Section>

          <Section
            id="docs-to-write"
            index="09"
            title="Docs still to write"
            summary="Listed under 'Documents still to write' in docs/README.md and tracked as issue #12. Until then, the pages above are the whole story."
          >
            <Table
              head={["Planned file", "Will cover", "Status"]}
              rows={docsToWrite.map(([file, what]) => [
                <span key={file} className="mono text-[13px] text-foreground/80">
                  {file}
                </span>,
                what,
                <Chip key={`${file}-s`} label="coming soon" tone="soon" />,
              ])}
            />
            <p className="text-sm leading-relaxed text-muted-foreground">
              The list is maintained in the repository:{" "}
              <DocLink href={links.docsIndex}>docs/README.md</DocLink> ·{" "}
              <DocLink href={`${REPO}/issues/12`}>issue #12</DocLink>.
            </p>
          </Section>

          <Section
            id="contributing"
            index="10"
            title="Contributing"
            summary="The full rules live in CONTRIBUTING.md and CLA.md — this is the summary."
          >
            <ul className="space-y-3">
              {contributing.map((rule) => (
                <li key={rule} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mono mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                  {rule}
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Start with <DocLink href={links.contributing}>CONTRIBUTING.md</DocLink> and the{" "}
              <DocLink href={links.issues}>issue tracker</DocLink>.
            </p>
          </Section>

          <Section
            id="in-repo-docs"
            index="11"
            title="In-repo documentation"
            summary="The engine keeps its design docs next to the code, each opening with a status block. file:line references in them are snapshots — re-verify before acting."
          >
            <Table
              head={["File", "Covers", "Status"]}
              rows={inRepoDocs.map(([file, what, label, tone]) => [
                <DocLink
                  key={file}
                  href={file.startsWith("docs/") || file === "IDEA.md" ? `${REPO}/blob/master/${file}` : file}
                >
                  {file}
                </DocLink>,
                what,
                label && tone ? <Chip key={`${file}-s`} label={label} tone={tone} /> : <span className="text-foreground/25">reference</span>,
              ])}
            />
          </Section>

          <Section
            id="releases"
            index="12"
            title="Releases"
            summary="Pre-alpha tags only. Build from source unless you are specifically testing a release artifact."
          >
            <div className="flex flex-wrap gap-3">
              <a
                href={links.latestRelease}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/85"
              >
                v0.01-alpha
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={links.releases}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"
              >
                All releases
              </a>
              <a
                href={links.discord}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"
              >
                Discord
              </a>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Licence: <DocLink href={links.license}>MIT</DocLink>. Contributions are covered by the{" "}
              <DocLink href={`${REPO}/blob/master/CLA.md`}>CLA</DocLink>.
            </p>
          </Section>
        </article>
      </div>
    </div>
  );
}
