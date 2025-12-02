import { Calendar, ArrowRight } from 'lucide-react';
import { PostWithCategory } from '../lib/supabase';

interface PostCardProps {
  post: PostWithCategory;
  onReadMore: (post: PostWithCategory) => void;
}

export default function PostCard({ post, onReadMore }: PostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {post.image_url && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        {post.categories && (
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-3">
            {post.categories.name}
          </span>
        )}
        <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-green-700 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(post.created_at)}
          </div>
          <button
            onClick={() => onReadMore(post)}
            className="inline-flex items-center text-green-700 font-semibold hover:text-green-800 transition-colors"
          >
            Lire plus
            <ArrowRight className="ml-1 w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
