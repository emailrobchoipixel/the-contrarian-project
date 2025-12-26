import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  featured?: boolean;
}

export function ArticleCard({ 
  title, 
  excerpt, 
  author, 
  date, 
  category, 
  imageUrl,
  featured = false 
}: ArticleCardProps) {
  if (featured) {
    return (
      <article className="border-b border-black pb-12 mb-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="aspect-[4/3] overflow-hidden flex items-center justify-center">
              <ImageWithFallback 
                src={imageUrl} 
                alt={title}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <span className="px-3 py-1 bg-black text-white text-xs tracking-wider">
                {category.toUpperCase()}
              </span>
            </div>
            <h2 className="mb-4">{title}</h2>
            <p className="mb-6 text-gray-700">
              {excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>{author}</span>
              <span>•</span>
              <span>{date}</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white border-2 border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all h-full flex flex-col">
      <div className="aspect-video overflow-hidden border-b-2 border-black">
        <ImageWithFallback 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs uppercase tracking-wider opacity-60">
            {category}
          </span>
        </div>
        <h3 className="text-lg leading-tight mb-2 group-hover:underline">
          {title}
        </h3>
        <p className="text-sm opacity-70 line-clamp-2 mb-4 flex-1">
          {excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs opacity-60 mt-auto">
          <span>{author}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
      </div>
    </article>
  );
}