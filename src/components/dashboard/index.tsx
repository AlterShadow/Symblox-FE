import AboutFragment from "./aboutFragment";
import IntroFragment from "./introFragment";
import KeyFeatureFragment from "./keyFeatureFragment";
import RewardFragment from "./rewardFragment";
import RoadmapFragment from "./roadmapFragment";

const Dashboard = () => {
  return (
    <>
      <div className="min-h-screen h-full w-full">
        <IntroFragment />
        <AboutFragment />
        <KeyFeatureFragment />
        <RewardFragment />
        <RoadmapFragment />
      </div>
    </>
  );
};

export default Dashboard;
