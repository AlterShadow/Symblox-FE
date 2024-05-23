import { Routes, Route, Navigate } from "react-router-dom";

import StakingBoard from "../staking/StakingBoard";
import StakingMint from "../staking/StakingMint";
import StakingBurn from "../staking/StakingBurn";
import AppHeader from "../header";
import Footer from "../../footer";
import StakingEarn from "../staking/StakingEarn";
import { useAccount } from "wagmi";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <Navigate to="/staking" replace />;
  }
  return <>{children}</>;
};

const AppLayout = () => {
  return (
    <div className="w-full">
      <AppHeader />
      <div className="pt-[93px]">
        <Routes>
          <Route path="/*" element={<StakingBoard />} />
          <Route
            path="/mint"
            element={
              <ProtectedRoute>
                <StakingMint />
              </ProtectedRoute>
            }
          />
          <Route
            path="/burn"
            element={
              <ProtectedRoute>
                <StakingBurn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/earn"
            element={
              <ProtectedRoute>
                <StakingEarn />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
