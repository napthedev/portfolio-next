import { FC } from "react";
import { allDataType } from "../shared/types";

interface SkillsProps {
  skills: allDataType["skills"];
}

const Skills: FC<SkillsProps> = ({ skills }) => {
  return (
    <div className="min-h-[70vh] px-[10vw] flex flex-col items-center justify-center z-[4]">
      <h1
        data-scroll
        data-scroll-speed="1.5"
        className="text-center text-3xl lg:text-4xl"
      >
        My skills & Knowledge
      </h1>
      <p
        data-scroll
        data-scroll-speed="1.3"
        className="description text-lg text-center my-[30px]"
      >
        Technologies and languages that I use to make my product everyday
      </p>
      <div className="grid justify-center grid-cols-4 md:grid-cols-6 gap-y-[10px] md:gap-y-[20px]">
        {skills.map((skill, index) => (
          <a
            key={skill.link}
            href={skill.link}
            target="_blank"
            rel="noopener noreferrer"
            className="item flex flex-col items-center justify-around group"
            data-scroll
            data-scroll-delay={Math.round((0.05 + index / 100) * 100) / 100}
            data-scroll-speed="3"
          >
            <img
              className="w-[60px] h-[60px] transition duration-300 group-hover:scale-110"
              src={skill.image}
              alt=""
            />
            <p className="text-center">{skill.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Skills;
