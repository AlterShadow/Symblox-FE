import { useTranslation } from "react-i18next";
import useScrollVisibility from "../../hooks/useScrollVisibility";

const Governance = () => {
  const { t } = useTranslation();
  const isVisibleMain = useScrollVisibility("governance-main", 0);
  const isVisibleGovernance = useScrollVisibility("governance-governance", 0);
  const isVisibleHowDoesGovernanceWork = useScrollVisibility("governance-how-does-governance-work", 0);

  const howDoesGovernanceWork = [
    {
      img: "/assets/Image/Governance/Governance1.svg",
      title: t("governance.votingPower"),
      desc: t("governance.votingPower.desc"),
    },
    {
      img: "/assets/Image/Governance/Governance2.svg",
      title: t("governance.nominationProcess"),
      desc: t("governance.nominationProcess.desc"),
    },
    {
      img: "/assets/Image/Governance/Governance3.svg",
      title: t("governance.electionCycle"),
      desc: t("governance.electionCycle.desc"),
    },
    {
      img: "/assets/Image/Governance/Governance4.svg",
      title: t("governance.ongoingCycle"),
      desc: t("governance.ongoingCycle.desc"),
    },
    {
      img: "/assets/Image/Governance/Governance5.svg",
      title: t("governance.initiativesBy"),
      desc: t("governance.initiativesBy.desc"),
    },
    {
      img: "/assets/Image/Governance/Governance6.svg",
      title: t("governance.decisionMaking"),
      desc: t("governance.decisionMaking.desc"),
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden h-full w-full text-white px-6 sm:px-24 font-Barlow">
      <div id="governance-main" className={`flex flex-col md:flex-row justify-center items-center pt-[88px] gap-x-8 mb-36 mt-10`}>
        <div>
          <div className={`transition-all duration-500 ${isVisibleMain ? "scale-100" : "scale-50"} text-white text-3xl sm:text-5xl font-bold max-w-[400px]`}>
            <span className="mr-2">{t("governance.aDecentralized")}</span>
            <span className="inline-block text-gradient">
              {t("governance.governance")}
            </span>
          </div>
          <div className={`transition-all duration-500 ease-in delay-300 ${isVisibleMain ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"} text-primaryText text-sm sm:text-base mt-4 max-w-[550px]`}>
            {t("governance.symbloxIsA")}
          </div>
        </div>
        <div>
          <img
            src="/assets/Image/Governance/DecentralizedGovernance.png"
            alt="DecentralizedGovernance"
            className="w-full sm:w-fit sm:max-w-[550px]"
          />
        </div>
      </div>
      <div id="governance-governance" className="text-center mb-36">
        <div className={`transition-all duration-500 ease-in ${isVisibleGovernance ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"} mb-3`}>
          {t("governance.symbloxGovernance").toUpperCase()}
        </div>
        <div className={`transition-all duration-500 ease-in delay-300 ${isVisibleGovernance ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"} text-primaryText text-3xl sm:text-4xl font-bold`}>
          {t("governance.theSymbloxProtocol")}
          <span className="text-gradient">
            {t("governance.representativeCouncils")}
          </span>
          {t("governance.thatAre")}
          <span className="text-gradient">{t("governance.votedOn")}</span>
        </div>
      </div>
      <div id="governance-how-does-governance-work" className="mb-20">
        <div className={`transition-all duration-500 ease-in ${isVisibleHowDoesGovernanceWork ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"} font-semibold text-center text-2xl sm:text-4xl mb-10`}>
          {t("governance.howDoesGovernanceWork")}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {howDoesGovernanceWork.map((item, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ease-in delay-[${(index + 1) * 200}ms] ${isVisibleHowDoesGovernanceWork ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"} flex-col bg-primaryBoxColor p-10 rounded-xl sm:max-w-[400px] min-h-[350px]`}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-[72px] h-[72px] mb-4"
              />
              <div className="text-white text-2xl font-medium mb-2">
                {item.title}
              </div>
              <div className="text-primaryText leading-tight">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Governance;
