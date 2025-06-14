import './LandingPage.css';
// import logo from '../assets/freelatools-logo.png';
// import heroCharacter from '../assets/hero-character.png';
// import heroImg from '../assets/freelatools-logo.png';

// Tipagem para post
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

// Importa todos os posts .txt de forma dinâmica
const postFiles = import.meta.glob('../../posts/*.txt', { as: 'raw', eager: true });
const posts: PostMeta[] = Object.values(postFiles)
  .map((content) => parsePost(content as string))
  .filter(Boolean) as PostMeta[];

const heroCharacterUrl = 'https://pub-019a03b0b6e942f6a10a4bd626b74e2b.r2.dev/freelancer.png';

export default function LandingPage() {
  return (
    <>
      <div className="lp-root">
        <section className="lp-hero minimal-hero">
          <div className="lp-hero-flex">
            <div className="lp-hero-content minimal-hero-content" style={{alignItems:'flex-start',textAlign:'left'}}>
              <h1 className="lp-hero-title">O portal dos freelancers</h1>
              <p className="lp-hero-desc">Ferramentas para facilitar sua vida e valorizar seu trabalho.</p>
            </div>
            <div className="lp-hero-img" style={{display:'flex',justifyContent:'flex-end',alignItems:'center',width:'50%',marginTop:0}}>
              <img src={heroCharacterUrl} alt="Personagem FreelaTools" style={{maxWidth:320, width:'100%', borderRadius:24, boxShadow:'0 4px 32px rgba(37,99,235,0.13)'}} />
            </div>
          </div>
        </section>

        <section className="lp-section" id="ferramentas">
          <h2 className="lp-section-title">Ferramentas</h2>
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
            <a href="/calculator/project-hourly" className="lp-calc-card">
              <span className="lp-calc-icon">⏱️</span>
              <div>
                <strong>Valor Real por Hora</strong>
                <p>Calcule quanto realmente ganhou por hora em um projeto.</p>
              </div>
            </a>
            <a href="/calculator/vacation-reserve" className="lp-calc-card">
              <span className="lp-calc-icon">🏖️</span>
              <div>
                <strong>Reserva para Férias</strong>
                <p>Descubra quanto guardar para tirar férias tranquilamente.</p>
              </div>
            </a>
          </div>
        </section>

        <section className="lp-section" id="conteudo">
          <h2 className="lp-section-title">Conteúdo</h2>
          <div className="lp-content-list">
            {posts.map((post) => {
              const desc = post.description || 'Confira o post completo!';
              return (
                <a key={post.slug} href={`/content/${post.slug}`} className="lp-content-card">
                  <span className="lp-calc-icon" style={{fontSize:'2.2rem'}}>{post.emoji || '📝'}</span>
                  <div>
                    <strong>{post.title}</strong>
                    <p>{desc}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <footer className="lp-footer">
          <p>© {new Date().getFullYear()} FreelaTools. Todos os direitos reservados.</p>
        </footer>
      </div>
    </>
  );
}
