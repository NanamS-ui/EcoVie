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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm font-semibold text-green-700 hover:text-green-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux articles
        </button>

        <article className="overflow-hidden rounded-3xl border border-gray-100 bg-white/90 shadow-xl shadow-gray-200/60">
          {post.image_url && (
            <div className="relative h-80 overflow-hidden sm:h-96">
              <img
                src={post.image_url}
                alt={post.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 flex flex-col gap-3 text-white drop-shadow-lg">
                {post.categories && (
                  <span className="inline-flex w-fit items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    {post.categories.name}
                  </span>
                )}
                <h1 className="max-w-3xl text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center text-sm text-white/80">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="p-6 sm:p-10 lg:p-12">
            {post.excerpt && (
              <p className="mb-10 text-lg leading-relaxed text-gray-700 sm:text-xl">
                {post.excerpt}
              </p>
            )}

            <div className="prose prose-lg prose-gray max-w-none prose-headings:scroll-mt-24">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-5 leading-relaxed text-gray-800">
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
