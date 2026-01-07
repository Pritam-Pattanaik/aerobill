import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e] -z-10" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-[#ff6b35]/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-[#ff8c5a]/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Hero content */}
      <div className="glass-card p-12 max-w-2xl text-center animate-fadeIn">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] bg-clip-text text-transparent">
            Aerobill
          </h1>
          <p className="text-xl text-gray-400">
            Restaurant Management System
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-gray-300">
            Streamline your restaurant operations with digital ordering,
            real-time kitchen display, and efficient billing.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/login"
            className="btn-primary text-center block"
          >
            Staff Login
          </Link>
          <Link
            href="/table/1"
            className="btn-secondary text-center block"
          >
            Demo: Table 1 Menu
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-500">
            For restaurant staff and administrators
          </p>
          <div className="flex justify-center gap-4 mt-4 text-sm">
            <span className="text-gray-400">🍳 Kitchen Display</span>
            <span className="text-gray-400">📱 QR Ordering</span>
            <span className="text-gray-400">🧾 Smart Billing</span>
          </div>
        </div>
      </div>
    </main>
  );
}
