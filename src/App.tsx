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
import Perpetual from "./components/perpetual";
import Governance from "./components/governance";


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
        <RainbowKitProvider coolMode theme={darkTheme({})}>
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
              <Route path="/perpetual"
                element={
                  <LayoutWithNavbarAndFooter>
                    <Perpetual />
                  </LayoutWithNavbarAndFooter>
                }
              />
              <Route path="/governance" element={
                <LayoutWithNavbarAndFooter>
                  <Governance />
                </LayoutWithNavbarAndFooter>
              } />
              <Route path="/staking/*" element={<AppLayout />} />
            </Routes>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
