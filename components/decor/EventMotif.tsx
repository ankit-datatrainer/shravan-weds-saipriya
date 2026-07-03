/** Small hand-drawn-style motif for each ceremony. */
export default function EventMotif({
  kind,
  className = "",
}: {
  kind: "haldi" | "mehendi" | "sangeet" | "wedding";
  className?: string;
}) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none">
      {kind === "haldi" && (
        <g>
          {/* brass bowl of turmeric */}
          <path d="M28 62 L 92 62 C 90 86, 76 96, 60 96 C 44 96, 30 86, 28 62 Z" fill="url(#brass)" />
          <ellipse cx="60" cy="62" rx="32" ry="9" fill="#c96f06" />
          <ellipse cx="60" cy="60" rx="28" ry="7" fill="#f5a623" />
          <ellipse cx="52" cy="58" rx="8" ry="3" fill="#ffc94d" />
          {/* turmeric mound + leaves */}
          <ellipse cx="82" cy="46" rx="12" ry="4.5" transform="rotate(-30 82 46)" fill="#6f7f54" />
          <ellipse cx="92" cy="38" rx="10" ry="4" transform="rotate(-45 92 38)" fill="#8a9a5b" />
          {/* falling pinch */}
          {[[44, 40], [50, 32], [58, 42], [38, 30]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2 + (i % 2)} fill="#f5a623" />
          ))}
          <defs>
            <linearGradient id="brass" x1="28" y1="62" x2="92" y2="96">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#9a7524" />
            </linearGradient>
          </defs>
        </g>
      )}

      {kind === "mehendi" && (
        <g stroke="#5d3a1a" strokeWidth="1.6" fill="none">
          {/* palm */}
          <path d="M60 104 C 40 104, 34 88, 36 68 L 38 42 C 38 37, 45 37, 45 42 L 46 60 L 48 34 C 48 29, 55 29, 55 34 L 56 58 L 58 30 C 58 25, 65 25, 65 30 L 66 58 L 69 36 C 70 31, 76 32, 76 37 L 74 62 L 80 52 C 82 48, 88 50, 86 55 L 78 78 C 74 94, 72 104, 60 104 Z" fill="#eab98f" stroke="#c98d5e" />
          {/* henna design */}
          <circle cx="59" cy="74" r="9" stroke="#7a3b16" />
          <circle cx="59" cy="74" r="4.5" stroke="#7a3b16" />
          <circle cx="59" cy="74" r="1.4" fill="#7a3b16" stroke="none" />
          {[0, 60, 120, 180, 240, 300].map((a) => {
            const r = (a * Math.PI) / 180;
            const x = 59 + Math.cos(r) * 12.5;
            const y = 74 + Math.sin(r) * 12.5;
            return <circle key={a} cx={x} cy={y} r="1.5" fill="#7a3b16" stroke="none" />;
          })}
          <path d="M52 92 Q 59 96 66 92" stroke="#7a3b16" />
          <path d="M42 46 Q 44 52 43 58 M 52 38 Q 54 46 53 56 M 61 34 Q 62 44 62 54 M 70 42 Q 70 50 69 58" stroke="#7a3b16" strokeWidth="1.2" />
        </g>
      )}

      {kind === "sangeet" && (
        <g>
          {/* dholak */}
          <path d="M30 52 C 30 44, 90 44, 90 52 L 88 76 C 88 84, 32 84, 32 76 Z" fill="url(#drum)" />
          <ellipse cx="60" cy="48" rx="30" ry="7" fill="#f0e6d2" stroke="#8c5a2b" strokeWidth="1.5" />
          <ellipse cx="60" cy="80" rx="28" ry="6" fill="#f0e6d2" stroke="#8c5a2b" strokeWidth="1.5" />
          {/* lacing */}
          {[36, 46, 56, 66, 76, 84].map((x, i) => (
            <line key={x} x1={i % 2 ? x - 4 : x} y1="52" x2={i % 2 ? x : x - 4} y2="76" stroke="#7a1f2b" strokeWidth="1.4" />
          ))}
          {/* music notes */}
          <g fill="#7a1f2b">
            <circle cx="88" cy="30" r="3.5" />
            <rect x="90.5" y="14" width="2" height="16" rx="1" />
            <path d="M90.5 14 Q 98 16 99 22 Q 96 18 90.5 19 Z" />
            <circle cx="26" cy="34" r="3" />
            <rect x="28" y="20" width="1.8" height="14" rx="0.9" />
          </g>
        </g>
      )}

      {kind === "wedding" && (
        <g>
          {/* kalash */}
          <path d="M42 66 C 42 56, 78 56, 78 66 C 78 84, 68 92, 60 92 C 52 92, 42 84, 42 66 Z" fill="url(#kalash)" />
          <ellipse cx="60" cy="60" rx="15" ry="4.5" fill="#9a7524" />
          <path d="M48 58 C 50 52, 70 52, 72 58" stroke="#9a7524" strokeWidth="2" fill="none" />
          {/* coconut + leaves */}
          <circle cx="60" cy="47" r="9" fill="#8c5a2b" />
          {[-40, -15, 15, 40].map((a) => (
            <ellipse key={a} cx={60 + a * 0.45} cy={50} rx="9" ry="3.2" transform={`rotate(${a} ${60 + a * 0.45} 50)`} fill="#6f7f54" />
          ))}
          {/* flame above */}
          <path d="M60 24 C 64 30, 64 34, 60 37 C 56 34, 56 30, 60 24 Z" fill="#f5a623" />
          <path d="M60 28 C 62 31, 62 33, 60 35 C 58 33, 58 31, 60 28 Z" fill="#e8890c" />
          {/* swastik-free ornament dots on kalash */}
          <circle cx="60" cy="74" r="2.4" fill="#f0e6d2" />
          {[48, 54, 66, 72].map((x) => (
            <circle key={x} cx={x} cy="72" r="1.6" fill="#f0e6d2" />
          ))}
          <defs>
            <linearGradient id="kalash" x1="42" y1="56" x2="78" y2="92">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#9a7524" />
            </linearGradient>
          </defs>
        </g>
      )}
    </svg>
  );
}
