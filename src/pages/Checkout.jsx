import {
  CheckCircle2,
  MapPin,
  PackageCheck,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { useStore } from "../context/StoreContext";


export default function Checkout() {
  const {
    student,
    profile,

    cart,

    cartSubtotal,
    shippingAmount,
    gstAmount,
    cartTotal,

    defaultAddress,
    addAddress,

    createOrder,
  } = useStore();


  const [
    orderSuccess,
    setOrderSuccess,
  ] = useState(false);

  const [
    placedOrder,
    setPlacedOrder,
  ] = useState(null);

  const [
    saveAddress,
    setSaveAddress,
  ] = useState(true);

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
    });


  useEffect(() => {
    setForm({
      name:
        profile?.name ||
        student?.name ||
        "",

      email:
        profile?.email ||
        student?.email ||
        "",

      phone:
        defaultAddress?.phone ||
        profile?.phone ||
        student?.phone ||
        "",

      addressLine1:
        defaultAddress?.addressLine1 ||
        "",

      addressLine2:
        defaultAddress?.addressLine2 ||
        "",

      city:
        defaultAddress?.city ||
        "",

      state:
        defaultAddress?.state ||
        "",

      pincode:
        defaultAddress?.pincode ||
        "",
    });
  }, [
    profile,
    student,
    defaultAddress,
  ]);


  const changeField = (
    field,
    value
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };


  const placeOrder = (event) => {
    event.preventDefault();

    if (cart.length === 0) return;


    const shippingAddress = {
      fullName:
        form.name.trim(),

      phone:
        form.phone.trim(),

      addressLine1:
        form.addressLine1.trim(),

      addressLine2:
        form.addressLine2.trim(),

      city:
        form.city.trim(),

      state:
        form.state.trim(),

      pincode:
        form.pincode.trim(),
    };


    if (saveAddress) {
      const sameAsDefault =
        defaultAddress &&
        defaultAddress.addressLine1 ===
          shippingAddress.addressLine1 &&
        defaultAddress.city ===
          shippingAddress.city &&
        defaultAddress.pincode ===
          shippingAddress.pincode;


      if (!sameAsDefault) {
        addAddress({
          ...shippingAddress,
          isDefault:
            !defaultAddress,
        });
      }
    }


    const order =
      createOrder({
        shippingAddress,
        paymentMethod: "COD",
      });


    if (order) {
      setPlacedOrder(order);
      setOrderSuccess(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };


  /* ==============================
     SUCCESS PAGE
  =============================== */

  if (orderSuccess) {
    return (
      <main
        className="
          min-h-[70vh]
          bg-[#F7F9FC]
          px-4 py-16
        "
      >
        <div
          className="
            mx-auto
            max-w-[600px]
            rounded-3xl
            border
            border-[#DCE3ED]
            bg-white
            p-7
            text-center
            shadow-sm
            sm:p-10
          "
        >
          <div
            className="
              mx-auto
              flex h-20 w-20
              items-center
              justify-center
              rounded-full
              bg-emerald-50
              text-emerald-600
            "
          >
            <CheckCircle2
              size={38}
            />
          </div>

          <p
            className="
              mt-6
              text-[11px]
              font-extrabold
              uppercase
              tracking-[0.2em]
              text-[#4F39F6]
            "
          >
            Order Confirmed
          </p>

          <h1
            className="
              mt-2
              text-3xl
              font-extrabold
              text-[#07152D]
            "
          >
            Order placed successfully
          </h1>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-[#71809D]
            "
          >
            Your order has been saved
            and is now available in
            your order history.
          </p>


          {placedOrder && (
            <div
              className="
                mt-6
                rounded-xl
                bg-[#F7F9FC]
                p-4
              "
            >
              <p
                className="
                  text-xs
                  text-[#71809D]
                "
              >
                Order Number
              </p>

              <strong
                className="
                  mt-1
                  block
                  text-lg
                  text-[#07152D]
                "
              >
                #
                {
                  placedOrder.orderNumber
                }
              </strong>
            </div>
          )}


          <div
            className="
              mt-7
              grid gap-3
              sm:grid-cols-2
            "
          >
            <Link
              to="/"
              className="
                flex h-12
                items-center
                justify-center
                rounded-xl
                border
                border-[#DCE3ED]
                text-sm
                font-bold
                text-[#52617B]
                transition
                hover:bg-[#F7F9FC]
              "
            >
              Continue Shopping
            </Link>

            <Link
              to="/profile"
              className="
                flex h-12
                items-center
                justify-center
                rounded-xl
                bg-[#4F39F6]
                text-sm
                font-extrabold
                text-white
                transition
                hover:bg-[#3F2BE0]
              "
            >
              View My Orders
            </Link>
          </div>
        </div>
      </main>
    );
  }


  return (
    <main
      className="
        bg-[#F7F9FC]
        px-4 py-8
        sm:px-6 sm:py-10
        lg:px-10
      "
    >
      <div className="mx-auto max-w-[1200px]">

        <p
          className="
            text-[10px]
            font-extrabold
            uppercase
            tracking-[0.2em]
            text-[#4F39F6]
          "
        >
          Checkout
        </p>

        <h1
          className="
            mt-2
            text-[28px]
            font-extrabold
            text-[#07152D]
            sm:text-[34px]
          "
        >
          Billing & Shipping
        </h1>


        <form
          onSubmit={placeOrder}
          className="
            mt-7
            grid gap-6
            lg:grid-cols-[minmax(0,1fr)_370px]
            lg:items-start
          "
        >

          {/* LEFT */}
          <section
            className="
              rounded-2xl
              border
              border-[#DCE3ED]
              bg-white
              p-5
              shadow-sm
              sm:p-6
            "
          >
            <h2
              className="
                text-xl
                font-extrabold
                text-[#07152D]
              "
            >
              Student Details
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-[#71809D]
              "
            >
              Your account information
              is filled automatically.
            </p>


            <div
              className="
                mt-5
                grid gap-4
                sm:grid-cols-2
              "
            >
              <CheckoutField
                label="Full Name"
                value={form.name}
                onChange={(value) =>
                  changeField(
                    "name",
                    value
                  )
                }
                required
              />

              <CheckoutField
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(value) =>
                  changeField(
                    "email",
                    value
                  )
                }
                required
              />

              <CheckoutField
                label="Mobile Number"
                type="tel"
                value={form.phone}
                onChange={(value) =>
                  changeField(
                    "phone",
                    value
                  )
                }
                required
              />

              <CheckoutField
                label="Admission Number"
                value={
                  student?.admissionNo ||
                  ""
                }
                disabled
              />
            </div>


            {/* ADDRESS */}
            <div
              className="
                mt-8
                border-t
                border-[#E8EDF4]
                pt-6
              "
            >
              <div
                className="
                  flex items-center
                  gap-2
                "
              >
                <MapPin
                  size={19}
                  className="
                    text-[#4F39F6]
                  "
                />

                <h2
                  className="
                    text-xl
                    font-extrabold
                    text-[#07152D]
                  "
                >
                  Delivery Address
                </h2>
              </div>


              {defaultAddress && (
                <div
                  className="
                    mt-3
                    rounded-lg
                    bg-[#F0EEFF]
                    px-3 py-2
                    text-xs
                    font-medium
                    text-[#4F39F6]
                  "
                >
                  Your default address
                  has been filled
                  automatically. You can
                  change it for this order.
                </div>
              )}


              <div
                className="
                  mt-5
                  grid gap-4
                  sm:grid-cols-2
                "
              >
                <div className="sm:col-span-2">
                  <CheckoutField
                    label="House / Street / Area"
                    value={
                      form.addressLine1
                    }
                    onChange={(value) =>
                      changeField(
                        "addressLine1",
                        value
                      )
                    }
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <CheckoutField
                    label="Apartment / Landmark"
                    value={
                      form.addressLine2
                    }
                    onChange={(value) =>
                      changeField(
                        "addressLine2",
                        value
                      )
                    }
                  />
                </div>

                <CheckoutField
                  label="City"
                  value={form.city}
                  onChange={(value) =>
                    changeField(
                      "city",
                      value
                    )
                  }
                  required
                />

                <CheckoutField
                  label="State"
                  value={form.state}
                  onChange={(value) =>
                    changeField(
                      "state",
                      value
                    )
                  }
                  required
                />

                <CheckoutField
                  label="Pincode"
                  value={form.pincode}
                  onChange={(value) =>
                    changeField(
                      "pincode",
                      value
                    )
                  }
                  required
                />
              </div>


              <label
                className="
                  mt-5
                  flex cursor-pointer
                  items-center gap-2
                  text-sm
                  font-semibold
                  text-[#52617B]
                "
              >
                <input
                  type="checkbox"
                  checked={saveAddress}
                  onChange={(event) =>
                    setSaveAddress(
                      event.target
                        .checked
                    )
                  }
                  className="
                    h-4 w-4
                    accent-[#4F39F6]
                  "
                />

                Save this address to my
                profile
              </label>
            </div>
          </section>


          {/* ORDER SUMMARY */}
          <aside
            className="
              rounded-2xl
              border
              border-[#DCE3ED]
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
                text-[#07152D]
              "
            >
              Order Summary
            </h2>


            <div
              className="
                mt-5
                divide-y
                divide-[#E8EDF4]
              "
            >
              {cart.map((item) => (
                <div
                  key={item.cartKey}
                  className="
                    flex gap-3 py-4
                  "
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      h-14 w-14
                      shrink-0
                      rounded-lg
                      object-cover
                    "
                  />

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        text-sm
                        font-bold
                        text-[#07152D]
                      "
                    >
                      {item.name}
                    </p>

                    <p
                      className="
                        mt-1
                        text-[11px]
                        text-[#71809D]
                      "
                    >
                      {item.size &&
                        `Size: ${item.size} • `}

                      Qty: {item.quantity}
                    </p>
                  </div>

                  <strong
                    className="
                      whitespace-nowrap
                      text-sm
                      text-[#07152D]
                    "
                  >
                    ₹
                    {(
                      Number(item.price) *
                      Number(
                        item.quantity
                      )
                    ).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>


            <div
              className="
                mt-3
                space-y-3
                border-t
                border-[#E8EDF4]
                pt-5
                text-sm
              "
            >
              <SummaryRow
                label="Subtotal"
                value={`₹${cartSubtotal.toFixed(
                  2
                )}`}
              />

              <SummaryRow
                label="Shipping"
                value={
                  shippingAmount === 0
                    ? "FREE"
                    : `₹${shippingAmount.toFixed(
                        2
                      )}`
                }
              />

              <SummaryRow
                label="GST (5%) Included"
                value={`₹${gstAmount.toFixed(
                  2
                )}`}
              />
            </div>


            <div
              className="
                mt-5
                flex
                items-center
                justify-between
                border-t
                border-[#DCE3ED]
                pt-5
              "
            >
              <div>
                <strong
                  className="
                    text-lg
                    text-[#07152D]
                  "
                >
                  Total
                </strong>

                <p
                  className="
                    text-[10px]
                    text-[#71809D]
                  "
                >
                  Inclusive of GST
                </p>
              </div>

              <strong
                className="
                  text-xl
                  text-[#07152D]
                "
              >
                ₹
                {cartTotal.toFixed(2)}
              </strong>
            </div>


            


            <button
              type="submit"
              disabled={
                cart.length === 0
              }
              className="
                mt-5
                flex h-[52px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#4F39F6]
                text-sm
                font-extrabold
                text-white
                shadow-[0_8px_20px_rgba(79,57,246,0.22)]
                transition
                hover:bg-[#3F2BE0]

                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <PackageCheck
                size={18}
              />

              Place Order
            </button>
          </aside>
        </form>
      </div>
    </main>
  );
}


/* ==============================
   FIELD
=============================== */

function CheckoutField({
  label,
  type = "text",
  value,
  onChange,
  required = false,
  disabled = false,
}) {
  return (
    <label className="block">
      <span
        className="
          mb-1.5
          block
          text-xs
          font-bold
          text-[#07152D]
        "
      >
        {label}

        {required && (
          <span className="text-red-500">
            {" "}*
          </span>
        )}
      </span>

      <input
        type={type}
        value={value}
        disabled={disabled}
        required={required}
        onChange={(event) =>
          onChange?.(
            event.target.value
          )
        }
        className="
          h-11
          w-full
          rounded-xl
          border
          border-[#DCE3ED]
          bg-white
          px-4
          text-sm
          text-[#07152D]
          outline-none
          transition

          focus:border-[#4F39F6]
          focus:ring-2
          focus:ring-[#E5E1FF]

          disabled:cursor-not-allowed
          disabled:bg-[#F7F9FC]
          disabled:text-[#71809D]
        "
      />
    </label>
  );
}


/* ==============================
   SUMMARY
=============================== */

function SummaryRow({
  label,
  value,
}) {
  return (
    <div
      className="
        flex items-center
        justify-between
        gap-4
      "
    >
      <span className="text-[#71809D]">
        {label}
      </span>

      <strong className="text-[#07152D]">
        {value}
      </strong>
    </div>
  );
}