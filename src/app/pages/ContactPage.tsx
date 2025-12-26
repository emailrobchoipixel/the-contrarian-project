import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b-2 border-black sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link to="/" className="inline-block">
            <h1 style={{ lineHeight: '0.9', letterSpacing: '-0.02em' }}>
              THE<br/>CONTRARIAN<br/>PROJECT
            </h1>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="mb-12">Contact</h1>

        <div className="prose prose-lg max-w-none space-y-8">
          <p>
            The Contrarian Project welcomes thoughtful submissions aligned with its editorial focus and publishes a limited number of vetted contributions. We also consider inquiries related to speaking engagements and podcast appearances.
          </p>

          <div className="mt-12 space-y-4">
            <p>
              <strong>Email:</strong> <a href="mailto:robertchoi@thecontrarian.info" className="text-black underline">robertchoi@thecontrarian.info</a>
            </p>
            <p>
              <strong>Books.by/robert</strong>
            </p>
            <p>
              <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/robertjchoi" target="_blank" rel="noopener noreferrer" className="text-black underline">https://www.linkedin.com/in/robertjchoi</a>
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link to="/" className="text-gray-600 hover:text-black">
            ← Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}