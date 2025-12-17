# 🌌 Cosmic Portfolio

A modern, responsive portfolio website built with React, featuring a stunning cosmic theme with animated stars, smooth transitions, and a beautiful dark/light mode toggle.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 🎨 **Cosmic Theme** - Beautiful space-themed design with animated star background
- 🌓 **Dark/Light Mode** - Seamless theme switching with smooth transitions
- 📱 **Fully Responsive** - Optimized for all devices from mobile to desktop
- 🎭 **Smooth Animations** - Custom CSS animations for enhanced user experience
- 🧭 **Single Page Application** - Fast navigation with React Router
- 🎯 **Modern UI Components** - Built with Radix UI and Lucide React icons
- ⚡ **Lightning Fast** - Powered by Vite for optimal performance

## 🚀 Tech Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS 4.1.18
- **Routing:** React Router DOM 7.10.1
- **Icons:** Lucide React
- **UI Components:** Radix UI
- **Utilities:** clsx, tailwind-merge, class-variance-authority

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/hydralgorithm/cosmic_portfolio.git
cd cosmic_portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
cosmic_portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation component with mobile menu
│   │   ├── StarBackground.jsx  # Animated star background
│   │   └── ThemeToggle.jsx     # Dark/light mode toggle
│   ├── pages/
│   │   ├── Home.jsx            # Main landing page
│   │   └── NotFound.jsx        # 404 error page
│   ├── lib/
│   │   └── utils.js            # Utility functions
│   ├── assets/                 # Static assets
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles and theme
├── public/                     # Public assets
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🎨 Customization

### Theme Colors

Edit the CSS variables in `src/index.css` to customize the color scheme:

```css
:root {
  --background: 210 40% 98%;
  --foreground: 222 47% 11%;
  --primary: 250 47% 60%;
  --border: 214 32% 91%;
}

.dark {
  --background: 222 47% 4%;
  --foreground: 213 31% 91%;
  --primary: 250 65% 65%;
  --border: 217 33% 20%;
}
```

### Navigation Items

Modify the `navItems` array in `src/components/Navbar.jsx`:

```javascript
const navItems = [
  {name: "Home", href: "#hero"},
  {name: "About", href: "#about"},
  // Add more items...
];
```

## 🌟 Features in Detail

### Animated Star Background
Dynamic star generation based on viewport size with customizable:
- Star count
- Size variations
- Opacity levels
- Animation duration

### Responsive Navigation
- Desktop: Horizontal navigation bar
- Mobile: Hamburger menu with smooth overlay
- Scroll-based background blur effect

### Theme Toggle
Persistent dark/light mode with smooth transitions across all components.

## 👤 Author

**Hydralgorithm**

- GitHub: [@hydralgorithm](https://github.com/hydralgorithm)
- Repository: [cosmic_portfolio](https://github.com/hydralgorithm/cosmic_portfolio)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/hydralgorithm/cosmic_portfolio/issues).

## ⭐ Show your support

Give a ⭐️ if you like this project!

---

<p align="center">Made with ❤️ and React</p>
