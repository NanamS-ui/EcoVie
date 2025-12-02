import { Leaf, Heart } from 'lucide-react';

export default function Footer() {
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
            <div className="my-4 h-[2px] w-24 rounded-full bg-green-500/50" />
            <div className="flex items-center justify-center text-sm text-gray-500 md:justify-start">
              <span>Fait avec</span>
              <Heart className="mx-2 h-4 w-4 fill-red-500 text-red-500" />
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
                <span className="cursor-pointer hover:text-white transition-colors">
                  Accueil
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Articles
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Contact
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400">
              Recevez une sélection d&apos;articles et de conseils éco-responsables une fois par mois.
            </p>
            <form
              className="mt-3 flex flex-col gap-3 sm:flex-row md:items-center"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Votre email"
                className="h-10 w-full rounded-full border border-gray-700 bg-gray-900/60 px-4 text-sm text-gray-100 placeholder:text-gray-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-full bg-green-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-green-500"
              >
                S&apos;abonner
              </button>
            </form>
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
