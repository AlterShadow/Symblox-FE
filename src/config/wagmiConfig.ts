import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { bscTestnet, bsc, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Symblox",
  projectId: process.env.REACT_APP_PROJECT_ID || "",
  chains: [bsc, bscTestnet, sepolia],
  transports: {
    [bsc.id]: http(),
    [sepolia.id]: http(),
    [bscTestnet.id]: http(),
  },
});
