import Funnel from './components/Funnel';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Header */}
      <header className="py-6 px-4 border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <span className="font-bold text-xl text-gray-900">Mobile Home Finder</span>
          </div>
          <a
            href="tel:1-800-555-HOME"
            className="text-sm text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="hidden sm:inline">1-800-555-HOME</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 md:py-12">
        <Funnel />
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-100 mt-auto">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            Find your perfect mobile home today
          </p>
          <div className="flex justify-center gap-4 mt-4 text-xs text-gray-400">
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
            <span>|</span>
            <a href="#" className="hover:text-emerald-600 transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
