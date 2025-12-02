import { useState, useEffect } from 'react';
import { supabase, Category, PostWithCategory } from './lib/supabase';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import PostCard from './components/PostCard';
import PostDetail from './components/PostDetail';
import Footer from './components/Footer';

type Page = 'home' | 'articles' | 'post';

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
        <Footer />
      </>
    );
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

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Aucun article trouvé dans cette catégorie.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} onReadMore={handleReadMore} />
              ))}
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
