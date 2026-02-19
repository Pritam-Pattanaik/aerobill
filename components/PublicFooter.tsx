import Link from "next/link"

export default function PublicFooter() {
    return (
        <footer className="py-8 px-4 border-t border-white/10 bg-[#0a0a0a]">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-gray-400 text-sm">
                    © {new Date().getFullYear()} Aerobill by{" "}
                    <a href="https://www.assetmagnets.com/" target="_blank" rel="noopener noreferrer" className="text-[#ff6b35] hover:underline">
                        ASSETMAGNETS
                    </a>
                    . All rights reserved.
                </div>
                <div className="flex gap-6 text-gray-400 text-sm flex-wrap justify-center">
                    <Link href="/" className="hover:text-white transition">Home</Link>
                    <Link href="/about" className="hover:text-white transition">About</Link>
                    <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
                    <Link href="/blog" className="hover:text-white transition">Blog</Link>
                    <Link href="/contact" className="hover:text-white transition">Contact</Link>
                    <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    )
}
