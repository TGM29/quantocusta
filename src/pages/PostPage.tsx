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

// Função simples para converter links markdown para HTML <a>
function renderMarkdownLinks(text: string) {
  // [texto](url)
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, url) => {
    // Links internos: usar <a> normal, externos: target _blank
    const isExternal = url.startsWith('http');
    return `<a href="${url}"${isExternal ? ' target="_blank" rel="noopener"' : ''} style="color:#2563eb;font-weight:600">${label}</a>`;
  });
}

export default function PostPage() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug) || posts[0];

  return (
    <div className="post-layout">
      <main className="post-main">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">{post.date} • {post.author}</div>
        {post.image && <img src={post.image} alt="" className="post-image" />}
        <div
          className="post-content"
          style={{ whiteSpace: 'pre-line' }}
          dangerouslySetInnerHTML={{ __html: renderMarkdownLinks(post.content) }}
        />
      </main>
      <aside className="post-sidebar post-sidebar-block">
        <div className="sidebar-block">
          <h3 className="sidebar-title">Outros posts</h3>
          <ul className="sidebar-list">
            {posts.map(p => (
              <li key={p.slug}>
                <Link to={`/content/${p.slug}`}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
