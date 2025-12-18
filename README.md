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

## 🎨 Customization

### 🎨 Theme Colors

The portfolio uses CSS variables for easy theme customization. Edit `src/index.css` to change colors:

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

### 📝 Personal Information

Update the following files with your information:

**Components to Edit:**
- `src/components/HeroSection.jsx` - Your name, title, and introduction
- `src/components/AboutSection.jsx` - Your bio, contact details, and CV link
- `src/components/SkillsSection.jsx` - Your skills and proficiency levels
- `src/components/ProjectsSection.jsx` - Your projects with images and links
- `src/components/ContactSection.jsx` - Contact information and social media links
- `src/components/Footer.jsx` - Copyright and footer links

**Assets to Replace:**
- `public/favicon/` - Your favicon image
- `public/cv_file/` - Your CV/resume PDF
- `public/projects/` - Project screenshots

### 🎯 SEO & Meta Tags

Update meta tags in `index.html`:

```html
<meta name="description" content="Your description" />
<title>Your Name - Portfolio</title>
```

### 🧭 Navigation Items

Modify the `navItems` array in `src/components/Navbar.jsx`:

```javascript
const navItems = [
  {name: "Home", href: "#hero"},
  {name: "About", href: "#about"},
  {name: "Skills", href: "#skills"},
  {name: "Projects", href: "#projects"},
  {name: "Contact", href: "#contact"},
];
```

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

### 🎯 Skills Display
- Interactive progress bars with smooth animations
- Categorized skills (Languages, Frontend, Backend, DevTools, Prototyping)
- Visual proficiency indicators
- Hover effects for enhanced interactivity

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite and configure build settings
5. Click "Deploy"

**Build Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Deploy to Netlify

1. Push your code to GitHub
2. Visit [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Abdul Fattah (Hydralgorithm)**

- 🌐 Portfolio: [Coming Soon]
- 💼 GitHub: [@hydralgorithm](https://github.com/hydralgorithm)
- 📧 Email: hydralgorithm@gmail.com
- 📍 Location: Bengaluru, Karnataka, India

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the lightning-fast build tool
- Tailwind CSS for the utility-first CSS framework
- Radix UI for accessible component primitives
- Lucide React for beautiful icons

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/hydralgorithm/cosmic_portfolio/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Show Your Support

Give a ⭐️ if you like this project and find it helpful!

---

<div align="center">
  <p>Made with ❤️ and ☕ by Abdul Fattah</p>
  <p>© 2025 Abdul Fattah. All rights reserved.</p>
</div>

<p align="center">Made with ❤️ and React</p>
