import { Link } from "react-router-dom";

const Footer = () => {
  // getCurrentYear
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <section className="sectionfooter text">
        <footer className="top">
          <Link to="/" className="logo">
            <h1>PC Market</h1>
          </Link>
          <div className="links">
            <div>
              <h2>Sitio web</h2>
              <p>Registrarse</p>
              <p>Perfil</p>
              <p>Ayuda</p>
              <p>Medios de pago</p>
              <p>Métodos de envío</p>
              <p>Contacto</p>
            </div>
          </div>
        </footer>
        <footer className="bottom">
          <div className="legal">
            <span span="true"> © {currentYear} LUCIANO DAMIAN MOSTACCIO </span>
            <p> Términos y condiciones </p>
            <p> Política de privacidad </p>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Footer;
