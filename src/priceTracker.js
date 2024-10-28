const fetch = require("node-fetch");

async function getPrice(tokenAddress) {
  const url = `https://api.dexscreener.io/latest/dex/token/${tokenAddress}`;
  const response = await fetch(url);
  const data = await response.json();
  return parseFloat(data.pairs[0].priceUsd); // Token price in USD
}

module.exports = { getPrice };
