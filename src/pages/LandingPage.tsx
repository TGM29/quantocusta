import React from 'react';
import './LandingPage.css';
import logo from '../assets/freelatools-logo.png';

export default function LandingPage() {
  return (
    <div className="lp-root">
      <header className="lp-header">
        <img src={logo} alt="FreelaTools Logo" className="lp-logo" />
        <h1>FreelaTools</h1>
        <p className="lp-intro">O portal dos freelancers: ferramentas para facilitar sua vida e valorizar seu trabalho.</p>
      </header>
      <section className="lp-calc-section">
        <h2>Calculadoras disponíveis</h2>
        <div className="lp-calc-list">
          <a href="https://www.freelatools.com" className="lp-calc-card">
            <span className="lp-calc-icon">💲</span>
            <div>
              <strong>Quanto Cobrar?</strong>
              <p>Descubra o valor ideal para seu serviço.</p>
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
