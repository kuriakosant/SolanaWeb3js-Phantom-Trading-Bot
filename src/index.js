const { getPrice } = require("./priceTracker");
const { executeSwap } = require("./swapHandler");
const { Keypair } = require("@solana/web3.js");

const wallet = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.PHANTOM_WALLET_PRIVATE_KEY)));

const TOKEN_ADDRESS = "YourTokenAddressHere";
const TARGET_GAIN = 1.05; // 5% gain
const TARGET_DIP = 0.95;  // 5% dip

async function main() {
  const initialPrice = await getPrice(TOKEN_ADDRESS);
  const targetPriceUp = initialPrice * TARGET_GAIN;
  const targetPriceDown = initialPrice * TARGET_DIP;

  console.log(`Monitoring ${TOKEN_ADDRESS}: Initial price = $${initialPrice}`);

  while (true) {
    const currentPrice = await getPrice(TOKEN_ADDRESS);
    console.log(`Current price: $${currentPrice}`);

    if (currentPrice >= targetPriceUp) {
      console.log("Target gain reached! Executing sell...");
      await executeSwap(wallet, TOKEN_ADDRESS, "SOL", 100); // Example amount
      break;
    }

    if (currentPrice <= targetPriceDown) {
      console.log("Target dip reached! Executing buy...");
      await executeSwap(wallet, "SOL", TOKEN_ADDRESS, 100);
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 60000)); // Check every minute
  }
}

main().catch(console.error);
