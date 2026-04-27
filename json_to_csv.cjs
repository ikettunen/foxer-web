const fs = require('fs');

const rawData = fs.readFileSync('products.json', 'utf-8');
const products = JSON.parse(rawData);

let csv = "ID,Name,Category,Subcategory,Difficulty,Price,SalePrice,ShortDescription\n";

products.forEach(p => {
    const id = p.id || '';
    const name = (p.name || '').replace(/,/g, '');
    const cat = (p.category || '').replace(/,/g, '');
    const subcat = (p.subcategory || '').replace(/,/g, '');
    const difficulty = (p.difficulty || '').replace(/,/g, '');
    const price = p.price || '';
    const sale = p.salePrice || '';
    const desc = (p.shortDescription || '').replace(/,/g, '').replace(/\n/g, ' ');
    
    csv += `${id},${name},${cat},${subcat},${difficulty},${price},${sale},${desc}\n`;
});

fs.writeFileSync('tuotteet.csv', csv);
console.log('Created tuotteet.csv with ' + products.length + ' products.');
