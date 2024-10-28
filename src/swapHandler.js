const { Connection, PublicKey, Keypair, Transaction } = require("@solana/web3.js");
const { rpcUrl, privateKey } = require("./config");

const connection = new Connection(rpcUrl);

async function executeSwap(wallet, fromTokenAddress, toTokenAddress, amount) {
  const transaction = new Transaction();
  console.log(`Swapping ${amount} of ${fromTokenAddress} to ${toTokenAddress}...`);



  const signedTransaction = await wallet.signTransaction(transaction);
  const signature = await connection.sendRawTransaction(signedTransaction.serialize());
  console.log("Transaction sent:", signature);
}

module.exports = { executeSwap };
