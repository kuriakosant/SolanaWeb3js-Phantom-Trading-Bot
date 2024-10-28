require("dotenv").config();

module.exports = {
  rpcUrl: process.env.RPC_URL,
  privateKey: process.env.PHANTOM_WALLET_PRIVATE_KEY,
};
