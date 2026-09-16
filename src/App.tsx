import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Home from './pages/Home';
import Docs from './pages/Docs';

function App() {
  const location = useLocation();
  const isDocs = location.pathname === '/docs';

  return (
    <div className="min-h-screen bg-black text-foreground overflow-x-hidden font-sans selection:bg-white/20 grid-bg relative">
      
      {/* WISPR FLOW STYLE PILL NAVBAR */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full px-4">
        <nav className="flex items-center justify-between w-full max-w-4xl px-2 py-1.5 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 pl-3 cursor-pointer">
              <img src="/logo.png" alt="Unhuman Engine Logo" className="w-6 h-6 object-contain rounded-sm" />
              <span className="font-bold text-[15px] tracking-tight text-white">Unhuman</span>
            </Link>
            
            {/* Tag / Toggle Style Area */}
            <div className="hidden md:flex items-center bg-white/5 rounded-full p-1 border border-white/5">
              <Link to="/" className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${!isDocs ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white'}`}>
                Engine
              </Link>
              <Link to="/docs" className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${isDocs ? 'bg-white/10 text-white shadow-sm' : 'text-white/50 hover:text-white'}`}>
                Docs
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Links */}
            <div className="hidden md:flex gap-5 items-center mr-4">
              <Link to="/#features" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Features</Link>
              <Link to="/docs" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Docs</Link>
            </div>

            {/* CTA Button */}
            <Button size="sm" asChild className="rounded-full bg-[#e9d5ff] text-black hover:bg-[#d8b4fe] font-semibold text-xs px-4 h-8 border border-purple-900/10 shadow-sm">
              <a href="https://github.com/rajaryan2007/UNHUMAN" target="_blank" rel="noreferrer">
                <Terminal className="w-3 h-3 mr-1.5" />
                Download
              </a>
            </Button>
          </div>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40 bg-black/50 backdrop-blur-sm mt-auto relative z-10">
        <div>&copy; {new Date().getFullYear()} Unhuman Engine. All rights reserved.</div>
        <div className="flex gap-6">
          <a href="https://x.com/aryan35036" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter</a>
          <a href="https://discord.gg/MGnQ8MJS4" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Discord</a>
          <a href="https://github.com/rajaryan2007/UNHUMAN" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
