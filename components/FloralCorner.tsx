export default function FloralCorner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      <g opacity="0.9">
        <path d="M10 10 C 60 20, 90 60, 95 120" stroke="#8a9a5b" strokeWidth="2" />
        <path d="M10 10 C 20 60, 60 90, 120 95" stroke="#8a9a5b" strokeWidth="2" />
        <circle cx="28" cy="30" r="16" fill="#efb3a9" />
        <circle cx="28" cy="30" r="10" fill="#e48a7c" />
        <circle cx="28" cy="30" r="5" fill="#d5654f" />
        <circle cx="62" cy="18" r="10" fill="#f6d3cd" />
        <circle cx="62" cy="18" r="5" fill="#efb3a9" />
        <circle cx="16" cy="64" r="10" fill="#f6d3cd" />
        <circle cx="16" cy="64" r="5" fill="#efb3a9" />
        <ellipse cx="80" cy="52" rx="10" ry="4" transform="rotate(40 80 52)" fill="#8a9a5b" />
        <ellipse cx="52" cy="80" rx="10" ry="4" transform="rotate(50 52 80)" fill="#8a9a5b" />
        <ellipse cx="98" cy="88" rx="9" ry="3.5" transform="rotate(45 98 88)" fill="#a8b878" />
        <circle cx="108" cy="112" r="3" fill="#d4af37" />
        <circle cx="90" cy="130" r="2.5" fill="#d4af37" />
        <circle cx="130" cy="90" r="2.5" fill="#d4af37" />
      </g>
    </svg>
  );
}
