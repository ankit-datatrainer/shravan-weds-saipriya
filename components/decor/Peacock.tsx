/** Stylized peacock with a trailing tail, facing right by default. */
export default function Peacock({ className = "" }: { className?: string }) {
  const feathers = [
    { angle: -78, len: 92 },
    { angle: -52, len: 104 },
    { angle: -26, len: 110 },
    { angle: 0, len: 112 },
    { angle: 26, len: 104 },
  ];
  return (
    <svg viewBox="0 0 220 200" className={className} aria-hidden="true" fill="none">
      <g transform="translate(60 108)">
        {feathers.map((f, i) => {
          const rad = (f.angle * Math.PI) / 180;
          const x = -Math.cos(rad) * f.len;
          const y = Math.sin(rad) * f.len * 0.9;
          return (
            <g key={i}>
              <path d={`M0 0 Q ${x * 0.5} ${y * 0.5 - 14} ${x} ${y}`} stroke="#0e7c7b" strokeWidth="2.5" opacity="0.7" />
              <circle cx={x} cy={y} r="13" fill="#0a5c66" />
              <circle cx={x} cy={y} r="8.5" fill="#0e7c7b" />
              <circle cx={x} cy={y} r="4.5" fill="#d4af37" />
              <circle cx={x} cy={y} r="2" fill="#421018" />
            </g>
          );
        })}
      </g>
      {/* body */}
      <path d="M118 168 C 96 160, 88 138, 96 118 C 102 102, 116 92, 124 76 C 130 64, 130 52, 126 44 C 138 48, 146 60, 146 74 C 146 96, 132 112, 130 132 C 128 150, 132 160, 140 168 Z" fill="url(#peaBody)" />
      {/* head */}
      <circle cx="126" cy="40" r="11" fill="#0e7c7b" />
      <path d="M134 38 L 146 42 L 134 46 Z" fill="#e8890c" />
      <circle cx="129" cy="37" r="1.8" fill="#421018" />
      {/* crest */}
      {[-18, 0, 18].map((a) => (
        <g key={a} transform={`rotate(${a} 126 40)`}>
          <line x1="126" y1="29" x2="126" y2="20" stroke="#0e7c7b" strokeWidth="1.5" />
          <circle cx="126" cy="18" r="2.5" fill="#d4af37" />
        </g>
      ))}
      <defs>
        <linearGradient id="peaBody" x1="96" y1="44" x2="146" y2="168">
          <stop offset="0%" stopColor="#0e7c7b" />
          <stop offset="100%" stopColor="#0a5c66" />
        </linearGradient>
      </defs>
    </svg>
  );
}
