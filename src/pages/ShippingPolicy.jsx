// src/pages/ShippingPolicy.jsx

import { Link } from "react-router-dom";

export default function ShippingPolicy() {
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
            Shipping Policy
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
              Shipping Policy
            </span>
          </div>
        </div>
      </section>

      {/* =========================================
          SHIPPING POLICY CONTENT
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
              text-[15px]
              leading-[1.9]
              text-[#334766]

              sm:text-[16px]
              sm:leading-[2]
            "
          >
            {/* INTRO */}
            <p>
              Shipping charges vary based on the
              customer shipping address/city. All
              these charges are only applied on
              our retail section.
            </p>

            {/* =====================================
                NUMBERED RULES
            ====================================== */}
            <ol
              className="
                mt-6
                list-decimal
                space-y-3
                pl-5

                sm:pl-6
              "
            >
              <li className="pl-1">
                Rs 150 will charges for the
                shipping for Hyderabad will be
                charged on the mentioned order
                amount and for a maximum package
                of 3 kgs.
              </li>

              <li className="pl-1">
                10 – 15 days shipping in
                Hyderabad only when ordered on
                working days by following the
                above order policies.
              </li>

              <li className="pl-1">
                It is possible that our courier
                partners have a holiday between
                the day you placed your order and
                the date of delivery, which is
                based on the timelines shown on
                the product page. In this case,
                we add a day to the estimated
                date. Some courier partners do
                not work on Sundays or Mondays
                and this is factored in to the
                delivery dates.
              </li>

              <li className="pl-1">
                In Other cases such as Gusted
                Holidays/National Holidays or
                some Happening violated events in
                the Country if you place order
                between these days the shipping
                may get effected. In such case we
                add a Day or Two accordingly.
              </li>

              <li className="pl-1">
                Other states 20 working days for
                delivery.
              </li>
            </ol>

            {/* =====================================
                DELAY
            ====================================== */}
            <p className="mt-8">
              If there is a delay in delivery,
              the customers are requested to
              cooperate with it and customers
              shall contact us on Email Id :{" "}
              <a
                href="mailto:query@brassleaf.store"
                className="
                  font-bold
                  text-[#07152D]
                  transition

                  hover:text-[#4F39F6]
                "
              >
                query@brassleaf.store
              </a>{" "}
              if the product is not delivered
              with in 10 days from the ordered
              date.
            </p>

            {/* =====================================
                PACKAGE CONDITION
            ====================================== */}
            <p className="mt-7">
              Customers are required not to
              accept any product if opened,
              teared, with damaged package and
              without product bill. Brassleaf
              will not be answerable to any
              product problem without bill.
            </p>

            {/* =====================================
                EXCHANGE / SHIPPING
            ====================================== */}
            <p className="mt-7">
              To get a substitution/exchange,
              email us your order number and the
              Justification for returning on our
              referenced email address i.e,{" "}
              <a
                href="mailto:query@brassleaf.store"
                className="
                  font-bold
                  text-[#07152D]
                  transition

                  hover:text-[#4F39F6]
                "
              >
                query@brassleaf.store
              </a>
              . The orders cannot be shipped to
              PO boxes or military addresses;
              rural domestic addresses require
              one or more additional days to
              deliver. Orders requiring engraving
              or any customization will require
              additional time. store.
            </p>

            {/* =====================================
                NON DELIVERY
            ====================================== */}
            <p className="mt-7">
              If a non-delivery or late delivery
              occurs due to a mistake by the User
              (i.e. wrong or incomplete name or
              address or recipient not available
              or any other related reason) any
              extra cost spent by Brassleaf for
              re-delivery shall be claimed from
              the User.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}