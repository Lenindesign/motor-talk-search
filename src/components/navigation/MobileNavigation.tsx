
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
            <p className="typography-caption">My Garage</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/chat" aria-label="Chat" className="text-white p-2 focus:outline-none hover:bg-motortrend-dark/50 rounded-md transition-colors mr-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="typography-caption">Chat with Motor Talk</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/profile" aria-label="Profile" className="text-white p-2 focus:outline-none hover:bg-motortrend-dark/50 rounded-md transition-colors mr-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://d2kde5ohu8qb21.cloudfront.net/files/6839e7e53277480008013d30/greg.jpg" alt="Greg Driver" />
                <AvatarFallback className="bg-neutral-4 text-white typography-small">GD</AvatarFallback>
              </Avatar>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="typography-caption">Profile</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default MobileNavigation;
