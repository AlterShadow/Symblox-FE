import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Symblox",
  projectId: process.env.REACT_APP_PROJECT_ID || "",
  chains: [bsc, bscTestnet],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
});
