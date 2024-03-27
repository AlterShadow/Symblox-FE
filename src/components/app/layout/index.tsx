import { Routes, Route } from "react-router-dom";
import Staking from "../staking";
import AppHeader from "../header";
import Footer from "../../footer";

const AppLayout = () => {
  return (
    <div className="w-full">
      <AppHeader />
      <div className="pt-[93px]">
        <Routes>
          <Route path="/staking" element={<Staking />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
