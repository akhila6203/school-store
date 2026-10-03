// src/components/AccountSidebar.jsx

import {
  Home,
  LogOut,
  MapPin,
  Package,
  UserRound,
} from "lucide-react";

import { useStore } from "../context/StoreContext";

export default function AccountSidebar({
  activeTab,
  setActiveTab,
}) {
  const {
    student,
    profile,
    logout,
  } = useStore();

  const displayName =
    profile?.name ||
    student?.name ||
    "Student";

  const displayEmail =
    profile?.email ||
    student?.email ||
    "";

  const displayPhone =
    profile?.phone ||
    student?.phone ||
    "";

  const displayPhoto =
    profile?.photo || "";

  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      icon: Home,
    },
    {
      id: "orders",
      label: "My Orders",
      icon: Package,
    },
    {
      id: "addresses",
      label: "Addresses",
      icon: MapPin,
    },
  ];

  return (
    <aside
      className="
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-[#DCE3ED]
        bg-white
        shadow-sm
      "
    >
      {/* =========================================
          PROFILE AREA

          MOBILE + TABLET:
          Profile image LEFT
          Name / Email / Phone RIGHT

          DESKTOP:
          Profile image + details horizontal
      ========================================== */}
      <div
        className="
          bg-[#07152D]
          px-4
          py-4
          text-white

          sm:px-5
          sm:py-5

          lg:px-5
          lg:py-6
        "
      >
        <div
          className="
            flex
            w-full
            items-center
            gap-3

            sm:gap-4

            lg:gap-3
          "
        >
          {/* =====================================
              PROFILE IMAGE
          ====================================== */}
          <div
            className="
              flex
              h-[58px]
              w-[58px]
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border-2
              border-[#4F39F6]
              bg-[#0D1C38]

              sm:h-[64px]
              sm:w-[64px]

              lg:h-[58px]
              lg:w-[58px]
            "
          >
            {displayPhoto ? (
              <img
                src={displayPhoto}
                alt={displayName}
                className="
                  h-full
                  w-full
                  object-cover
                "
              />
            ) : (
              <UserRound
                size={27}
                strokeWidth={1.8}
                className="text-white"
              />
            )}
          </div>

          {/* =====================================
              PROFILE INFORMATION
          ====================================== */}
          <div
            className="
              min-w-0
              flex-1
            "
          >
            <h3
              className="
                truncate
                text-[15px]
                font-extrabold
                leading-tight
                text-white

                sm:text-[16px]

                lg:text-[15px]
              "
            >
              {displayName}
            </h3>

            {displayEmail && (
              <p
                className="
                  mt-1.5
                  truncate
                  text-[11px]
                  font-medium
                  leading-tight
                  text-[#B8C3D7]

                  sm:text-[12px]

                  lg:text-[11px]
                "
              >
                {displayEmail}
              </p>
            )}

            {displayPhone && (
              <p
                className="
                  mt-1
                  text-[11px]
                  font-medium
                  leading-tight
                  text-[#B8C3D7]

                  sm:text-[12px]

                  lg:text-[11px]
                "
              >
                {displayPhone}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* =========================================
          ACCOUNT MENU
      ========================================== */}
      <div
        className="
          p-2.5

          sm:p-3
        "
      >
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setActiveTab(item.id)
                }
                className={`
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-left
                  text-[13px]
                  font-semibold
                  transition-all
                  duration-200

                  sm:px-3.5
                  sm:py-3
                  sm:text-[14px]

                  ${
                    active
                      ? `
                        bg-[#F0EEFF]
                        text-[#4F39F6]
                      `
                      : `
                        text-[#66758F]
                        hover:bg-[#F7F9FC]
                        hover:text-[#07152D]
                      `
                  }
                `}
              >
                {/* ICON */}
                <span
                  className={`
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    transition

                    ${
                      active
                        ? `
                          bg-white
                          text-[#4F39F6]
                          shadow-sm
                        `
                        : `
                          bg-transparent
                          text-[#71809D]
                          group-hover:bg-white
                        `
                    }
                  `}
                >
                  <Icon
                    size={17}
                    strokeWidth={1.9}
                  />
                </span>

                {/* MENU NAME */}
                <span className="flex-1">
                  {item.label}
                </span>

                {/* ACTIVE DOT */}
                {active && (
                  <span
                    className="
                      h-1.5
                      w-1.5
                      shrink-0
                      rounded-full
                      bg-[#4F39F6]
                    "
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* =========================================
          LOGOUT
      ========================================== */}
      <div
        className="
          border-t
          border-[#E8EDF4]
          p-2.5

          sm:p-3
        "
      >
        <button
          type="button"
          onClick={logout}
          className="
            group
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-left
            text-[13px]
            font-semibold
            text-[#66758F]
            transition-all
            duration-200

            hover:bg-red-50
            hover:text-[#DC3545]

            sm:px-3.5
            sm:py-3
            sm:text-[14px]
          "
        >
          <span
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-[#71809D]
              transition

              group-hover:bg-white
              group-hover:text-[#DC3545]
            "
          >
            <LogOut
              size={17}
              strokeWidth={1.9}
            />
          </span>

          <span className="flex-1">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}