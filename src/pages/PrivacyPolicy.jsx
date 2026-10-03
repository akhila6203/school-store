// src/pages/PrivacyPolicy.jsx

import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <main className="bg-white">
      {/* =========================================
          PAGE HEADER / BREADCRUMB
          Heading + Breadcrumb CENTER
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
            Privacy Policy
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
              Privacy Policy
            </span>
          </div>
        </div>
      </section>

      {/* =========================================
          PRIVACY POLICY CONTENT
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
        <div className="mx-auto max-w-[1200px]">
          {/* =====================================
              PROTECTION STRATEGY
          ====================================== */}
          <section>
            <h2
              className="
                text-[20px]
                font-black
                text-[#07152D]

                sm:text-[22px]
              "
            >
              Protection Strategy
            </h2>

            <p
              className="
                mt-4
                text-[15px]
                leading-[1.9]
                text-[#334766]

                sm:text-[16px]
                sm:leading-[2]
              "
            >
              We protect your privacy: Our
              protection strategy is basic and
              straightforward: any data you share
              with us, stays with us. We don’t
              lease, sell, loan, or in any case
              convey your own data to anybody
              under any circumstance. This
              incorporates your contact data, as
              well as unambiguous request data.
              We limit information admittance to
              the individuals who truly need to
              be aware. Inside our association,
              your own information is open to
              just a predetermined number of
              representatives with exceptional
              access honors. Despite the fact
              that we may, now and again,
              incorporate general segment data in
              light of your request, this data is
              shared inside our association just
              and has no recognizable individual
              information related with it.
            </p>
          </section>

          {/* =====================================
              INFORMATION COLLECTED
          ====================================== */}
          <section
            className="
              mt-8

              sm:mt-10
            "
          >
            <h2
              className="
                text-[20px]
                font-black
                text-[#07152D]

                sm:text-[22px]
              "
            >
              Information Collected:
            </h2>

            <p
              className="
                mt-4
                text-[15px]
                leading-[1.9]
                text-[#334766]

                sm:text-[16px]
                sm:leading-[2]
              "
            >
              We require the following fundamental
              information about you in order for
              you to be able to place an order on
              our website: Your Most memorable
              Name, Your Last Name, and Your
              Location, City, Postal division,
              State, Nation, Telephone Number and
              Contact Email address. Aside from
              this, our frameworks assemble
              specific insights concerning your
              PC’s web association like your IP
              address when you visit our website.
              Your IP address doesn’t recognize
              you actually. We utilize this data
              to convey our pages to you upon
              demand, to modify our site
              according to your advantage, to
              ascertain the quantity of guests on
              our site and to know the geographic
              areas from where our guests come.
              We permit no unapproved individual
              or association be it different
              individuals, guests, and anybody
              not in that frame of mind to
              utilize any data gathered from you.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}