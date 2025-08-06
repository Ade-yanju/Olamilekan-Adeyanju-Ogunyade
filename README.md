# Personal Portfolio

A responsive, animated single-page portfolio built with React, Framer Motion, and Lucide icons. Showcases your bio, skills, projects (mobile & web), and contact links, with a smoothly-animated gradient header/footer and fully responsive layout.

---

## 📦 Features

- **React** functional components & hooks
- **Framer Motion** for staggered fade-in animations & hover effects
- **Lucide-React** SVG icon library
- **CSS-in-JS** with inline styles + embedded `<style>` for responsive/grid layouts
- **Gradient background** animations using CSS `@keyframes`
- **Responsive** across desktop, tablet, and mobile breakpoints
- **Project cards** link out to live demos
- **Contact icons** open mail, LinkedIn, and GitHub in new tabs

---

## 🚀 Getting Started

### Prerequisites

- [Node.js ≥14.x](https://nodejs.org)
- [npm ≥6.x](https://npmjs.com) or [Yarn ≥1.x](https://yarnpkg.com)

### Installation

1. **Clone** this repo
   bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
2. Install dependencies
   npm install

   # or

   yarn install

3. Add your assets
   Place your images in src/assets/ using these filenames (or update imports accordingly):

   profile.jpg

   omi-health.jpg

   du-alumni.jpg

   ibadan-jollof.jpg

   raffle-draw.jpg

4. Run locally
   npm start
   # or
   yarn start

🗂 Project Structure
portfolio/
├── public/
│ └── index.html
├── src/
│ ├── assets/
│ │ ├── profile.jpg
│ │ ├── omi-health.jpg
│ │ ├── du-alumni.jpg
│ │ ├── ibadan-jollof.jpg
│ │ └── raffle-draw.jpg
│ ├── components/
│ │ └── Portfolio.jsx
│ ├── App.js
│ └── index.js
├── package.json
└── README.md

Portfolio.jsx
Main single-page component. Defines all sections (About, Skills, Projects, Contact) with inline styles, CSS keyframes, and Framer Motion animations.

App.js
Entry point that renders <Portfolio />.

index.js
Bootstraps React into #root.

⚙️ Customization
Colors
Edit the primary, primaryDark, accent, textDark, and bgLight hex values at the top of Portfolio.jsx.

Content

Change your name, tagline, and About Me text in the header/about section.

Update the skills array for your technology stack.

Add/remove projects by modifying mobileProjects and webProjects arrays: give each a title, img import, desc, and link.

Icons
Swap any Lucide icons by importing other names from lucide-react.

🖥️ Deployment
Build for production and deploy to any static‐hosting service (Netlify, Vercel, GitHub Pages, etc.):

bash
Copy
Edit
npm run build

# or

yarn build
Host the contents of the generated build/ folder.

🙏 Contributing
Feel free to open issues or pull requests for improvements—animations, accessibility, performance, you name it!

📄 License
This project is open-source under the MIT License.
