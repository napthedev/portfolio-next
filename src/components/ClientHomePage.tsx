"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

import Contact from "./Contact";
import Cursor from "./Cursor";
import Intro from "./Intro";
import MainProjects from "./MainProjects";
import Skills from "./Skills";
import SmallProjects from "./SmallProjects";
import Who from "./WhoAmI";

export default function ClientHomePage() {
  const containerRef = useRef(null);
  const [useSmooth, setUseSmooth] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setUseSmooth(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const options = useMemo(
    () => ({
      smooth: useSmooth,
      tablet: {
        smooth: false,
        breakpoint: 768,
      },
      smartphone: {
        smooth: false,
      },
    }),
    [useSmooth]
  );

  return (
    <LocomotiveScrollProvider
      options={options}
      watch={[]}
      containerRef={containerRef}
    >
      <Cursor />

      <div data-scroll-container ref={containerRef}>
        <Intro />
        <Who />
        <Skills />
        <MainProjects />
        <SmallProjects />
        <Contact />
      </div>
    </LocomotiveScrollProvider>
  );
}
