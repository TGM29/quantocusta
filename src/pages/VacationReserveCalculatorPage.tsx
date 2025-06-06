import { useState, useEffect } from 'react';
import '../App.css';

function DicasFerias() {
  return (
    <>
      <h2 style={{ color: '#2563eb', fontSize: '1.4rem', marginBottom: '0.7rem' }}>Por que calcular sua reserva de férias?</h2>
      <ul>
        <li>Evite ficar sem renda durante o período de descanso.</li>
        <li>Planeje-se para tirar férias sem preocupação financeira.</li>
        <li>Garanta tranquilidade e segurança para aproveitar seu tempo livre.</li>
      </ul>
      <h2 style={{ color: '#2563eb', fontSize: '1.4rem', margin: '1.5rem 0 0.7rem 0' }}>Como usar?</h2>
      <ul>
        <li>Informe seus custos mensais médios.</li>
        <li>Veja quanto precisa guardar para tirar férias tranquilamente.</li>
      </ul>
    </>
  );
}

function SidePanel() {
  return (
    <aside className="side-panel">
      <DicasFerias />
    </aside>
  );
}

function MobilePanel() {
  return (
    <div className="mobile-panel">
      <DicasFerias />
    </div>
  );
}

export default function VacationReserveCalculatorPage() {
  const [monthlyCost, setMonthlyCost] = useState('');
  const [months, setMonths] = useState('1');
  const [result, setResult] = useState<number | null>(null);
  const [erro, setErro] = useState('');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 900);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  function calcular(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    const custo = parseFloat(monthlyCost.replace(/[^\d.,]/g, '').replace(',', '.'));
    const meses = Number(months);
    if (!custo || custo < 1 || !meses || meses < 1) {
      setErro('Preencha todos os campos corretamente.');
      setResult(null);
      return;
    }
    setResult(custo * meses);
  }

  return (
    <div className="desktop-wrapper" style={{marginTop: '64px'}}>
      <div className="container">
        <h1 style={{ color: '#2563eb' }}>Calculadora de Reserva para Férias</h1>
        <form onSubmit={calcular} className="form">
          <label>
            Seus custos mensais médios
            <input
              type="text"
              placeholder="Ex: R$ 2.500"
              value={monthlyCost}
              onChange={e => setMonthlyCost(e.target.value)}
              required
            />
          </label>
          <label>
            Quantos meses de férias você quer garantir?
            <input
              type="number"
              min="1"
              max="12"
              value={months}
              onChange={e => setMonths(e.target.value)}
              required
            />
          </label>
          <button type="submit">Calcular</button>
        </form>
        {erro && <p className="erro">{erro}</p>}
        {result !== null && !erro && (
          <div className="resultado" style={{ textAlign: 'center' }}>
            <div><strong>Reserva recomendada:</strong></div>
            <div className="valor-hora" style={{fontSize: '1.7rem'}}>R$ {result.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <div style={{marginTop: 8, color: '#2563eb'}}>Guarde esse valor para tirar férias tranquilamente!</div>
          </div>
        )}
        {!isDesktop && <MobilePanel />}
      </div>
      {isDesktop && <SidePanel />}
    </div>
  );
}
