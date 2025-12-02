import { Leaf, Heart } from 'lucide-react';

export default function Footer() {
  return (
      <footer className="bg-gray-950 text-gray-300 py-14 mt-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">

          {/* Logo + Description */}
          <div className="flex flex-col items-center text-center space-y-4">

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Leaf className="w-9 h-9 text-green-500" />
              <span className="text-3xl font-bold text-white tracking-wide">
              ÉcoVie
            </span>
            </div>

            {/* Description */}
            <p className="text-gray-400 max-w-2xl leading-relaxed text-lg">
              Un blog dédié à l'écologie et au développement durable.
              Ensemble, construisons un avenir plus vert pour notre planète.
            </p>

            {/* Barre séparatrice */}
            <div className="w-24 h-[2px] bg-green-500/50 rounded-full my-4"></div>

            {/* Made with love */}
            <div className="flex items-center text-sm text-gray-500">
              <span>Fait avec</span>
              <Heart className="w-4 h-4 mx-2 text-red-500 fill-red-500" />
              <span>pour la planète</span>
            </div>

            {/* Copyright */}
            <p className="text-gray-500 text-sm pt-4">
              © {new Date().getFullYear()} <span className="text-gray-300">ÉcoVie</span>. Tous droits réservés.
            </p>
          </div>

        </div>
      </footer>
  );
}
