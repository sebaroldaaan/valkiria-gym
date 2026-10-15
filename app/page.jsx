import { pageMarkup } from "./page-content";
import SiteScripts from "./site-scripts";

const WHATSAPP_URL =
  "https://wa.me/5491172357022?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20Valkiria.";
const INSTAGRAM_URL = "https://www.instagram.com/gimnasio_valkiria/";

export default function Home() {
  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>

      <header>
        <a className="brand" href="#" aria-label="Valkiria inicio">
          <img
            className="brand-logo"
            src="/assets/logo-valk-300.webp"
            alt="VAK · Gimnasio femenino"
            width="150"
            height="150"
          />
        </a>
        <nav aria-label="Principal">
          <a href="#espacio">Sobre nosotros</a>
          <a href="#planes">Clases</a>
          <a href="#planes-mensuales">Planes mensuales</a>
          <a href="#horarios">Horarios</a>
          <a href="#visita">Cómo llegar</a>
        </nav>
        <a className="navcta" href="#turno">
          Pedí tu turno <svg className="link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>
        </a>
      </header>

      <main
        id="contenido"
        dangerouslySetInnerHTML={{ __html: pageMarkup }}
      />

      <footer>
        <a className="brand" href="#">
          <img
            className="brand-logo"
            src="/assets/logo-valk-300.webp"
            alt="VAK · Gimnasio femenino"
            width="150"
            height="150"
          />
        </a>
        <p>Tu fuerza empieza acá.</p>
        <a href="#turno">Consultá por tu primera visita ↗</a>
        <small>Guillermo Marconi 3254 · Isidro Casanova</small>
      </footer>

      <div className="floating-social">
        <a
          className="instagram-float"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener"
          aria-label="Abrir Instagram de Valkiria"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" />
          </svg>
        </a>
        <a
          className="floating"
          data-wa="Hola, quiero información sobre Valkiria."
          href={WHATSAPP_URL}
          aria-label="Consultar por WhatsApp"
          target="_blank"
          rel="noopener"
        >
          <svg viewBox="0 0 32 32" aria-hidden="true" fill="currentColor">
            <path d="M16 .8A15.1 15.1 0 0 0 3 23.6L.9 31.1l7.7-2A15.1 15.1 0 1 0 16 .8Zm0 27.4a12.3 12.3 0 0 1-6.3-1.7l-.5-.3-4.5 1.2 1.2-4.4-.3-.5A12.4 12.4 0 1 1 16 28.2Zm6.8-9.3c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.2 0-.5 0-.7l-1.2-2.8c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.1 1.4 3.6 1.6 3.9c.2.2 2.7 4.1 6.6 5.8.9.4 1.6.6 2.2.8.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.3-.8-.5Z" />
          </svg>
        </a>
      </div>

      <SiteScripts />
    </>
  );
}
