import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribeClick = () => {
    // If not on homepage, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll to subscribe
      setTimeout(() => {
        const subscriptionSection = document.getElementById('subscribe');
        subscriptionSection?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // If on homepage, scroll to subscribe section
      const subscriptionSection = document.getElementById('subscribe');
      subscriptionSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="border-b border-black bg-white">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a 
            href="/" 
            onClick={handleLogoClick}
            className="hover:opacity-75 transition-opacity cursor-pointer"
          >
            <div>
              <h1 className="tracking-tight">
                <span className="block">THE</span>
                <span className="block -mt-2">CONTRARIAN</span>
                <span className="block -mt-2">PROJECT</span>
              </h1>
            </div>
          </a>
          <nav className="hidden md:flex gap-8">
            <Link to="/category/policy" className="hover:opacity-60 transition-opacity">Policy</Link>
            <Link to="/category/economics" className="hover:opacity-60 transition-opacity">Economics</Link>
            <Link to="/category/culture" className="hover:opacity-60 transition-opacity">Culture</Link>
            <Link to="/category/commentary" className="hover:opacity-60 transition-opacity">Commentary</Link>
          </nav>
        </div>
        <button 
          onClick={handleSubscribeClick}
          className="hover:opacity-60 transition-opacity"
        >
          Subscribe
        </button>
      </div>
    </header>
  );
}