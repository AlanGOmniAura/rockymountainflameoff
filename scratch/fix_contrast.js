const fs = require('fs');
const path = require('path');

const targetDirs = [
    path.join('src', 'components', 'admin'),
    path.join('src', 'app', 'admin'),
    path.join('src', 'app', '(website)'), // Check website too for consistency
];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.scss')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = targetDirs.flatMap(dir => walk(dir));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Replace text-zinc-500 -> text-zinc-400
    if (content.includes('text-zinc-500')) {
        content = content.replace(/text-zinc-500/g, 'text-zinc-400');
        changed = true;
    }
    // Replace text-zinc-600 -> text-zinc-400
    if (content.includes('text-zinc-600')) {
        content = content.replace(/text-zinc-600/g, 'text-zinc-400');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log(`Updated: ${file}`);
    }
});
