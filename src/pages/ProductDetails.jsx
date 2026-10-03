import {
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";


export default function ProductDetails() {

  const { id } =
    useParams();


  const navigate =
    useNavigate();


  const {
    student,
    kitPurchased,
    availableProducts,
    addToCart,
  } = useStore();


  /* =====================================================
     CURRENT PRODUCT
  ====================================================== */

  const product =
    availableProducts.find(
      (item) =>
        String(item.id) ===
        String(id)
    );


  /* =====================================================
     DEFAULT SIZE

     First size selected internally.

     We DO NOT display:
     "First size selected by default"
  ====================================================== */

  const firstSize =
    product?.hasSize &&
    product?.sizes?.length
      ? product.sizes[0].label
      : null;


  const [
    selectedSize,
    setSelectedSize,
  ] = useState(firstSize);


  const [
    quantity,
    setQuantity,
  ] = useState(1);


  const [
    added,
    setAdded,
  ] = useState(false);


  /* =====================================================
     RELATED PRODUCT CHANGE
  ====================================================== */

  useEffect(() => {

    if (!product) {
      return;
    }


    const defaultSize =
      product.hasSize &&
      product.sizes?.length
        ? product.sizes[0].label
        : null;


    setSelectedSize(
      defaultSize
    );

    setQuantity(1);

    setAdded(false);


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }, [product?.id]);


  /* =====================================================
     PROTECT PRODUCT PAGE
  ====================================================== */

  useEffect(() => {

    if (
      student &&
      !kitPurchased
    ) {
      navigate("/");
    }

  }, [
    student,
    kitPurchased,
    navigate,
  ]);


  /* =====================================================
     SELECTED SIZE DATA
  ====================================================== */

  const selectedSizeData =
    useMemo(() => {

      if (
        !product?.hasSize
      ) {
        return null;
      }


      return product.sizes.find(
        (size) =>
          String(size.label) ===
          String(selectedSize)
      );

    }, [
      product,
      selectedSize,
    ]);


  /* =====================================================
     UNIT PRICE

     Only this amount displays.

     Quantity does NOT change this
     displayed amount.
  ====================================================== */

  const unitPrice =
    product?.hasSize
      ? Number(
          selectedSizeData?.price || 0
        )
      : Number(
          product?.price || 0
        );


  /* =====================================================
     RELATED PRODUCTS
  ====================================================== */

  const relatedProducts =
    useMemo(() => {

      if (!product) {
        return [];
      }


      return availableProducts
        .filter(
          (item) =>
            item.id !==
            product.id
        )
        .slice(0, 4);

    }, [
      product,
      availableProducts,
    ]);


  /* =====================================================
     ADD TO CART
  ====================================================== */

  const handleAddToCart = () => {

    const cartProduct = {
      ...product,

      /*
        Selected size price
        goes to cart.
      */

      price:
        unitPrice,
    };


    addToCart(
      cartProduct,
      selectedSize,
      false,
      quantity
    );


    setAdded(true);


    setTimeout(
      () => {
        setAdded(false);
      },
      1600
    );
  };


  /* =====================================================
     PRODUCT NOT FOUND
  ====================================================== */

  if (!product) {

    return (
      <main
        className="
          flex
          min-h-[60vh]
          items-center
          justify-center

          px-4
        "
      >
        <div className="text-center">

          <h1
            className="
              text-2xl
              font-extrabold
              text-slate-950
            "
          >
            Product not found
          </h1>


          <Link
            to="/"

            className="
              mt-5

              inline-flex
              items-center
              gap-2

              font-bold
              text-indigo-600
            "
          >
            <ArrowLeft size={17} />

            Back to Products
          </Link>

        </div>
      </main>
    );
  }


  return (
    <main className="bg-white">

      {/* =================================================
          PRODUCT
      ================================================== */}

      <section
        className="
          px-4
          pb-10
          pt-5

          sm:px-6
          sm:pb-14

          lg:px-10
          lg:pb-16
        "
      >
        <div
          className="
            mx-auto
            max-w-[1250px]
          "
        >

          {/* BREADCRUMB */}

          <div
            className="
              flex
              flex-wrap
              gap-2

              text-xs
              text-slate-400
            "
          >
            <Link
              to="/"
              className="
                hover:text-indigo-600
              "
            >
              Home
            </Link>

            <span>/</span>

            <span>
              Products
            </span>

            <span>/</span>

            <span
              className="
                font-semibold
                text-slate-700
              "
            >
              {product.name}
            </span>
          </div>


          <Link
            to="/"

            className="
              mt-5

              inline-flex
              items-center
              gap-2

              text-[13px]
              font-bold
              text-slate-600

              hover:text-indigo-600
            "
          >
            <ArrowLeft size={16} />

            Back to Products
          </Link>


          {/* PRODUCT GRID */}

          <div
            className="
              mt-6

              grid
              gap-8

              md:grid-cols-2
              md:items-start

              lg:gap-16
            "
          >

            {/* =========================================
                IMAGE
            ========================================== */}

            <div>

              <div
                className="
                  flex

                  aspect-square

                  items-center
                  justify-center

                  overflow-hidden

                  rounded-2xl

                  bg-slate-50

                  p-4

                  sm:p-6
                "
              >
                <img
                  src={product.image}
                  alt={product.name}

                  className="
                    h-full
                    w-full

                    object-contain
                  "
                />
              </div>


              <div
                className="
                  mt-4

                  h-[76px]
                  w-[76px]

                  overflow-hidden

                  rounded-xl

                  border-2
                  border-indigo-600

                  p-1
                "
              >
                <img
                  src={product.image}
                  alt={product.name}

                  className="
                    h-full
                    w-full

                    rounded-lg

                    object-cover
                  "
                />
              </div>

            </div>


            {/* =========================================
                CONTENT
            ========================================== */}

            <div
              className="
                md:pt-4
              "
            >

              <p
                className="
                  text-xs
                  font-extrabold
                  uppercase
                  tracking-[0.18em]
                  text-indigo-600
                "
              >
                {product.category}
              </p>


              <h1
                className="
                  mt-2

                  text-[28px]
                  font-extrabold
                  leading-tight
                  text-slate-950

                  sm:text-[36px]

                  lg:text-[40px]
                "
              >
                {product.name}
              </h1>


              {/* PRICE ONLY */}

              <p
                className="
                  mt-5

                  text-[28px]
                  font-extrabold
                  text-slate-950

                  sm:text-[31px]
                "
              >
                ₹{unitPrice}
              </p>


              {/* =====================================
                  SIZE
              ====================================== */}

              {product.hasSize && (

                <div className="mt-7">

                  <h3
                    className="
                      text-[13px]
                      font-extrabold
                      text-slate-950
                    "
                  >
                    Select Size
                  </h3>


                  <div
                    className="
                      mt-3

                      flex
                      flex-wrap
                      gap-2
                    "
                  >

                    {product.sizes.map(
                      (size) => {

                        const active =
                          String(
                            selectedSize
                          ) ===
                          String(
                            size.label
                          );


                        return (
                          <button
                            key={
                              size.label
                            }

                            type="button"

                            onClick={() =>
                              setSelectedSize(
                                size.label
                              )
                            }

                            className={`
                              flex

                              h-[46px]
                              min-w-[58px]

                              items-center
                              justify-center

                              rounded-xl

                              border

                              px-3

                              text-[13px]
                              font-bold

                              transition

                              ${
                                active
                                  ? `
                                    border-indigo-600
                                    bg-indigo-600
                                    text-white

                                    shadow-md
                                    shadow-indigo-600/20
                                  `
                                  : `
                                    border-slate-200
                                    bg-white
                                    text-slate-700

                                    hover:border-indigo-300
                                  `
                              }
                            `}
                          >
                            {size.label}
                          </button>
                        );
                      }
                    )}

                  </div>

                </div>
              )}


              {/* =====================================
                  QUANTITY
              ====================================== */}

              <div className="mt-7">

                <h3
                  className="
                    mb-3

                    text-[13px]
                    font-extrabold
                    text-slate-950
                  "
                >
                  Quantity
                </h3>


                <div
                  className="
                    inline-flex

                    h-[46px]

                    items-center

                    overflow-hidden

                    rounded-xl

                    border
                    border-slate-200
                  "
                >

                  <button
                    type="button"

                    onClick={() =>
                      setQuantity(
                        (current) =>
                          Math.max(
                            1,
                            current - 1
                          )
                      )
                    }

                    disabled={
                      quantity === 1
                    }

                    className="
                      flex
                      h-full
                      w-11
                      items-center
                      justify-center

                      text-slate-500

                      hover:bg-slate-50

                      disabled:opacity-30
                    "
                  >
                    <Minus size={17} />
                  </button>


                  <span
                    className="
                      min-w-[45px]

                      text-center

                      text-sm
                      font-extrabold
                      text-slate-950
                    "
                  >
                    {quantity}
                  </span>


                  <button
                    type="button"

                    onClick={() =>
                      setQuantity(
                        (current) =>
                          current + 1
                      )
                    }

                    className="
                      flex
                      h-full
                      w-11
                      items-center
                      justify-center

                      text-slate-500

                      hover:bg-slate-50
                    "
                  >
                    <Plus size={17} />
                  </button>

                </div>

              </div>


              {/* =====================================
                  ADD TO CART
              ====================================== */}

              <button
                type="button"

                onClick={
                  handleAddToCart
                }

                className={`
                  mt-7

                  flex

                  h-[52px]
                  w-full

                  max-w-[360px]

                  items-center
                  justify-center
                  gap-2

                  rounded-xl

                  text-sm
                  font-bold
                  text-white

                  transition

                  ${
                    added
                      ? "bg-emerald-600"
                      : `
                        bg-indigo-600

                        shadow-lg
                        shadow-indigo-600/20

                        hover:bg-indigo-700
                      `
                  }
                `}
              >

                {added ? (
                  <>
                    <Check size={18} />

                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag
                      size={18}
                    />

                    Add to Cart
                  </>
                )}

              </button>


              {/* =====================================
                  PRODUCT DETAILS
              ====================================== */}

              <div
                className="
                  mt-8

                  border-t
                  border-slate-200

                  pt-6
                "
              >

                <h2
                  className="
                    text-xl
                    font-extrabold
                    text-slate-950
                  "
                >
                  Product Details
                </h2>


                <p
                  className="
                    mt-3

                    text-[13px]
                    leading-6
                    text-slate-500
                  "
                >
                  {product.description}
                </p>


                <div
                  className="
                    mt-4

                    space-y-2

                    text-[13px]
                    text-slate-500
                  "
                >

                  <p>
                    <strong
                      className="
                        text-slate-950
                      "
                    >
                      Category:
                    </strong>

                    {" "}

                    {product.category}
                  </p>


                  <p>
                    <strong
                      className="
                        text-slate-950
                      "
                    >
                      SKU:
                    </strong>

                    {" "}

                    {product.sku}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =================================================
          RELATED PRODUCTS
      ================================================== */}

      {relatedProducts.length > 0 && (

        <section
          className="
            border-t
            border-slate-100

            bg-slate-50

            px-4
            py-10

            sm:px-6
            sm:py-14

            lg:px-10
          "
        >

          <div
            className="
              mx-auto
              max-w-[1250px]
            "
          >

            <div className="text-center">

              <p
                className="
                  text-xs
                  font-extrabold
                  uppercase
                  tracking-[0.2em]
                  text-indigo-600
                "
              >
                You May Also Need
              </p>


              <h2
                className="
                  mt-2

                  text-[25px]
                  font-extrabold
                  text-slate-950

                  sm:text-[32px]
                "
              >
                Related Products
              </h2>

            </div>


            <div
              className="
                mt-8

                grid
                grid-cols-2

                gap-3

                sm:gap-5

                md:grid-cols-3

                lg:grid-cols-4
              "
            >

              {relatedProducts.map(
                (item) => (

                  <ProductCard
                    key={item.id}
                    product={item}
                  />

                )
              )}

            </div>

          </div>

        </section>
      )}

    </main>
  );
}