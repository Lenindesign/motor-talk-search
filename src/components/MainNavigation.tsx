
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const navigationItems = [
  { name: "News", href: "#news" },
  { name: "Reviews", href: "#reviews" },
  { name: "Buyer's Guide", href: "#buyers-guide" },
  { name: "Videos", href: "#videos" },
  { name: "Magazines", href: "#magazines" },
  { name: "The Future", href: "#the-future" },
  { name: "Events", href: "#events" },
];

const MainNavigation = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button
            aria-label="Toggle menu"
            className="flex h-8 w-8 items-center justify-center rounded-md text-white"
          >
            <Menu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-motortrend-dark">
          <nav className="flex flex-col space-y-4 pt-10">
            {navigationItems.map((item) => (
              <SheetClose asChild key={item.name}>
                <a
                  href={item.href}
                  className="block px-4 py-2 text-lg font-medium text-white hover:text-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <NavigationMenu className="hidden sm:flex">
      <NavigationMenuList className="gap-x-2">
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuLink
              href={item.href}
              className={cn(
                "group inline-flex h-9 w-max items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-motortrend-dark/50"
              )}
            >
              {item.name}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
