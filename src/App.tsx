import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";

import Dashboard from "./components/dashboard";
import Header from "./components/header";
import Footer from "./components/footer";
import AppLayout from "./components/app/layout";

import "@rainbow-me/rainbowkit/styles.css";
import "./App.css";

const config = getDefaultConfig({
  appName: "SymbloxStaking",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    bsc,
    bscTestnet,
    ...(process.env.REACT_APP_ENABLE_TESTNETS === "true"
      ? [bscTestnet]
      : [bsc]),
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
