import { useState, useEffect } from 'react';
import '../App.css';

function DicasTempoReal() {
  return (
    <>
      <h2 style={{ color: '#2563eb', fontSize: '1.4rem', marginBottom: '0.7rem' }}>Por que calcular o tempo real?</h2>
      <ul>
        <li>Descubra seu ganho real por hora em cada projeto.</li>
        <li>Evite subestimar o tempo gasto em reuniões, revisões e comunicação.</li>
        <li>Use o resultado para negociar melhor e valorizar seu trabalho.</li>
      </ul>
      <h2 style={{ color: '#2563eb', fontSize: '1.4rem', margin: '1.5rem 0 0.7rem 0' }}>Como usar?</h2>
      <ul>
        <li>Preencha o valor total recebido pelo projeto.</li>
        <li>Some todas as horas gastas: execução, reuniões, revisões, etc.</li>
        <li>Veja seu valor real/hora e compare com o ideal.</li>
      </ul>
    </>
  );
}

function SidePanel() {
  return (
    <aside className="side-panel">
      <DicasTempoReal />
    </aside>
  );
}

function MobilePanel() {
  return (
    <div className="mobile-panel">
      <DicasTempoReal />
    </div>
  );
}

export default function ProjectHourlyCalculatorPage() {
  const [totalValue, setTotalValue] = useState('');
  const [fields, setFields] = useState({
    execution: '',
    meetings: '',
    messages: '',
    revisions: '',
    waiting: '',
    other: '',
  });

  const [erro, setErro] = useState('');
  const [result, setResult] = useState<null | {
    totalHours: number;
    valuePerHour: number;
    insight: string;
  }>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 900);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  function handleChange(field: keyof typeof fields, value: string) {
    setFields((prev) => ({ ...prev, [field]: value }));
  }

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    const totalHours = Object.values(fields).reduce((a, b) => a + (Number(b) || 0), 0);
    const value = parseFloat(totalValue.replace(/[^\d.,]/g, '').replace(',', '.'));
    if (!totalHours || !value) {
      setErro('Preencha todos os campos obrigatórios corretamente.');
      setResult(null);
      return;
    }
    const valuePerHour = value / totalHours;
    let insight = '';
    setResult({ totalHours, valuePerHour, insight });
  }

  return (
    <div className="desktop-wrapper" style={{marginTop: '64px'}}>
      <div className="container">
        <h1 style={{ color: '#2563eb' }}>Tempo real investido</h1>
        <form onSubmit={handleCalculate} className="form">
          <label>
            Valor total recebido pelo projeto
            <input
              type="text"
              placeholder="Ex: R$ 1.500"
              value={totalValue}
              onChange={e => setTotalValue(e.target.value)}
              required
            />
          </label>
          <label>
            Total de horas gastas no projeto
            <input
              type="number"
              min="0"
              value={fields.execution}
              onChange={e => handleChange('execution', e.target.value)}
              required
            />
          </label>
          <button type="submit">Calcular</button>
        </form>
        {erro && <p className="erro">{erro}</p>}
        {result && !erro && (
          <div className="resultado" style={{ textAlign: 'center' }}>
            <div><strong>Total de horas gastas:</strong> {result.totalHours}h</div>
            <div className="valor-hora"><strong>Valor real por hora:</strong> R$ {result.valuePerHour.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            {result.insight && <div style={{ marginTop: 8, color: '#2563eb' }}>{result.insight}</div>}
          </div>
        )}
        {!isDesktop && <MobilePanel />}
      </div>
      {isDesktop && <SidePanel />}
    </div>
  );
}
