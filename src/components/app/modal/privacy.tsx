import { useState } from "react";

const PrivacyModal = () => {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [agreeActive, setAgreeActive] = useState<boolean>(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    const scrollPosition = scrollTop + clientHeight;
    const isScrollReached = scrollPosition >= scrollHeight;
    setAgreeActive(isScrollReached);
  };

  const handlerShowModal = () => {
    setShowModal(false);
  };

  if (!showModal) {
    return null; // Return null to hide the modal when `showModal` is false
  }

  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-50 flex bg-[#0008] backdrop-blur-[2px]">
      <div className="m-auto sm:w-[480px] w-[335px] p-8 sm:p-5 gap-4 flex flex-col items-center sm:rounded-[16px] rounded-xl border border-[#293745] bg-primaryBoxColor font-Barlow">
        <div className="text-white sm:text-[20px] text-[18px] font-bold leading-[1em]">
          Symblox Staking Terms of Service
        </div>
        <div className="text-primaryText sm:text-[16px] text-[14px] leading-[1em] font-normal">
          By clicking “I Agree” below, you agree to be bound by the terms of
          this Agreement. As such, you fully understand that:
        </div>
        <div
          className="overflow-y-auto will-change-scroll"
          onScroll={handleScroll}
        >
          <ul className="sm:h-[400px] h-[310px] sm:pl-[1.5em] pl-[1em] gap-[10px] flex flex-col items-center self-stretch">
            <li className="text-secondaryText sm:text-[16px] text-[14px] leading-[1em] font-normal list-disc">
              Symblox is a blockchain-based decentralized finance project. You
              are participating at your own risk.
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              Symblox is offered for use “as is” and without any guarantees
              regarding security. The protocol is made up of immutable code and
              can be accessed through a variety of user interfaces.
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              No central entity operates the Symblox protocol. Decisions related
              to the protocol are governed by a dispersed group of participants
              who collectively govern and maintain the protocol.
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              Symblox DAO does not unilaterally offer, maintain, operate,
              administer, or control any trading interfaces. The only user
              interfaces maintained by Symblox DAO are the governance and
              staking interfaces herein.
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              You can participate in the governance process by staking SYM
              tokens in accordance with the rules and parameters summarized
              here, and/or joining the Symblox Discord and contributing to the
              conversation.
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              The rules and parameters associated with the Symblox protocol and
              Symblox DAO governance are subject to change at any time.
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              Your use of Symblox is conditioned upon your acceptance to be
              bound by the Symblox Term of Use, which can be found here.
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              The laws that apply to your use of Symblox may vary based upon the
              jurisdiction in which you are located. We strongly encourage you
              to speak with legal counsel in your jurisdiction if you have any
              questions regarding your use of Symblox.
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              By entering into this agreement, you are not agreeing to enter
              into a partnership. You understand that Symblox is a decentralized
              protocol provided on an “as is” basis.
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              You hereby release all present and future claims against Symblox
              DAO related to your use of the protocol, the SYM token, SYM DAO
              governance, and any other facet of the protocol.
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              You agree to indemnify and hold harmless SYM DAO and its
              affiliates for any costs arising out of or relating to your use of
              the Symblox protocol.
            </li>
            <li className="text-secondaryText text-[14px] sm:text-[16px] leading-[1em] font-normal list-disc">
              You are not accessing the protocol from Burma (Myanmar), Cuba,
              Iran, Sudan, Syria, the Western Balkans, Belarus, Côte d’Ivoire,
              Democratic Republic of the Congo, Iraq, Lebanon, Liberia, Libya,
              North Korea, Russia, certain sanctioned areas of Ukraine, Somalia,
              Venezuela, Yemen, or Zimbabwe (collectively, “Prohibited
              Jurisdictions”), or any other jurisdiction listed as a Specially
              Designated National by the United States Office of Foreign Asset
              Control (“OFAC”).
            </li>
          </ul>
        </div>
        <button
          disabled={!agreeActive}
          onClick={handlerShowModal}
          className={`w-full px-8 py-[18px] justify-center items-center transition-all duration-300 ease-in-out h-10 flex rounded-[60px] border border-[#fff] text-[16px] font-bold leading-[1em] text-white ${
            !agreeActive ? "opacity-50 hover:cursor-not-allowed" : "opacity-100"
          }`}
        >
          I Agree
        </button>
      </div>
    </div>
  );
};

export default PrivacyModal;
