import { Routes, Route } from "react-router-dom";
import StakingBoard from "../staking/StakingBoard";
import StakingMint from "../staking/StakingMint";
import AppHeader from "../header";
import Footer from "../../footer";

const AppLayout = () => {
  return (
    <div className="w-full">
      <AppHeader />
      <div className="pt-[93px]">
        <Routes>
          <Route path="/*" element={<StakingBoard />} />
          <Route path="/mint" element={<StakingMint />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
