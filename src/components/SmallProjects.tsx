import { FC } from "react";
import { allDataType } from "../shared/types";

interface SmallProjectsProps {
  projects: allDataType["smallProjects"];
}

const SmallProjects: FC<SmallProjectsProps> = ({ projects }) => {
  return (
    <div className="flex justify-center mx-[5vw] mt-16">
      <div className="w-full max-w-[1100px]">
        <h1 className="text-4xl text-center">More of my works</h1>
        <p className="mt-4 mb-10 text-gray-400 text-lg text-center">{`I'm sure you will like some of my hobby projects`}</p>

        <div
          data-scroll
          data-scroll-speed="1"
          className="grid gap-2 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))]"
        >
          {projects.map((project) => (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3 hover:bg-slate-900 p-3 transition duration-300"
              key={project.id}
            >
              <img
                className="h-[40px] w-[40px] my-1 object-cover"
                src={project.icon.url}
                alt=""
              />
              <div>
                <h1>{project.title}</h1>
                <p className="text-gray-400">{project.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmallProjects;
