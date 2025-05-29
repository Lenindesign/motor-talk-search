
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

// Mobile-only sticky search bar that animates on scroll direction
const NAV_HEIGHT = 56; // px, adjust if your nav bar is taller

function useScrollDirection(throttleMs = 80) {
  const [direction, setDirection] = useState("still");
  const lastY = React.useRef(typeof window !== "undefined" ? window.scrollY : 0);

  useEffect(() => {
    let ticking = false;
    let lastDir = "still";
    let lastTime = Date.now();

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        let dir = "still";
        if (y > lastY.current + 5) dir = "down";
        else if (y < lastY.current - 5) dir = "up";
        else dir = "still";

        if (dir !== lastDir && Date.now() - lastTime > throttleMs) {
          setDirection(dir);
          lastDir = dir;
          lastTime = Date.now();
        }
        lastY.current = y;
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [throttleMs]);

  return direction;
}

interface MobileStickySearchProps {
  onSearch?: (query: string) => void;
  isLoading?: boolean;
}

const MobileStickySearch: React.FC<MobileStickySearchProps> = ({ 
  onSearch = () => {}, 
  isLoading = false 
}) => {
  const direction = useScrollDirection(80);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.scrollY < 10) setVisible(true);
    else if (direction === "down") setVisible(false);
    else if (direction === "up") setVisible(true);
  }, [direction]);

  return (
    <div
      className={`
        fixed left-0 right-0 z-40 bg-white
        transition-transform duration-300 ease-[cubic-bezier(.4,0,.2,1)]
        ${visible ? "translate-y-0" : "-translate-y-full"}
        shadow
        sm:hidden
      `}
      style={{
        top: NAV_HEIGHT,
        willChange: "transform",
      }}
    >
      <div className="py-2 w-full">
        <div className="rounded-2xl bg-white px-4 shadow">
          <SearchBar onSearch={onSearch} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default MobileStickySearch;
