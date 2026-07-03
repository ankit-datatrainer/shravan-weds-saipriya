export default function TempleBell({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 120" className={className} aria-hidden="true" fill="none">
      <line x1="30" y1="0" x2="30" y2="38" stroke="#b8912e" strokeWidth="2.5" />
      <path
        d="M30 38 C 14 38, 10 58, 10 72 L 50 72 C 50 58, 46 38, 30 38 Z"
        fill="url(#bellGrad)"
        stroke="#9a7524"
        strokeWidth="1.5"
      />
      <rect x="8" y="72" width="44" height="6" rx="3" fill="#b8912e" />
      <circle cx="30" cy="88" r="6" fill="#d4af37" stroke="#9a7524" />
      <line x1="30" y1="78" x2="30" y2="82" stroke="#9a7524" strokeWidth="2" />
      <defs>
        <linearGradient id="bellGrad" x1="10" y1="38" x2="50" y2="72">
          <stop offset="0%" stopColor="#e9d8a6" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#b8912e" />
        </linearGradient>
      </defs>
    </svg>
  );
}
