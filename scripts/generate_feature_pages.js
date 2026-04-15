const fs = require('fs');
const path = require('path');

const generateContent = (data) => `import { Metadata } from "next"
import Link from "next/link"
import PublicHeader from "@/components/PublicHeader"
import PublicFooter from "@/components/PublicFooter"

export const metadata: Metadata = {
    title: "${data.title} | Aerobill",
    description: "${data.description}",
}

export default function Page() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
            <PublicHeader />
            <div className="pt-24 pb-12 max-w-6xl mx-auto px-4">
                {/* Breadcrumb */}
                <div className="flex items-center text-sm text-gray-500 mb-8 border-b border-white/10 pb-4">
                    <Link href="/" className="hover:text-white transition flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        Home
                    </Link>
                    <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    <Link href="/restaurant-pos-software-india" className="hover:text-white transition">Restaurant POS</Link>
                    <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    <span className="text-gray-300">${data.shortName}</span>
                </div>

                {/* Hero Section */}
                <div className="py-12 border-b border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6b35]/5 rounded-full blur-3xl -z-10 mix-blend-screen" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl -z-10 mix-blend-screen" />

                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        ${data.heroHeading1} <span className="text-[#ff6b35]">${data.heroHeading2}</span>
                    </h1>
                    <div className="space-y-4 text-lg md:text-xl text-gray-400 max-w-4xl">
                        <p>${data.heroSub}</p>
                    </div>
                </div>

                {/* Main Content Sections */}
                <div className="py-12 space-y-20">
                    {/* What is */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">What is ${data.shortName}?</h2>
                            <p className="text-gray-400 mb-4 text-lg leading-relaxed">
                                ${data.whatIs1}
                            </p>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                ${data.whatIs2}
                            </p>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-2xl">🚀</span> Key Features
                            </h3>
                            <ul className="space-y-4">
                                ${data.features.map(f => `
                                <li className="flex items-start gap-3 text-gray-300">
                                    <svg className="w-6 h-6 text-[#ff6b35] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <div>
                                        <strong className="text-white block mb-0.5">${f.title}</strong>
                                        <span className="text-sm text-gray-400">${f.desc}</span>
                                    </div>
                                </li>`).join('')}
                            </ul>
                        </div>
                    </div>

                    {/* Benefits & Why Choose */}
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                                <span className="text-3xl">📈</span> Key Benefits
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                ${data.benefits.map(b => `
                                <div className="bg-gradient-to-br from-white/5 to-transparent p-4 rounded-xl border border-white/5">
                                    <p className="text-gray-300 font-medium">${b}</p>
                                </div>`).join('')}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="text-3xl">💡</span> Why Choose Aerobill?
                            </h2>
                            <p className="text-gray-400 mb-6">Aerobill provides an integrated, robust solution specifically tuned for Indian food businesses.</p>
                            <ul className="space-y-3 mb-6">
                                ${data.whyAerobill.map(w => `
                                <li className="flex items-center gap-3 text-gray-300">
                                    <svg className="w-5 h-5 text-[#10b981] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    ${w}
                                </li>`).join('')}
                            </ul>
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="border-t border-white/10 pt-16">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            ${data.faqs.map(faq => `
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
                                <h3 className="text-lg font-bold text-white mb-2">${faq.q}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">${faq.a}</p>
                            </div>`).join('')}
                        </div>
                    </div>
                    
                    {/* CTA */}
                    <div className="text-center pt-8 border-t border-white/10">
                        <h2 className="text-3xl font-bold text-white mb-6">Ready to upgrade your restaurant?</h2>
                        <Link href="/contact" className="inline-block bg-[#ff6b35] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#ff8c5a] transition shadow-lg shadow-[#ff6b35]/20">
                            Book a Free Demo
                        </Link>
                    </div>
                </div>
            </div>

            {/* Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            ${data.faqs.map(faq => `{
                                "@type": "Question",
                                "name": "${faq.q}",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "${faq.a}"
                                }
                            }`).join(',')}
                        ]
                    })
                }}
            />
            <PublicFooter />
        </div>
    )
}
`;

const pages = [
  {
    slug: 'restaurant-billing-software',
    title: 'Restaurant Billing Software',
    description: 'Fast, customized billing solutions for your restaurant with complete GST compliance and multi-payment support.',
    shortName: 'Billing Software',
    heroHeading1: 'Smart Restaurant',
    heroHeading2: 'Billing Software',
    heroSub: 'Process orders faster, eliminate calculation errors, and give your customers a seamless checkout experience with India’s most robust restaurant billing platform.',
    whatIs1: 'Restaurant billing software automates your checkout process, ensuring accuracy in pricing, automatic tax deductions (GST), and simplified split payments.',
    whatIs2: 'Aerobill billing software is designed for raw speed, capable of handling rapid QSR checkouts while robust enough for complex fine-dining settlements.',
    features: [
      { title: 'Lightning Fast Checkouts', desc: 'Process bills in under 3 seconds.' },
      { title: 'GST Compliance', desc: 'Auto-apply the right SGST/CGST instantly.' },
      { title: 'Split Payments', desc: 'Accept split Cash, Card, and UPI on one bill.' },
      { title: 'Offline Mode', desc: 'Internet down? Keep billing seamlessly.' }
    ],
    benefits: ['Reduce customer wait time by 60%', '100% Tax calculation accuracy', 'Minimize revenue leakage', 'Easy daily settlement reports'],
    whyAerobill: ['Intuitive touch interface without deep training', 'Direct integration with KOT and Inventory', '24/7 localized support'],
    faqs: [
      { q: 'Does it work offline?', a: 'Yes, offline mode keeps your billing intact. It syncs to the cloud automatically once the internet restores.' },
      { q: 'Is it GST ready?', a: 'Absolutely. It is fully compliant with Indian GST laws to help you generate accurate invoices.' },
      { q: 'Can I add a service charge?', a: 'Yes, service charges, packing fees, and custom discounts can be auto-applied or manually triggered.' },
      { q: 'What hardware do I need?', a: 'It works on any standard PC, laptop, or modern POS terminal via our web platform.' }
    ]
  },
  {
    slug: 'inventory-management-software',
    title: 'Restaurant Inventory Management Software',
    description: 'Track your food stock, manage recipes, and reduce kitchen waste automatically with advanced inventory tracking.',
    shortName: 'Inventory Management',
    heroHeading1: 'Intelligent Inventory &',
    heroHeading2: 'Stock Control',
    heroSub: 'Never run out of key ingredients during a rush. Track stock levels automatically based on item sales, and drastically reduce food wastage and pilferage.',
    whatIs1: 'Inventory management gives you real-time visibility into your raw materials, ingredients, and packaged goods right from your dashboard.',
    whatIs2: 'By directly linking your sales to your ingredient usage (recipe mapping), Aerobill automatically deducts stock as soon as a dish is sold.',
    features: [
      { title: 'Real-time Tracking', desc: 'Know exactly what’s in stock dynamically.' },
      { title: 'Low Stock Alerts', desc: 'Get SMS/Email alerts before items run out.' },
      { title: 'Recipe Mapping', desc: 'Link ingredients to menu items for auto-deduction.' },
      { title: 'Vendor Management', desc: 'Send automated Purchase Orders directly.' }
    ],
    benefits: ['Lower food costs by up to 15%', 'Eliminate ingredient theft and pilferage', 'Never 86 (run out of) popular dishes', 'Streamlined vendor ordering'],
    whyAerobill: ['Highly precise multi-unit conversions (kg to grams)', 'Detailed variance reports between physical and digital stock', 'Easy cloud access for owners'],
    faqs: [
      { q: 'Does it handle recipe variations?', a: 'Yes, you can map multiple ingredients per variant (e.g. Large vs Regular pizza).' },
      { q: 'How do I add physical stock counts?', a: 'You can easily perform physical audits and enter the data for an auto-generated variance report.' },
      { q: 'Can I manage centralized kitchen inventory?', a: 'Yes, it supports multi-outlet inventory transfers from your central base kitchen.' },
      { q: 'Will it track wastage?', a: 'Yes, staff can log spoiled/wasted items to keep stock records completely accurate.' }
    ]
  },
  {
    slug: 'qr-code-ordering-system',
    title: 'QR Code Ordering System',
    description: 'Allow customers to view digital menus, select addons, and pay interactively straight from their mobile phones without waiting.',
    shortName: 'QR Code Ordering',
    heroHeading1: 'Touchless QR Code',
    heroHeading2: 'Menu & Ordering',
    heroSub: 'Turn tables 25% faster and elevate the diner experience with secure, contactless digital menus and instant table-side ordering.',
    whatIs1: 'QR Code Ordering bridges the gap between your customers and the kitchen. Customers simply scan a code placed on their table to open an interactive digital menu.',
    whatIs2: 'They can independently select their dishes, specify instructions, and even pay the bill without having to flag down a busy waiter.',
    features: [
      { title: 'Interactive Menus', desc: 'Show mouth-watering food photos.' },
      { title: 'Direct Order to KOT', desc: 'Orders bypass waiters directly to kitchen.' },
      { title: 'Dynamic Pricing', desc: 'Update prices and items in 1 click, instantly.' },
      { title: 'Table Payments', desc: 'Customers can pay via UPI securely on their phone.' }
    ],
    benefits: ['Increase average order value via upselling prompts', 'Save massive costs on printing physical menus', 'Significantly lower dependency on floor staff', 'Collect valuable customer data'],
    whyAerobill: ['No app download required for diners', 'Integrated directly into the main Aerobill POS', 'Beautiful menu aesthetics to boost appetite'],
    faqs: [
      { q: 'Do diners need to install an app?', a: 'No, they just scan the QR code with their standard smartphone camera.' },
      { q: 'Can waiters still take orders?', a: 'Absolutely, it operates in perfect sync with waiter-taken orders. Both will merge into the same table bill.' },
      { q: 'Can I hide out-of-stock items?', a: 'Yes, mark an item out of stock on your POS, and it immediately vanishes from the QR menu.' },
      { q: 'Does it support payment gateways?', a: 'Yes, leading Indian payment gateways are natively supported.' }
    ]
  },
  {
    slug: 'kot-system',
    title: 'Digital KOT System',
    description: 'Send orders to the kitchen instantly without manual errors. Perfect synchronization between front-desk and back-house.',
    shortName: 'KOT System',
    heroHeading1: 'Digital KOT Printing &',
    heroHeading2: 'Management',
    heroSub: 'Ensure flawless communication between the front desk, waiters, and the kitchen with automated Kitchen Order Tickets.',
    whatIs1: 'Kitchen Order Tickets (KOT) are the communication lifeline of any busy restaurant. Aerobill digitizes and automates this flow entirely.',
    whatIs2: 'When an order is punched in, digital receipts are immediately sent to the respective kitchen stations (e.g. Bar, Grill, Pantry) instantly.',
    features: [
      { title: 'Auto-Routing', desc: 'Send cocktails to the bar, and food to the kitchen.' },
      { title: 'Detailed Modifiers', desc: 'Clearly print \'No Onion, Extra Spicy\'.' },
      { title: 'KOT Merging', desc: 'Merge tickets efficiently during high rush.' },
      { title: 'Void Tracking', desc: 'Log cancelled tickets to prevent fraud.' }
    ],
    benefits: ['Virtually zero miscommunication errors', 'Faster prep times', 'Clearer kitchen workflows', 'Accountability for every voided item'],
    whyAerobill: ['Supports unlimited kitchen printers', 'Deep integration across multiple network topologies', 'Easy re-printing capabilities from the POS'],
    faqs: [
      { q: 'Can I route items to different printers?', a: 'Yes, define routing rules per category. Beverages go to Printer A, Main Course to Printer B.' },
      { q: 'What happens if a printed order is cancelled?', a: 'A red "Void KOT" will immediately print to alert chefs to stop prep.' },
      { q: 'Is a LAN connection necessary?', a: 'For thermal kitchen printers, a stable local network (LAN) is highly recommended for reliability.' },
      { q: 'Can I customize the KOT layout?', a: 'Yes, header, table size, waiter name, and font sizes are highly customizable.' }
    ]
  },
  {
    slug: 'table-management-system',
    title: 'Table Management System',
    description: 'Optimize seating, track turning times visually, and maximize walk-in guests with intuitive digital floor mapping.',
    shortName: 'Table Management',
    heroHeading1: 'Visual Table',
    heroHeading2: 'Optimization Software',
    heroSub: 'Map your floor digitally. Track occupied, reserved, and open tables to seat more guests per shift with zero confusion.',
    whatIs1: 'Aerobill Table Management allows your front-of-house staff to visualize your entire restaurant floor layout directly on a screen.',
    whatIs2: 'It helps track wait times, reserve specific tables for incoming VIPs, and ensures waiters know exactly which tables require immediate attention.',
    features: [
      { title: 'Custom Floor Mapping', desc: 'Drag and drop tables to match your real layout.' },
      { title: 'Status Indicators', desc: 'Color coding for Open, Occupied, and Billed.' },
      { title: 'Reservation Log', desc: 'Accept and allocate table bookings natively.' },
      { title: 'Time Tracking', desc: 'Alerts if a table is waiting too long for food.' }
    ],
    benefits: ['Reduce host-stand chaos', 'Turn tables 20% faster', 'Smoother reservations mapping', 'Better waiter zone assignments'],
    whyAerobill: ['Supports multiple floors (Ground, Rooftop)', 'Visual feedback cuts down verbal communication', 'Works perfectly on Hoststand tablets'],
    faqs: [
      { q: 'Can I have multiple dining areas?', a: 'Yes, you can create limitless zones such as AC Room, Non-AC, and Patio.' },
      { q: 'Does it link to the billing system?', a: 'When a bill is settled on the POS, the table automatically turns green (Empty) on the floor map.' },
      { q: 'Can we merge tables for large groups?', a: 'Yes. Simply drag and link tables together natively in the software for large groups.' },
      { q: 'Is it easy to change the layout later?', a: 'Absolutely, you can enter Edit Mode anytime to drag furniture around as needed.' }
    ]
  },
  {
    slug: 'kitchen-display-system',
    title: 'Kitchen Display System (KDS)',
    description: 'Replace paper tickets with smart digital screens to coordinate fast-paced food preparation.',
    shortName: 'Kitchen Display System',
    heroHeading1: 'Digital Kitchen',
    heroHeading2: 'Display Systems',
    heroSub: 'Modernize your kitchen workflows. Toss the paper tickets, cut the chaos, and serve food at maximum efficiency.',
    whatIs1: 'A Kitchen Display System (KDS) replaces traditional paper printers with digital screens mounted directly at prep stations.',
    whatIs2: 'Orders pop up on the KDS instantly, with color-coding to indicate rush orders or long wait times, allowing chefs to manage their queues perfectly.',
    features: [
      { title: 'Digital Order Queue', desc: 'Clear, prioritized ticket boards on screen.' },
      { title: 'Course Management', desc: 'Fire appetizers first, main courses later.' },
      { title: 'Food Ready Ping', desc: 'Chef taps screen to instantly alert waiters.' },
      { title: 'Prep Time Analytics', desc: 'Measure your kitchen’s actual speed historically.' }
    ],
    benefits: ['Never lose a paper ticket again', 'Massively lower food prep delays', 'Coordinate massive multi-course meals flawlessly', 'Create a quieter, cleaner kitchen'],
    whyAerobill: ['Web-optimized so it works on affordable Android tablets', 'Instant near-realtime syncing', 'Bump bar hardware support'],
    faqs: [
      { q: 'Can I use iPads for this?', a: 'Yes! Our KDS runs through a modern browser, meaning iPads, Android tablets, and smart TVs work perfectly.' },
      { q: 'Can it summarize items?', a: 'Yes, it can group identical items (e.g. 5x Burgers total) across multiple orders to speed up prep.' },
      { q: 'Does it ring a bell?', a: 'You can enable sound notifications for when new critical orders arrive on the board.' },
      { q: 'Is it completely synced with QR ordering?', a: 'Yes, customer phone orders appear directly on the KDS instantly.' }
    ]
  },
  {
    slug: 'restaurant-analytics-reporting',
    title: 'Restaurant Analytics & Reporting',
    description: 'Understand your growth with clear, actionable insights into sales, items, and team performance.',
    shortName: 'Analytics & Reporting',
    heroHeading1: 'Powerful Restaurant',
    heroHeading2: 'Analytics',
    heroSub: 'Turn raw numbers into actionable insights. Understand what sells, who buys, and how to increase your profit margins sustainably.',
    whatIs1: 'Aerobill Analytics crunches millions of data points from your POS daily to present beautiful, easy-to-read charts and reports.',
    whatIs2: 'As a restaurant owner, knowing your peak hours, best-selling dishes, and staff efficiency is the key to scaling your operations reliably.',
    features: [
      { title: 'Real-time Dashboard', desc: 'Watch your sales grow live, from anywhere.' },
      { title: 'Item Performance', desc: 'Identify your true profit-makers (Menu Engineering).' },
      { title: 'Shift Reports', desc: 'End-of-day balances and cash drawer tracking.' },
      { title: 'Cloud Exports', desc: 'Download CSVs for accounting instantly.' }
    ],
    benefits: ['Identify dead-stock quickly', 'Optimize staff schedules based on heatmaps', 'Data-backed menu engineering', 'Access your data on vacation via mobile'],
    whyAerobill: ['Zero manual calculation required', 'Tax reports pre-formatted for Indian accounting', 'Bird\'s eye view for multi-outlet owners'],
    faqs: [
      { q: 'Can I check reports on my phone?', a: 'Yes, the analytics dashboard is fully mobile-responsive for owners on the go.' },
      { q: 'Can I limit staff access to reports?', a: 'Absolutely, robust Role-Based Access Control means only Admins see financial analytics.' },
      { q: 'Are taxes factored into reports?', a: 'Sales figures can be toggled to show inclusive or exclusive of GST for clear metric tracking.' },
      { q: 'How far back is data stored?', a: 'Your data is securely stored on Aerobill cloud for the lifetime of your subscription.' }
    ]
  },
  {
    slug: 'cloud-kitchen-management-software',
    title: 'Cloud Kitchen Management Software',
    description: 'Unified dashboard for all aggregator orders from Swiggy, Zomato, and direct channels.',
    shortName: 'Cloud Kitchen Software',
    heroHeading1: 'Unified Cloud Kitchen',
    heroHeading2: 'System',
    heroSub: 'Built specifically for multi-brand dark kitchens. Sync Swiggy, Zomato, and direct orders into a single, powerful tablet.',
    whatIs1: 'Cloud Kitchens (Dark Kitchens) suffer from "tablet hell" — juggling 5 different devices for different delivery aggregators.',
    whatIs2: 'Aerobill unifies all aggregator orders into one central POS. You manage one menu centrally, and it syncs outwardly, saving immense time.',
    features: [
      { title: 'Aggregator Integration', desc: 'Direct Swiggy & Zomato sync.' },
      { title: 'Multi-Brand Routing', desc: 'Run 10 virtual brands from 1 unified screen.' },
      { title: 'Centralized Menu Management', desc: 'Update prices on POS, changes reflect everywhere.' },
      { title: 'Rider Tracking', desc: 'Monitor dispatching and delivery partners.' }
    ],
    benefits: ['Ridiculously fast order acceptance', 'Never manually punch a Zomato order into POS again', 'Consolidated inventory deductions', 'Zero tablet clutter'],
    whyAerobill: ['Deep integration minimizes API failures', 'Designed for high volume order velocity', 'Native KDS integration out of the box'],
    faqs: [
      { q: 'Do I still need the Swiggy tablet?', a: 'You can largely bypass it. Orders fall directly into Aerobill and auto-accept if configured.' },
      { q: 'Does it support multiple brands?', a: 'Yes, you can manage unlimited virtual brands mapping to the same physical kitchen inventory.' },
      { q: 'What happens if an aggregator drops offline?', a: 'Aerobill acts independently; any API downtime from aggregators is cleanly flagged while internal systems stay up.' },
      { q: 'Can I manage pricing separately per aggregator?', a: 'Yes, define specific price multipliers or menus natively tailored for specific apps.' }
    ]
  }
];

pages.forEach(page => {
  const dirPath = path.join(__dirname, 'app', page.slug);
  const filePath = path.join(dirPath, 'page.tsx');
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const content = generateContent(page);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Created:', page.slug);
});
