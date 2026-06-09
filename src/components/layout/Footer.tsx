import { Link } from 'react-router-dom';
import { Mail, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';

const UpworkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
  </svg>
);

const ClutchIcon = () => (
  <svg viewBox="-1 -1 23 27" fill="currentColor" className="w-5 h-5">
    <path d="M17.261 18.721c-1.521 1.565-3.587 2.413-5.761 2.413-4.456 0-7.696-3.5-7.696-8.304 0-4.826 3.24-8.326 7.696-8.326 2.153 0 4.196.847 5.74 2.391l.608.609 2.674-2.674-.587-.609C17.718 1.938 14.718.7 11.5.7 4.935.7 0 5.917 0 12.851 0 19.764 4.957 24.96 11.5 24.96c3.24 0 6.24-1.26 8.457-3.543l.587-.609-2.652-2.717z"/>
    <circle cx="11.5" cy="16.33" r="2.891"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-surface-50 border-t border-white/5 pt-16 md:pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          {/* Brand */}
          <div>
            <div className="mb-4 -ml-4">
              <img src="/DiscoverDev-logo.png" alt="DiscoverDev" className="w-48 h-auto -my-12" />
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              Your technology partner from idea to scale. We think product-first, then build with precision.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/disoverdev/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-primary/20 hover:border-primary/30 transition-all text-text-secondary hover:text-primary"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.upwork.com/agencies/discoverdev/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-syntax-green/20 hover:border-syntax-green/30 transition-all text-text-secondary hover:text-syntax-green"
              >
                <UpworkIcon />
              </a>
              <a
                href="https://www.instagram.com/discoverdev.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-pink-500/20 hover:border-pink-500/30 transition-all text-text-secondary hover:text-pink-500"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61587073472183"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-500/30 transition-all text-text-secondary hover:text-blue-500"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://clutch.co/profile/discoverdev"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-orange-500/20 hover:border-orange-500/30 transition-all text-text-secondary hover:text-orange-500"
              >
                <ClutchIcon />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-text-muted mb-4 uppercase tracking-[0.2em]">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-text-secondary hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/build" className="text-text-secondary hover:text-white transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <a href="https://clutch.co/profile/discoverdev" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-white transition-colors text-sm">
                  Clutch Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold text-text-muted mb-4 uppercase tracking-[0.2em]">Services</h3>
            <ul className="space-y-3">
              <li className="text-text-secondary text-sm">Product Strategy</li>
              <li className="text-text-secondary text-sm">Custom Development</li>
              <li className="text-text-secondary text-sm">AI & Machine Learning</li>
              <li className="text-text-secondary text-sm">Team Augmentation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold text-text-muted mb-4 uppercase tracking-[0.2em]">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-text-secondary text-sm">
                  Texas, USA<br />
                  Alexandria, Egypt
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@discoverdev.ai" className="text-text-secondary hover:text-white transition-colors text-sm">
                  info@discoverdev.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            &copy; {currentYear} DiscoverDev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
