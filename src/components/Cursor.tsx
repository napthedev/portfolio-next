import { FC, useEffect, useRef } from "react";

const Cursor: FC = () => {
  const isFirstMove = useRef(true);

  const cursorRef = useRef<HTMLDivElement>(null);

  const realMouse = useRef({
    x: 0,
    y: 0,
  });
  const displayedMouse = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    window.addEventListener("mousemove", (e) => {
      if (cursorRef.current) {
        if (isFirstMove.current) {
          cursorRef.current.style.display = "block";
          displayedMouse.current.x = e.clientX;
          displayedMouse.current.y = e.clientY;
          isFirstMove.current = false;
        }

        realMouse.current.x = e.clientX;
        realMouse.current.y = e.clientY;
      }
    });

    const updateMouse = () => {
      requestAnimationFrame(updateMouse);

      displayedMouse.current.x +=
        (realMouse.current.x - displayedMouse.current.x) * 0.1;
      displayedMouse.current.y +=
        (realMouse.current.y - displayedMouse.current.y) * 0.1;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${displayedMouse.current.x}px`;
        cursorRef.current.style.top = `${displayedMouse.current.y}px`;
      }
    };

    updateMouse();
  }, []);

  return (
    <div
      ref={cursorRef}
      className="w-7 h-7 bg-transparent border border-white rounded-full fixed z-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden transition duration-75"
    ></div>
  );
};

export default Cursor;
