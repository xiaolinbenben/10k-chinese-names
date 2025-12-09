
import fs from 'fs';
import path from 'path';

const inputFile = path.resolve('10000中国普通人名大全.txt');
const outputFile = path.resolve('public/names.json');

try {
    const data = fs.readFileSync(inputFile, 'utf8');
    // Split by newlines to get lines, then split by '、'
    // Also handle potential other separators or cleanup
    const names = data.split('\n')
        .flatMap(line => line.split('、'))
        .map(name => name.trim())
        .filter(name => name.length > 0 && !name.match(/^\d+:/)); // Filter out empty strings and line numbers if any

    // Remove duplicates just in case
    const uniqueNames = [...new Set(names)];

    console.log(`Found ${uniqueNames.length} names.`);

    // Create public dir if not exists
    if (!fs.existsSync(path.dirname(outputFile))) {
        fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    }

    fs.writeFileSync(outputFile, JSON.stringify(uniqueNames, null, 2));
    console.log(`Wrote names to ${outputFile}`);
} catch (err) {
    console.error('Error processing names:', err);
}
