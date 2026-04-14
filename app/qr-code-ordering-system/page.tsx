import { Metadata } from 'next';
import Link from 'next/link';
import PublicHeader from '@/components/PublicHeader';
import PublicFooter from '@/components/PublicFooter';

export const metadata: Metadata = {
  title: 'QR Code Ordering System | Aerobill',
  description: 'Allow customers to order interactively from their phones.'
};

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 flex flex-col">
      <PublicHeader />
      <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-12 px-4">
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">QR Code Ordering System</h1>
            <p className="text-xl text-gray-400 mb-8">Allow customers to order interactively from their phones.</p>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 mb-8">
              <span className="text-5xl mb-4 block">🚀</span>
              <h2 className="text-2xl font-semibold text-white mb-2">Page Under Construction</h2>
              <p className="text-gray-400">We are currently building this premium feature page. Check back soon for full details.</p>
            </div>
            <Link href="/restaurant-pos-software-india" className="text-[#ff6b35] hover:text-[#ff8c5a] font-medium flex items-center justify-center gap-2">
              &larr; Back to Overview
            </Link>
          </div>
      </div>
      <PublicFooter />
    </div>
  );
}
