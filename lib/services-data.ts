export type ServiceFeature = {
  title: string;
  description: string;
  icon: string;
};

export type ServiceFAQ = {
  question: string;
  answer: string;
};

export type ServiceData = {
  slug: string;
  name: string;
  title: string;
  description: string;
  heroHeading: string;
  heroSubheading: string;
  features: ServiceFeature[];
  benefits: string[];
  faqs: ServiceFAQ[];
};

export const servicesData: ServiceData[] = [
  {
    slug: 'restaurant-pos-software',
    name: 'Restaurant POS Software',
    title: 'Advanced Restaurant POS Software in India | Aerobill',
    description: 'Streamline your operations with our cloud-based Restaurant POS software. Fast billing, table management, and real-time tracking for restaurants of all sizes.',
    heroHeading: 'Modern Restaurant POS Software for Fast Operations',
    heroSubheading: 'Replace your outdated till with Aerobill’s smart POS system. Handle orders, payments, and dining operations flawlessly.',
    features: [
      { title: 'Lightning-Fast Interface', description: 'Take orders in seconds, even during peak hours, reducing wait times.', icon: '⚡' },
      { title: 'Offline Mode Support', description: 'Keep billing even without internet; data syncs automatically when online.', icon: '📶' },
      { title: 'Order Management', description: 'Send orders to kitchen directly with automated KOT generation.', icon: '🧾' },
    ],
    benefits: [
      'Reduce customer wait times by up to 40%',
      'Eliminate manual errors in orders and billing',
      'Train staff easily with an intuitive UI',
    ],
    faqs: [
      { question: 'What hardware do I need for this POS?', answer: 'Aerobill works on any device with a browser: tablets, laptops, phones, or dedicated POS terminals.' },
      { question: 'Can I split bills?', answer: 'Yes, our POS allows easy bill splitting by item, person, or custom amount.' },
    ]
  },
  {
    slug: 'restaurant-billing-software',
    name: 'Restaurant Billing Software',
    title: 'Smart Restaurant Billing Software | Fast & GST Compliant',
    description: 'Ensure accurate and rapid invoicing with Aerobill restaurant billing software. Perfect for fine dine, QSRs, and cafes in India.',
    heroHeading: 'Simplify Invoicing with Smart Restaurant Billing Software',
    heroSubheading: 'Generate bills, apply taxes effortlessly, and give your customers a seamless checkout experience.',
    features: [
      { title: 'One-Click Billing', description: 'Convert tables or KOTs into invoices instantly with accurate totals.', icon: '💵' },
      { title: 'Discount Management', description: 'Apply coupons, custom discounts, or loyalty points directly on the bill.', icon: '🏷️' },
      { title: 'Multi-Payment Support', description: 'Accept cash, card, UPI, and split payments on a single order.', icon: '💳' },
    ],
    benefits: [
      'Stop revenue leakage with accurate calculations',
      'Speed up your checkout counter',
      'Keep digital records of every transaction automatically',
    ],
    faqs: [
      { question: 'Does it support thermal printers?', answer: 'Yes! Our billing software connects directly to your thermal receipt printers via browser capabilities.' },
      { question: 'Can I email or SMS receipts?', answer: 'Absolutely. You can send digital receipts to your customers via WhatsApp, Email, or SMS.' },
    ]
  },
  {
    slug: 'qr-code-ordering-system',
    name: 'QR Code Ordering System',
    title: 'Contactless QR Code Ordering System for Restaurants',
    description: 'Let customers scan, browse your digital menu, and place orders directly from their tables. Boost upsells and save labor costs.',
    heroHeading: 'Transform Dining with QR Code Ordering System',
    heroSubheading: 'Offer a smooth, contactless dining experience while speeding up table turns and boosting check sizes.',
    features: [
      { title: 'Instant Menu Access', description: 'Customers scan the code placed on the table to access a rich digital menu instantly.', icon: '📱' },
      { title: 'Direct Table Ordering', description: 'Orders placed on their phone are sent directly to the kitchen and the POS.', icon: '🛎️' },
      { title: 'Digital Upselling', description: 'Automatically recommend add-ons or combos as they browse the menu.', icon: '📈' },
    ],
    benefits: [
      'Increase average order value with digital visuals',
      'Reduce the need for waitstaff during peak hours',
      'Update menus easily without reprint costs',
    ],
    faqs: [
      { question: 'Do customers need to download an app?', answer: 'No app download is required. It opens directly in their smartphone browser.' },
      { question: 'Can they pay through the QR menu?', answer: 'Yes, we integrate with payment gateways allowing them to settle the bill from their phone.' },
    ]
  },
  {
    slug: 'kitchen-display-system-kds',
    name: 'Kitchen Display System (KDS)',
    title: 'Digital Kitchen Display System (KDS) | Aerobill',
    description: 'Replace paper tickets with a smart KDS. Track cooking times, manage food prep, and increase kitchen efficiency.',
    heroHeading: 'Synchronize Your Kitchen with an Advanced Display System (KDS)',
    heroSubheading: 'Never lose a paper KOT again. Keep your chefs informed in real-time and improve food delivery times.',
    features: [
      { title: 'Real-Time Order Routing', description: 'Orders hit the kitchen screen instantly as they are punched in the POS or via QR.', icon: '🍳' },
      { title: 'Prep Time Tracking', description: 'Monitor how long tickets have been open, color-coded for urgency.', icon: '⏱️' },
      { title: 'Station Routing', description: 'Send specific items (e.g., drinks vs. grill) to different dedicated screens.', icon: '👨‍🍳' },
    ],
    benefits: [
      'Drastically reduce food preparation errors',
      'Improve communication between front and back of house',
      'Measure kitchen performance over time',
    ],
    faqs: [
      { question: 'What screens work with KDS?', answer: 'Any smart TV, tablet, or monitor connected to a basic computer or Android device.' },
      { question: 'Can we still print paper KOTs?', answer: 'Yes, the KDS works alongside traditional kitchen printers if you prefer a hybrid setup.' },
    ]
  },
  {
    slug: 'restaurant-inventory-management-software',
    name: 'Restaurant Inventory Management Software',
    title: 'Restaurant Inventory Management & Stock Software',
    description: 'Track raw materials automatically. Receive low stock alerts, manage suppliers, and control food costs effectively.',
    heroHeading: 'Take Control of Food Costs with Smart Inventory Management',
    heroSubheading: 'Automate your stock tracking. Know exactly what you have, what you need, and where you are losing money.',
    features: [
      { title: 'Recipe Management (BOM)', description: 'Map raw ingredients to menu items so stock deducts automatically upon a sale.', icon: '📋' },
      { title: 'Low Stock Alerts', description: 'Get notified via email or dashboard when critical items fall below par levels.', icon: '⚠️' },
      { title: 'Wastage Logging', description: 'Log spilled, burned, or expired items to keep your inventory perfectly accurate.', icon: '🗑️' },
    ],
    benefits: [
      'Prevent employee theft and internal wastage',
      'Never run out of high-selling items during rush hours',
      'Understand your true gross margins per dish',
    ],
    faqs: [
      { question: 'Does inventory update in real-time?', answer: 'Yes, the system deducts ingredient stock the moment an order is confirmed on the POS.' },
      { question: 'Can I manage multiple vendors?', answer: 'Absolutely. You can track purchase orders, pending vendor payments, and price variations.' },
    ]
  },
  {
    slug: 'restaurant-analytics-reporting-software',
    name: 'Restaurant Analytics & Reporting Software',
    title: 'Restaurant Analytics & Real-Time Reporting Software',
    description: 'Make data-driven decisions. Monitor sales, track top-selling items, and view employee performance through live dashboards.',
    heroHeading: 'Grow Your Business Using Deep Analytics & Reporting',
    heroSubheading: 'Access beautiful, easy-to-read dashboards that give you a 360-degree view of your restaurant’s health.',
    features: [
      { title: 'Live Sales Dashboard', description: 'Track your total sales, footfall, and discounts anywhere, anytime.', icon: '📊' },
      { title: 'Item Performance', description: 'Identify your bestsellers and dead stock to redesign your menu intelligently.', icon: '📈' },
      { title: 'Staff Analytics', description: 'Monitor waiter efficiency, tips generated, and order processing times.', icon: '👥' },
    ],
    benefits: [
      'Stop guessing and start making informed business choices',
      'Identify actionable trends in consumer behavior',
      'Access cloud reports even when away from the restaurant',
    ],
    faqs: [
      { question: 'Can I export the reports?', answer: 'Yes, all reports can be securely exported to Excel, CSV, or PDF formats.' },
      { question: 'Is the data secure?', answer: '100% secure. We use enterprise-grade encryption to protect your sensitive financial data.' },
    ]
  },
  {
    slug: 'restaurant-table-management-system',
    name: 'Restaurant Table Management System',
    title: 'Interactive Restaurant Table Management System',
    description: 'Optimize your floor plan, merge tables instantly, and monitor table turnaround times easily.',
    heroHeading: 'Maximize Dining Capacity with Table Management',
    heroSubheading: 'Give your hosts the tools they need to seat guests efficiently, track table statuses, and manage reservations.',
    features: [
      { title: 'Visual Floor Plans', description: 'Recreate your exact restaurant layout digitally to manage space effortlessly.', icon: '🪑' },
      { title: 'Status Tracking', description: 'See which tables are vacant, seated, waiting for food, or billing.', icon: '🚥' },
      { title: 'Merge & Split Tables', description: 'Accommodate large parties by merging tables with a single drag and drop.', icon: '🔄' },
    ],
    benefits: [
      'Turn tables faster without rushing customers',
      'Avoid seating confusion during peak times',
      'Ensure fair section assignments for waiters',
    ],
    faqs: [
      { question: 'Can we have multiple floors/zones?', answer: 'Yes, you can create separate layouts for indoor, patio, bar, and private dining.' },
      { question: 'Does it support reservations?', answer: 'Yes, we include a reservation log that ties directly to your upcoming table availability.' },
    ]
  },
  {
    slug: 'cloud-kitchen-management-software',
    name: 'Cloud Kitchen Management Software',
    title: 'Cloud Kitchen Management & Delivery Software',
    description: 'Manage multiple ghost brands, integrate delivery apps, and streamline high-volume dispatch operations seamlessly.',
    heroHeading: 'The Ultimate Cloud Kitchen Management Software',
    heroSubheading: 'Run high-volume, delivery-only kitchens with integrated aggregators, automated KDS, and robust inventory control.',
    features: [
      { title: 'Aggregator Integration', description: 'Receive orders from Zomato, Swiggy, and others directly onto a single screen.', icon: '🛵' },
      { title: 'Multi-Brand Support', description: 'Operate different virtual restaurant brands from the same physical kitchen using one system.', icon: '🏢' },
      { title: 'Dispatch Management', description: 'Track driver arrivals, handovers, and ensure the right bag goes to the right rider.', icon: '📦' },
    ],
    benefits: [
      'Eliminate tablet clutter and missed orders',
      'Optimize kitchen prep times for faster deliveries',
      'Consolidate reporting across all your virtual brands',
    ],
    faqs: [
      { question: 'Can I change menus across aggregators from here?', answer: 'Yes, our platform offers centralized menu management to push updates across multiple apps.' },
      { question: 'Does it manage cloud kitchen inventory?', answer: 'It calculates inventory usage across all your brands combined, making procurement easy.' },
    ]
  },
  {
    slug: 'multi-outlet-restaurant-management-software',
    name: 'Multi-Outlet Restaurant Management Software',
    title: 'Multi-Outlet Restaurant Management System | Aerobill',
    description: 'Centralized control for franchise chains. Sync menus, monitor stock transfers, and compare branch analytics globally.',
    heroHeading: 'Scale Easily with Multi-Outlet Management Software',
    heroSubheading: 'Built for enterprise chains and franchises. Control every location securely from your corporate headquarters.',
    features: [
      { title: 'Centralized Menu Control', description: 'Update a price or add an item once, and push it to all locations instantly.', icon: '🌍' },
      { title: 'Central Kitchen & Stock Transfers', description: 'Manage base kitchen production and dispatch raw stock to individual outlets.', icon: '🚚' },
      { title: 'Consolidated Reporting', description: 'Compare sales, lab costs, and margins side-by-side across your entire network.', icon: '📊' },
    ],
    benefits: [
      'Ensure absolute brand consistency at every location',
      'Simplify corporate accounting and auditing',
      'Easily onboard new franchise locations',
    ],
    faqs: [
      { question: 'Can I set different prices for different locations?', answer: 'Yes, you can configure tier pricing specific to regions or outlets.' },
      { question: 'Are role-based permissions detailed?', answer: 'Very detailed. Give outlet managers local access while preserving HQ control over critical settings.' },
    ]
  },
  {
    slug: 'mobile-restaurant-pos-software',
    name: 'Mobile Restaurant POS Software',
    title: 'Mobile POS System for Restaurants & Waitstaff',
    description: 'Punch orders right at the tableside from any smartphone or tablet. Send KOTs directly to the kitchen without running back.',
    heroHeading: 'Speed Up Service with Mobile Restaurant POS',
    heroSubheading: 'Equip your staff with mobile devices to take orders faster, up-sell effectively, and enhance the guest experience.',
    features: [
      { title: 'Tableside Ordering', description: 'Waiters use a mobile app to fire orders directly to the KDS or printer.', icon: '📱' },
      { title: 'Instant Bill Printing', description: 'Connect via Bluetooth to portable thermal printers for immediate checkout.', icon: '🖨️' },
      { title: 'Menu Previews', description: 'Staff can show images of dishes and ingredients to hesitant customers.', icon: '🖼️' },
    ],
    benefits: [
      'Reduce legwork for servers, letting them cover more tables',
      'Cut down order processing time by 30%',
      'Eliminate forgotten orders or handwriting errors',
    ],
    faqs: [
      { question: 'Does the mobile POS sync with the main desk?', answer: 'Yes, it syncs in real-time. Changes made on mobile reflect instantly at the counter POS.' },
      { question: 'Does it work offline?', answer: 'Yes, it handles offline orders and pairs the moment local WiFi is restored.' },
    ]
  },
  {
    slug: 'gst-billing-software-restaurants',
    name: 'GST Billing Software for Restaurants',
    title: 'India’s Best GST Billing Software for Restaurants',
    description: 'Ensure 100% compliance with built-in GST calculations, SAC codes setups, and automated CA-ready tax reports.',
    heroHeading: 'Stress-Free GST Billing Software for Restaurants',
    heroSubheading: 'Stop worrying about tax compliance. Automatically calculate CGST, SGST, and Cess on dining, takeaway, and delivery.',
    features: [
      { title: 'Automated Tax Calculation', description: 'Configures correct 5%, 12%, or 18% slabs depending on your restaurant type (AC/Non-AC, ITC).', icon: '📝' },
      { title: 'GSTIN on Invoices', description: 'Automatically capture B2B customer GSTINs for corporate billing and E-way rules.', icon: '🏢' },
      { title: 'Ready Tax Reports', description: 'Generate GSTR-1, GSTR-2, and GSTR-3B ready files to send directly to your accountant.', icon: '📑' },
    ],
    benefits: [
      'Avoid hefty government fines from faulty billing',
      'Save hours of manual accounting work at month-end',
      'Look professional to corporate clients',
    ],
    faqs: [
      { question: 'Can I generate B2B invoices?', answer: 'Yes, just input the customer’s GSTIN at checkout to generate a fully compliant B2B tax invoice.' },
      { question: 'What if GST rates change?', answer: 'You can update slab configurations globally from the dashboard in seconds.' },
    ]
  },
  {
    slug: 'restaurant-order-management-system',
    name: 'Restaurant Order Management System',
    title: 'Omnichannel Restaurant Order Management System',
    description: 'Consolidate dine-in, takeaway, aggregators, and direct online orders onto a single seamless interface.',
    heroHeading: 'Take Control with an Omni-channel Order Management System',
    heroSubheading: 'No matter where the order comes from, process it through a single workflow that connects the customer to the kitchen.',
    features: [
      { title: 'Unified Dashboard', description: 'See Swiggy, Zomato, Dine-in, and website orders in one prioritized list.', icon: '💻' },
      { title: 'Status Tracking', description: 'Update orders from \'Accepted\' to \'Preparing\' to \'Ready\' automatically notifying customers via SMS.', icon: '🔔' },
      { title: 'Customer CRM Sync', description: 'Every order captures customer data, building your CRM for future marketing.', icon: '🤝' },
    ],
    benefits: [
      'Never miss or ignore an online delivery order again',
      'Provide accurate ETAs to your customers',
      'Reduce stress on front-of-house staff',
    ],
    faqs: [
      { question: 'Does it support pre-orders?', answer: 'Yes, you can schedule catering or bulk orders for future dates and times.' },
      { question: 'How are delivery partners assigned?', answer: 'If integrated with your own riders or third-party logistics (like Dunzo/Shadowfax), it assigns automatically.' },
    ]
  },
  {
    slug: 'restaurant-automation-software',
    name: 'Restaurant Automation Software',
    title: 'End-to-End Restaurant Automation Software',
    description: 'Automate mundane tasks: self-serve ordering, automated inventory deductions, scheduled reports, and marketing triggers.',
    heroHeading: 'Run Operations on Autopilot with Restaurant Automation',
    heroSubheading: 'Step out of the daily grind. Let our software handle the repetitive tasks so you can focus on hospitality.',
    features: [
      { title: 'Automated Procurement', description: 'Auto-generate purchase orders to your suppliers when stock hits minimum levels.', icon: '🤖' },
      { title: 'Marketing Triggers', description: 'Send automated "We miss you" SMS discounts to customers who haven’t visited in 30 days.', icon: '📩' },
      { title: 'Scheduled Reporting', description: 'Receive your daily End-of-Day (EOD) sales report automatically via Email at midnight.', icon: '📅' },
    ],
    benefits: [
      'Significantly reduce manual administration work',
      'Boost recurring revenue through automated marketing',
      'Ensure smooth operations even when you are on vacation',
    ],
    faqs: [
      { question: 'Is the automation reliable?', answer: 'Yes, our cloud infrastructure guarantees high uptime for all scheduled tasks.' },
      { question: 'Do I need technical skills?', answer: 'No. The automation rules are set up through a simple point-and-click interface.' },
    ]
  },
  {
    slug: 'restaurant-management-software-small-businesses',
    name: 'Restaurant Management Software for Small Businesses',
    title: 'Affordable Restaurant Software for Small Businesses',
    description: 'Powerful, easy-to-use, and budget-friendly software tailored for small cafes, food trucks, and independent bistros.',
    heroHeading: 'The Perfect Restaurant Management Software for Small Businesses',
    heroSubheading: 'You don’t need an enterprise budget to have enterprise features. Scale your small business affordably.',
    features: [
      { title: 'Zero Hardware Cost', description: 'Run the entire POS system on whatever laptop or tablet you already own.', icon: '💻' },
      { title: 'Easy Setup', description: 'Upload your menu and start billing in under 15 minutes. No complex training needed.', icon: '🚀' },
      { title: 'Affordable Pricing', description: 'Flexible plans starting from a free tier. Pay only as you grow.', icon: '💰' },
    ],
    benefits: [
      'Keep overheads extremely low while getting digital',
      'Look professional like the big chains',
      'Free up your time to focus on your recipes and guests',
    ],
    faqs: [
      { question: 'Is there a long-term contract?', answer: 'No, we offer straightforward month-to-month plans. Cancel anytime.' },
      { question: 'Do you provide support for small setups?', answer: 'Yes! We offer 24/7 web and phone support regardless of your business size.' },
    ]
  },
  {
    slug: 'restaurant-crm-customer-management-software',
    name: 'Restaurant CRM & Customer Management Software',
    title: 'Restaurant CRM & Loyalty Management Software',
    description: 'Build your localized brand. Capture customer data, offer loyalty points, run targeted campaigns, and increase repeat visits.',
    heroHeading: 'Turn First-Time Visitors into Loyal Fans with CRM',
    heroSubheading: 'Your customers are your biggest asset. Know them, reward them, and keep them coming back.',
    features: [
      { title: 'Digital Loyalty Programs', description: 'Customers earn points on every bill which they can redeem on future visits without carrying plastic cards.', icon: '🎁' },
      { title: 'Customer Database', description: 'Capture name, phone, birthdays, and spending habits securely at the billing counter.', icon: '📖' },
      { title: 'SMS/Email Campaigns', description: 'Send out bulk messages for festivals, new menus, or special discounts directly from the dashboard.', icon: '📢' },
    ],
    benefits: [
      'Dramatically increase customer lifetime value',
      'Stop paying aggregators for customer acquisition',
      'Personalize service to make VIP guests feel special',
    ],
    faqs: [
      { question: 'Does it capture data automatically?', answer: 'Yes, if you use QR ordering or digital billing, customer data is instantly routed to your CRM.' },
      { question: 'Can I run birthday campaigns?', answer: 'Absolutely. Set it up once and the system will auto-send a discount coupon to customers on their birthday.' },
    ]
  }
];
