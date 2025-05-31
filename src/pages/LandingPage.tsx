import './LandingPage.css';
import logo from '../assets/freelatools-logo.png';
// import heroImg from '../assets/freelatools-logo.png';

export default function LandingPage() {
  return (
    <div className="lp-root">
      <section className="lp-hero minimal-hero">
        <div className="lp-hero-content minimal-hero-content">
          <img src={logo} alt="FreelaTools Logo" className="lp-logo minimal-logo" />
          <h1 className="lp-hero-title">O portal dos freelancers</h1>
          <p className="lp-hero-desc">Ferramentas para facilitar sua vida e valorizar seu trabalho.</p>
          <a href="/calculator/pricing" className="lp-hero-btn">Acessar Calculadora</a>
        </div>
      </section>

      <section className="lp-section" id="calculadoras">
        <h2 className="lp-section-title">Calculadoras</h2>
        <div className="lp-calc-list">
          <a href="/calculator/pricing" className="lp-calc-card">
            <span className="lp-calc-icon">💲</span>
            <div>
              <strong>Quanto Cobrar?</strong>
              <p>Descubra o valor ideal para seu serviço.</p>
            </div>
          </a>
          <a href="/calculator/packages" className="lp-calc-card">
            <span className="lp-calc-icon">📦</span>
            <div>
              <strong>Pacotes de Serviço</strong>
              <p>Monte 3 opções de proposta para seu cliente.</p>
            </div>
          </a>
        </div>
      </section>

      <section className="lp-section">
        <h2 className="lp-section-title">Conteúdo</h2>
        <div className="lp-content-list">
          <a href="/content/como-cobrar-mais-com-pacotes" className="lp-content-card">
            <span className="lp-calc-icon">📝</span>
            <div>
              <strong>Como cobrar mais oferecendo pacotes de serviço</strong>
              <p>Dicas práticas para aumentar seu ticket médio e facilitar a decisão do cliente.</p>
            </div>
          </a>
        </div>
      </section>

      <footer className="lp-footer">
        <p>© {new Date().getFullYear()} FreelaTools. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
