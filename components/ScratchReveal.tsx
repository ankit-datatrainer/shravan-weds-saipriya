"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Hand } from "lucide-react";

/**
 * A scratch-card foil painted on a canvas over `children`.
 * Scratching with a finger or mouse erases the foil; past ~45%
 * scratched the rest dissolves automatically.
 */
export default function ScratchReveal({
  children,
  hint = "Scratch to reveal",
  onRevealed,
}: {
  children: React.ReactNode;
  hint?: string;
  onRevealed?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scratching = useRef(false);
  const strokes = useRef(0);
  const [revealed, setRevealed] = useState(false);
  const revealedRef = useRef(false);

  const paintFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = container.getBoundingClientRect();
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // gold foil gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#b8912e");
    grad.addColorStop(0.3, "#e9d8a6");
    grad.addColorStop(0.5, "#d4af37");
    grad.addColorStop(0.7, "#e9d8a6");
    grad.addColorStop(1, "#9a7524");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // sparkle flecks
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.5)" : "rgba(122,31,43,0.18)";
      ctx.beginPath();
      ctx.arc(x, y, Math.random() * 1.6 + 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    // hint text
    ctx.fillStyle = "rgba(94,23,33,0.75)";
    ctx.font = `600 ${Math.max(13, Math.min(17, width / 22))}px Jost, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(hint.toUpperCase(), width / 2, height / 2);
  }, [hint]);

  useEffect(() => {
    paintFoil();
    const onResize = () => {
      if (!revealedRef.current) paintFoil();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [paintFoil]);

  const finish = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setRevealed(true);
    onRevealed?.();
  }, [onRevealed]);

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 64) {
      total++;
      if (data[i] === 0) clear++;
    }
    if (clear / total > 0.45) finish();
  }, [finish]);

  const scratchAt = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!scratching.current || revealedRef.current) return;
      scratchAt(e.clientX, e.clientY);
      strokes.current++;
      if (strokes.current % 12 === 0) checkProgress();
    },
    [scratchAt, checkProgress]
  );

  return (
    <div ref={containerRef} className="relative select-none">
      {children}

      {!revealed && (
        <>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full cursor-pointer rounded-xl"
            style={{ touchAction: "none" }}
            onPointerDown={(e) => {
              scratching.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              scratchAt(e.clientX, e.clientY);
            }}
            onPointerUp={() => {
              scratching.current = false;
              checkProgress();
            }}
            onPointerCancel={() => {
              scratching.current = false;
            }}
            onPointerMove={handlePointerMove}
          />
          {/* animated hand hint */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[62%] -translate-x-1/2 text-maroon-800/70"
            animate={{ x: [-28, 28, -28], rotate: [-8, 8, -8] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Hand className="h-6 w-6 sm:h-7 sm:w-7" />
          </motion.div>
        </>
      )}

      {revealed && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background:
              "linear-gradient(120deg, transparent 20%, rgba(233,216,166,0.9) 50%, transparent 80%)",
          }}
        />
      )}
    </div>
  );
}
