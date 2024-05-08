import { Routes, Route } from "react-router-dom";

import StakingBoard from "../staking/StakingBoard";
import StakingMint from "../staking/StakingMint";
import StakingBurn from "../staking/StakingBurn";
import AppHeader from "../header";
import Footer from "../../footer";
import PrivacyModal from "../modal/privacy";
import Migration from "../migration";

const AppLayout = () => {
  return (
    <div className="w-full">
      <AppHeader />
      <div className="pt-[93px]">
        <Routes>
          <Route path="/*" element={<StakingBoard />} />
          <Route path="/mint" element={<StakingMint />} />
          <Route path="/burn" element={<StakingBurn />} />
          <Route path="/modal" element={<PrivacyModal />} />
          <Route path="/migration" element={<Migration />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
