

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowRight,
  CheckCircle2,
  PackageCheck,
  Shirt,
  Sparkles,
  X,
} from "lucide-react";

import { useStore } from "../context/StoreContext";
import KitDrawer from "../components/KitDrawer";
import ProductCard from "../components/ProductCard";

import schoolBanner from "../assets/images/school-banner.jpg";


export default function Home() {
  const {
    student,
    currentKit,
    kitPurchased,
    availableProducts,
    setLoginOpen,
  } = useStore();

  const [kitOpen, setKitOpen] =
    useState(false);

  const [welcomePopup, setWelcomePopup] =
    useState(false);

  const previousStudentRef =
    useRef(student?.admissionNo || null);


  /* =====================================================
     LOGIN WELCOME POPUP
  ====================================================== */

  useEffect(() => {
    const previousStudent =
      previousStudentRef.current;

    const currentStudent =
      student?.admissionNo || null;

    if (
      currentStudent &&
      previousStudent !== currentStudent
    ) {
      setWelcomePopup(true);

      const timer =
        window.setTimeout(() => {
          setWelcomePopup(false);
        }, 3500);

      previousStudentRef.current =
        currentStudent;

      return () =>
        window.clearTimeout(timer);
    }

    previousStudentRef.current =
      currentStudent;
  }, [student]);


  return (
    <main
      className="
        relative
        w-full
        overflow-x-hidden
        bg-[#F7F9FC]
      "
    >

      {/* =====================================================
          WELCOME POPUP
      ====================================================== */}

      {student && welcomePopup && (
        <div
          className="
            fixed
            right-3
            top-[82px]
            z-[80]

            w-[calc(100%-24px)]
            max-w-[350px]

            animate-[welcomePopup_.35s_ease-out]

            sm:right-5
            sm:top-[90px]
          "
        >
          <div
            className="
              relative
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-4

              shadow-[0_16px_45px_rgba(15,23,42,0.16)]
            "
          >
            <button
              type="button"
              onClick={() =>
                setWelcomePopup(false)
              }
              className="
                absolute
                right-3
                top-3

                flex
                h-7
                w-7
                items-center
                justify-center

                rounded-full

                text-slate-400

                transition

                hover:bg-slate-100
                hover:text-slate-700
              "
            >
              <X size={15} />
            </button>

            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center

                  rounded-xl

                  bg-indigo-50
                  text-indigo-600
                "
              >
                <CheckCircle2 size={21} />
              </div>

              <div
                className="
                  min-w-0
                  pr-6
                "
              >
                <p
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.12em]
                    text-slate-400
                  "
                >
                  Welcome to Scholar Store
                </p>

                <h3
                  className="
                    mt-0.5
                    truncate
                    text-[16px]
                    font-extrabold
                    text-[#07152D]
                  "
                >
                  {student.name}
                </h3>

                <p
                  className="
                    mt-0.5
                    text-[11px]
                    text-slate-500
                  "
                >
                  Your store is ready
                </p>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* =====================================================
          SCHOOL BANNER
      ====================================================== */}

      <section
        className="
          w-full
          overflow-hidden
          bg-slate-100
        "
      >
        <div
          className="
            h-[150px]
            w-full

            sm:h-[210px]
            md:h-[255px]
            lg:h-[300px]
            xl:h-[330px]
          "
        >
          <img
            src={schoolBanner}
            alt="School Campus"
            className="
              h-full
              w-full
              object-cover
              object-center
            "
          />
        </div>
      </section>


      {/* =====================================================
          BEFORE LOGIN
      ====================================================== */}

      {!student && (
        <section
          className="
            px-4
            py-8

            sm:px-6
            sm:py-10
          "
        >
          <div
            className="
              mx-auto
              max-w-[850px]
              text-center
            "
          >
            <p
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.22em]
                text-indigo-600
              "
            >
              Getting Started
            </p>

            <h1
              className="
                mx-auto
                mt-3
                max-w-[750px]

                text-[24px]
                font-extrabold
                leading-tight
                text-[#07152D]

                sm:text-[30px]
                md:text-[35px]
              "
            >
              Your school store is
              personalized for you.
            </h1>

            <p
              className="
                mx-auto
                mt-3
                max-w-[650px]

                text-[13px]
                leading-6
                text-slate-500
              "
            >
              Login using your admission
              number to access your school
              uniform kit.
            </p>

            <button
              type="button"
              onClick={() =>
                setLoginOpen(true)
              }
              className="
                group
                mt-5

                inline-flex
                h-[44px]
                items-center
                justify-center
                gap-2

                rounded-xl

                bg-[#4F39F6]

                px-6

                text-[13px]
                font-bold
                text-white

                shadow-[0_8px_20px_rgba(79,57,246,0.20)]

                transition-all

                hover:-translate-y-0.5
                hover:bg-[#3F2BE0]
              "
            >
              Student Login

              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}


      {/* =====================================================
          BEFORE KIT PURCHASE
      ====================================================== */}

      {student &&
        !kitPurchased &&
        currentKit && (
          <section
            className="
              px-3
              py-5

              sm:px-5
              sm:py-6

              lg:px-8
              lg:py-7
            "
          >
            <div
              className="
                mx-auto
                max-w-[850px]
              "
            >
              <div
                className="
                  relative
                  overflow-hidden

                  rounded-[22px]

                  border
                  border-[#E2E0FF]

                  
                "
              >
                <div
                  className="
                    pointer-events-none

                    absolute
                    right-[-80px]
                    top-[-100px]

                    h-[320px]
                    w-[320px]

                    rounded-full

                    bg-indigo-100/40

                    blur-[80px]
                  "
                />


                {/* =================================================
                    KIT CARD
                    LEFT SIDE WIDER
                    RIGHT IMAGE SIDE SMALLER
                ================================================== */}

                <div
                  className="
                    relative
                    z-10

                    grid
                    grid-cols-1

                    md:grid-cols-[53%_47%]

                    lg:grid-cols-[52%_48%]

                    xl:grid-cols-[50%_50%]
                  "
                >

                  {/* =================================================
                      LEFT CONTENT
                  ================================================== */}

                  <div
                    className="
                      flex
                      flex-col
                      justify-center

                      px-4
                      py-5

                      sm:px-6
                      sm:py-6

                      md:px-6
                      md:py-7

                      lg:px-8
                      lg:py-8
                    "
                  >
                    <div
                      className="
                        inline-flex
                        w-fit
                        items-center
                        gap-1.5

                        rounded-full

                        bg-[#EFEEFF]

                        px-3
                        py-1.5
                      "
                    >
                      <PackageCheck
                        size={13}
                        className="text-[#4F39F6]"
                      />

                      <span
                        className="
                          text-[9px]
                          font-extrabold
                          text-[#4F39F6]

                          sm:text-[10px]
                        "
                      >
                        Your School Kit
                      </span>
                    </div>


                    {/* TITLE */}

                    <div
                      className="
                        mt-3
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <h2
                        className="
                          text-[28px]
                          font-black
                          leading-none
                          tracking-[-0.035em]
                          text-[#07152D]

                          sm:text-[32px]
                          md:text-[31px]
                          lg:text-[38px]
                        "
                      >
                        Kit{" "}

                        <span className="text-[#4F39F6]">
                          Bundle
                        </span>
                      </h2>

                      <Sparkles
                        size={19}
                        className="text-[#4F39F6]"
                      />
                    </div>


                    <p
                      className="
                        mt-2

                        text-[11px]
                        leading-5
                        text-[#71809D]

                        sm:text-[12px]
                        lg:text-[13px]
                      "
                    >
                      Complete uniform
                      essentials for your
                      class.
                    </p>


                    {/* =================================================
                        KIT PRODUCT NAMES

                        Maximum 6
                    ================================================== */}

                    <div
                      className="
                        mt-4

                        grid
                        grid-cols-2

                        gap-2

                        sm:max-w-[530px]

                        lg:mt-5
                        lg:gap-2.5
                      "
                    >
                      {currentKit.products
                        .slice(0, 6)
                        .map(
                          (
                            product,
                            index
                          ) => {
                            const quantity =
                              getKitQuantity(
                                product
                              );

                            return (
                              <div
                                key={
                                  product.id ||
                                  index
                                }
                                className="
                                  group

                                  flex
                                  min-w-0
                                  items-center

                                  rounded-[11px]

                                  border
                                  border-white

                                  bg-white/95

                                  px-2
                                  py-2

                                  shadow-[0_4px_15px_rgba(15,23,42,0.055)]

                                  transition-all
                                  duration-300

                                  hover:-translate-y-[1px]
                                  hover:shadow-md

                                  sm:px-2.5
                                "
                              >
                                <div
                                  className={`
                                    flex
                                    h-[28px]
                                    w-[28px]
                                    shrink-0
                                    items-center
                                    justify-center

                                    rounded-[8px]

                                    sm:h-[30px]
                                    sm:w-[30px]

                                    ${
                                      index % 4 === 0
                                        ? "bg-sky-100 text-sky-600"
                                        : index % 4 === 1
                                        ? "bg-violet-100 text-violet-600"
                                        : index % 4 === 2
                                        ? "bg-orange-100 text-orange-600"
                                        : "bg-emerald-100 text-emerald-600"
                                    }
                                  `}
                                >
                                  <Shirt size={13} />
                                </div>

                                <span
                                  className="
                                    ml-2

                                    min-w-0
                                    flex-1
                                    truncate

                                    text-[9px]
                                    font-extrabold
                                    text-[#07152D]

                                    sm:text-[10px]
                                    lg:text-[11px]
                                  "
                                >
                                  {getShortName(
                                    product.name
                                  )}
                                </span>

                                <span
                                  className="
                                    ml-1

                                    flex
                                    h-[22px]
                                    min-w-[25px]
                                    shrink-0
                                    items-center
                                    justify-center

                                    rounded-full

                                    bg-[#EFEEFF]

                                    px-1.5

                                    text-[8px]
                                    font-black
                                    text-[#4F39F6]

                                    sm:text-[9px]
                                  "
                                >
                                  ×{quantity}
                                </span>
                              </div>
                            );
                          }
                        )}
                    </div>


                    {/* VIEW KIT */}

                    <button
                      type="button"
                      onClick={() =>
                        setKitOpen(true)
                      }
                      className="
                        group

                        mt-4

                        inline-flex
                        h-[40px]
                        w-fit
                        min-w-[135px]
                        items-center
                        justify-center
                        gap-2

                        rounded-[10px]

                        bg-[#4F39F6]

                        px-5

                        text-[10px]
                        font-extrabold
                        text-white

                        shadow-[0_8px_20px_rgba(79,57,246,0.23)]

                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                        hover:bg-[#3F2BE0]

                        sm:min-w-[145px]
                        sm:text-[11px]
                      "
                    >
                      View Kit

                      <ArrowRight
                        size={14}
                        className="
                          transition-transform
                          duration-300

                          group-hover:translate-x-1
                        "
                      />
                    </button>
                  </div>


                  {/* =================================================
                      RIGHT OVERLAPPING IMAGES
                  ================================================== */}

                  <KitImageCollage
                    products={
                      currentKit.products
                    }
                  />
                </div>
              </div>
            </div>
          </section>
        )}


      {/* =====================================================
          NO KIT
      ====================================================== */}

      {student &&
        !kitPurchased &&
        !currentKit && (
          <section className="px-4 py-8">
            <div
              className="
                mx-auto
                max-w-[500px]

                rounded-2xl
                border
                border-slate-200
                bg-white

                p-6
                text-center
              "
            >
              <PackageCheck
                size={30}
                className="
                  mx-auto
                  text-[#4F39F6]
                "
              />

              <h3
                className="
                  mt-3
                  text-[18px]
                  font-extrabold
                  text-[#07152D]
                "
              >
                School Kit Coming Soon
              </h3>

              <p
                className="
                  mt-1
                  text-[12px]
                  text-slate-500
                "
              >
                Your school kit has not
                been assigned yet.
              </p>
            </div>
          </section>
        )}


      {/* =====================================================
          AFTER KIT PURCHASE
      ====================================================== */}

      {student &&
        kitPurchased && (
          <section
            className="
              px-3
              py-6

              sm:px-5
              sm:py-8

              lg:px-8
            "
          >
            <div
              className="
                mx-auto
                max-w-[1250px]
              "
            >
              <div
                className="
                  mx-auto
                  max-w-[720px]
                  text-center
                "
              >
                <h2
                  className="
                    text-[22px]
                    font-black
                    leading-tight
                    tracking-tight
                    text-[#07152D]

                    sm:text-[27px]
                    md:text-[30px]
                    lg:text-[33px]
                  "
                >
                  Select Your Product and
                  Order Uniform
                </h2>

                <p
                  className="
                    mx-auto
                    mt-2
                    max-w-[540px]

                    text-[11px]
                    leading-5
                    text-slate-500

                    sm:text-[12px]
                    md:text-[13px]
                  "
                >
                  Choose the required size
                  and quantity, then add
                  your uniform items to
                  cart.
                </p>
              </div>


              {availableProducts.length >
              0 ? (
                <div
                  className="
                    mt-5

                    grid
                    grid-cols-2
                    gap-2.5

                    sm:gap-3

                    md:grid-cols-2
                    md:gap-4

                    lg:grid-cols-4
                    lg:gap-4
                  "
                >
                  {availableProducts.map(
                    (product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                      />
                    )
                  )}
                </div>
              ) : (
                <div
                  className="
                    mx-auto
                    mt-7
                    max-w-[500px]

                    rounded-2xl

                    border
                    border-slate-200

                    bg-white

                    p-6
                    text-center
                  "
                >
                  <PackageCheck
                    size={30}
                    className="
                      mx-auto
                      text-indigo-500
                    "
                  />

                  <h3
                    className="
                      mt-3
                      text-[17px]
                      font-extrabold
                      text-[#07152D]
                    "
                  >
                    Products Coming Soon
                  </h3>
                </div>
              )}
            </div>
          </section>
        )}


      {/* =====================================================
          KIT DRAWER
      ====================================================== */}

      <KitDrawer
        open={kitOpen}
        onClose={() =>
          setKitOpen(false)
        }
      />


      <style>
        {`
          @keyframes welcomePopup {
            0% {
              opacity: 0;
              transform: translateY(-12px) scale(.97);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </main>
  );
}


/* =========================================================
   KIT IMAGE COLLAGE

   Maximum 6 images.

   Main change:
   Images stay close together and overlap.

   4 products -> 4 image collage
   5 products -> 5 image collage
   6 products -> 6 image collage
========================================================= */

function KitImageCollage({
  products = [],
}) {
  const visibleProducts =
    products.slice(0, 6);

  const total =
    visibleProducts.length;

  return (
    // <div
    //   className="
    //     relative

    //     min-h-[255px]

    //     overflow-hidden

    //     border-t
    //     border-indigo-100/70

    //     bg-gradient-to-br
    //     from-[#F9F8FF]
    //     via-[#F5F3FF]
    //     to-[#EEECFF]

    //     sm:min-h-[285px]

    //     md:min-h-[300px]
    //     md:border-l
    //     md:border-t-0

    //     lg:min-h-[330px]
    //   "
    // >
    <div
  className="
    relative
    min-h-[255px]
    overflow-hidden

    bg-gradient-to-br
    from-[#F9F8FF]
    via-[#F5F3FF]
    to-[#EEECFF]

    sm:min-h-[285px]
    md:min-h-[300px]
    lg:min-h-[330px]
  "
>

      {/* CENTER BACKGROUND */}

      <div
        className="
          pointer-events-none

          absolute
          left-[50%]
          top-[49%]

          h-[185px]
          w-[185px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-[#E4E0FF]/75

          sm:h-[210px]
          sm:w-[210px]

          lg:h-[245px]
          lg:w-[245px]
        "
      />

      <div
        className="
          pointer-events-none

          absolute
          left-[30%]
          top-[15%]

          h-[100px]
          w-[100px]

          rounded-full

          bg-white/80

          blur-[30px]
        "
      />


      {/* COLLAGE AREA */}

      <div
        className="
          relative

          mx-auto

          h-full
          min-h-[255px]

          w-full
          max-w-[520px]

          sm:min-h-[285px]

          md:min-h-[300px]

          lg:min-h-[330px]
        "
      >
        {visibleProducts.map(
          (product, index) => (
            <KitCollageProduct
              key={
                product.id || index
              }
              product={product}
              index={index}
              total={total}
            />
          )
        )}
      </div>
    </div>
  );
}


/* =========================================================
   COLLAGE PRODUCT
========================================================= */

function KitCollageProduct({
  product,
  index,
  total,
}) {
  const positions =
    getCollagePositions(total);

  return (
    <div
      className={`
        absolute

        overflow-hidden

        border-[3px]
        border-white

        bg-white

        shadow-[0_12px_28px_rgba(15,23,42,0.16)]

        transition-all
        duration-300

        hover:z-50
        hover:scale-105

        sm:border-[4px]

        ${
          positions[index] ||
          positions[0]
        }
      `}
    >
      <img
        src={product.image}
        alt={product.name}
        className="
          h-full
          w-full

          object-cover
          object-center
        "
      />
    </div>
  );
}


/* =========================================================
   OVERLAPPING IMAGE POSITIONS
========================================================= */

function getCollagePositions(
  total
) {

  /* =====================================================
     1 PRODUCT
  ====================================================== */

  if (total === 1) {
    return [
      `
        z-20

        left-1/2
        top-1/2

        h-[180px]
        w-[135px]

        -translate-x-1/2
        -translate-y-1/2

        -rotate-[3deg]

        rounded-[20px]

        sm:h-[205px]
        sm:w-[150px]

        lg:h-[230px]
        lg:w-[170px]
      `,
    ];
  }


  /* =====================================================
     2 PRODUCTS
  ====================================================== */

  if (total === 2) {
    return [
      `
        z-20

        left-[28%]
        top-[18%]

        h-[165px]
        w-[120px]

        -rotate-[7deg]

        rounded-[18px]

        sm:h-[190px]
        sm:w-[140px]

        lg:h-[215px]
        lg:w-[155px]
      `,

      `
        z-30

        left-[48%]
        top-[10%]

        h-[175px]
        w-[125px]

        rotate-[6deg]

        rounded-[18px]

        sm:h-[200px]
        sm:w-[145px]

        lg:h-[225px]
        lg:w-[165px]
      `,
    ];
  }


  /* =====================================================
     3 PRODUCTS
  ====================================================== */

  if (total === 3) {
    return [
      `
        z-20

        left-[24%]
        top-[18%]

        h-[160px]
        w-[115px]

        -rotate-[7deg]

        rounded-[18px]

        sm:h-[185px]
        sm:w-[135px]

        lg:h-[210px]
        lg:w-[155px]
      `,

      `
        z-30

        left-[44%]
        top-[8%]

        h-[175px]
        w-[125px]

        rotate-[6deg]

        rounded-[18px]

        sm:h-[200px]
        sm:w-[145px]

        lg:h-[225px]
        lg:w-[165px]
      `,

      `
        z-40

        left-[42%]
        top-[60%]

        h-[78px]
        w-[78px]

        -rotate-[4deg]

        rounded-full

        sm:h-[90px]
        sm:w-[90px]

        lg:h-[100px]
        lg:w-[100px]
      `,
    ];
  }


  /* =====================================================
     4 PRODUCTS

        [ 1 ]
             [ 2 ]
          [3]    [4]

     3 and 4 overlap upwards.
  ====================================================== */

  if (total === 4) {
    return [
      `
        z-20

        left-[17%]
        top-[18%]

        h-[150px]
        w-[110px]

        -rotate-[7deg]

        rounded-[18px]

        sm:left-[20%]
        sm:h-[175px]
        sm:w-[128px]

        md:left-[16%]

        lg:left-[18%]
        lg:h-[205px]
        lg:w-[150px]
      `,

      `
        z-30

        left-[42%]
        top-[8%]

        h-[165px]
        w-[118px]

        rotate-[6deg]

        rounded-[18px]

        sm:h-[190px]
        sm:w-[138px]

        lg:h-[220px]
        lg:w-[160px]
      `,

      `
        z-40

        left-[36%]
        top-[58%]

        h-[72px]
        w-[72px]

        -rotate-[5deg]

        rounded-full

        sm:top-[57%]
        sm:h-[84px]
        sm:w-[84px]

        lg:top-[58%]
        lg:h-[98px]
        lg:w-[98px]
      `,

      `
        z-35

        left-[60%]
        top-[53%]

        h-[80px]
        w-[72px]

        rotate-[7deg]

        rounded-[16px]

        sm:h-[94px]
        sm:w-[84px]

        lg:top-[55%]
        lg:h-[108px]
        lg:w-[96px]
      `,
    ];
  }


  /* =====================================================
     5 PRODUCTS

              [2]
        [1]  OVERLAP

           [3] [4]
                [5]

     All images remain together.
  ====================================================== */

  if (total === 5) {
    return [
      `
        z-20

        left-[12%]
        top-[20%]

        h-[145px]
        w-[105px]

        -rotate-[7deg]

        rounded-[17px]

        sm:left-[16%]
        sm:h-[170px]
        sm:w-[123px]

        md:left-[12%]

        lg:left-[15%]
        lg:h-[198px]
        lg:w-[145px]
      `,

      `
        z-30

        left-[36%]
        top-[8%]

        h-[160px]
        w-[115px]

        rotate-[6deg]

        rounded-[17px]

        sm:h-[185px]
        sm:w-[135px]

        lg:h-[215px]
        lg:w-[157px]
      `,

      `
        z-40

        left-[31%]
        top-[57%]

        h-[70px]
        w-[70px]

        -rotate-[5deg]

        rounded-full

        sm:top-[56%]
        sm:h-[82px]
        sm:w-[82px]

        lg:h-[95px]
        lg:w-[95px]
      `,

      `
        z-35

        left-[55%]
        top-[51%]

        h-[78px]
        w-[70px]

        rotate-[7deg]

        rounded-[15px]

        sm:h-[92px]
        sm:w-[82px]

        lg:top-[53%]
        lg:h-[105px]
        lg:w-[94px]
      `,

      `
        z-45

        left-[67%]
        top-[29%]

        h-[66px]
        w-[66px]

        rotate-[5deg]

        rounded-full

        sm:h-[76px]
        sm:w-[76px]

        lg:h-[88px]
        lg:w-[88px]
      `,
    ];
  }


  /* =====================================================
     6 PRODUCTS

     Compact cluster.
     No image goes to far corners.
     Bottom images come UP and overlap.
  ====================================================== */

  return [
    `
      z-20

      left-[8%]
      top-[21%]

      h-[135px]
      w-[98px]

      -rotate-[7deg]

      rounded-[17px]

      sm:left-[13%]
      sm:h-[160px]
      sm:w-[116px]

      md:left-[8%]

      lg:left-[12%]
      lg:h-[188px]
      lg:w-[138px]
    `,

    `
      z-30

      left-[31%]
      top-[8%]

      h-[150px]
      w-[108px]

      rotate-[6deg]

      rounded-[17px]

      sm:h-[178px]
      sm:w-[128px]

      lg:h-[208px]
      lg:w-[150px]
    `,

    `
      z-40

      left-[27%]
      top-[58%]

      h-[66px]
      w-[66px]

      -rotate-[5deg]

      rounded-full

      sm:top-[56%]
      sm:h-[78px]
      sm:w-[78px]

      lg:h-[90px]
      lg:w-[90px]
    `,

    `
      z-35

      left-[50%]
      top-[53%]

      h-[74px]
      w-[66px]

      rotate-[7deg]

      rounded-[15px]

      sm:h-[87px]
      sm:w-[78px]

      lg:h-[100px]
      lg:w-[90px]
    `,

    `
      z-45

      left-[62%]
      top-[27%]

      h-[62px]
      w-[62px]

      rotate-[5deg]

      rounded-full

      sm:h-[73px]
      sm:w-[73px]

      lg:h-[84px]
      lg:w-[84px]
    `,

    `
      z-25

      left-[69%]
      top-[52%]

      h-[68px]
      w-[60px]

      -rotate-[6deg]

      rounded-[14px]

      sm:h-[80px]
      sm:w-[71px]

      lg:h-[92px]
      lg:w-[82px]
    `,
  ];
}


/* =========================================================
   SHORT PRODUCT NAME
========================================================= */

function getShortName(
  name = ""
) {
  const shortName =
    name
      .replace(
        /^School\s+/i,
        ""
      )
      .trim();

  if (
    shortName.toLowerCase() ===
    "pant"
  ) {
    return "Pants";
  }

  return shortName;
}


/* =========================================================
   KIT QUANTITY
========================================================= */

function getKitQuantity(
  product
) {
  if (
    product?.kitQuantity !==
    undefined
  ) {
    return Number(
      product.kitQuantity
    );
  }

  const name =
    String(
      product?.name || ""
    ).toLowerCase();

  if (name.includes("shirt")) {
    return 2;
  }

  if (name.includes("pant")) {
    return 3;
  }

  if (name.includes("tie")) {
    return 1;
  }

  if (name.includes("sock")) {
    return 2;
  }

  return 1;
}

// // src/pages/Home.jsx

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import {
//   ArrowRight,
//   PackageCheck,
// } from "lucide-react";

// import { useStore } from "../context/StoreContext";
// import KitDrawer from "../components/KitDrawer";

// import schoolBanner from "../assets/images/school-banner.jpg";


// export default function Home() {
//   const {
//     student,
//     currentKit,
//     kitPurchased,
//     availableProducts,
//     setLoginOpen,
//   } = useStore();

//   const navigate = useNavigate();

//   const [kitOpen, setKitOpen] =
//     useState(false);


//   /* =====================================================
//      WELCOME TEXT
//   ====================================================== */

//   const welcomeText = student
//     ? `Welcome ${student.name}`
//     : "";


//   return (
//     <main
//       className="
//         w-full
//         overflow-x-hidden
//         bg-white
//       "
//     >

//       {/* =====================================================
//           SCHOOL BANNER

//           MOBILE = COMPACT
//           TABLET / DESKTOP = INCREASED HEIGHT
//       ====================================================== */}

//       <section
//         className="
//           w-full
//           overflow-hidden
//           bg-slate-100
//         "
//       >
//         <div
//           className="
//             h-[150px]
//             w-full

//             sm:h-[220px]
//             md:h-[290px]
//             lg:h-[330px]
//             xl:h-[350px]
//           "
//         >
//           <img
//             src={schoolBanner}
//             alt="School Campus"
//             className="
//               h-full
//               w-full
//               object-cover
//               object-center
//             "
//           />
//         </div>
//       </section>


//       {/* =====================================================
//           BEFORE LOGIN
//       ====================================================== */}

//       {!student && (
//         <section
//           className="
//             bg-[#f7f9fc]

//             px-4
//             py-7

//             sm:px-6
//             sm:py-9
//           "
//         >
//           <div
//             className="
//               mx-auto
//               max-w-[850px]
//               text-center
//             "
//           >

//             <p
//               className="
//                 text-[10px]
//                 font-extrabold
//                 uppercase
//                 tracking-[0.22em]
//                 text-indigo-600
//               "
//             >
//               Getting Started
//             </p>


//             <h1
//               className="
//                 mx-auto
//                 mt-3
//                 max-w-[750px]

//                 text-[23px]
//                 font-extrabold
//                 leading-tight
//                 text-slate-950

//                 sm:text-[29px]
//                 md:text-[34px]
//               "
//             >
//               Your school store is personalized for you.
//             </h1>


//             <p
//               className="
//                 mx-auto
//                 mt-3
//                 max-w-[650px]

//                 text-[13px]
//                 leading-6
//                 text-slate-500
//               "
//             >
//               Enter your admission number to access your
//               class-specific school kit.
//             </p>


//             <button
//               type="button"
//               onClick={() =>
//                 setLoginOpen(true)
//               }
//               className="
//                 mt-5

//                 inline-flex
//                 h-[46px]
//                 items-center
//                 justify-center
//                 gap-2

//                 rounded-xl

//                 bg-indigo-600

//                 px-6

//                 text-[13px]
//                 font-bold
//                 text-white

//                 shadow-md
//                 shadow-indigo-600/20

//                 transition-all
//                 duration-300

//                 hover:-translate-y-0.5
//                 hover:bg-indigo-700

//                 active:scale-[0.98]
//               "
//             >
//               Student Login

//               <ArrowRight size={17} />
//             </button>

//           </div>
//         </section>
//       )}


//       {/* =====================================================
//           LOGGED IN
//           KIT NOT PURCHASED
//       ====================================================== */}

//       {student &&
//         !kitPurchased &&
//         currentKit && (

//           <section
//             className="
//               bg-[#f7f9fc]

//               px-4
//               py-4

//               sm:px-6
//               sm:py-5

//               md:px-8
//             "
//           >
//             <div
//               className="
//                 mx-auto
//                 max-w-[1150px]
//               "
//             >

//               {/* WELCOME */}

//               <WelcomeText
//                 text={welcomeText}
//               />


//               {/* =================================================
//                   KIT BUNDLE
//               ================================================== */}

//               <div
//                 className="
//                   mx-auto
//                   mt-4
//                   w-full
//                   max-w-[650px]

//                   rounded-2xl

//                   border
//                   border-slate-200

//                   bg-white

//                   px-5
//                   py-5

//                   shadow-[0_6px_22px_rgba(15,23,42,0.06)]

//                   sm:px-6
//                   sm:py-6
//                 "
//               >

//                 {/* CLASS + ICON */}

//                 <div
//                   className="
//                     flex
//                     items-start
//                     justify-between
//                     gap-4
//                   "
//                 >

//                   <div>

//                     <p
//                       className="
//                         text-[10px]
//                         font-extrabold
//                         uppercase
//                         tracking-[0.15em]
//                         text-indigo-600

//                         sm:text-[11px]
//                       "
//                     >
//                       {student.className}
//                     </p>


//                     <h2
//                       className="
//                         mt-1

//                         text-[19px]
//                         font-extrabold
//                         leading-tight
//                         text-[#07152D]

//                         sm:text-[21px]
//                       "
//                     >
//                       Kit Bundle
//                     </h2>


//                     <p
//                       className="
//                         mt-1

//                         text-[11px]
//                         leading-5
//                         text-slate-500

//                         sm:text-[12px]
//                       "
//                     >
//                       Your required school uniform items
//                     </p>

//                   </div>


//                   <div
//                     className="
//                       flex
//                       h-11
//                       w-11
//                       shrink-0
//                       items-center
//                       justify-center

//                       rounded-xl

//                       bg-indigo-50
//                       text-indigo-600
//                     "
//                   >
//                     <PackageCheck size={21} />
//                   </div>

//                 </div>


//                 {/* =================================================
//                     KIT PRODUCT NAMES
//                 ================================================== */}

//                 <div
//                   className="
//                     mt-5

//                     grid
//                     grid-cols-2

//                     gap-x-4
//                     gap-y-3

//                     sm:gap-x-8
//                   "
//                 >

//                   {currentKit.products.map(
//                     (
//                       product,
//                       index
//                     ) => (

//                       <div
//                         key={
//                           product.id ||
//                           index
//                         }
//                         className="
//                           flex
//                           min-w-0
//                           items-center
//                           gap-2
//                         "
//                       >

//                         <span
//                           className="
//                             h-1.5
//                             w-1.5
//                             shrink-0

//                             rounded-full

//                             bg-indigo-600
//                           "
//                         />


//                         <p
//                           className="
//                             truncate

//                             text-[11px]
//                             font-bold
//                             text-slate-700

//                             sm:text-[13px]
//                           "
//                         >
//                           {product.name}
//                         </p>

//                       </div>

//                     )
//                   )}

//                 </div>


//                 {/* DIVIDER */}

//                 <div
//                   className="
//                     mx-auto
//                     my-5

//                     h-px
//                     w-full

//                     bg-slate-100
//                   "
//                 />


//                 {/* VIEW KIT */}

//                 <div
//                   className="
//                     flex
//                     justify-center
//                   "
//                 >

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setKitOpen(true)
//                     }
//                     className="
//                       group

//                       inline-flex
//                       h-[40px]
//                       min-w-[110px]
//                       items-center
//                       justify-center
//                       gap-2

//                       rounded-lg

//                       bg-indigo-600

//                       px-5

//                       text-[12px]
//                       font-bold
//                       text-white

//                       shadow-md
//                       shadow-indigo-600/15

//                       transition-all
//                       duration-300

//                       hover:-translate-y-0.5
//                       hover:bg-indigo-700

//                       active:scale-[0.98]
//                     "
//                   >
//                     View

//                     <ArrowRight
//                       size={14}
//                       className="
//                         transition-transform
//                         duration-300

//                         group-hover:translate-x-1
//                       "
//                     />

//                   </button>

//                 </div>

//               </div>

//             </div>
//           </section>
//         )}


//       {/* =====================================================
//           LOGGED IN
//           NO KIT ASSIGNED
//       ====================================================== */}

//       {student &&
//         !kitPurchased &&
//         !currentKit && (

//           <section
//             className="
//               bg-[#f7f9fc]

//               px-4
//               py-4

//               sm:px-6
//               sm:py-5
//             "
//           >
//             <div
//               className="
//                 mx-auto
//                 max-w-[1150px]
//               "
//             >

//               <WelcomeText
//                 text={welcomeText}
//               />


//               <div
//                 className="
//                   mx-auto
//                   mt-4
//                   max-w-[500px]

//                   rounded-2xl

//                   border
//                   border-slate-200

//                   bg-white

//                   p-5

//                   text-center

//                   shadow-[0_5px_20px_rgba(15,23,42,0.05)]
//                 "
//               >

//                 <PackageCheck
//                   size={28}
//                   className="
//                     mx-auto
//                     text-indigo-600
//                   "
//                 />


//                 <h3
//                   className="
//                     mt-2

//                     text-[16px]
//                     font-extrabold
//                     text-slate-950
//                   "
//                 >
//                   School Kit Coming Soon
//                 </h3>


//                 <p
//                   className="
//                     mt-1

//                     text-[12px]
//                     text-slate-500
//                   "
//                 >
//                   Your class kit has not been assigned yet.
//                 </p>

//               </div>

//             </div>
//           </section>
//         )}


//       {/* =====================================================
//           AFTER KIT PURCHASE

//           NEW REQUIREMENT:

//           Heading:
//           Select Your Product and Order Uniform

//           Below:
//           ONLY CLASS NAME CARD

//           NO:
//           - Your Class
//           - Product Count
//           - View Products
//           - Bag Icon

//           Entire card is clickable.
//       ====================================================== */}

//       {student &&
//         kitPurchased && (

//           <section
//             className="
//               bg-[#f7f9fc]

//               px-4
//               py-5

//               sm:px-6
//               sm:py-7

//               md:px-8
//               md:py-8
//             "
//           >

//             <div
//               className="
//                 mx-auto
//                 max-w-[1150px]
//               "
//             >

//               {/* =================================================
//                   WELCOME
//               ================================================== */}

//               <WelcomeText
//                 text={welcomeText}
//               />


//               {/* =================================================
//                   HEADING
//               ================================================== */}

//               <div
//                 className="
//                   mx-auto

//                   mt-6

//                   max-w-[850px]

//                   text-center
//                 "
//               >

//                 <h2
//                   className="
//                     text-[21px]
//                     font-extrabold
//                     leading-tight
//                     tracking-tight
//                     text-[#07152D]

//                     sm:text-[26px]

//                     md:text-[29px]
//                   "
//                 >
//                   Select Your Product and Order Uniform
//                 </h2>

//               </div>


//               {/* =================================================
//                   CLASS CARD
//               ================================================== */}

//               <div
//                 className="
//                   mx-auto

//                   mt-6

//                   flex
//                   justify-center
//                 "
//               >

//                 <button
//                   type="button"

//                   onClick={() =>
//                     navigate(
//                       "/class-products"
//                     )
//                   }

//                   className="
//                     group

//                     flex

//                     min-h-[82px]
//                     w-full
//                     max-w-[300px]

//                     items-center
//                     justify-center

//                     rounded-xl

//                     border
//                     border-indigo-200

//                     bg-white

//                     px-6
//                     py-4

//                     text-center

//                     shadow-[0_3px_8px_rgba(15,23,42,0.07)]

//                     transition-all
//                     duration-300

//                     hover:-translate-y-1
//                     hover:border-indigo-500

//                     hover:shadow-[0_10px_25px_rgba(79,57,246,0.12)]

//                     active:scale-[0.98]

//                     sm:min-h-[86px]
//                     sm:max-w-[280px]

//                     md:min-h-[88px]
//                     md:max-w-[300px]
//                   "
//                 >

//                   {/* ONLY CLASS NAME */}

//                   <span
//                     className="
//                       text-[14px]
//                       font-extrabold
//                       text-indigo-600

//                       underline
//                       decoration-indigo-300
//                       decoration-1
//                       underline-offset-4

//                       transition-colors
//                       duration-300

//                       group-hover:text-indigo-700

//                       sm:text-[22px]

//                       md:text-[28px]
//                     "
//                   >
//                     {student.className}
//                   </span>

//                 </button>

//               </div>

//             </div>

//           </section>
//         )}


//       {/* =====================================================
//           KIT DRAWER
//       ====================================================== */}

//       <KitDrawer
//         open={kitOpen}
//         onClose={() =>
//           setKitOpen(false)
//         }
//       />


//       {/* =====================================================
//           WELCOME ANIMATION
//       ====================================================== */}

//       <style>
//         {`
//           @keyframes welcomeLetter {
//             0% {
//               opacity: 0;
//               transform: translate(-12px, -15px);
//             }

//             65% {
//               opacity: 1;
//               transform: translate(2px, 2px);
//             }

//             100% {
//               opacity: 1;
//               transform: translate(0, 0);
//             }
//           }
//         `}
//       </style>

//     </main>
//   );
// }


// /* =========================================================
//    REUSABLE WELCOME
// ========================================================= */

// function WelcomeText({
//   text,
// }) {
//   return (
//     <div
//       className="
//         flex
//         min-h-[28px]
//         items-center
//         overflow-hidden
//       "
//     >

//       <p
//         className="
//           flex
//           flex-wrap
//           items-center

//           text-[22px]
//           font-bold
//           leading-6

//           sm:text-[24px]
//         "
//       >

//         {text
//           .split("")
//           .map(
//             (
//               letter,
//               index
//             ) => (

//               <span
//                 key={index}
//                 className={`
//                   inline-block
//                   opacity-0

//                   animate-[welcomeLetter_0.45s_ease-out_forwards]

//                   ${
//                     index >= 8
//                       ? "text-indigo-600"
//                       : "text-slate-700"
//                   }
//                 `}
//                 style={{
//                   animationDelay:
//                     `${index * 0.045}s`,
//                 }}
//               >
//                 {letter === " "
//                   ? "\u00A0"
//                   : letter}
//               </span>

//             )
//           )}

//       </p>

//     </div>
//   );
// }

