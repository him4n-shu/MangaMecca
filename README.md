# 🎌 MangaMecca - Anime & Manga E-Commerce Platform

A modern, full-stack e-commerce platform specializing in anime and manga merchandise, built with React, Node.js, and MongoDB.

![MangaMecca Banner](https://img.shields.io/badge/MangaMecca-Anime%20E--Commerce-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.0.0-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.0.0-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0.3-47A248?style=flat-square&logo=mongodb)
![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat-square&logo=vite)

## 🌟 Features

### 🛍️ E-Commerce Features
- **Product Catalog**: Browse manga, comics, posters, action figures, and keychains
- **Advanced Filtering**: Filter by category, price, and popularity
- **Search Functionality**: Find products quickly with intelligent search
- **Shopping Cart**: Add, remove, and manage items in cart
- **Wishlist**: Save items for later purchase
- **User Reviews**: Read and write product reviews with ratings
- **Recently Viewed**: Track recently viewed products

### 👤 User Management
- **Authentication**: Secure user registration and login
- **Profile Management**: Update personal information and preferences
- **Order History**: View past orders and track current orders
- **Password Reset**: Secure password recovery system
- **Account Deletion**: User account management

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Dark Theme**: Eye-friendly dark mode interface
- **Smooth Animations**: Framer Motion powered animations
- **Loading States**: Professional loading indicators
- **Image Optimization**: Responsive images with lazy loading
- **Accessibility**: WCAG compliant design

### 🔧 Technical Features
- **JWT Authentication**: Secure token-based authentication
- **Real-time Cart Sync**: Cart synchronization across devices
- **Image Compression**: Optimized image delivery
- **SEO Optimized**: Meta tags and structured data
- **Performance Optimized**: Code splitting and lazy loading
- **Error Handling**: Comprehensive error management

## 🚀 Live Demo

- **Frontend**: [MangaMecca Store](https://your-vercel-url.vercel.app)
- **Backend API**: [API Documentation](https://your-render-url.onrender.com)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control
- **npm** - Package manager

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

### Clone the Repository
```bash
git clone https://github.com/yourusername/mangamecca.git
cd mangamecca
```

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```

## 🎯 Usage

### Development
1. Start both backend and frontend servers
2. Open [http://localhost:3000](http://localhost:3000) in your browser
3. Register a new account or use existing credentials
4. Browse products and test the e-commerce features

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/request-password-reset` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Cart Endpoints
- `GET /api/cart` - Get user cart
- `PUT /api/cart` - Update cart
- `DELETE /api/cart` - Clear cart

### Profile Endpoints
- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update profile
- `DELETE /api/profile` - Delete account

### Reviews Endpoints
- `GET /api/reviews/product/:id` - Get product reviews
- `POST /api/reviews` - Add review
- `DELETE /api/reviews/:id` - Delete review

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy automatically

### Backend (Render)
1. Connect GitHub repository to Render
2. Configure environment variables
3. Set build and start commands
4. Deploy web service

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📁 Project Structure

```
mangamecca/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   │   ├── components/      # React components
│   │   ├── context/         # React context providers
│   │   ├── pages/           # Page components
│   │   └── styles/          # CSS styles
│   ├── package.json
│   └── vercel.json          # Vercel configuration
├── backend/                  # Node.js backend application
│   ├── middleware/          # Express middleware
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── package.json
│   └── render.yaml          # Render configuration
└── README.md
```

## 🎨 Screenshots

### Homepage
![Homepage](screenshots/homepage.png)

### Product Catalog
![Product Catalog](screenshots/catalog.png)

### Shopping Cart
![Shopping Cart](screenshots/cart.png)

### User Profile
![User Profile](screenshots/profile.png)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 🐛 Known Issues

- None currently reported

## 🔮 Roadmap

- [ ] Payment gateway integration (Stripe)
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Order tracking
- [ ] Multi-language support
- [ ] PWA features
- [ ] Social media integration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [Your Portfolio](https://yourportfolio.com)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vercel and Render for hosting services
- MongoDB for the database
- All contributors and supporters

## 📞 Support

If you have any questions or need help:

- Create an issue on GitHub
- Email: your.email@example.com
- Discord: [Join our server](https://discord.gg/your-server)

---

⭐ **Star this repository if you found it helpful!** 