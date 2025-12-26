import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { ArticleCard } from '../components/ArticleCard';
import { Footer } from '../components/Footer';
export function CategoryPage() {
  const { category } = useParams<{ category: string }>();

  const allArticles = [
    {
      id: "trump-governance",
      title: "Power, Order, and Numbers: Three Areas Where Trump Governs Effectively",
      excerpt: "Much of the public debate about Donald Trump never reaches the level where government authority actually operates. A more useful approach is to look at where federal power is exercised directly and whether outcomes move in measurable ways.",
      author: "Contrarian Staff",
      date: "Dec 26, 2025",
      category: "Policy",
      imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=80"
    },
    {
      id: "public-admin-accountability",
      title: "Process Without Outcomes: Why Public Administration Protects Programs That Cannot Prove They Work",
      excerpt: "From DEI initiatives to charter schools, government systems excel at producing activity while remaining weak at owning consequences when those systems fail.",
      author: "Contrarian Staff",
      date: "Dec 25, 2025",
      category: "Policy",
      imageUrl: "https://images.unsplash.com/photo-1732721093883-fe195a95cc07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBwb2xpY3l8ZW58MXx8fHwxNzY2NzAxMzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "dei-article",
      title: "DEI Persists Because No One Pays for It Failing—Only for Questioning It in Public Institutions",
      excerpt: "An examination of how institutional incentive structures ensure DEI programs continue regardless of outcomes, with consequences distributed to those who cannot refuse them.",
      author: "Contrarian Staff",
      date: "Dec 25, 2025",
      category: "Policy",
      imageUrl: "https://images.unsplash.com/photo-1598962689458-f705dc20e578?w=1200&q=80"
    },
    {
      id: "inequality-article",
      title: 'What "Inequality" Really Means in America Today—and What Leaders Must Change to Address It',
      excerpt: "Many disparities now described as inequality are not produced by markets at all. They are produced by regulation and policy choices that restrict opportunity rather than expand it.",
      author: "Contrarian Staff",
      date: "Dec 25, 2025",
      category: "Economics",
      imageUrl: "https://images.unsplash.com/photo-1761001315871-b1f7650a6303?w=1200&q=80"
    }
  ];

  const filteredArticles = category
    ? allArticles.filter(article => article.category.toLowerCase() === category.toLowerCase())
    : allArticles;

  const categoryTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
    : 'All Articles';

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-8">
          <h1 className="mb-2">{categoryTitle}</h1>
          <p className="mb-8 text-gray-600">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
          </p>
          
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No articles found in this category.</p>
              <Link to="/" className="text-black hover:underline">
                ← Return to home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <Link 
                  key={index}
                  to={article.id ? `/article/${article.id}` : '#'}
                  className="block"
                >
                  <ArticleCard {...article} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
