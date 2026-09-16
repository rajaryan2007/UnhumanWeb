import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, HardDrive, Monitor, Sparkles } from "lucide-react";

const GithubIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.29 3.495.975.105-.78.42-1.29.765-1.695-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
import { cn } from "@/lib/utils";

type Asset = {
  name: string;
  type: string;
  size: string;
  platforms: string[];
};

type Release = {
  version: string;
  date: string;
  label: string;
  note?: string;
  assets: Asset[];
};

const releases: Release[] = [
  {
    version: "0.2.0",
    date: "Latest",
    label: "Current",
    note: "Editor UI polish, profiling refresh, Linux editor support.",
    assets: [
      { name: "UHE Editor", type: "exe", size: "~185 MB", platforms: ["Windows"] },
      { name: "UHE Editor", type: "tar.gz", size: "~165 MB", platforms: ["Linux"] },
      { name: "Engine Runtime", type: "zip", size: "~97 MB", platforms: ["Windows", "Linux"] },
    ],
  },
  {
    version: "0.1.9",
    date: "2026-08-15",
    label: "Stable",
    note: "Stable Vulkan RHI baseline and improved scene serialization.",
    assets: [
      { name: "UHE Editor", type: "exe", size: "~179 MB", platforms: ["Windows"] },
      { name: "UHE Editor", type: "tar.gz", size: "~159 MB", platforms: ["Linux"] },
      { name: "Engine Runtime", type: "zip", size: "~93 MB", platforms: ["Windows", "Linux"] },
    ],
  },
  {
    version: "0.1.8",
    date: "2026-07-20",
    label: "Legacy",
    note: "Earlier Vulkan prototype branch.",
    assets: [
      { name: "UHE Editor", type: "exe", size: "~172 MB", platforms: ["Windows"] },
      { name: "Engine Runtime", type: "zip", size: "~89 MB", platforms: ["Windows"] },
    ],
  },
];

const badges: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Current: "default",
  Stable: "secondary",
  Legacy: "outline",
};

export function DownloadPage() {
  return (
    <div className="relative px-6 pb-24 md:px-10">
      <div className="mx-auto max-w-5xl pt-20 md:pt-28">
        <div className="mb-10 text-center">
          <span className="mb-2 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-primary uppercase">
            Releases
          </span>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Download the engine
          </h1>
          <p className="mt-3 max-w-xl mx-auto text-white/60">
            Grab the latest editor or runtime build. Releases include Windows and Linux binaries
            for local development, packaged builds, and editor playback.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        {/* Release blocks */}
        <div className="lg:col-span-2 space-y-8">
          {releases.map((release) => (
            <Card key={release.version} className="glow-border bloom">
              <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-[#0b0d12]">
                    <HardDrive className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-white">v{release.version}</span>
                      <Badge variant={badges[release.label]} className="text-[11px]">
                        {release.label}
                      </Badge>
                    </div>
                    <div className="mt-1 text-sm text-white/50">{release.date}</div>
                    {release.note && (
                      <div className="mt-2 max-w-md text-xs text-white/50 leading-relaxed">
                        {release.note}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-2">
                <div className="grid gap-3 md:grid-cols-2">
                  {release.assets.map((asset) => (
                    <div
                      key={`${release.version}-${asset.name}`}
                      className="flex flex-col gap-3 rounded-xl border border-white/10 bg-[#0b0d12] p-4 transition-all hover:border-white/20"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 text-sm font-medium text-white">
                            <Download className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                            {asset.name}
                          </div>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {asset.platforms.map((platform) => (
                              <span
                                key={platform}
                                className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/50"
                              >
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button asChild className="shrink-0">
                          <a href="#" className="gap-2">
                            Download
                            <span className="h-3.5 w-3.5 rounded-full bg-white/20 p-0.5" aria-hidden="true">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                                <path d="M5 12h14M13 5l7 7-7 7" />
                              </svg>
                            </span>
                          </a>
                        </Button>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-xs text-white/40">
                        <span>{asset.type}</span>
                        <span className="font-mono">{asset.size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <Card className="bg-[#0b0d12] border-white/10">
            <CardHeader>
              <CardTitle className="text-base text-white flex items-center gap-2">
                <GithubIcon className="h-4 w-4 text-primary" aria-hidden="true" />
                Source code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-white/60">
                If you want the full engine source, build scripts, and samples, grab the repository directly.
              </p>
              <div className="flex gap-3">
                <Button asChild className="gap-2 flex-1">
                  <a
                    href="https://github.com/rajaryan2007/UNHUMAN"
                    target="_blank"
                    rel="noreferrer"
                    className="gap-2"
                  >
                    <GithubIcon className="h-4 w-4" aria-hidden="true" />
                    View Repo
                  </a>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="gap-2 border-white/10"
                >
                  <a
                    href="https://github.com/rajaryan2007/UNHUMAN/archive/refs/heads/main.zip"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Source ZIP
                  </a>
                </Button>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-white/50">
                <Sparkles className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                R&D engine under active development.
              </div>
            </CardContent>
          </Card>

          <Card className="glow-border bloom bg-[#0b0d12] border-white/10">
            <CardHeader>
              <CardTitle className="text-sm text-white/70">What you get</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {[
                { label: "UHE Editor", value: "Scene, assets, profiling" },
                { label: "Runtime", value: "RHI + ECS + scripting" },
                { label: "Samples", value: "Hello world + scene pack" },
                { label: "Docs", value: "Getting started + reference" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="text-white/40">{item.label}</span>
                  <span className="text-white/80">{item.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
