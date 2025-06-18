const SVG_Logo = () => (
  <svg
    width="300"
    height="100"
    viewBox="0 0 300 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0" y="10" width="80" height="80" rx="16" fill="#0D1B2A" />

    <path
      d="M20 35 L30 45 L45 25"
      stroke="#FFFFFF"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M20 60 L30 70 L45 50"
      stroke="#FFFFFF"
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <circle
      cx="60"
      cy="60"
      r="10"
      stroke="#FFFFFF"
      strokeWidth="3"
      fill="none"
    />
    <path
      d="M50 60 Q60 50, 70 60 Q60 70, 50 60"
      stroke="#FFFFFF"
      strokeWidth="2"
      fill="none"
    />

    <text
      x="90"
      y="65"
      fontFamily="Arial, Helvetica, sans-serif"
      fontSize="32"
      fill="#FFFFFF"
      fontWeight="bold"
    >
      Multi-Bet
    </text>
  </svg>
);

export { SVG_Logo };
