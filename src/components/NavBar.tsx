import { Link, useLocation } from 'react-router-dom';
const logoUrl = 'https://pub-019a03b0b6e942f6a10a4bd626b74e2b.r2.dev/favicon.png';
import './NavBar.css';

export default function NavBar() {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logoUrl} alt="FreelaTools Logo" />
        </Link>
        <span className="navbar-title">FreelaTools</span>
      </div>
      <ul className="navbar-links">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/#calculadoras">Ferramentas</Link>
        </li>
        <li className={location.pathname.startsWith('/content') ? 'active' : ''}>
          <Link to="/content">Conteúdo</Link>
        </li>
      </ul>
    </nav>
  );
}
