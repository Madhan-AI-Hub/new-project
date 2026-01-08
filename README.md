# Role-Based User Management Dashboard

A modern, production-ready React application featuring comprehensive role-based access control (RBAC), user management, and premium UI/UX design.

![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Material-UI](https://img.shields.io/badge/MUI-5.15-blue)
![Vite](https://img.shields.io/badge/Vite-5.1-purple)

## ✨ Features

### Core Functionality
- 🔐 **Mock Authentication** with role-based login
- 👥 **User Management** with full CRUD operations
- 🎯 **Role-Based Access Control** (Admin, Manager, Viewer)
- 🔍 **Advanced Filtering** - Search, filter by city/role, sort by name/company
- 📱 **Mobile-First Responsive Design**
- 🌓 **Dark/Light Theme** with system preference detection
- 💾 **Session Persistence** via localStorage
- ⚡ **Optimistic Updates** for instant UI feedback

### User Roles & Permissions

| Role    | View Users | Add Users | Edit Users | Delete Users |
|---------|-----------|-----------|------------|--------------|
| Admin   | ✅        | ✅        | ✅         | ✅           |
| Manager | ✅        | ✅        | ✅         | ❌           |
| Viewer  | ✅        | ❌        | ❌         | ❌           |

### UI/UX Highlights
- Premium gradient login page with role selection
- Responsive layout (sidebar drawer on desktop, hamburger menu on mobile)
- Table view (desktop) switches to card view (mobile)
- Debounced search (400ms) for performance
- Skeleton loaders during data fetch
- Empty states and error handling with retry
- Unsaved changes warnings
- Success/error notifications (Snackbars)
- Smooth micro-animations

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

The application will open at `http://localhost:3000`.

## 📖 Usage

### Login
1. Select a role (Admin, Manager, or Viewer)
2. Click "Login to Dashboard"
3. Your session persists across page refreshes

### Managing Users
- **Search**: Type in the search box to filter by name or email (debounced)
- **Filter**: Select city or role from dropdown filters
- **Sort**: Choose sort field (name/company) and order (asc/desc)
- **Add User**: Click "Add User" button (Admin/Manager only)
- **Edit User**: Click user row/card or edit icon (Admin/Manager only)
- **Delete User**: Click delete icon (Admin only)
- **View Details**: Click any user to open details drawer

### Testing Different Roles
Logout and login with different roles to see permission differences:
- **Admin**: Full access to all features
- **Manager**: Can view, add, and edit but cannot delete
- **Viewer**: Read-only access

## 🏗️ Architecture

### Project Structure
```
src/
├── app/
│   ├── providers/          # Context providers (Auth, Users, Theme)
│   └── theme/              # MUI theme configuration
├── components/
│   ├── common/             # Reusable components (Loading, Empty, Error states)
│   ├── layout/             # Layout components (TopBar, SideNav, AppLayout)
│   └── users/              # User management components
├── hooks/                  # Custom hooks (debounce, unsaved changes)
├── pages/                  # Page components (Login, Dashboard)
├── routes/                 # Routing configuration
├── services/               # API services
├── types/                  # TypeScript type definitions
└── utils/                  # Utility functions (permissions, validators, storage)
```

### State Management
- **Context API** for global state (Auth, Users, Theme)
- **localStorage** for persistence (auth session, theme preference)
- **React hooks** for local component state

### Key Design Patterns
- **Provider pattern** for context management
- **Custom hooks** for reusable logic
- **Optimistic updates** for better UX
- **Debouncing** for search performance
- **Memoization** with `useMemo` and `useCallback`
- **Responsive design** with Material-UI breakpoints

## 🎨 Design System

### Color Palette
- **Primary**: `#4F46E5` (Indigo)
- **Secondary**: `#06B6D4` (Cyan)
- **Success**: `#16A34A`
- **Warning**: `#F59E0B`
- **Error**: `#DC2626`

### Typography
- **Font Family**: Inter (Google Fonts)
- Clean hierarchy with proper h1-h6 structure
- 600-700 font weight for headings

### Components
- Custom Material-UI theme with enhanced shadows
- Rounded corners (12px shape, 8px buttons)
- Hover effects and micro-animations
- Premium glassmorphism effects on login page

## 🔧 Technical Stack

- **Frontend Framework**: React 18.2
- **Language**: TypeScript 5.3
- **Build Tool**: Vite 5.1
- **UI Library**: Material-UI (MUI) 5.15
- **Routing**: React Router 6.22
- **HTTP Client**: Axios 1.6
- **Icons**: Material Icons

## 📊 Data Source

Users are fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) and enhanced locally with:
- Random role assignment
- Local unique IDs
- Created/updated timestamps

All CRUD operations are performed in-memory (frontend only).

## 🔐 Security Considerations

This is a **frontend-only demonstration** with mock authentication:
- No real backend or API
- No actual user authentication
- Permissions enforced at UI level only
- Not suitable for production without backend integration

For production use, implement:
- Real authentication with JWT/OAuth
- Backend API with proper authorization
- Database for data persistence
- Input sanitization and validation
- HTTPS and security headers

## 🎯 Assumptions & Trade-offs

### Assumptions
- Frontend-only application (no backend)
- Mock authentication is sufficient
- JSONPlaceholder API is available
- Modern browser support (ES2020+)

### Trade-offs
- **Context API vs Redux**: Chose Context API for simplicity given the scope
- **Frontend-only storage**: All data in memory, lost on refresh (except from API)
- **No real authentication**: Mock login for demonstration purposes
- **No automated tests**: Focused on implementation per requirements

## 🚧 Future Enhancements

- [ ] Add automated tests (Jest, React Testing Library)
- [ ] Implement real backend API
- [ ] Add user avatar uploads
- [ ] Export users to CSV/Excel
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Audit logs for user actions
- [ ] Multi-language support (i18n)

## 📝 License

This project is created for demonstration purposes.

## 👨‍💻 Developer Notes

### Code Quality
- TypeScript strict mode enabled
- No console errors or warnings
- Consistent naming conventions
- Component composition over duplication
- Clear separation of concerns

### Accessibility
- ARIA labels on interactive elements
- Proper heading hierarchy
- Keyboard navigation support
- Focus management in modals/drawers
- High contrast mode compatible

### Performance
- Debounced search input
- Memoized filtered/sorted lists
- Optimized re-renders with `React.memo`
- Lazy loading ready (code splitting)
- Minimal bundle size

---

**Built with ❤️ using React, TypeScript, and Material-UI**
"# new-project" 
