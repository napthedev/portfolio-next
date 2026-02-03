"use client";

import { FC, Fragment } from "react";

import { BiChevronsDown } from "react-icons/bi";
import Canvas from "./Canvas";
import { characters } from "../data/animation-characters";
import { m, useReducedMotion } from "framer-motion";

const Intro: FC = () => {
  const reduceMotion = useReducedMotion();
  const pathDraw = reduceMotion
    ? { initial: { pathLength: 1 }, animate: { pathLength: 1 }, transition: { duration: 0 } }
    : { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 1 } };
  const fillDraw = reduceMotion
    ? { initial: { fill: "#ffffff" }, animate: { fill: "#ffffff" }, transition: { duration: 0 } }
    : { initial: { fill: "#ffffff00" }, animate: { fill: "#ffffff" }, transition: { duration: 0.6 } };
  const fadeIn = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, transition: { duration: 0 } }
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } };

  return (
    <div className="relative h-screen flex justify-center items-center flex-col gap-5">
      <Canvas />

      <svg
        className="h-[10vw] max-h-[100px] min-h-[60px] max-w-[100vw] z-[1]"
        viewBox="0 0 276 97"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {characters.map((character, index) => (
          <Fragment key={character}>
            <m.path
              initial={pathDraw.initial}
              animate={pathDraw.animate}
              transition={{
                ...pathDraw.transition,
                delay: reduceMotion ? 0 : index / 10,
              }}
              d={character}
              fill="none"
              stroke="#FFF"
              strokeWidth="3"
            ></m.path>
            <m.path
              initial={fillDraw.initial}
              animate={fillDraw.animate}
              transition={{
                ...fillDraw.transition,
                delay: reduceMotion ? 0 : 0.7 + index / 10,
              }}
              fill="none"
              d={character}
            ></m.path>
          </Fragment>
        ))}
      </svg>
      <m.p
        data-scroll
        data-scroll-speed="1"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: reduceMotion ? 0 : 1.4 }}
        className="text-3xl text-center z-[1] overflow-hidden"
      >
        {`Just another tech enthusiast`}
      </m.p>

      <m.a
        data-scroll
        data-scroll-speed="2"
        data-scroll-delay="1"
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        transition={{ ...fadeIn.transition, delay: reduceMotion ? 0 : 1.4 }}
        className="absolute left-[calc(50%-23px)] bottom-[10vh] cursor-pointer"
        href="#who"
        data-scroll-to
      >
        <BiChevronsDown className="animate-bounce" size={56} />
      </m.a>
    </div>
  );
};

export default Intro;
