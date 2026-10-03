// src/pages/ReturnPolicy.jsx

import { Link } from "react-router-dom";

export default function ReturnPolicy() {
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
            Return Policy
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
              Return Policy
            </span>
          </div>
        </div>
      </section>

      {/* =========================================
          RETURN POLICY CONTENT
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
              space-y-6
              text-[15px]
              leading-[1.9]
              text-[#334766]

              sm:space-y-7
              sm:text-[16px]
              sm:leading-[2]
            "
          >
            <p>
              No return will be handled after the
              delivery of the products, only
              exchange of the products with in 15
              days of the delivery receipt date.
              You might demand for a exchange of
              product just when the item is
              unworn, unwashed, without stains,
              flawless and with every unique tag
              and bundling unblemished. Any other
              tags or products will not be
              accepted.
            </p>

            <p>
              After a thorough inspection of the
              product in accordance with the
              aforementioned policies, our
              supervisor or delivery logistics
              has the authority to accept or
              reject the product for replacement,
              exchange, or return. The customer
              agrees not to challenge their
              decisions.
            </p>

            <p>
              No item will be exchanged without
              items unique bill.
            </p>

            <p>
              Conveyance charge of Rs.150/ – will
              be charged (independent of currently
              paid transportation charge) if the
              client need to deal with any
              substitution/return.
            </p>

            <p>
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
              .
            </p>

            <p>
              For any exchange/substituion, you
              will have to visit our store at
              punjagutta.
            </p>

            {/* ADDRESS */}
            <div className="pt-1">
              <p
                className="
                  font-extrabold
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