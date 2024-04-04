import { useState } from "react";

const RoadmapFragment = () => {

  const [activeItem, setActiveItem] = useState(0);

  const handlePrev = () => {
    if (activeItem !== 0)
      setActiveItem((prev) => (prev - 1 + RoadMaps.length) % RoadMaps.length);
  };

  const handleNext = () => {
    if (activeItem !== RoadMaps.length - 1)
      setActiveItem((prev) => (prev + 1) % RoadMaps.length);
  };

  const RoadMaps = [
    {
      title: '1st Quarter 2024',
      content: 'Donec et mauris ullamcorper, condimentum arcu non, imperdiet turpis. Donec at ultrices nisi. Fusce nec lectus sapien. Donec nec tortor velit. Vestibulum gravida pharetra enim, at vulputate orci mollis vitae.'
    },
    {
      title: '2nd Quarter 2024',
      content: 'Donec et mauris ullamcorper, condimentum arcu non, imperdiet turpis. Donec at ultrices nisi. Fusce nec lectus sapien. Donec nec tortor velit. Vestibulum gravida pharetra enim, at vulputate orci mollis vitae.'
    },
    {
      title: '3rd Quarter 2024',
      content: 'Donec et mauris ullamcorper, condimentum arcu non, imperdiet turpis. Donec at ultrices nisi. Fusce nec lectus sapien. Donec nec tortor velit. Vestibulum gravida pharetra enim, at vulputate orci mollis vitae.'
    }
  ]

  return (
    <div className="px-6 md:px-24 lg:px-36 font-Barlow relative">
      <img className='absolute inset-0 m-auto -z-10' src="/assets/SVG/RoadMapEllipse.svg" alt="arrow" />
      <div className="mt-24 flex flex-col justify-center items-center">
        <p className="text-white font-semibold text-4xl">Roadmap</p>
        <p className="text-primaryText text-center mt-4">Expanding assets, platform growth, and building global partnerships.</p>
      </div>
      <div className="mt-12 md:hidden overflow-hidden flex md:grid gap-8 md:grid-cols-3">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${activeItem * 100}%)` }}
        >
          {RoadMaps.map((item, index) => (
            <div className="min-w-full flex flex-col font-Barlow gap-y-4" key={index}>
              <img className="w-full" src="/assets/SVG/RoadMapHeaderArrow.svg" alt="arrow" />
              <p className="text-white text-xl">{item.title}</p>
              <p className="text-primaryText">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 hidden md:flex overflow-hidden grid gap-8 grid-cols-3">
        {RoadMaps.map((item, index) => (
          <div className="flex flex-col font-Barlow gap-y-4" key={index}>
            <img className="w-full" src="/assets/SVG/RoadMapHeaderArrow.svg" alt="arrow" />
            <p className="text-white text-xl">{item.title}</p>
            <p className="text-primaryText">{item.content}</p>
          </div>
        ))}
      </div>
      <div className="flex md:hidden justify-center gap-x-4 mt-8 items-center">
        <button onClick={handlePrev}>
          <img
            className={`w-10 ${activeItem === 0 ? '-translate-y-[1px]' : 'rotate-180'}`}
            src={activeItem === 0 ? "/assets/SVG/RoadMapArrowGray.svg" : "/assets/SVG/RoadMapArrowWhite.svg"}
            alt="Previous"
          />
        </button>
        <button onClick={handleNext}>
          <img
            className={`w-10 ${activeItem === RoadMaps.length - 1 ? 'rotate-180 translate-y-[1px]' : ''}`}
            src={activeItem === RoadMaps.length - 1 ? "/assets/SVG/RoadMapArrowGray.svg" : "/assets/SVG/RoadMapArrowWhite.svg"}
            alt="Next"
          />
        </button>
      </div>
    </div>
  )
};

export default RoadmapFragment;
