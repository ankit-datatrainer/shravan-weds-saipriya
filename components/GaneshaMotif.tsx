export default function GaneshaMotif({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none">
      <circle cx="60" cy="60" r="58" fill="url(#discGrad)" stroke="#b8912e" strokeWidth="1.5" />
      <text
        x="60"
        y="78"
        textAnchor="middle"
        fontSize="52"
        fill="#7a1f2b"
        fontFamily="serif"
      >
        ॐ
      </text>
      <defs>
        <radialGradient id="discGrad" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#fff8ea" />
          <stop offset="70%" stopColor="#f6e6b8" />
          <stop offset="100%" stopColor="#e9d8a6" />
        </radialGradient>
      </defs>
    </svg>
  );
}
