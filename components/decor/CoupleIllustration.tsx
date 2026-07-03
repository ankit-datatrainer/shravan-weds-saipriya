/**
 * Stylized Indian bride & groom under a floral mandap arch —
 * groom in cream sherwani with red safa, bride in rose lehenga,
 * both wearing varmala garlands, holding hands.
 */
export default function CoupleIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 300" className={className} aria-hidden="true" fill="none">
      {/* soft backdrop */}
      <ellipse cx="160" cy="160" rx="130" ry="120" fill="#fbe9e6" opacity="0.55" />

      {/* mandap arch of flowers */}
      <path d="M42 190 C 42 80, 278 80, 278 190" stroke="#8a9a5b" strokeWidth="3" opacity="0.7" />
      {Array.from({ length: 11 }, (_, i) => {
        const t = i / 10;
        // points along the arch curve
        const x = 42 + t * 236;
        const y = 190 - Math.sin(t * Math.PI) * 82.5;
        const palette = ["#efb3a9", "#f5a623", "#f6d3cd", "#e8890c"];
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={i % 2 ? 7 : 9} fill={palette[i % 4]} />
            <circle cx={x} cy={y} r={i % 2 ? 3.5 : 4.5} fill={i % 2 ? "#e48a7c" : "#ffc94d"} />
          </g>
        );
      })}
      {/* hanging strands from arch */}
      {[80, 160, 240].map((x) => (
        <g key={x}>
          {[0, 1, 2].map((j) => {
            const y = (x === 160 ? 112 : 138) + j * 13;
            return <circle key={j} cx={x} cy={y} r="4" fill={j % 2 ? "#f5a623" : "#e8890c"} />;
          })}
        </g>
      ))}

      {/* ---- GROOM (left) ---- */}
      <g>
        {/* churidar */}
        <rect x="112" y="238" width="9" height="26" rx="4" fill="#f0e6d2" />
        <rect x="127" y="238" width="9" height="26" rx="4" fill="#f0e6d2" />
        <ellipse cx="116" cy="266" rx="8" ry="4" fill="#8c5a2b" />
        <ellipse cx="132" cy="266" rx="8" ry="4" fill="#8c5a2b" />
        {/* sherwani */}
        <path d="M104 170 C 104 152, 144 152, 144 170 L 148 236 C 148 242, 100 242, 100 236 Z" fill="#f7efe0" stroke="#d4af37" strokeWidth="1.2" />
        {/* buttons */}
        {[178, 192, 206, 220].map((y) => (
          <circle key={y} cx="124" cy={y} r="1.6" fill="#b8912e" />
        ))}
        {/* stole */}
        <path d="M136 156 L 142 234 L 150 233 L 142 155 Z" fill="#7a1f2b" opacity="0.85" />
        {/* arms */}
        <path d="M104 172 C 96 190, 96 206, 102 218" stroke="#f7efe0" strokeWidth="10" strokeLinecap="round" />
        <path d="M144 172 C 152 190, 154 202, 150 212" stroke="#f7efe0" strokeWidth="10" strokeLinecap="round" />
        {/* varmala */}
        <path d="M110 168 C 112 198, 136 198, 138 168" stroke="#fff" strokeWidth="1" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = i / 6;
          const x = 110 + t * 28;
          const y = 168 + Math.sin(t * Math.PI) * 24;
          return <circle key={i} cx={x} cy={y} r="3.2" fill={i % 2 ? "#efb3a9" : "#fff5f2"} stroke="#e48a7c" strokeWidth="0.5" />;
        })}
        {/* head */}
        <circle cx="124" cy="140" r="15" fill="#eab98f" />
        {/* beard hint */}
        <path d="M112 146 C 114 156, 134 156, 136 146 C 132 152, 116 152, 112 146 Z" fill="#3d2b1f" opacity="0.5" />
        {/* safa (turban) */}
        <path d="M108 138 C 106 120, 142 120, 140 138 C 140 128, 108 128, 108 138 Z" fill="#7a1f2b" />
        <path d="M108 137 Q 124 128 140 137 L 140 132 Q 124 122 108 132 Z" fill="#9a2b38" />
        {/* kalgi */}
        <circle cx="130" cy="122" r="2.5" fill="#d4af37" />
        <path d="M130 120 C 132 112, 138 110, 140 112" stroke="#d4af37" strokeWidth="1.5" />
      </g>

      {/* ---- BRIDE (right) ---- */}
      <g>
        {/* lehenga */}
        <path d="M180 200 C 168 236, 162 254, 158 264 L 238 264 C 234 254, 228 236, 216 200 Z" fill="url(#lehenga)" stroke="#b76e79" strokeWidth="1" />
        {/* lehenga embroidery */}
        <path d="M164 250 Q 198 258 232 250" stroke="#d4af37" strokeWidth="1.4" opacity="0.9" />
        <path d="M170 236 Q 198 243 226 236" stroke="#d4af37" strokeWidth="1" opacity="0.7" />
        {[176, 190, 204, 218].map((x, i) => (
          <circle key={x} cx={x + (i % 2 ? 3 : 0)} cy={i % 2 ? 246 : 243} r="1.5" fill="#d4af37" />
        ))}
        {/* blouse */}
        <path d="M182 170 C 182 156, 214 156, 214 170 L 216 202 C 216 208, 180 208, 180 202 Z" fill="#c94f5e" />
        {/* arms */}
        <path d="M183 174 C 174 188, 170 200, 172 210" stroke="#eab98f" strokeWidth="8" strokeLinecap="round" />
        <path d="M213 174 C 220 188, 222 198, 220 208" stroke="#eab98f" strokeWidth="8" strokeLinecap="round" />
        {/* bangles */}
        {[204, 208].map((y) => (
          <g key={y}>
            <path d={`M170 ${y} l 6 1`} stroke="#d4af37" strokeWidth="1.6" />
            <path d={`M218 ${y} l 6 -1`} stroke="#d4af37" strokeWidth="1.6" />
          </g>
        ))}
        {/* varmala */}
        <path d="M186 168 C 188 196, 208 196, 210 168" stroke="#fff" strokeWidth="1" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = i / 6;
          const x = 186 + t * 24;
          const y = 168 + Math.sin(t * Math.PI) * 22;
          return <circle key={i} cx={x} cy={y} r="3" fill={i % 2 ? "#fff5f2" : "#efb3a9"} stroke="#e48a7c" strokeWidth="0.5" />;
        })}
        {/* necklace */}
        <path d="M190 166 Q 198 174 206 166" stroke="#d4af37" strokeWidth="1.6" />
        {/* head */}
        <circle cx="198" cy="142" r="14" fill="#eab98f" />
        {/* hair */}
        <path d="M185 138 C 185 126, 211 126, 211 138 C 211 132, 185 132, 185 138 Z" fill="#2b1c12" />
        {/* dupatta over head */}
        <path d="M182 144 C 178 118, 218 118, 214 144 L 218 172 L 212 170 L 210 148 C 208 132, 188 132, 186 148 L 184 170 L 178 172 Z" fill="#e48a7c" opacity="0.9" />
        <path d="M182 144 C 178 118, 218 118, 214 144" stroke="#d4af37" strokeWidth="1" opacity="0.8" />
        {/* maang tikka */}
        <line x1="198" y1="128" x2="198" y2="136" stroke="#d4af37" strokeWidth="1" />
        <circle cx="198" cy="137" r="2" fill="#d4af37" />
        {/* nose ring dot + earrings */}
        <circle cx="188" cy="146" r="1.4" fill="#d4af37" />
        <circle cx="209" cy="146" r="1.4" fill="#d4af37" />
      </g>

      {/* holding hands */}
      <circle cx="160" cy="213" r="6" fill="#eab98f" />

      {/* scattered petals at feet */}
      {[
        [70, 272], [96, 280], [150, 284], [206, 282], [252, 276], [124, 278], [180, 288],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="4" ry="2" fill={i % 2 ? "#efb3a9" : "#f5a623"} opacity="0.8" transform={`rotate(${i * 30} ${x} ${y})`} />
      ))}

      <defs>
        <linearGradient id="lehenga" x1="158" y1="200" x2="238" y2="264">
          <stop offset="0%" stopColor="#d5654f" />
          <stop offset="55%" stopColor="#c94f5e" />
          <stop offset="100%" stopColor="#b03a4e" />
        </linearGradient>
      </defs>
    </svg>
  );
}
