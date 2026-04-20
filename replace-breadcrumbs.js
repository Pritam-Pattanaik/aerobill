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

    // Breadcrumb updates
    content = content.replace(/\/restaurant-pos-software-india/g, '/restaurant-pos/overview');

    if (content !== original) {
        fs.writeFileSync(page, content);
        console.log(`Updated breadcrumb in ${page}`);
    }
});
