import { BrowserRouter, Link } from 'react-router-dom';
import RoutesConfig from './routes';
import './css/global.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-brand">
            <Link to="/" className="navbar-title">Movie Browser</Link>
          </div>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/favorites" className="navbar-link">Favorites</Link>
          </div>
        </nav>
        <RoutesConfig />
      </div>
    </BrowserRouter>
  );
}

export default App;