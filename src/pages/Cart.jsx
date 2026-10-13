

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  UserRound,
  ShoppingBag,
  PackageCheck,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  MapPin,
  School,
  Mail,
  Phone,
  IdCard,
} from "lucide-react";

import { useStore } from "../context/StoreContext";

const money = (value) =>
  `₹${Number(value || 0).toFixed(2)}`;

const formatAddress = (address) => {
  if (!address) return "Address not provided";

  if (typeof address === "string") return address;

  return (
    [
      address.fullAddress,
      address.addressLine1,
      address.addressLine2,
      address.address,
      address.landmark,
      address.city,
      address.state,
      address.pincode || address.postalCode,
    ]
      .filter(Boolean)
      .join(", ") || "Address not provided"
  );
};

const getSizeLabel = (size) =>
  typeof size === "object" && size !== null
    ? size.label
    : size;

export default function Cart() {
  const navigate = useNavigate();

  const {
    student,
    profile,
    defaultAddress,
    cart,
    shippingAmount,
    kitPurchased,
    updateCartSize,
    updateQuantity,
    removeFromCart,
    createOrder,
  } = useStore();

  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  // Existing purchase stage logic unchanged.
  const visibleCart = cart.filter((item) =>
    kitPurchased
      ? !item.isKitItem
      : item.isKitItem === true
  );

  const hasKit = !kitPurchased;

  const visibleSubtotal = visibleCart.reduce(
    (sum, item) =>
      sum +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );

  // const shipping = visibleCart.length
  //   ? Number(shippingAmount ?? 200)
  //   : 0;
  
const shipping = visibleCart.length > 0 ? 200 : 0;


  const gstIncluded =
    visibleSubtotal - visibleSubtotal / 1.05;

  const total = visibleSubtotal + shipping;

  const profileFields = [
    {
      label: "Student Name",
      value: profile?.name || student?.name,
      icon: UserRound,
    },
    {
      label: "Admission Number",
      value: student?.admissionNo,
      icon: IdCard,
    },
    {
      label: "School",
      value: student?.school || profile?.school,
      icon: School,
    },
    {
      label: "Mobile Number",
      value: profile?.phone || student?.phone,
      icon: Phone,
    },
    {
      label: "Email Address",
      value: profile?.email || student?.email,
      icon: Mail,
    },
    {
      label: "Shipping Address",
      value: formatAddress(defaultAddress),
      icon: MapPin,
    },
  ];

  const handleQuantity = (item, difference) => {
    if (item.isKitItem || item.quantityLocked) return;

    const nextQuantity = Math.max(
      1,
      Number(item.quantity || 1) + difference
    );

    updateQuantity(item.cartKey, nextQuantity);
  };

  const handleDelete = (item) => {
    if (item.isKitItem || item.quantityLocked) return;

    removeFromCart(item.cartKey);
  };

  const handlePlaceOrder = () => {
    if (!visibleCart.length || placing) return;

    if (visibleCart.length !== cart.length) {
      setError(
        "Your cart contains items from another purchase stage. Please refresh your cart before placing the order."
      );
      return;
    }

    if (!student) {
      setError("Please login to place your order.");
      return;
    }

    setError("");
    setPlacing(true);

    try {
      const order = createOrder({
        shippingAddress: defaultAddress || {},
        paymentMethod: "COD",
      });

      if (!order) {
        throw new Error("Unable to place your order.");
      }

      // navigate("/order-success", {
      //   replace: true,
      //   state: { order },
      // });
      navigate(
  `/order-success?orderId=${encodeURIComponent(order.id)}`,
  {
    replace: true,
    state: { order },
  }
);
    } catch (err) {
      setError(
        err.message || "Unable to place your order."
      );
    } finally {
      setPlacing(false);
    }
  };

  return (
    <main className="min-h-[75vh] bg-[#F5F8FC] px-4 py-7 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
      <div className="mx-auto w-full max-w-[1480px]">

        {/* PAGE HEADING */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-black tracking-tight text-[#07152D] sm:text-3xl">
            Shopping Cart
          </h1>

          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Review your details and selected items before placing your order.
          </p>
        </div>

        {/* RESPONSIVE CART GRID */}
        <div className="cart-layout">

          {/* LEFT: STUDENT PROFILE */}
          <aside className="cart-profile min-w-0 self-start rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

            <div className="mb-4 flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <UserRound size={21} />
              </div>

              <div className="min-w-0">
                <h2 className="text-base font-extrabold text-[#07152D] sm:text-lg">
                  Student Profile
                </h2>

                <p className="text-xs text-slate-500">
                  Registered student details
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {profileFields.map(
                ({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex min-w-0 items-start gap-3"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                      <Icon size={16} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-semibold text-slate-500">
                        {label}
                      </p>

                      <p className="mt-0.5 break-words text-[13px] font-bold leading-5 text-slate-900">
                        {value || "Not provided"}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </aside>

          {/* MIDDLE: PRODUCTS */}
          <section className="cart-products flex min-w-0 min-h-0 flex-col">

            <div className="mb-3 flex shrink-0 items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2">
                <ShoppingBag
                  size={20}
                  className="text-indigo-600"
                />

                <h2 className="text-base font-extrabold text-[#07152D] sm:text-lg">
                  {hasKit
                    ? "Your School Kit"
                    : "Your Products"}
                </h2>
              </div>

              <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                {visibleCart.length} Items
              </span>
            </div>

            {/* ONLY THIS AREA SCROLLS */}
            <div className="cart-products-scroll min-h-0 space-y-3">

              {!visibleCart.length && (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                  <ShoppingBag
                    size={35}
                    className="mx-auto mb-3 text-slate-300"
                  />

                  <p className="font-semibold text-slate-600">
                    Your cart is empty.
                  </p>

                  <Link
                    to="/"
                    className="mt-3 inline-block text-sm font-bold text-indigo-600 underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              )}

              {visibleCart.map((item, index) => {
                const isKitItem =
                  item.isKitItem === true ||
                  item.quantityLocked === true;

                const quantity = Number(
                  item.quantity || 1
                );

                const itemTotal =
                  Number(item.price || 0) * quantity;

                const sizes = Array.isArray(item.sizes)
                  ? item.sizes
                  : [];

                return (
                  <article
                    key={
                      item.cartKey ||
                      `${item.id}-${index}`
                    }
                    className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"
                  >
                    <div className="flex min-w-0 items-start gap-3">

                      {/* PRODUCT IMAGE */}
                      <div className="h-[105px] w-[82px] shrink-0 overflow-hidden rounded-xl bg-slate-50 sm:h-[112px] sm:w-[90px] xl:h-[118px] xl:w-[96px]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      {/* PRODUCT DETAILS */}
                      <div className="min-w-0 flex-1">

                        {/* NAME, PRICE, ITEM TOTAL */}
                        <div className="flex min-w-0 items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-[13px] font-extrabold leading-5 text-[#07152D] sm:text-[15px]">
                              {item.name}
                            </h3>

                            <p className="mt-0.5 text-[13px] font-extrabold text-indigo-600 sm:text-sm">
                              {money(item.price)}
                            </p>
                          </div>

                          <div className="flex shrink-0 items-start gap-1">
                            <div className="text-right">
                              <p className="text-[12px] font-black text-[#07152D] sm:text-[14px]">
                                {money(itemTotal)}
                              </p>

                              <p className="text-[9px] font-medium text-slate-400">
                                Item Total
                              </p>
                            </div>

                            {!isKitItem && (
                              <button
                                type="button"
                                aria-label={`Remove ${item.name}`}
                                title="Remove product"
                                onClick={() =>
                                  handleDelete(item)
                                }
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* SIZE + QUANTITY */}
                        <div className="mt-3 flex flex-wrap items-end gap-2 sm:gap-3">

                          {/* SIZE */}
                          <div className="w-[100px] max-w-full sm:w-[112px]">
                            <label className="mb-1 block text-[10px] font-bold uppercase text-slate-400">
                              Size
                            </label>

                            {sizes.length > 0 ? (
                              <select
                                value={item.size ?? ""}
                                onChange={(event) =>
                                  updateCartSize(
                                    item.cartKey,
                                    event.target.value
                                  )
                                }
                                className="h-9 w-full rounded-lg border border-slate-200 bg-white px-2 text-xs font-bold text-[#07152D] outline-none focus:border-indigo-500"
                              >
                                {sizes.map(
                                  (size, sizeIndex) => {
                                    const label =
                                      getSizeLabel(size);

                                    return (
                                      <option
                                        key={`${label}-${sizeIndex}`}
                                        value={label}
                                      >
                                        {label}
                                      </option>
                                    );
                                  }
                                )}
                              </select>
                            ) : (
                              <div className="flex h-9 items-center rounded-lg border border-slate-200 bg-white px-2 text-[11px] font-semibold text-slate-600">
                                {item.size || "Free Size"}
                              </div>
                            )}
                          </div>

                          {/* QUANTITY */}
                          <div className="shrink-0">
                            <label className="mb-1 block text-[10px] font-bold uppercase text-slate-400">
                              Quantity
                            </label>

                            {isKitItem ? (
                              <div className="flex h-9 w-[72px] items-center justify-center rounded-lg border border-slate-200 bg-white text-xs font-extrabold text-[#07152D]">
                                {quantity}
                              </div>
                            ) : (
                              <div className="flex h-9 items-center overflow-hidden rounded-lg border border-slate-200 bg-white">
                                <button
                                  type="button"
                                  aria-label="Decrease quantity"
                                  disabled={quantity <= 1}
                                  onClick={() =>
                                    handleQuantity(item, -1)
                                  }
                                  className="flex h-full w-7 items-center justify-center text-slate-500 hover:bg-indigo-50 disabled:opacity-30"
                                >
                                  <Minus size={12} />
                                </button>

                                <span className="flex h-full min-w-[25px] items-center justify-center border-x border-slate-200 px-1 text-xs font-extrabold text-[#07152D]">
                                  {quantity}
                                </span>

                                <button
                                  type="button"
                                  aria-label="Increase quantity"
                                  onClick={() =>
                                    handleQuantity(item, 1)
                                  }
                                  className="flex h-full w-7 items-center justify-center text-slate-500 hover:bg-indigo-50"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* RIGHT: ORDER SUMMARY */}
          <aside className="cart-summary min-w-0 self-start rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

            <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <PackageCheck size={21} />
              </div>

              <h2 className="text-lg font-extrabold text-[#07152D]">
                Order Summary
              </h2>
            </div>

            <div className="space-y-4 text-[13px] sm:text-sm">

              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">
                  Subtotal
                </span>

                <span className="font-extrabold text-[#07152D]">
                  {money(visibleSubtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">
                  Shipping
                </span>

                <span className="font-extrabold text-[#07152D]">
                  {money(shipping)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-600">
                    GST (Included)
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-400">
                    CGST + SGST
                  </p>
                </div>

                <span className="font-extrabold text-[#07152D]">
                  {money(gstIncluded)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-5">
                <span className="text-lg font-black text-[#07152D]">
                  Total
                </span>

                <span className="text-xl font-black text-[#07152D]">
                  {money(total)}
                </span>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-4 rounded-lg bg-red-50 p-3 text-xs text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="button"
              disabled={!visibleCart.length || placing}
              onClick={handlePlaceOrder}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#5039F6] px-4 py-3.5 text-sm font-extrabold text-white shadow-[0_6px_18px_rgba(80,57,246,0.20)] transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {placing
                ? "Placing Order..."
                : "Place Order"}

              {!placing && <ArrowRight size={17} />}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}





// import {
//   ArrowRight,
//   ChevronDown,
//   Minus,
//   Plus,
//   ShoppingBag,
//   Trash2,
// } from "lucide-react";

// import { Link } from "react-router-dom";
// import { useStore } from "../context/StoreContext";


// export default function Cart() {
//   const {
//     cart,
//     cartSubtotal,
//     shippingAmount,
//     removeFromCart,
//     updateQuantity,
//     updateCartSize,
//   } = useStore();


//   /* =====================================================
//      GST

//      Product prices are GST inclusive.

//      GST = Price - (Price / 1.05)

//      GST is only displayed separately.
//      It is NOT added again.
//   ====================================================== */

//   const gstRate = 5;

//   const includedGst =
//     Number(cartSubtotal || 0) -
//     Number(cartSubtotal || 0) / (1 + gstRate / 100);


//   /* =====================================================
//      FINAL TOTAL

//      Product price already contains GST.

//      Total = Subtotal + Shipping
//   ====================================================== */

//   const finalTotal =
//     Number(cartSubtotal || 0) +
//     Number(shippingAmount || 0);


//   /* =====================================================
//      EMPTY CART
//   ====================================================== */

//   if (cart.length === 0) {
//     return (
//       <main
//         className="
//           min-h-[65vh]
//           bg-slate-50
//           px-4
//           py-14

//           sm:px-6
//           sm:py-16
//         "
//       >
//         <div
//           className="
//             mx-auto
//             max-w-[520px]
//             rounded-2xl
//             border
//             border-slate-200
//             bg-white
//             p-7
//             text-center
//             shadow-sm

//             sm:p-9
//           "
//         >
//           {/* ICON */}

//           <div
//             className="
//               mx-auto
//               flex
//               h-16
//               w-16
//               items-center
//               justify-center
//               rounded-full
//               bg-indigo-50
//               text-indigo-600
//             "
//           >
//             <ShoppingBag size={28} />
//           </div>


//           {/* TITLE */}

//           <h1
//             className="
//               mt-5
//               text-2xl
//               font-extrabold
//               text-slate-950
//             "
//           >
//             Your cart is empty
//           </h1>


//           <p
//             className="
//               mt-2
//               text-sm
//               leading-6
//               text-slate-500
//             "
//           >
//             Add your school products to continue.
//           </p>


//           {/* BUTTON */}

//           <Link
//             to="/"
//             className="
//               mt-6
//               inline-flex
//               h-11
//               items-center
//               justify-center
//               gap-2
//               rounded-xl
//               bg-indigo-600
//               px-6
//               text-sm
//               font-bold
//               text-white
//               transition

//               hover:bg-indigo-700
//             "
//           >
//             Continue Shopping

//             <ArrowRight size={17} />
//           </Link>
//         </div>
//       </main>
//     );
//   }


//   return (
//     <main
//       className="
//         min-h-[65vh]
//         bg-slate-50
//         px-4
//         py-7

//         sm:px-6
//         sm:py-9

//         lg:px-10
//         lg:py-10
//       "
//     >
//       <div
//         className="
//           mx-auto
//           max-w-[1250px]
//         "
//       >

//         {/* =================================================
//             PAGE HEADING
//         ================================================== */}

//         <h1
//           className="
//             text-[25px]
//             font-extrabold
//             tracking-tight
//             text-slate-950

//             sm:text-[30px]

//             lg:text-[32px]
//           "
//         >
//           Shopping Cart
//         </h1>


//         {/* =================================================
//             CART GRID
//         ================================================== */}

//         <div
//           className="
//             mt-6
//             grid
//             gap-5

//             sm:mt-7

//             lg:grid-cols-[minmax(0,1fr)_340px]
//             lg:items-start
//             lg:gap-6
//           "
//         >

//           {/* =================================================
//               LEFT SIDE - CART PRODUCTS
//           ================================================== */}

//           <section className="space-y-4">

//             {cart.map((item) => {

//               /* =========================================
//                  ITEM TOTAL
//               ========================================== */

//               const itemTotal =
//                 Number(item.price || 0) *
//                 Number(item.quantity || 1);


//               /*
//                 Kit item check.

//                 isKitItem       = current kit flag
//                 quantityLocked = extra safety flag
//               */

//               const isKitItem =
//                 item.isKitItem === true ||
//                 item.quantityLocked === true;


//               return (
//                 <article
//                   key={item.cartKey}
//                   className="
//                     relative
//                     rounded-2xl
//                     border
//                     border-slate-200
//                     bg-white
//                     p-4
//                     shadow-sm

//                     sm:p-5
//                   "
//                 >

//                   {/* =========================================
//                       PRODUCT ROW
//                   ========================================== */}

//                   <div
//                     className="
//                       flex
//                       gap-4

//                       sm:gap-5
//                     "
//                   >

//                     {/* PRODUCT IMAGE */}

//                     <div
//                       className="
//                         h-[105px]
//                         w-[90px]
//                         shrink-0
//                         overflow-hidden
//                         rounded-xl
//                         bg-slate-100

//                         sm:h-[125px]
//                         sm:w-[112px]
//                       "
//                     >
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="
//                           h-full
//                           w-full
//                           object-cover
//                         "
//                       />
//                     </div>


//                     {/* =====================================
//                         PRODUCT DETAILS
//                     ====================================== */}

//                     <div
//                       className="
//                         min-w-0
//                         flex-1
//                         pr-6
//                       "
//                     >

//                       {/* PRODUCT NAME */}

//                       <h2
//                         className="
//                           line-clamp-2
//                           text-[15px]
//                           font-extrabold
//                           leading-5
//                           text-slate-950

//                           sm:text-[17px]
//                         "
//                       >
//                         {item.name}
//                       </h2>


//                       {/* PRODUCT PRICE */}

//                       <div className="mt-1">

//                         <p
//                           className="
//                             text-[15px]
//                             font-extrabold
//                             text-indigo-600

//                             sm:text-[16px]
//                           "
//                         >
//                           ₹{Number(item.price || 0).toFixed(2)}
//                         </p>


//                         <p
//                           className="
//                             mt-0.5
//                             text-[10px]
//                             font-medium
//                             text-slate-400
//                           "
//                         >
//                           GST included
//                         </p>

//                       </div>


//                       {/* =====================================
//                           SIZE + QUANTITY + TOTAL
//                       ====================================== */}

//                       <div
//                         className="
//                           mt-4
//                           flex
//                           w-full
//                           flex-wrap
//                           items-end
//                           gap-3

//                           sm:flex-nowrap
//                           sm:gap-4
//                         "
//                       >

//                         {/* =================================
//                             SIZE DROPDOWN

//                             BOTH:
//                             Kit Product
//                             Normal Product

//                             can change size.
//                         ================================== */}

//                         {item.hasSize &&
//                           item.sizes?.length > 0 && (

//                             <div
//                               className="
//                                 w-[100px]

//                                 sm:w-[115px]
//                               "
//                             >
//                               <label
//                                 className="
//                                   mb-1.5
//                                   block
//                                   text-[10px]
//                                   font-bold
//                                   uppercase
//                                   tracking-[0.08em]
//                                   text-slate-400
//                                 "
//                               >
//                                 Size
//                               </label>


//                               <div className="relative">

//                                 <select
//                                   value={item.size || ""}
//                                   onChange={(event) =>
//                                     updateCartSize(
//                                       item.cartKey,
//                                       event.target.value
//                                     )
//                                   }
//                                   className="
//                                     h-10
//                                     w-full
//                                     cursor-pointer
//                                     appearance-none
//                                     rounded-lg
//                                     border
//                                     border-slate-200
//                                     bg-white
//                                     pl-3
//                                     pr-8
//                                     text-[12px]
//                                     font-bold
//                                     text-slate-800
//                                     outline-none
//                                     transition

//                                     hover:border-indigo-300

//                                     focus:border-indigo-500
//                                     focus:ring-2
//                                     focus:ring-indigo-100
//                                   "
//                                 >

//                                   {item.sizes.map((size) => (
//                                     <option
//                                       key={size.label}
//                                       value={size.label}
//                                     >
//                                       {size.label}
//                                     </option>
//                                   ))}

//                                 </select>


//                                 <ChevronDown
//                                   size={14}
//                                   className="
//                                     pointer-events-none
//                                     absolute
//                                     right-3
//                                     top-1/2
//                                     -translate-y-1/2
//                                     text-slate-400
//                                   "
//                                 />

//                               </div>
//                             </div>

//                           )}


//                         {/* =================================
//                             KIT QUANTITY

//                             Kit composition already fixed.

//                             NO minus
//                             NO plus
//                             NO quantity editing

//                             Just display fixed quantity.
//                         ================================== */}

//                         {isKitItem && (

//                           <div>

//                             <label
//                               className="
//                                 mb-1.5
//                                 block
//                                 text-[10px]
//                                 font-bold
//                                 uppercase
//                                 tracking-[0.08em]
//                                 text-slate-400
//                               "
//                             >
//                               Quantity
//                             </label>


//                             <div
//                               className="
//                                 flex
//                                 h-10
//                                 min-w-[70px]
//                                 items-center
//                                 justify-center
//                                 rounded-lg
//                                 border
//                                 border-slate-200
//                                 bg-slate-50
//                                 px-4
//                               "
//                             >
//                               <span
//                                 className="
//                                   text-xs
//                                   font-extrabold
//                                   text-slate-950
//                                 "
//                               >
//                                 {item.quantity || 1}
//                               </span>
//                             </div>

//                           </div>

//                         )}


//                         {/* =================================
//                             NORMAL PRODUCT QUANTITY

//                             Only normal individual product
//                             gets - and + controls.
//                         ================================== */}

//                         {!isKitItem && (

//                           <div>

//                             <label
//                               className="
//                                 mb-1.5
//                                 block
//                                 text-[10px]
//                                 font-bold
//                                 uppercase
//                                 tracking-[0.08em]
//                                 text-slate-400
//                               "
//                             >
//                               Quantity
//                             </label>


//                             <div
//                               className="
//                                 flex
//                                 h-10
//                                 items-center
//                                 overflow-hidden
//                                 rounded-lg
//                                 border
//                                 border-slate-200
//                                 bg-white
//                               "
//                             >

//                               {/* MINUS */}

//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   updateQuantity(
//                                     item.cartKey,
//                                     item.quantity - 1
//                                   )
//                                 }
//                                 disabled={
//                                   item.quantity <= 1
//                                 }
//                                 className="
//                                   flex
//                                   h-full
//                                   w-9
//                                   items-center
//                                   justify-center
//                                   text-slate-500
//                                   transition

//                                   hover:bg-slate-50
//                                   hover:text-indigo-600

//                                   disabled:cursor-not-allowed
//                                   disabled:opacity-30
//                                 "
//                               >
//                                 <Minus size={14} />
//                               </button>


//                               {/* QUANTITY NUMBER */}

//                               <span
//                                 className="
//                                   flex
//                                   h-full
//                                   min-w-[38px]
//                                   items-center
//                                   justify-center
//                                   border-x
//                                   border-slate-100
//                                   text-xs
//                                   font-extrabold
//                                   text-slate-950
//                                 "
//                               >
//                                 {item.quantity}
//                               </span>


//                               {/* PLUS */}

//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   updateQuantity(
//                                     item.cartKey,
//                                     item.quantity + 1
//                                   )
//                                 }
//                                 className="
//                                   flex
//                                   h-full
//                                   w-9
//                                   items-center
//                                   justify-center
//                                   text-slate-500
//                                   transition

//                                   hover:bg-slate-50
//                                   hover:text-indigo-600
//                                 "
//                               >
//                                 <Plus size={14} />
//                               </button>

//                             </div>
//                           </div>

//                         )}


//                         {/* =================================
//                             ITEM TOTAL

//                             Same existing position:
//                             right side ending.
//                         ================================== */}

//                         <div
//                           className="
//                             ml-auto
//                             flex
//                             min-h-10
//                             items-end
//                             justify-end
//                             pb-2
//                             text-right
//                           "
//                         >

//                           <div>

//                             <p
//                               className="
//                                 text-[15px]
//                                 font-extrabold
//                                 text-slate-950

//                                 sm:text-[16px]
//                               "
//                             >
//                               ₹{itemTotal.toFixed(2)}
//                             </p>


//                             <p
//                               className="
//                                 mt-0.5
//                                 text-[9px]
//                                 font-medium
//                                 text-slate-400
//                               "
//                             >
//                               GST included
//                             </p>

//                           </div>

//                         </div>

//                       </div>

//                     </div>


//                     {/* =====================================
//                         REMOVE BUTTON

//                         Existing flow unchanged.
//                     ====================================== */}

//                     <button
//                       type="button"
//                       onClick={() =>
//                         removeFromCart(item.cartKey)
//                       }
//                       aria-label={`Remove ${item.name}`}
//                       title="Remove"
//                       className="
//                         absolute
//                         right-3
//                         top-3
//                         flex
//                         h-8
//                         w-8
//                         items-center
//                         justify-center
//                         rounded-lg
//                         text-slate-400
//                         transition

//                         hover:bg-red-50
//                         hover:text-red-500

//                         sm:right-4
//                         sm:top-4
//                       "
//                     >
//                       <Trash2 size={17} />
//                     </button>

//                   </div>

//                 </article>
//               );
//             })}

//           </section>


//           {/* =================================================
//               RIGHT SIDE - ORDER SUMMARY
//           ================================================== */}

//           <aside
//             className="
//               rounded-2xl
//               border
//               border-slate-200
//               bg-white
//               p-5
//               shadow-sm

//               sm:p-6

//               lg:sticky
//               lg:top-[105px]
//             "
//           >

//             <h2
//               className="
//                 text-xl
//                 font-extrabold
//                 text-slate-950
//               "
//             >
//               Order Summary
//             </h2>


//             {/* =============================================
//                 SUMMARY DETAILS
//             ============================================== */}

//             <div
//               className="
//                 mt-6
//                 space-y-4
//                 text-sm
//               "
//             >

//               {/* SUBTOTAL */}

//               <div
//                 className="
//                   flex
//                   items-center
//                   justify-between
//                   gap-4
//                 "
//               >
//                 <span className="text-slate-500">
//                   Subtotal
//                 </span>

//                 <strong className="text-slate-950">
//                   ₹{Number(cartSubtotal || 0).toFixed(2)}
//                 </strong>
//               </div>


//               {/* SHIPPING */}

//               <div
//                 className="
//                   flex
//                   items-center
//                   justify-between
//                   gap-4
//                 "
//               >
//                 <span className="text-slate-500">
//                   Shipping
//                 </span>


//                 {Number(shippingAmount || 0) === 0 ? (

//                   <strong
//                     className="
//                       font-bold
//                       text-emerald-600
//                     "
//                   >
//                     FREE
//                   </strong>

//                 ) : (

//                   <strong className="text-slate-950">
//                     ₹{Number(shippingAmount).toFixed(2)}
//                   </strong>

//                 )}

//               </div>


//               {/* =========================================
//                   GST INCLUDED

//                   GST is already included in products.
//                   Not added again.
//               ========================================== */}

//               <div
//                 className="
//                   flex
//                   items-start
//                   justify-between
//                   gap-4
//                 "
//               >

//                 <div>

//                   <span className="text-slate-500">
//                     GST (5%)
//                   </span>


//                   <p
//                     className="
//                       mt-0.5
//                       text-[10px]
//                       text-slate-400
//                     "
//                   >
//                     Included
//                   </p>

//                 </div>


//                 <strong className="text-slate-950">
//                   ₹{includedGst.toFixed(2)}
//                 </strong>

//               </div>

//             </div>


//             {/* =============================================
//                 TOTAL
//             ============================================== */}

//             <div
//               className="
//                 mt-5
//                 flex
//                 items-center
//                 justify-between
//                 border-t
//                 border-slate-200
//                 pt-5
//               "
//             >

//               <div>

//                 <span
//                   className="
//                     text-lg
//                     font-extrabold
//                     text-slate-950
//                   "
//                 >
//                   Total
//                 </span>


//                 <p
//                   className="
//                     mt-0.5
//                     text-[10px]
//                     text-slate-400
//                   "
//                 >
//                   Inclusive of GST
//                 </p>

//               </div>


//               <span
//                 className="
//                   text-xl
//                   font-extrabold
//                   text-slate-950
//                 "
//               >
//                 ₹{finalTotal.toFixed(2)}
//               </span>

//             </div>


//             {/* =============================================
//                 CHECKOUT BUTTON
//             ============================================== */}

//             <Link
//               to="/checkout"
//               className="
//                 mt-6
//                 flex
//                 h-[52px]
//                 w-full
//                 items-center
//                 justify-center
//                 gap-2
//                 rounded-xl
//                 bg-indigo-600
//                 px-4
//                 text-sm
//                 font-bold
//                 text-white
//                 shadow-lg
//                 shadow-indigo-600/15
//                 transition

//                 hover:bg-indigo-700

//                 active:scale-[0.99]
//               "
//             >
//               Proceed to Checkout

//               <ArrowRight size={17} />
//             </Link>

//           </aside>

//         </div>

//       </div>
//     </main>
//   );
// }