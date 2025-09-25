"use client";

import { FC } from "react";
import Image from "next/image";

const Who: FC = () => {
  return (
    <div
      id="who"
      className="flex gap-[5vw] px-[5vw] lg:px-[15vw] z-[2] lg:min-h-[70vh] items-center justify-center flex-col md:flex-row"
    >
      <Image
        data-scroll
        data-scroll-speed="2"
        className="w-[225px] h-[225px] rounded-full"
        src="/avatar.jpg"
        alt="Phong's avatar"
        width={225}
        height={225}
        priority
      />
      <div>
        <h1 data-scroll data-scroll-speed="0.5" className="title text-[40px]">
          Who am I?
        </h1>

        <p data-scroll className="text-lg text-gray-200" id="story">
          My name is Nguyen Anh Phong, and I am a software developer based in
          Hanoi, Vietnam. I first began exploring programming during high
          school, starting with web development. Since then, I have worked on
          projects ranging from simple HTML pages to advanced applications such
          as a React library. I am currently pursuing a degree in Electrical
          Engineering while continuing to expand my expertise in technology.
        </p>
      </div>
    </div>
  );
};

export default Who;
