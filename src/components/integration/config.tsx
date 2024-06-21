import { http, createConfig } from "@wagmi/core";
import { bsc } from "@wagmi/core/chains";

export const config = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http(),
  },
});
