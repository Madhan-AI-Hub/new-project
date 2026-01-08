This FRD is:

* Mobile-first
* Premium UI & UX
* Production-ready
* Client-shareable
* Strict, unambiguous, and implementation-oriented

---

```md
# Functional Requirements Document (FRD)
## Role-Based User Management Dashboard
**Task No:** Rjs-2  
**Technology:** React 18+, Material UI (MUI v5+)  
**Type:** Frontend-only, Production-grade Web Application  

---

## 1. Purpose & Objective

The purpose of this application is to design and develop a **modern, premium, production-ready Role-Based User Management Dashboard** using **React.js and Material UI**.

The application simulates a real-world enterprise dashboard with:
- Mock authentication
- Role-based access control
- User management features
- High-quality UI/UX
- Mobile-first responsiveness
- Clean, scalable architecture

This application must be **ready to share with a client** without requiring further backend or UI work.

---

## 2. User Roles & Permissions

### 2.1 Predefined Roles
- **Admin**
- **Manager**
- **Viewer**

### 2.2 Role-Based Permissions

| Role    | View Users | Add Users | Edit Users | Delete Users |
|--------|-----------|----------|-----------|-------------|
| Admin  | ✅        | ✅       | ✅        | ✅          |
| Manager| ✅        | ✅       | ✅        | ❌          |
| Viewer | ✅        | ❌       | ❌        | ❌          |

Role enforcement must be applied at:
- UI level (buttons, forms, visibility)
- Route level
- Action level (handlers, guards)

---

## 3. Application Flow (End-User Perspective)

### 3.1 Login Flow (Mock Authentication)

- User lands on a clean, premium login page
- User selects a role (Admin / Manager / Viewer)
- Clicks “Login”
- Authentication state and role are stored in `localStorage`
- User is redirected to the Dashboard
- Session persists across page refresh

---

### 3.2 Global Layout Experience

**Common across all roles**

- Top App Bar:
  - Application title/logo
  - Current role badge
  - Light/Dark theme toggle
  - Logout button

- Side Navigation Drawer:
  - Dashboard
  - Users
  - Future-ready placeholder items

- Main Content Area:
  - User management interface

**Mobile Behavior**
- Drawer collapses into hamburger menu
- User list switches from table to card layout

---

### 3.3 User Dashboard Flow

#### Initial Load
- Skeleton loaders shown while fetching users
- Users fetched from:
```

[https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)

```
- Fetched users are enhanced locally with:
- Role
- Local unique ID
- Created/updated timestamps

---

### 3.4 User Listing Features

- Display users in:
- Paginated MUI Table (Desktop)
- Responsive Card View (Mobile)
- Columns / Fields:
- Name
- Email
- Role
- Company
- City
- Actions (role-based)

---

### 3.5 Search, Filter & Sort

#### Search
- Case-insensitive
- Debounced input (300–500ms)
- Search by name or email

#### Filter
- Filter by:
- City
- Role

#### Sort
- Sort by:
- Name
- Company
- Ascending / Descending

All operations must be optimized and memoized.

---

### 3.6 View & Edit User Flow

- Clicking a user opens:
- Side Drawer (Desktop)
- Full-screen Modal (Mobile)

#### Permissions
- Admin & Manager:
- Editable form
- Viewer:
- Read-only fields

#### Unsaved Changes
- Warn user before closing if changes are unsaved

---

### 3.7 Add User Flow

- “Add User” button visible only to Admin & Manager
- Opens modal form
- Mandatory fields:
- Name
- Email
- Role
- Email validation required
- Optimistic UI update on submit
- Snackbar success feedback

---

### 3.8 Delete User Flow

- Only Admin can delete users
- Confirmation dialog required
- Optimistic UI update
- Snackbar feedback on success

---

### 3.9 Error & Empty States

- Skeleton loaders while loading
- Friendly error UI on API failure
- Retry option
- Empty state UI when no users match filters

---

## 4. Development Flow (Engineering Perspective)

### 4.1 Technical Constraints

- React 18+
- Functional components only
- Hooks-based implementation
- No class components
- Clean, modular structure

---

### 4.2 Project Structure

```

src/
├── app/
│   ├── store / context
│   ├── theme
│
├── components/
│   ├── common
│   ├── layout
│   ├── users
│
├── pages/
│   ├── Login
│   ├── Dashboard
│
├── hooks/
│   ├── useAuth
│   ├── useUsers
│
├── services/
│   ├── api
│
├── utils/
│   ├── permissions
│   ├── validators
│
├── routes/
│   ├── ProtectedRoute
│
└── main.tsx

```

---

### 4.3 State Management

- Use Context API or Redux Toolkit
- Global state for:
  - Auth
  - Users
  - UI preferences (theme)
- Persist auth & theme in localStorage

---

### 4.4 Performance Optimization

- Debounced search
- `useMemo` for derived data
- `useCallback` for handlers
- Memoized components
- Avoid unnecessary re-renders

---

## 5. UI / UX Design System

### 5.1 Design Principles
- Mobile-first
- Clean, minimal, enterprise-grade
- Smooth micro-interactions
- Accessibility-first

---

### 5.2 Color & Theme Palette

#### Primary Palette
- Primary: `#4F46E5` (Indigo)
- Secondary: `#06B6D4` (Cyan)
- Success: `#16A34A`
- Warning: `#F59E0B`
- Error: `#DC2626`

#### Neutral Palette
- Background (Light): `#F9FAFB`
- Background (Dark): `#0F172A`
- Surface: `#FFFFFF`
- Text Primary: `#111827`
- Text Secondary: `#6B7280`

---

### 5.3 Typography
- Font: Inter / Roboto
- Clear hierarchy:
  - Headings
  - Body
  - Caption

---

### 5.4 Dark / Light Mode
- System-aware default
- User-toggleable
- Persisted in localStorage

---

## 6. Accessibility

- ARIA labels
- Keyboard navigation
- Proper focus management
- Color contrast compliance

---

## 7. Testing Strategy

### Unit Tests
- Role permissions
- Reducers / context logic
- Utility functions

### Component Tests
- User table
- Forms
- Role-based UI visibility

---

## 8. Deliverables

- GitHub repository
- Fully functional React application
- README.md with:
  - Setup instructions
  - Architecture overview
  - Assumptions & trade-offs

---


