import Funnel from './components/Funnel';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header - Clayton-style clean nav */}
      <header className="py-4 px-4 bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="https://www.reliablehomesofsealy.com" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            {/* Clayton-style logo mark */}
            <div className="w-12 h-12 bg-[var(--brand-blue)] flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-[var(--foreground)] leading-tight tracking-tight">RELIABLE HOMES</span>
              <span className="text-xs text-[var(--text-body)] uppercase tracking-wider">of Sealy, Texas</span>
            </div>
          </a>
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
      <main className="flex-grow px-4 py-10 md:py-16 bg-gradient-to-b from-white to-[var(--brand-blue-light)]">
        <Funnel />
      </main>

      {/* Footer - Clayton-style dark footer */}
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
              © {new Date().getFullYear()} Reliable Homes of Sealy. All rights reserved.
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
