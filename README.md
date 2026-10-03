# Scholar Store - Frontend Prototype

React + Tailwind CSS frontend-only demo.

## Run
```bash
npm install
npm run dev
```

## Demo admission numbers
- ADM1001 — Class 1
- ADM1002 — Class 2
- ADM1003 — Class 3

## Flow
1. Login using admission number.
2. Student class determines mandatory first kit.
3. Select sizes for size-based items.
4. Add complete kit to cart and checkout.
5. Kit purchase is saved in localStorage per admission number.
6. Individual class-specific products unlock after first kit purchase.

This is a frontend prototype. In production, authentication, class assignment, order history and kit-purchase eligibility should be validated by the backend/database.
