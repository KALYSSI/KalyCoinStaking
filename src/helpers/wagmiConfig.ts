import { createConfig, configureChains } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";

// Define KalyChain
const kalyChain = {
  id: 3889, // chain ID of KalyChain
  name: 'KalyChain',
  network: 'kalychain',
  nativeCurrency: {
    decimals: 18,
    name: 'Kaly Coin',
    symbol: 'KLC',
  },
  rpcUrls: {
    public: { http: ['https://testnetrpc.kalychain.io/rpc'] }, // RPC URL
    default: { http: ['https://testnetrpc.kalychain.io/rpc'] }, // RPC URL
  },
  blockExplorers: {
    default: { name: 'KalyScan', url: 'https://kalyscan.io' }, // Block explorer URL
  },
  testnet: false,
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [kalyChain],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: chain.rpcUrls.default.http[0],
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Kaly Staking",
  projectId: import.meta.env.VITE_KALY_PROJECT_ID,
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { config, chains };