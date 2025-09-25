"use client";

import { useRef } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";

import Contact from "./Contact";
import Cursor from "./Cursor";
import Intro from "./Intro";
import MainProjects from "./MainProjects";
import Skills from "./Skills";
import SmallProjects from "./SmallProjects";
import Who from "./Who";
import { allDataType } from "../shared/types";

interface ClientHomePageProps {
  data: allDataType;
}

export default function ClientHomePage({ data }: ClientHomePageProps) {
  const containerRef = useRef(null);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        tablet: {
          smooth: true,
          breakpoint: 768,
        },
      }}
      watch={[]}
      containerRef={containerRef}
    >
      <Cursor />

      <div data-scroll-container ref={containerRef}>
        <Intro />
        <Who />
        <Skills skills={data.skills} />
        <MainProjects projects={data.projects} />
        <SmallProjects projects={data.smallProjects} />
        <Contact />
      </div>
    </LocomotiveScrollProvider>
  );
}
