import './LandingPage.css';
import logo from '../assets/freelatools-logo.png';
// import heroImg from '../assets/freelatools-logo.png';

// Tipagem para post
interface PostMeta {
  title: string;
  date: string;
  author: string;
  slug: string;
  image: string;
  content: string;
}

// Função utilitária para parsear frontmatter e conteúdo
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

// Importa todos os posts .txt
const postFiles: string[] = [
  require('../../posts/como-cobrar-mais-com-pacotes.txt?raw'),
  require('../../posts/como-tirar-ferias-sendo-freelancer.txt?raw'),
];
const posts: PostMeta[] = postFiles.map(parsePost).filter((p): p is PostMeta => !!p);

export default function LandingPage() {
  return (
    <div className="lp-root">
      <section className="lp-hero minimal-hero">
        <div className="lp-hero-content minimal-hero-content">
          <img src={logo} alt="FreelaTools Logo" className="lp-logo minimal-logo" />
          <h1 className="lp-hero-title">O portal dos freelancers</h1>
          <p className="lp-hero-desc">Ferramentas para facilitar sua vida e valorizar seu trabalho.</p>
          <a href="/calculator/pricing" className="lp-hero-btn">Acessar Calculadora</a>
        </div>
      </section>

      <section className="lp-section" id="calculadoras">
        <h2 className="lp-section-title">Calculadoras</h2>
        <div className="lp-calc-list">
          <a href="/calculator/pricing" className="lp-calc-card">
            <span className="lp-calc-icon">💲</span>
            <div>
              <strong>Quanto Cobrar?</strong>
              <p>Descubra o valor ideal para seu serviço.</p>
            </div>
          </a>
          <a href="/calculator/packages" className="lp-calc-card">
            <span className="lp-calc-icon">📦</span>
            <div>
              <strong>Pacotes de Serviço</strong>
              <p>Monte 3 opções de proposta para seu cliente.</p>
            </div>
          </a>
        </div>
      </section>

      <section className="lp-section">
        <h2 className="lp-section-title">Conteúdo</h2>
        <div className="lp-content-list">
          {posts.map((post) => (
            <a key={post.slug} href={`/content/${post.slug}`} className="lp-content-card">
              <span className="lp-calc-icon">📝</span>
              <div>
                <strong>{post.title}</strong>
                <p>{post.content.split('\n')[0]}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="lp-footer">
        <p>© {new Date().getFullYear()} FreelaTools. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
