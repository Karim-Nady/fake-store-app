# Fake Store App

A modern e-commerce application built with React, demonstrating clean architecture, state management, and responsive design.

## 🚀 Features

### Core Features

- ✅ Product listing with sorting and pagination
- ✅ Product detail pages
- ✅ Create new products with form validation
- ✅ Responsive design (mobile & desktop)
- ✅ Error handling and loading states

### Bonus Features

- ✅ Shopping cart with quantity management
- ✅ User authentication (login/logout)
- ✅ Protected routes
- ✅ Persistent state across sessions

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **State Management**: Zustand
- **Routing**: React Router v6
- **Form Handling**: React Hook Form
- **Styling**: Tailwind CSS + `clsx` + `tailwind-merge`
- **Icons**: Lucide React
- **API**: Fake Store API + Modular Service Layer (Axios)

## 📦 Installation
```bash
# Clone the repository
git clone https://github.com/Karim-Nady/fake-store-app.git
cd fake-store-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── common/        # Atomic UI components (Badge, Button, Loaders, Toasts)
│   ├── products/      # Product-specific components (Card, Grid, Filters)
│   ├── cart/          # Cart & Checkout components
│   ├── layout/        # App shell (Header, Footer)
│   └── form/          # Form primitives (Input, Select, TextArea)
├── pages/             # Route-level page components
├── store/             # Global Store (Zustand)
├── services/          # Modular API Layer (Auth, Products, Cart)
├── hooks/             # Custom Logic Hooks
└── utils/             # Formatters & Helpers
```

## 🎨 Design Features

- **Glassmorphism**: Translucent headers and overlays
- **Micro-Interactions**: Hover states, ripple effects, and transitions
- **System Feedback**: Comprehensive loading states (Skeletons) and error handling
- **Semantic Color System**: Centralized design tokens
- **Accessible Components**: Keyboard navigation and focus management

## 🎨 Design Features

- Custom color palette with semantic naming
- Consistent spacing and typography system
- Smooth animations and transitions
- Mobile-first responsive design
- Accessible form inputs with validation
- Professional loading and error states

## 🔐 Authentication

Use these credentials to test authentication:

- **Username**: `mor_2314`
- **Password**: `83r5^_`

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Development Notes

- State persists across page reloads using localStorage
- All forms include proper validation
- API errors are handled gracefully
- Components are built for reusability
- Code follows React best practices

## 🤝 Contributing

This is a technical assessment project. Not open for contributions.

## 📄 License

MIT License

## 👤 Author

**Your Name**

- GitHub: [@Karim-Nady](https://github.com/Karim-Nady)
- LinkedIn: [karim-nady](https://www.linkedin.com/in/karim-nady/)

---

**Built as a Frontend Technical Assessment** 🚀
