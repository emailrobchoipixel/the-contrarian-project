import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

export function TermsOfServicePage() {
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
        <h1 className="mb-8">Terms of Service for The Contrarian Project</h1>
        
        <p className="text-gray-600 mb-12">Last Updated: December 26, 2025</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <p>
            These Terms of Service ("Terms") govern your access to and use of The Contrarian Project website located at https://thecontrarian.info (the "Site"). By accessing or using the Site, you agree to be bound by these Terms. If you do not agree, do not use the Site.
          </p>

          <section>
            <h2>1. Nature of the Site</h2>
            <p>
              The Contrarian Project is a digital editorial, commentary, and opinion platform. Content published on the Site reflects analysis, viewpoints, and commentary and is provided for informational and expressive purposes only. Nothing on the Site constitutes legal, financial, medical, or professional advice.
            </p>
          </section>

          <section>
            <h2>2. Eligibility</h2>
            <p>
              You must be at least 16 years old to access or use the Site. By using the Site, you represent that you meet this requirement.
            </p>
          </section>

          <section>
            <h2>3. Intellectual Property</h2>
            <p>
              All content on the Site, including articles, text, graphics, logos, design elements, and original commentary, is owned by or licensed to The Contrarian Project and is protected by intellectual property laws. You may view, share, and link to content for personal, non-commercial use, provided you do not modify the content and you attribute it to The Contrarian Project. Any other use requires prior written permission.
            </p>
          </section>

          <section>
            <h2>4. User Submissions</h2>
            <p>If the Site allows comments, emails, or other submissions:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You retain ownership of your submitted content.</li>
              <li>By submitting content, you grant The Contrarian Project a non-exclusive, royalty-free, worldwide license to use, publish, reproduce, and display that content in connection with the Site.</li>
              <li>You represent that your submissions do not violate the rights of others or applicable law.</li>
              <li>We reserve the right to remove or moderate submissions at our discretion.</li>
            </ul>
          </section>

          <section>
            <h2>5. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Site for unlawful, harmful, or abusive purposes.</li>
              <li>Post or transmit defamatory, harassing, obscene, or misleading material.</li>
              <li>Attempt to interfere with the Site's operation, security, or functionality.</li>
              <li>Scrape, harvest, or systematically collect content or data without permission.</li>
            </ul>
          </section>

          <section>
            <h2>6. Third-Party Links</h2>
            <p>
              The Site may contain links to third-party websites or services. We do not control and are not responsible for third-party content, policies, or practices. Accessing third-party sites is at your own risk.
            </p>
          </section>

          <section>
            <h2>7. Disclaimers</h2>
            <p>
              The Site and its content are provided "as is" and "as available." We make no warranties, express or implied, regarding accuracy, completeness, reliability, or availability. Opinions expressed on the Site are those of the authors and do not necessarily reflect any official position.
            </p>
          </section>

          <section>
            <h2>8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, The Contrarian Project shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of or inability to use the Site, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2>9. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless The Contrarian Project from any claims, liabilities, damages, or expenses arising out of your use of the Site, your violation of these Terms, or your violation of any rights of another party.
            </p>
          </section>

          <section>
            <h2>10. Termination</h2>
            <p>
              We may suspend or terminate access to the Site at any time, without notice, for conduct that we believe violates these Terms or is otherwise harmful to the Site or others.
            </p>
          </section>

          <section>
            <h2>11. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. The "Last Updated" date will reflect changes. Continued use of the Site after updates constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2>12. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the United States and the State of New Jersey, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2>13. Contact Information</h2>
            <p>For questions about these Terms, contact:</p>
            <p className="mt-4">
              <strong>Email:</strong> <a href="mailto:robertchoi@thecontrarian.info" className="text-black underline">robertchoi@thecontrarian.info</a>
            </p>
          </section>
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
