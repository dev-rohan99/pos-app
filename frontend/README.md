# POS System Frontend

A production-ready, minimal POS (Point of Sale) frontend application built with React, TypeScript, and Ant Design.

## Tech Stack

- **Vite + React** - Fast build tool and UI library
- **TypeScript** - Type-safe development
- **Ant Design** - Enterprise UI components
- **TanStack Query** - Server state management and data fetching
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors
- **JWT Authentication** - Token-based auth stored in localStorage

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppLayout.tsx   # Main layout with sidebar and header
│   ├── ProductForm.tsx # Product create/edit form modal
│   └── ProtectedRoute.tsx # Route guard for authentication
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── pages/              # Page components
│   ├── Login.tsx       # Login page
│   ├── Products.tsx    # Product management with CRUD
│   └── Sales.tsx       # Create sale page
├── services/           # API integration layer
│   ├── api.ts          # Axios instance with interceptors
│   ├── authService.ts  # Authentication API calls
│   ├── productService.ts # Product CRUD operations
│   └── saleService.ts  # Sales operations
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces and types
├── App.tsx             # Root component with routing
└── main.tsx            # Application entry point
```

## Features

### Authentication
- Login page with email and password validation
- JWT token storage in localStorage
- Automatic redirect on 401 responses
- Protected routes requiring authentication

### Product Management
- View all products in a table
- Create new products
- Edit existing products
- Delete products with confirmation
- Real-time data updates with optimistic refetching

### Sales
- Select product from dropdown with search
- View product details and available stock
- Input quantity with validation
- Prevent sales exceeding stock
- Real-time stock updates after successful sale
- Calculate and display total price

## Configuration

Update the `.env` file with your backend API URL:

```
VITE_API_BASE_URL=http://localhost:3000/api
```

## Backend API Requirements

The application expects the following endpoints:

### Authentication
- `POST /auth/login` - Login with email and password
  - Request: `{ email: string, password: string }`
  - Response: `{ access_token: string }`

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `POST /products` - Create product
- `PATCH /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Sales
- `POST /sales` - Create sale
  - Request: `{ productId: number, quantity: number }`

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## API Integration

All API calls include:
- Automatic JWT token injection via Axios interceptor
- Automatic redirect to login on 401 responses
- Centralized error handling
- Type-safe requests and responses

## Code Quality

- Modular architecture with clear separation of concerns
- Reusable components and services
- Type-safe with TypeScript
- Clean, production-ready code
- No mock data - fully integrated with backend
