import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';

export function PrivacyPolicyPage() {
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
        <h1 className="mb-8">Privacy Policy for The Contrarian Project</h1>
        
        <p className="text-gray-600 mb-12">Last Updated: December 26, 2025</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <p>
            This Privacy Policy describes how The Contrarian Project ("we," "us," or "our") collects, uses, discloses, and protects information from visitors ("you" or "Users") when you access and use our website at https://thecontrarian.info and any affiliated services (collectively, the "Site"). By using the Site, you agree to this Privacy Policy.
          </p>

          <section>
            <h2>1. Information We Collect</h2>
            <p>We collect information you voluntarily provide and information collected automatically.</p>
            
            <h3 className="mt-6">Information You Provide Directly</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email address, name, or other contact details when you subscribe to newsletters, submit comments, or contact us.</li>
              <li>Content you choose to submit or publish, such as commentary or feedback.</li>
            </ul>

            <h3 className="mt-6">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Usage data, including pages viewed, time spent on the Site, referring URLs, IP address, browser type, device information, and operating system.</li>
              <li>Data collected through cookies and similar technologies (such as pixels or local storage) used for analytics, performance measurement, and basic site functionality.</li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Operate, maintain, and improve the Site.</li>
              <li>Publish and distribute editorial and opinion content.</li>
              <li>Communicate with subscribers and respond to inquiries.</li>
              <li>Analyze Site usage and audience trends.</li>
              <li>Enforce our Terms of Use and protect the integrity and security of the Site.</li>
            </ul>
          </section>

          <section>
            <h2>3. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Enable basic Site functionality.</li>
              <li>Understand how readers engage with content.</li>
              <li>Measure traffic and performance.</li>
            </ul>
            <p className="mt-4">
              You can control or disable cookies through your browser settings. Disabling cookies may affect certain features or functionality of the Site.
            </p>
          </section>

          <section>
            <h2>4. Sharing of Information</h2>
            <p>We may share information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With service providers who assist with hosting, analytics, email distribution, or Site operations.</li>
              <li>If required by law, legal process, or governmental request.</li>
              <li>To protect the rights, safety, or property of The Contrarian Project or others.</li>
            </ul>
            <p className="mt-4">We do not sell personal information for monetary consideration.</p>
          </section>

          <section>
            <h2>5. Third-Party Links and Services</h2>
            <p>
              The Site may contain links to third-party websites or embedded content. We are not responsible for the privacy practices, content, or policies of third-party sites. Your interactions with those sites are governed by their own privacy policies.
            </p>
          </section>

          <section>
            <h2>6. Children's Privacy</h2>
            <p>
              The Site is intended for a general audience and is not directed to children under 16. We do not knowingly collect personal information from children under 16. If such information is identified, it will be deleted.
            </p>
          </section>

          <section>
            <h2>7. Your Rights and Choices</h2>
            <p>
              Depending on applicable law, you may have the right to access, correct, or request deletion of personal information we hold about you. You may unsubscribe from newsletters or communications at any time using the instructions provided in those communications.
            </p>
          </section>

          <section>
            <h2>8. Data Retention and Security</h2>
            <p>
              We retain personal information only as long as necessary for the purposes described in this Policy or as required by law. We use reasonable administrative and technical measures to protect information, but no method of transmission or storage is completely secure.
            </p>
          </section>

          <section>
            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Any changes will be reflected by an updated "Last Updated" date. Continued use of the Site after changes are posted constitutes acceptance of the revised Policy.
            </p>
          </section>

          <section>
            <h2>10. Contact Information</h2>
            <p>For questions about this Privacy Policy or our data practices, contact:</p>
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
