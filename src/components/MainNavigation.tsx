
import React from "react";
import { useIsMobile } from "../hooks/use-mobile";
import MobileNavigation from "./navigation/MobileNavigation";
import DesktopNavigation from "./navigation/DesktopNavigation";

const MainNavigation = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileNavigation />;
  }

  return <DesktopNavigation />;
};

export default MainNavigation;
