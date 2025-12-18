import { useState, useEffect } from 'react';
import { supabase, Category, PostWithCategory } from './lib/supabase';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryFilterAlt from './components/CategoryFilterAlt';
import PostCard from './components/PostCard';
import PostDetail from './components/PostDetail';
import Footer from './components/Footer';
import BackOffice from './components/BackOffice';

type Page = 'home' | 'articles' | 'post' | 'contact' | 'backoffice';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [categories, setCategories] = useState<Category[]>([]);
  const [posts, setPosts] = useState<PostWithCategory[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostWithCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostWithCategory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredPosts(posts.filter((post) => post.category_id === selectedCategory));
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedCategory, posts]);

  async function fetchData() {
    setLoading(true);

    const { data: categoriesData } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    const { data: postsData } = await supabase
      .from('posts')
      .select('*, categories(*)')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (categoriesData) setCategories(categoriesData);
    if (postsData) setPosts(postsData as PostWithCategory[]);

    setLoading(false);
  }

  const handleNavigate = (page: string) => {
    if (page === 'home') {
      setCurrentPage('home');
      setSelectedPost(null);
    } else if (page === 'articles') {
      setCurrentPage('articles');
      setSelectedPost(null);
    } else if (page === 'contact') {
      setCurrentPage('contact');
      setSelectedPost(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'backoffice') {
      setCurrentPage('backoffice');
      setSelectedPost(null);
    }
  };

  const handleReadMore = (post: PostWithCategory) => {
    setSelectedPost(post);
    setCurrentPage('post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToArticles = () => {
    setCurrentPage('articles');
    setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExplore = () => {
    setCurrentPage('articles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'post' && selectedPost) {
    return (
      <>
        <Header onNavigate={handleNavigate} currentPage={currentPage} />
        <PostDetail post={selectedPost} onBack={handleBackToArticles} />
        <Footer onNavigate={handleNavigate} />
      </>
    );
  }

  if (currentPage === 'backoffice') {
    return <BackOffice onBack={() => handleNavigate('home')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />

      {currentPage === 'home' && (
        <>
          <Hero onExplore={handleExplore} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Articles Récents
            </h2>
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(0, 3).map((post) => (
                  <PostCard key={post.id} post={post} onReadMore={handleReadMore} />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {currentPage === 'articles' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Tous les Articles</h1>

          <CategoryFilterAlt
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-green-700"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              Aucun article trouvé dans cette catégorie.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} onReadMore={handleReadMore} />
              ))}
            </div>
          )}
        </div>
      )}

      {currentPage === 'contact' && (
        <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16">
          <div className="mx-auto flex max-w-4xl flex-col gap-12 px-4 sm:px-6 lg:px-8 md:flex-row">
            <div className="md:w-1/2">
              <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Contact
              </h1>
              <p className="mb-6 text-gray-600">
                Une question, une suggestion d&apos;article ou l&apos;envie de collaborer ?
                Écrivez-nous, nous vous répondrons au plus vite.
              </p>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-900">Email :</span>{' '}
                  contact@ecovie.fr
                </p>
                <p>
                  <span className="font-semibold text-gray-900">Réseaux sociaux :</span>{' '}
                  Instagram, X, LinkedIn
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm md:w-1/2">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Votre nom complet"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="vous@example.com"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Expliquez-nous votre demande..."
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-500"
                >
                  Envoyer le message
                </button>
                <p className="text-xs text-gray-400">
                  Vos informations ne seront utilisées que pour vous répondre.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
