import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { bscTestnet, mainnet, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Symblox",
  projectId: process.env.REACT_APP_PROJECT_ID || "",
  chains: [sepolia, bscTestnet],
  transports: {
    [mainnet.id]: http(
      "https://eth-mainnet.g.alchemy.com/v2/W_OcdYoy4hejq5Qg29NtrtVnQPyeTsFb"
    ),
    [sepolia.id]: http(
      "https://eth-sepolia.g.alchemy.com/v2/0vSwwnU2l6iQ7x2yMnWRSx5pdROw4XO5"
    ),
  },
});
