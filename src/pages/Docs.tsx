import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Docs() {
  return (
    <main className="pt-40 pb-24 min-h-[80vh] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20"></div>
          <BookOpen className="w-10 h-10 text-indigo-300 relative z-10" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Documentation</h1>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium mb-8">
          <Construction className="w-4 h-4" />
          Coming Soon
        </div>
        
        <p className="text-white/50 max-w-xl mx-auto text-lg mb-10 leading-relaxed">
          We are currently building comprehensive guides, API references, and tutorials for the Unhuman Engine. Check back soon for the full documentation portal.
        </p>

        <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
          <Link to="/">Return Home</Link>
        </Button>
      </motion.div>
    </main>
  );
}
