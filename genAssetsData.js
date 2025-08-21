const fs = require('fs');

const assetList = [
  { name: 'Apple Inc.', type: 'stock' },
  { name: 'Tesla Inc.', type: 'stock' },
  { name: 'Amazon.com Inc.', type: 'stock' },
  { name: 'Microsoft Corporation', type: 'stock' },
  { name: 'Alphabet Inc.', type: 'stock' },
  { name: 'Facebook Inc.', type: 'stock' },
  { name: 'Nvidia Corporation', type: 'stock' },
  { name: 'Netflix Inc.', type: 'stock' },
  { name: 'Bitcoin', type: 'crypto' },
  { name: 'Ethereum', type: 'crypto' },
  { name: 'Cardano', type: 'crypto' },
  { name: 'Solana', type: 'crypto' },
  { name: 'XRP', type: 'crypto' },
  { name: 'Polkadot', type: 'crypto' },
  { name: 'Litecoin', type: 'crypto' },
  { name: 'Intel Corporation', type: 'stock' },
  { name: 'IBM', type: 'stock' },
  { name: 'Twitter Inc.', type: 'stock' },
  { name: 'Shopify Inc.', type: 'stock' },
  { name: 'PayPal Holdings', type: 'stock' },
];

function generateAssets(numAssets = 500) {
  const assets = [];

  for (let i = 1; i <= numAssets; i++) {
    const newAsset = assetList[Math.floor(Math.random() * assetList.length)];
    const symbol = newAsset.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 5);
    const currentPrice = (Math.random() * 5000 + 10).toFixed(2);
    const dailyChangePercent = (Math.random() * 10 - 5).toFixed(2);

    assets.push({
      id: i,
      name: newAsset.name,
      symbol,
      type: newAsset.type,
      currentPrice: parseFloat(currentPrice),
      dailyChangePercent: parseFloat(dailyChangePercent),
    });
  }

  return assets;
}

const assets = generateAssets();
const fileName = 'financial_assets.json';

fs.writeFile(fileName, JSON.stringify(assets, null, 4), err => {
  if (err) {
    console.error('Error writing file:', err);
  } else {
    console.log(`${fileName} has been created with 500+ financial assets.`);
  }
});
