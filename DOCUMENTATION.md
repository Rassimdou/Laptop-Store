# LaptopHub - Complete Website Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture](#architecture)
4. [Features](#features)
5. [API Endpoints](#api-endpoints)
6. [Database Models](#database-models)
7. [Authentication & Authorization](#authentication--authorization)
8. [Frontend Components](#frontend-components)
9. [Admin Features](#admin-features)
10. [User Features](#user-features)
11. [Security Features](#security-features)
12. [Installation & Setup](#installation--setup)
13. [File Structure](#file-structure)

## Project Overview

**LaptopHub** is a full-stack e-commerce website specializing in laptop sales. The platform provides a comprehensive solution for browsing, purchasing, and managing laptop products with both customer and administrative interfaces.

**Project Name**: LaptopHub (Laptopiha)
**Version**: 0.0.0
**Type**: Full-stack web application

## Technology Stack

### Frontend
- **React 19.0.0** - Modern React with hooks
- **Vite 6.3.3** - Build tool and development server
- **React Router DOM 7.5.2** - Client-side routing
- **Tailwind CSS 4.1.4** - Utility-first CSS framework
- **Framer Motion 12.23.12** - Animation library
- **Axios 1.11.0** - HTTP client for API calls
- **Lucide React 0.503.0** - Icon library
- **Recharts 2.15.3** - Chart components for analytics
- **React Day Picker 9.7.0** - Date picker component

### Backend
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.17.0** - MongoDB object modeling
- **JWT (jsonwebtoken 9.0.2)** - Authentication tokens
- **bcrypt 6.0.0** - Password hashing
- **Cookie Parser 1.4.7** - Cookie parsing middleware
- **CORS 2.8.5** - Cross-origin resource sharing
- **Helmet 8.1.0** - Security headers
- **Express Rate Limit 6.8.0** - Rate limiting
- **Express Mongo Sanitize 2.2.0** - MongoDB injection protection
- **XSS Clean 0.1.4** - XSS protection
- **HPP 0.2.3** - HTTP Parameter Pollution protection

## Architecture

The application follows a **client-server architecture** with:

- **Frontend**: Single Page Application (SPA) built with React
- **Backend**: RESTful API built with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based with role-based access control
- **Security**: Multiple security middleware layers

## Features

### Core E-commerce Features
1. **Product Catalog**
   - Browse all available laptops
   - View product details with images, descriptions, and specifications
   - Search products by name or model
   - Filter products by model type
   - Sort products by price, rating, or name
   - Price range filtering
   - Grid and list view modes

2. **Shopping Cart System**
   - Add products to cart
   - Adjust quantities
   - Remove items
   - Real-time price calculation
   - Stock validation

3. **Order Management**
   - Place orders with delivery information
   - Algerian wilaya (province) selection
   - Address input with notes
   - Order status tracking
   - Order history for users

4. **User Authentication**
   - User registration with validation
   - User login/logout
   - JWT token-based authentication
   - Role-based access control (User/Admin)
   - Secure password storage with bcrypt

### Admin Features
1. **Product Management**
   - Add new products
   - Edit existing products
   - Delete products
   - Manage product stock
   - Update product availability

2. **Order Management**
   - View all orders
   - Update order statuses (pending, confirmed, shipped, completed, cancelled)
   - View order details
   - Track order progress

3. **Customer Management**
   - View all registered customers
   - Customer information display

4. **Analytics Dashboard**
   - Total revenue tracking
   - Total orders count
   - Total customers count
   - Sales data visualization
   - Top-selling products

### User Features
1. **Personal Account**
   - View order history
   - Track current orders
   - Update personal information

2. **Shopping Experience**
   - Responsive design for all devices
   - Modern UI with dark theme
   - Smooth animations and transitions
   - Intuitive navigation

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User authentication
- `POST /logout` - User logout

### Product Routes (`/api/products`)
- `GET /` - Get all products
- `GET /filter` - Filter products by model
- `GET /latest` - Get latest products (4 most recent)
- `GET /:id` - Get product by ID
- `POST /` - Add new product (Admin only)
- `PUT /:id` - Update product (Admin only)
- `DELETE /:id` - Delete product (Admin only)

### Order Routes (`/api/orders`)
- `POST /` - Create new order (Authenticated users)
- `GET /my-orders` - Get user's orders (Authenticated users)
- `GET /` - Get all orders (Admin only)
- `GET /analytics` - Get order analytics (Admin only)
- `GET /:id` - Get order by ID (Admin only)
- `PATCH /:id/status` - Update order status (Admin only)

### Client Routes (`/api/clients`)
- `GET /` - Get all clients (Admin only)

### Analytics Routes (`/api/analytics`)
- `GET /total-amount` - Get total revenue (Admin only)
- `GET /total-orders` - Get total orders count (Admin only)
- `GET /total-users` - Get total users count (Admin only)

## Database Models

### Product Schema
```javascript
{
  name: String (required),
  model: String (required),
  description: String (required),
  price: Number (required),
  stock: Number (default: 0),
  imageUrl: String (required),
  available: Boolean (default: true),
  createdAt: Date (default: Date.now)
}
```

### Order Schema
```javascript
{
  clientId: ObjectId (ref: 'Client', required),
  products: [{
    productId: ObjectId (ref: 'Product', required),
    quantity: Number (required, min: 1)
  }],
  totalAmount: Number (required),
  status: String (enum: ['pending', 'confirmed', 'shipped', 'completed', 'cancelled']),
  wilaya: String (required),
  address: String (required),
  notes: String (default: ''),
  createdAt: Date (default: Date.now)
}
```

### Client Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required, unique),
  password: String (required),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date (default: Date.now)
}
```

## Authentication & Authorization

### JWT Token System
- **Token Expiration**: 24 hours
- **Storage**: HTTP-only cookies for security
- **Verification**: Middleware-based token validation

### Role-Based Access Control
- **User Role**: Can browse products, place orders, view own orders
- **Admin Role**: Full access to all features including product management, order management, and analytics

### Security Middleware
- **Authentication Middleware**: Verifies JWT tokens
- **Admin Middleware**: Ensures admin privileges
- **Rate Limiting**: Prevents abuse
- **Input Sanitization**: Protects against injection attacks
- **XSS Protection**: Prevents cross-site scripting
- **CORS Configuration**: Secure cross-origin requests

## Frontend Components

### Layout Components
- **Header**: Navigation bar with user menu and mobile responsiveness
- **Footer**: Site footer with links and information

### UI Components
- **Button**: Reusable button component with variants
- **Card**: Product and content display cards
- **Input**: Form input fields
- **Badge**: Status and category indicators
- **Select**: Dropdown selection components
- **Slider**: Price range filtering
- **Checkbox**: Form checkboxes
- **Textarea**: Multi-line text input

### Page Components
- **HomePage**: Landing page with featured products and navigation
- **ProductsPage**: Product catalog with filtering and search
- **ProductDetailPage**: Individual product information
- **CartPage**: Shopping cart and checkout
- **LoginPage**: User authentication
- **RegisterPage**: User registration
- **MyOrdersPage**: User order history
- **AboutPage**: Company information and features

### Admin Components
- **AdminPage**: Main admin dashboard
- **TabNavigation**: Admin section navigation
- **ProductsTab**: Product management interface
- **OrdersTab**: Order management interface
- **CustomersTab**: Customer management interface
- **AnalyticsTab**: Sales analytics dashboard
- **OrderDetailModal**: Detailed order view modal

## Admin Features

### Product Management
- **Add Products**: Form-based product creation with validation
- **Edit Products**: Update existing product information
- **Delete Products**: Remove products from catalog
- **Stock Management**: Track and update inventory levels

### Order Management
- **Order Overview**: View all orders with status tracking
- **Status Updates**: Change order status through workflow
- **Order Details**: Comprehensive order information display
- **Customer Information**: View customer details for each order

### Analytics Dashboard
- **Revenue Tracking**: Total sales revenue display
- **Order Statistics**: Total orders count
- **Customer Metrics**: Total registered users
- **Data Visualization**: Charts and metrics display

### Customer Management
- **User List**: View all registered customers
- **Customer Details**: Access customer information
- **Role Management**: View user roles and permissions

## User Features

### Shopping Experience
- **Product Browsing**: Intuitive product catalog navigation
- **Search & Filter**: Find products quickly with multiple filter options
- **Product Details**: Comprehensive product information and images
- **Responsive Design**: Mobile-first responsive interface

### Account Management
- **User Registration**: Simple account creation process
- **Secure Login**: JWT-based authentication
- **Order History**: Track all previous orders
- **Profile Management**: Update personal information

### Cart & Checkout
- **Shopping Cart**: Add, remove, and modify items
- **Quantity Management**: Adjust product quantities
- **Price Calculation**: Real-time total calculation
- **Checkout Process**: Complete order placement with delivery details

## Security Features

### Authentication Security
- **Password Hashing**: bcrypt-based password encryption
- **JWT Tokens**: Secure token-based authentication
- **HTTP-Only Cookies**: Secure token storage
- **Token Expiration**: Automatic token invalidation

### API Security
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Sanitize all user inputs
- **MongoDB Injection Protection**: Prevent database injection attacks
- **XSS Protection**: Cross-site scripting prevention
- **CORS Configuration**: Secure cross-origin requests
- **Helmet Security**: Security headers implementation

### Data Protection
- **Environment Variables**: Secure configuration management
- **Database Sanitization**: Input sanitization for database queries
- **Role-Based Access**: Strict permission controls
- **Secure Headers**: HTTP security headers implementation

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB database
- npm or yarn package manager

### Backend Setup
1. Navigate to backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create `.env` file with required environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```
4. Start the server: `npm run dev`

### Frontend Setup
1. Navigate to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

### Environment Variables
- **MONGODB_URI**: MongoDB connection string
- **JWT_SECRET**: Secret key for JWT token signing
- **PORT**: Backend server port (default: 5000)
- **CLIENT_URL**: Frontend application URL
- **NODE_ENV**: Environment mode (development/production)

## File Structure

```
Laptop-Store/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── claudinary.js
│   ├── controllers/
│   │   ├── analyticsController.js
│   │   ├── authController.js
│   │   ├── ClientController.js
│   │   ├── orderController.js
│   │   └── ProductController.js
│   ├── middleware/
│   │   ├── adminAuth.js
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Client.js
│   │   ├── Order.js
│   │   └── Product.js
│   ├── routes/
│   │   ├── analyticsRoute.js
│   │   ├── authRoute.js
│   │   ├── clientRoute.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   ├── scripts/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── ui/
│   │   │       ├── badge.jsx
│   │   │       ├── button.jsx
│   │   │       ├── card.jsx
│   │   │       ├── checkbox.jsx
│   │   │       ├── input.jsx
│   │   │       ├── label.jsx
│   │   │       ├── select.jsx
│   │   │       ├── slider.jsx
│   │   │       └── textarea.jsx
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   ├── AdminPage.jsx
│   │   │   │   ├── AnalytcsTab.jsx
│   │   │   │   ├── CustomersTab.jsx
│   │   │   │   ├── OrderDetailModal.jsx
│   │   │   │   ├── OrdersTab.jsx
│   │   │   │   ├── ProductsTab.jsx
│   │   │   │   ├── StatsCards.jsx
│   │   │   │   └── TabNavigation.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── MyOrdersPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── postcss.config.js
└── package.json
```

## Summary

LaptopHub is a comprehensive e-commerce platform that provides:

- **Complete Product Management**: Full CRUD operations for laptop products
- **Advanced Order System**: Complete order lifecycle management
- **User Authentication**: Secure JWT-based authentication system
- **Admin Dashboard**: Comprehensive administrative interface
- **Analytics & Reporting**: Sales and performance metrics
- **Responsive Design**: Mobile-first responsive user interface
- **Security Features**: Multiple layers of security protection
- **Modern Tech Stack**: Built with latest React and Node.js technologies

The platform is designed to handle the complete e-commerce workflow from product browsing to order fulfillment, with robust administrative tools for business management and analytics. 