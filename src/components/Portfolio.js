// src/components/Portfolio.jsx
import React from "react";
import profileImage from "../assets/profile.jpg";
import omiHealthImg from "../assets/omi-health.jpg";
import duAlumniImg from "../assets/du-alumni.jpg";
import ibadanJollofImg from "../assets/ibadan-jollof.jpg";
import raffleDrawImg from "../assets/raffle-draw.jpg";
import {
  Code,
  User,
  Layers,
  Mail,
  Github,
  Linkedin,
  Briefcase,
  Cloud,
  Database,
  Server,
  FileSpreadsheet,
} from "lucide-react";
import { motion } from "framer-motion";

const Portfolio = () => {
  const primary = "#f472b6";
  const primaryDark = "#be185d";
  const accent = "#14b8a6";
  const textDark = "#0f172a";
  const bgLight = "#f9fafb";

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      color: textDark,
      backgroundColor: bgLight,
      margin: 0,
      padding: 0,
    },
    header: {
      padding: "60px 20px",
      textAlign: "center",
      color: "#fff",
    },
    profileImg: {
      width: "150px",
      height: "150px",
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: "20px",
      border: `4px solid ${accent}`,
    },
    name: {
      fontSize: "3em",
      margin: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    },
    tagline: { fontSize: "1.2em", opacity: 0.85, marginTop: "10px" },
    section: { padding: "80px 20px", maxWidth: "1000px", margin: "0 auto" },
    sectionTitle: {
      fontSize: "2em",
      borderBottom: `2px solid ${primary}`,
      paddingBottom: "10px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      color: primaryDark,
    },
    about: { fontSize: "1em", lineHeight: 1.6 },
    skillItem: {
      backgroundColor: "#e0f2fe",
      color: "#0369a1",
      padding: "12px 18px",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    projectCard: {
      backgroundColor: "#fff",
      border: `1px solid #e5e7eb`,
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: `0 4px 12px rgba(59,130,246,0.1)`,
    },
    projectImage: { width: "100%", height: "160px", objectFit: "cover" },
    projectContent: { padding: "20px" },
    projectTitle: {
      fontSize: "1.3em",
      margin: "0 0 10px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      color: primaryDark,
    },
    projectDescription: { fontSize: "0.9em", color: "#4b5563" },
    footer: {
      textAlign: "center",
      padding: "20px",
      fontSize: "0.8em",
      color: "#fff",
    },
  };

  const mobileProjects = [
    {
      title: "OMI-Health",
      img: omiHealthImg,
      desc: "Bilingual healthcare app for Omi-Adio residents in Ibadan.",
      link: "https://expo.dev/artifacts/eas/s8LgczG1J7EgAwLrMLdLno.apk",
    },
  ];
  const webProjects = [
    {
      title: "DU Alumni",
      img: duAlumniImg,
      desc: "Platform that connects Dominion University alumni together.",
      link: "https://du-alumni-steel.vercel.app/",
    },
    {
      title: "Ibadan Jollof",
      img: ibadanJollofImg,
      desc: "Ordering website for Jollof rice only.",
      link: "https://ib-jollof.vercel.app/",
    },
    {
      title: "Simple Raffle Draw",
      img: raffleDrawImg,
      desc: "Website for free and fair raffle draw.",
      link: "https://simple-raffle-draw.vercel.app/",
    },
  ];
  const skills = [
    { name: "JavaScript", icon: Code },
    { name: "React", icon: Layers },
    { name: "Python", icon: Code },
    { name: "React Native", icon: Layers },
    { name: "Firebase", icon: Database },
    { name: "Cloudinary", icon: Cloud },
    { name: "NodeJS", icon: Server },
    { name: "Git", icon: Github },
    { name: "GitHub", icon: Github },
    { name: "Excel", icon: FileSpreadsheet },
  ];

  const containerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const linkHover = {
    whileHover: { scale: 1.1, color: accent },
    transition: { duration: 0.2 },
  };

  return (
    <>
      <style>{`
        .gradient-bg {
          background: linear-gradient(-45deg, ${primary}, ${accent}, ${primaryDark}, ${accent});
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
        }
        .nav {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 30px;
          flex-wrap: wrap;
        }
        .nav-link {
          display: flex;
          align-items: center;
          color: #fff;
          text-decoration: none;
          font-weight: bold;
          gap: 8px;
        }
        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
        }
        @media (max-width: 768px) {
          .nav { gap: 15px; }
          h1 { font-size: 2.5em; }
          .section { padding: 60px 15px; }
        }
        @media (max-width: 480px) {
          .nav { flex-direction: column; }
          h1 { font-size: 2em; }
          .section-title { font-size: 1.5em; }
          .project-image { height: 120px; }
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-footer {
          background: linear-gradient(45deg, ${accent}, ${primaryDark}, ${primary});
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
        }
      `}</style>

      <motion.div
        style={styles.container}
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.header
          className="gradient-bg"
          style={styles.header}
          variants={itemVariants}
        >
          <motion.img
            src={profileImage}
            alt="Profile"
            style={styles.profileImg}
            variants={itemVariants}
          />
          <h1 style={styles.name}>
            <User size={36} /> Olamilekan Adeyanju Ogunyade
          </h1>
          <p style={styles.tagline}>
            Software Engineer | Front-End Developer | Mobile App Developer |
            Currently studying AWS Cloud Computing at ALX
          </p>
          <nav className="nav">
            {[
              { href: "#about", icon: Code, label: "About" },
              { href: "#skills", icon: Layers, label: "Skills" },
              { href: "#projects", icon: Briefcase, label: "Projects" },
              { href: "#contact", icon: Mail, label: "Contact" },
            ].map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                className="nav-link"
                {...linkHover}
              >
                <Icon size={20} /> {label}
              </motion.a>
            ))}
          </nav>
        </motion.header>

        <motion.section
          id="about"
          style={styles.section}
          variants={itemVariants}
        >
          <motion.h2
            style={styles.sectionTitle}
            className="section-title"
            variants={itemVariants}
          >
            <User size={28} /> About Me
          </motion.h2>
          <p style={styles.about}>
            Versatile and committed web & mobile app developer specialising in
            React and React Native with real-world experience building
            user-focused applications for mobile and web. Proficient in
            Firebase, Cloudinary, REST APIs, Expo, and UI/UX principles. built
            production-grade healthcare apps and delivered personal tools like a
            raffle draw system. Eager to contribute to high-impact teams through
            internship or employment.
          </p>
        </motion.section>

        <motion.section
          id="skills"
          style={styles.section}
          variants={itemVariants}
        >
          <motion.h2
            style={styles.sectionTitle}
            className="section-title"
            variants={itemVariants}
          >
            <Code size={28} /> Skills
          </motion.h2>
          <div className="skills-list">
            {skills.map(({ name, icon: Icon }) => (
              <motion.span key={name} style={styles.skillItem} {...linkHover}>
                <Icon size={16} /> {name}
              </motion.span>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="projects"
          style={styles.section}
          variants={itemVariants}
        >
          <motion.h2
            style={styles.sectionTitle}
            className="section-title"
            variants={itemVariants}
          >
            <Briefcase size={28} /> Projects
          </motion.h2>

          <div style={styles.subsection}>
            <motion.h3 style={styles.subsectionTitle} variants={itemVariants}>
              Mobile
            </motion.h3>
            <div className="projects-grid">
              {mobileProjects.map((proj) => (
                <motion.a
                  key={proj.title}
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                  variants={itemVariants}
                >
                  <div style={styles.projectCard}>
                    <img
                      src={proj.img}
                      alt={proj.title}
                      className="project-image"
                      style={styles.projectImage}
                    />
                    <div style={styles.projectContent}>
                      <h3 style={styles.projectTitle}>
                        <Briefcase size={20} /> {proj.title}
                      </h3>
                      <p style={styles.projectDescription}>{proj.desc}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <div style={styles.subsection}>
            <motion.h3 style={styles.subsectionTitle} variants={itemVariants}>
              Web
            </motion.h3>
            <div className="projects-grid">
              {webProjects.map((proj) => (
                <motion.a
                  key={proj.title}
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                  variants={itemVariants}
                >
                  <div style={styles.projectCard}>
                    <img
                      src={proj.img}
                      alt={proj.title}
                      className="project-image"
                      style={styles.projectImage}
                    />
                    <div style={styles.projectContent}>
                      <h3 style={styles.projectTitle}>
                        <Briefcase size={20} /> {proj.title}
                      </h3>
                      <p style={styles.projectDescription}>{proj.desc}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          style={styles.section}
          variants={itemVariants}
        >
          <motion.h2
            style={styles.sectionTitle}
            className="section-title"
            variants={itemVariants}
          >
            <Mail size={28} /> Contact
          </motion.h2>
          <ul
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              padding: 0,
            }}
          >
            <motion.li style={styles.projectContent} {...linkHover}>
              <a
                href="mailto:adeyanjuolamilekan080@gmail.com"
                aria-label="Email"
              >
                <Mail size={32} />
              </a>
            </motion.li>
            <motion.li style={styles.projectContent} {...linkHover}>
              <a
                href="https://www.linkedin.com/in/ogunyade-olamilekan-91807223a/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={32} />
              </a>
            </motion.li>
            <motion.li style={styles.projectContent} {...linkHover}>
              <a
                href="https://github.com/Ade-yanju"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={32} />
              </a>
            </motion.li>
          </ul>
        </motion.section>

        <motion.footer
          className="gradient-footer"
          style={styles.footer}
          variants={itemVariants}
        >
          &copy; {new Date().getFullYear()} Olamilekan Adeyanju Ogunyade. All
          Rights Reserved.
        </motion.footer>
      </motion.div>
    </>
  );
};

export default Portfolio;
