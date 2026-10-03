import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  students,
  kits,
  individualProducts,
} from "../data/storeData";


const StoreContext = createContext(null);


/* =========================================================
   HELPERS
========================================================= */

const readJSON = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};


const createId = (prefix = "ID") => {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
};


const getSizePrice = (product, sizeLabel) => {
  if (!product) return 0;

  if (
    product.hasSize &&
    Array.isArray(product.sizes) &&
    product.sizes.length
  ) {
    const selected = product.sizes.find(
      (size) =>
        String(size.label) === String(sizeLabel)
    );

    if (selected?.price !== undefined) {
      return Number(selected.price);
    }
  }

  return Number(product.price || 0);
};


/* =========================================================
   PROVIDER
========================================================= */

export function StoreProvider({ children }) {

  /* =======================================================
     STUDENT LOGIN
  ======================================================= */

  const [student, setStudent] = useState(() =>
    readJSON("student", null)
  );

  const [loginOpen, setLoginOpen] = useState(false);


  /* =======================================================
     PROFILE

     Separate profile object is used so student can update
     email/mobile/name/photo without changing hardcoded
     admin source data.
  ======================================================= */

  const [profile, setProfile] = useState(() => {
    const savedStudent = readJSON("student", null);

    if (!savedStudent) return null;

    const profiles = readJSON(
      "studentProfiles",
      {}
    );

    return (
      profiles[savedStudent.admissionNo] || {
        name: savedStudent.name || "",
        email: savedStudent.email || "",
        phone: savedStudent.phone || "",
        photo: savedStudent.photo || "",
        admissionNo:
          savedStudent.admissionNo || "",
        className:
          savedStudent.className || "",
        section:
          savedStudent.section || "",
        school:
          savedStudent.school || "",
      }
    );
  });


  /* =======================================================
     CART
  ======================================================= */

  const [cart, setCart] = useState(() =>
    readJSON("cart", [])
  );


  /* =======================================================
     FIRST KIT PURCHASE STATUS
  ======================================================= */

  const [kitPurchased, setKitPurchased] =
    useState(() => {

      const savedStudent = readJSON(
        "student",
        null
      );

      if (!savedStudent) return false;

      const purchasedStudents = readJSON(
        "purchasedStudents",
        []
      );

      return purchasedStudents.includes(
        savedStudent.admissionNo
      );
    });


  /* =======================================================
     ADDRESSES
  ======================================================= */

  const [addresses, setAddresses] =
    useState(() => {

      const savedStudent = readJSON(
        "student",
        null
      );

      if (!savedStudent) return [];

      const allAddresses = readJSON(
        "studentAddresses",
        {}
      );

      return (
        allAddresses[
          savedStudent.admissionNo
        ] || []
      );
    });


  /* =======================================================
     ORDERS
  ======================================================= */

  const [orders, setOrders] = useState(
    () => {

      const savedStudent = readJSON(
        "student",
        null
      );

      if (!savedStudent) return [];

      const allOrders = readJSON(
        "studentOrders",
        {}
      );

      return (
        allOrders[
          savedStudent.admissionNo
        ] || []
      );
    }
  );


  /* =======================================================
     SAVE CART
  ======================================================= */

  useEffect(() => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );
  }, [cart]);


  /* =======================================================
     SAVE PROFILE
  ======================================================= */

  useEffect(() => {

    if (!student || !profile) return;

    const profiles = readJSON(
      "studentProfiles",
      {}
    );

    profiles[student.admissionNo] =
      profile;

    localStorage.setItem(
      "studentProfiles",
      JSON.stringify(profiles)
    );

  }, [profile, student]);


  /* =======================================================
     SAVE ADDRESSES
  ======================================================= */

  useEffect(() => {

    if (!student) return;

    const allAddresses = readJSON(
      "studentAddresses",
      {}
    );

    allAddresses[
      student.admissionNo
    ] = addresses;

    localStorage.setItem(
      "studentAddresses",
      JSON.stringify(allAddresses)
    );

  }, [addresses, student]);


  /* =======================================================
     SAVE ORDERS
  ======================================================= */

  useEffect(() => {

    if (!student) return;

    const allOrders = readJSON(
      "studentOrders",
      {}
    );

    allOrders[
      student.admissionNo
    ] = orders;

    localStorage.setItem(
      "studentOrders",
      JSON.stringify(allOrders)
    );

  }, [orders, student]);


  /* =======================================================
     LOGIN
  ======================================================= */

  const login = (admissionNo) => {

    const value =
      admissionNo.trim().toLowerCase();

    const matchedStudent =
      students.find(
        (item) =>
          item.admissionNo
            .toLowerCase() === value
      );

    if (!matchedStudent) {
      return {
        success: false,
        message:
          "Admission number not found.",
      };
    }


    setStudent(matchedStudent);

    localStorage.setItem(
      "student",
      JSON.stringify(matchedStudent)
    );


    /* PROFILE */

    const profiles = readJSON(
      "studentProfiles",
      {}
    );

    const studentProfile =
      profiles[
        matchedStudent.admissionNo
      ] || {
        name:
          matchedStudent.name || "",
        email:
          matchedStudent.email || "",
        phone:
          matchedStudent.phone || "",
        photo:
          matchedStudent.photo || "",
        admissionNo:
          matchedStudent.admissionNo,
        className:
          matchedStudent.className,
        section:
          matchedStudent.section || "",
        school:
          matchedStudent.school || "",
      };

    setProfile(studentProfile);


    /* ADDRESSES */

    const allAddresses = readJSON(
      "studentAddresses",
      {}
    );

    setAddresses(
      allAddresses[
        matchedStudent.admissionNo
      ] || []
    );


    /* ORDERS */

    const allOrders = readJSON(
      "studentOrders",
      {}
    );

    setOrders(
      allOrders[
        matchedStudent.admissionNo
      ] || []
    );


    /* KIT */

    const purchasedStudents =
      readJSON(
        "purchasedStudents",
        []
      );

    setKitPurchased(
      purchasedStudents.includes(
        matchedStudent.admissionNo
      )
    );


    setCart([]);

    setLoginOpen(false);


    return {
      success: true,
    };
  };


  /* =======================================================
     LOGOUT
  ======================================================= */

  const logout = () => {

    setStudent(null);
    setProfile(null);
    setAddresses([]);
    setOrders([]);
    setCart([]);
    setKitPurchased(false);

    localStorage.removeItem("student");
    localStorage.removeItem("cart");

  };


  /* =======================================================
     UPDATE PROFILE
  ======================================================= */

  const updateProfile = (data) => {

    setProfile((current) => ({
      ...current,
      ...data,

      /* these remain tied to admission */
      admissionNo:
        current?.admissionNo ||
        student?.admissionNo,

      className:
        current?.className ||
        student?.className,

      section:
        current?.section ||
        student?.section,

      school:
        current?.school ||
        student?.school,
    }));

  };


  /* =======================================================
     ADDRESS METHODS
  ======================================================= */

  const addAddress = (address) => {

    const newAddress = {
      ...address,
      id: createId("ADDR"),
    };


    setAddresses((current) => {

      let updated = [...current];


      /*
       If first address,
       automatically make it default.
      */

      if (updated.length === 0) {
        newAddress.isDefault = true;
      }


      if (newAddress.isDefault) {

        updated = updated.map(
          (item) => ({
            ...item,
            isDefault: false,
          })
        );

      }


      return [
        ...updated,
        newAddress,
      ];
    });


    return newAddress;
  };


  const updateAddress = (
    addressId,
    data
  ) => {

    setAddresses((current) => {

      let updated = current.map(
        (item) =>
          item.id === addressId
            ? {
                ...item,
                ...data,
              }
            : item
      );


      if (data.isDefault) {

        updated = updated.map(
          (item) => ({
            ...item,
            isDefault:
              item.id === addressId,
          })
        );

      }


      return updated;
    });

  };


  const deleteAddress = (
    addressId
  ) => {

    setAddresses((current) => {

      const deleting =
        current.find(
          (item) =>
            item.id === addressId
        );

      let updated =
        current.filter(
          (item) =>
            item.id !== addressId
        );


      /*
       If default deleted,
       first remaining becomes default.
      */

      if (
        deleting?.isDefault &&
        updated.length > 0
      ) {
        updated = updated.map(
          (item, index) => ({
            ...item,
            isDefault:
              index === 0,
          })
        );
      }


      return updated;
    });

  };


  const setDefaultAddress = (
    addressId
  ) => {

    setAddresses((current) =>
      current.map((item) => ({
        ...item,
        isDefault:
          item.id === addressId,
      }))
    );

  };


  const defaultAddress =
    useMemo(() => {

      return (
        addresses.find(
          (item) =>
            item.isDefault
        ) ||
        addresses[0] ||
        null
      );

    }, [addresses]);


  /* =======================================================
     CURRENT KIT
  ======================================================= */

  const currentKit =
    useMemo(() => {

      if (!student) return null;

      return (
        kits.find(
          (kit) =>
            kit.className ===
            student.className
        ) || null
      );

    }, [student]);


  /* =======================================================
     INDIVIDUAL PRODUCTS
  ======================================================= */

  const availableProducts =
    useMemo(() => {

      if (!student) return [];

      return individualProducts.filter(
        (product) =>
          product.className ===
          student.className
      );

    }, [student]);


  /* =======================================================
     ADD TO CART
  ======================================================= */

  const addToCart = (
  product,
  size = null,
  isKitItem = false,
  quantity = 1
) => {
  setCart((currentCart) => {
    /*
      KIT PRODUCT
      -----------
      Kit composition is already fixed.

      Example:
      Shirt = 1
      Pant = 1
      Tie = 1
      Socks = 1

      Customer can change SIZE,
      but cannot increase/decrease quantity.

      NORMAL PRODUCT
      --------------
      Quantity works normally.
    */

    const fixedQuantity = isKitItem
      ? Number(product.kitQuantity || quantity || 1)
      : Number(quantity || 1);


    /*
      KIT:
      Keep one cart entry per kit product.

      NORMAL PRODUCT:
      Size is part of cart key so different
      sizes can behave as separate selections.
    */

    const cartKey = isKitItem
      ? `kit-${product.id}`
      : `${product.id}-${size || "no-size"}`;


    const existingItem =
      currentCart.find(
        (item) =>
          item.cartKey === cartKey
      );


    /* =========================================
       KIT ITEM ALREADY EXISTS

       DO NOT increase quantity.

       Only:
       - update size
       - update selected-size price
       - preserve fixed quantity
    ========================================= */

    if (
      existingItem &&
      isKitItem
    ) {
      return currentCart.map(
        (item) =>
          item.cartKey === cartKey
            ? {
                ...item,

                ...product,

                cartKey,

                size,

                price: Number(
                  product.price || 0
                ),

                quantity:
                  Number(
                    item.kitQuantity ||
                    item.quantity ||
                    fixedQuantity ||
                    1
                  ),

                isKitItem: true,

                quantityLocked: true,
              }
            : item
      );
    }


    /* =========================================
       NORMAL PRODUCT ALREADY EXISTS

       Existing normal ecommerce behavior:
       quantity increases.
    ========================================= */

    if (
      existingItem &&
      !isKitItem
    ) {
      return currentCart.map(
        (item) =>
          item.cartKey === cartKey
            ? {
                ...item,

                quantity:
                  Number(item.quantity || 1) +
                  fixedQuantity,
              }
            : item
      );
    }


    /* =========================================
       NEW ITEM
    ========================================= */

    return [
      ...currentCart,

      {
        ...product,

        cartKey,

        size,

        price: Number(
          product.price || 0
        ),

        quantity: fixedQuantity,

        isKitItem,

        /*
          Important flag.

          true  = quantity cannot change
          false = normal quantity controls
        */

        quantityLocked:
          isKitItem === true,

        /*
          Keep original kit quantity separately.

          Useful later when backend/admin
          defines kit composition.
        */

        kitQuantity:
          isKitItem
            ? fixedQuantity
            : undefined,
      },
    ];
  });
};

  /* =======================================================
     REMOVE CART ITEM
  ======================================================= */

  const removeFromCart = (
    cartKey
  ) => {

    setCart((current) =>
      current.filter(
        (item) =>
          item.cartKey !== cartKey
      )
    );

  };


  /* =======================================================
     UPDATE QUANTITY
  ======================================================= */

const updateQuantity = (
  cartKey,
  quantity
) => {
  setCart((currentCart) =>
    currentCart.map((item) => {
      if (
        item.cartKey !== cartKey
      ) {
        return item;
      }


      /* =========================================
         KIT ITEM

         Quantity cannot be modified.
      ========================================= */

      if (
        item.isKitItem === true ||
        item.quantityLocked === true
      ) {
        return {
          ...item,

          quantity: Number(
            item.kitQuantity ||
            item.quantity ||
            1
          ),
        };
      }


      /* =========================================
         NORMAL PRODUCT

         Quantity can change normally.
      ========================================= */

      return {
        ...item,

        quantity: Math.max(
          1,
          Number(quantity || 1)
        ),
      };
    })
  );
};


  /* =======================================================
     UPDATE CART SIZE
  ======================================================= */

 const updateCartSize = (
  cartKey,
  newSize
) => {
  setCart((currentCart) =>
    currentCart.map((item) => {
      if (
        item.cartKey !== cartKey
      ) {
        return item;
      }


      /* =========================================
         FIND NEW SIZE PRICE

         Your existing storeData uses:
         sizes: [
           { label: "24", price: 700 },
           { label: "26", price: 720 }
         ]
      ========================================= */

      let updatedPrice =
        Number(item.price || 0);


      if (
        item.hasSize &&
        Array.isArray(item.sizes)
      ) {
        const selectedSize =
          item.sizes.find(
            (size) =>
              String(size.label) ===
              String(newSize)
          );


        if (
          selectedSize?.price !==
          undefined
        ) {
          updatedPrice = Number(
            selectedSize.price
          );
        }
      }


      return {
        ...item,

        size: newSize,

        price: updatedPrice,

        /*
          KIT:
          preserve fixed quantity.

          NORMAL:
          preserve selected quantity.
        */

        quantity:
          item.isKitItem ||
          item.quantityLocked
            ? Number(
                item.kitQuantity ||
                item.quantity ||
                1
              )
            : Number(
                item.quantity || 1
              ),
      };
    })
  );
};
  /* =======================================================
     CART CALCULATIONS
  ======================================================= */

  const cartSubtotal =
    useMemo(() => {

      return cart.reduce(
        (total, item) =>
          total +
          Number(item.price || 0) *
            Number(
              item.quantity || 1
            ),
        0
      );

    }, [cart]);


  /*
    Shipping:
    ₹1000 and above = FREE
    Below ₹1000 = ₹5
  */

  const shippingAmount =
    cartSubtotal >= 1000
      ? 0
      : cartSubtotal > 0
      ? 5
      : 0;


  /*
    Product prices already include GST.
  */

  const gstAmount =
    cartSubtotal -
    cartSubtotal / 1.05;


  const cartTotal =
    cartSubtotal +
    shippingAmount;


  const cartCount =
    cart.reduce(
      (total, item) =>
        total +
        Number(
          item.quantity || 0
        ),
      0
    );


  /* =======================================================
     COMPLETE KIT
  ======================================================= */

  const completeKitPurchase = () => {

    if (!student) return;

    const purchasedStudents =
      readJSON(
        "purchasedStudents",
        []
      );


    if (
      !purchasedStudents.includes(
        student.admissionNo
      )
    ) {

      purchasedStudents.push(
        student.admissionNo
      );

      localStorage.setItem(
        "purchasedStudents",
        JSON.stringify(
          purchasedStudents
        )
      );

    }


    setKitPurchased(true);
  };


  /* =======================================================
     CREATE ORDER
  ======================================================= */

  const createOrder = ({
    shippingAddress,
    paymentMethod = "COD",
  }) => {

    if (
      !student ||
      cart.length === 0
    ) {
      return null;
    }


    const newOrder = {

      id: createId("ORD"),

      orderNumber:
        `BL${Date.now()
          .toString()
          .slice(-8)}`,

      createdAt:
        new Date().toISOString(),

      status: "Processing",

      paymentStatus:
        paymentMethod === "COD"
          ? "Pending"
          : "Paid",

      paymentMethod,

      student: {
        name:
          profile?.name ||
          student.name,

        email:
          profile?.email ||
          student.email ||
          "",

        phone:
          profile?.phone ||
          student.phone ||
          "",

        admissionNo:
          student.admissionNo,

        className:
          student.className,
      },

      shippingAddress,

      items: cart.map(
        (item) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          size: item.size,
          quantity:
            item.quantity,
          price:
            item.price,
          total:
            Number(item.price) *
            Number(
              item.quantity
            ),
        })
      ),

      subtotal:
        cartSubtotal,

      shipping:
        shippingAmount,

      gstIncluded:
        gstAmount,

      total:
        cartTotal,
    };


    setOrders((current) => [
      newOrder,
      ...current,
    ]);


    const containsKit =
      cart.some(
        (item) =>
          item.isKitItem
      );


    if (
      containsKit &&
      !kitPurchased
    ) {
      completeKitPurchase();
    }


    setCart([]);


    return newOrder;
  };


  /* =======================================================
     VALUE
  ======================================================= */

  const value = {

    student,
    profile,

    login,
    logout,

    loginOpen,
    setLoginOpen,

    updateProfile,

    addresses,
    defaultAddress,

    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,

    orders,

    cart,
    cartCount,

    cartSubtotal,
    shippingAmount,
    gstAmount,
    cartTotal,

    addToCart,
    removeFromCart,
    updateQuantity,
    updateCartSize,

    currentKit,
    availableProducts,

    kitPurchased,
    completeKitPurchase,

    createOrder,
  };


  return (
    <StoreContext.Provider
      value={value}
    >
      {children}
    </StoreContext.Provider>
  );
}


/* =========================================================
   HOOK
========================================================= */

export function useStore() {

  const context =
    useContext(StoreContext);

  if (!context) {
    throw new Error(
      "useStore must be used inside StoreProvider"
    );
  }

  return context;
}