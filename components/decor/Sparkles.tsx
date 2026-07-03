const SPOTS: Array<[number, number, number, number]> = [
  // [x%, y%, size, delaySec]
  [8, 22, 12, 0], [18, 70, 8, 0.4], [30, 12, 10, 0.9], [42, 82, 9, 0.2],
  [55, 18, 13, 0.6], [64, 66, 8, 1.1], [76, 28, 11, 0.3], [88, 74, 9, 0.8],
  [94, 20, 8, 1.3], [50, 48, 10, 1.6], [22, 44, 7, 1.9], [82, 50, 7, 0.5],
];

/** Twinkling gold glitter layer — absolutely fills its (relative) parent. */
export default function Sparkles({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {SPOTS.map(([x, y, s, d], i) => (
        <svg
          key={i}
          className="absolute animate-twinkle"
          style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, animationDelay: `${d}s` }}
          viewBox="0 0 20 20"
          fill="none"
        >
          <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="#d4af37" />
        </svg>
      ))}
    </div>
  );
}
