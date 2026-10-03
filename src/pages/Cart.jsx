import {
  ArrowRight,
  ChevronDown,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";


export default function Cart() {
  const {
    cart,
    cartSubtotal,
    shippingAmount,
    removeFromCart,
    updateQuantity,
    updateCartSize,
  } = useStore();


  /* =====================================================
     GST

     Product prices are GST inclusive.

     GST = Price - (Price / 1.05)

     GST is only displayed separately.
     It is NOT added again.
  ====================================================== */

  const gstRate = 5;

  const includedGst =
    Number(cartSubtotal || 0) -
    Number(cartSubtotal || 0) / (1 + gstRate / 100);


  /* =====================================================
     FINAL TOTAL

     Product price already contains GST.

     Total = Subtotal + Shipping
  ====================================================== */

  const finalTotal =
    Number(cartSubtotal || 0) +
    Number(shippingAmount || 0);


  /* =====================================================
     EMPTY CART
  ====================================================== */

  if (cart.length === 0) {
    return (
      <main
        className="
          min-h-[65vh]
          bg-slate-50
          px-4
          py-14

          sm:px-6
          sm:py-16
        "
      >
        <div
          className="
            mx-auto
            max-w-[520px]
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-7
            text-center
            shadow-sm

            sm:p-9
          "
        >
          {/* ICON */}

          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-indigo-50
              text-indigo-600
            "
          >
            <ShoppingBag size={28} />
          </div>


          {/* TITLE */}

          <h1
            className="
              mt-5
              text-2xl
              font-extrabold
              text-slate-950
            "
          >
            Your cart is empty
          </h1>


          <p
            className="
              mt-2
              text-sm
              leading-6
              text-slate-500
            "
          >
            Add your school products to continue.
          </p>


          {/* BUTTON */}

          <Link
            to="/"
            className="
              mt-6
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-indigo-600
              px-6
              text-sm
              font-bold
              text-white
              transition

              hover:bg-indigo-700
            "
          >
            Continue Shopping

            <ArrowRight size={17} />
          </Link>
        </div>
      </main>
    );
  }


  return (
    <main
      className="
        min-h-[65vh]
        bg-slate-50
        px-4
        py-7

        sm:px-6
        sm:py-9

        lg:px-10
        lg:py-10
      "
    >
      <div
        className="
          mx-auto
          max-w-[1250px]
        "
      >

        {/* =================================================
            PAGE HEADING
        ================================================== */}

        <h1
          className="
            text-[25px]
            font-extrabold
            tracking-tight
            text-slate-950

            sm:text-[30px]

            lg:text-[32px]
          "
        >
          Shopping Cart
        </h1>


        {/* =================================================
            CART GRID
        ================================================== */}

        <div
          className="
            mt-6
            grid
            gap-5

            sm:mt-7

            lg:grid-cols-[minmax(0,1fr)_340px]
            lg:items-start
            lg:gap-6
          "
        >

          {/* =================================================
              LEFT SIDE - CART PRODUCTS
          ================================================== */}

          <section className="space-y-4">

            {cart.map((item) => {

              /* =========================================
                 ITEM TOTAL
              ========================================== */

              const itemTotal =
                Number(item.price || 0) *
                Number(item.quantity || 1);


              /*
                Kit item check.

                isKitItem       = current kit flag
                quantityLocked = extra safety flag
              */

              const isKitItem =
                item.isKitItem === true ||
                item.quantityLocked === true;


              return (
                <article
                  key={item.cartKey}
                  className="
                    relative
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                    shadow-sm

                    sm:p-5
                  "
                >

                  {/* =========================================
                      PRODUCT ROW
                  ========================================== */}

                  <div
                    className="
                      flex
                      gap-4

                      sm:gap-5
                    "
                  >

                    {/* PRODUCT IMAGE */}

                    <div
                      className="
                        h-[105px]
                        w-[90px]
                        shrink-0
                        overflow-hidden
                        rounded-xl
                        bg-slate-100

                        sm:h-[125px]
                        sm:w-[112px]
                      "
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />
                    </div>


                    {/* =====================================
                        PRODUCT DETAILS
                    ====================================== */}

                    <div
                      className="
                        min-w-0
                        flex-1
                        pr-6
                      "
                    >

                      {/* PRODUCT NAME */}

                      <h2
                        className="
                          line-clamp-2
                          text-[15px]
                          font-extrabold
                          leading-5
                          text-slate-950

                          sm:text-[17px]
                        "
                      >
                        {item.name}
                      </h2>


                      {/* PRODUCT PRICE */}

                      <div className="mt-1">

                        <p
                          className="
                            text-[15px]
                            font-extrabold
                            text-indigo-600

                            sm:text-[16px]
                          "
                        >
                          ₹{Number(item.price || 0).toFixed(2)}
                        </p>


                        <p
                          className="
                            mt-0.5
                            text-[10px]
                            font-medium
                            text-slate-400
                          "
                        >
                          GST included
                        </p>

                      </div>


                      {/* =====================================
                          SIZE + QUANTITY + TOTAL
                      ====================================== */}

                      <div
                        className="
                          mt-4
                          flex
                          w-full
                          flex-wrap
                          items-end
                          gap-3

                          sm:flex-nowrap
                          sm:gap-4
                        "
                      >

                        {/* =================================
                            SIZE DROPDOWN

                            BOTH:
                            Kit Product
                            Normal Product

                            can change size.
                        ================================== */}

                        {item.hasSize &&
                          item.sizes?.length > 0 && (

                            <div
                              className="
                                w-[100px]

                                sm:w-[115px]
                              "
                            >
                              <label
                                className="
                                  mb-1.5
                                  block
                                  text-[10px]
                                  font-bold
                                  uppercase
                                  tracking-[0.08em]
                                  text-slate-400
                                "
                              >
                                Size
                              </label>


                              <div className="relative">

                                <select
                                  value={item.size || ""}
                                  onChange={(event) =>
                                    updateCartSize(
                                      item.cartKey,
                                      event.target.value
                                    )
                                  }
                                  className="
                                    h-10
                                    w-full
                                    cursor-pointer
                                    appearance-none
                                    rounded-lg
                                    border
                                    border-slate-200
                                    bg-white
                                    pl-3
                                    pr-8
                                    text-[12px]
                                    font-bold
                                    text-slate-800
                                    outline-none
                                    transition

                                    hover:border-indigo-300

                                    focus:border-indigo-500
                                    focus:ring-2
                                    focus:ring-indigo-100
                                  "
                                >

                                  {item.sizes.map((size) => (
                                    <option
                                      key={size.label}
                                      value={size.label}
                                    >
                                      {size.label}
                                    </option>
                                  ))}

                                </select>


                                <ChevronDown
                                  size={14}
                                  className="
                                    pointer-events-none
                                    absolute
                                    right-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate-400
                                  "
                                />

                              </div>
                            </div>

                          )}


                        {/* =================================
                            KIT QUANTITY

                            Kit composition already fixed.

                            NO minus
                            NO plus
                            NO quantity editing

                            Just display fixed quantity.
                        ================================== */}

                        {isKitItem && (

                          <div>

                            <label
                              className="
                                mb-1.5
                                block
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.08em]
                                text-slate-400
                              "
                            >
                              Quantity
                            </label>


                            <div
                              className="
                                flex
                                h-10
                                min-w-[70px]
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-slate-200
                                bg-slate-50
                                px-4
                              "
                            >
                              <span
                                className="
                                  text-xs
                                  font-extrabold
                                  text-slate-950
                                "
                              >
                                {item.quantity || 1}
                              </span>
                            </div>

                          </div>

                        )}


                        {/* =================================
                            NORMAL PRODUCT QUANTITY

                            Only normal individual product
                            gets - and + controls.
                        ================================== */}

                        {!isKitItem && (

                          <div>

                            <label
                              className="
                                mb-1.5
                                block
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.08em]
                                text-slate-400
                              "
                            >
                              Quantity
                            </label>


                            <div
                              className="
                                flex
                                h-10
                                items-center
                                overflow-hidden
                                rounded-lg
                                border
                                border-slate-200
                                bg-white
                              "
                            >

                              {/* MINUS */}

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.cartKey,
                                    item.quantity - 1
                                  )
                                }
                                disabled={
                                  item.quantity <= 1
                                }
                                className="
                                  flex
                                  h-full
                                  w-9
                                  items-center
                                  justify-center
                                  text-slate-500
                                  transition

                                  hover:bg-slate-50
                                  hover:text-indigo-600

                                  disabled:cursor-not-allowed
                                  disabled:opacity-30
                                "
                              >
                                <Minus size={14} />
                              </button>


                              {/* QUANTITY NUMBER */}

                              <span
                                className="
                                  flex
                                  h-full
                                  min-w-[38px]
                                  items-center
                                  justify-center
                                  border-x
                                  border-slate-100
                                  text-xs
                                  font-extrabold
                                  text-slate-950
                                "
                              >
                                {item.quantity}
                              </span>


                              {/* PLUS */}

                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    item.cartKey,
                                    item.quantity + 1
                                  )
                                }
                                className="
                                  flex
                                  h-full
                                  w-9
                                  items-center
                                  justify-center
                                  text-slate-500
                                  transition

                                  hover:bg-slate-50
                                  hover:text-indigo-600
                                "
                              >
                                <Plus size={14} />
                              </button>

                            </div>
                          </div>

                        )}


                        {/* =================================
                            ITEM TOTAL

                            Same existing position:
                            right side ending.
                        ================================== */}

                        <div
                          className="
                            ml-auto
                            flex
                            min-h-10
                            items-end
                            justify-end
                            pb-2
                            text-right
                          "
                        >

                          <div>

                            <p
                              className="
                                text-[15px]
                                font-extrabold
                                text-slate-950

                                sm:text-[16px]
                              "
                            >
                              ₹{itemTotal.toFixed(2)}
                            </p>


                            <p
                              className="
                                mt-0.5
                                text-[9px]
                                font-medium
                                text-slate-400
                              "
                            >
                              GST included
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>


                    {/* =====================================
                        REMOVE BUTTON

                        Existing flow unchanged.
                    ====================================== */}

                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.cartKey)
                      }
                      aria-label={`Remove ${item.name}`}
                      title="Remove"
                      className="
                        absolute
                        right-3
                        top-3
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        text-slate-400
                        transition

                        hover:bg-red-50
                        hover:text-red-500

                        sm:right-4
                        sm:top-4
                      "
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                </article>
              );
            })}

          </section>


          {/* =================================================
              RIGHT SIDE - ORDER SUMMARY
          ================================================== */}

          <aside
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm

              sm:p-6

              lg:sticky
              lg:top-[105px]
            "
          >

            <h2
              className="
                text-xl
                font-extrabold
                text-slate-950
              "
            >
              Order Summary
            </h2>


            {/* =============================================
                SUMMARY DETAILS
            ============================================== */}

            <div
              className="
                mt-6
                space-y-4
                text-sm
              "
            >

              {/* SUBTOTAL */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                <span className="text-slate-500">
                  Subtotal
                </span>

                <strong className="text-slate-950">
                  ₹{Number(cartSubtotal || 0).toFixed(2)}
                </strong>
              </div>


              {/* SHIPPING */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                <span className="text-slate-500">
                  Shipping
                </span>


                {Number(shippingAmount || 0) === 0 ? (

                  <strong
                    className="
                      font-bold
                      text-emerald-600
                    "
                  >
                    FREE
                  </strong>

                ) : (

                  <strong className="text-slate-950">
                    ₹{Number(shippingAmount).toFixed(2)}
                  </strong>

                )}

              </div>


              {/* =========================================
                  GST INCLUDED

                  GST is already included in products.
                  Not added again.
              ========================================== */}

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                "
              >

                <div>

                  <span className="text-slate-500">
                    GST (5%)
                  </span>


                  <p
                    className="
                      mt-0.5
                      text-[10px]
                      text-slate-400
                    "
                  >
                    Included
                  </p>

                </div>


                <strong className="text-slate-950">
                  ₹{includedGst.toFixed(2)}
                </strong>

              </div>

            </div>


            {/* =============================================
                TOTAL
            ============================================== */}

            <div
              className="
                mt-5
                flex
                items-center
                justify-between
                border-t
                border-slate-200
                pt-5
              "
            >

              <div>

                <span
                  className="
                    text-lg
                    font-extrabold
                    text-slate-950
                  "
                >
                  Total
                </span>


                <p
                  className="
                    mt-0.5
                    text-[10px]
                    text-slate-400
                  "
                >
                  Inclusive of GST
                </p>

              </div>


              <span
                className="
                  text-xl
                  font-extrabold
                  text-slate-950
                "
              >
                ₹{finalTotal.toFixed(2)}
              </span>

            </div>


            {/* =============================================
                CHECKOUT BUTTON
            ============================================== */}

            <Link
              to="/checkout"
              className="
                mt-6
                flex
                h-[52px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-indigo-600
                px-4
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-indigo-600/15
                transition

                hover:bg-indigo-700

                active:scale-[0.99]
              "
            >
              Proceed to Checkout

              <ArrowRight size={17} />
            </Link>

          </aside>

        </div>

      </div>
    </main>
  );
}