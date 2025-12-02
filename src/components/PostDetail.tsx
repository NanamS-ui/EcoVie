import { Calendar, ArrowLeft } from 'lucide-react';
import { PostWithCategory } from '../lib/supabase';

interface PostDetailProps {
  post: PostWithCategory;
  onBack: () => void;
}

export default function PostDetail({ post, onBack }: PostDetailProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="inline-flex items-center text-green-700 font-semibold hover:text-green-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Retour aux articles
        </button>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {post.image_url && (
            <div className="h-96 overflow-hidden">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            {post.categories && (
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
                {post.categories.name}
              </span>
            )}

            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center text-gray-500 mb-8 pb-8 border-b">
              <Calendar className="w-5 h-5 mr-2" />
              {formatDate(post.created_at)}
            </div>

            {post.excerpt && (
              <p className="text-xl text-gray-700 mb-8 leading-relaxed font-medium">
                {post.excerpt}
              </p>
            )}

            <div className="prose prose-lg max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
