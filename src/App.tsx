import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/lib/theme";
import Home from "@/pages/Home";
import Docs from "@/pages/Docs";

/** Cross-route hash links (e.g. /#architecture) land before the target mounts, so scroll after paint. */
function HashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const frame = requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      {/* `overflow-clip` rather than `overflow-x-hidden`: hidden would make this a
          scroll container and silently break every `sticky` inside it. */}
      <div className="relative flex min-h-screen flex-col overflow-x-clip">
        <HashScroll />
        <Nav />

        <main className="flex-1 pt-14">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
