// Generates branded SVG illustration banners for blog posts into public/blog/.
// Re-runnable: overwrites the files. Tweak THEMES to change designs.
// Run: node scripts/gen-blog-banners.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "blog");
mkdirSync(OUT, { recursive: true });

const BRAND = "#2e2a8a";
const BRAND_DARK = "#181555";
const ACCENT = "#f58a1f";

// Each theme provides an icon (inline SVG markup, drawn ~centered around 0,0 in a
// 200x200 space) and a short label.
const ICONS = {
  book: `<rect x="-70" y="-55" width="140" height="110" rx="8" fill="#fff"/><line x1="0" y1="-55" x2="0" y2="55" stroke="${BRAND}" stroke-width="6"/><line x1="-50" y1="-25" x2="-12" y2="-25" stroke="${ACCENT}" stroke-width="8" stroke-linecap="round"/><line x1="12" y1="-25" x2="50" y2="-25" stroke="${ACCENT}" stroke-width="8" stroke-linecap="round"/><line x1="-50" y1="5" x2="-12" y2="5" stroke="#cfcdf5" stroke-width="8" stroke-linecap="round"/><line x1="12" y1="5" x2="50" y2="5" stroke="#cfcdf5" stroke-width="8" stroke-linecap="round"/>`,
  checklist: `<rect x="-60" y="-70" width="120" height="140" rx="10" fill="#fff"/><polyline points="-42,-38 -30,-26 -8,-50" fill="none" stroke="${ACCENT}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><line x1="6" y1="-36" x2="44" y2="-36" stroke="#cfcdf5" stroke-width="8" stroke-linecap="round"/><polyline points="-42,2 -30,14 -8,-10" fill="none" stroke="${ACCENT}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><line x1="6" y1="4" x2="44" y2="4" stroke="#cfcdf5" stroke-width="8" stroke-linecap="round"/><polyline points="-42,42 -30,54 -8,30" fill="none" stroke="${ACCENT}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><line x1="6" y1="44" x2="44" y2="44" stroke="#cfcdf5" stroke-width="8" stroke-linecap="round"/>`,
  clock: `<circle cx="0" cy="0" r="68" fill="#fff"/><circle cx="0" cy="0" r="68" fill="none" stroke="${ACCENT}" stroke-width="6"/><line x1="0" y1="0" x2="0" y2="-40" stroke="${BRAND}" stroke-width="8" stroke-linecap="round"/><line x1="0" y1="0" x2="30" y2="12" stroke="${BRAND}" stroke-width="8" stroke-linecap="round"/><circle cx="0" cy="0" r="7" fill="${ACCENT}"/>`,
  leaf: `<path d="M0,-78 L12,-30 L46,-44 L30,-8 L70,-2 L34,16 L52,52 L12,38 L0,80 L-12,38 L-52,52 L-34,16 L-70,-2 L-30,-8 L-46,-44 L-12,-30 Z" fill="#fff"/><path d="M0,80 L0,20" stroke="${ACCENT}" stroke-width="6" stroke-linecap="round"/>`,
  trophy: `<path d="M-40,-60 L40,-60 L36,-10 Q0,30 -36,-10 Z" fill="#fff"/><path d="M-40,-50 Q-72,-50 -64,-18 Q-58,2 -32,-6" fill="none" stroke="#fff" stroke-width="8"/><path d="M40,-50 Q72,-50 64,-18 Q58,2 32,-6" fill="none" stroke="#fff" stroke-width="8"/><rect x="-10" y="22" width="20" height="26" fill="#fff"/><rect x="-34" y="46" width="68" height="16" rx="4" fill="#fff"/><polygon points="0,-46 8,-30 25,-28 12,-16 16,1 0,-8 -16,1 -12,-16 -25,-28 -8,-30" fill="${ACCENT}"/>`,
  warning: `<path d="M0,-72 L74,60 L-74,60 Z" fill="#fff"/><line x1="0" y1="-20" x2="0" y2="24" stroke="${ACCENT}" stroke-width="12" stroke-linecap="round"/><circle cx="0" cy="44" r="7" fill="${ACCENT}"/>`,
  question: `<circle cx="0" cy="0" r="74" fill="#fff"/><text x="0" y="38" text-anchor="middle" font-family="Arial, sans-serif" font-size="120" font-weight="800" fill="${ACCENT}">?</text>`,
  government: `<polygon points="0,-66 78,-26 -78,-26" fill="#fff"/><rect x="-78" y="44" width="156" height="16" rx="3" fill="#fff"/><rect x="-60" y="-22" width="16" height="62" fill="#fff"/><rect x="-26" y="-22" width="16" height="62" fill="#fff"/><rect x="10" y="-22" width="16" height="62" fill="#fff"/><rect x="44" y="-22" width="16" height="62" fill="#fff"/>`,
};

function banner(icon, label) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" width="1200" height="480" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${BRAND}"/>
      <stop offset="1" stop-color="${BRAND_DARK}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="480" fill="url(#g)"/>
  <g opacity="0.07"><path d="M980,120 L1010,250 L1110,210 L1060,320 L1170,340 L1070,400 L1130,500 L1010,460 L980,560 L950,460 L830,500 L890,400 L790,340 L900,320 L850,210 L950,250 Z" fill="#fff"/></g>
  <g transform="translate(300,240) scale(1.1)">${icon}</g>
  <text x="560" y="250" font-family="Inter, Arial, sans-serif" font-size="56" font-weight="800" fill="#ffffff">${label}</text>
  <text x="560" y="300" font-family="Inter, Arial, sans-serif" font-size="28" fill="${ACCENT}">passpilot.ca</text>
</svg>`;
}

// slug -> { icon, label }
const POSTS = {
  "how-to-prepare-canadian-citizenship-test-2026": { icon: "checklist", label: "Prepare for 2026" },
  "what-is-on-the-canadian-citizenship-test": { icon: "leaf", label: "What's on the Test" },
  "canadian-citizenship-test-practice-questions": { icon: "question", label: "Practice Questions" },
  "how-hard-is-the-canadian-citizenship-test": { icon: "question", label: "How Hard Is It?" },
  "study-discover-canada": { icon: "book", label: "Discover Canada" },
  "best-way-to-study-canadian-citizenship-test": { icon: "book", label: "Best Way to Study" },
  "canadian-citizenship-test-history-government-rights": { icon: "government", label: "History & Government" },
  "how-many-questions-canadian-citizenship-test": { icon: "clock", label: "Format & Timing" },
  "canadian-citizenship-test-mistakes-to-avoid": { icon: "warning", label: "Mistakes to Avoid" },
  "how-to-pass-canadian-citizenship-test-first-try": { icon: "trophy", label: "Pass First Try" },
  "top-10-tips": { icon: "checklist", label: "Top 10 Tips" },
  "success-story-pr-to-citizen": { icon: "trophy", label: "PR to Citizen" },
  "what-to-study-canadian-citizenship-test": { icon: "checklist", label: "What to Study" },
};

let n = 0;
for (const [slug, { icon, label }] of Object.entries(POSTS)) {
  writeFileSync(join(OUT, `${slug}.svg`), banner(ICONS[icon], label));
  n++;
}
console.log(`Generated ${n} blog banners in public/blog/`);
