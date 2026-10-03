import {
  Check,
  Home,
  PackageCheck,
} from "lucide-react";

import {
  Link,
  Navigate,
} from "react-router-dom";

import {
  useStore,
} from "../context/StoreContext";


export default function OrderSuccess() {

  const {
    lastOrder,
  } = useStore();


  if (!lastOrder) {

    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  return (
    <main
      className="
        flex
        min-h-[70vh]

        items-center
        justify-center

        bg-slate-50

        px-4
        py-12
      "
    >

      <div
        className="
          w-full
          max-w-[620px]

          rounded-3xl

          border
          border-slate-200

          bg-white

          p-6

          text-center

          shadow-[0_20px_60px_rgba(15,23,42,0.08)]

          sm:p-10
        "
      >

        {/* SUCCESS ICON */}

        <div
          className="
            mx-auto

            flex
            h-[76px]
            w-[76px]

            items-center
            justify-center

            rounded-full

            bg-emerald-50

            text-emerald-600
          "
        >
          <Check size={35} />
        </div>


        <p
          className="
            mt-6

            text-[11px]
            font-extrabold
            uppercase
            tracking-[0.2em]
            text-indigo-600
          "
        >
          Order Confirmed
        </p>


        <h1
          className="
            mt-2

            text-[27px]
            font-extrabold
            tracking-tight
            text-slate-950

            sm:text-[34px]
          "
        >
          Order placed successfully
        </h1>


        <p
          className="
            mx-auto
            mt-3

            max-w-[440px]

            text-sm
            leading-6
            text-slate-500
          "
        >
          Thank you, {lastOrder.student.name}.
          Your school essentials order has been confirmed.
        </p>


        {/* ORDER DETAILS */}

        <div
          className="
            mt-7

            rounded-2xl

            bg-slate-50

            p-5

            text-left
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <PackageCheck
              size={18}

              className="
                text-indigo-600
              "
            />

            <h2
              className="
                text-sm
                font-extrabold
                text-slate-950
              "
            >
              Order Details
            </h2>
          </div>


          <div
            className="
              mt-4

              space-y-3

              text-[13px]
            "
          >

            <OrderRow
              label="Order ID"
              value={
                lastOrder.id
              }
            />


            <OrderRow
              label="Admission No."
              value={
                lastOrder.student
                  .admissionNo
              }
            />


            <OrderRow
              label="Items"
              value={
                lastOrder.items.reduce(
                  (total, item) =>
                    total +
                    item.quantity,
                  0
                )
              }
            />


            <OrderRow
              label="Total Paid"
              value={
                `₹${Number(
                  lastOrder.total
                ).toFixed(2)}`
              }
            />

          </div>

        </div>


        <Link
          to="/"

          className="
            mt-7

            inline-flex

            h-[50px]

            items-center
            justify-center
            gap-2

            rounded-xl

            bg-indigo-600

            px-7

            text-sm
            font-bold
            text-white

            transition

            hover:bg-indigo-700
          "
        >
          <Home size={17} />

          Back to Home
        </Link>

      </div>

    </main>
  );
}


function OrderRow({
  label,
  value,
}) {

  return (
    <div
      className="
        flex
        items-start
        justify-between
        gap-5
      "
    >

      <span
        className="
          text-slate-500
        "
      >
        {label}
      </span>


      <strong
        className="
          break-all
          text-right
          text-slate-950
        "
      >
        {value}
      </strong>

    </div>
  );
}