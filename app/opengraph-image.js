import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Valkiria Gym — Tu fuerza. Tu ritmo. Tu lugar. Isidro Casanova.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [photo, logo] = await Promise.all([
    readFile(join(process.cwd(), "public/assets/valkiria-share.jpg")),
    readFile(join(process.cwd(), "public/assets/logo-valk.png")),
  ]);

  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#121114", color: "#f0eee8", position: "relative" }}>
      <img src={`data:image/jpeg;base64,${photo.toString("base64")}`} width={510} height={630} alt="" style={{ position: "absolute", right: 0, objectFit: "cover" }} />
      <div style={{ display: "flex", position: "absolute", inset: 0, background: "linear-gradient(90deg, #121114 42%, #12111499 65%, #12111400 100%)" }} />
      <div style={{ display: "flex", flexDirection: "column", padding: "42px 60px", position: "relative" }}>
        <img src={`data:image/png;base64,${logo.toString("base64")}`} width={100} height={100} alt="VAK" />
        <div style={{ display: "flex", flexDirection: "column", fontSize: 78, fontWeight: 700, letterSpacing: -4, lineHeight: 1.02, marginTop: 26 }}>
          <span>Tu fuerza.</span><span style={{ color: "#f1749e" }}>Tu ritmo.</span><span>Tu lugar.</span>
        </div>
        <div style={{ fontSize: 20, marginTop: 40 }}>VALKIRIA GYM · ISIDRO CASANOVA</div>
      </div>
    </div>,
    size,
  );
}
