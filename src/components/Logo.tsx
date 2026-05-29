import { useState, useId } from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  src?: string;
}

function SvgFallback({ size, className }: { size: number; className?: string }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block', minWidth: size, minHeight: size }}
    >
      <defs>
        <linearGradient id={`bg${uid}`} x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E5916C" />
          <stop offset="50%" stopColor="#D4736A" />
          <stop offset="100%" stopColor="#C9986A" />
        </linearGradient>
        <linearGradient id={`nl${uid}`} x1="75" y1="20" x2="95" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE4A8" />
          <stop offset="100%" stopColor="#E5C49E" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill={`url(#bg${uid})`} />
      <circle cx="60" cy="60" r="55" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
      <path
        d="M38 85V40C38 38.5 39 37.5 40.5 37.5C41.5 37.5 42.3 38 43 39L72 72V40C72 38.5 73 37.5 74.5 37.5C76 37.5 77 38.5 77 40V85C77 86.5 76 87.5 74.5 87.5C73.5 87.5 72.7 87 72 86L43 53V85C43 86.5 42 87.5 40.5 87.5C39 87.5 38 86.5 38 85Z"
        fill="white"
      />
      <ellipse cx="88" cy="30" rx="9" ry="11" fill={`url(#nl${uid})`} />
      <ellipse cx="88" cy="27" rx="5" ry="3" fill="rgba(255,255,255,0.5)" />
      <circle cx="26" cy="26" r="2" fill="#FFE4A8" opacity="0.9" />
      <circle cx="96" cy="92" r="1.5" fill="#FFE4A8" opacity="0.6" />
    </svg>
  );
}

export default function Logo({ size = 36, className = '', src }: LogoProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const hasSource = src && src.trim().length > 0;

  if (hasSource && !imgFailed) {
    return (
      <img
        src={src}
        alt="Nails By Ivie"
        width={size}
        height={size}
        onError={() => setImgFailed(true)}
        className={`rounded-full object-cover shrink-0 ${className}`}
        style={{ width: size, height: size, minWidth: size, minHeight: size, display: 'block' }}
      />
    );
  }

  return <SvgFallback size={size} className={className} />;
}
