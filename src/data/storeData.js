/* =========================================================
   STUDENTS
========================================================= */

/* =========================================================
   STUDENTS

   FOR NOW: HARDCODED

   LATER:
   This same data will come from backend/admin Excel data.
========================================================= */

export const students = [
  {
    id: 1,
    admissionNo: "ADM1001",
    name: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "9876543210",
    className: "Class 1",
    section: "A",
    school: "Greenwood International School",
  },

  {
    id: 2,
    admissionNo: "ADM1002",
    name: "Ananya Reddy",
    email: "ananya@example.com",
    phone: "9876543211",
    className: "Class 2",
    section: "B",
    school: "Greenwood International School",
  },

  {
    id: 3,
    admissionNo: "ADM1003",
    name: "Rohan Kumar",
    email: "rohan@example.com",
    phone: "9876543212",
    className: "Class 3",
    section: "A",
    school: "Greenwood International School",
  },
];

/* =========================================================
   COMMON IMAGES

   Later replace these URLs with your actual product images.
========================================================= */

const shirtImage =
  "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85";

const pantImage =
  "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85";

const tieImage =
  "https://images.unsplash.com/photo-1589756823695-278bc923f962?auto=format&fit=crop&w=900&q=85";

const socksImage =
  "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=900&q=85";

const kitImage =
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85";


/* =========================================================
   SCHOOL KITS
========================================================= */

export const kits = [

  /* =====================================================
     CLASS 1
  ====================================================== */

  {
    id: "kit-class-1",

    className: "Class 1",

    name: "Class 1 Complete School Kit",

    description:
      "Complete approved uniform and accessories package for Class 1 students.",

    image: kitImage,

    products: [
      {
        id: "shirt-c1",

        name: "School Shirt",

        image: shirtImage,

        hasSize: true,

        sizes: [
          { label: "24", price: 620 },
          { label: "26", price: 640 },
          { label: "28", price: 660 },
          { label: "30", price: 680 },
          { label: "32", price: 700 },
        ],
      },

      {
        id: "pant-c1",

        name: "School Pant",

        image: pantImage,

        hasSize: true,

        sizes: [
          { label: "24", price: 700 },
          { label: "26", price: 720 },
          { label: "28", price: 740 },
          { label: "30", price: 760 },
          { label: "32", price: 780 },
        ],
      },

      {
        id: "tie-c1",

        name: "School Tie",

        image: tieImage,

        hasSize: false,

        price: 180,
      },

      {
        id: "socks-c1",

        name: "School Socks",

        image: socksImage,

        hasSize: true,

        sizes: [
          { label: "S", price: 130 },
          { label: "M", price: 150 },
          { label: "L", price: 170 },
        ],
      },
    ],
  },


  /* =====================================================
     CLASS 2
  ====================================================== */

  {
    id: "kit-class-2",

    className: "Class 2",

    name: "Class 2 Complete School Kit",

    description:
      "Complete approved uniform and accessories package for Class 2 students.",

    image: kitImage,

    products: [
      {
        id: "shirt-c2",

        name: "School Shirt",

        image: shirtImage,

        hasSize: true,

        sizes: [
          { label: "26", price: 650 },
          { label: "28", price: 670 },
          { label: "30", price: 690 },
          { label: "32", price: 710 },
          { label: "34", price: 730 },
        ],
      },

      {
        id: "pant-c2",

        name: "School Pant",

        image: pantImage,

        hasSize: true,

        sizes: [
          { label: "26", price: 750 },
          { label: "28", price: 770 },
          { label: "30", price: 790 },
          { label: "32", price: 810 },
          { label: "34", price: 830 },
        ],
      },

      {
        id: "tie-c2",

        name: "School Tie",

        image: tieImage,

        hasSize: false,

        price: 180,
      },
      

      {
        id: "socks-c2",

        name: "School Socks",

        image: socksImage,

        hasSize: true,

        sizes: [
          { label: "S", price: 140 },
          { label: "M", price: 150 },
          { label: "L", price: 170 },
        ],
      },
    ],
  },


  /* =====================================================
     CLASS 3
  ====================================================== */

  {
    id: "kit-class-3",

    className: "Class 3",

    name: "Class 3 Complete School Kit",

    description:
      "Complete approved uniform and accessories package for Class 3 students.",

    image: kitImage,

    products: [
      {
        id: "shirt-c3",

        name: "School Shirt",

        image: shirtImage,

        hasSize: true,

        sizes: [
          { label: "28", price: 680 },
          { label: "30", price: 700 },
          { label: "32", price: 720 },
          { label: "34", price: 740 },
          { label: "36", price: 760 },
        ],
      },

      {
        id: "pant-c3",

        name: "School Pant",

        image: pantImage,

        hasSize: true,

        sizes: [
          { label: "28", price: 780 },
          { label: "30", price: 800 },
          { label: "32", price: 820 },
          { label: "34", price: 840 },
          { label: "36", price: 860 },
        ],
      },

      {
        id: "tie-c3",

        name: "School Tie",

        image: tieImage,

        hasSize: false,

        price: 180,
      },

      {
        id: "socks-c3",

        name: "School Socks",

        image: socksImage,

        hasSize: true,

        sizes: [
          { label: "S", price: 150 },
          { label: "M", price: 170 },
          { label: "L", price: 190 },
        ],
      },
    ],
  },
];


/* =========================================================
   INDIVIDUAL PRODUCTS

   IMPORTANT:

   Products with sizes:

   sizes: [
     { label: "24", price: 620 },
     { label: "26", price: 640 }
   ]

   First size will automatically be selected on details page.
========================================================= */

export const individualProducts = [

  /* =====================================================
     CLASS 1
  ====================================================== */

  {
    id: "extra-shirt-c1",

    className: "Class 1",

    name: "School Shirt",

    category: "Uniforms",

    sku: "C1-SHIRT-001",

    image: shirtImage,

    description:
      "Comfortable school uniform shirt designed for regular school use.",

    hasSize: true,

    sizes: [
      { label: "24", price: 620 },
      { label: "26", price: 640 },
      { label: "28", price: 660 },
      { label: "30", price: 680 },
      { label: "32", price: 700 },
    ],
  },

  {
    id: "extra-pant-c1",

    className: "Class 1",

    name: "School Pant",

    category: "Uniforms",

    sku: "C1-PANT-001",

    image: pantImage,

    description:
      "Durable school uniform pant designed for everyday comfort and regular use.",

    hasSize: true,

    sizes: [
      { label: "24", price: 700 },
      { label: "26", price: 720 },
      { label: "28", price: 740 },
      { label: "30", price: 760 },
      { label: "32", price: 780 },
    ],
  },

  {
    id: "extra-tie-c1",

    className: "Class 1",

    name: "School Tie",

    category: "Accessories",

    sku: "C1-TIE-001",

    image: tieImage,

    description:
      "School uniform tie suitable for daily school wear.",

    hasSize: false,

    price: 180,
  },

  {
    id: "extra-socks-c1",

    className: "Class 1",

    name: "School Socks",

    category: "Accessories",

    sku: "C1-SOCKS-001",

    image: socksImage,

    description:
      "Comfortable school socks designed for everyday use.",

    hasSize: true,

    sizes: [
      { label: "S", price: 130 },
      { label: "M", price: 150 },
      { label: "L", price: 170 },
    ],
  },


  /* =====================================================
     CLASS 2
  ====================================================== */

  {
    id: "extra-shirt-c2",

    className: "Class 2",

    name: "School Shirt",

    category: "Uniforms",

    sku: "C2-SHIRT-001",

    image: shirtImage,

    description:
      "Comfortable school shirt designed specifically for Class 2 students.",

    hasSize: true,

    sizes: [
      { label: "26", price: 650 },
      { label: "28", price: 670 },
      { label: "30", price: 690 },
      { label: "32", price: 710 },
      { label: "34", price: 730 },
    ],
  },

  {
    id: "extra-pant-c2",

    className: "Class 2",

    name: "School Pant",

    category: "Uniforms",

    sku: "C2-PANT-001",

    image: pantImage,

    description:
      "Class 2 school uniform pant with a comfortable regular fit.",

    hasSize: true,

    sizes: [
      { label: "26", price: 750 },
      { label: "28", price: 770 },
      { label: "30", price: 790 },
      { label: "32", price: 810 },
      { label: "34", price: 830 },
    ],
  },

  {
    id: "extra-tie-c2",

    className: "Class 2",

    name: "School Tie",

    category: "Accessories",

    sku: "C2-TIE-001",

    image: tieImage,

    description:
      "School tie designed to match the approved Class 2 uniform.",

    hasSize: false,

    price: 180,
  },

  {
    id: "extra-socks-c2",

    className: "Class 2",

    name: "School Socks",

    category: "Accessories",

    sku: "C2-SOCKS-001",

    image: socksImage,

    description:
      "Comfortable school socks available in multiple sizes.",

    hasSize: true,

    sizes: [
      { label: "S", price: 140 },
      { label: "M", price: 150 },
      { label: "L", price: 170 },
    ],
  },


  /* =====================================================
     CLASS 3
  ====================================================== */

  {
    id: "extra-shirt-c3",

    className: "Class 3",

    name: "School Shirt",

    category: "Uniforms",

    sku: "C3-SHIRT-001",

    image: shirtImage,

    description:
      "Class 3 school shirt made for comfortable everyday school wear.",

    hasSize: true,

    sizes: [
      { label: "28", price: 680 },
      { label: "30", price: 700 },
      { label: "32", price: 720 },
      { label: "34", price: 740 },
      { label: "36", price: 760 },
    ],
  },

  {
    id: "extra-pant-c3",

    className: "Class 3",

    name: "School Pant",

    category: "Uniforms",

    sku: "C3-PANT-001",

    image: pantImage,

    description:
      "Class 3 school uniform pant with comfortable fit and durable fabric.",

    hasSize: true,

    sizes: [
      { label: "28", price: 780 },
      { label: "30", price: 800 },
      { label: "32", price: 820 },
      { label: "34", price: 840 },
      { label: "36", price: 860 },
    ],
  },

  {
    id: "extra-tie-c3",

    className: "Class 3",

    name: "School Tie",

    category: "Accessories",

    sku: "C3-TIE-001",

    image: tieImage,

    description:
      "Approved school uniform tie for Class 3 students.",

    hasSize: false,

    price: 180,
  },

  {
    id: "extra-socks-c3",

    className: "Class 3",

    name: "School Socks",

    category: "Accessories",

    sku: "C3-SOCKS-001",

    image: socksImage,

    description:
      "Soft and comfortable school socks available in multiple sizes.",

    hasSize: true,

    sizes: [
      { label: "S", price: 150 },
      { label: "M", price: 170 },
      { label: "L", price: 190 },
    ],
  },
];