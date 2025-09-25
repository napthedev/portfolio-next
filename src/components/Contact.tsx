"use client";

import { FC } from "react";
import { socialLinks } from "../shared/contants";

const Contact: FC = () => {
  return (
    <div className="pb-20">
      <h1 className="text-center text-4xl mt-14 md:mt-28 mb-10">
        Get in touch
      </h1>
      <div
        data-scroll
        data-scroll-speed="1"
        className="flex justify-center mx-[5vw] mt-8"
      >
        <div className="w-full max-w-[600px] text-center">
          <p className="text-lg mb-8 text-gray-400">
            I&apos;m always open to discussing new opportunities,
            collaborations, or just having a chat about web development.
          </p>

          <a
            href="mailto:phongna.dev@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1876d2] hover:bg-[#2884e0] text-white rounded-lg transition duration-300 mb-12 text-lg font-medium"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="22,6 12,13 2,6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Send me an email
          </a>

          <div className="border-t border-gray-700 pt-8">
            <h2 className="text-xl mb-6">Find me elsewhere</h2>
            <div className="flex justify-center gap-6 flex-wrap">
              {socialLinks.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 hover:bg-slate-900 p-4 rounded-lg transition duration-300 min-w-[100px]"
                >
                  <img
                    className="w-[40px] h-[40px] rounded-full"
                    src={item.icon}
                    alt={item.title}
                  />
                  <span className="text-sm text-gray-400">{item.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
