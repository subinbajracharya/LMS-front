# Library Management System - Frontend

A modern, responsive frontend for a Library Management System built with React 19, Vite, and Redux Toolkit.

## 🚀 Features

- **Modern UI**: Beautiful, responsive interface with Bootstrap 5
- **User Authentication**: Login/Register with email verification
- **Book Catalog**: Browse and search books with filtering options
- **Book Details**: View detailed book information with reviews
- **Borrow Management**: Borrow and return books
- **Review System**: Rate and review books
- **Admin Dashboard**: Manage books, users, and borrows
- **Real-time Feedback**: Toast notifications for actions
- **Redux State Management**: Efficient state handling with Redux Toolkit
- **React Router**: Client-side routing for seamless navigation

## 🛠 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **State Management**: Redux Toolkit with React-Redux
- **Routing**: React Router DOM v7
- **Styling**: Bootstrap 5 with React Bootstrap
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Icons**: React Icons (Lucide, FontAwesome, etc.)
- **Marquee**: React Fast Marquee for animations
- **Linting**: ESLint with React hooks configuration

## 📦 Installation

1. Navigate to the frontend directory:

```bash
cd lms-fe
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open your browser and visit `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗 Project Structure

```
lms-fe/
├── public/
├── src/
│   ├── auth/
│   │   └── Auth.jsx              # Authentication logic
│   ├── components/
│   │   ├── BookCard.jsx          # Book display card
│   │   ├── CarouselBooks.jsx     # Book carousel
│   │   ├── CustomModal.jsx       # Modal component
│   │   ├── HeroSlider.jsx        # Hero section slider
│   │   ├── LoginForm.jsx         # Login form
│   │   ├── RegisterForm.jsx      # Registration form
│   │   ├── forms/
│   │   │   ├── CustomInput.jsx   # Reusable input
│   │   │   └── ReviewForm.jsx    # Review submission
│   │   ├── layouts/
│   │   │   ├── AdminLayout.jsx   # Admin layout wrapper
│   │   │   ├── DefaultLayout.jsx # Default layout wrapper
│   │   │   ├── Footer.jsx        # Footer component
│   │   │   ├── Header.jsx        # Header navigation
│   │   │   └── Sidebar.jsx       # Admin sidebar
│   │   └── stars/
│   │       └── Stars.jsx         # Star rating display
│   ├── context/
│   │   └── userContext.jsx       # User context provider
│   ├── features/
│   │   ├── auth/                 # Authentication slice
│   │   ├── books/                # Books API and slice
│   │   ├── borrow/               # Borrow API and slice
│   │   ├── reviews/              # Reviews API and slice
│   │   └── users/                # Users API and slice
│   ├── hooks/
│   │   └── useForm.js            # Custom form hook
│   ├── pages/
│   │   ├── AddBooks.jsx          # Add new book
│   │   ├── Admins.jsx            # Admin management
│   │   ├── BookDetails.jsx       # Single book view
│   │   ├── Books.jsx             # Books listing
│   │   ├── BooksListing.jsx      # Detailed book listing
│   │   ├── Borrows.jsx           # Borrow management
│   │   ├── Dashboard.jsx         # Admin dashboard
│   │   ├── EditBook.jsx          # Edit book details
│   │   ├── Home.jsx              # Home page
│   │   ├── Login.jsx             # Login page
│   │   ├── Profile.jsx           # User profile
│   │   ├── Register.jsx          # Registration page
│   │   ├── Reviews.jsx           # Reviews page
│   │   ├── Users.jsx             # Users management
│   │   └── VerifyEmail.jsx       # Email verification
│   ├── redux/
│   │   └── store.js              # Redux store configuration
│   ├── utils/
│   │   ├── axiosHelper.js        # Axios configuration
│   │   └── storageFunction.js    # Storage utilities
│   ├── App.css                   # Global styles
│   ├── App.jsx                   # Main App component
│   ├── index.css                 # Index styles
│   └── main.jsx                  # Entry point
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── Dockerfile
└── README.md
```

## 🎨 Key Components

### Layouts

- **DefaultLayout**: Standard layout for public pages
- **AdminLayout**: Layout with sidebar for admin pages

### Forms

- **CustomInput**: Reusable input component with validation
- **LoginForm**: User login with email/password
- **RegisterForm**: New user registration
- **ReviewForm**: Book review submission

### Features

- **BookCard**: Display book cover, title, and rating
- **HeroSlider**: Attractive hero section with animations
- **CarouselBooks**: Scrollable book carousel
- **Stars**: Interactive star rating display

## 🔐 Authentication

The frontend handles authentication using:

- JWT tokens stored in localStorage
- Protected routes with authentication guards
- Automatic token refresh (configurable)
- User context for global auth state

## 🐳 Docker Support

The project includes Docker configuration for deployment:

```bash
# Build the image
docker build -t lms-frontend .

# Run the container
docker run -p 80:80 lms-frontend
```

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop browsers
- Tablets
- Mobile devices

## 🔧 Configuration

### Axios Setup

The API calls are configured in `src/utils/axiosHelper.js`:

- Base URL from environment variable
- Request/response interceptors
- Automatic token attachment

### Redux Store

State management includes:

- Auth slice (user, token, isAuthenticated)
- Books slice (list, details, loading states)
- Borrow slice (records, status)
- Reviews slice (ratings, comments)
- Users slice (admin management)

## 📝 License

ISC

## 👤 Author

Subin Bajracharya

## 🔗 Related Repositories

- **Backend**: [LMS Backend](https://github.com/subinbajracharya/LMS-back)
- **Frontend**: This repository

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
