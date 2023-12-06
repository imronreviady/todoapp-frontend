"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import useDarkMode from "@/hooks/useDarkMode";
import RegForm from "@/components/partials/auth/reg-from";
import Social from "@/components/partials/auth/social";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const Register = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const router = useRouter();
  const [isDark] = useDarkMode();

  useEffect(() => {
    console.log("isAuth", isAuth);
    if (isAuth) {
      router.push("/todo");
    }
    //darkMode;
  }, [isAuth]);

  return (
    <>
      <ToastContainer />
      <div className="loginwrapper">
        <div className="lg-inner-column">
          <div className="left-column relative z-[1]">
            <div className="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
              <Link href="/">
                <img
                  src={
                    isDark
                      ? "/assets/images/logo/todo-logo.png"
                      : "/assets/images/logo/todo-logo.png"
                  }
                  alt=""
                  width={50}
                  className="mb-10"
                />
              </Link>

              <h4>
                Unlock your{" "}
                <span className="text-slate-800 dark:text-slate-400 font-bold">
                  productivity
                </span>
              </h4>
            </div>
            <div className="absolute left-0 bottom-[-130px] h-full w-full z-[-1]">
              <img
                src="/assets/images/auth/ils1.svg"
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="right-column relative bg-white dark:bg-slate-800">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link href="/">
                    <img
                      src={
                        isDark
                          ? "/assets/images/logo/logo-white.svg"
                          : "/assets/images/logo/logo.svg"
                      }
                      alt=""
                      className="mx-auto"
                    />
                  </Link>
                </div>
                <div className="text-center 2xl:mb-10 mb-5">
                  <h4 className="font-medium">Sign up</h4>
                  <div className="text-slate-500 dark:text-slate-400 text-base">
                    Create an account to start using ToDo App
                  </div>
                </div>
                <RegForm />
                <div className="max-w-[225px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm">
                  Already registered?
                  <Link
                    href="/"
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
              <div className="auth-footer text-center">
                Copyright 2023, Imron Reviady.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
