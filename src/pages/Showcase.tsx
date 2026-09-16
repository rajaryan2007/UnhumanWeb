import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";
import { Play, Code2, Film, Layers, Eye, Sliders, Monitor } from "lucide-react";

const showcaseItems = [
  {
    label: "Scene composition",
    items: [
      { label: "Entities", value: "348" },
      { label: "Meshes", value: "112" },
      { label: "Lights", value: "18" },
      { label: "Scripts", value: "24" },
    ],
  },
  {
    label: "Frame snapshot",
    items: [
      { label: "FPS", value: "187" },
      { label: "GPU", value: "0.9ms" },
      { label: "Draw calls", value: "1.2k" },
      { label: "Triangles", value: "410k" },
    ],
  },
  {
    label: "Workload distribution",
    items: [
      { label: "Render", value: "58%" },
      { label: "Physics", value: "14%" },
      { label: "Scripts", value: "18%" },
      { label: "UI", value: "10%" },
    ],
  },
];

export function ShowcasePage() {
  const [selected, setSelected] = useState<typeof showcaseItems[number] | null>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative px-6 pb-24 md:px-10">
      <div className="mx-auto max-w-6xl pt-20 md:pt-28">
        <div className="text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-primary uppercase">
            Real-time demo
          </span>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Inside a running frame
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-white/60">
            A quick look at how the editor exposes scenes, render costs, and profiling data
            while the runtime is live.
          </p>
        </div>
      </div>

      {/* Hero video card */}
      <section className="mt-14 md:mt-20">
        <Card className="overflow-hidden glow-border bloom group">
          <div className="relative aspect-video overflow-hidden bg-[#000] shadow-2xl">
            <a
              href="https://youtu.be/CHDIU61auYo"
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <img
                src="https://img.youtube.com/vi/CHDIU61auYo/maxresdefault.jpg"
                alt="Engine Gameplay Demo"
                className="h-full w-full object-cover transition-opacity group-hover:opacity-90"
              />
            </a>
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity group-hover:bg-black/20">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white transition-transform hover:scale-105"
                aria-label={playing ? "Pause demo" : "Play demo"}
              >
                {playing ? (
                  <span className="h-5 w-5">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full" aria-hidden="true">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  </span>
                ) : (
                  <Play className="h-7 w-7 ml-1" aria-hidden="true" />
                )}
              </button>
            </div>
            <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              LIVE CAPTURE
            </div>
          </div>

          <div className="flex items-center justify-between px-6 py-5">
            <div>
              <h3 className="text-white font-semibold">Real-time Rendering & Physics Demo</h3>
              <p className="mt-1 text-sm text-white/50">
                Vulkan RHI + Slang materials + editor playback
              </p>
            </div>
            <Button asChild>
              <a
                href="https://youtu.be/CHDIU61auYo"
                target="_blank"
                rel="noreferrer"
              >
                Open on YouTube
              </a>
            </Button>
          </div>
        </Card>
      </section>

      {/* Metrics + tools */}
      <section className="mt-20 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className="text-xl font-semibold text-white">Frame data at a glance</h2>
          <p className="mt-2 text-sm text-white/50">
            Switch between scene stats, frame timing, and workload breakdown.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {showcaseItems.map((block) => (
              <button
                key={block.label}
                onClick={() => setSelected(block)}
                className={`rounded-xl border text-left transition-all ${
                  selected?.label === block.label
                    ? "border-primary/40 bg-primary/10 shadow-lg shadow-primary/10"
                    : "border-white/10 bg-[#0b0d12] hover:border-white/20"
                }`}
              >
                <div className="px-4 py-3 text-sm font-medium text-white">{block.label}</div>
                <ul className="px-4 pb-4 grid gap-3 text-sm">
                  {block.items.map((item) => (
                    <li key={item.label} className="flex justify-between gap-2 text-white/70">
                      <span>{item.label}</span>
                      <span className="font-mono text-white">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <Card className="glow-border bloom">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-primary/10">
                  <Monitor className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-white">Editor tooling</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-[#0b0d12] p-3">
                <Eye className="mt-0.5 h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-sm font-medium text-white">Scene inspector</div>
                  <div className="text-xs text-white/50">Live entity + component tree</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-[#0b0d12] p-3">
                <Sliders className="mt-0.5 h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-sm font-medium text-white">Render settings</div>
                  <div className="text-xs text-white/50">Passes, materials, post FX</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-[#0b0d12] p-3">
                <Layers className="mt-0.5 h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-sm font-medium text-white">Asset browser</div>
                  <div className="text-xs text-white/50">Import, preview, replace</div>
                </div>
              </div>

              <Divider className="border-white/10" />

              <div className="flex justify-between text-xs text-white/40">
                <span>Scene snapshot</span>
                <span>v0.2.0 preview</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Capabilties strip */}
      <section className="mt-20">
        <div className="rounded-xl border border-white/10 bg-[#0b0d12] p-6">
          <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-white/40">
            What the demo shows
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: Film, label: "Playback", value: "In-editor preview and recorded capture" },
              { icon: Code2, label: "Shader flow", value: "Slang materials and runtime hot reload" },
              { icon: Layers, label: "Scene graph", value: "Entities, components, and systems visible" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-start gap-3 rounded-lg border border-white/10 p-4">
                  <Icon className="mt-0.5 h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-sm font-medium text-white">{item.label}</div>
                    <div className="text-xs text-white/50">{item.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
