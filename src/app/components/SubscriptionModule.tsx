import { useState } from 'react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export function SubscriptionModule() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Submitting subscription for:', email);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-0c5dc391/subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ 
            email,
            // Default to all categories - user can change later
            preferences: ["Policy", "Economics", "Culture", "Commentary"]
          })
        }
      );

      console.log('Subscription response status:', response.status);
      const data = await response.json();
      console.log('Subscription response data:', data);

      if (response.ok) {
        setStatus('success');
        setMessage(data.alreadySubscribed 
          ? 'You\'re already subscribed! Check your email for the welcome message.'
          : 'Successfully subscribed! Check your email for a welcome message.');
        setEmail('');
        
        // Reset message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
        
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="subscribe" className="bg-black text-white py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="max-w-2xl">
          <h2 className="mb-6">Subscribe to The Contrarian Project</h2>
          <p className="mb-8 text-gray-300">
            Uncompromising analysis on policy, economics, and culture. No clickbait, no easy answers. 
            Join readers who demand substance over spin. Biweekly digest featuring our most-read articles delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="flex-1 px-5 py-3 bg-white text-black placeholder-gray-500"
              required
              disabled={isLoading}
            />
            <button 
              type="submit"
              className="px-8 py-3 bg-white text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          
          {/* Status Messages */}
          {status !== 'idle' && (
            <p className={`mt-4 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </p>
          )}
          
          {status === 'idle' && (
            <p className="mt-4 text-sm text-gray-400">
              Free. Unsubscribe anytime. We respect your inbox.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}