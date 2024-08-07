"use client";

import { cn } from "@/lib/utils";
import Container from "./container";
import Link from "next/link";
import MainNav from "./main-nav";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface HeaderProps {
  userId: string | null;
}

const Header = ({ userId }: HeaderProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isPageScrolled = window.scrollY > 1;
      setIsScrolled(isPageScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header
      className={cn(
        "fixed w-full z-40 transition bg-transparent",
        isScrolled && "left-0 top-0 bg-white dark:bg-black shadow-lg"
      )}
    >
      <Container>
        <div
          className={cn(
            "h-16 px-4 sm:p-6 lg:px-12 flex items-center",
            !isDesktop && "flex items-center justify-between mx-6"
          )}
        >
          <Link
            href={"/"}
            className="text-lg uppercase flex gap-x-2 font-bold md:text-neutral-700 dark:text-white md:text-xl justify-start items-center"
          >
            {process.env.NEXT_PUBLIC_APP_NAME}
          </Link>

          {/* Main nav bar */}
          <MainNav
            className="justify-end"
            isScrolled={isScrolled}
            userId={userId}
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
