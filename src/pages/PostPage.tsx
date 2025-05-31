import './LandingPage.css';
import { useParams, Link } from 'react-router-dom';

interface PostMeta {
  title: string;
  date: string;
  author: string;
  slug: string;
  image: string;
  content: string;
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

export default function PostPage() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug) || posts[0];
  const others = posts.filter(p => p.slug !== post.slug);

  return (
    <div className="post-layout">
      <main className="post-main">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">{post.date} • {post.author}</div>
        {post.image && <img src={post.image} alt="" className="post-image" />}
        <div className="post-content" style={{ whiteSpace: 'pre-line' }}>
          {post.content}
        </div>
      </main>
      <aside className="post-sidebar">
        <h3 className="sidebar-title">Outros posts</h3>
        <ul className="sidebar-list">
          {others.map(p => (
            <li key={p.slug}>
              <Link to={`/content/${p.slug}`}>{p.title}</Link>
            </li>
          ))}
        </ul>
      </aside>
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
