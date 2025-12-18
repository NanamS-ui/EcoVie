import { Leaf, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="mt-20 border-t border-gray-800 bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[2fr,1.5fr,1.5fr] md:items-start">
          {/* Logo + Description */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center space-x-3 md:justify-start">
              <Leaf className="h-9 w-9 text-green-500" />
              <span className="text-3xl font-bold tracking-wide text-white">
                ÉcoVie
              </span>
            </div>
            <p className="mx-auto max-w-md text-lg leading-relaxed text-gray-400 md:mx-0">
              Un blog dédié aux éco-délégués sur l&apos;écologie et au développement durable. Ensemble,
              construisons un avenir plus vert pour notre planète.
            </p>
            <div className="my-4 h-[2px] w-24 rounded-full bg-emerald-500/50" />
                    <div className="flex items-center justify-center text-sm text-gray-500 md:justify-start">
                        <span>Fait avec</span>
                        <button
                          type="button"
                          aria-label="Accéder au BackOffice"
                          onClick={() => onNavigate && onNavigate('backoffice')}
                          className="mx-2 inline-flex items-center"
                        >
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </button>
                        <span>pour la planète</span>
                      </div>
          </div>

          {/* Liens rapides */}
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('home')}
                  className="cursor-pointer hover:text-white transition-colors transition-transform hover:translate-x-[1px]"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('articles')}
                  className="cursor-pointer hover:text-white transition-colors transition-transform hover:translate-x-[1px]"
                >
                  Articles
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('contact')}
                  className="cursor-pointer hover:text-white transition-colors transition-transform hover:translate-x-[1px]"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">
              Notre Mission
            </h3>

            <p className="text-sm text-gray-400">
              Sensibiliser, informer et inspirer des actions concrètes pour protéger la
              nature et bâtir un avenir durable.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} <span className="text-gray-300">ÉcoVie</span>. Tous droits
          réservés.
        </div>
      </div>
    </footer>
  );
}
