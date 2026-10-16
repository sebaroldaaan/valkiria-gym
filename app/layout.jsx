import "./globals.css";
import "./brand.css";
import "./motion.css";
import "./cinematic.css";
import "./typography.css";
import localFont from "next/font/local";

const displayFont = localFont({
  src: "../public/fonts/BarlowCondensed-Bold.ttf",
  weight: "700",
  display: "swap",
  variable: "--font-display",
});

export const metadata = {
  // Set SITE_URL to the public origin when the presentation is deployed.
  metadataBase: process.env.SITE_URL
    ? new URL(process.env.SITE_URL)
    : process.env.VERCEL_URL
      ? new URL(`https://${process.env.VERCEL_URL}`)
      : undefined,
  title: "Valkiria — Tu fuerza empieza acá",
  description:
    "Un gimnasio femenino en Isidro Casanova. Conocé Valkiria, consultá actividades y coordiná tu visita.",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Valkiria Gym",
    title: "Valkiria — Tu fuerza empieza acá",
    description: "Tu fuerza. Tu ritmo. Tu lugar. Gimnasio femenino en Isidro Casanova.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={displayFont.variable}>
      <body>{children}</body>
    </html>
  );
}
