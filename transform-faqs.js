const fs = require('fs');

const pages = [
  'app/restaurant-pos/cloud-kitchen-management-software/page.tsx',
  'app/restaurant-pos/inventory-management-software/page.tsx',
  'app/restaurant-pos/kitchen-display-system/page.tsx',
  'app/restaurant-pos/kot-system/page.tsx',
  'app/restaurant-pos/qr-code-ordering-system/page.tsx',
  'app/restaurant-pos/restaurant-analytics-reporting/page.tsx',
  'app/restaurant-pos/restaurant-billing-software/page.tsx',
  'app/restaurant-pos/table-management-system/page.tsx'
];

const chevronSvg = `<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>`;

pages.forEach(page => {
    let content = fs.readFileSync(page, 'utf8');
    
    // Find the mapping block
    const mapStart = '].map((faq, i) => (';
    const splitParts = content.split(mapStart);
    if (splitParts.length === 2) {
        let tail = splitParts[1];
        const endMap = '))}';
        const mapEndIndex = tail.indexOf(endMap);
        
        if (mapEndIndex !== -1) {
            let block = tail.substring(0, mapEndIndex);
            
            // Rewrite the block layout
            // From: <div key={i} className={`faq-card ...`}> [INNER_CONTENT] <p className="text-gray-400 ...">{faq.a}</p> </div>
            // To: <details key={i} className={`faq-card group ... [&_summary::-webkit-details-marker]:hidden`}> <summary className="..."> [INNER_CONTENT] <span ...chevron... </span> </summary> <p className="...">...</p> </details>
            
            // 1. Change outer div
            block = block.replace(/<div key=\{i\} className=\{([^}]+)\}>/, '<details key={i} className={$1 + " group bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 hover:bg-white/10 transition [&_summary::-webkit-details-marker]:hidden"}>');
            
            // 2. Wrap INNER_CONTENT in <summary>
            // Find where <p starts
            const pIndex = block.lastIndexOf('<p className="text-gray-400');
            const innerHead = block.substring(0, pIndex);
            let pTail = block.substring(pIndex);
            
            // Remove the first closing bracket of the initial `<details...>` to insert summary
            // But wait, the replace above already closed the details opening tag textually.
            // `<details ...> \n <div class="flex...> ...`
            const firstAngleClose = innerHead.indexOf('>') + 1;
            
            const headContent = innerHead.substring(firstAngleClose);
            const newHead = innerHead.substring(0, firstAngleClose) + `\n<summary className="flex items-center justify-between cursor-pointer list-none select-none">` + `<div className="flex-1 pr-4">` + headContent + `</div>` + `<span className="transition-transform group-open:rotate-180 text-gray-500 flex-shrink-0">${chevronSvg}</span></summary>\n`;
            
            // modify pTail
            pTail = pTail.replace(/<\/div>\s*$/, '</details>');
            pTail = pTail.replace('<p className="', '<p className="mt-4 animate-in fade-in slide-in-from-top-2 ');
            
            const newBlock = newHead + pTail;
            
            content = splitParts[0] + mapStart + newBlock + tail.substring(mapEndIndex);
            fs.writeFileSync(page, content);
            console.log(`Updated FAQ in ${page}`);
        }
    }
});
