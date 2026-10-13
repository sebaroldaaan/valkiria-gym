import "./globals.css";

export const metadata = {
  title: "Valkiria Gym | Entrená diferente",
  description:
    "Valkiria Gym — entrenamiento, comunidad y energía. Conocé nuestras instalaciones, planes y horarios.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
