"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginForm from "@/components/partials/auth/login-form";
import Social from "@/components/partials/auth/social";
import useDarkMode from "@/hooks/useDarkMode";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

// image import

const Login = () => {
  const [isDark] = useDarkMode();
  const router = useRouter();
  const { isAuth } = useSelector((state) => state.auth);

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
                Todo App{" "}
                <span className="text-slate-800 dark:text-slate-400 font-bold">
                  developed by Imron Reviady
                </span>
              </h4>
            </div>
            <div className="absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]">
              <img
                src="/assets/images/auth/ils1.svg"
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <div className="right-column relative">
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
                <div className="text-center 2xl:mb-10 mb-4">
                  <h4 className="font-medium">Sign in</h4>
                  <div className="text-slate-500 text-base">
                    Sign in to your account to start using ToDo App
                  </div>
                </div>
                <LoginForm />
                <div className="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm">
                  Don’t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >
                    Sign up
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

export default Login;
