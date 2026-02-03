"use client";

import Contact from "./Contact";
import Cursor from "./Cursor";
import Intro from "./Intro";
import MainProjects from "./MainProjects";
import Skills from "./Skills";
import SmallProjects from "./SmallProjects";
import Who from "./WhoAmI";

export default function ClientHomePage() {
  return (
    <>
      <Cursor />

      <main>
        <Intro />
        <Who />
        <Skills />
        <MainProjects />
        <SmallProjects />
        <Contact />
      </main>
    </>
  );
}
