const FLOWERS = 13;

/**
 * A marigold toran (garland swag) that stretches across its container.
 * Flowers are placed along a quadratic dip so it hangs naturally.
 */
export default function Garland({ className = "" }: { className?: string }) {
  const points = Array.from({ length: FLOWERS }, (_, i) => {
    const t = i / (FLOWERS - 1);
    const x = 20 + t * 560;
    // quadratic bezier dip: peak at edges, lowest mid
    const y = 14 + 4 * t * (1 - t) * 4 * 22;
    return { x, y, big: i % 2 === 0 };
  });

  return (
    <svg viewBox="0 0 600 90" className={className} aria-hidden="true" fill="none" preserveAspectRatio="none">
      <path d="M20 14 Q 300 60 580 14" stroke="#5b6b46" strokeWidth="3" />
      {points.map((p, i) => (
        <g key={i}>
          {/* mango leaves */}
          <ellipse cx={p.x - 7} cy={p.y + 6} rx="7" ry="3" transform={`rotate(-35 ${p.x - 7} ${p.y + 6})`} fill="#5b6b46" />
          <ellipse cx={p.x + 7} cy={p.y + 6} rx="7" ry="3" transform={`rotate(35 ${p.x + 7} ${p.y + 6})`} fill="#6f7f54" />
          {/* marigold */}
          <circle cx={p.x} cy={p.y + 10} r={p.big ? 10 : 8} fill={p.big ? "#e8890c" : "#f5a623"} />
          <circle cx={p.x} cy={p.y + 10} r={p.big ? 6 : 4.5} fill={p.big ? "#f5a623" : "#ffc94d"} />
          <circle cx={p.x} cy={p.y + 10} r={2} fill="#c96f06" />
        </g>
      ))}
      {/* hanging end strands */}
      {[20, 580].map((x) => (
        <g key={x}>
          {[0, 1, 2].map((j) => (
            <circle key={j} cx={x} cy={26 + j * 16} r={j === 2 ? 5 : 6.5} fill={j % 2 ? "#f5a623" : "#e8890c"} />
          ))}
          <circle cx={x} cy={72} r={3.5} fill="#7a1f2b" />
        </g>
      ))}
    </svg>
  );
}
