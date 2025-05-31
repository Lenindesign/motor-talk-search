
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import HamburgerMenu from "./HamburgerMenu";

const MobileNavigation = () => {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex items-center">
        <HamburgerMenu />
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/garage" aria-label="My Garage" className="text-white p-2 focus:outline-none hover:bg-motortrend-dark/50 rounded-md transition-colors ml-1 mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 -960 960 960" width="22" fill="currentColor"><path d="M160-120v-480l320-240 320 240v480h-80v-440L480-740 240-560v440h-80Zm200-80h240v-80H360v80Zm0-160h240v-80H360v80Zm-80 240v-400h400v400H280Z"/></svg>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>My Garage</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/profile" aria-label="Profile" className="text-white p-2 focus:outline-none hover:bg-motortrend-dark/50 rounded-md transition-colors mr-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://d2kde5ohu8qb21.cloudfront.net/files/6839e7e53277480008013d30/greg.jpg" alt="Greg Driver" />
                <AvatarFallback className="bg-gray-600 text-white text-xs">GD</AvatarFallback>
              </Avatar>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Profile</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default MobileNavigation;
