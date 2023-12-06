import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "@/components/partials/auth/store";
import SwitchDark from "../header/Tools/SwitchDark";

const MobileFooter = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="bg-white bg-no-repeat custom-dropshadow footer-bg dark:bg-slate-700 flex justify-around items-center backdrop-filter backdrop-blur-[40px] fixed left-0 w-full z-[9999] bottom-0 py-[12px] px-4">
      <SwitchDark />
      <Link
        href="profile"
        className="relative bg-white bg-no-repeat backdrop-filter backdrop-blur-[40px] rounded-full footer-bg dark:bg-slate-700 h-[65px] w-[65px] z-[-1] -mt-[40px] flex justify-center items-center"
      >
        <div className="h-[50px] w-[50px] rounded-full relative left-[0px] top-[0px] custom-dropshadow">
          <img
            src="/assets/images/logo/todo-logo.png"
            alt=""
            className={` w-full h-full rounded-full
          ${
            router.pathname === "profile"
              ? "border-2 border-primary-500"
              : "border-2 border-slate-100"
          }
              `}
          />
        </div>
      </Link>
      <div onClick={() => dispatch(handleLogout(false))}>
        <div>
          <span
            className={` relative cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center mb-1
      ${
        router.pathname === "notifications"
          ? "text-primary-500"
          : "dark:text-white text-slate-900"
      }
          `}
          >
            <Icon icon="heroicons-outline:login" />
          </span>
          <span
            className={` block text-[11px]
         ${
           router.pathname === "notifications"
             ? "text-primary-500"
             : "text-slate-600 dark:text-slate-300"
         }
        `}
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;
