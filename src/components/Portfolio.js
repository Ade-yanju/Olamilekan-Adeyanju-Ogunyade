import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Button,
  SimpleGrid,
  Stack,
  HStack,
  Link,
} from "@chakra-ui/react";
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

/* ===================== ASSETS ===================== */
import profileImage from "../assets/profile.jpg";
import omiHealthImg from "../assets/omi-health.jpg";
import duAlumniImg from "../assets/du-alumni.jpg";
import ibadanJollofImg from "../assets/ibadan-jollof.jpg";
import VodiumImg from "../assets/Vodium-logo.png";
import HillstarImg from "../assets/hillstar.png";

/* ===================== MOTION ===================== */
const MotionBox = motion(Box);

/* ===================== DATA ===================== */
const PROJECTS = [
  {
    title: "OMI Health (Android)",
    desc: "A bilingual mobile healthcare platform enabling remote consultations, appointment scheduling, and healthcare access for underserved communities.",
    img: omiHealthImg,
    link: "https://expo.dev/artifacts/eas/s8LgczG1J7EgAwLrMLdLno.apk",
    tech: "React Native · Firebase · Expo",
  },
  {
    title: "DU Alumni Platform",
    desc: "A full-stack alumni engagement platform connecting graduates through events, profiles, and community tools.",
    img: duAlumniImg,
    link: "https://du-alumni-steel.vercel.app/",
    tech: "React · Firebase · Cloudinary",
  },
  {
    title: "Vodium (Android)",
    desc: "Vodium is a fintech-enabled mobile application that combines digital wallet services, biometric authentication, analytics, events access, and a concierge experience in a single platform.",
    img: VodiumImg,
    link: "#",
    tech: "Expo· ReactNative · Fintech Platform · UI/UX · Payments",
  },
    {
    title: "Hillstar",
    desc: "A React single‑page application (SPA) for Hillstar Nigeria Ltd covering Real Estate, Hospitality, Renewable Energy, Procurement, and Telecom. The site highlights listings, embedded tour videos, brochures (PDF), and a lightweight admin experience that publishes content to Cloudinary using an unsigned preset and a JSON manifest per section.",
    img: HillstarImg,
    link: "https://hillstar-realestate.vercel.app/",
    tech: "React",
  },
];

/* ===================== BACKGROUNDS ===================== */
const EngineeringGrid = () => (
  <Box
    position="fixed"
    inset={0}
    zIndex={0}
    opacity={0.06}
    pointerEvents="none"
    style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
      `,
      backgroundSize: "80px 80px",
      maskImage:
        "radial-gradient(circle at 50% 20%, black 40%, transparent 75%)",
    }}
  />
);

/* ===================== SECTION WRAPPER ===================== */
const Section = ({ id, children }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 40%"],
  });

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [40, 0]), {
    stiffness: 120,
    damping: 24,
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <MotionBox
      ref={ref}
      as="section"
      id={id}
      py={{ base: 24, md: 32 }}
      style={{ y, opacity }}
    >
      {children}
    </MotionBox>
  );
};

/* ===================== HERO (IMAGE ON RHS) ===================== */
const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const imgX = useTransform(mouseX, [-100, 100], [-12, 12]);
  const imgY = useTransform(mouseY, [-100, 100], [-12, 12]);

  return (
    <Box
      minH="100vh"
      bg="#020617"
      color="gray.100"
      position="relative"
      onMouseMove={(e) => {
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
      }}
    >
      <EngineeringGrid />

      <Container maxW="7xl" position="relative" zIndex={1}>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          minH="100vh"
          alignItems="center"
          spacing={16}
        >
          {/* LEFT — TEXT */}
          <Stack spacing={8}>
            <Heading size="2xl" lineHeight="1.05">
              Olamilekan Adeyanju Ogunyade
            </Heading>

            <Text fontSize="xl" maxW="2xl" color="gray.300">
              Software Engineer building elegant, scalable web and mobile
              products with strong frontend systems thinking and real-world
              impact.
            </Text>

            <HStack spacing={4}>
              <Button
                colorScheme="teal"
                size="lg"
                rightIcon={<ArrowUpRight size={18} />}
                as="a"
                href="#work"
              >
                View Work
              </Button>

              <Button
                variant="outline"
                size="lg"
                as="a"
                href="#contact"
              >
                Contact
              </Button>
            </HStack>

            <Text fontSize="sm" color="gray.400">
              React · React Native · Frontend Systems · Cloud-backed Products
            </Text>
          </Stack>

          {/* RIGHT — LARGE IMAGE */}
          <MotionBox
            style={{ x: imgX, y: imgY }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={profileImage}
              alt="Olamilekan Adeyanju"
              w="100%"
              maxH="520px"
              objectFit="cover"
              rounded="2xl"
              border="1px solid"
              borderColor="whiteAlpha.200"
              boxShadow="0 40px 120px rgba(0,0,0,0.6)"
            />
          </MotionBox>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

/* ===================== EXPERTISE ===================== */
const Expertise = () => (
  <Section id="skills">
    <Container maxW="6xl">
      <Stack spacing={12}>
        <Heading size="lg">Engineering Focus</Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {[
            {
              title: "Frontend Systems",
              desc: "Scalable UI systems with performance and accessibility built in.",
              tech: "React · Component Architecture",
            },
            {
              title: "Mobile Engineering",
              desc: "Cross-platform mobile products with native-grade UX.",
              tech: "React Native · Expo · Firebase",
            },
            {
              title: "Cloud-Backed Products",
              desc: "Auth, persistence, and media pipelines for real users.",
              tech: "Node.js · Firebase · Cloudinary",
            },
          ].map((item) => (
            <MotionBox
              key={item.title}
              p={10}
              rounded="2xl"
              bg="rgba(255,255,255,0.03)"
              border="1px solid"
              borderColor="whiteAlpha.100"
              whileHover={{ y: -8 }}
            >
              <Heading size="md" mb={3}>{item.title}</Heading>
              <Text color="gray.400" mb={4}>{item.desc}</Text>
              <Text fontSize="sm" color="teal.300">{item.tech}</Text>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  </Section>
);

/* ===================== PROJECT MODAL ===================== */
const ProjectModal = ({ project, onClose }) => (
  <MotionBox
    position="fixed"
    inset={0}
    bg="rgba(2,6,23,0.85)"
    zIndex={2000}
    display="flex"
    alignItems="center"
    justifyContent="center"
    onClick={onClose}
  >
    <MotionBox
      bg="#020617"
      p={10}
      rounded="2xl"
      maxW="640px"
      border="1px solid"
      borderColor="whiteAlpha.200"
      onClick={(e) => e.stopPropagation()}
    >
      <Heading size="md" mb={4}>{project.title}</Heading>
      <Text color="gray.400" mb={6}>{project.desc}</Text>
      <Text fontSize="sm" color="teal.300" mb={8}>{project.tech}</Text>
      <Button as="a" href={project.link} isExternal colorScheme="teal">
        View Live Project
      </Button>
    </MotionBox>
  </MotionBox>
);

/* ===================== WORK ===================== */
const Work = () => {
  const [active, setActive] = React.useState(null);

  return (
    <Section id="work">
      <Container maxW="6xl">
        <Stack spacing={12}>
          <Heading size="lg">Selected Work</Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {PROJECTS.map((p) => (
              <MotionBox
                key={p.title}
                rounded="2xl"
                overflow="hidden"
                bg="rgba(255,255,255,0.02)"
                border="1px solid"
                borderColor="whiteAlpha.100"
                whileHover={{ y: -10 }}
                cursor="pointer"
                onClick={() => setActive(p)}
              >
                <Image src={p.img} h="220px" w="100%" objectFit="cover" />
                <Box p={8}>
                  <Heading size="md" mb={3}>{p.title}</Heading>
                  <Text color="gray.400" noOfLines={3}>{p.desc}</Text>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>

          <AnimatePresence>
            {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
          </AnimatePresence>
        </Stack>
      </Container>
    </Section>
  );
};

/* ===================== CONTACT ===================== */
const Contact = () => (
  <Section id="contact">
    <Container maxW="5xl" textAlign="center">
      <Stack spacing={8}>
        <Heading size="lg">Let’s Build Something Serious</Heading>
        <Text color="gray.400">
          Open to frontend, mobile, and product-focused engineering roles.
        </Text>

        <HStack spacing={6} justify="center">
          <Button leftIcon={<Mail size={18} />} as="a" href="mailto:adeyanjuolamilekan080@gmail.com">
            Email
          </Button>
          <Button variant="outline" leftIcon={<Github size={18} />} as="a" href="https://github.com/Ade-yanju">
            GitHub
          </Button>
          <Button variant="outline" leftIcon={<Linkedin size={18} />} as="a" href="https://linkedin.com">
            LinkedIn
          </Button>
        </HStack>
      </Stack>
    </Container>
  </Section>
);

/* ===================== FOOTER ===================== */
const Footer = () => (
  <Box py={10} textAlign="center" color="gray.500" fontSize="sm">
    © {new Date().getFullYear()} Olamilekan Adeyanju Ogunyade · Software Engineer
  </Box>
);

/* ===================== EXPORT ===================== */
export default function Portfolio() {
  return (
    <Box bg="#020617" color="gray.100">
      <Hero />
      <Expertise />
      <Work />
      <Contact />
      <Footer />
    </Box>
  );
}
