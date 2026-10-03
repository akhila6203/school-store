// src/pages/CancellationPolicy.jsx

import { Link } from "react-router-dom";

export default function CancellationPolicy() {
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
            Cancellations
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
              Cancellations
            </span>
          </div>
        </div>
      </section>

      {/* =========================================
          CANCELLATION CONTENT
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
        <div className="mx-auto max-w-[1200px]">
          <div
            className="
              space-y-7
              text-[15px]
              leading-[1.9]
              text-[#334766]

              sm:text-[16px]
              sm:leading-[2]
            "
          >
            {/* PARAGRAPH 1 */}
            <p>
              In case we receive a cancellation
              e-mail and by that time the order is
              already “Out for Delivery” by
              Brassleaf or the courier, then the
              order cannot be cancelled. Brassleaf
              has the complete right to decide
              whether an order can be cancelled or
              not. The customer agrees not to
              dispute the decision made by
              Brassleaf and shall agree upon
              decision regarding cancellation.
            </p>

            {/* PARAGRAPH 2 */}
            <p>
              Brassleaf reserves the right to
              refuse or cancel any order placed
              for a product that is listed at an
              incorrect price or for any other
              reason. This shall be regardless of
              whether the order has been confirmed
              and/or payment been received.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}