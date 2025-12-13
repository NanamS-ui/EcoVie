import { Category } from '../lib/supabase';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <section className="mb-10 rounded-3xl border border-gray-100 bg-white/80 p-5 shadow-sm animate-fade-in">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Filtrer par catégorie
          </h2>
          <p className="text-xs text-gray-400">
            Sélectionnez un thème pour affiner les articles.
          </p>
        </div>
        <span className="hidden rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 sm:inline-flex">
          {categories.length} thème{categories.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <button
          onClick={() => onSelectCategory(null)}
          className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-all hover:-translate-y-[1px] ${
            selectedCategory === null
              ? 'border-green-600 bg-green-600 text-white shadow-md shadow-green-600/30'
              : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-green-500/60 hover:bg-white'
          }`}
        >
          <div className="flex flex-col text-left">
            <span className="font-semibold">Toutes les catégories</span>
            <span
              className={`text-xs ${
                selectedCategory === null ? 'text-green-100' : 'text-gray-400'
              }`}
            >
              Voir tous les articles
            </span>
          </div>
          <span
            className={`ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
              selectedCategory === null
                ? 'bg-white/15 text-white'
                : 'bg-white text-gray-700 shadow-sm'
            }`}
          >
            {filteredCountLabel(categories.length)}
          </span>
        </button>

        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-all hover:-translate-y-[1px] ${
                isSelected
                  ? 'border-green-600 bg-green-50 text-green-800 shadow-sm shadow-green-100'
                  : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-green-500/60 hover:bg-white'
              }`}
            >
              <div className="flex flex-col text-left">
                <span className="font-semibold">{category.name}</span>
                <span
                  className={`text-xs ${
                    isSelected ? 'text-green-600' : 'text-gray-400'
                  }`}
                >
                  Thème écologique
                </span>
              </div>
              <span
                className={`ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                  isSelected
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 shadow-sm'
                }`}
              >
                ✓
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// Simple helper pour afficher un badge lisible sur la carte "Toutes les catégories"
function filteredCountLabel(count: number) {
  if (count === 0) return '0';
  if (count > 9) return '9+';
  return String(count);
}
