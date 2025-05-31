import './LandingPage.css';

const posts = [
  {
    slug: 'como-cobrar-mais-com-pacotes',
    title: 'Como cobrar mais oferecendo pacotes de serviço',
    date: '30 maio 2025',
    author: 'Equipe FreelaTools',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
    content: (
      <>
        <p><b>Você sente que está perdendo clientes por não saber apresentar opções?</b> Descubra como criar pacotes de serviço que aumentam seu ticket médio e facilitam a decisão do cliente!</p>
        <h2 style={{color:'#2563eb'}}>Por que oferecer pacotes?</h2>
        <ul>
          <li>Ajuda o cliente a comparar e enxergar valor.</li>
          <li>Facilita a negociação e reduz "choros" por desconto.</li>
          <li>Permite vender bônus e diferenciais no pacote premium.</li>
        </ul>
        <h2 style={{color:'#2563eb'}}>Exemplo prático</h2>
        <p>Monte três opções: <b>Básico</b> (essencial), <b>Intermediário</b> (valor padrão), <b>Premium</b> (com bônus e entrega rápida). Assim, o cliente sente que está escolhendo, não apenas aceitando um preço.</p>
        <blockquote style={{background:'#e0e7ff',padding:'1rem',borderRadius:8,margin:'1.5rem 0',color:'#222'}}>Dica: A maioria dos clientes escolhe o intermediário, mas muitos vão para o premium se o valor percebido for claro!</blockquote>
        <p>Use nossa <a href="/calculator/packages" style={{color:'#2563eb',fontWeight:600}}>calculadora de pacotes</a> para gerar suas opções em segundos.</p>
      </>
    )
  }
];

const relatedPosts = [
  {
    slug: 'como-cobrar-mais-com-pacotes',
    title: 'Como cobrar mais oferecendo pacotes de serviço',
  },
  // Adicione mais posts aqui futuramente
];

export default function PostPage() {
  const post = posts[0];
  return (
    <div className="lp-root" style={{background:'#232323',minHeight:'100vh',paddingBottom:0}}>
      <div className="post-layout">
        <main className="post-main">
          <div className="post-meta">
            <span className="post-date">{post.date}</span> · <span className="post-author">{post.author}</span>
          </div>
          <h1 className="post-title">{post.title}</h1>
          <img src={post.image} alt="Capa do post" className="post-image" />
          <article className="post-content">{post.content}</article>
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
