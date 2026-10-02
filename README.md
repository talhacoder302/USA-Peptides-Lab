# USA Peptides Lab

A full-stack e-commerce web app for **USA Peptide Lab** ([usapeptidelab.com](https://usapeptidelab.com)) — a storefront for research peptides with a customer account area, cart and checkout, and an admin panel for managing products, pricing/stock, users, and orders.

- **Frontend:** React 19 (Create React App), React Router 7, Tailwind CSS
- **Backend:** Node.js, Express 5, MongoDB (Mongoose), Passport JWT
- **Extras:** Swagger API docs, SendGrid email, Multer file uploads

---

## Features

### Storefront (customers)
- Home page with hero section, peptide categories, and newsletter sign-up
- Peptide catalog, product detail pages, and search results
- Cart and multi-step checkout (information → shipping → billing → order summary)
- Account sign-up by email link (passwordless invite → set password), login/logout, and token refresh
- Customer dashboard: orders, downloads, billing/shipping addresses, account details
- Contact form (forwarded by email), About Us, Privacy Policy, Terms & Conditions, Shipping & Refund pages

### Admin panel (`/admin`)
- Dashboard with charts (Recharts)
- Add, edit, and delete products, including uploads for the product image, certificate, HPLC, and mass-spectrometry reports
- Price and stock management
- User list
- Order management and order status updates (`Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`)

---

## Project structure

```
USA-Peptides-Lab/
├── backend/                  # Express REST API
│   ├── app.js                # Entry point (HTTP server)
│   ├── app-global.js         # Global path aliases (__config, __routes, __controller, ...)
│   ├── swagger.json          # OpenAPI spec served at /api-docs
│   ├── public/uploads/       # Uploaded product images & documents
│   └── src/
│       ├── config/           # Express setup, DB connection, env configs
│       │   └── env/          # core.js + development.json / production.json
│       ├── controller/       # cart, contact, newsletter, order, product, user
│       ├── middelwares/      # Passport JWT auth & admin guard
│       ├── models/           # Mongoose models (User, Product, Cart, Order, ...)
│       ├── routes/           # Route definitions mounted at /api/v1
│       ├── utils/            # JWT helpers, file uploader, SendGrid email
│       └── views/            # EJS templates
└── client/                   # React frontend
    ├── public/
    ├── build/                # Production build (served by the backend)
    └── src/
        ├── admin/            # Admin layout & components
        ├── user/             # Storefront pages & components
        ├── routes/           # UserRoute.jsx, AdminRoute.jsx
        ├── service/          # Axios API client (service.jsx)
        └── utils/            # Auth context, protected routes, alerts
```

---

## Getting started

### Prerequisites
- Node.js 18+ and npm
- A MongoDB database (e.g. MongoDB Atlas)
- A SendGrid account (for sign-up and contact emails)

### 1. Clone and install

```bash
git clone <repo-url>
cd USA-Peptides-Lab

cd backend && npm install
cd ../client && npm install
```

### 2. Configure the backend

Create `backend/.env`:

```env
NODE_ENV=development          # selects src/config/env/<NODE_ENV>.json
PORT=5000

# JWT
JWT_SECRET=your_access_token_secret
JWT_TOKEN_EXP=2h
JWT_REFRESH_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXP=1d

# Email (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=no-reply@yourdomain.com
CONTACT_EMAIL=inbox-for-contact-form@yourdomain.com

# Optional: AWS S3 (only used if the S3 uploader in src/utils/file-uploader.js is enabled)
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=
```

The MongoDB connection is built from `db_config` in `backend/src/config/env/development.json` (or `production.json`):

```json
{
  "port": 5000,
  "db_config": {
    "driver": "mongodb+srv",
    "host": "<cluster-host>",
    "username": "<db-user>",
    "password": "<db-password>",
    "dbName": "<db-name>",
    "options": { "retryWrites": true, "w": "majority" }
  }
}
```

### 3. Configure the frontend

The API base URL is set in [client/src/service/service.jsx](client/src/service/service.jsx):

```js
const BASE_URL = "http://localhost:5000/api/v1";
```

Switch it to your production URL (e.g. `https://usapeptidelab.com/api/v1`) before building for production.

### 4. Run in development

```bash
# Terminal 1 – API on http://localhost:5000
cd backend
npm run dev

# Terminal 2 – React app on http://localhost:3000
cd client
npm start
```

- API base: `http://localhost:5000/api/v1`
- Swagger docs: `http://localhost:5000/api-docs`

### 5. Production build

```bash
cd client
npm run build        # outputs to client/build

cd ../backend
NODE_ENV=production npm start
```

The backend serves the static files from `client/build`.

---

## Scripts

| Location  | Command         | Description                          |
|-----------|-----------------|--------------------------------------|
| `backend` | `npm run dev`   | Start the API with nodemon           |
| `backend` | `npm start`     | Start the API with Node              |
| `client`  | `npm start`     | Start the React dev server           |
| `client`  | `npm run build` | Create a production build            |
| `client`  | `npm test`      | Run the React test runner            |

---

## API overview

All endpoints are prefixed with `/api/v1`. Authenticated routes expect the JWT (set as a cookie on login). Full details are in Swagger at `/api-docs`.

| Area       | Method | Endpoint                         | Auth   |
|------------|--------|----------------------------------|--------|
| Auth       | POST   | `/sendSignupLink`                | –      |
|            | POST   | `/completeSignup/:token/:email`  | –      |
|            | POST   | `/login`                         | –      |
|            | POST   | `/logout`                        | User   |
|            | GET    | `/refreshToken`                  | –      |
| User       | GET    | `/getMe`                         | User   |
|            | PUT    | `/updateUserProfile`             | User   |
|            | PUT    | `/updateUserAddress`             | User   |
|            | GET    | `/getAllUsers`                   | Admin  |
| Products   | GET    | `/productList`                   | –      |
|            | GET    | `/getProductById/:id`            | –      |
|            | GET    | `/productSummary`                | –      |
|            | POST   | `/addProduct` (multipart)        | –*     |
|            | PUT    | `/updateProduct/:id` (multipart) | –*     |
|            | PATCH  | `/updatePriceStock/:id`          | –*     |
|            | DELETE | `/deleteProduct/:id`             | –*     |
| Cart       | POST   | `/addToCart`                     | User   |
|            | GET    | `/getCart`                       | User   |
|            | PUT    | `/updateCartItem`                | User   |
|            | DELETE | `/removeCart/:productId`         | User   |
|            | DELETE | `/clearCart`                     | User   |
| Orders     | POST   | `/createOrder`                   | User   |
|            | GET    | `/myOrders`                      | User   |
|            | PUT    | `/:orderId/status`               | Admin  |
| Contact    | POST   | `/contact`                       | –      |
| Newsletter | POST   | `/newsletter`                    | –      |

\* Product management routes are intended for admins, but the auth middleware is currently commented out in [backend/src/routes/product.js](backend/src/routes/product.js).

Product uploads accept `jpg`, `png`, `webp`, and `pdf` in the fields `file`, `certificate`, `hplc`, and `massSpectrometry`.

---

## Deployment notes

- Allowed CORS origins are listed in [backend/src/config/express.js](backend/src/config/express.js) (`localhost:3000`, the EC2 IP, and `usapeptidelab.com`). Add any new domain there.
- The sign-up email link and newsletter email links are hardcoded to `http://localhost:3000` in [backend/src/controller/user.js](backend/src/controller/user.js) and [backend/src/controller/newsletter.js](backend/src/controller/newsletter.js); update them for production.
- Keep secrets (DB credentials, JWT secrets, API keys) out of version control.

---

## Author

**TalhaCoder** — [talha.developments@gmail.com](mailto:talha.developments@gmail.com)
