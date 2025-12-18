import { Category } from '../lib/supabase';

interface CategoryFilterAltProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export default function CategoryFilterAlt({ categories, selectedCategory, onSelectCategory }: CategoryFilterAltProps) {
  return (
    <section className="mb-8 bg-white/80 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-600">Filtrer</h3>
          <p className="text-xs text-gray-400">Choisissez un thème</p>
        </div>
        <div className="text-xs text-gray-500 hidden sm:inline">{categories.length} thème{categories.length > 1 ? 's' : ''}</div>
      </div>

      <div className="flex gap-3 overflow-x-auto py-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`flex-shrink-0 inline-flex items-center gap-3 px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${
            selectedCategory === null
              ? 'bg-green-600 text-white border-transparent shadow-md'
              : 'bg-white text-gray-700 border-gray-200 hover:bg-green-50'
          }`}
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs">All</span>
          <span className="text-sm font-medium">Toutes</span>
        </button>

        {categories.map((c) => {
          const isSelected = selectedCategory === c.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelectCategory(c.id)}
              className={`flex-shrink-0 inline-flex items-center gap-3 px-4 py-2 rounded-full border transition-colors whitespace-nowrap ${
                isSelected ? 'bg-green-50 text-green-800 border-green-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-green-50'
              }`}
            >
              <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${isSelected ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {c.name.charAt(0).toUpperCase()}
              </span>
              <div className="text-left">
                <div className="text-sm font-medium leading-4">{c.name}</div>
                <div className="text-xs text-gray-400">Thème</div>
              </div>
              <span className={`ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${isSelected ? 'bg-green-600 text-white' : 'bg-white text-gray-700 shadow-sm'}`}>
                ✓
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
