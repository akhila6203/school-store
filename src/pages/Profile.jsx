// src/pages/Profile.jsx

import {
  Camera,
  Check,
  CircleCheck,
  Clock3,
  Edit3,
  Mail,
  MapPin,
  Package,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Link } from "react-router-dom";

import AccountSidebar from "../components/AccountSidebar";
import { useStore } from "../context/StoreContext";

const emptyAddress = {
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  isDefault: false,
};

export default function Profile() {
  const {
    student,
    profile,
    updateProfile,

    cartCount,
    orders,

    addresses,
    defaultAddress,

    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useStore();

  const [activeTab, setActiveTab] =
    useState("overview");

  const [
    profileModalOpen,
    setProfileModalOpen,
  ] = useState(false);

  const [profileForm, setProfileForm] =
    useState({
      name: "",
      email: "",
      phone: "",
      photo: "",
    });

  const fileInputRef = useRef(null);

  const [
    addressModalOpen,
    setAddressModalOpen,
  ] = useState(false);

  const [
    editingAddressId,
    setEditingAddressId,
  ] = useState(null);

  const [addressForm, setAddressForm] =
    useState(emptyAddress);

  const displayName =
    profile?.name ||
    student?.name ||
    "";

  const displayEmail =
    profile?.email ||
    student?.email ||
    "";

  const displayPhone =
    profile?.phone ||
    student?.phone ||
    "";

  const displayPhoto =
    profile?.photo || "";

  const openProfileEdit = () => {
    setProfileForm({
      name: displayName,
      email: displayEmail,
      phone: displayPhone,
      photo: displayPhoto,
    });

    setProfileModalOpen(true);
  };

  const handlePhotoChange = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setProfileForm((current) => ({
        ...current,
        photo: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const saveProfile = (event) => {
    event.preventDefault();

    updateProfile({
      name: profileForm.name.trim(),
      email: profileForm.email.trim(),
      phone: profileForm.phone.trim(),
      photo: profileForm.photo,
    });

    setProfileModalOpen(false);
  };

  const openAddAddress = () => {
    setEditingAddressId(null);

    setAddressForm({
      ...emptyAddress,
      fullName: displayName,
      phone: displayPhone,
      isDefault: addresses.length === 0,
    });

    setAddressModalOpen(true);
  };

  const openEditAddress = (address) => {
    setEditingAddressId(address.id);

    setAddressForm({
      fullName: address.fullName || "",
      phone: address.phone || "",
      addressLine1:
        address.addressLine1 || "",
      addressLine2:
        address.addressLine2 || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      isDefault: Boolean(
        address.isDefault
      ),
    });

    setAddressModalOpen(true);
  };

  const saveAddress = (event) => {
    event.preventDefault();

    const cleanAddress = {
      ...addressForm,

      fullName:
        addressForm.fullName.trim(),

      phone:
        addressForm.phone.trim(),

      addressLine1:
        addressForm.addressLine1.trim(),

      addressLine2:
        addressForm.addressLine2.trim(),

      city:
        addressForm.city.trim(),

      state:
        addressForm.state.trim(),

      pincode:
        addressForm.pincode.trim(),
    };

    if (editingAddressId) {
      updateAddress(
        editingAddressId,
        cleanAddress
      );
    } else {
      addAddress(cleanAddress);
    }

    setAddressModalOpen(false);
    setEditingAddressId(null);
    setAddressForm(emptyAddress);
  };

  const getOrderStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return {
          icon: CircleCheck,
          className:
            "bg-emerald-50 text-emerald-700",
        };

      case "cancelled":
        return {
          icon: XCircle,
          className:
            "bg-red-50 text-red-600",
        };

      default:
        return {
          icon: Clock3,
          className:
            "bg-[#F0EEFF] text-[#4F39F6]",
        };
    }
  };

  if (!student) return null;

  return (
    <>
      <main
        className="
          bg-[#F7F9FC]
          px-3 py-4

          sm:px-5 sm:py-5

          lg:h-[calc(100vh-82px)]
          lg:overflow-hidden
          lg:px-8
          lg:py-5
        "
      >
        <div
          className="
            mx-auto
            h-full
            max-w-[1250px]
          "
        >
          <div
            className="
              grid
              gap-4

              lg:h-full
              lg:grid-cols-[280px_minmax(0,1fr)]
              lg:items-start
              lg:gap-5
            "
          >
            {/* LEFT SIDEBAR */}
            <div
              className="
                w-full

                lg:sticky
                lg:top-0
                lg:h-fit
                lg:self-start
              "
            >
              <AccountSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            {/* RIGHT SCROLL AREA */}
            <section
              className="
                min-w-0

                lg:h-full
                lg:overflow-y-auto
                lg:pr-2

                [&::-webkit-scrollbar]:w-[5px]
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-[#D8D3FF]
              "
            >
              {/* ==============================
                  OVERVIEW
              =============================== */}

              {activeTab === "overview" && (
                <div className="space-y-4 pb-5">
                  <div
                    className="
                      rounded-2xl
                      border
                      border-[#DCE3ED]
                      bg-white
                      p-4
                      shadow-sm

                      sm:p-5
                      lg:p-6
                    "
                  >
                    <div
                      className="
                        flex
                        flex-col
                        gap-4

                        sm:flex-row
                        sm:items-start
                        sm:justify-between
                      "
                    >
                      <div>
                        <p
                          className="
                            text-[10px]
                            font-extrabold
                            uppercase
                            tracking-[0.2em]
                            text-[#4F39F6]
                          "
                        >
                          Overview
                        </p>

                        <h2
                          className="
                            mt-1.5
                            text-[21px]
                            font-extrabold
                            text-[#07152D]

                            sm:text-[25px]
                            lg:text-[28px]
                          "
                        >
                          Hello, {displayName}
                        </h2>

                        <p
                          className="
                            mt-1
                            max-w-[560px]
                            text-[13px]
                            leading-5
                            text-[#71809D]

                            sm:text-sm
                          "
                        >
                          Manage your account,
                          order history and delivery
                          addresses.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={openProfileEdit}
                        className="
                          inline-flex
                          h-10
                          w-fit
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          border
                          border-[#DCE3ED]
                          bg-white
                          px-4
                          text-[13px]
                          font-semibold
                          text-[#07152D]
                          transition

                          hover:border-[#4F39F6]
                          hover:bg-[#FAF9FF]
                          hover:text-[#4F39F6]
                        "
                      >
                        <Edit3 size={15} />
                        Edit Profile
                      </button>
                    </div>

                    {/* DASHBOARD CARDS */}

                    <div
                      className="
                        mt-5
                        grid
                        grid-cols-2
                        gap-3

                        xl:grid-cols-4
                      "
                    >
                      <InfoCard
                        icon={ShoppingBag}
                        title="Cart Items"
                        value={cartCount}
                      />

                      <InfoCard
                        icon={Package}
                        title="Orders"
                        value={orders.length}
                      />

                      <InfoCard
                        icon={MapPin}
                        title="Saved Addresses"
                        value={addresses.length}
                      />

                      <InfoCard
                        icon={UserRound}
                        title="Admission No."
                        value={student.admissionNo}
                        small
                      />
                    </div>

                    {/* ACCOUNT DETAILS */}

                    <div
                      className="
                        mt-5
                        grid
                        gap-3
                        border-t
                        border-[#E8EDF4]
                        pt-5

                        sm:grid-cols-2
                      "
                    >
                      <ProfileDetail
                        icon={Mail}
                        label="Email Address"
                        value={
                          displayEmail ||
                          "Not added"
                        }
                      />

                      <ProfileDetail
                        icon={Phone}
                        label="Mobile Number"
                        value={
                          displayPhone ||
                          "Not added"
                        }
                      />

                      <ProfileDetail
                        icon={UserRound}
                        label="Class"
                        value={`${student.className}${
                          student.section
                            ? ` • Section ${student.section}`
                            : ""
                        }`}
                      />

                      <ProfileDetail
                        icon={Package}
                        label="School"
                        value={
                          student.school ||
                          "School"
                        }
                      />
                    </div>
                  </div>

                  {/* DEFAULT ADDRESS */}

                  <div
                    className="
                      rounded-2xl
                      border
                      border-[#DCE3ED]
                      bg-white
                      p-4
                      shadow-sm

                      sm:p-5
                      lg:p-6
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                    >
                      <div>
                        <p
                          className="
                            text-[10px]
                            font-extrabold
                            uppercase
                            tracking-[0.2em]
                            text-[#4F39F6]
                          "
                        >
                          Delivery
                        </p>

                        <h3
                          className="
                            mt-1
                            text-lg
                            font-extrabold
                            text-[#07152D]
                          "
                        >
                          Default Address
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setActiveTab(
                            "addresses"
                          )
                        }
                        className="
                          text-sm
                          font-bold
                          text-[#4F39F6]

                          hover:text-[#3F2BE0]
                        "
                      >
                        Manage
                      </button>
                    </div>

                    {defaultAddress ? (
                      <AddressDisplay
                        address={
                          defaultAddress
                        }
                      />
                    ) : (
                      <div
                        className="
                          mt-5
                          rounded-xl
                          border
                          border-dashed
                          border-[#CBD5E1]
                          p-6
                          text-center
                        "
                      >
                        <MapPin
                          size={25}
                          className="
                            mx-auto
                            text-[#94A3B8]
                          "
                        />

                        <p
                          className="
                            mt-3
                            text-sm
                            font-semibold
                            text-[#52617B]
                          "
                        >
                          No delivery address
                          saved yet.
                        </p>

                        <button
                          type="button"
                          onClick={
                            openAddAddress
                          }
                          className="
                            mt-4
                            rounded-xl
                            bg-[#4F39F6]
                            px-5
                            py-2.5
                            text-sm
                            font-bold
                            text-white
                            transition

                            hover:bg-[#3F2BE0]
                          "
                        >
                          Add Address
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ==============================
                  ORDERS
              =============================== */}

              {activeTab === "orders" && (
                <div
                  className="
                    mb-5
                    rounded-2xl
                    border
                    border-[#DCE3ED]
                    bg-white
                    p-4
                    shadow-sm

                    sm:p-5
                    lg:p-6
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.2em]
                      text-[#4F39F6]
                    "
                  >
                    Purchases
                  </p>

                  <h2
                    className="
                      mt-1
                      text-[22px]
                      font-extrabold
                      text-[#07152D]

                      sm:text-2xl
                    "
                  >
                    My Orders
                  </h2>

                  {orders.length === 0 ? (
                    <div className="py-12 text-center">
                      <Package
                        size={38}
                        className="
                          mx-auto
                          text-[#CBD5E1]
                        "
                      />

                      <h3
                        className="
                          mt-3
                          font-bold
                          text-[#07152D]
                        "
                      >
                        No orders yet
                      </h3>

                      <p
                        className="
                          mt-1
                          text-sm
                          text-[#71809D]
                        "
                      >
                        Your completed orders
                        will appear here.
                      </p>

                      <Link
                        to="/"
                        className="
                          mt-5
                          inline-flex
                          rounded-xl
                          bg-[#4F39F6]
                          px-5
                          py-3
                          text-sm
                          font-bold
                          text-white
                          transition

                          hover:bg-[#3F2BE0]
                        "
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="mt-5 space-y-4">
                      {orders.map(
                        (order) => {
                          const status =
                            getOrderStatus(
                              order.status
                            );

                          const StatusIcon =
                            status.icon;

                          return (
                            <div
                              key={
                                order.id
                              }
                              className="
                                overflow-hidden
                                rounded-2xl
                                border
                                border-[#DCE3ED]
                              "
                            >
                              {/* ORDER HEADER */}

                              <div
                                className="
                                  flex
                                  flex-col
                                  gap-3
                                  bg-[#F7F9FC]
                                  px-4
                                  py-4

                                  sm:flex-row
                                  sm:items-center
                                  sm:justify-between
                                "
                              >
                                <div>
                                  <p
                                    className="
                                      text-sm
                                      font-extrabold
                                      text-[#07152D]
                                    "
                                  >
                                    Order #
                                    {
                                      order.orderNumber
                                    }
                                  </p>

                                  <p
                                    className="
                                      mt-1
                                      text-xs
                                      text-[#71809D]
                                    "
                                  >
                                    {new Date(
                                      order.createdAt
                                    ).toLocaleDateString(
                                      "en-IN",
                                      {
                                        day: "2-digit",
                                        month:
                                          "short",
                                        year: "numeric",
                                      }
                                    )}
                                  </p>
                                </div>

                                <span
                                  className={`
                                    inline-flex
                                    w-fit
                                    items-center
                                    gap-1.5
                                    rounded-full
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-bold
                                    ${status.className}
                                  `}
                                >
                                  <StatusIcon
                                    size={
                                      14
                                    }
                                  />

                                  {
                                    order.status
                                  }
                                </span>
                              </div>

                              {/* ORDER ITEMS */}

                              <div
                                className="
                                  divide-y
                                  divide-[#E8EDF4]
                                "
                              >
                                {order.items.map(
                                  (
                                    item,
                                    index
                                  ) => (
                                    <div
                                      key={`${item.id}-${index}`}
                                      className="
                                        flex
                                        items-center
                                        gap-3
                                        p-3

                                        sm:p-4
                                      "
                                    >
                                      <img
                                        src={
                                          item.image
                                        }
                                        alt={
                                          item.name
                                        }
                                        className="
                                          h-14
                                          w-14
                                          shrink-0
                                          rounded-xl
                                          object-cover

                                          sm:h-16
                                          sm:w-16
                                        "
                                      />

                                      <div
                                        className="
                                          min-w-0
                                          flex-1
                                        "
                                      >
                                        <p
                                          className="
                                            text-sm
                                            font-bold
                                            text-[#07152D]
                                          "
                                        >
                                          {
                                            item.name
                                          }
                                        </p>

                                        <div
                                          className="
                                            mt-1
                                            flex
                                            flex-wrap
                                            gap-x-4
                                            gap-y-1
                                            text-xs
                                            text-[#71809D]
                                          "
                                        >
                                          {item.size && (
                                            <span>
                                              Size:{" "}
                                              {
                                                item.size
                                              }
                                            </span>
                                          )}

                                          <span>
                                            Qty:{" "}
                                            {
                                              item.quantity
                                            }
                                          </span>
                                        </div>
                                      </div>

                                      <strong
                                        className="
                                          whitespace-nowrap
                                          text-sm
                                          text-[#07152D]
                                        "
                                      >
                                        ₹
                                        {Number(
                                          item.total
                                        ).toFixed(
                                          2
                                        )}
                                      </strong>
                                    </div>
                                  )
                                )}
                              </div>

                              {/* ORDER TOTAL */}

                              <div
                                className="
                                  flex
                                  items-center
                                  justify-between
                                  border-t
                                  border-[#E8EDF4]
                                  px-4
                                  py-4
                                "
                              >
                                <div>
                                  <span
                                    className="
                                      text-sm
                                      text-[#71809D]
                                    "
                                  >
                                    Order Total
                                  </span>

                                  <p
                                    className="
                                      mt-0.5
                                      text-[10px]
                                      text-[#94A3B8]
                                    "
                                  >
                                    GST included
                                  </p>
                                </div>

                                <strong
                                  className="
                                    text-lg
                                    text-[#07152D]
                                  "
                                >
                                  ₹
                                  {Number(
                                    order.total
                                  ).toFixed(
                                    2
                                  )}
                                </strong>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ==============================
                  ADDRESSES
              =============================== */}

              {activeTab ===
                "addresses" && (
                <div
                  className="
                    mb-5
                    rounded-2xl
                    border
                    border-[#DCE3ED]
                    bg-white
                    p-4
                    shadow-sm

                    sm:p-5
                    lg:p-6
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      gap-4

                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                    "
                  >
                    <div>
                      <p
                        className="
                          text-[10px]
                          font-extrabold
                          uppercase
                          tracking-[0.2em]
                          text-[#4F39F6]
                        "
                      >
                        Addresses
                      </p>

                      <h2
                        className="
                          mt-1
                          text-[22px]
                          font-extrabold
                          text-[#07152D]

                          sm:text-2xl
                        "
                      >
                        Saved Addresses
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={
                        openAddAddress
                      }
                      className="
                        inline-flex
                        h-10
                        w-fit
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#4F39F6]
                        px-4
                        text-sm
                        font-extrabold
                        text-white
                        shadow-sm
                        transition

                        hover:bg-[#3F2BE0]
                      "
                    >
                      <Plus size={17} />
                      Add Address
                    </button>
                  </div>

                  {addresses.length ===
                  0 ? (
                    <div
                      className="
                        mt-6
                        rounded-xl
                        border
                        border-dashed
                        border-[#CBD5E1]
                        py-10
                        text-center
                      "
                    >
                      <MapPin
                        size={30}
                        className="
                          mx-auto
                          text-[#CBD5E1]
                        "
                      />

                      <p
                        className="
                          mt-3
                          font-semibold
                          text-[#52617B]
                        "
                      >
                        No saved addresses.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-5 grid gap-4">
                      {addresses.map(
                        (address) => (
                          <div
                            key={
                              address.id
                            }
                            className="
                              relative
                              rounded-2xl
                              border
                              border-[#DCE3ED]
                              bg-white
                              p-4
                              transition

                              hover:border-[#C8C0FF]

                              sm:p-5
                            "
                          >
                            <div
                              className="
                                absolute
                                right-3
                                top-3
                                flex
                                gap-1
                              "
                            >
                              <button
                                type="button"
                                onClick={() =>
                                  openEditAddress(
                                    address
                                  )
                                }
                                className="
                                  flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-lg
                                  text-[#71809D]

                                  hover:bg-[#F0EEFF]
                                  hover:text-[#4F39F6]
                                "
                              >
                                <Edit3
                                  size={
                                    16
                                  }
                                />
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  const confirmed =
                                    window.confirm(
                                      "Delete this address?"
                                    );

                                  if (
                                    confirmed
                                  ) {
                                    deleteAddress(
                                      address.id
                                    );
                                  }
                                }}
                                className="
                                  flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-lg
                                  text-[#71809D]

                                  hover:bg-red-50
                                  hover:text-red-500
                                "
                              >
                                <Trash2
                                  size={
                                    16
                                  }
                                />
                              </button>
                            </div>

                            <div className="pr-20">
                              <div
                                className="
                                  flex
                                  flex-wrap
                                  items-center
                                  gap-2
                                "
                              >
                                <MapPin
                                  size={
                                    17
                                  }
                                  className="
                                    text-[#4F39F6]
                                  "
                                />

                                <strong
                                  className="
                                    text-[#07152D]
                                  "
                                >
                                  {
                                    address.fullName
                                  }
                                </strong>

                                {address.isDefault && (
                                  <span
                                    className="
                                      rounded-full
                                      bg-emerald-50
                                      px-2
                                      py-1
                                      text-[9px]
                                      font-extrabold
                                      uppercase
                                      text-emerald-600
                                    "
                                  >
                                    Default
                                  </span>
                                )}
                              </div>

                              <p
                                className="
                                  mt-3
                                  text-sm
                                  leading-6
                                  text-[#52617B]
                                "
                              >
                                {
                                  address.addressLine1
                                }

                                {address.addressLine2 &&
                                  `, ${address.addressLine2}`}

                                <br />

                                {
                                  address.city
                                }
                                ,{" "}
                                {
                                  address.state
                                }{" "}
                                -{" "}
                                {
                                  address.pincode
                                }

                                <br />

                                {
                                  address.phone
                                }
                              </p>
                            </div>

                            {!address.isDefault && (
                              <button
                                type="button"
                                onClick={() =>
                                  setDefaultAddress(
                                    address.id
                                  )
                                }
                                className="
                                  mt-4
                                  rounded-lg
                                  border
                                  border-[#DCE3ED]
                                  px-3
                                  py-2
                                  text-xs
                                  font-bold
                                  text-[#52617B]
                                  transition

                                  hover:border-[#4F39F6]
                                  hover:text-[#4F39F6]
                                "
                              >
                                Set as Default
                              </button>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* ==============================
          EDIT PROFILE MODAL
      =============================== */}

      {profileModalOpen && (
        <ModalOverlay
          close={() =>
            setProfileModalOpen(false)
          }
        >
          <form
            onSubmit={saveProfile}
            className="
              w-full
              max-w-[500px]
              rounded-2xl
              bg-white
              p-5
              shadow-2xl
              sm:p-6
            "
          >
            <ModalHeader
              title="Edit Profile"
              close={() =>
                setProfileModalOpen(
                  false
                )
              }
            />

            <div className="mt-5 flex justify-center">
              <div className="relative">
                <div
                  className="
                    flex
                    h-24
                    w-24
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border-2
                    border-[#4F39F6]
                    bg-[#F7F9FC]
                  "
                >
                  {profileForm.photo ? (
                    <img
                      src={
                        profileForm.photo
                      }
                      alt="Profile"
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  ) : (
                    <UserRound
                      size={35}
                      className="
                        text-[#94A3B8]
                      "
                    />
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="
                    absolute
                    bottom-0
                    right-0
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-[#4F39F6]
                    text-white
                    shadow-md

                    hover:bg-[#3F2BE0]
                  "
                >
                  <Camera size={16} />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={
                    handlePhotoChange
                  }
                  className="hidden"
                />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <FormField
                label="Full Name"
                value={
                  profileForm.name
                }
                onChange={(value) =>
                  setProfileForm(
                    (current) => ({
                      ...current,
                      name: value,
                    })
                  )
                }
                required
              />

              <FormField
                label="Email Address"
                type="email"
                value={
                  profileForm.email
                }
                onChange={(value) =>
                  setProfileForm(
                    (current) => ({
                      ...current,
                      email: value,
                    })
                  )
                }
                required
              />

              <FormField
                label="Mobile Number"
                type="tel"
                value={
                  profileForm.phone
                }
                onChange={(value) =>
                  setProfileForm(
                    (current) => ({
                      ...current,
                      phone: value,
                    })
                  )
                }
                required
              />

              {/* ADMIN DETAILS */}

              <div
                className="
                  grid
                  gap-3
                  rounded-xl
                  bg-[#F7F9FC]
                  p-4

                  sm:grid-cols-2
                "
              >
                <div>
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      text-[#94A3B8]
                    "
                  >
                    Admission No.
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-bold
                      text-[#07152D]
                    "
                  >
                    {
                      student.admissionNo
                    }
                  </p>
                </div>

                <div>
                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      text-[#94A3B8]
                    "
                  >
                    Class
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-bold
                      text-[#07152D]
                    "
                  >
                    {student.className}
                  </p>
                </div>
              </div>
            </div>

            <ModalButtons
              cancel={() =>
                setProfileModalOpen(
                  false
                )
              }
              submitText="Save Changes"
            />
          </form>
        </ModalOverlay>
      )}

      {/* ==============================
          ADDRESS MODAL
      =============================== */}

      {addressModalOpen && (
        <ModalOverlay
          close={() =>
            setAddressModalOpen(false)
          }
        >
          <form
            onSubmit={saveAddress}
            className="
              max-h-[92vh]
              w-full
              max-w-[620px]
              overflow-y-auto
              rounded-2xl
              bg-white
              p-5
              shadow-2xl

              sm:p-6
            "
          >
            <ModalHeader
              title={
                editingAddressId
                  ? "Edit Address"
                  : "Add Address"
              }
              close={() =>
                setAddressModalOpen(
                  false
                )
              }
            />

            <div
              className="
                mt-6
                grid
                gap-4

                sm:grid-cols-2
              "
            >
              <FormField
                label="Full Name"
                value={
                  addressForm.fullName
                }
                onChange={(value) =>
                  setAddressForm(
                    (current) => ({
                      ...current,
                      fullName: value,
                    })
                  )
                }
                required
              />

              <FormField
                label="Mobile Number"
                type="tel"
                value={
                  addressForm.phone
                }
                onChange={(value) =>
                  setAddressForm(
                    (current) => ({
                      ...current,
                      phone: value,
                    })
                  )
                }
                required
              />

              <div className="sm:col-span-2">
                <FormField
                  label="House / Street / Area"
                  value={
                    addressForm.addressLine1
                  }
                  onChange={(value) =>
                    setAddressForm(
                      (current) => ({
                        ...current,
                        addressLine1:
                          value,
                      })
                    )
                  }
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <FormField
                  label="Apartment / Landmark (Optional)"
                  value={
                    addressForm.addressLine2
                  }
                  onChange={(value) =>
                    setAddressForm(
                      (current) => ({
                        ...current,
                        addressLine2:
                          value,
                      })
                    )
                  }
                />
              </div>

              <FormField
                label="City"
                value={addressForm.city}
                onChange={(value) =>
                  setAddressForm(
                    (current) => ({
                      ...current,
                      city: value,
                    })
                  )
                }
                required
              />

              <FormField
                label="State"
                value={
                  addressForm.state
                }
                onChange={(value) =>
                  setAddressForm(
                    (current) => ({
                      ...current,
                      state: value,
                    })
                  )
                }
                required
              />

              <div className="sm:col-span-2">
                <FormField
                  label="Pincode"
                  value={
                    addressForm.pincode
                  }
                  onChange={(value) =>
                    setAddressForm(
                      (current) => ({
                        ...current,
                        pincode: value,
                      })
                    )
                  }
                  required
                />
              </div>
            </div>

            <label
              className="
                mt-5
                flex
                cursor-pointer
                items-center
                gap-2
                text-sm
                font-semibold
                text-[#52617B]
              "
            >
              <input
                type="checkbox"
                checked={
                  addressForm.isDefault
                }
                onChange={(event) =>
                  setAddressForm(
                    (current) => ({
                      ...current,
                      isDefault:
                        event.target
                          .checked,
                    })
                  )
                }
                className="
                  h-4
                  w-4
                  accent-[#4F39F6]
                "
              />

              Set as default address
            </label>

            <ModalButtons
              cancel={() =>
                setAddressModalOpen(
                  false
                )
              }
              submitText={
                editingAddressId
                  ? "Update Address"
                  : "Save Address"
              }
            />
          </form>
        </ModalOverlay>
      )}
    </>
  );
}

/* =============================================
   INFO CARD
============================================= */

function InfoCard({
  icon: Icon,
  title,
  value,
  small = false,
}) {
  return (
    <div
      className="
        rounded-xl
        bg-[#F7F9FC]
        p-3
        transition

        hover:bg-[#F0EEFF]

        sm:p-4
      "
    >
      <div
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          bg-[#F0EEFF]
          text-[#4F39F6]
        "
      >
        <Icon size={19} />
      </div>

      <p
        className="
          mt-3
          text-xs
          text-[#71809D]
        "
      >
        {title}
      </p>

      <p
        className={`
          mt-1
          break-words
          font-extrabold
          text-[#07152D]

          ${
            small
              ? "text-[12px] sm:text-sm"
              : "text-lg sm:text-xl"
          }
        `}
      >
        {value}
      </p>
    </div>
  );
}

/* =============================================
   PROFILE DETAIL
============================================= */

function ProfileDetail({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        gap-3
        rounded-xl
        border
        border-[#E8EDF4]
        p-3
      "
    >
      <Icon
        size={17}
        className="
          mt-0.5
          shrink-0
          text-[#4F39F6]
        "
      />

      <div className="min-w-0">
        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-wide
            text-[#94A3B8]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            break-words
            text-sm
            font-semibold
            text-[#07152D]
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* =============================================
   DEFAULT ADDRESS
============================================= */

function AddressDisplay({ address }) {
  return (
    <div
      className="
        mt-5
        rounded-xl
        border
        border-[#D8D3FF]
        bg-[#FAF9FF]
        p-4

        sm:p-5
      "
    >
      <div
        className="
          flex
          flex-wrap
          items-center
          gap-2
        "
      >
        <MapPin
          size={17}
          className="text-[#4F39F6]"
        />

        <strong className="text-[#07152D]">
          {address.fullName}
        </strong>

        <span
          className="
            inline-flex
            items-center
            gap-1
            rounded-full
            bg-emerald-50
            px-2
            py-1
            text-[9px]
            font-extrabold
            uppercase
            text-emerald-600
          "
        >
          <Check size={10} />
          Default
        </span>
      </div>

      <p
        className="
          mt-3
          text-sm
          leading-6
          text-[#52617B]
        "
      >
        {address.addressLine1}

        {address.addressLine2 &&
          `, ${address.addressLine2}`}

        <br />

        {address.city},{" "}
        {address.state} -{" "}
        {address.pincode}

        <br />

        {address.phone}
      </p>
    </div>
  );
}

/* =============================================
   MODAL
============================================= */

function ModalOverlay({
  children,
  close,
}) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    document.body.style.overflow =
      "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow =
        "";
    };
  }, [close]);

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-[#07152D]/55
        p-4
        backdrop-blur-[2px]
      "
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          close();
        }
      }}
    >
      {children}
    </div>
  );
}

/* =============================================
   MODAL HEADER
============================================= */

function ModalHeader({
  title,
  close,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
      "
    >
      <div>
        <p
          className="
            text-[10px]
            font-extrabold
            uppercase
            tracking-[0.2em]
            text-[#4F39F6]
          "
        >
          My Account
        </p>

        <h2
          className="
            mt-1
            text-xl
            font-extrabold
            text-[#07152D]
          "
        >
          {title}
        </h2>
      </div>

      <button
        type="button"
        onClick={close}
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          bg-[#F7F9FC]
          text-[#71809D]
          transition

          hover:bg-[#F0EEFF]
          hover:text-[#4F39F6]
        "
      >
        <X size={18} />
      </button>
    </div>
  );
}

/* =============================================
   FORM FIELD
============================================= */

function FormField({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}) {
  return (
    <label className="block">
      <span
        className="
          mb-1.5
          block
          text-xs
          font-bold
          text-[#52617B]
        "
      >
        {label}
      </span>

      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) =>
          onChange(
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
          px-3.5
          text-sm
          text-[#07152D]
          outline-none
          transition

          placeholder:text-[#94A3B8]

          focus:border-[#4F39F6]
          focus:ring-2
          focus:ring-[#4F39F6]/10
        "
      />
    </label>
  );
}

/* =============================================
   MODAL BUTTONS
============================================= */

function ModalButtons({
  cancel,
  submitText,
}) {
  return (
    <div
      className="
        mt-6
        flex
        flex-col-reverse
        gap-3

        sm:flex-row
        sm:justify-end
      "
    >
      <button
        type="button"
        onClick={cancel}
        className="
          h-11
          rounded-xl
          border
          border-[#DCE3ED]
          bg-white
          px-5
          text-sm
          font-bold
          text-[#52617B]
          transition

          hover:border-[#CBD5E1]
          hover:bg-[#F7F9FC]
        "
      >
        Cancel
      </button>

      <button
        type="submit"
        className="
          h-11
          rounded-xl
          bg-[#4F39F6]
          px-5
          text-sm
          font-bold
          text-white
          shadow-sm
          transition

          hover:bg-[#3F2BE0]
        "
      >
        {submitText}
      </button>
    </div>
  );
}


// import {
//   Camera,
//   Check,
//   CircleCheck,
//   Clock3,
//   Edit3,
//   Mail,
//   MapPin,
//   Package,
//   Phone,
//   Plus,
//   ShoppingBag,
//   Trash2,
//   UserRound,
//   X,
//   XCircle,
// } from "lucide-react";

// import {
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import { Link } from "react-router-dom";

// import AccountSidebar from "../components/AccountSidebar";
// import { useStore } from "../context/StoreContext";


// const emptyAddress = {
//   fullName: "",
//   phone: "",
//   addressLine1: "",
//   addressLine2: "",
//   city: "",
//   state: "",
//   pincode: "",
//   isDefault: false,
// };


// export default function Profile() {
//   const {
//     student,
//     profile,
//     updateProfile,

//     cartCount,
//     orders,

//     addresses,
//     defaultAddress,

//     addAddress,
//     updateAddress,
//     deleteAddress,
//     setDefaultAddress,
//   } = useStore();

//   const [activeTab, setActiveTab] =
//     useState("overview");

//   const [
//     profileModalOpen,
//     setProfileModalOpen,
//   ] = useState(false);

//   const [profileForm, setProfileForm] =
//     useState({
//       name: "",
//       email: "",
//       phone: "",
//       photo: "",
//     });

//   const fileInputRef = useRef(null);

//   const [
//     addressModalOpen,
//     setAddressModalOpen,
//   ] = useState(false);

//   const [
//     editingAddressId,
//     setEditingAddressId,
//   ] = useState(null);

//   const [addressForm, setAddressForm] =
//     useState(emptyAddress);


//   const displayName =
//     profile?.name ||
//     student?.name ||
//     "";

//   const displayEmail =
//     profile?.email ||
//     student?.email ||
//     "";

//   const displayPhone =
//     profile?.phone ||
//     student?.phone ||
//     "";

//   const displayPhoto =
//     profile?.photo || "";


//   const openProfileEdit = () => {
//     setProfileForm({
//       name: displayName,
//       email: displayEmail,
//       phone: displayPhone,
//       photo: displayPhoto,
//     });

//     setProfileModalOpen(true);
//   };


//   const handlePhotoChange = (event) => {
//     const file =
//       event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       alert("Please select an image file.");
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = () => {
//       setProfileForm((current) => ({
//         ...current,
//         photo: reader.result,
//       }));
//     };

//     reader.readAsDataURL(file);
//   };


//   const saveProfile = (event) => {
//     event.preventDefault();

//     updateProfile({
//       name: profileForm.name.trim(),
//       email: profileForm.email.trim(),
//       phone: profileForm.phone.trim(),
//       photo: profileForm.photo,
//     });

//     setProfileModalOpen(false);
//   };


//   const openAddAddress = () => {
//     setEditingAddressId(null);

//     setAddressForm({
//       ...emptyAddress,
//       fullName: displayName,
//       phone: displayPhone,
//       isDefault: addresses.length === 0,
//     });

//     setAddressModalOpen(true);
//   };


//   const openEditAddress = (address) => {
//     setEditingAddressId(address.id);

//     setAddressForm({
//       fullName: address.fullName || "",
//       phone: address.phone || "",
//       addressLine1:
//         address.addressLine1 || "",
//       addressLine2:
//         address.addressLine2 || "",
//       city: address.city || "",
//       state: address.state || "",
//       pincode: address.pincode || "",
//       isDefault: Boolean(
//         address.isDefault
//       ),
//     });

//     setAddressModalOpen(true);
//   };


//   const saveAddress = (event) => {
//     event.preventDefault();

//     const cleanAddress = {
//       ...addressForm,

//       fullName:
//         addressForm.fullName.trim(),

//       phone:
//         addressForm.phone.trim(),

//       addressLine1:
//         addressForm.addressLine1.trim(),

//       addressLine2:
//         addressForm.addressLine2.trim(),

//       city:
//         addressForm.city.trim(),

//       state:
//         addressForm.state.trim(),

//       pincode:
//         addressForm.pincode.trim(),
//     };

//     if (editingAddressId) {
//       updateAddress(
//         editingAddressId,
//         cleanAddress
//       );
//     } else {
//       addAddress(cleanAddress);
//     }

//     setAddressModalOpen(false);
//     setEditingAddressId(null);
//     setAddressForm(emptyAddress);
//   };


//   const getOrderStatus = (status) => {
//     switch (status?.toLowerCase()) {
//       case "delivered":
//         return {
//           icon: CircleCheck,
//           className:
//             "bg-emerald-50 text-emerald-700",
//         };

//       case "cancelled":
//         return {
//           icon: XCircle,
//           className:
//             "bg-red-50 text-red-600",
//         };

//       default:
//         return {
//           icon: Clock3,
//           className:
//             "bg-[#F0EEFF] text-[#4F39F6]",
//         };
//     }
//   };


//   if (!student) return null;


//   return (
//     <>
//       <main
//         className="
//           min-h-[70vh]
//           bg-[#F7F9FC]
//           px-4 py-7
//           sm:px-6 sm:py-9
//           lg:px-10 lg:py-10
//         "
//       >
//         <div className="mx-auto max-w-[1250px]">

//           {/* HEADING */}
//           <div className="mb-6">
//             <p
//               className="
//                 text-[11px]
//                 font-extrabold
//                 uppercase
//                 tracking-[0.22em]
//                 text-[#4F39F6]
//               "
//             >
//               My Account
//             </p>

//             <h1
//               className="
//                 mt-2
//                 text-[28px]
//                 font-extrabold
//                 tracking-tight
//                 text-[#07152D]
//                 sm:text-[34px]
//               "
//             >
//               My Profile
//             </h1>
//           </div>


//           <div
//             className="
//               grid gap-5
//               lg:grid-cols-[280px_minmax(0,1fr)]
//               lg:items-start
//             "
//           >
//             <AccountSidebar
//               activeTab={activeTab}
//               setActiveTab={setActiveTab}
//             />


//             <section className="min-w-0">

//               {/* ==============================
//                   OVERVIEW
//               =============================== */}

//               {activeTab === "overview" && (
//                 <div className="space-y-5">

//                   <div
//                     className="
//                       rounded-2xl
//                       border border-[#DCE3ED]
//                       bg-white
//                       p-5
//                       shadow-sm
//                       sm:p-6
//                     "
//                   >
//                     <div
//                       className="
//                         flex flex-col gap-4
//                         sm:flex-row
//                         sm:items-start
//                         sm:justify-between
//                       "
//                     >
//                       <div>
//                         <p
//                           className="
//                             text-[10px]
//                             font-extrabold
//                             uppercase
//                             tracking-[0.2em]
//                             text-[#4F39F6]
//                           "
//                         >
//                           Overview
//                         </p>

//                         <h2
//                           className="
//                             mt-2
//                             text-[23px]
//                             font-extrabold
//                             text-[#07152D]
//                             sm:text-[28px]
//                           "
//                         >
//                           Hello, {displayName}
//                         </h2>

//                         <p className="mt-1 text-sm text-[#71809D]">
//                           Manage your account,
//                           order history and
//                           delivery addresses.
//                         </p>
//                       </div>

//                       <button
//                         type="button"
//                         onClick={openProfileEdit}
//                         className="
//                           inline-flex h-11
//                           items-center justify-center
//                           gap-2 self-start
//                           rounded-xl
//                           border border-[#DCE3ED]
//                           bg-white px-4
//                           text-sm font-semibold
//                           text-[#07152D]
//                           transition
//                           hover:border-[#4F39F6]
//                           hover:text-[#4F39F6]
//                         "
//                       >
//                         <Edit3 size={16} />
//                         Edit Profile
//                       </button>
//                     </div>


//                     {/* DASHBOARD CARDS */}
//                     <div
//                       className="
//                         mt-6 grid gap-3
//                         sm:grid-cols-2
//                         xl:grid-cols-4
//                       "
//                     >
//                       <InfoCard
//                         icon={ShoppingBag}
//                         title="Cart Items"
//                         value={cartCount}
//                       />

//                       <InfoCard
//                         icon={Package}
//                         title="Orders"
//                         value={orders.length}
//                       />

//                       <InfoCard
//                         icon={MapPin}
//                         title="Saved Addresses"
//                         value={addresses.length}
//                       />

//                       <InfoCard
//                         icon={UserRound}
//                         title="Admission No."
//                         value={student.admissionNo}
//                         small
//                       />
//                     </div>


//                     {/* ACCOUNT DETAILS */}
//                     <div
//                       className="
//                         mt-5
//                         grid gap-3
//                         border-t
//                         border-[#E8EDF4]
//                         pt-5
//                         sm:grid-cols-2
//                       "
//                     >
//                       <ProfileDetail
//                         icon={Mail}
//                         label="Email Address"
//                         value={
//                           displayEmail ||
//                           "Not added"
//                         }
//                       />

//                       <ProfileDetail
//                         icon={Phone}
//                         label="Mobile Number"
//                         value={
//                           displayPhone ||
//                           "Not added"
//                         }
//                       />

//                       <ProfileDetail
//                         icon={UserRound}
//                         label="Class"
//                         value={`${student.className}${
//                           student.section
//                             ? ` • Section ${student.section}`
//                             : ""
//                         }`}
//                       />

//                       <ProfileDetail
//                         icon={Package}
//                         label="School"
//                         value={
//                           student.school ||
//                           "School"
//                         }
//                       />
//                     </div>
//                   </div>


//                   {/* DEFAULT ADDRESS */}
//                   <div
//                     className="
//                       rounded-2xl
//                       border border-[#DCE3ED]
//                       bg-white
//                       p-5 shadow-sm
//                       sm:p-6
//                     "
//                   >
//                     <div
//                       className="
//                         flex items-center
//                         justify-between
//                         gap-4
//                       "
//                     >
//                       <div>
//                         <p
//                           className="
//                             text-[10px]
//                             font-extrabold
//                             uppercase
//                             tracking-[0.2em]
//                             text-[#4F39F6]
//                           "
//                         >
//                           Delivery
//                         </p>

//                         <h3
//                           className="
//                             mt-1
//                             text-lg
//                             font-extrabold
//                             text-[#07152D]
//                           "
//                         >
//                           Default Address
//                         </h3>
//                       </div>

//                       <button
//                         type="button"
//                         onClick={() =>
//                           setActiveTab(
//                             "addresses"
//                           )
//                         }
//                         className="
//                           text-sm
//                           font-bold
//                           text-[#4F39F6]
//                           hover:text-[#3F2BE0]
//                         "
//                       >
//                         Manage
//                       </button>
//                     </div>


//                     {defaultAddress ? (
//                       <AddressDisplay
//                         address={
//                           defaultAddress
//                         }
//                       />
//                     ) : (
//                       <div
//                         className="
//                           mt-5
//                           rounded-xl
//                           border
//                           border-dashed
//                           border-[#CBD5E1]
//                           p-7
//                           text-center
//                         "
//                       >
//                         <MapPin
//                           size={26}
//                           className="
//                             mx-auto
//                             text-[#94A3B8]
//                           "
//                         />

//                         <p
//                           className="
//                             mt-3
//                             text-sm
//                             font-semibold
//                             text-[#52617B]
//                           "
//                         >
//                           No delivery address
//                           saved yet.
//                         </p>

//                         <button
//                           type="button"
//                           onClick={
//                             openAddAddress
//                           }
//                           className="
//                             mt-4
//                             rounded-xl
//                             bg-[#4F39F6]
//                             px-5 py-2.5
//                             text-sm
//                             font-bold
//                             text-white
//                             transition
//                             hover:bg-[#3F2BE0]
//                           "
//                         >
//                           Add Address
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}


//               {/* ==============================
//                   ORDERS
//               =============================== */}

//               {activeTab === "orders" && (
//                 <div
//                   className="
//                     rounded-2xl
//                     border border-[#DCE3ED]
//                     bg-white
//                     p-5 shadow-sm
//                     sm:p-6
//                   "
//                 >
//                   <p
//                     className="
//                       text-[10px]
//                       font-extrabold
//                       uppercase
//                       tracking-[0.2em]
//                       text-[#4F39F6]
//                     "
//                   >
//                     Purchases
//                   </p>

//                   <h2
//                     className="
//                       mt-1
//                       text-2xl
//                       font-extrabold
//                       text-[#07152D]
//                     "
//                   >
//                     My Orders
//                   </h2>


//                   {orders.length === 0 ? (
//                     <div className="py-14 text-center">
//                       <Package
//                         size={38}
//                         className="
//                           mx-auto
//                           text-[#CBD5E1]
//                         "
//                       />

//                       <h3
//                         className="
//                           mt-3
//                           font-bold
//                           text-[#07152D]
//                         "
//                       >
//                         No orders yet
//                       </h3>

//                       <p
//                         className="
//                           mt-1
//                           text-sm
//                           text-[#71809D]
//                         "
//                       >
//                         Your completed orders
//                         will appear here.
//                       </p>

//                       <Link
//                         to="/"
//                         className="
//                           mt-5
//                           inline-flex
//                           rounded-xl
//                           bg-[#4F39F6]
//                           px-5 py-3
//                           text-sm
//                           font-bold
//                           text-white
//                           transition
//                           hover:bg-[#3F2BE0]
//                         "
//                       >
//                         Start Shopping
//                       </Link>
//                     </div>
//                   ) : (
//                     <div className="mt-6 space-y-4">
//                       {orders.map((order) => {
//                         const status =
//                           getOrderStatus(
//                             order.status
//                           );

//                         const StatusIcon =
//                           status.icon;

//                         return (
//                           <div
//                             key={order.id}
//                             className="
//                               overflow-hidden
//                               rounded-2xl
//                               border
//                               border-[#DCE3ED]
//                             "
//                           >
//                             {/* ORDER HEADER */}
//                             <div
//                               className="
//                                 flex flex-col
//                                 gap-3
//                                 bg-[#F7F9FC]
//                                 px-4 py-4
//                                 sm:flex-row
//                                 sm:items-center
//                                 sm:justify-between
//                               "
//                             >
//                               <div>
//                                 <p
//                                   className="
//                                     text-sm
//                                     font-extrabold
//                                     text-[#07152D]
//                                   "
//                                 >
//                                   Order #
//                                   {order.orderNumber}
//                                 </p>

//                                 <p
//                                   className="
//                                     mt-1
//                                     text-xs
//                                     text-[#71809D]
//                                   "
//                                 >
//                                   {new Date(
//                                     order.createdAt
//                                   ).toLocaleDateString(
//                                     "en-IN",
//                                     {
//                                       day: "2-digit",
//                                       month: "short",
//                                       year: "numeric",
//                                     }
//                                   )}
//                                 </p>
//                               </div>

//                               <span
//                                 className={`
//                                   inline-flex
//                                   w-fit
//                                   items-center
//                                   gap-1.5
//                                   rounded-full
//                                   px-3 py-1.5
//                                   text-xs
//                                   font-bold
//                                   ${status.className}
//                                 `}
//                               >
//                                 <StatusIcon
//                                   size={14}
//                                 />
//                                 {order.status}
//                               </span>
//                             </div>


//                             {/* ORDER ITEMS */}
//                             <div className="divide-y divide-[#E8EDF4]">
//                               {order.items.map(
//                                 (item, index) => (
//                                   <div
//                                     key={`${item.id}-${index}`}
//                                     className="
//                                       flex
//                                       items-center
//                                       gap-3
//                                       p-4
//                                     "
//                                   >
//                                     <img
//                                       src={
//                                         item.image
//                                       }
//                                       alt={
//                                         item.name
//                                       }
//                                       className="
//                                         h-16 w-16
//                                         shrink-0
//                                         rounded-xl
//                                         object-cover
//                                       "
//                                     />

//                                     <div className="min-w-0 flex-1">
//                                       <p
//                                         className="
//                                           font-bold
//                                           text-[#07152D]
//                                         "
//                                       >
//                                         {item.name}
//                                       </p>

//                                       <div
//                                         className="
//                                           mt-1
//                                           flex flex-wrap
//                                           gap-x-4
//                                           gap-y-1
//                                           text-xs
//                                           text-[#71809D]
//                                         "
//                                       >
//                                         {item.size && (
//                                           <span>
//                                             Size:{" "}
//                                             {item.size}
//                                           </span>
//                                         )}

//                                         <span>
//                                           Qty:{" "}
//                                           {
//                                             item.quantity
//                                           }
//                                         </span>
//                                       </div>
//                                     </div>

//                                     <strong
//                                       className="
//                                         whitespace-nowrap
//                                         text-sm
//                                         text-[#07152D]
//                                       "
//                                     >
//                                       ₹
//                                       {Number(
//                                         item.total
//                                       ).toFixed(
//                                         2
//                                       )}
//                                     </strong>
//                                   </div>
//                                 )
//                               )}
//                             </div>


//                             {/* ORDER TOTAL */}
//                             <div
//                               className="
//                                 flex
//                                 items-center
//                                 justify-between
//                                 border-t
//                                 border-[#E8EDF4]
//                                 px-4 py-4
//                               "
//                             >
//                               <div>
//                                 <span
//                                   className="
//                                     text-sm
//                                     text-[#71809D]
//                                   "
//                                 >
//                                   Order Total
//                                 </span>

//                                 <p
//                                   className="
//                                     mt-0.5
//                                     text-[10px]
//                                     text-[#94A3B8]
//                                   "
//                                 >
//                                   GST included
//                                 </p>
//                               </div>

//                               <strong
//                                 className="
//                                   text-lg
//                                   text-[#07152D]
//                                 "
//                               >
//                                 ₹
//                                 {Number(
//                                   order.total
//                                 ).toFixed(2)}
//                               </strong>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </div>
//               )}


//               {/* ==============================
//                   ADDRESSES
//               =============================== */}

//               {activeTab ===
//                 "addresses" && (
//                 <div
//                   className="
//                     rounded-2xl
//                     border
//                     border-[#DCE3ED]
//                     bg-white
//                     p-5
//                     shadow-sm
//                     sm:p-6
//                   "
//                 >
//                   <div
//                     className="
//                       flex flex-col
//                       gap-4
//                       sm:flex-row
//                       sm:items-center
//                       sm:justify-between
//                     "
//                   >
//                     <div>
//                       <p
//                         className="
//                           text-[10px]
//                           font-extrabold
//                           uppercase
//                           tracking-[0.2em]
//                           text-[#4F39F6]
//                         "
//                       >
//                         Addresses
//                       </p>

//                       <h2
//                         className="
//                           mt-1
//                           text-2xl
//                           font-extrabold
//                           text-[#07152D]
//                         "
//                       >
//                         Saved Addresses
//                       </h2>
//                     </div>

//                     <button
//                       type="button"
//                       onClick={
//                         openAddAddress
//                       }
//                       className="
//                         inline-flex
//                         h-11
//                         items-center
//                         justify-center
//                         gap-2
//                         self-start
//                         rounded-xl
//                         bg-[#4F39F6]
//                         px-5
//                         text-sm
//                         font-extrabold
//                         text-white
//                         shadow-sm
//                         transition
//                         hover:bg-[#3F2BE0]
//                       "
//                     >
//                       <Plus size={17} />
//                       Add Address
//                     </button>
//                   </div>


//                   {addresses.length === 0 ? (
//                     <div
//                       className="
//                         mt-6
//                         rounded-xl
//                         border
//                         border-dashed
//                         border-[#CBD5E1]
//                         py-12
//                         text-center
//                       "
//                     >
//                       <MapPin
//                         size={30}
//                         className="
//                           mx-auto
//                           text-[#CBD5E1]
//                         "
//                       />

//                       <p
//                         className="
//                           mt-3
//                           font-semibold
//                           text-[#52617B]
//                         "
//                       >
//                         No saved addresses.
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="mt-6 grid gap-4">
//                       {addresses.map(
//                         (address) => (
//                           <div
//                             key={address.id}
//                             className="
//                               relative
//                               rounded-2xl
//                               border
//                               border-[#DCE3ED]
//                               bg-white
//                               p-5
//                               transition
//                               hover:border-[#C8C0FF]
//                             "
//                           >
//                             <div
//                               className="
//                                 absolute
//                                 right-3 top-3
//                                 flex gap-1
//                               "
//                             >
//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   openEditAddress(
//                                     address
//                                   )
//                                 }
//                                 className="
//                                   flex h-9 w-9
//                                   items-center
//                                   justify-center
//                                   rounded-lg
//                                   text-[#71809D]
//                                   hover:bg-[#F0EEFF]
//                                   hover:text-[#4F39F6]
//                                 "
//                               >
//                                 <Edit3
//                                   size={16}
//                                 />
//                               </button>

//                               <button
//                                 type="button"
//                                 onClick={() => {
//                                   const confirmed =
//                                     window.confirm(
//                                       "Delete this address?"
//                                     );

//                                   if (
//                                     confirmed
//                                   ) {
//                                     deleteAddress(
//                                       address.id
//                                     );
//                                   }
//                                 }}
//                                 className="
//                                   flex h-9 w-9
//                                   items-center
//                                   justify-center
//                                   rounded-lg
//                                   text-[#71809D]
//                                   hover:bg-red-50
//                                   hover:text-red-500
//                                 "
//                               >
//                                 <Trash2
//                                   size={16}
//                                 />
//                               </button>
//                             </div>


//                             <div className="pr-20">
//                               <div
//                                 className="
//                                   flex
//                                   flex-wrap
//                                   items-center
//                                   gap-2
//                                 "
//                               >
//                                 <MapPin
//                                   size={17}
//                                   className="
//                                     text-[#4F39F6]
//                                   "
//                                 />

//                                 <strong className="text-[#07152D]">
//                                   {
//                                     address.fullName
//                                   }
//                                 </strong>

//                                 {address.isDefault && (
//                                   <span
//                                     className="
//                                       rounded-full
//                                       bg-emerald-50
//                                       px-2 py-1
//                                       text-[9px]
//                                       font-extrabold
//                                       uppercase
//                                       text-emerald-600
//                                     "
//                                   >
//                                     Default
//                                   </span>
//                                 )}
//                               </div>

//                               <p
//                                 className="
//                                   mt-3
//                                   text-sm
//                                   leading-6
//                                   text-[#52617B]
//                                 "
//                               >
//                                 {
//                                   address.addressLine1
//                                 }

//                                 {address.addressLine2 &&
//                                   `, ${address.addressLine2}`}

//                                 <br />

//                                 {address.city},{" "}
//                                 {address.state} -{" "}
//                                 {address.pincode}

//                                 <br />

//                                 {address.phone}
//                               </p>
//                             </div>

//                             {!address.isDefault && (
//                               <button
//                                 type="button"
//                                 onClick={() =>
//                                   setDefaultAddress(
//                                     address.id
//                                   )
//                                 }
//                                 className="
//                                   mt-4
//                                   rounded-lg
//                                   border
//                                   border-[#DCE3ED]
//                                   px-3 py-2
//                                   text-xs
//                                   font-bold
//                                   text-[#52617B]
//                                   transition
//                                   hover:border-[#4F39F6]
//                                   hover:text-[#4F39F6]
//                                 "
//                               >
//                                 Set as Default
//                               </button>
//                             )}
//                           </div>
//                         )
//                       )}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </section>
//           </div>
//         </div>
//       </main>


//       {/* ==============================
//           EDIT PROFILE MODAL
//       =============================== */}

//       {profileModalOpen && (
//         <ModalOverlay
//           close={() =>
//             setProfileModalOpen(false)
//           }
//         >
//           <form
//             onSubmit={saveProfile}
//             className="
//               w-full
//               max-w-[500px]
//               rounded-2xl
//               bg-white
//               p-5
//               shadow-2xl
//               sm:p-6
//             "
//           >
//             <ModalHeader
//               title="Edit Profile"
//               close={() =>
//                 setProfileModalOpen(
//                   false
//                 )
//               }
//             />

//             <div className="mt-5 flex justify-center">
//               <div className="relative">
//                 <div
//                   className="
//                     flex h-24 w-24
//                     items-center
//                     justify-center
//                     overflow-hidden
//                     rounded-full
//                     border-2
//                     border-[#4F39F6]
//                     bg-[#F7F9FC]
//                   "
//                 >
//                   {profileForm.photo ? (
//                     <img
//                       src={
//                         profileForm.photo
//                       }
//                       alt="Profile"
//                       className="
//                         h-full
//                         w-full
//                         object-cover
//                       "
//                     />
//                   ) : (
//                     <UserRound
//                       size={35}
//                       className="
//                         text-[#94A3B8]
//                       "
//                     />
//                   )}
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     fileInputRef.current?.click()
//                   }
//                   className="
//                     absolute
//                     bottom-0 right-0
//                     flex h-9 w-9
//                     items-center
//                     justify-center
//                     rounded-full
//                     bg-[#4F39F6]
//                     text-white
//                     shadow-md
//                     hover:bg-[#3F2BE0]
//                   "
//                 >
//                   <Camera size={16} />
//                 </button>

//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   accept="image/*"
//                   onChange={
//                     handlePhotoChange
//                   }
//                   className="hidden"
//                 />
//               </div>
//             </div>


//             <div className="mt-6 space-y-4">
//               <FormField
//                 label="Full Name"
//                 value={
//                   profileForm.name
//                 }
//                 onChange={(value) =>
//                   setProfileForm(
//                     (current) => ({
//                       ...current,
//                       name: value,
//                     })
//                   )
//                 }
//                 required
//               />

//               <FormField
//                 label="Email Address"
//                 type="email"
//                 value={
//                   profileForm.email
//                 }
//                 onChange={(value) =>
//                   setProfileForm(
//                     (current) => ({
//                       ...current,
//                       email: value,
//                     })
//                   )
//                 }
//                 required
//               />

//               <FormField
//                 label="Mobile Number"
//                 type="tel"
//                 value={
//                   profileForm.phone
//                 }
//                 onChange={(value) =>
//                   setProfileForm(
//                     (current) => ({
//                       ...current,
//                       phone: value,
//                     })
//                   )
//                 }
//                 required
//               />


//               {/* ADMIN DETAILS */}
//               <div
//                 className="
//                   grid gap-3
//                   rounded-xl
//                   bg-[#F7F9FC]
//                   p-4
//                   sm:grid-cols-2
//                 "
//               >
//                 <div>
//                   <p
//                     className="
//                       text-[10px]
//                       font-bold
//                       uppercase
//                       text-[#94A3B8]
//                     "
//                   >
//                     Admission No.
//                   </p>

//                   <p
//                     className="
//                       mt-1
//                       text-sm
//                       font-bold
//                       text-[#07152D]
//                     "
//                   >
//                     {student.admissionNo}
//                   </p>
//                 </div>

//                 <div>
//                   <p
//                     className="
//                       text-[10px]
//                       font-bold
//                       uppercase
//                       text-[#94A3B8]
//                     "
//                   >
//                     Class
//                   </p>

//                   <p
//                     className="
//                       mt-1
//                       text-sm
//                       font-bold
//                       text-[#07152D]
//                     "
//                   >
//                     {student.className}
//                   </p>
//                 </div>
//               </div>
//             </div>


//             <ModalButtons
//               cancel={() =>
//                 setProfileModalOpen(
//                   false
//                 )
//               }
//               submitText="Save Changes"
//             />
//           </form>
//         </ModalOverlay>
//       )}


//       {/* ==============================
//           ADDRESS MODAL
//       =============================== */}

//       {addressModalOpen && (
//         <ModalOverlay
//           close={() =>
//             setAddressModalOpen(false)
//           }
//         >
//           <form
//             onSubmit={saveAddress}
//             className="
//               max-h-[92vh]
//               w-full
//               max-w-[620px]
//               overflow-y-auto
//               rounded-2xl
//               bg-white
//               p-5
//               shadow-2xl
//               sm:p-6
//             "
//           >
//             <ModalHeader
//               title={
//                 editingAddressId
//                   ? "Edit Address"
//                   : "Add Address"
//               }
//               close={() =>
//                 setAddressModalOpen(
//                   false
//                 )
//               }
//             />

//             <div
//               className="
//                 mt-6
//                 grid gap-4
//                 sm:grid-cols-2
//               "
//             >
//               <FormField
//                 label="Full Name"
//                 value={
//                   addressForm.fullName
//                 }
//                 onChange={(value) =>
//                   setAddressForm(
//                     (current) => ({
//                       ...current,
//                       fullName: value,
//                     })
//                   )
//                 }
//                 required
//               />

//               <FormField
//                 label="Mobile Number"
//                 type="tel"
//                 value={
//                   addressForm.phone
//                 }
//                 onChange={(value) =>
//                   setAddressForm(
//                     (current) => ({
//                       ...current,
//                       phone: value,
//                     })
//                   )
//                 }
//                 required
//               />

//               <div className="sm:col-span-2">
//                 <FormField
//                   label="House / Street / Area"
//                   value={
//                     addressForm.addressLine1
//                   }
//                   onChange={(value) =>
//                     setAddressForm(
//                       (current) => ({
//                         ...current,
//                         addressLine1:
//                           value,
//                       })
//                     )
//                   }
//                   required
//                 />
//               </div>

//               <div className="sm:col-span-2">
//                 <FormField
//                   label="Apartment / Landmark (Optional)"
//                   value={
//                     addressForm.addressLine2
//                   }
//                   onChange={(value) =>
//                     setAddressForm(
//                       (current) => ({
//                         ...current,
//                         addressLine2:
//                           value,
//                       })
//                     )
//                   }
//                 />
//               </div>

//               <FormField
//                 label="City"
//                 value={addressForm.city}
//                 onChange={(value) =>
//                   setAddressForm(
//                     (current) => ({
//                       ...current,
//                       city: value,
//                     })
//                   )
//                 }
//                 required
//               />

//               <FormField
//                 label="State"
//                 value={
//                   addressForm.state
//                 }
//                 onChange={(value) =>
//                   setAddressForm(
//                     (current) => ({
//                       ...current,
//                       state: value,
//                     })
//                   )
//                 }
//                 required
//               />

//               <div className="sm:col-span-2">
//                 <FormField
//                   label="Pincode"
//                   value={
//                     addressForm.pincode
//                   }
//                   onChange={(value) =>
//                     setAddressForm(
//                       (current) => ({
//                         ...current,
//                         pincode: value,
//                       })
//                     )
//                   }
//                   required
//                 />
//               </div>
//             </div>


//             <label
//               className="
//                 mt-5
//                 flex cursor-pointer
//                 items-center gap-2
//                 text-sm font-semibold
//                 text-[#52617B]
//               "
//             >
//               <input
//                 type="checkbox"
//                 checked={
//                   addressForm.isDefault
//                 }
//                 onChange={(event) =>
//                   setAddressForm(
//                     (current) => ({
//                       ...current,
//                       isDefault:
//                         event.target
//                           .checked,
//                     })
//                   )
//                 }
//                 className="
//                   h-4 w-4
//                   accent-[#4F39F6]
//                 "
//               />

//               Set as default address
//             </label>


//             <ModalButtons
//               cancel={() =>
//                 setAddressModalOpen(
//                   false
//                 )
//               }
//               submitText={
//                 editingAddressId
//                   ? "Update Address"
//                   : "Save Address"
//               }
//             />
//           </form>
//         </ModalOverlay>
//       )}
//     </>
//   );
// }


// /* =============================================
//    INFO CARD
// ============================================= */

// function InfoCard({
//   icon: Icon,
//   title,
//   value,
//   small = false,
// }) {
//   return (
//     <div
//       className="
//         rounded-xl
//         bg-[#F7F9FC]
//         p-4
//         transition
//         hover:bg-[#F0EEFF]
//       "
//     >
//       <div
//         className="
//           flex h-9 w-9
//           items-center
//           justify-center
//           rounded-lg
//           bg-[#F0EEFF]
//           text-[#4F39F6]
//         "
//       >
//         <Icon size={19} />
//       </div>

//       <p
//         className="
//           mt-3
//           text-xs
//           text-[#71809D]
//         "
//       >
//         {title}
//       </p>

//       <p
//         className={`
//           mt-1
//           font-extrabold
//           text-[#07152D]
//           ${
//             small
//               ? "text-sm"
//               : "text-xl"
//           }
//         `}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }


// /* =============================================
//    PROFILE DETAIL
// ============================================= */

// function ProfileDetail({
//   icon: Icon,
//   label,
//   value,
// }) {
//   return (
//     <div
//       className="
//         flex gap-3
//         rounded-xl
//         border
//         border-[#E8EDF4]
//         p-3
//       "
//     >
//       <Icon
//         size={17}
//         className="
//           mt-0.5
//           shrink-0
//           text-[#4F39F6]
//         "
//       />

//       <div className="min-w-0">
//         <p
//           className="
//             text-[10px]
//             font-bold
//             uppercase
//             tracking-wide
//             text-[#94A3B8]
//           "
//         >
//           {label}
//         </p>

//         <p
//           className="
//             mt-1
//             break-words
//             text-sm
//             font-semibold
//             text-[#07152D]
//           "
//         >
//           {value}
//         </p>
//       </div>
//     </div>
//   );
// }


// /* =============================================
//    DEFAULT ADDRESS
// ============================================= */

// function AddressDisplay({ address }) {
//   return (
//     <div
//       className="
//         mt-5
//         rounded-xl
//         border
//         border-[#D8D3FF]
//         bg-[#FAF9FF]
//         p-5
//       "
//     >
//       <div
//         className="
//           flex flex-wrap
//           items-center gap-2
//         "
//       >
//         <MapPin
//           size={17}
//           className="text-[#4F39F6]"
//         />

//         <strong className="text-[#07152D]">
//           {address.fullName}
//         </strong>

//         <span
//           className="
//             inline-flex
//             items-center gap-1
//             rounded-full
//             bg-emerald-50
//             px-2 py-1
//             text-[9px]
//             font-extrabold
//             uppercase
//             text-emerald-600
//           "
//         >
//           <Check size={10} />
//           Default
//         </span>
//       </div>

//       <p
//         className="
//           mt-3
//           text-sm
//           leading-6
//           text-[#52617B]
//         "
//       >
//         {address.addressLine1}

//         {address.addressLine2 &&
//           `, ${address.addressLine2}`}

//         <br />

//         {address.city},{" "}
//         {address.state} -{" "}
//         {address.pincode}

//         <br />

//         {address.phone}
//       </p>
//     </div>
//   );
// }


// /* =============================================
//    MODAL
// ============================================= */

// function ModalOverlay({
//   children,
//   close,
// }) {
//   useEffect(() => {
//     const handleEscape = (event) => {
//       if (event.key === "Escape") {
//         close();
//       }
//     };

//     document.addEventListener(
//       "keydown",
//       handleEscape
//     );

//     document.body.style.overflow =
//       "hidden";

//     return () => {
//       document.removeEventListener(
//         "keydown",
//         handleEscape
//       );

//       document.body.style.overflow =
//         "";
//     };
//   }, [close]);

//   return (
//     <div
//       onMouseDown={(event) => {
//         if (
//           event.target ===
//           event.currentTarget
//         ) {
//           close();
//         }
//       }}
//       className="
//         fixed inset-0
//         z-[100]
//         flex items-center
//         justify-center
//         bg-[#07152D]/60
//         p-4
//         backdrop-blur-[2px]
//       "
//     >
//       {children}
//     </div>
//   );
// }


// function ModalHeader({
//   title,
//   close,
// }) {
//   return (
//     <div
//       className="
//         flex items-center
//         justify-between gap-4
//       "
//     >
//       <h2
//         className="
//           text-xl
//           font-extrabold
//           text-[#07152D]
//         "
//       >
//         {title}
//       </h2>

//       <button
//         type="button"
//         onClick={close}
//         className="
//           flex h-9 w-9
//           items-center
//           justify-center
//           rounded-full
//           text-[#71809D]
//           hover:bg-[#F0EEFF]
//           hover:text-[#4F39F6]
//         "
//       >
//         <X size={19} />
//       </button>
//     </div>
//   );
// }


// function FormField({
//   label,
//   type = "text",
//   value,
//   onChange,
//   required = false,
// }) {
//   return (
//     <label className="block">
//       <span
//         className="
//           mb-1.5
//           block
//           text-xs
//           font-bold
//           text-[#07152D]
//         "
//       >
//         {label}

//         {required && (
//           <span className="text-red-500">
//             {" "}*
//           </span>
//         )}
//       </span>

//       <input
//         type={type}
//         value={value}
//         required={required}
//         onChange={(event) =>
//           onChange(event.target.value)
//         }
//         className="
//           h-11
//           w-full
//           rounded-xl
//           border
//           border-[#DCE3ED]
//           bg-white
//           px-4
//           text-sm
//           text-[#07152D]
//           outline-none
//           transition

//           placeholder:text-[#94A3B8]

//           focus:border-[#4F39F6]
//           focus:ring-2
//           focus:ring-[#E5E1FF]
//         "
//       />
//     </label>
//   );
// }


// function ModalButtons({
//   cancel,
//   submitText,
// }) {
//   return (
//     <div
//       className="
//         mt-6
//         grid gap-3
//         sm:grid-cols-2
//       "
//     >
//       <button
//         type="button"
//         onClick={cancel}
//         className="
//           h-12
//           rounded-xl
//           border
//           border-[#DCE3ED]
//           bg-white
//           text-sm
//           font-semibold
//           text-[#52617B]
//           transition
//           hover:bg-[#F7F9FC]
//         "
//       >
//         Cancel
//       </button>

//       <button
//         type="submit"
//         className="
//           h-12
//           rounded-xl
//           bg-[#4F39F6]
//           text-sm
//           font-extrabold
//           text-white
//           shadow-[0_7px_18px_rgba(79,57,246,0.20)]
//           transition
//           hover:bg-[#3F2BE0]
//         "
//       >
//         {submitText}
//       </button>
//     </div>
//   );
// }