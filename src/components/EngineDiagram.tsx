import { useState } from "react";
import { MonoLabel } from "@/components/kit";
import { links } from "@/lib/site";

/**
 * Frame-pipeline schematic. Nodes mirror real names in UHE/src (Application ·
 * LayerStack · Scene · Jobsystem · Physics · Renderer3D · Platform/Vulkan),
 * and every node links to the directory it names — the descriptions are the
 * same ones `Docs.tsx` carries in its source-layout table, so the two cannot
 * drift without one of them going stale in review.
 *
 * The render-graph slot is dashed because the backend is still a stub —
 * see docs/README.md ("Code state the documents assume").
 *
 * Hover or tab to a node: it inverts, and the strip under the diagram says what
 * it does and where it lives.
 */

type Node = { title: string; sub: string; path: string; note: string };

const chain: (Node & { x: number })[] = [
  {
    x: 76,
    title: "Application",
    sub: "LayerStack · loop",
    path: "UHE/src/UHE/Core",
    note: "Application and layer loop, entry point, logging, window and input abstraction.",
  },
  {
    x: 222,
    title: "Scene",
    sub: "entt ECS · YAML",
    path: "UHE/src/UHE/Scene",
    note: "entt entities and components, scene camera, YAML scene serialisation.",
  },
  {
    x: 368,
    title: "Task graph",
    sub: "job workers",
    path: "UHE/src/UHE/Jobsystem",
    note: "Worker threads and the task graph the frame is scheduled on.",
  },
  {
    x: 514,
    title: "Renderer 2D/3D",
    sub: "lights · SSAO",
    path: "UHE/src/UHE/Renderer",
    note: "Camera and editor camera, framebuffer, sprite/2D path, 3D path with lights, SSAO and animator.",
  },
  {
    x: 660,
    title: "Vulkan RHI",
    sub: "volk · VMA",
    path: "UHE/src/Platform/Vulkan",
    note: "The Vulkan backend: instance, physical/logical device, pipeline state, descriptor manager, VMA usage. The sync2 path is in progress.",
  },
  {
    x: 806,
    title: "Swapchain",
    sub: "fences · present",
    path: "UHE/src/Platform/Vulkan",
    note: "The finished frame is presented through the swapchain, with its frame context and fences.",
  },
];

const shader: Node & { x: number; y: number } = {
  x: 498,
  y: 16,
  title: "Slang → SPIR-V",
  sub: "runtime compile",
  path: "UHE/src/UHE/Renderer",
  note: "Slang is compiled to SPIR-V at runtime, resolved through the shader manager and a virtual file system.",
};

const feeders: (Node & { x: number })[] = [
  {
    x: 76,
    title: "Physics step",
    sub: "Jolt (3D) · Box2D (2D)",
    path: "UHE/src/UHE/Physics",
    note: "The 3D physics system, stepped from the engine loop; Box2D handles the 2D path.",
  },
  {
    x: 308,
    title: "ImGui editor",
    sub: "dock · gizmos · drag-drop",
    path: "UHE/src/UHE/ImGui",
    note: "Editor layer: docking, gizmos, input routing and the log sink.",
  },
  {
    x: 540,
    title: "sandbox · tests/",
    sub: "ModelTestLayer · ctest -L unit",
    path: "sandbox",
    note: "The test application — layers that exercise renderer and editor — plus the CTest unit tests. Together they are the acceptance test.",
  },
];

const gap: Node & { x: number; y: number } = {
  x: 772,
  y: 196,
  title: "Render graph",
  sub: "coming soon · stub in tree",
  path: "UHE/src/Platform/Vulkan",
  note: "Builder, compiler, executor and resources are designed and present in the tree, with no bodies and no callers yet.",
};

/* Frame, rules and connectors keep their own colours and no interaction; the
   nodes themselves are styled by `.dg-*` so they can invert on hover/focus. */
const LINE = { stroke: "hsl(var(--border))" };
const ACCENT = { stroke: "hsl(var(--foreground))" };
const WARN_RULE = { stroke: "hsl(var(--warn))" };

const NODE_W = 124;
const NODE_H = 54;
const SLOT_W = 212;

function Arrow({ from, to }: { from: number; to: number }) {
  return (
    <g style={LINE} strokeWidth="1" fill="none">
      <path d={`M${from} 118 H${to - 6}`} />
      <path d={`M${to - 9} 115 L${to} 118 L${to - 9} 121`} style={ACCENT} strokeOpacity="0.7" />
    </g>
  );
}

function DiagramNode({
  node,
  width,
  height,
  boxY,
  stub,
  onEnter,
}: {
  node: Node & { x: number };
  width: number;
  height: number;
  boxY: number;
  stub?: boolean;
  onEnter: (node: Node | null) => void;
}) {
  const titleY = boxY + 24;
  return (
    <a
      href={links.module(node.path)}
      target="_blank"
      rel="noreferrer"
      className={"dg-node" + (stub ? " dg-stub" : "")}
      aria-label={`${node.title} — ${node.note} Opens ${node.path} on GitHub.`}
      onMouseEnter={() => onEnter(node)}
      onMouseLeave={() => onEnter(null)}
      onFocus={() => onEnter(node)}
      onBlur={() => onEnter(null)}
    >
      <rect className="dg-box" x={node.x} y={boxY} width={width} height={height} rx="3" />
      <text className="dg-title" x={node.x + 12} y={titleY} fontSize="11.5">
        {node.title}
      </text>
      <text className="dg-sub" x={node.x + 12} y={titleY + 15} fontSize="9">
        {node.sub}
      </text>
      <text className="dg-go" x={node.x + width - 16} y={boxY + 14} fontSize="11" aria-hidden="true">
        ↗
      </text>
    </a>
  );
}

export default function EngineDiagram() {
  const [node, setNode] = useState<Node | null>(null);

  return (
    <div>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 1000 256"
          role="group"
          aria-label="Engine loop: Application and LayerStack feed the entt Scene, the task graph drives Renderer2D/3D, shaders come from Slang, and the Vulkan RHI presents through the swapchain. Physics stepping (Jolt 3D, Box2D 2D), the ImGui editor and the sandbox tests hang off the same loop; the render graph is still a stub. Every node opens the directory it names."
          className="min-w-[760px] w-full"
          style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
        >
          {/* main chain */}
          {chain.map((n, i) => (
            <g key={n.title}>
              <DiagramNode
                node={n}
                width={NODE_W}
                height={NODE_H}
                boxY={92}
                onEnter={setNode}
              />
              {i < chain.length - 1 ? <Arrow from={n.x + NODE_W} to={chain[i + 1].x} /> : null}
            </g>
          ))}

          {/* shader path into the renderer */}
          <DiagramNode node={shader} width={152} height={44} boxY={16} onEnter={setNode} />
          <g style={LINE} fill="none">
            <path d="M574 60 V92" />
            <path d="M571 87 L574 92 L577 87" style={ACCENT} strokeOpacity="0.7" />
          </g>

          {/* row that feeds / hangs off the loop */}
          {feeders.map((n) => (
            <g key={n.title}>
              <DiagramNode node={n} width={SLOT_W} height={44} boxY={196} onEnter={setNode} />
              <path
                d={`M${n.x + SLOT_W / 2} 196 V180`}
                style={LINE}
                fill="none"
                strokeDasharray="3 4"
              />
            </g>
          ))}
          <path d="M182 180 H646" style={LINE} fill="none" strokeDasharray="3 4" />
          <path d="M430 180 V152" style={LINE} fill="none" strokeDasharray="3 4" />

          {/* the gap: render graph backend */}
          <g>
            <path d="M878 196 V180" style={WARN_RULE} fill="none" strokeDasharray="3 4" />
            <DiagramNode node={gap} width={212} height={44} boxY={196} stub onEnter={setNode} />
          </g>
        </svg>
      </div>

      {/* What the node under the cursor or the focus ring does. The label column
          is fixed so switching nodes never moves the paragraph. */}
      <div className="mt-4 flex min-h-[5.5rem] items-start gap-5 border-t border-border pt-3">
        <MonoLabel className="mt-0.5 w-40 shrink-0 text-accent-text">
          {node ? node.title : "Engine loop"}
        </MonoLabel>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            {node
              ? node.note
              : "Hover a node — or tab through them — to see what it does. Every node opens the directory it names."}
          </p>
          {node ? (
            <a
              href={links.module(node.path)}
              target="_blank"
              rel="noreferrer"
              className="link-underline mono mt-2 inline-block text-[12px] text-foreground"
            >
              {node.path} ↗
            </a>
          ) : (
            <p className="mono mt-2 text-[12px] text-foreground/45">UHE/src · sandbox/ · tests/</p>
          )}
        </div>
      </div>
    </div>
  );
}
