import AboutFragment from "./aboutFragment";
import GetStartedFragment from "./getStartedFragment";
import HowItWorksFragment from "./howItWorksFragment";
import IntroFragment from "./introFragment";
import KeyFeatureFragment from "./keyFeatureFragment";
import RewardFragment from "./rewardFragment";
import RoadmapFragment from "./roadmapFragment";

const Dashboard = () => {
	return (
		<>
			<div className="min-h-screen overflow-x-hidden h-full w-full">
				<IntroFragment />
				<AboutFragment />
				<KeyFeatureFragment />
				<HowItWorksFragment />
				<RewardFragment />
				<RoadmapFragment />
				<GetStartedFragment />
			</div>
		</>
	);
};

export default Dashboard;
