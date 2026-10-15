import { useEffect, useRef, useState } from "react";

/**
 * Scroll-expansion video — the capture starts as a card and opens out to fill
 * the viewport as its section scrolls past. The section is a tall track with a
 * sticky stage, so the expansion rides the page scroll: nothing is trapped, and
 * the page keeps scrolling normally in both directions.
 *
 * (21st.dev's original binds wheel/touch on `window` and calls
 * `window.scrollTo(0, 0)` until it is expanded — that only works for media that
 * owns scroll position 0, which a mid-page section never does. Progress is
 * measured from the track instead. It also imported `next/image` and
 * `framer-motion`; both are gone, the two opacity fades are plain styles.)
 */

export interface ScrollExpandVideoProps {
  src: string
  poster?: string
  /** Split around the frame: the first word goes left, the rest go right. */
  title: string
  /** Shown while the frame is still closed. */
  hint?: string
  /** Capture facts, revealed once the frame is open. */
  facts?: readonly (readonly [string, string])[]
  /** How long the expansion takes to play out, in viewport heights. */
  track?: string
}

export default function ScrollExpandVideo({
  src,
  poster,
  title,
  hint,
  facts,
  track = "150vh",
}: ScrollExpandVideoProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [layout, setLayout] = useState(() => ({
    mobile: window.innerWidth < 768,
    reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    vw: window.innerWidth,
    vh: window.innerHeight,
  }))

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const rq = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    const read = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      // A track no taller than the viewport (reduced motion, or a very short
      // section) has nothing to scroll through: it is simply open.
      const span = rect.height - window.innerHeight
      setProgress(span > 40 ? Math.min(1, Math.max(0, -rect.top / span)) : 1)
      // Keep the object identity when nothing changed: a fresh object every
      // scroll frame would re-render this section for the whole page's scroll.
      const next = {
        mobile: window.innerWidth < 768,
        reduced: rq.matches,
        vw: window.innerWidth,
        vh: window.innerHeight,
      }
      setLayout((prev) =>
        prev.mobile === next.mobile && prev.reduced === next.reduced && prev.vw === next.vw && prev.vh === next.vh
          ? prev
          : next
      )
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    rq.addEventListener("change", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      rq.removeEventListener("change", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const { mobile, reduced, vw, vh } = layout
  const p = reduced ? 1 : progress
  const [first, ...rest] = title.split(" ")
  const shift = p * (mobile ? 180 : 150)
  // Interpolate between the closed card and the open frame. Both axes move
  // monotonically, and the open frame is capped to a 16:9-or-wider box so a
  // phone never ends up with a portrait frame that crops most of the capture.
  const endW = Math.min(vw * 0.95, 1550)
  const endH = Math.min(vh * 0.85, endW / 1.78)
  const startW = Math.min(mobile ? 300 : 400, endW)
  const startH = Math.round(startW * 1.33)
  const width = Math.round(startW + (endW - startW) * p)
  const height = Math.round(startH + (endH - startH) * p)

  return (
    <div ref={trackRef} className="relative" style={{ height: reduced ? "auto" : track }}>
      <div
        className={
          "flex items-center justify-center overflow-hidden " +
          (reduced ? "min-h-[70svh]" : "sticky top-14 h-[calc(100svh-3.5rem)]")
        }
      >
        <div
          className="relative z-0 shrink-0 overflow-hidden rounded-2xl border border-foreground/25 bg-black"
          style={{ width, height }}
        >
          <video
            className="h-full w-full object-cover"
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            disableRemotePlayback
          />
          {/* Dimmed while it is small, clear once it is open. */}
          <div
            className="pointer-events-none absolute inset-0 bg-black"
            style={{ opacity: 0.5 - p * 0.3 }}
          />

          {facts?.length ? (
            <dl
              className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap gap-x-6 gap-y-1 px-4 pt-10 pb-3 transition-opacity duration-500 motion-reduce:transition-none"
              style={{
                opacity: Math.max(0, p * 1.6 - 0.6),
                backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
              }}
            >
              {facts.map(([key, value]) => (
                <div key={key}>
                  <dt className="mono-label text-white/55">{key}</dt>
                  <dd className="mono text-[11px] text-white/90">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        {/* Split around the frame; difference-blended, so it reads over the capture and over paper. */}
        <div
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center mix-blend-difference"
          style={{ opacity: 1 - p * p }}
        >
          <span className="text-[clamp(28px,5vw,64px)] font-medium leading-[1.05] tracking-tight text-white" style={{ transform: `translateX(-${shift}vw)` }}>
            {first}
          </span>
          <span className="text-[clamp(28px,5vw,64px)] font-medium leading-[1.05] tracking-tight text-white" style={{ transform: `translateX(${shift}vw)` }}>
            {rest.join(" ")}
          </span>
        </div>

        {hint && !reduced ? (
          <p
            className="mono-label pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-accent-text transition-opacity duration-300"
            style={{ opacity: Math.max(0, 1 - p * 2) }}
          >
            {hint}
          </p>
        ) : null}
      </div>
    </div>
  )
}
