import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Layers,
  Cpu,
  Monitor,
  Wrench,
  GitBranch,
  Mouse,
  HardDrive,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  items: { label: string; value: string }[];
  icon: React.ElementType;
  tags: string[];
};

const sections: { title: string; subtitle: string; features: Feature[] }[] = [
  {
    title: "Core runtime",
    subtitle: "The foundation that stays out of the way while you iterate.",
    features: [
      {
        title: "Entity Component System",
        description:
          "Data-driven scenes with fast iteration, serialization, and script components you can hot-reload while testing.",
        icon: Layers,
        tags: ["ECS", "Serialization"],
        items: [
          { label: "Components", value: "Transform, Mesh, Script" },
          { label: "Systems", value: "Frame-driven processing" },
          { label: "Assets", value: "Scene + config pipelines" },
        ],
      },
      {
        title: "Platform Abstraction",
        description:
          "Input, windowing, and asset handling are abstracted so the same runtime can target desktop and embedded contexts.",
        icon: Monitor,
        tags: ["Cross-platform", "Input"],
        items: [
          { label: "Windows", value: "Primary build target" },
          { label: "Linux", value: "Editor + runtime" },
          { label: "Input", value: "Unified event layer" },
        ],
      },
    ],
  },
  {
    title: "Rendering & shaders",
    subtitle: "A rendering stack you can inspect frame by frame.",
    features: [
      {
        title: "Vulkan RHI",
        description:
          "A fully abstracted Render Hardware Interface sits on modern Vulkan for maximum performance and predictable frame budgets.",
        icon: Monitor,
        tags: ["Rendering", "Vulkan"],
        items: [
          { label: "Passes", value: "Render + resolve paths" },
          { label: "Performance", value: "Low overhead submission" },
          { label: "Debug", value: "Frame inspection hooks" },
        ],
      },
      {
        title: "Slang Shader Compiler",
        description:
          "Next-gen shading language support with dynamic compilation, cross-platform targets, and SPIR-V generation.",
        icon: Code2,
        tags: ["Shaders", "Tooling"],
        items: [
          { label: "Language", value: "Slang" },
          { label: "Output", value: "SPIR-V" },
          { label: "Workflow", value: "Hot reload + errors" },
        ],
      },
    ],
  },
  {
    title: "Editor & tooling",
    subtitle: "Inspect, profile, and ship without leaving the runtime.",
    features: [
      {
        title: "UHE Editor",
        description:
          "A robust, dockable ImGui-based editor for scene inspection, profiling, and asset management.",
        icon: Wrench,
        tags: ["Editor", "Profiling"],
        items: [
          { label: "UI", value: "ImGui docking" },
          { label: "Scenes", value: "Live inspection" },
          { label: "Assets", value: "Browser + import" },
        ],
      },
      {
        title: "Tooling & Profiling",
        description:
          "Frame debuggers, CPU/GPU timelines, and log exporters built into the editor runtime.",
        icon: Cpu,
        tags: ["Profiling", "Telemetry"],
        items: [
          { label: "CPU", value: "Timeline views" },
          { label: "GPU", value: "Frame cost" },
          { label: "Logs", value: "Exportable traces" },
        ],
      },
    ],
  },
];

export function FeaturesPage() {
  return (
    <div className="relative px-6 pb-24 md:px-10">
      <div className="mx-auto max-w-5xl pt-20 md:pt-28">
        <div className="text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-primary uppercase">
            Engine architecture
          </span>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            What makes up Unhuman
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-white/60">
            Each subsystem is exposed, inspectable, and intended to be extended rather than hidden
            behind a black box.
          </p>
        </div>
      </div>

      {sections.map((section, index) => (
        <section key={section.title} className="mt-24 md:mt-32">
          <div className="mb-10 border-b border-white/10 pb-3">
            <h2 className="text-2xl font-bold text-white md:text-3xl">{section.title}</h2>
            <p className="mt-2 text-white/60">{section.subtitle}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {section.features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="glow-border bloom group transition-transform hover:-translate-y-1"
                >
                  <CardHeader className="flex flex-row items-start gap-4 pb-2">
                    <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-2">
                    <p className="text-white/60 text-sm">{feature.description}</p>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {feature.items.map((item) => (
                        <div key={item.label} className="rounded-lg border border-white/10 bg-[#0b0d12] px-4 py-3">
                          <div className="text-xs text-white/40">{item.label}</div>
                          <div className="mt-0.5 text-sm font-medium text-white">{item.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {feature.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-white/10 text-white/70">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      ))}

      {/* Tech stack strip */}
      <section className="mt-28 md:mt-36">
        <div className="rounded-xl border border-white/10 bg-[#0b0d12] p-6">
          <h3 className="text-sm font-medium text-white/40 uppercase tracking-widest">Stack</h3>
          <div className="mt-5 flex flex-wrap gap-6 text-sm text-white/60">
            {[
              { icon: HardDrive, label: "C++17 runtime" },
              { icon: GitBranch, label: "Modules & plugins" },
              { icon: Mouse, label: "ImGui editor UI" },
              { icon: Monitor, label: "Vulkan RHI" },
              { icon: Code2, label: "Slang shaders" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
