import type { GetStaticProps, NextPage } from "next";

import Contact from "../components/Contact";
import Cursor from "../components/Cursor";
import { GET_ALL_DATA } from "../graphql/queries";
import Intro from "../components/Intro";
import MainProjects from "../components/MainProjects";
import Skills from "../components/Skills";
import SmallProjects from "../components/SmallProjects";
import Who from "../components/Who";
import { allDataType } from "../shared/types";
import { client } from "../graphql/client";

interface HomeProps {
  data: allDataType;
}

const Home: NextPage<HomeProps> = ({ data }) => {
  return (
    <>
      <Cursor />
      <div data-scroll-container>
        <Intro />
        <Who />
        <Skills skills={data.skills} />
        <MainProjects projects={data.projects} />
        <SmallProjects projects={data.smallProjects} />
        <Contact />
      </div>
    </>
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
