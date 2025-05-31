import './LandingPage.css';
import logo from '../assets/freelatools-logo.png';
import heroImg from '../assets/freelatools-logo.png';

export default function LandingPage() {
  return (
    <div className="lp-root">
      <section className="lp-hero">
        <div className="lp-hero-content">
          <img src={logo} alt="FreelaTools Logo" className="lp-logo" style={{ marginBottom: 24 }} />
          <h1 className="lp-hero-title">O portal dos freelancers</h1>
          <p className="lp-hero-desc">Ferramentas para facilitar sua vida e valorizar seu trabalho.</p>
          <a href="/calculator/pricing" className="lp-hero-btn">Acessar Calculadora</a>
        </div>
        <div className="lp-hero-img">
          <img src={heroImg} alt="FreelaTools Hero" />
        </div>
      </section>

      <section className="lp-section">
        <h2 className="lp-section-title">Calculadoras</h2>
        <div className="lp-calc-list">
          <a href="/calculator/pricing" className="lp-calc-card">
            <span className="lp-calc-icon">💲</span>
            <div>
              <strong>Quanto Cobrar?</strong>
              <p>Descubra o valor ideal para seu serviço.</p>
            </div>
          </a>
        </div>
      </section>

      <section className="lp-section">
        <h2 className="lp-section-title">Conteúdo</h2>
        <div className="lp-content-list">
          <div className="lp-content-card">
            <span className="lp-calc-icon">📝</span>
            <div>
              <strong>Em breve</strong>
              <p>Posts e dicas para freelancers.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-section">
        <h2 className="lp-section-title">Futuro</h2>
        <div className="lp-future-list">
          <div className="lp-future-card">
            <span className="lp-calc-icon">🚀</span>
            <div>
              <strong>Mais ferramentas</strong>
              <p>Novidades em breve para facilitar ainda mais sua rotina!</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="lp-footer">
        <p>© {new Date().getFullYear()} FreelaTools. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
