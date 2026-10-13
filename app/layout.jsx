import "./globals.css";
import "./brand.css";

export const metadata = {
  title: "Valkiria — Tu fuerza empieza acá",
  description:
    "Un gimnasio femenino en Buenos Aires. Conocé Valkiria, consultá actividades y coordiná tu visita.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
