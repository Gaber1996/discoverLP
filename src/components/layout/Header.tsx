import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../shared/Button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/build', label: 'Services' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-surface/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-gradient-to-b from-black/30 to-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6 h-20">
        <div className="flex items-center justify-between h-full">
          <Link
            to="/"
            className="flex items-center relative group"
          >
            <img
              src="/DiscoverDev-logo.png"
              alt="DiscoverDev"
              className="w-48 md:w-56 h-auto transition-all duration-300 transform group-hover:scale-105"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 font-medium text-sm transition-all duration-300 rounded-lg group ${
                  location.pathname === link.to
                    ? 'text-white'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${
                    location.pathname === link.to ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                  }`}
                />
              </Link>
            ))}

            <div className="ml-4 flex items-center gap-2">
              <Button to="/build" variant="primary" arrow className="text-xs px-4 py-2">
                Build With Us
              </Button>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg text-white hover:bg-white/10 transition-all duration-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-surface/98 backdrop-blur-xl border-t border-white/5 shadow-2xl">
            <div className="container mx-auto px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-3.5 rounded-lg transition-all duration-200 font-medium ${
                    location.pathname === link.to
                      ? 'text-white bg-white/5'
                      : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-3 space-y-2">
                <Button to="/build" variant="primary" arrow className="w-full">
                  Build With Us
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
