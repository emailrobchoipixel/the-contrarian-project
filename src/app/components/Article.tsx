import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ArticleProps {
  title: string;
  author: string;
  credentials?: string;
  date: string;
  categories: string[];
  imageUrl: string;
  content: string;
  articleId?: string;
}

export function Article({ 
  title, 
  author, 
  credentials,
  date, 
  categories, 
  imageUrl, 
  content,
  articleId
}: ArticleProps) {
  const navigate = useNavigate();

  // Track article view when component loads
  useEffect(() => {
    if (!articleId) return;

    const trackView = async () => {
      try {
        await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-0c5dc391/track-view`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`
            },
            body: JSON.stringify({ articleId })
          }
        );
      } catch (error) {
        console.error('Error tracking article view:', error);
      }
    };

    trackView();
  }, [articleId]);

  const handleSubscribeClick = () => {
    navigate('/');
    // Small delay to ensure navigation completes before scrolling
    setTimeout(() => {
      const subscriptionSection = document.getElementById('subscribe');
      subscriptionSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <article className="bg-white">{/* Article Header */}
      <div className="border-b border-black">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((category, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-black text-white text-xs tracking-wider"
              >
                {category.toUpperCase()}
              </span>
            ))}
          </div>
          <h1 className="mb-8">{title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span>{author}{credentials && `, ${credentials}`}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="border-b border-black">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="aspect-[16/9] overflow-hidden flex items-center justify-center">
            <ImageWithFallback 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-8">
                  <table className="min-w-full border-collapse border border-gray-300" {...props} />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead className="bg-gray-100" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="border border-gray-300 px-4 py-2" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="mb-6 text-gray-900 leading-relaxed" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Article Footer */}
      <div className="border-t border-black bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="text-center">
            <h3 className="mb-4">Enjoyed this essay?</h3>
            <p className="mb-6 text-gray-700">
              Subscribe to The Contrarian for more rigorous analysis on policy, culture, and economics.
            </p>
            <button 
              onClick={handleSubscribeClick}
              className="px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}