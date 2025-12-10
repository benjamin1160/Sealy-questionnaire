import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Reliable Homes of Sealy",
  description: "Terms of Service for Reliable Homes of Sealy - Review the terms and conditions for using our website and services.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="py-4 px-4 bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-12 h-12 bg-[var(--brand-blue)] flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-[var(--foreground)] leading-tight tracking-tight">RELIABLE HOMES</span>
              <span className="text-xs text-[var(--text-body)] uppercase tracking-wider">of Sealy, Texas</span>
            </div>
          </Link>
          <a
            href="tel:9798856767"
            className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-blue)] text-white text-sm font-semibold uppercase tracking-wide hover:bg-[var(--brand-blue-hover)] transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <span className="hidden sm:inline">(979) 885-6767</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 py-10 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-8">Terms of Service</h1>

          <p className="text-[var(--text-body)] mb-6">
            <strong>Effective Date:</strong> January 1, 2024
          </p>

          <p className="text-[var(--text-body)] mb-8">
            Welcome to Reliable Homes of Sealy. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully before using our services.
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Acceptance of Terms</h2>
            <p className="text-[var(--text-body)]">
              By accessing and using this website, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our website or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Use of Website</h2>
            <p className="text-[var(--text-body)] mb-4">You agree to use this website only for lawful purposes and in a way that does not:</p>
            <ul className="list-disc list-inside text-[var(--text-body)] space-y-2 ml-4">
              <li>Infringe the rights of others or restrict their use of the website</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Transmit harmful, offensive, or unlawful content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper operation of the website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Information Accuracy</h2>
            <p className="text-[var(--text-body)]">
              While we strive to provide accurate and up-to-date information about our manufactured homes and services, we do not warrant that all information on this website is complete, accurate, or current. Home prices, availability, specifications, and features are subject to change without notice. Please contact us directly to verify current information before making any purchasing decisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">No Contractual Obligation</h2>
            <p className="text-[var(--text-body)]">
              Information provided through our website, including our questionnaire and inquiry forms, does not constitute a binding offer or contract. Any home purchase will be subject to a separate written agreement with specific terms and conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Communications</h2>
            <p className="text-[var(--text-body)]">
              By providing your contact information through our website, you consent to receive communications from us regarding your inquiry, including phone calls, text messages, and emails. You may opt out of marketing communications at any time by contacting us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Intellectual Property</h2>
            <p className="text-[var(--text-body)]">
              All content on this website, including text, images, logos, and design elements, is the property of Reliable Homes of Sealy or its licensors and is protected by copyright and trademark laws. You may not reproduce, distribute, or use any content without our written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Third-Party Links</h2>
            <p className="text-[var(--text-body)]">
              Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of use of these external sites. Accessing third-party links is at your own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Limitation of Liability</h2>
            <p className="text-[var(--text-body)]">
              To the fullest extent permitted by law, Reliable Homes of Sealy shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or our services. Our total liability shall not exceed the amount you paid for any services, if applicable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Disclaimer of Warranties</h2>
            <p className="text-[var(--text-body)]">
              This website and its content are provided &quot;as is&quot; without warranties of any kind, either express or implied. We do not guarantee that the website will be uninterrupted, error-free, or free of viruses or other harmful components.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Governing Law</h2>
            <p className="text-[var(--text-body)]">
              These Terms of Service shall be governed by and construed in accordance with the laws of the State of Texas, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts of Austin County, Texas.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Changes to Terms</h2>
            <p className="text-[var(--text-body)]">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this website. Your continued use of the website after any changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Contact Us</h2>
            <p className="text-[var(--text-body)] mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="text-[var(--text-body)]">
              <p><strong>Reliable Homes of Sealy</strong></p>
              <p>390 Gebhardt Rd</p>
              <p>Sealy, TX 77474</p>
              <p>Phone: <a href="tel:9798856767" className="text-[var(--brand-blue)] hover:underline">(979) 885-6767</a></p>
            </div>
          </section>

          <div className="mt-10 pt-6 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--brand-blue)] hover:underline font-semibold"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 px-4 bg-[var(--footer-dark)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Reliable Homes of Sealy</h3>
              <p className="text-gray-400 text-sm">Your Trusted Mobile Home Dealer in Texas</p>
              <p className="text-gray-500 text-xs mt-2">
                390 Gebhardt Rd, Sealy, TX 77474
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <a
                href="tel:9798856767"
                className="inline-flex items-center gap-2 px-5 py-2 border border-[var(--brand-blue)] text-[var(--brand-blue)] text-sm font-semibold uppercase tracking-wide hover:bg-[var(--brand-blue)] hover:text-white transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                (979) 885-6767
              </a>
              <a
                href="https://www.reliablehomesofsealy.com"
                className="inline-flex items-center gap-2 px-5 py-2 bg-[var(--brand-blue)] text-white text-sm font-semibold uppercase tracking-wide hover:bg-[var(--brand-blue-hover)] transition-all duration-300"
              >
                Visit Our Website
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} Reliable Homes of Sealy. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-gray-500">
              <Link href="/privacy-policy" className="hover:text-[var(--brand-blue)] transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-[var(--brand-blue)] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
