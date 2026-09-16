import React from 'react';
import { motion } from 'framer-motion';
import { Target, UserCheck, Award, Lock, FileCode2, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="pt-32 pb-24 bg-black relative">
      
      {/* GLOWING HERO SECTION */}
      <section className="relative z-10 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto text-center mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 flex flex-col items-center w-full"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            v1.0 is now available
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            Build the future of <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
              interactive rendering.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light">
            An open-source, high-performance C++ game engine powered by Vulkan and Slang.
            Designed for developers who demand total control.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 h-12 px-8 rounded-lg shadow-lg shadow-white/10">
              Start Building
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/10 bg-white/5 hover:bg-white/10 text-white h-12 px-8 rounded-lg">
              <Link to="/docs">Read the Docs</Link>
            </Button>
          </div>
        </motion.div>
        
        {/* VIDEO CENTERPIECE */}
        <motion.div 
          className="w-full mt-20 relative px-4 md:px-0"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="video-glow w-full max-w-5xl mx-auto rounded-xl">
            <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl aspect-video">
              <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2 z-10 backdrop-blur-md">
                 <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                 <div className="mx-auto text-xs font-mono text-white/30">unhuman-editor</div>
              </div>
              
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover pt-10"
              >
                <source src="/demo.webm" type="video/webm" />
              </video>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SEAMLESS FEATURE GRID */}
      <section id="features" className="pt-40 pb-20 max-w-5xl mx-auto px-4 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">the architecture</h2>
          <p className="text-white/50 text-lg max-w-xl">
            Unhuman keeps records in the region you pick, behind the pipelines you name, with a trail you can export.
          </p>
          <div className="flex gap-4 mt-8">
             <Link to="/docs" className="bg-white text-black font-medium text-sm px-4 py-2 rounded flex items-center">
                Read the docs &rarr;
             </Link>
             <a href="https://github.com/rajaryan2007/UNHUMAN" target="_blank" rel="noreferrer" className="bg-white/5 border border-white/10 text-white font-medium text-sm px-4 py-2 rounded">
                See the code
             </a>
          </div>
        </div>
        
        {/* Wensity 2x2 Seamless Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-white/10">
          
          {/* Grid Item 1 */}
          <div className="p-10 border-b border-r border-white/10 hover:bg-white/[0.02] transition-colors">
            <div className="w-12 h-12 border border-white/20 rounded-lg flex items-center justify-center mb-6">
              <Target className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium text-white mb-3">Vulkan RHI abstracted</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Pin each render pass to a dedicated command buffer. The abstraction layer ensures you never linger on unoptimized bindings after a pipeline ends.
            </p>
          </div>

          {/* Grid Item 2 */}
          <div className="p-10 border-b border-r border-white/10 hover:bg-white/[0.02] transition-colors">
            <div className="w-12 h-12 border border-white/20 rounded-lg flex items-center justify-center mb-6">
              <UserCheck className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium text-white mb-3">Least-privilege bindings</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Bind every shader action to a named descriptor, then expire unused sets so GPU memory never lingers on live records after a pass ends.
            </p>
          </div>

          {/* Grid Item 3 */}
          <div className="p-10 border-b border-r border-white/10 hover:bg-white/[0.02] transition-colors">
            <div className="w-12 h-12 border border-white/20 rounded-lg flex items-center justify-center mb-6">
              <FileCode2 className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium text-white mb-3">Slang native compilation</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Strip legacy glsl bindings. Compile directly to SPIR-V, then keep an append-only record of who looked and when they looked via validation layers.
            </p>
          </div>

          {/* Grid Item 4 */}
          <div className="p-10 border-b border-r border-white/10 hover:bg-white/[0.02] transition-colors">
            <div className="w-12 h-12 border border-white/20 rounded-lg flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium text-white mb-3">Entity data boundary</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Keep entity components in a dedicated envelope with strict cache-alignment, zero overhead in transit, and access that dies with the lifecycle.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
