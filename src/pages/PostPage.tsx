import './LandingPage.css';
import { useParams } from 'react-router-dom';

// Função utilitária para parsear frontmatter e conteúdo
function parsePost(txt: string) {
  const match = txt.match(/^---([\s\S]*?)---([\s\S]*)$/);
  if (!match) return null;
  const meta = {} as any;
  match[1].trim().split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    meta[key.trim()] = rest.join(':').trim();
  });
  return { ...meta, content: match[2].trim() };
}

// Simulação de import dinâmica dos arquivos .txt (substitua por import real em ambiente Node/SSR)
const postFiles = [
  require('../../posts/como-cobrar-mais-com-pacotes.txt?raw'),
  require('../../posts/como-tirar-ferias-sendo-freelancer.txt?raw'),
];
const posts = postFiles.map(parsePost).filter(Boolean);

export default function PostPage() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug) || posts[0];
  const relatedPosts = posts.filter(p => p.slug !== post.slug);
  return (
    <div className="lp-root" style={{background:'#232323',minHeight:'100vh',paddingBottom:0}}>
      <div className="post-layout">
        <main className="post-main">
          <div className="post-meta">
            <span className="post-date">{post.date}</span> · <span className="post-author">{post.author}</span>
          </div>
          <h1 className="post-title">{post.title}</h1>
          <img src={post.image} alt="Capa do post" className="post-image" />
          <article className="post-content" dangerouslySetInnerHTML={{__html: markdownToHtml(post.content)}} />
        </main>
        <aside className="post-sidebar">
          <h3 className="sidebar-title">Leia também</h3>
          <div className="sidebar-list">
            {relatedPosts.map(rp => (
              <a key={rp.slug} href={`/content/${rp.slug}`} className="sidebar-post-card">
                <div className="sidebar-post-title">{rp.title}</div>
              </a>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

// Função simples para converter markdown básico para HTML
function markdownToHtml(md: string) {
  return md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
    .replace(/\*([^*]+)\*/gim, '<i>$1</i>')
    .replace(/\n\n/g, '<br/><br/>')
    .replace(/\n/g, '<br/>')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" style="color:#2563eb;font-weight:600">$1</a>')
    .replace(/^> (.*$)/gim, '<blockquote style="background:#e0e7ff;padding:1rem;border-radius:8px;margin:1.5rem 0;color:#222">$1</blockquote>');
}
