import { Leaf } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => onNavigate('home')}
            className="group flex items-center space-x-2 text-green-700 hover:text-green-800 transition-colors"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
              <Leaf className="w-5 h-5" />
            </span>
            <span className="text-xl font-bold tracking-tight">ÉcoVie</span>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`relative text-sm font-medium tracking-wide transition-colors ${
                currentPage === 'home'
                  ? 'text-green-700'
                  : 'text-gray-600 hover:text-green-700'
              }`}
            >
              <span>Accueil</span>
              <span
                className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] rounded-full bg-green-600 transition-all ${
                  currentPage === 'home' ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full'
                }`}
              />
            </button>
            <button
              onClick={() => onNavigate('articles')}
              className={`relative text-sm font-medium tracking-wide transition-colors ${
                currentPage === 'articles'
                  ? 'text-green-700'
                  : 'text-gray-600 hover:text-green-700'
              }`}
            >
              <span>Articles</span>
              <span
                className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] rounded-full bg-green-600 transition-all ${
                  currentPage === 'articles' ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full'
                }`}
              />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`relative text-sm font-medium tracking-wide transition-colors ${
                currentPage === 'contact'
                  ? 'text-green-700'
                  : 'text-gray-600 hover:text-green-700'
              }`}
            >
              <span>Contact</span>
              <span
                className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] rounded-full bg-green-600 transition-all ${
                  currentPage === 'contact' ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full'
                }`}
              />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
