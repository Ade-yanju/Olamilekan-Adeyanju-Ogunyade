// src/components/Portfolio.js
/* ============================================================
   Part 1/6
   - imports
   - assets
   - Chakra + Framer Motion wrappers
   - global variants
   - animation utilities & helpers
=============================================================== */

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useTheme as useNextTheme } from "next-themes";

/* ---- Assets (raster) ---- */
import profileImage from "../assets/profile.jpg";
import omiHealthImg from "../assets/omi-health.jpg";
import duAlumniImg from "../assets/du-alumni.jpg";
import ibadanJollofImg from "../assets/ibadan-jollof.jpg";
import raffleDrawImg from "../assets/raffle-draw.jpg";
import hillstarImg from "../assets/hillstar.png";
import alxLogo from "../assets/alx-logo.png";
import duLogo from "../assets/du-logo.png";

/* ---- Assets (SVG logos) ---- */
import reactLogo from "../assets/react.svg";
import expoLogo from "../assets/expo.svg";
import firebaseLogo from "../assets/firebase.svg";
import nodeLogo from "../assets/nodejs.svg";
import cloudinaryLogo from "../assets/cloudinary.svg";
import githubLogo from "../assets/github.svg";

/* ---- Chakra UI v3 ---- */
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Link as ChakraLink,
  SimpleGrid,
  Wrap,
  WrapItem,
  HStack,
  VStack,
  Badge,
  Stack,
  chakra,
  IconButton,
} from "@chakra-ui/react";

/* ---- Framer Motion ---- */
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  animate,
  useInView,
} from "framer-motion";

/* ---- Icons ---- */
import {
  Mail,
  Github,
  Linkedin,
  User,
  Code,
  Layers,
  Briefcase,
  Cloud,
  Database,
  Server,
  FileSpreadsheet,
  GraduationCap,
  ChevronRight,
  Sparkles,
  Cpu,
  Rocket,
} from "lucide-react";

/* ---- Color Mode Toggle ---- */
import { ColorModeIconButton } from "../color-mode";

/* ============================================================
   MOTION WRAPPERS
=============================================================== */
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionImage = motion(Image);
const MotionText = motion(Text);

/* ============================================================
   GLOBAL VARIANTS
=============================================================== */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, when: "beforeChildren" },
  },
};

/* ============================================================
   SPLIT TEXT
=============================================================== */
const SplitText = ({ children, delay = 0, duration = 0.04 }) => {
  const letters = Array.from(children?.toString() ?? "");
  return (
    <chakra.span display="inline-block" whiteSpace="pre">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: delay + i * duration }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </chakra.span>
  );
};

/* ============================================================
   REVEAL
=============================================================== */
const Reveal = ({ children, y = 30, once = true }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* ============================================================
   PARTICLES — FIXED (next-themes, no Chakra color mode)
=============================================================== */
const Particles = ({ enabled = true, density = 0.0009 }) => {
  const canvasRef = useRef(null);
  const { theme } = useNextTheme();

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const count = Math.max(20, Math.min(120, Math.floor(w * h * density)));
    const particles = new Array(count).fill(null).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.6,
      a: 0.25 + Math.random() * 0.6,
    }));

    const color =
      theme === "dark" ? "200,160,255" : "60,60,60";

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${color},${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, [enabled, density, theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.25,
      }}
    />
  );
};

/* ================= END OF PART 1 / 6 ================= */
/* ============================================================
   Part 2/6 — Data Arrays + UI Blocks + Advanced TechCube
=============================================================== */

/* ================== DATA ARRAYS ================== */
const MOBILE_PROJECTS = [
  {
    title: "OMI-Health",
    img: omiHealthImg,
    desc: "Bilingual healthcare app for Omi-Adio residents in Ibadan.",
    link: "https://expo.dev/artifacts/eas/s8LgczG1J7EgAwLrMLdLno.apk",
  },
];

const WEB_PROJECTS = [
  {
    title: "DU Alumni",
    img: duAlumniImg,
    desc: "Platform connecting Dominion University alumni.",
    link: "https://du-alumni-steel.vercel.app/",
  },
  {
    title: "Ibadan Jollof",
    img: ibadanJollofImg,
    desc: "Food ordering website for Jollof rice.",
    link: "https://ib-jollof.vercel.app/",
  },
  {
    title: "Simple Raffle Draw",
    img: raffleDrawImg,
    desc: "Fair and transparent raffle draw system.",
    link: "https://simple-raffle-draw.vercel.app/",
  },
  {
    title: "HillStar Real Estate",
    img: hillstarImg,
    desc: "Property listing platform for HillStar.",
    link: "https://hillstar-realestate.vercel.app/",
  },
];

const EDUCATION = [
  {
    org: "ALX Africa",
    program: "AWS Cloud Computing",
    period: "June 2025 – Present",
    status: "Currently studying",
    location: "Remote",
    logo: alxLogo,
  },
  {
    org: "Dominion University, Ibadan",
    program: "B.Sc. Software Engineering",
    period: "2021 – 2025",
    status: "Completed",
    location: "Ibadan, Nigeria",
    logo: duLogo,
  },
  {
    org: "ALX Africa",
    program: "ALX AI Starter",
    period: "May – June 2025",
    status: "Completed",
    location: "Remote",
    logo: alxLogo,
  },
];

const SKILLS = [
  { name: "JavaScript", icon: Code },
  { name: "React", icon: Layers },
  { name: "React Native", icon: Layers },
  { name: "Python", icon: Code },
  { name: "Firebase", icon: Database },
  { name: "Cloudinary", icon: Cloud },
  { name: "NodeJS", icon: Server },
  { name: "Git / GitHub", icon: Github },
  { name: "Excel", icon: FileSpreadsheet },
];

/* ================== SECTION HEADING ================== */
const SectionHeading = ({ icon: Icon, title, kicker }) => (
  <Reveal y={20}>
    <HStack spacing={3} mb={2}>
      <Box as={Icon} size="28" color="pink.500" />
      <Heading size="lg">
        <SplitText>{title}</SplitText>
      </Heading>
    </HStack>
    {kicker && (
      <Text color="gray.600" maxW="2xl" mb={6}>
        {kicker}
      </Text>
    )}
  </Reveal>
);

/* ================== PROJECT CARD ================== */
const ProjectCard = ({ title, img, desc, link }) => (
  <Reveal y={30}>
    <MotionBox
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 220 }}
      bg="white"
      rounded="2xl"
      overflow="hidden"
      shadow="lg"
      border="1px solid"
      borderColor="pink.200"
    >
      <ChakraLink href={link} isExternal _hover={{ textDecoration: "none" }}>
        <MotionImage
          src={img}
          alt={title}
          h="200px"
          w="100%"
          objectFit="cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        <Box p={5}>
          <Heading size="md" mb={2}>
            {title}
          </Heading>
          <Text fontSize="sm" color="gray.600">
            {desc}
          </Text>
          <HStack mt={4} color="pink.500">
            <Sparkles size={16} />
            <Text fontWeight="semibold">View project</Text>
            <ChevronRight size={18} />
          </HStack>
        </Box>
      </ChakraLink>
    </MotionBox>
  </Reveal>
);

/* ================== EDUCATION CARD ================== */
const EducationCard = ({ logo, org, program, period, status, location }) => {
  const color =
    status.toLowerCase().includes("completed") ? "green" : "yellow";

  return (
    <Reveal y={25}>
      <MotionFlex
        whileHover={{ y: -4, scale: 1.02 }}
        bg="white"
        rounded="2xl"
        p={4}
        gap={4}
        align="center"
        shadow="md"
        border="1px solid"
        borderColor="pink.200"
      >
        <Image src={logo} boxSize="60px" rounded="lg" />
        <Box flex="1">
          <Heading size="sm">{org}</Heading>
          <Text fontSize="sm">{program}</Text>
          <HStack mt={2} spacing={3}>
            <Badge colorScheme={color}>{status}</Badge>
            <Text fontSize="sm" color="gray.600">
              {period} • {location}
            </Text>
          </HStack>
        </Box>
      </MotionFlex>
    </Reveal>
  );
};

/* ================== SOCIAL BUTTON ================== */
const SocialButton = ({ href, label, icon }) => (
  <ChakraLink href={href} isExternal>
    <MotionBox whileHover={{ y: -4 }}>
      <Button
        leftIcon={icon}
        rounded="full"
        variant="outline"
        colorScheme="pink"
      >
        {label}
      </Button>
    </MotionBox>
  </ChakraLink>
);

/* ================== TECH CUBE ================== */
const TechCube = ({ title, faces, autoSpeed = 0.25 }) => {
  const rotX = useMotionValue(-20);
  const rotY = useMotionValue(0);

  useEffect(() => {
    let raf;
    const spin = () => {
      rotY.set((rotY.get() + autoSpeed) % 360);
      raf = requestAnimationFrame(spin);
    };
    spin();
    return () => cancelAnimationFrame(raf);
  }, [rotY, autoSpeed]);

  return (
    <Container maxW="6xl" py={16}>
      <Heading textAlign="center" mb={8}>
        {title}
      </Heading>
      <MotionBox
        mx="auto"
        w="360px"
        h="360px"
        perspective="1200px"
        style={{ rotateX: rotX, rotateY: rotY }}
      >
        {faces.map((f, i) => (
          <Box
            key={i}
            position="absolute"
            inset={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            rounded="2xl"
            bg={f.bg}
            transform={`rotateY(${i * 60}deg) translateZ(180px)`}
          >
            <VStack>
              <Image src={f.logo} maxH="80px" />
              <Text fontWeight="bold">{f.label}</Text>
            </VStack>
          </Box>
        ))}
      </MotionBox>
    </Container>
  );
};

/* ================= END OF PART 2 / 6 ================= */
/* ============================================================
   Part 3/6 — Hero Section (Advanced, Stable)
=============================================================== */

/* ================== ANIMATED SEPARATOR ================== */
const AnimatedSeparator = () => (
  <svg
    width="100%"
    height="48"
    viewBox="0 0 1200 48"
    preserveAspectRatio="none"
    aria-hidden
  >
    <path
      d="M0,40 C200,0 400,40 600,24 C800,8 1000,40 1200,20 L1200,48 L0,48 Z"
      fill="url(#grad)"
      opacity="0.08"
    />
    <defs>
      <linearGradient id="grad" x1="0" x2="1">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#14b8a6" />
      </linearGradient>
    </defs>
  </svg>
);

/* ================== HERO SECTION ================== */
const HeroSection = () => {
  const marquee =
    "React • React Native • Firebase • Cloudinary • NodeJS • Expo • UI/UX • REST APIs • Git/GitHub • ";

  return (
    <Box
      as="header"
      position="relative"
      minH="100vh"
      bgGradient="linear(to-br, pink.400, teal.400)"
      overflow="hidden"
    >
      {/* PARTICLES */}
      <Particles enabled density={0.0009} />

      {/* FLOATING BLOBS */}
      <FloatingBlob x="8%" y="12%" size={260} />
      <FloatingBlob x="78%" y="20%" size={200} delay={0.8} />
      <FloatingBlob x="50%" y="70%" size={320} delay={1.2} />

      {/* COLOR MODE TOGGLE */}
      <Box position="fixed" top={4} right={4} zIndex={1000}>
        <Magnetic>
          <ColorModeIconButton />
        </Magnetic>
      </Box>

      <Container maxW="6xl" pt={24} position="relative" zIndex={2}>
        <Parallax factor={24}>
          <VStack spacing={6} textAlign="center">
            {/* PROFILE IMAGE */}
            <MotionImage
              src={profileImage}
              alt="Profile"
              boxSize={{ base: "110px", md: "150px" }}
              rounded="full"
              border="4px solid white"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* NAME */}
            <Reveal>
              <Heading size="2xl" color="white">
                <SplitText delay={0.2}>
                  Olamilekan Adeyanju Ogunyade
                </SplitText>
              </Heading>
            </Reveal>

            {/* TITLE */}
            <Reveal delay={0.4}>
              <Text fontSize="xl" color="whiteAlpha.900" maxW="3xl">
                <SplitText delay={0.6} duration={0.02}>
                  Software Engineer • Frontend Developer • Mobile App Developer
                </SplitText>{" "}
                •{" "}
                <chakra.span fontWeight="bold">
                  <StrokeText>
                    AWS Cloud Computing @ ALX
                  </StrokeText>
                </chakra.span>
              </Text>
            </Reveal>

            {/* NAV BUTTONS */}
            <Reveal delay={0.8}>
              <Wrap justify="center" spacing={4}>
                {[
                  { label: "About", href: "#about", icon: <User size={16} /> },
                  { label: "Skills", href: "#skills", icon: <Code size={16} /> },
                  {
                    label: "Education",
                    href: "#education",
                    icon: <GraduationCap size={16} />,
                  },
                  {
                    label: "Projects",
                    href: "#projects",
                    icon: <Briefcase size={16} />,
                  },
                  {
                    label: "Contact",
                    href: "#contact",
                    icon: <Mail size={16} />,
                  },
                ].map((item, i) => (
                  <WrapItem key={item.label}>
                    <Magnetic strength={0.2}>
                      <Button
                        as="a"
                        href={item.href}
                        leftIcon={item.icon}
                        colorScheme="pink"
                        rounded="full"
                        size="sm"
                      >
                        <SplitText delay={0.9 + i * 0.05}>
                          {item.label}
                        </SplitText>
                      </Button>
                    </Magnetic>
                  </WrapItem>
                ))}
              </Wrap>
            </Reveal>

            {/* MARQUEE */}
            <Reveal delay={1.2}>
              <Box
                w="100%"
                overflow="hidden"
                whiteSpace="nowrap"
                fontWeight="semibold"
                color="whiteAlpha.900"
              >
                <MotionText
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear",
                  }}
                >
                  {marquee.repeat(10)}
                </MotionText>
              </Box>
            </Reveal>
          </VStack>
        </Parallax>
      </Container>

      {/* SEPARATOR */}
      <Box mt={20}>
        <AnimatedSeparator />
      </Box>
    </Box>
  );
};

/* ================= END OF PART 3 / 6 ================= */
/* ============================================================
   Part 4/6 — About • Skills • Education • Cube Switcher
=============================================================== */

/* ================== ABOUT SECTION ================== */
const AboutSection = () => (
  <Box as="section" id="about" py={{ base: 16, md: 24 }}>
    <Container maxW="5xl">
      <SectionHeading
        icon={User}
        title="About Me"
        kicker="Focused on building reliable, performant products with clean UX."
      />

      <Reveal y={30} delay={0.15}>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          lineHeight="tall"
          color="gray.700"
          _dark={{ color: "gray.300" }}
          maxW="3xl"
        >
          I am a versatile software engineer specialising in React and React
          Native, with hands-on experience building user-focused mobile and web
          applications. I work extensively with Firebase, Cloudinary, REST APIs,
          Expo, and modern UI systems. I enjoy turning complex ideas into simple,
          intuitive digital products and contributing to teams that value clean
          engineering and measurable impact.
        </Text>
      </Reveal>
    </Container>
  </Box>
);

/* ================== SKILLS SECTION ================== */
const SkillsSection = () => (
  <Box
    as="section"
    id="skills"
    py={{ base: 16, md: 24 }}
    bg="white"
    _dark={{ bg: "gray.900" }}
    borderTop="1px solid"
    borderBottom="1px solid"
    borderColor="pink.200"
    _dark={{ borderColor: "pink.900" }}
  >
    <Container maxW="5xl">
      <SectionHeading
        icon={Code}
        title="Skills"
        kicker="Tools and technologies I use to ship production-ready software."
      />

      <Wrap spacing={4}>
        {SKILLS.map(({ name, icon: IconComp }, idx) => (
          <WrapItem key={name}>
            <Reveal y={18} delay={idx * 0.05}>
              <MotionBox
                px={4}
                py={2.5}
                rounded="full"
                bg="teal.50"
                _dark={{ bg: "teal.900" }}
                color="teal.800"
                _dark={{ color: "teal.200" }}
                fontWeight="semibold"
                display="inline-flex"
                alignItems="center"
                gap={2}
                whileHover={{ y: -3, scale: 1.06 }}
                transition={{ duration: 0.18 }}
              >
                <Box as={IconComp} size="16" />
                <SplitText duration={0.02}>{name}</SplitText>
              </MotionBox>
            </Reveal>
          </WrapItem>
        ))}
      </Wrap>
    </Container>
  </Box>
);

/* ================== EDUCATION SECTION ================== */
const EducationSection = () => (
  <Box as="section" id="education" py={{ base: 16, md: 24 }}>
    <Container maxW="6xl">
      <SectionHeading icon={GraduationCap} title="Education" />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {EDUCATION.map((edu, idx) => (
          <EducationCard key={`${edu.org}-${idx}`} {...edu} />
        ))}
      </SimpleGrid>
    </Container>
  </Box>
);

/* ================== TECH CUBE SWITCHER ================== */
const CubeSwitcher = ({ whichCube, setWhichCube }) => (
  <Box as="section" id="tech-stack" py={{ base: 12, md: 18 }}>
    <Container maxW="6xl" textAlign="center">
      <Reveal y={20}>
        <HStack justify="center" spacing={4} mb={6}>
          <Magnetic strength={0.2}>
            <Button
              size="sm"
              colorScheme={whichCube === "web" ? "pink" : "gray"}
              rounded="full"
              onClick={() => setWhichCube("web")}
              _hover={{ transform: "translateY(-3px)" }}
            >
              <SplitText duration={0.02}>Web Stack</SplitText>
            </Button>
          </Magnetic>

          <Magnetic strength={0.2}>
            <Button
              size="sm"
              colorScheme={whichCube === "mobile" ? "pink" : "gray"}
              rounded="full"
              onClick={() => setWhichCube("mobile")}
              _hover={{ transform: "translateY(-3px)" }}
            >
              <SplitText duration={0.02}>Mobile Stack</SplitText>
            </Button>
          </Magnetic>
        </HStack>
      </Reveal>
    </Container>

    {/* Render correct cube */}
    {whichCube === "web" ? (
      <TechCube
        title="Technology Stack • Web"
        faces={WEB_FACES}
        autoSpeed={0.25}
      />
    ) : (
      <TechCube
        title="Technology Stack • Mobile"
        faces={MOBILE_FACES}
        autoSpeed={0.25}
      />
    )}

    <AnimatedSeparator />
  </Box>
);

/* ================= END OF PART 4 / 6 ================= */
/* ============================================================
   Part 5/6 — Projects + Contact
=============================================================== */

/* ================== PROJECTS SECTION ================== */
const ProjectsSection = () => (
  <Box
    as="section"
    id="projects"
    py={{ base: 16, md: 24 }}
    bg="white"
    _dark={{ bg: "gray.900" }}
    borderTop="1px solid"
    borderBottom="1px solid"
    borderColor="pink.200"
    _dark={{ borderColor: "pink.900" }}
  >
    <Container maxW="6xl">
      <SectionHeading
        icon={Briefcase}
        title="Projects"
        kicker="Selected work across mobile and web platforms."
      />

      {/* ===== Mobile Projects ===== */}
      <VStack align="stretch" spacing={5} mb={14}>
        <Heading size="md">
          <SplitText delay={0.1}>Mobile Applications</SplitText>
        </Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
          {MOBILE_PROJECTS.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </SimpleGrid>
      </VStack>

      <AnimatedSeparator />

      {/* ===== Web Projects ===== */}
      <VStack align="stretch" spacing={5} mt={14}>
        <Heading size="md">
          <SplitText delay={0.15}>Web Applications</SplitText>
        </Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
          {WEB_PROJECTS.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  </Box>
);

/* ================== CONTACT SECTION ================== */
const ContactSection = () => (
  <Box as="section" id="contact" py={{ base: 16, md: 24 }}>
    <Container maxW="5xl" textAlign="center">
      <SectionHeading
        icon={Mail}
        title="Contact"
        kicker="Let’s build something useful, fast, and beautiful."
      />

      <Reveal y={20} delay={0.25}>
        <Stack
          direction={{ base: "column", sm: "row" }}
          spacing={6}
          justify="center"
          mt={6}
        >
          <SocialButton
            href="mailto:adeyanjuolamilekan080@gmail.com"
            label="Email"
            brand="email"
            icon={<Mail size={20} />}
          />

          <SocialButton
            href="https://www.linkedin.com/in/ogunyade-olamilekan-91807223a/"
            label="LinkedIn"
            brand="linkedin"
            icon={<Linkedin size={20} />}
          />

          <SocialButton
            href="https://github.com/Ade-yanju"
            label="GitHub"
            brand="github"
            icon={<Github size={20} />}
          />
        </Stack>
      </Reveal>

      <Box mt={12}>
        <AnimatedSeparator />
      </Box>
    </Container>
  </Box>
);

/* ================= END OF PART 5 / 6 ================= */
/* ============================================================
   Part 6/6 — Footer + Final Assembly + Export
=============================================================== */

/* ================== FOOTER ================== */
const FooterSection = () => (
  <Box
    as="footer"
    py={10}
    textAlign="center"
    bgGradient="linear(to-r, teal.100, pink.100)"
    _dark={{ bgGradient: "linear(to-r, teal.900, pink.900)" }}
    borderTop="1px solid"
    borderColor="pink.200"
    _dark={{ borderColor: "pink.800" }}
  >
    <Reveal y={20}>
      <Text
        fontSize="sm"
        bgGradient="linear(to-r, teal.400, pink.400)"
        bgClip="text"
        fontWeight="bold"
        letterSpacing="wide"
      >
        © {new Date().getFullYear()} Olamilekan Adeyanju Ogunyade — Designed &
        Built with ❤️ using React, Chakra UI, and Framer Motion.
      </Text>
    </Reveal>
  </Box>
);

/* ============================================================
   FINAL PORTFOLIO ASSEMBLY
=============================================================== */

/**
 * IMPORTANT:
 * - Hero section lives in `PortfolioHero`
 * - Sections are composed below
 * - Single default export (NO DUPLICATES)
 */

export default function Portfolio() {
  const [whichCube, setWhichCube] = useState("web");

  return (
    <>
      {/* ===== HERO ===== */}
      <PortfolioHero />

      {/* ===== ABOUT ===== */}
      <AboutSection />

      {/* ===== SKILLS ===== */}
      <SkillsSection />

      {/* ===== EDUCATION ===== */}
      <EducationSection />

      {/* ===== TECH CUBE ===== */}
      <CubeSwitcher whichCube={whichCube} setWhichCube={setWhichCube} />

      {/* ===== PROJECTS ===== */}
      <ProjectsSection />

      {/* ===== CONTACT ===== */}
      <ContactSection />

      {/* ===== FOOTER ===== */}
      <FooterSection />
    </>
  );
}

/* ================= END OF FILE ================= */
