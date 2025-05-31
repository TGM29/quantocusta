import { useState, useEffect } from 'react';
import '../App.css';

function getPackages(basePrice: number) {
  // Gera os três pacotes com descrições e preços
  return [
    {
      nome: 'Básico',
      preco: Math.round(basePrice * 0.7),
      descricao: 'Entrega essencial, 1 revisão, prazo padrão, itens básicos.'
    },
    {
      nome: 'Intermediário',
      preco: basePrice,
      descricao: 'Entrega completa, 2 revisões, prazo reduzido, itens extras.'
    },
    {
      nome: 'Premium',
      preco: Math.round(basePrice * 1.5),
      descricao: 'Entrega prioritária, revisões ilimitadas, bônus exclusivos, suporte premium.'
    }
  ];
}

function DicasPacotes() {
  return (
    <>
      <h2 style={{ color: '#2563eb', fontSize: '1.4rem', marginBottom: '0.7rem' }}>Por que oferecer 3 pacotes?</h2>
      <ul>
        <li>Ajuda o cliente a comparar opções e valorizar o serviço.</li>
        <li>Facilita a ancoragem de preço: o pacote intermediário parece mais acessível ao lado do premium.</li>
        <li>Aumenta o ticket médio: muitos clientes escolhem o intermediário ou premium.</li>
        <li>Mostra profissionalismo e flexibilidade na proposta.</li>
      </ul>
      <h2 style={{ color: '#2563eb', fontSize: '1.4rem', margin: '1.5rem 0 0.7rem 0' }}>Como usar?</h2>
      <ul>
        <li>Defina o valor base do seu serviço.</li>
        <li>Veja sugestões de descrição e preço para cada pacote.</li>
        <li>Personalize conforme seu serviço e envie ao cliente!</li>
      </ul>
    </>
  );
}

function SidePanel() {
  return (
    <aside className="side-panel">
      <DicasPacotes />
    </aside>
  );
}

function MobilePanel() {
  return (
    <div className="mobile-panel">
      <DicasPacotes />
    </div>
  );
}

export default function PackageCalculator() {
  const [precoBase, setPrecoBase] = useState('');
  const [erro, setErro] = useState('');
  const [pacotes, setPacotes] = useState<any[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 900);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    const valor = Number(precoBase);
    if (!valor || valor < 1) {
      setErro('Informe um valor válido.');
      setPacotes([]);
      return;
    }
    setPacotes(getPackages(valor));
  };

  return (
    <div className="desktop-wrapper">
      <div className="container">
        <h1 style={{ color: '#2563eb' }}>Monte seus pacotes</h1>
        <form onSubmit={calcular} className="form">
          <label>
            Informe o valor base do seu serviço
            <input
              type="number"
              min="1"
              value={precoBase}
              onChange={e => setPrecoBase(e.target.value)}
              placeholder="Ex: 500"
              style={{ color: '#222' }}
            />
          </label>
          <button type="submit">Gerar pacotes</button>
        </form>
        {erro && <p className="erro">{erro}</p>}
        {pacotes.length > 0 && !erro && (
          <div className="resultado" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            {pacotes.map(p => (
              <div key={p.nome} style={{ background: '#f9fafb', borderRadius: 10, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', padding: '1.2rem 1.2rem', minWidth: 180, flex: '1 1 180px', maxWidth: 220 }}>
                <h3 style={{ color: '#2563eb', marginBottom: 8 }}>{p.nome}</h3>
                <div style={{ fontWeight: 700, fontSize: 22, color: '#22c55e', marginBottom: 8 }}>R$ {p.preco}</div>
                <div style={{ color: '#222', fontSize: 15 }}>{p.descricao}</div>
              </div>
            ))}
          </div>
        )}
        {/* Painel de dicas para mobile */}
        {!isDesktop && <MobilePanel />}
      </div>
      {/* Painel lateral só aparece em telas grandes */}
      {isDesktop && <SidePanel />}
    </div>
  );
}
