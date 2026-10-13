const plans = [
  {
    name: "Plan Base",
    price: "Consultar",
    items: ["Sala de musculación", "Asesoramiento inicial", "Acceso según horario"],
  },
  {
    name: "Plan Valkiria",
    price: "Consultar",
    featured: true,
    items: ["Acceso completo", "Clases disponibles", "Seguimiento y comunidad"],
  },
  {
    name: "Plan Full",
    price: "Consultar",
    items: ["Beneficios ampliados", "Mayor flexibilidad", "Soporte personalizado"],
  },
];

const reviews = [
  {
    name: "Reseña Google",
    rating: "★★★★★",
    text: "Reemplazar por una reseña real verificada de Google Maps.",
  },
  {
    name: "Reseña Google",
    rating: "★★★★★",
    text: "Reemplazar por una reseña real verificada de Google Maps.",
  },
  {
    name: "Reseña Google",
    rating: "★★★★★",
    text: "Reemplazar por una reseña real verificada de Google Maps.",
  },
];

const schedule = [
  ["Lunes a Viernes", "Completar horario"],
  ["Sábados", "Completar horario"],
  ["Domingos", "Completar horario"],
];

const WHATSAPP_URL = "https://wa.me/549XXXXXXXXXX";
const INSTAGRAM_URL = "https://instagram.com/REEMPLAZAR";
const MAPS_URL = "https://maps.google.com/?q=REEMPLAZAR";

export default function Home() {
  return (
    <main>
      <header className="nav-shell">
        <nav className="nav container" aria-label="Navegación principal">
          <a className="brand" href="#inicio" aria-label="Valkiria Gym - Inicio">
            <span className="brand-mark">V</span>
            <span>VALKIRIA</span>
          </a>

          <div className="nav-links">
            <a href="#nosotros">Sobre nosotros</a>
            <a href="#instalaciones">Instalaciones</a>
            <a href="#planes">Planes</a>
            <a href="#horarios">Horarios</a>
            <a href="#resenas">Reseñas</a>
          </div>

          <a className="btn btn-small" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Contactar
          </a>
        </nav>
      </header>

      <section id="inicio" className="hero">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="eyebrow">VALKIRIA GYM</p>
          <h1>Entrená fuerte.<br />Viví Valkiria.</h1>
          <p className="hero-copy">
            Un espacio pensado para superarte, entrenar con energía y formar parte de una comunidad que no para.
          </p>
          <div className="hero-actions">
            <a className="btn" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Quiero entrenar
            </a>
            <a className="btn btn-ghost" href="#instalaciones">
              Ver instalaciones
            </a>
          </div>
        </div>
      </section>

      <section id="nosotros" className="section container split">
        <div>
          <p className="eyebrow">SOBRE NOSOTROS</p>
          <h2>Más que un gimnasio.</h2>
        </div>
        <div className="body-copy">
          <p>
            Valkiria es un espacio de entrenamiento enfocado en fuerza, constancia y progreso.
            Esta sección debe completarse con la historia real del gimnasio, su filosofía y lo que lo diferencia.
          </p>
          <p>
            La web prioriza información clara, contacto rápido y una experiencia visual que represente el carácter del lugar.
          </p>
        </div>
      </section>

      <section id="instalaciones" className="section">
        <div className="container section-heading">
          <div>
            <p className="eyebrow">INSTALACIONES</p>
            <h2>Conocé el espacio.</h2>
          </div>
          <p>Reemplazá las imágenes por fotografías reales del gimnasio.</p>
        </div>

        <div className="gallery container">
          {[1, 2, 3].map((item) => (
            <figure className="gallery-card" key={item}>
              <img
                src={`/instalacion-${item}.jpg`}
                alt={`Instalaciones de Valkiria Gym ${item}`}
                loading="lazy"
              />
              <figcaption>Valkiria Gym</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="quote-band" aria-label="Frase motivacional">
        <p>NO ESPERES MOTIVACIÓN. CONSTRUÍ DISCIPLINA.</p>
      </section>

      <section id="planes" className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PLANES</p>
            <h2>Elegí cómo empezar.</h2>
          </div>
          <p>Los nombres, precios y beneficios deben confirmarse antes de publicar.</p>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <article className={`plan-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
              {plan.featured && <span className="badge">Más elegido</span>}
              <h3>{plan.name}</h3>
              <p className="price">{plan.price}</p>
              <ul>
                {plan.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <a className="btn" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Consultar por WhatsApp
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="horarios" className="section alt">
        <div className="container split">
          <div>
            <p className="eyebrow">HORARIOS</p>
            <h2>Entrená cuando te quede mejor.</h2>
          </div>
          <div className="schedule">
            {schedule.map(([day, time]) => (
              <div className="schedule-row" key={day}>
                <span>{day}</span>
                <strong>{time}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="resenas" className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">RESEÑAS</p>
            <h2>Lo dicen quienes entrenan acá.</h2>
          </div>
          <p>Solo publicar opiniones reales y verificadas.</p>
        </div>

        <div className="reviews">
          {reviews.map((review, index) => (
            <article className="review-card" key={index}>
              <span className="stars" aria-label="5 estrellas">{review.rating}</span>
              <p>“{review.text}”</p>
              <strong>{review.name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact">
        <div className="container contact-card">
          <div>
            <p className="eyebrow">EMPEZÁ HOY</p>
            <h2>Tu próxima versión empieza acá.</h2>
            <p>Consultá planes, horarios y disponibilidad.</p>
          </div>
          <div className="contact-actions">
            <a className="btn" href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a>
            <a className="btn btn-ghost" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
            <a className="text-link" href={MAPS_URL} target="_blank" rel="noreferrer">Cómo llegar ↗</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="brand"><span className="brand-mark">V</span><span>VALKIRIA</span></div>
          <p>© 2026 Valkiria Gym. Todos los derechos reservados.</p>
          <p>Desarrollo web por Sebastián Roldán.</p>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar a Valkiria Gym por WhatsApp"
      >
        WA
      </a>
    </main>
  );
}
