const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'app', 'restaurant-pos');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(filePath));
        } else if (file === 'page.tsx') {
            results.push(filePath);
        }
    });
    return results;
}

const pages = walkDir(targetDir);

pages.forEach(page => {
    let content = fs.readFileSync(page, 'utf8');
    let original = content;

    // FAQ Regex: matches the div container that maps the FAQs.
    // It looks for: <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6"> ... <h3...>{faq.q}</h3> ... <p...>{faq.a}</p> ... </div>
    const faqPattern = /<div key=\{i\} className="bg-white\/5 border border-white\/10 rounded-xl p-6">\s*<h3 className="([^"]+)">\{faq\.q\}<\/h3>\s*<p className="([^"]+)">\{faq\.a\}<\/p>\s*<\/div>/g;
    
    content = content.replace(faqPattern, (match, h3Class, pClass) => {
        return `<details key={i} className="group bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition [&_summary::-webkit-details-marker]:hidden">
                                    <summary className="flex items-center justify-between cursor-pointer list-none">
                                        <h3 className="${h3Class} pr-4">{faq.q}</h3>
                                        <span className="transition group-open:rotate-180 text-[#ff6b35]">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                        </span>
                                    </summary>
                                    <p className="${pClass} mt-4 animate-in fade-in slide-in-from-top-2">{faq.a}</p>
                                </details>`;
    });

    if (content !== original) {
        fs.writeFileSync(page, content);
        console.log(`Updated FAQ UI in ${page}`);
    }
});
