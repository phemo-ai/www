// Phemo mark: "Echo" — φ as ( | ). The stem is the voice; the arcs are its echo.
// One source of truth for the static logo and its motion. Pure math, no DOM: returns SVG path data
// in a 120×120 box, filled (no strokes), so it renders identically everywhere.
// Swift ports live in apple/ (PhemoMark.swift) and must keep these numbers in sync.

export const BOX = 120;

// Broad-nib stroke: centerline → filled outline. Width follows the nib angle, ends taper.
const NIB = -0.62;
function nib(pts, wmin, wmax, upto = 1, taper = 0.18) {
  const n = Math.max(2, Math.round(pts.length * Math.min(1, Math.max(0, upto))));
  if (upto <= 0.001) return "";
  const P = pts.slice(0, n), L = [], R = [];
  for (let i = 0; i < P.length; i++) {
    const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy) || 1;
    const u = i / (pts.length - 1);
    const end = Math.pow(Math.max(0, Math.min(1, u / taper, ((1 - u) / taper) * 1.25)), 0.55);
    const w = (wmin + (wmax - wmin) * Math.abs(Math.sin(Math.atan2(dy, dx) - NIB))) * (0.22 + 0.78 * end);
    const nx = (-dy / len) * (w / 2), ny = (dx / len) * (w / 2);
    L.push([P[i][0] + nx, P[i][1] + ny]);
    R.push([P[i][0] - nx, P[i][1] - ny]);
  }
  const f = (p) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
  return "M" + L.map(f).join("L") + "L" + R.reverse().map(f).join("L") + "Z";
}

function stem() {
  const out = [];
  for (let i = 0; i <= 80; i++) {
    const u = i / 80;
    out.push([60.6 - 1.2 * u + 0.9 * Math.sin(Math.PI * u), 8 + 104 * u]);
  }
  return out;
}

function arc(r, side) {
  const span = 1.05 - r / 120, out = [];
  for (let i = 0; i <= 48; i++) {
    const a = (side < 0 ? Math.PI : 0) + (side < 0 ? 1 : -1) * (-span + (2 * span * i) / 48);
    out.push([60 + r * Math.cos(a), 60 + r * 1.12 * Math.sin(a)]);
  }
  return out;
}

const ease = (x) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
const RINGS = [25, 39];

/**
 * Paths for one frame.
 * state: "still" | "write" | "idle" | "speak" | "saved"
 * t: seconds (any clock), level: 0..1 speech level, since: seconds in the current state.
 * weight: 1 for large sizes; raise toward 1.4 for ≤32 px renders so thin parts survive.
 * Returns [{ d, opacity }] — draw in order with the same fill colour.
 */
export function frame({ state = "still", t = 0, level = 0, since = 1, weight = 1 } = {}) {
  const p = state === "write" ? Math.min(1, since / 1.4) : 1;
  const out = [{ d: nib(stem(), 3 * weight, 10 * weight, ease(p * 1.8), 0.18), opacity: 1 }];
  for (let k = 0; k < 3; k++) {
    for (const side of [-1, 1]) {
      let r, op;
      if (state === "speak") {
        const ph = (t * 0.9 + k / 3) % 1;
        r = 20 + ph * 30;
        op = (1 - ph) * (0.35 + 0.65 * level);
      } else if (k < 2) {
        r = RINGS[k] + (state === "idle" ? 1.6 * Math.sin(t * 1.6 - k) : 0);
        op = k ? 0.5 : 1;
      } else continue;
      const q = state === "write" ? Math.min(1, Math.max(0, (p - 0.4 - k * 0.15) / 0.35)) : 1;
      if (op * q <= 0.01) continue;
      out.push({ d: nib(arc(r, side), 1.2 * weight, (k ? 5 : 7) * weight, 1, 0.35), opacity: op * q });
    }
  }
  const s = state === "saved" ? 1 + 0.07 * Math.exp(-since * 3) * Math.sin(since * 14) : 1;
  return { paths: out, scale: s };
}

/** Static SVG string. mono=true drops the outer echo's transparency (it is already the thinner stroke), for one-colour use. */
export function svg({ fill = "#1B2B2C", background = null, size = 120, padding = 0, weight = 1, mono = false } = {}) {
  const { paths } = frame({ state: "still", weight });
  const inner = BOX + padding * 2;
  const bg = background ? `<rect x="${-padding}" y="${-padding}" width="${inner}" height="${inner}" fill="${background}"/>` : "";
  const body = paths
    .map((p) => `<path d="${p.d}"${!mono && p.opacity < 1 ? ` fill-opacity="${p.opacity}"` : ""}/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${-padding} ${-padding} ${inner} ${inner}">${bg}<g fill="${fill}">${body}</g></svg>`;
}
