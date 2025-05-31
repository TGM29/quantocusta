import { useState } from 'react'
import './App.css'

const PROFISSOES = [
  { nome: 'Designer gráfico', faixa: '40 – 120', media: 80 },
  { nome: 'Social media', faixa: '35 – 100', media: 67 },
  { nome: 'Editor de vídeo', faixa: '50 – 150', media: 100 },
  { nome: 'Desenvolvedor web (freela)', faixa: '60 – 180', media: 120 },
  { nome: 'Redator (conteúdo/blog)', faixa: '30 – 90', media: 60 },
  { nome: 'Copywriter', faixa: '50 – 150', media: 100 },
  { nome: 'Tradutor', faixa: '40 – 100', media: 70 },
  { nome: 'Ilustrador', faixa: '60 – 200', media: 130 },
  { nome: 'Fotógrafo (edição + sessão)', faixa: '80 – 200', media: 140 },
  { nome: 'Gestor de tráfego pago', faixa: '80 – 200', media: 140 },
  { nome: 'Consultor de marketing', faixa: '100 – 250', media: 175 },
  { nome: 'Produtor de conteúdo (Reels/TikTok)', faixa: '40 – 120', media: 80 },
  { nome: 'Professor particular (online)', faixa: '40 – 100', media: 70 },
  { nome: 'Desenvolvedor no-code (Webflow, Bubble)', faixa: '60 – 150', media: 105 },
  { nome: 'Assistente virtual', faixa: '25 – 70', media: 47 },
  { nome: 'Especialista em SEO', faixa: '70 – 150', media: 110 },
  { nome: 'UX/UI Designer', faixa: '60 – 180', media: 120 },
  { nome: 'Outro', faixa: '', media: 0 },
];

function App() {
  const [profissao, setProfissao] = useState('')
  const [valorHora, setValorHora] = useState('')
  const [horasServico, setHorasServico] = useState('')
  const [erro, setErro] = useState('')
  const [resultado, setResultado] = useState<number | null>(null)

  const profissaoSelecionada = PROFISSOES.find(p => p.nome === profissao)

  const handleProfissaoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setProfissao(value)
    const prof = PROFISSOES.find(p => p.nome === value)
    if (prof && value !== 'Outro') {
      setValorHora(String(prof.media))
    } else {
      setValorHora('')
    }
    setResultado(null)
    setErro('')
  }

  const calcular = (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    const valor = Number(valorHora)
    const horas = Number(horasServico)
    if (!profissao || !valor || !horas) {
      setErro('Preencha todos os campos corretamente.')
      setResultado(null)
      return
    }
    setResultado(valor * horas)
  }

  return (
    <div className="container">
      <h1 style={{ color: '#222' }}>Calculadora de Serviço</h1>
      <form onSubmit={calcular} className="form">
        <label>
          1. Selecione o tipo de serviço
          <select
            value={profissao}
            onChange={handleProfissaoChange}
            style={{ background: '#fff', color: '#222', border: '1px solid #d1d5db', borderRadius: 6, padding: '0.5rem 0.7rem', fontSize: '1rem', marginTop: 4 }}
          >
            <option value="">Selecione...</option>
            {PROFISSOES.map(p => (
              <option key={p.nome} value={p.nome}>{p.nome}</option>
            ))}
          </select>
        </label>
        {profissaoSelecionada && profissaoSelecionada.nome !== 'Outro' && (
          <div className="faixa-mercado">
            <span>Média de mercado: </span>
            <strong style={{ color: '#2563eb' }}>R$ {profissaoSelecionada.faixa} / hora</strong>
          </div>
        )}
        <label>
          2. Defina quanto quer cobrar por hora
          <input
            type="number"
            min="1"
            value={valorHora}
            onChange={e => setValorHora(e.target.value)}
            placeholder="Ex: 80"
            style={{ color: '#222' }}
          />
        </label>
        <label>
          3. Quantas horas estima gastar nesse serviço?
          <input
            type="number"
            min="1"
            value={horasServico}
            onChange={e => setHorasServico(e.target.value)}
            placeholder="Ex: 10"
            style={{ color: '#222' }}
          />
        </label>
        <button type="submit">Calcular</button>
      </form>
      {erro && <p className="erro">{erro}</p>}
      {resultado !== null && !erro && (
        <div className="resultado">
          <h2 style={{ color: '#222' }}>Resultado</h2>
          <p style={{ color: '#222' }}>
            Valor total sugerido para o serviço: <br />
            <span className="valor-hora">R$ {resultado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default App
