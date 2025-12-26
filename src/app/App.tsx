import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { DEIArticlePage } from './pages/DEIArticlePage';
import { InequalityArticlePage } from './pages/InequalityArticlePage';
import { PublicAdminArticlePage } from './pages/PublicAdminArticlePage';
import { TrumpGovernanceArticlePage } from './pages/TrumpGovernanceArticlePage';
import { CategoryPage } from './pages/CategoryPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { ContactPage } from './pages/ContactPage';
import { useState, useEffect } from 'react';

const projectId = "hacvsdfbrtsadcfvbeme";
const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhY3ZzZGZicnRzYWRjZnZiZW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2OTY1NjAsImV4cCI6MjA4MjI3MjU2MH0.fcMF0l1aJSUzJgUUPQV_0jC-VwX85fvp3MUTHvgKyIM";

interface Subscriber {
  email: string;
  subscribed_at: string;
  preferences?: string[];
}

function AdminPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0c5dc391/subscribers`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      const data = await response.json();
      if (data.subscribers) {
        setSubscribers(data.subscribers);
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeSubscriber = async (email: string) => {
    if (!confirm(`Are you sure you want to remove ${email}?`)) {
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0c5dc391/subscriber/${encodeURIComponent(email)}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        setMessage(`✅ Removed ${email}`);
        // Refresh the subscriber list
        fetchSubscribers();
      } else {
        const data = await response.json();
        setMessage(`❌ Error: ${data.error || 'Failed to remove subscriber'}`);
      }
    } catch (error) {
      console.error('Error removing subscriber:', error);
      setMessage('❌ Error removing subscriber. Check console for details.');
    }
  };

  const sendNewsletter = async () => {
    if (!confirm('Are you sure you want to send the newsletter to all subscribers?')) {
      return;
    }

    setSending(true);
    setMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0c5dc391/send-newsletter`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      
      if (response.ok) {
        setMessage(`✅ Newsletter sent successfully to ${data.sent} subscribers!`);
      } else {
        setMessage(`❌ Error: ${data.error || 'Failed to send newsletter'}`);
      }
    } catch (error) {
      console.error('Error sending newsletter:', error);
      setMessage('❌ Error sending newsletter. Check console for details.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col">
            <h1 style={{ lineHeight: '0.9', letterSpacing: '-0.02em' }}>
              THE<br/>CONTRARIAN<br/>PROJECT
            </h1>
          </div>
        </div>
      </header>

      <main className="px-6 py-12 max-w-6xl mx-auto">
        <h1 className="mb-8">Admin Dashboard</h1>
        
        <div className="mb-12">
          <h2 className="mb-4">Newsletter Management</h2>
          <button
            onClick={sendNewsletter}
            disabled={sending}
            className="px-6 py-3 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {sending ? 'Sending Newsletter...' : 'Send Biweekly Newsletter'}
          </button>
          {message && (
            <p className="mt-4" style={{ fontSize: '16px', fontWeight: 'bold' }}>
              {message}
            </p>
          )}
          <p className="mt-4 text-gray-600">
            This will send an email featuring the top 3 most-read articles from the past two weeks to all subscribers.
          </p>
        </div>

        <div>
          <h2 className="mb-4">Subscribers ({subscribers.length})</h2>

          {loading ? (
            <p>Loading subscribers...</p>
          ) : subscribers.length === 0 ? (
            <p>No subscribers yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse" style={{ border: '2px solid black' }}>
                <thead>
                  <tr style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                    <th className="p-3 text-left border border-black">Email</th>
                    <th className="p-3 text-left border border-black">Subscribed Date</th>
                    <th className="p-3 text-left border border-black">Preferences</th>
                    <th className="p-3 text-left border border-black">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber, index) => (
                    <tr key={subscriber.email} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
                      <td className="p-3 border border-black">{subscriber.email}</td>
                      <td className="p-3 border border-black">
                        {new Date(subscriber.subscribed_at).toLocaleDateString()}
                      </td>
                      <td className="p-3 border border-black">
                        {subscriber.preferences && subscriber.preferences.length > 0
                          ? subscriber.preferences.join(', ')
                          : 'All topics'}
                      </td>
                      <td className="p-3 border border-black">
                        <button
                          onClick={() => removeSubscriber(subscriber.email)}
                          className="px-3 py-1 bg-red-500 text-white hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t-2 border-black mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <p className="text-gray-600">© 2025 The Contrarian Project. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/dei-article" element={<DEIArticlePage />} />
        <Route path="/article/inequality-article" element={<InequalityArticlePage />} />
        <Route path="/article/public-admin-accountability" element={<PublicAdminArticlePage />} />
        <Route path="/article/trump-governance" element={<TrumpGovernanceArticlePage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/admin333777" element={
          <div style={{ padding: '50px', backgroundColor: 'red', minHeight: '100vh' }}>
            <h1 style={{ fontSize: '48px', color: 'white' }}>ADMIN TEST</h1>
          </div>
        } />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}