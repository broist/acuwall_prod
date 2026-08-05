"use client";

import { useId } from "react";

/**
 * A kérdéssor haladását épülő házként mutatja: minden megválaszolt kérdés
 * egy új szerkezeti elemet tesz hozzá (alap → acélváz → tetőszerkezet →
 * falpanelek → tetőfedés → nyílászárók → kulcsátadás).
 *
 * A forma szándékosan az AcuWall emblémát idézi: panelrétegekből álló ház.
 * Dekoratív elem — a tényleges haladást a szöveges lépésszámláló közli.
 */
export default function BuildProgress({
  stage,
  className = "h-14 w-20",
}: {
  /** Hány kérdés van kész (0–7). */
  stage: number;
  className?: string;
}) {
  const gradientId = useId();
  const on = (n: number) => stage >= n;

  const part = (n: number, delayStep = 0) => ({
    style: {
      opacity: on(n) ? 1 : 0,
      transform: on(n) ? "translateY(0px)" : "translateY(5px)",
      transition: `opacity .5s ease ${delayStep}ms, transform .55s cubic-bezier(.16,1,.3,1) ${delayStep}ms`,
    } as const,
  });

  return (
    <svg
      viewBox="0 0 140 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="20"
          y1="18"
          x2="120"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF6236" />
          <stop offset="1" stopColor="#D42B06" />
        </linearGradient>
      </defs>

      {/* Terep + a kész épület halvány körvonala: látszik, hová tartunk */}
      <line
        x1="8"
        y1="91"
        x2="132"
        y2="91"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M22 48 L70 18 L118 48 M28 46 V84 M112 46 V84"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 1. Alapozás */}
      <g {...part(1)}>
        <rect
          x="20"
          y="84"
          width="100"
          height="6.5"
          rx="3.2"
          fill={`url(#${gradientId})`}
          opacity="0.55"
        />
      </g>

      {/* 2. Acélváz oszlopok */}
      <g {...part(2)}>
        <rect x="27.5" y="46" width="5.5" height="38" rx="2.4" fill={`url(#${gradientId})`} />
        <rect x="107" y="46" width="5.5" height="38" rx="2.4" fill={`url(#${gradientId})`} />
      </g>

      {/* 3. Tetőszerkezet */}
      <g {...part(3)}>
        <path
          d="M22 48 L70 18 L118 48"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* 4. Falpanelek — az embléma rétegei, alulról felfelé épülve */}
      <g {...part(4, 160)}>
        <rect
          x="35"
          y="48"
          width="70"
          height="10"
          rx="5"
          fill={`url(#${gradientId})`}
          opacity="0.42"
        />
      </g>
      <g {...part(4, 80)}>
        <rect
          x="35"
          y="60"
          width="70"
          height="10"
          rx="5"
          fill={`url(#${gradientId})`}
          opacity="0.68"
        />
      </g>
      <g {...part(4)}>
        <rect
          x="35"
          y="72"
          width="70"
          height="10"
          rx="5"
          fill={`url(#${gradientId})`}
          opacity="0.95"
        />
      </g>

      {/* 5. Tetőfedés */}
      <g {...part(5)}>
        <path d="M25.5 47 L70 19.5 L114.5 47 Z" fill={`url(#${gradientId})`} opacity="0.3" />
      </g>

      {/* 6. Nyílászárók */}
      <g {...part(6)}>
        <rect x="61" y="64" width="17" height="18" rx="2" fill="#0A1424" />
        <rect
          x="61"
          y="64"
          width="17"
          height="18"
          rx="2"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
        />
        <rect x="41" y="50.5" width="14" height="11" rx="2" fill="#0A1424" />
        <rect
          x="41"
          y="50.5"
          width="14"
          height="11"
          rx="2"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
        />
      </g>

      {/* 7. Kulcsátadás */}
      <g {...part(7)}>
        <circle cx="115" cy="24" r="12" fill={`url(#${gradientId})`} />
        <path
          d="M109.5 24.3 L113.4 28 L120.8 20.6"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
