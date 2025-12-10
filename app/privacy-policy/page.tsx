import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Reliable Homes of Sealy",
  description: "Privacy Policy for Reliable Homes of Sealy - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-8">Privacy Policy</h1>

          <p className="text-[var(--text-body)] mb-6">
            <strong>Effective Date:</strong> January 1, 2024
          </p>

          <p className="text-[var(--text-body)] mb-8">
            Reliable Homes of Sealy (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Information We Collect</h2>
            <p className="text-[var(--text-body)] mb-4">We may collect the following types of information:</p>
            <ul className="list-disc list-inside text-[var(--text-body)] space-y-2 ml-4">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and mailing address that you provide when filling out forms or contacting us.</li>
              <li><strong>Inquiry Information:</strong> Details about the type of home you&apos;re looking for, your timeline, budget preferences, and land ownership status.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and referring websites.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, and device identifiers.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">How We Use Your Information</h2>
            <p className="text-[var(--text-body)] mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-[var(--text-body)] space-y-2 ml-4">
              <li>Respond to your inquiries and provide customer service</li>
              <li>Match you with manufactured homes that fit your needs and preferences</li>
              <li>Contact you about products, services, and promotions that may interest you</li>
              <li>Improve our website and services</li>
              <li>Process transactions and send related information</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Information Sharing</h2>
            <p className="text-[var(--text-body)] mb-4">We may share your information with:</p>
            <ul className="list-disc list-inside text-[var(--text-body)] space-y-2 ml-4">
              <li><strong>Service Providers:</strong> Third parties who help us operate our business, such as CRM systems and marketing platforms.</li>
              <li><strong>Financing Partners:</strong> With your consent, we may share information with lenders to help you obtain financing for your home purchase.</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety.</li>
            </ul>
            <p className="text-[var(--text-body)] mt-4">
              We do not sell your personal information to third parties for their marketing purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Data Security</h2>
            <p className="text-[var(--text-body)]">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Your Rights and Choices</h2>
            <p className="text-[var(--text-body)] mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-[var(--text-body)] space-y-2 ml-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p className="text-[var(--text-body)] mt-4">
              To exercise these rights, please contact us using the information below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Cookies and Tracking</h2>
            <p className="text-[var(--text-body)]">
              Our website may use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Changes to This Policy</h2>
            <p className="text-[var(--text-body)]">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Contact Us</h2>
            <p className="text-[var(--text-body)] mb-4">
              If you have questions about this Privacy Policy or our privacy practices, please contact us:
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
