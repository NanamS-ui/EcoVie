import { useState } from 'react';
import { Leaf, Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleNavigateClick = (page: string) => {
    onNavigate(page);
    setIsMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => handleNavigateClick('home')}
            className="group flex items-center space-x-2 text-green-700 hover:text-green-800 transition-colors hover:scale-[1.02] transition-transform focus:outline-none focus:ring-2 focus:ring-green-500/40 rounded-full"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
              <Leaf className="w-5 h-5" />
            </span>
            <span className="text-xl font-bold tracking-tight">ÉcoVie</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigateClick('home')}
              className={`relative text-sm font-medium tracking-wide transition-colors hover:-translate-y-[1px] transition-transform focus:outline-none focus:ring-2 focus:ring-green-500/30 rounded-md ${
                currentPage === 'home'
                  ? 'text-green-700'
                  : 'text-gray-600 hover:text-green-700'
              }`}
              aria-current={currentPage === 'home' ? 'page' : undefined}
            >
              <span className="inline-block rounded-full px-3 py-1 transition-colors hover:bg-green-50">Accueil</span>
              <span
                className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] rounded-full transition-all bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 ${
                  currentPage === 'home' ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full'
                }`}
              />
            </button>
            <button
              onClick={() => handleNavigateClick('articles')}
              className={`relative text-sm font-medium tracking-wide transition-colors hover:-translate-y-[1px] transition-transform focus:outline-none focus:ring-2 focus:ring-green-500/30 rounded-md ${
                currentPage === 'articles'
                  ? 'text-green-700'
                  : 'text-gray-600 hover:text-green-700'
              }`}
              aria-current={currentPage === 'articles' ? 'page' : undefined}
            >
              <span className="inline-block rounded-full px-3 py-1 transition-colors hover:bg-green-50">Articles</span>
              <span
                className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] rounded-full transition-all bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 ${
                  currentPage === 'articles' ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full'
                }`}
              />
            </button>
            <button
              onClick={() => handleNavigateClick('contact')}
              className={`relative text-sm font-medium tracking-wide transition-colors hover:-translate-y-[1px] transition-transform focus:outline-none focus:ring-2 focus:ring-green-500/30 rounded-md ${
                currentPage === 'contact'
                  ? 'text-green-700'
                  : 'text-gray-600 hover:text-green-700'
              }`}
              aria-current={currentPage === 'contact' ? 'page' : undefined}
            >
              <span className="inline-block rounded-full px-3 py-1 transition-colors hover:bg-green-50">Contact</span>
              <span
                className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] rounded-full transition-all bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 ${
                  currentPage === 'contact' ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full'
                }`}
              />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="inline-flex items-center justify-center rounded-full p-2 text-gray-700 hover:bg-gray-100 md:hidden"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label="Ouvrir le menu"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {isMobileOpen && (
          <div className="md:hidden pb-3 animate-fade-in">
            <div className="flex flex-col space-y-1 rounded-2xl border border-gray-100 bg-white/95 p-2 shadow-md">
              <button
                onClick={() => handleNavigateClick('home')}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium ${
                  currentPage === 'home'
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Accueil
              </button>
              <button
                onClick={() => handleNavigateClick('articles')}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium ${
                  currentPage === 'articles'
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Articles
              </button>
              <button
                onClick={() => handleNavigateClick('contact')}
                className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium ${
                  currentPage === 'contact'
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
