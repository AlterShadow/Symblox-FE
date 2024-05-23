import type React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAccount, useChainId, useSwitchChain } from "wagmi";

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
import { sepolia } from "viem/chains";

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
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  useEffect(() => {
    console.log(chainId);
    while (chainId !== sepolia.id) {
      switchChain({
        chainId: sepolia.id,
      });
    }
  }, [chainId]);
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
