import './LandingPage.css';
import { useParams, Link } from 'react-router-dom';

interface PostMeta {
  title: string;
  date: string;
  author: string;
  slug: string;
  image: string;
  content: string;
  emoji?: string;
  description?: string;
}

function parsePost(txt: string): PostMeta | null {
  const match = txt.match(/^---([\s\S]*?)---([\s\S]*)$/);
  if (!match) return null;
  const meta: any = {};
  match[1].trim().split('\n').forEach((line: string) => {
    const [key, ...rest] = line.split(':');
    meta[key.trim()] = rest.join(':').trim();
  });
  return { ...meta, content: match[2].trim() } as PostMeta;
}

// Importa todos os posts .txt de forma dinâmica
const postFiles = import.meta.glob('../../posts/*.txt', { as: 'raw', eager: true });
const posts: PostMeta[] = Object.values(postFiles)
  .map((content) => parsePost(content as string))
  .filter(Boolean) as PostMeta[];

// Função simples para converter links markdown para HTML <a>
function renderMarkdownLinks(text: string) {
  let html = text;
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_unused, label, url) => {
    const isExternal = url.startsWith('http');
    return `<a href="${url}"${isExternal ? ' target=\"_blank\" rel=\"noopener\"' : ''} style=\"color:#2563eb;font-weight:600\"'>${label}</a>`;
  });
  // Imagens ![alt](url)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" style="max-width:100%;border-radius:10px;margin:1.2rem 0;box-shadow:0 2px 16px rgba(37,99,235,0.10);display:block;">');
  // Títulos ##
  html = html.replace(/^## (.*)$/gm, '<h2 style="color:#2563eb;font-size:1.25rem;margin:1.5rem 0 0.7rem 0;">$1</h2>');
  // Listas -
  html = html.replace(/^- (.*)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
  // Negrito **
  html = html.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  // Itálico *
  html = html.replace(/\*([^*]+)\*/g, '<i>$1</i>');
  // Blockquote >
  html = html.replace(/^> (.*)$/gm, '<blockquote style="background:#e0e7ff;padding:1rem;border-radius:8px;margin:1.5rem 0;color:#222">$1</blockquote>');
  // Parágrafos
  html = html.replace(/\n{2,}/g, '<br/><br/>');
  return html;
}

export default function PostPage() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug) || posts[0];

  return (
    <>
      <div className="post-layout">
        <main className="post-main">
          <div style={{textAlign:'center', marginBottom:24}}>
            <span style={{fontSize:'2.5rem', marginRight:10}}>{post.emoji || '📝'}</span>
            <h1 className="post-title" style={{display:'inline', verticalAlign:'middle'}}>{post.title}</h1>
          </div>
          <div className="post-meta" style={{textAlign:'center'}}>{post.date} • {post.author}</div>
          {post.image && <img src={post.image} alt="" className="post-image" />}
          <div
            className="post-content"
            style={{ whiteSpace: 'pre-line' }}
            dangerouslySetInnerHTML={{ __html: renderMarkdownLinks(post.content) }}
          />
          {/* Botão de CTA para a ferramenta correspondente */}
          {(() => {
            const ctas: Record<string, { url: string, label: string }> = {
              'como-calcular-preco-hora-freelancer': {
                url: '/calculator/pricing',
                label: 'Acessar Calculadora de Preço por Hora',
              },
              'quanto-cobrar-por-um-servico': {
                url: '/calculator/pricing',
                label: 'Acessar Calculadora de Quanto Cobrar',
              },
              'como-cobrar-mais-com-pacotes': {
                url: '/calculator/packages',
                label: 'Monte seus Pacotes',
              },
              'tempo-real-em-projetos': {
                url: '/calculator/project-hourly',
                label: 'Calcule seu Valor Real por Hora',
              },
              'como-tirar-ferias-sendo-freelancer': {
                url: '/calculator/vacation-reserve',
                label: 'Calcule sua Reserva para Férias',
              },
              'reserva-emergencia-para-freelancer': {
                url: '/calculator/vacation-reserve',
                label: 'Calcule sua Reserva de Emergência',
              },
            };
            const cta = ctas[post.slug];
            if (!cta) return null;
            return (
              <div style={{ marginTop: 32, textAlign: 'center' }}>
                <a href={cta.url} style={{
                  display: 'inline-block',
                  background: '#2563eb',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  borderRadius: 8,
                  padding: '0.9rem 2.2rem',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
                  marginTop: 12,
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.background = '#1746a0')}
                onMouseOut={e => (e.currentTarget.style.background = '#2563eb')}
                >
                  {cta.label}
                </a>
              </div>
            );
          })()}
        </main>
        <aside className="post-sidebar post-sidebar-block">
          <div className="sidebar-block" style={{textAlign:'center'}}>
            <h3 className="sidebar-title" style={{textAlign:'center'}}>Outros posts</h3>
            <ul className="sidebar-list" style={{alignItems:'center', display:'flex', flexDirection:'column', gap:'1.1rem'}}>
              {posts.map(p => (
                <li key={p.slug} style={{display:'flex', alignItems:'center', gap:8}}>
                  <span style={{fontSize:'1.3rem', marginRight:6}}>{p.emoji || '📝'}</span>
                  <Link to={`/content/${p.slug}`}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
