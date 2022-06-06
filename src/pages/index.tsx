import type { GetStaticProps, NextPage } from "next";

import Contact from "../components/Contact";
import Cursor from "../components/Cursor";
import { GET_ALL_DATA } from "../graphql/queries";
import Intro from "../components/Intro";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import MainProjects from "../components/MainProjects";
import Skills from "../components/Skills";
import SmallProjects from "../components/SmallProjects";
import Who from "../components/Who";
import { allDataType } from "../shared/types";
import { client } from "../graphql/client";
import { useRef } from "react";

interface HomeProps {
  data: allDataType;
}

const Home: NextPage<HomeProps> = ({ data }) => {
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
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.request(GET_ALL_DATA);

  return {
    props: {
      data,
    },
    revalidate: 3600,
  };
};
