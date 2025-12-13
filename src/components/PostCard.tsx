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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl animate-fade-in">
      {post.image_url && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        {post.categories && (
          <span className="mb-3 inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-green-700">
            {post.categories.name}
          </span>
        )}
        <h2 className="mb-3 line-clamp-2 text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-green-700">
          {post.title}
        </h2>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-2 flex items-center justify-between pt-4 text-sm text-gray-500 border-t border-gray-100">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{formatDate(post.created_at)}</span>
          </div>
          <button
            onClick={() => onReadMore(post)}
            className="inline-flex items-center text-sm font-semibold text-green-700 transition-all group-hover:translate-x-0.5 group-hover:text-green-800"
          >
            Lire plus
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
