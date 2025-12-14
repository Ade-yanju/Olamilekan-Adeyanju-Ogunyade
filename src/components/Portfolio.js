/* ============================================================
   Portfolio.js — Part 1/6
   Imports + Motion wrappers + Helper animations
=============================================================== */

import React, { useEffect, useRef, useState, useMemo } from "react";

/* ================== ASSETS ================== */
import profileImage from "../assets/profile.jpg";
import omiHealthImg from "../assets/omi-health.jpg";
import duAlumniImg from "../assets/du-alumni.jpg";
import ibadanJollofImg from "../assets/ibadan-jollof.jpg";
import raffleDrawImg from "../assets/raffle-draw.jpg";
import hillstarImg from "../assets/hillstar.png";
import alxLogo from "../assets/alx-logo.png";
import duLogo from "../assets/du-logo.png";

import reactLogo from "../assets/react.svg";
import expoLogo from "../assets/expo.svg";
import firebaseLogo from "../assets/firebase.svg";
import nodeLogo from "../assets/nodejs.svg";
import cloudinaryLogo from "../assets/cloudinary.svg";
import githubLogo from "../assets/github.svg";

/* ================== CHAKRA UI ================== */
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

/* ================== FRAMER MOTION ================== */
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  animate,
  useInView,
} from "framer-motion";

/* ================== ICONS ================== */
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

/* ================== COLOR MODE BUTTON ================== */
import { ColorModeIconButton } from "../color-mode";

/* ================== MOTION WRAPPERS ================== */
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionImage = motion(Image);
const MotionText = motion(Text);

/* ================== GLOBAL VARIANTS ================== */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

/* ================== HELPERS ================== */

/* ---- Split text animation ---- */
const SplitText = ({ children, delay = 0, duration = 0.03 }) => {
  const letters = String(children).split("");
  return (
    <chakra.span whiteSpace="pre">
      {letters.map((l, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: delay + i * duration }}
          style={{ display: "inline-block" }}
        >
          {l}
        </motion.span>
      ))}
    </chakra.span>
  );
};

/* ---- Reveal on scroll ---- */
const Reveal = ({ children, y = 30 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

/* ---- Gradient stroke text ---- */
const StrokeText = ({ children }) => (
  <chakra.span
    bgGradient="linear(to-r, pink.400, purple.400)"
    bgClip="text"
    fontWeight="bold"
  >
    {children}
  </chakra.span>
);

/* ---- Magnetic hover ---- */
const Magnetic = ({ children }) => {
  const x = useSpring(0);
  const y = useSpring(0);
  return (
    <MotionBox
      style={{ x, y }}
      onMouseMove={(e) => {
        x.set((e.nativeEvent.offsetX - 50) * 0.15);
        y.set((e.nativeEvent.offsetY - 20) * 0.15);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      display="inline-block"
    >
      {children}
    </MotionBox>
  );
};

/* ---- Floating decorative blob ---- */
const FloatingBlob = ({ x, y, size = 240, delay = 0 }) => (
  <MotionBox
    position="absolute"
    top={y}
    left={x}
    w={`${size}px`}
    h={`${size}px`}
    bg="whiteAlpha.300"
    rounded="full"
    filter="blur(70px)"
    animate={{ y: [0, -20, 0] }}
    transition={{ duration: 12, repeat: Infinity, delay }}
    pointerEvents="none"
  />
);

/* ---- Simple parallax ---- */
const Parallax = ({ children }) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  useEffect(() => {
    const move = (e) => {
      mx.set(e.clientX / 40);
      my.set(e.clientY / 40);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return <MotionBox style={{ x: mx, y: my }}>{children}</MotionBox>;
};

/* ---- Cursor follower ---- */
const FollowCursor = () => {
  const x = useSpring(-100);
  const y = useSpring(-100);

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <MotionBox
      position="fixed"
      style={{ x, y }}
      w="10px"
      h="10px"
      bg="pink.400"
      rounded="full"
      pointerEvents="none"
      zIndex={2000}
    />
  );
};
/* ============================================================
   Portfolio.js — Part 2/6
   Data + UI Blocks + TechCube
=============================================================== */

/* ================== DATA ================== */

const MOBILE_PROJECTS = [
  {
    title: "OMI-Health",
    img: omiHealthImg,
    desc: "Bilingual healthcare mobile app for Omi-Adio residents in Ibadan.",
    link: "https://expo.dev/artifacts/eas/s8LgczG1J7EgAwLrMLdLno.apk",
  },
];

const WEB_PROJECTS = [
  {
    title: "DU Alumni",
    img: duAlumniImg,
    desc: "Alumni engagement platform for Dominion University.",
    link: "https://du-alumni-steel.vercel.app/",
  },
  {
    title: "Ibadan Jollof",
    img: ibadanJollofImg,
    desc: "Food ordering website for Jollof rice lovers.",
    link: "https://ib-jollof.vercel.app/",
  },
  {
    title: "Simple Raffle Draw",
    img: raffleDrawImg,
    desc: "Fair and transparent raffle draw web tool.",
    link: "https://simple-raffle-draw.vercel.app/",
  },
  {
    title: "HillStar Real Estate",
    img: hillstarImg,
    desc: "Real estate listing website for HillStar.",
    link: "https://hillstar-realestate.vercel.app/",
  },
];

const EDUCATION = [
  {
    org: "ALX Africa",
    program: "AWS Cloud Computing",
    period: "2025 – Present",
    status: "In Progress",
    location: "Remote",
    logo: alxLogo,
  },
  {
    org: "Dominion University",
    program: "B.Sc. Software Engineering",
    period: "2021 – 2025",
    status: "Completed",
    location: "Ibadan, Nigeria",
    logo: duLogo,
  },
];

const SKILLS = [
  { name: "JavaScript", icon: Code },
  { name: "React", icon: Layers },
  { name: "React Native", icon: Layers },
  { name: "Firebase", icon: Database },
  { name: "NodeJS", icon: Server },
  { name: "Cloudinary", icon: Cloud },
  { name: "Git & GitHub", icon: Github },
  { name: "Excel", icon: FileSpreadsheet },
];

/* ================== TECH CUBE FACES ================== */

const WEB_FACES = [
  { label: "React", logo: reactLogo },
  { label: "Expo", logo: expoLogo },
  { label: "Firebase", logo: firebaseLogo },
  { label: "NodeJS", logo: nodeLogo },
  { label: "Cloudinary", logo: cloudinaryLogo },
  { label: "GitHub", logo: githubLogo },
];

const MOBILE_FACES = WEB_FACES.map((f, i) =>
  i === 0 ? { ...f, label: "React Native" } : f
);

/* ================== SECTION HEADING ================== */

const SectionHeading = ({ icon: Icon, title, kicker }) => (
  <Reveal>
    <HStack spacing={3} mb={2}>
      <Box as={Icon} color="pink.500" />
      <Heading size="lg">
        <SplitText>{title}</SplitText>
      </Heading>
    </HStack>
    {kicker && (
      <Text color="gray.600" _dark={{ color: "gray.300" }} mb={6}>
        {kicker}
      </Text>
    )}
  </Reveal>
);

/* ================== PROJECT CARD ================== */

const ProjectCard = ({ title, img, desc, link }) => (
  <Reveal>
    <MotionBox
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ duration: 0.25 }}
      bg="white"
      _dark={{ bg: "gray.800" }}
      rounded="xl"
      shadow="lg"
      overflow="hidden"
    >
      <ChakraLink href={link} isExternal _hover={{ textDecoration: "none" }}>
        <Image src={img} alt={title} h="200px" w="100%" objectFit="cover" />
        <Box p={4}>
          <Heading size="md">{title}</Heading>
          <Text fontSize="sm" mt={2}>
            {desc}
          </Text>
        </Box>
      </ChakraLink>
    </MotionBox>
  </Reveal>
);

/* ================== EDUCATION CARD ================== */

const EducationCard = ({ logo, org, program, period, status, location }) => (
  <Reveal>
    <HStack
      spacing={4}
      p={4}
      bg="white"
      _dark={{ bg: "gray.800" }}
      rounded="xl"
      shadow="md"
      align="center"
    >
      <Image src={logo} alt={org} boxSize="60px" />
      <Box>
        <Heading size="sm">{org}</Heading>
        <Text fontSize="sm">{program}</Text>
        <Text fontSize="xs" color="gray.500">
          {period} • {location}
        </Text>
        <Badge mt={1} colorScheme="green">
          {status}
        </Badge>
      </Box>
    </HStack>
  </Reveal>
);

/* ================== TECH CUBE ================== */

const TechCube = ({ faces }) => {
  const rotateY = useMotionValue(0);

  useEffect(() => {
    const controls = animate(rotateY, 360, {
      duration: 18,
      repeat: Infinity,
      ease: "linear",
    });
    return () => controls.stop();
  }, [rotateY]);

  return (
    <MotionBox
      mx="auto"
      w="260px"
      h="260px"
      style={{ rotateY }}
      transformStyle="preserve-3d"
    >
      {faces.map((f, i) => (
        <Box
          key={i}
          position="absolute"
          inset={0}
          m="auto"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="white"
          _dark={{ bg: "gray.700" }}
          rounded="xl"
          transform={`rotateY(${i * 60}deg) translateZ(130px)`}
        >
          <VStack>
            <Image src={f.logo} boxSize="60px" />
            <Text>{f.label}</Text>
          </VStack>
        </Box>
      ))}
    </MotionBox>
  );
};
/* ============================================================
   Portfolio.js — Part 3/6
   Hero Section (PortfolioHero)
=============================================================== */

const PortfolioHero = () => {
  return (
    <Box
      as="header"
      position="relative"
      minH="100vh"
      overflow="hidden"
      bgGradient="linear(to-br, pink.500, purple.600)"
    >
      {/* Floating decorative blobs */}
      <FloatingBlob x="6%" y="10%" size={260} />
      <FloatingBlob x="70%" y="20%" size={220} delay={1} />
      <FloatingBlob x="45%" y="70%" size={300} delay={0.5} />

      {/* Color mode toggle */}
      <Box position="fixed" top={4} right={4} zIndex={3000}>
        <Magnetic>
          <ColorModeIconButton />
        </Magnetic>
      </Box>

      <Container maxW="6xl" position="relative" zIndex={5}>
        <Parallax>
          <MotionFlex
            minH="100vh"
            direction="column"
            align="center"
            justify="center"
            textAlign="center"
            color="white"
            px={4}
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Profile image */}
            <MotionImage
              src={profileImage}
              alt="Olamilekan Adeyanju"
              boxSize={{ base: "110px", md: "150px" }}
              rounded="full"
              border="4px solid white"
              mb={6}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Name */}
            <Heading size="2xl" mb={4}>
              <SplitText delay={0.2}>
                Olamilekan Adeyanju Ogunyade
              </SplitText>
            </Heading>

            {/* Subtitle */}
            <Text fontSize={{ base: "lg", md: "xl" }} maxW="3xl" mb={6}>
              <SplitText delay={0.6}>
                Software Engineer • Frontend & Mobile Developer
              </SplitText>{" "}
              <StrokeText>• AWS Cloud (ALX)</StrokeText>
            </Text>

            {/* Navigation buttons */}
            <Wrap justify="center" spacing={4} mt={4}>
              {[
                { label: "About", href: "#about" },
                { label: "Skills", href: "#skills" },
                { label: "Education", href: "#education" },
                { label: "Projects", href: "#projects" },
                { label: "Contact", href: "#contact" },
              ].map((item, idx) => (
                <WrapItem key={item.label}>
                  <Magnetic>
                    <Button
                      as="a"
                      href={item.href}
                      colorScheme="pink"
                      variant="solid"
                      rounded="full"
                      px={6}
                      boxShadow="lg"
                      whileHover={{ y: -3 }}
                    >
                      <SplitText delay={0.9 + idx * 0.05}>
                        {item.label}
                      </SplitText>
                    </Button>
                  </Magnetic>
                </WrapItem>
              ))}
            </Wrap>
          </MotionFlex>
        </Parallax>
      </Container>
    </Box>
  );
};
/* ============================================================
   Portfolio.js — Part 4/6
   About • Skills • Education • Cube Switcher
=============================================================== */

/* ================== ABOUT SECTION ================== */

const AboutSection = () => (
  <Box as="section" id="about" py={{ base: 16, md: 20 }}>
    <Container maxW="5xl">
      <SectionHeading
        icon={User}
        title="About Me"
        kicker="Focused on building scalable, user-centric web and mobile products."
      />

      <Reveal>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          lineHeight="tall"
          color="gray.700"
          _dark={{ color: "gray.300" }}
          maxW="3xl"
        >
          I am a passionate software engineer specializing in React and React
          Native with hands-on experience building production-ready web and
          mobile applications. I enjoy translating ideas into clean, functional
          user experiences while maintaining performance and scalability.
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
    py={{ base: 16, md: 20 }}
    bg="white"
    _dark={{ bg: "gray.900" }}
  >
    <Container maxW="6xl">
      <SectionHeading
        icon={Code}
        title="Skills"
        kicker="Technologies and tools I work with regularly."
      />

      <Wrap spacing={4}>
        {SKILLS.map(({ name, icon: Icon }, idx) => (
          <WrapItem key={name}>
            <Reveal y={20}>
              <MotionBox
                px={4}
                py={2}
                rounded="full"
                bg="pink.50"
                _dark={{ bg: "pink.900" }}
                color="pink.700"
                _dark={{ color: "pink.200" }}
                fontWeight="semibold"
                display="flex"
                alignItems="center"
                gap={2}
                whileHover={{ y: -4, scale: 1.05 }}
              >
                <Icon size={16} />
                <SplitText delay={idx * 0.02}>{name}</SplitText>
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
  <Box as="section" id="education" py={{ base: 16, md: 20 }}>
    <Container maxW="6xl">
      <SectionHeading icon={GraduationCap} title="Education" />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {EDUCATION.map((edu, idx) => (
          <EducationCard key={idx} {...edu} />
        ))}
      </SimpleGrid>
    </Container>
  </Box>
);

/* ================== TECH CUBE SWITCHER ================== */

const CubeSwitcher = ({ whichCube, setWhichCube }) => (
  <Box as="section" py={{ base: 12, md: 16 }} textAlign="center">
    <Reveal>
      <HStack justify="center" spacing={4} mb={8}>
        <Magnetic>
          <Button
            size="sm"
            colorScheme={whichCube === "web" ? "pink" : "gray"}
            rounded="full"
            onClick={() => setWhichCube("web")}
          >
            Web Stack
          </Button>
        </Magnetic>

        <Magnetic>
          <Button
            size="sm"
            colorScheme={whichCube === "mobile" ? "pink" : "gray"}
            rounded="full"
            onClick={() => setWhichCube("mobile")}
          >
            Mobile Stack
          </Button>
        </Magnetic>
      </HStack>
    </Reveal>

    <Reveal>
      {whichCube === "web" ? (
        <TechCube faces={WEB_FACES} />
      ) : (
        <TechCube faces={MOBILE_FACES} />
      )}
    </Reveal>
  </Box>
);
/* ============================================================
   Portfolio.js — Part 5/6
   Projects + Contact Sections
=============================================================== */

/* ================== PROJECTS SECTION ================== */

const ProjectsSection = () => (
  <Box
    as="section"
    id="projects"
    py={{ base: 16, md: 20 }}
    bg="white"
    _dark={{ bg: "gray.900" }}
  >
    <Container maxW="6xl">
      <SectionHeading
        icon={Briefcase}
        title="Projects"
        kicker="Selected projects showcasing real-world problem solving."
      />

      {/* Mobile projects */}
      <VStack align="stretch" spacing={6} mb={12}>
        <Heading size="md">
          <SplitText>Mobile Applications</SplitText>
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {MOBILE_PROJECTS.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </SimpleGrid>
      </VStack>

      {/* Web projects */}
      <VStack align="stretch" spacing={6}>
        <Heading size="md">
          <SplitText>Web Applications</SplitText>
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
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
  <Box as="section" id="contact" py={{ base: 16, md: 20 }}>
    <Container maxW="5xl" textAlign="center">
      <SectionHeading
        icon={Mail}
        title="Contact"
        kicker="Let’s connect and build something impactful together."
      />

      <Reveal>
        <Stack
          direction={{ base: "column", sm: "row" }}
          spacing={6}
          justify="center"
          mt={8}
        >
          <Magnetic>
            <Button
              as="a"
              href="mailto:adeyanjuolamilekan080@gmail.com"
              leftIcon={<Mail size={18} />}
              colorScheme="pink"
              rounded="full"
            >
              Email
            </Button>
          </Magnetic>

          <Magnetic>
            <Button
              as="a"
              href="https://www.linkedin.com/in/ogunyade-olamilekan-91807223a/"
              leftIcon={<Linkedin size={18} />}
              colorScheme="blue"
              rounded="full"
              target="_blank"
            >
              LinkedIn
            </Button>
          </Magnetic>

          <Magnetic>
            <Button
              as="a"
              href="https://github.com/Ade-yanju"
              leftIcon={<Github size={18} />}
              colorScheme="gray"
              rounded="full"
              target="_blank"
            >
              GitHub
            </Button>
          </Magnetic>
        </Stack>
      </Reveal>
    </Container>
  </Box>
);
/* ============================================================
   Portfolio.js — Part 6/6
   Footer + Final Assembly (SINGLE DEFAULT EXPORT)
=============================================================== */

/* ================== FOOTER ================== */

const FooterSection = () => (
  <Box
    as="footer"
    py={8}
    textAlign="center"
    bg="gray.100"
    _dark={{ bg: "gray.800" }}
  >
    <Reveal>
      <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
        © {new Date().getFullYear()} Olamilekan Adeyanju Ogunyade.  
        Built with React, Chakra UI & Framer Motion.
      </Text>
    </Reveal>
  </Box>
);

/* ============================================================
   FINAL PORTFOLIO COMPONENT (ONE EXPORT ONLY)
=============================================================== */

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

      {/* ===== TECH CUBE SWITCHER ===== */}
      <CubeSwitcher
        whichCube={whichCube}
        setWhichCube={setWhichCube}
      />

      {/* ===== PROJECTS ===== */}
      <ProjectsSection />

      {/* ===== CONTACT ===== */}
      <ContactSection />

      {/* ===== FOOTER ===== */}
      <FooterSection />
    </>
  );
}
