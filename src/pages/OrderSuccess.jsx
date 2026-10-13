
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  Check,
  ArrowRight,
  PackageCheck,
  CalendarDays,
  ShoppingBag,
  ClipboardList,
} from "lucide-react";

import { useStore } from "../context/StoreContext";

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function OrderSuccess() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { student, orders = [] } = useStore();

  const orderId = searchParams.get("orderId");

  // Order from navigation state, only if it belongs
  // to the current student and matches the URL.
  const stateOrder = location.state?.order;

  const validStateOrder =
    stateOrder &&
    student &&
    stateOrder.student?.admissionNo === student.admissionNo &&
    (!orderId || String(stateOrder.id) === orderId)
      ? stateOrder
      : null;

  // Restore order after page refresh.
  const savedOrder = orderId
    ? orders.find(
        (item) => String(item.id) === orderId
      )
    : null;

  const order = validStateOrder || savedOrder;

  if (!student) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#F7F9FC] px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center">
          <PackageCheck
            size={38}
            className="mx-auto text-[#4F39F6]"
          />

          <h1 className="mt-4 text-xl font-extrabold text-[#07152D]">
            Login Required
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Please login to view your order.
          </p>

          <Link
            to="/"
            className="mt-5 inline-flex rounded-xl bg-[#4F39F6] px-5 py-3 text-sm font-bold text-white"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#F7F9FC] px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center">
          <ClipboardList
            size={38}
            className="mx-auto text-slate-400"
          />

          <h1 className="mt-4 text-xl font-extrabold text-[#07152D]">
            Order Not Found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            We couldn't find the requested order
            in your order history.
          </p>

          <Link
            to="/profile"
            className="mt-5 inline-flex rounded-xl bg-[#4F39F6] px-5 py-3 text-sm font-bold text-white"
          >
            View My Orders
          </Link>
        </div>
      </main>
    );
  }

  const items = Array.isArray(order.items)
    ? order.items
    : [];

  const itemCount = items.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#F7F9FC] px-3 py-8 sm:px-6 sm:py-12">
      <div className="w-full max-w-[580px] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">

        {/* SUCCESS HEADER */}

        <div className="px-5 pb-6 pt-8 text-center sm:px-8">
          <div className="mx-auto flex h-[70px] w-[70px] items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check size={34} strokeWidth={3} />
          </div>

          <h1 className="mt-5 text-[23px] font-extrabold tracking-tight text-[#07152D] sm:text-[28px]">
            Order Placed Successfully!
          </h1>

          <p className="mx-auto mt-2 max-w-[410px] text-[13px] leading-6 text-slate-500 sm:text-sm">
            Thank you for shopping with Brassleaf.
            Your school uniform order has been placed.
          </p>
        </div>

        {/* ORDER INFORMATION */}

        <div className="mx-4 rounded-xl border border-[#E8EDF4] bg-[#FAFBFD] p-4 sm:mx-6 sm:p-5">
          <div className="flex items-center gap-2 border-b border-[#E8EDF4] pb-3">
            <PackageCheck
              size={19}
              className="text-[#4F39F6]"
            />

            <h2 className="text-sm font-extrabold text-[#07152D]">
              Order Summary
            </h2>
          </div>

          <div className="mt-4 space-y-3">
            <DetailRow
              label="Order ID"
              value={order.orderNumber || order.id}
            />

            <DetailRow
              label="Order Date"
              value={formatDate(order.createdAt)}
            />

            <DetailRow
              label="Admission No."
              value={order.student?.admissionNo || student.admissionNo}
            />

            <DetailRow
              label="Total Items"
              value={itemCount}
            />

            <DetailRow
              label="Payment Method"
              value={order.paymentMethod || "COD"}
            />

            <div className="border-t border-dashed border-slate-200 pt-3">
              <DetailRow
                label="Total Amount"
                value={money(order.total)}
                highlight
              />
            </div>
          </div>
        </div>

        {/* PURCHASED PRODUCTS */}

        {items.length > 0 && (
          <div className="mx-4 mt-5 sm:mx-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-extrabold text-[#07152D]">
              <ShoppingBag
                size={17}
                className="text-[#4F39F6]"
              />
              Purchased Items
            </h3>

            <div className="max-h-[260px] divide-y divide-[#EDF0F5] overflow-y-auto rounded-xl border border-[#E8EDF4]">
              {items.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-center gap-3 p-3"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F7F9FC]">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name || "Product"}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <ShoppingBag
                        size={22}
                        className="text-slate-300"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold text-[#07152D]">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {item.size
                        ? `Size: ${item.size}  •  `
                        : ""}
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <strong className="shrink-0 text-xs font-extrabold text-[#07152D] sm:text-sm">
                    {money(
                      item.total ??
                        Number(item.price || 0) *
                          Number(item.quantity || 1)
                    )}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}

        <div className="grid grid-cols-2 gap-3 p-4 sm:p-6">
          <Link
            to="/profile"
            className="flex min-h-11 items-center justify-center rounded-xl border border-[#D8D3FF] bg-white px-3 text-center text-xs font-bold text-[#4F39F6] transition hover:bg-[#F8F7FF] sm:text-sm"
          >
            My Orders
          </Link>

          <Link
            to="/"
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#4F39F6] px-3 text-center text-xs font-bold text-white transition hover:bg-[#3F2BE0] sm:text-sm"
          >
            Continue Shopping
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}

function DetailRow({
  label,
  value,
  highlight = false,
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-slate-500 sm:text-[13px]">
        {label}
      </span>

      <strong
        className={`break-all text-right ${
          highlight
            ? "text-base font-extrabold text-[#4F39F6]"
            : "text-xs font-bold text-[#07152D] sm:text-[13px]"
        }`}
      >
        {value ?? "-"}
      </strong>
    </div>
  );
}



// import {
//   Check,
//   Home,
//   PackageCheck,
// } from "lucide-react";

// import {
//   Link,
//   Navigate,
// } from "react-router-dom";

// import {
//   useStore,
// } from "../context/StoreContext";


// export default function OrderSuccess() {

//   const {
//     lastOrder,
//   } = useStore();


//   if (!lastOrder) {

//     return (
//       <Navigate
//         to="/"
//         replace
//       />
//     );
//   }


//   return (
//     <main
//       className="
//         flex
//         min-h-[70vh]

//         items-center
//         justify-center

//         bg-slate-50

//         px-4
//         py-12
//       "
//     >

//       <div
//         className="
//           w-full
//           max-w-[620px]

//           rounded-3xl

//           border
//           border-slate-200

//           bg-white

//           p-6

//           text-center

//           shadow-[0_20px_60px_rgba(15,23,42,0.08)]

//           sm:p-10
//         "
//       >

//         {/* SUCCESS ICON */}

//         <div
//           className="
//             mx-auto

//             flex
//             h-[76px]
//             w-[76px]

//             items-center
//             justify-center

//             rounded-full

//             bg-emerald-50

//             text-emerald-600
//           "
//         >
//           <Check size={35} />
//         </div>


//         <p
//           className="
//             mt-6

//             text-[11px]
//             font-extrabold
//             uppercase
//             tracking-[0.2em]
//             text-indigo-600
//           "
//         >
//           Order Confirmed
//         </p>


//         <h1
//           className="
//             mt-2

//             text-[27px]
//             font-extrabold
//             tracking-tight
//             text-slate-950

//             sm:text-[34px]
//           "
//         >
//           Order placed successfully
//         </h1>


//         <p
//           className="
//             mx-auto
//             mt-3

//             max-w-[440px]

//             text-sm
//             leading-6
//             text-slate-500
//           "
//         >
//           Thank you, {lastOrder.student.name}.
//           Your school essentials order has been confirmed.
//         </p>


//         {/* ORDER DETAILS */}

//         <div
//           className="
//             mt-7

//             rounded-2xl

//             bg-slate-50

//             p-5

//             text-left
//           "
//         >

//           <div
//             className="
//               flex
//               items-center
//               gap-2
//             "
//           >
//             <PackageCheck
//               size={18}

//               className="
//                 text-indigo-600
//               "
//             />

//             <h2
//               className="
//                 text-sm
//                 font-extrabold
//                 text-slate-950
//               "
//             >
//               Order Details
//             </h2>
//           </div>


//           <div
//             className="
//               mt-4

//               space-y-3

//               text-[13px]
//             "
//           >

//             <OrderRow
//               label="Order ID"
//               value={
//                 lastOrder.id
//               }
//             />


//             <OrderRow
//               label="Admission No."
//               value={
//                 lastOrder.student
//                   .admissionNo
//               }
//             />


//             <OrderRow
//               label="Items"
//               value={
//                 lastOrder.items.reduce(
//                   (total, item) =>
//                     total +
//                     item.quantity,
//                   0
//                 )
//               }
//             />


//             <OrderRow
//               label="Total Paid"
//               value={
//                 `₹${Number(
//                   lastOrder.total
//                 ).toFixed(2)}`
//               }
//             />

//           </div>

//         </div>


//         <Link
//           to="/"

//           className="
//             mt-7

//             inline-flex

//             h-[50px]

//             items-center
//             justify-center
//             gap-2

//             rounded-xl

//             bg-indigo-600

//             px-7

//             text-sm
//             font-bold
//             text-white

//             transition

//             hover:bg-indigo-700
//           "
//         >
//           <Home size={17} />

//           Back to Home
//         </Link>

//       </div>

//     </main>
//   );
// }


// function OrderRow({
//   label,
//   value,
// }) {

//   return (
//     <div
//       className="
//         flex
//         items-start
//         justify-between
//         gap-5
//       "
//     >

//       <span
//         className="
//           text-slate-500
//         "
//       >
//         {label}
//       </span>


//       <strong
//         className="
//           break-all
//           text-right
//           text-slate-950
//         "
//       >
//         {value}
//       </strong>

//     </div>
//   );
// }