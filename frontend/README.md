# AI-Based Internship Recommendation System

A minimal, clean, and responsive React frontend for an AI-Based Internship Recommendation System. Built with Vite, React Router v6, and mobile-first responsive design.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

4. (Optional) Configure backend API URL:
```bash
echo "VITE_API_URL=http://localhost:4000" > .env
```
By default, the frontend assumes the backend API is running on `http://localhost:4000`.

## 📁 Project Structure

```
src/
  ├── main.jsx              # Entry point with BrowserRouter setup
  ├── App.jsx                # Main app component with Navbar and routes
  ├── App.css                # App-level styles
  │
  ├── router/
  │   └── routes.jsx         # Route definitions
  │
  ├── components/
  │   ├── Navbar.jsx         # Global navigation component
  │   ├── Navbar.css
  │   ├── InternshipCard.jsx # Card component for displaying internships
  │   └── InternshipCard.css
  │
  ├── pages/
  │   ├── Home.jsx           # Landing page
  │   ├── Home.css
  │   ├── Login.jsx          # Login page with role-based redirect
  │   ├── Login.css
  │   ├── Register.jsx       # Registration page
  │   ├── Register.css
  │   ├── StudentDashboard.jsx # Student dashboard with recommended internships
  │   ├── StudentDashboard.css
  │   ├── AdminDashboard.jsx  # Admin dashboard for managing internships
  │   └── AdminDashboard.css
  │
  ├── utils/
  │   └── mockData.js        # Mock internship data
  │
  └── styles/
      └── global.css         # Global base styles
```

## 🧭 How Routing Works

This project uses **React Router v6** with `BrowserRouter`:

1. **BrowserRouter** is set up in `main.jsx` to enable client-side routing
2. **Routes** are defined in `router/routes.jsx` using the `<Routes>` and `<Route>` components
3. **Navigation** is handled using `<Link>` components from `react-router-dom`
4. **Programmatic navigation** (e.g., after login) uses the `useNavigate()` hook

### Available Routes

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/student/dashboard` - Student dashboard with recommended internships
- `/admin/dashboard` - Admin dashboard for managing internships

## 🧪 Testing the Application

### 1. Navigation Between Pages

- Click on any link in the Navbar to navigate between pages
- All navigation uses React Router, so there's no page reload
- The URL in the browser address bar updates accordingly

### 2. Login Redirect Behavior

1. Navigate to `/login`
2. Fill in the email and password fields (any values work - no validation)
3. Select a role from the dropdown:
   - **Student** → redirects to `/student/dashboard`
   - **Admin** → redirects to `/admin/dashboard`
4. Click "Login" to see the redirect in action

### 3. Display of Mock Internships

1. Navigate to `/student/dashboard`
2. You should see 5 internship cards displayed in a responsive grid:
   - Mobile: 1 column
   - Tablet: 2 columns
   - Desktop: 3 columns
3. Each card shows:
   - Internship title
   - Company name
   - Location
   - Description
   - "Apply Now" button (shows alert for now)

### 4. Admin Dashboard

1. Navigate to `/admin/dashboard` (or login as Admin)
2. View the table of all internships
3. Click "Edit" or "Delete" buttons (shows alerts for now - non-functional)

## 🎨 Responsive Design

The application uses a **mobile-first** approach:

- **Mobile (< 768px)**: 
  - Navbar links stack vertically
  - Cards take full width
  - Single column layouts

- **Tablet (≥ 768px)**:
  - Navbar links display horizontally
  - 2-column grid for internship cards
  - Improved spacing and padding

- **Desktop (≥ 1024px)**:
  - 3-column grid for internship cards
  - Maximum content width of 1200px
  - Optimized layouts for larger screens

## 🔧 Technical Details

### Dependencies

- **react**: ^19.2.0
- **react-dom**: ^19.2.0
- **react-router-dom**: ^7.9.6

### Development Tools

- **Vite**: Fast build tool and dev server
- **ESLint**: Code linting

## 🚧 Future Improvements

### 1. Authentication & State Management

- **Context API**: Implement a global auth context to manage user state
- **Protected Routes**: Add route guards to protect admin/student dashboards
- **Persistent Sessions**: Store authentication tokens in localStorage/sessionStorage
- **Real Authentication**: Integrate with a backend API for actual login/register

### 2. Backend Integration

- **API Endpoints**: Replace mock data with real API calls
- **Error Handling**: Add proper error handling for API requests
- **Loading States**: Show loading spinners during API calls
- **Data Fetching**: Use libraries like React Query or SWR for data management

### 3. AI Recommendations

- **Recommendation Engine**: Integrate AI/ML model for personalized recommendations
- **User Profile**: Collect user skills, interests, and preferences
- **Matching Algorithm**: Implement matching logic based on user profile and internship requirements
- **Feedback Loop**: Allow users to rate recommendations to improve the algorithm

### 4. Enhanced Features

- **Search & Filters**: Add search functionality and filters for internships
- **Pagination**: Implement pagination for large lists of internships
- **Form Validation**: Add client-side and server-side validation
- **Toast Notifications**: Replace alerts with toast notifications
- **Dark Mode**: Add theme switching capability
- **Accessibility**: Improve ARIA labels and keyboard navigation

### 5. Code Improvements

- **TypeScript**: Migrate to TypeScript for type safety
- **Testing**: Add unit tests with Jest and React Testing Library
- **Component Library**: Extract reusable components into a shared library
- **State Management**: Consider Redux or Zustand for complex state management

## 📝 Notes

- This is an **MVP (Minimum Viable Product)** - a simple version for quick development
- All authentication is **fake** - no real backend calls are made
- Internship data is **mock data** stored in `utils/mockData.js`
- All buttons (Apply, Edit, Delete) show alerts for now - they're placeholders for future functionality
- The code is structured to be **easy to understand** and **well-commented** for developers

## 🤝 Contributing

This is a starter template. Feel free to extend it with:
- Real backend integration
- AI recommendation engine
- Enhanced UI/UX features
- Testing suite
- Documentation improvements

---

**Built with ❤️ using React + Vite + React Router v6**
