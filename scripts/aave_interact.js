const faucet_address = "0xbd4712A5f0D5171eFb49023D43015D44F4b2b374";
const aaveAddress = "0xb2cB3A612391E4dbC2b4e1762b2A0D56f496eAAf";
const daiAddress = "0x8000a62eD32D6966fEb556b3A688594EEe50d847";
const linkAddress = "0x55F18458573624FD612413F09672BE6f1e6E5F60";
const owners = "0x321236D5Af479792395198785259AE0DB42e623a";
// const tokenAddress = "0xbd4712A5f0D5171eFb49023D43015D44F4b2b374";
//proxy pool address
const poolAddress = "0x9036EBc2712bcC2eeb603fCB3c89A047a5B44e17";
const poolProvider = "0x6896cabf3D285D6A115aCB029aA149FbDc588cAa";
require("dotenv").config();
PRIVATE_KEY = process.env.PRIVATE_KEY;
RPC_URL = process.env.RPC_URL;
const artifacts = {
  Faucet: require("../artifacts/@aave/periphery-v3/contracts/mocks/testnet-helpers/Faucet.sol/Faucet.json"),
  TestnetERC20: require("../artifacts/@aave/periphery-v3/contracts/mocks/testnet-helpers/TestnetERC20.sol/TestnetERC20.json"),
  poolProvider: require("../artifacts/@aave/core-v3/contracts/protocol/configuration/PoolAddressesProvider.sol/PoolAddressesProvider.json"),
  pool: require("../artifacts/@aave/core-v3/contracts/protocol/pool/Pool.sol/Pool.json"),
};

const { Contract, ethers } = require("ethers");

//const provider = ethers.provider;
const ownerPrivateKey = PRIVATE_KEY;
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const owner = new ethers.Wallet(PRIVATE_KEY, provider);

const faucetContract = new Contract(
  faucet_address,
  artifacts.Faucet.abi,
  owner
);
const linkContract = new Contract(
  linkAddress,
  artifacts.TestnetERC20.abi,
  owner
);
const pool = new Contract(poolAddress, artifacts.pool.abi, owner);

async function main() {
  try {
    // const approveTx = await linkContract.approve(
    //   poolAddress,
    //   ethers.utils.parseEther("500000000"),
    //   { gasLimit: "500000" }
    // );
    // console.log(`Approve Transaction Hash: ${approveTx.hash}`);
    // const approveReceipt = await approveTx.wait();
    // if (approveReceipt.status !== 1) {
    //   throw new Error(`Approve transaction failed: ${approveTx.hash}`);
    // }
    // console.log("Approve transaction successful.");

    // const minttx = await faucetContract.mint(
    //   linkAddress,
    //   owner.address,
    //   ethers.utils.parseEther("500000000"),
    //   { gasLimit: "500000" }
    // );

    // console.log(`Mint transaction Hash: ${minttx.hash}`);
    // const mintReceipt = await minttx.wait();
    // if (mintReceipt !== 1) {
    //   throw new Error(`Mint transaction failed ${minttx.hash}`);
    // }
    // console.log("Mint Successful");

    // const supplyTx = await pool.supply(
    //   linkAddress,
    //   ethers.utils.parseEther("1000"),
    //   owner.address,
    //   0,
    //   { gasLimit: "500000" }
    // );
    // console.log(`Supply Transaction Hash: ${supplyTx.hash}`);
    // const supplyReceipt = await supplyTx.wait();
    // if (supplyReceipt.status !== 1) {
    //   throw new Error(`Supply transaction failed: ${supplyTx.hash}`);
    // }
    // console.log("Supply transaction successful.");

    const withdrawTx = await pool.withdraw(
      linkAddress,
      ethers.utils.parseEther("40"),
      owner.address,
      { gasLimit: "500000" }
    );
    console.log(`Withdraw Transaction Hash: ${withdrawTx.hash}`);
    const withdrawReceipt = await withdrawTx.wait();
    if (withdrawReceipt.status !== 1) {
      throw new Error(`Withdraw transaction failed: ${withdrawTx.hash}`);
    }
    console.log("Withdraw transaction successful.");

    // const borrowTx = await pool.borrow(
    //   linkAddress,
    //   ethers.utils.parseEther("50"),
    //   2,
    //   0,
    //   owner.address,
    //   { gasLimit: "500000" }
    // );
    // console.log(`Borrow Transaction Hash: ${borrowTx.hash}`);
    // const borrowReceipt = await borrowTx.wait();
    // if (borrowReceipt.status !== 1) {
    //   throw new Error(`Borrow transaction failed: ${borrowTx.hash}`);
    // }
    // console.log("Borrow transaction successful.");

    //
    // const repayTx = await pool.repay(
    //   linkAddress,
    //   ethers.utils.parseEther("30"),
    //   2,
    //   owner.address,
    //   { gasLimit: "500000" }
    // );
    // console.log(`Repay Transaction Hash: ${repayTx.hash}`);
    // const repayReceipt = await repayTx.wait();
    // if (repayReceipt.status !== 1) {
    //   throw new Error(`Repay transaction failed: ${repayTx.hash}`);
    // }
    // console.log("Repay transaction successful.");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
