import type React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  darkTheme,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { useSwitchChain, useChainId, useAccount } from "wagmi";
import { getAccount } from "@wagmi/core";
import { getChainId } from "@wagmi/core";

import Dashboard from "./components/dashboard";
import Header from "./components/header";
import Footer from "./components/footer";
import AppLayout from "./components/app/layout";
import Perpetual from "./components/perpetual";
import Governance from "./components/governance";
import AppHeader from "./components/app/header";
import Migration from "./components/app/migration";
import Escrow from "./components/app/escrow";

import "@rainbow-me/rainbowkit/styles.css";
import "./App.css";
import { useEffect } from "react";

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

function App() {
  const { chains, switchChainAsync } = useSwitchChain();
  const account = useAccount();
  useEffect(() => {
    const switchNetwork = async () => {
      await switchChainAsync({ chainId: 11155111 });
    };
    switchNetwork();
  }, [account]);
  return (
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
        <Route
          path="/perpetual"
          element={
            <LayoutWithNavbarAndFooter>
              <Perpetual />
            </LayoutWithNavbarAndFooter>
          }
        />
        <Route
          path="/governance"
          element={
            <LayoutWithNavbarAndFooter>
              <Governance />
            </LayoutWithNavbarAndFooter>
          }
        />
        <Route path="/staking/*" element={<AppLayout />} />
        <Route
          path="/migration"
          element={
            <>
              <AppHeader />
              <Migration />
              <Footer />
            </>
          }
        />
        <Route
          path="/escrow"
          element={
            <>
              <AppHeader />
              <Escrow />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
