import type React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAccount } from "wagmi";

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
import ScrollToTop from "./hooks/ScrollToTop";

type LayoutWithNavbarAndFooterProps = {
  children: React.ReactNode;
};

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const LayoutWithNavbarAndFooter: React.FC<LayoutWithNavbarAndFooterProps> = ({
  children,
}) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <Navigate to="/staking" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
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
              <ProtectedRoute>
                <Migration />
              </ProtectedRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/escrow"
          element={
            <>
              <AppHeader />
              <ProtectedRoute>
                <Escrow />
              </ProtectedRoute>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
