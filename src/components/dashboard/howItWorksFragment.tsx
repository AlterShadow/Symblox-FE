const HowItWorksFragment = () => {
    return (
        <div className="pt-16 px-16 md:px-24 lg:px-36">
            <div className="justify-center relative items-center flex">
                <div className="text-primaryText hidden md:flex md:flex-col max-w-xl">
                    <p className="text-white font-Barlow text-[16px]">How It Works</p>
                    <div className="text-4xl">
                        <span className="text-gradient font-bold">Smart Contracts</span>
                        <span className="font-normal">&nbsp;and</span>
                        <span className="text-gradient font-bold">&nbsp;SYX Rewards</span>
                        <span className="font-normal"> fuel our tech, enabling farming, minting, and trading.</span>
                    </div>
                </div>
                <div className="text-primaryText flex flex-col text-center md:hidden max-w-xl">
                    <p className="text-white font-Barlow text-[12px] -translate-y-4">HOW IT WORKS</p>
                    <div className="flex flex-col text-3xl">
                        <span className="text-gradient font-bold">Smart Contracts</span>
                        <span className="font-normal text-lg">&nbsp;and</span>
                        <span className="text-gradient font-bold">&nbsp;SYX Rewards</span>
                        <span className="font-normal text-lg"> fuel our tech, enabling farming, minting, and trading.</span>
                    </div>
                </div>
                <div className="-z-10 absolute md:relative w-64 md:w-full inset-0 translate-x-32 m-auto opacity-60 md:max-w-lg">
                    <img src='/assets/Image/HowItWorksBackground.png' alt='howitworksbackground' />
                </div>
                <div className="absolute md:-top-8 w-[1024px] md:left-8 lg:left-24 xl:left-32 md:w-full">
                    <img src="/assets/SVG/HowItWorksEllipse.svg" alt='ellipse'/>
                </div>
            </div>
        </div>
    )
}

export default HowItWorksFragment;