"use client";

import React, { Fragment } from "react";
import useDarkMode from "@/hooks/useDarkMode";
import Link from "next/link";
import useWidth from "@/hooks/useWidth";

const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
      <Link href="/analytics">
        <React.Fragment>
          {width >= breakpoints.xl ? (
            <img
              src={
                isDark
                  ? "/assets/images/logo/todo-logo.png"
                  : "/assets/images/logo/todo-logo.png"
              }
              alt=""
            />
          ) : (
            <img
              src={
                isDark
                  ? "/assets/images/logo/todo-logo.png"
                  : "/assets/images/logo/todo-logo.png"
              }
              alt=""
              width={30}
            />
          )}
        </React.Fragment>
      </Link>
    </div>
  );
};

export default Logo;
