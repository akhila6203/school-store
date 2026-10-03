// src/pages/RefundPolicy.jsx

import { Link } from "react-router-dom";

export default function RefundPolicy() {
  return (
    <main className="bg-white">
      {/* =========================================
          PAGE HEADER / BREADCRUMB
          CENTER ALIGNMENT
      ========================================== */}
      <section className="bg-[#07152D]">
        <div
          className="
            mx-auto
            max-w-[1240px]
            px-5
            py-10
            text-center

            sm:px-8
            sm:py-11

            lg:px-10
            lg:py-12
          "
        >
          <h1
            className="
              text-[30px]
              font-black
              leading-tight
              text-white

              sm:text-[34px]

              lg:text-[38px]
            "
          >
            Refund Policy
          </h1>

          {/* BREADCRUMB */}
          <div
            className="
              mt-3
              flex
              flex-wrap
              items-center
              justify-center
              gap-2
              text-[14px]
            "
          >
            <Link
              to="/"
              className="
                font-medium
                text-[#DCE3ED]
                transition
                hover:text-[#8B7CFF]
              "
            >
              Home
            </Link>

            <span className="text-[#71809D]">
              ›
            </span>

            <span className="font-semibold text-white">
              Refund Policy
            </span>
          </div>
        </div>
      </section>

      {/* =========================================
          REFUND POLICY CONTENT
      ========================================== */}
      <section
        className="
          bg-white
          px-5
          py-12

          sm:px-8
          sm:py-14

          lg:px-10
          lg:py-16
        "
      >
        {/* CONTENT CENTER */}
        <div
          className="
            mx-auto
            max-w-[1200px]
          "
        >
          <div
            className="
              text-[15px]
              leading-[1.9]
              text-[#334766]

              sm:text-[16px]
              sm:leading-[2]
            "
          >
            {/* =====================================
                POLICY CONTENT
            ====================================== */}
            <p>
              All forward and return shipping
              costs, which are determined by the
              customer’s address and the shipping
              costs paid, will be deducted from
              the refund. Refund on the items is
              not allowed and only the exchange
              of the items is allowed at the
              BRASSLEAF STORE.
            </p>

            {/* =====================================
                ADDRESS
            ====================================== */}
            <div className="mt-7">
              <p
                className="
                  font-black
                  text-[#07152D]
                "
              >
                Address:
              </p>

              <p className="mt-1">
                6-3-666/B, Pillar No. #1118,
                Panjagutta, Hyderabad – 500082,
                Opp. Nims Hospital.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}