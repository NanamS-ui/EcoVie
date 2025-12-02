import { Leaf } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 text-green-700 hover:text-green-800 transition-colors"
          >
            <Leaf className="w-8 h-8" />
            <span className="text-xl font-bold">ÉcoVie</span>
          </button>

          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`${
                currentPage === 'home'
                  ? 'text-green-700 border-b-2 border-green-700'
                  : 'text-gray-600 hover:text-green-700'
              } transition-colors pb-1`}
            >
              Accueil
            </button>
            <button
              onClick={() => onNavigate('articles')}
              className={`${
                currentPage === 'articles'
                  ? 'text-green-700 border-b-2 border-green-700'
                  : 'text-gray-600 hover:text-green-700'
              } transition-colors pb-1`}
            >
              Articles
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
