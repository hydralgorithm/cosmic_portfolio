# 🌌 Cosmic Portfolio

A modern, responsive portfolio website showcasing Abdul Fattah's work as a passionate developer and tech explorer. Built with React and featuring a stunning cosmic theme with animated stars, smooth transitions, and a beautiful dark/light mode toggle.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🎨 Design & User Experience
- **Cosmic Theme** - Beautiful space-themed design with animated star background
- **Dark/Light Mode** - Seamless theme switching with smooth transitions
- **Fully Responsive** - Optimized for all devices from mobile to desktop
- **Smooth Animations** - Custom CSS animations and hover effects for enhanced UX
- **Modern UI Components** - Built with Radix UI and Lucide React icons

### 📄 Sections
- **Hero Section** - Eye-catching introduction with cosmic gradient text
- **About Section** - Personal introduction with downloadable CV
- **Skills Section** - Interactive skill bars showing proficiency levels in various technologies
- **Projects Section** - Showcase of featured projects with live demos and GitHub links
- **Contact Section** - Functional contact form with toast notifications and social media links
- **Footer** - Clean footer with copyright and additional links

### ⚡ Performance & Tech
- **Lightning Fast** - Powered by Vite for optimal development and build performance
- **Single Page Application** - Fast navigation with React Router
- **Toast Notifications** - User-friendly feedback system using Radix UI Toast
- **SEO Optimized** - Meta tags and proper document structure

## 🚀 Tech Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS 4.1.18
- **Routing:** React Router DOM 7.10.1
- **Icons:** Lucide React 0.561.0 & React Icons 5.5.0
- **UI Components:** Radix UI (Toast)
- **Utilities:** clsx, tailwind-merge, class-variance-authority

## 📁 Project Structure

```
cosmic_portfolio/
├── public/
│   ├── favicon/          # Site favicon
│   ├── cv_file/          # Downloadable CV
│   └── projects/         # Project screenshots
├── src/
│   ├── assets/           # Static assets
│   ├── components/       # React components
│   │   ├── ui/           # UI components (Toast, etc.)
│   │   ├── AboutSection.jsx
│   │   ├── ContactSection.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── SkillsSection.jsx
│   │   ├── StarBackground.jsx
│   │   └── ThemeToggle.jsx
│   ├── hooks/            # Custom React hooks
│   │   └── use-toast.js
│   ├── lib/              # Utility functions
│   │   └── utils.js
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/hydralgorithm/cosmic_portfolio.git
cd cosmic_portfolio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser and visit** `http://localhost:5173`

## 🛠️ Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build for production (outputs to `dist/` folder)
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint for code quality checks


## 🌟 Features in Detail

### ⭐ Animated Star Background
Dynamic star generation based on viewport size with customizable:
- Star count automatically adjusts to screen size
- Multiple size variations (small, medium, large)
- Varying opacity levels for depth effect
- Smooth animation duration

### 🧭 Responsive Navigation
- **Desktop:** Horizontal navigation bar with smooth scroll
- **Mobile:** Hamburger menu with animated overlay
- Scroll-based background blur effect for better readability
- Active section highlighting

### 🌓 Theme Toggle
- Persistent dark/light mode using localStorage
- Smooth color transitions across all components
- Optimized for both accessibility and aesthetics
- Cosmic-themed gradients in both modes

### 📧 Contact Form
- Functional form with validation
- Toast notifications for success/error feedback
- Social media integration (LinkedIn, Instagram, Discord)
- Direct email and phone links



## 👤 Author

**Abdul Fattah (Hydralgorithm)**


## ⭐ Show Your Support

Give a ⭐️ if you like this project and find it helpful!

---

<div align="center">
  <p>© 2025 Abdul Fattah. All rights reserved.</p>
</div>

<p align="center">Made with ❤️ and React</p>
