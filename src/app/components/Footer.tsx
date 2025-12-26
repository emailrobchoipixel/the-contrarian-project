import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-black bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="mb-4">About</h4>
            <p className="text-sm text-gray-600">
              The Contrarian Project publishes outcome-driven analysis and commentary on policy, economics, public administration, and culture.
            </p>
          </div>
          <div>
            <h4 className="mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/policy" className="text-gray-600 hover:text-black">Policy</Link></li>
              <li><Link to="/category/economics" className="text-gray-600 hover:text-black">Economics</Link></li>
              <li><Link to="/category/culture" className="text-gray-600 hover:text-black">Culture</Link></li>
              <li><Link to="/category/commentary" className="text-gray-600 hover:text-black">Commentary</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://x.com/robertjchoi" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">X (Twitter)</a></li>
              <li><a href="https://www.linkedin.com/in/robertjchoi" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">LinkedIn</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">RSS Feed</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="text-gray-600 hover:text-black">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-600 hover:text-black">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-black">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 text-sm text-gray-600">
          <p>© 2025 The Contrarian Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}