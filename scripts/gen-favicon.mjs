// Renders src/app/icon.svg to a multi-size favicon.ico (PNG-embedded ICO).
// Uses macOS built-ins (qlmanage to rasterize the SVG, sips to resize).
// Run: node scripts/gen-favicon.mjs
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const APP = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "app");
const SVG = join(APP, "icon.svg");
const tmp = mkdtempSync(join(tmpdir(), "favicon-"));

// 1. Rasterize the SVG to a large PNG via Quick Look.
execSync(`qlmanage -t -s 512 -o "${tmp}" "${SVG}"`, { stdio: "ignore" });
const big = join(tmp, "icon.svg.png");

// 2. Resize to the sizes we want inside the .ico (Google likes 48; 32 for tabs).
const SIZES = [48, 32, 16];
const pngs = SIZES.map((s) => {
  const out = join(tmp, `f${s}.png`);
  execSync(`sips -z ${s} ${s} "${big}" --out "${out}"`, { stdio: "ignore" });
  return { size: s, buf: readFileSync(out) };
});

// 3. Pack the PNGs into an ICO (modern browsers + Google support PNG-in-ICO).
const count = pngs.length;
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type = icon
header.writeUInt16LE(count, 4);

let offset = 6 + count * 16;
const entries = [];
for (const { size, buf } of pngs) {
  const e = Buffer.alloc(16);
  e.writeUInt8(size >= 256 ? 0 : size, 0); // width
  e.writeUInt8(size >= 256 ? 0 : size, 1); // height
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // color planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(buf.length, 8); // size of image data
  e.writeUInt32LE(offset, 12); // offset of image data
  offset += buf.length;
  entries.push(e);
}

const ico = Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]);
writeFileSync(join(APP, "favicon.ico"), ico);
console.log(`Wrote favicon.ico (${SIZES.join(", ")}px, ${ico.length} bytes)`);
