# React Practice Challenges

A collection of hands-on React exercises designed to strengthen your understanding of hooks, state management, and component patterns.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwindcss&logoColor=white)
![TanStack Router](https://img.shields.io/badge/TanStack_Router-1-FF4154?logo=reactrouter&logoColor=white)

## 🎯 Overview

This project contains **9 progressive React challenges** that cover fundamental to advanced concepts. Each challenge is self-contained with its own component, route page, and learning objectives.

## 📚 Challenges

| # | Challenge | Difficulty | Concepts Covered |
|---|-----------|------------|------------------|
| 1 | 🔢 **Counter** | Beginner | useState, Event Handling |
| 2 | 🌓 **Toggle Theme** | Beginner | useState, Conditional Styling |
| 3 | 📝 **Controlled Input** | Beginner | useState, Controlled Components |
| 4 | 🪟 **Modal** | Beginner | Custom Hooks, Conditional Rendering, ARIA |
| 5 | ✅ **Todo List** | Intermediate | useState, useMemo, Array Methods |
| 6 | 🔍 **Search Filter** | Intermediate | useState, useMemo, Filtering |
| 7 | ⏱️ **Timer** | Intermediate | useState, useEffect, useRef |
| 8 | 📐 **Window Resizer** | Intermediate | useState, useEffect, Event Listeners |
| 9 | 👥 **Fetch Users** | Advanced | useState, useEffect, Async/Await, AbortController |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/basupatil1213/react-challenges.git

# Navigate to project directory
cd react-challenges

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── challenges/          # Challenge component implementations
│   ├── Counter.jsx
│   ├── ToggleTheme.jsx
│   ├── ControlledInput.jsx
│   ├── Modal.jsx
│   ├── TodoList.jsx
│   ├── Search.jsx
│   ├── Timer.jsx
│   ├── WindowResizer.jsx
│   └── FetchUsers.jsx
├── data/
│   └── challenges.js    # Centralized challenge metadata
├── hooks/
│   └── use-toggle.js    # Custom hooks
├── routes/
│   ├── __root.jsx       # Root layout with navigation
│   ├── index.jsx        # Home page
│   └── challenges/      # Challenge route pages
│       ├── index.jsx    # Challenges list page
│       ├── counter.jsx
│       ├── toggle-theme.jsx
│       ├── controlled-input.jsx
│       ├── modal.jsx
│       ├── todo-list.jsx
│       ├── search.jsx
│       ├── timer.jsx
│       ├── window-resizer.jsx
│       └── fetch-users.jsx
└── assets/              # Static assets
```

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TanStack Router** - Type-safe file-based routing
- **Tailwind CSS** - Utility-first styling
- **ESLint** - Code linting

## 📖 Learning Path

### Beginner Challenges
Start here to learn React fundamentals:
1. **Counter** - Learn useState basics
2. **Toggle Theme** - Practice conditional styling
3. **Controlled Input** - Master form handling
4. **Modal** - Create custom hooks

### Intermediate Challenges
Build on your skills:
5. **Todo List** - Complex state management
6. **Search Filter** - Performance optimization with useMemo
7. **Timer** - useEffect cleanup and useRef
8. **Window Resizer** - Browser event listeners

### Advanced Challenges
Master advanced patterns:
9. **Fetch Users** - Async data fetching with AbortController

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new challenges
- Improve existing implementations
- Fix bugs or typos
- Enhance documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [TanStack Router](https://tanstack.com/router)
- [Tailwind CSS](https://tailwindcss.com)
