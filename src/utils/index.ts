// import { ethers } from "ethers";
// import sample from "lodash/sample";

// let web3: { [chainId: number]: ethers.JsonRpcProvider | undefined } = {
//   1: undefined,
//   5: undefined,
// };

// export const getNodeUrl = (nodes: string[]) => {
//   return sample(nodes);
// };

// export const getRpcProvider = async (rpcs: string[]) => {
//   const RPC_URL = getNodeUrl(rpcs);
//   return new ethers.JsonRpcProvider(RPC_URL, "any");
// };

// export const getRpcProviderByChanId = (
//   chId?: number
// ): ethers.JsonRpcProvider | undefined => {
//   const chainId: number = Number(chId ?? DEFAULT_NETWORK_ID);
//   if (web3[chainId] === undefined) {
//     const RPC_URL = getNodeUrl([networkInfos[chainId].rpc]);
//     web3[chainId] = new ethers.providers.JsonRpcProvider(RPC_URL, "any");
//   }
//   return web3[chainId];
// };
