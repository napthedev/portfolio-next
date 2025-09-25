"use client";

import { FC } from "react";
import { generateIconUrl } from "../lib/utils";
import { SKILLS } from "../data/skills";

const Skills: FC = () => {
  return (
    <div className="lg:min-h-[70vh] px-[5vw] py-[80px] flex flex-col items-center justify-center z-[4]">
      <h1
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed="-0.6"
        className="text-center text-3xl lg:text-4xl"
      >
        My skills & Knowledge
      </h1>
      <p
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed="0.6"
        className="description text-lg text-center my-[30px]"
      >
        Technologies and languages that I use to create my projects everyday
      </p>
      <div className="grid justify-center grid-cols-4 md:grid-cols-6 gap-y-[10px] md:gap-y-[20px]">
        {SKILLS.map((skill) => (
          <div
            key={skill.title}
            className="item flex flex-col items-center justify-around group"
          >
            <img
              className="w-[60px] h-[60px] transition duration-300 group-hover:scale-110"
              src={generateIconUrl(skill.image)}
              alt=""
            />
            <p className="text-center">{skill.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
