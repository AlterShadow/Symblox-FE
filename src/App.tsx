import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./components/dashboard";
import Header from "./components/header";
import Footer from "./components/footer";
import AppLayout from "./components/app/layout";

import "./App.css";

import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  arbitrum,
  base,
  bsc,
  bscTestnet,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";

const config = getDefaultConfig({
  appName: "SymbloxStaking",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    mainnet,
    bsc,
    bscTestnet,
    polygon,
    optimism,
    arbitrum,
    base,
    ...(process.env.REACT_APP_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
});

interface LayoutWithNavbarAndFooterProps {
  children: React.ReactNode;
}

function LayoutWithNavbarAndFooter({
  children,
}: LayoutWithNavbarAndFooterProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({})}>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <LayoutWithNavbarAndFooter>
                    <Dashboard />
                  </LayoutWithNavbarAndFooter>
                }
              />
              <Route path="/staking/*" element={<AppLayout />} />
            </Routes>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
