import React, { useState } from 'react';
import './LandingPage.css';

interface TimeFields {
  execution: number;
  meetings: number;
  messages: number;
  revisions: number;
  waiting: number;
  other: number;
}

export default function ProjectHourlyCalculatorPage() {
  const [totalValue, setTotalValue] = useState('');
  const [fields, setFields] = useState<TimeFields>({
    execution: 0,
    meetings: 0,
    messages: 0,
    revisions: 0,
    waiting: 0,
    other: 0,
  });
  const [result, setResult] = useState<null | {
    totalHours: number;
    valuePerHour: number;
    insight: string;
  }>(null);
  const [idealRate, setIdealRate] = useState<string>('');

  function handleChange(field: keyof TimeFields, value: string) {
    setFields((prev) => ({ ...prev, [field]: Number(value) }));
  }

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();
    const totalHours = Object.values(fields).reduce((a, b) => a + b, 0);
    const value = parseFloat(totalValue.replace(/[^\d.,]/g, '').replace(',', '.'));
    if (!totalHours || !value) return setResult(null);
    const valuePerHour = value / totalHours;
    let insight = '';
    if (idealRate) {
      const ideal = parseFloat(idealRate.replace(/[^\d.,]/g, '').replace(',', '.'));
      if (ideal > 0) {
        const diff = valuePerHour - ideal;
        const percent = (valuePerHour / ideal) * 100 - 100;
        if (diff < 0) {
          insight = `Seu ganho real foi ${Math.abs(percent).toFixed(1)}% menor que o ideal.`;
        } else {
          insight = `Seu ganho real foi ${percent.toFixed(1)}% maior que o ideal!`;
        }
      }
    }
    setResult({ totalHours, valuePerHour, insight });
  }

  return (
    <div className="lp-root" style={{ minHeight: '100vh', background: 'transparent' }}>
      <section className="lp-section" style={{ maxWidth: 500, margin: '2rem auto' }}>
        <h2 className="lp-section-title">Calculadora de Valor Real por Hora</h2>
        <form onSubmit={handleCalculate}>
          <label>
            Valor total recebido pelo projeto
            <input
              type="text"
              placeholder="Ex: R$ 1.500"
              value={totalValue}
              onChange={e => setTotalValue(e.target.value)}
              style={{ width: '100%', marginBottom: 16 }}
              required
            />
          </label>
          <label>
            Tempo de execução (horas)
            <input
              type="number"
              min="0"
              value={fields.execution}
              onChange={e => handleChange('execution', e.target.value)}
              style={{ width: '100%', marginBottom: 8 }}
              required
            />
          </label>
          <label>
            Reuniões com o cliente (horas)
            <input
              type="number"
              min="0"
              value={fields.meetings}
              onChange={e => handleChange('meetings', e.target.value)}
              style={{ width: '100%', marginBottom: 8 }}
            />
          </label>
          <label>
            Trocas de e-mails e mensagens (horas)
            <input
              type="number"
              min="0"
              value={fields.messages}
              onChange={e => handleChange('messages', e.target.value)}
              style={{ width: '100%', marginBottom: 8 }}
            />
          </label>
          <label>
            Revisões e alterações (horas)
            <input
              type="number"
              min="0"
              value={fields.revisions}
              onChange={e => handleChange('revisions', e.target.value)}
              style={{ width: '100%', marginBottom: 8 }}
            />
          </label>
          <label>
            Espera ou pausas obrigatórias (horas)
            <input
              type="number"
              min="0"
              value={fields.waiting}
              onChange={e => handleChange('waiting', e.target.value)}
              style={{ width: '100%', marginBottom: 8 }}
            />
          </label>
          <label>
            Outros (campo livre, horas)
            <input
              type="number"
              min="0"
              value={fields.other}
              onChange={e => handleChange('other', e.target.value)}
              style={{ width: '100%', marginBottom: 16 }}
            />
          </label>
          <label>
            Valor ideal/hora (opcional)
            <input
              type="text"
              placeholder="Ex: R$ 80"
              value={idealRate}
              onChange={e => setIdealRate(e.target.value)}
              style={{ width: '100%', marginBottom: 16 }}
            />
          </label>
          <button type="submit" className="lp-hero-btn" style={{ width: '100%' }}>Calcular</button>
        </form>
        {result && (
          <div style={{ marginTop: 24, background: '#f9fafb', borderRadius: 12, padding: 16, textAlign: 'center' }}>
            <div><strong>Total de horas gastas:</strong> {result.totalHours}h</div>
            <div><strong>Valor real por hora:</strong> R$ {result.valuePerHour.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            {result.insight && <div style={{ marginTop: 8, color: '#2563eb' }}>{result.insight}</div>}
          </div>
        )}
      </section>
    </div>
  );
}
