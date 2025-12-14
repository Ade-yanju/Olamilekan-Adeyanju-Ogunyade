/* ============================================================
   Portfolio.js — High-Profile Developer Portfolio
   PART 1/4 — Core Setup & Engineering Atmosphere
=============================================================== */

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
  VStack,
  Link,
} from "@chakra-ui/react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
} from "lucide-react";

/* ========= ASSETS ========= */
import profileImage from "../assets/profile.jpg";
import omiHealthImg from "../assets/omi-health.jpg";
import duAlumniImg from "../assets/du-alumni.jpg";
import ibadanJollofImg from "../assets/ibadan-jollof.jpg";

/* ========= MOTION ========= */
const MotionBox = motion(Box);

/* ========= DATA ========= */
const PROJECTS = [
  {
    title: "OMI Health",
    desc: "A bilingual mobile healthcare platform enabling remote consultations, appointment scheduling, and healthcare access for underserved communities.",
    img: omiHealthImg,
    link: "#",
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
    title: "Ibadan Jollof",
    desc: "A focused food-ordering web product built for speed, conversion, and simplicity.",
    img: ibadanJollofImg,
    link: "https://ib-jollof.vercel.app/",
    tech: "React · UI/UX · Payments",
  },
];

/* ========= SHARED SECTION WRAPPER ========= */
const Section = ({ id, children }) => (
  <Box
    as="section"
    id={id}
    position="relative"
    py={{ base: 24, md: 32 }}
  >
    {children}
  </Box>
);

/* ========= ENGINEERING GRID BACKGROUND ========= */
const EngineeringGrid = () => (
  <Box
    aria-hidden
    position="fixed"
    inset={0}
    zIndex={0}
    opacity={0.08}
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
/* ============================================================
   PART 2/4 — HERO (Spatial / Developer-Themed)
=============================================================== */

const Hero = () => {
  // subtle parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgX = useTransform(mouseX, [-100, 100], [-20, 20]);
  const bgY = useTransform(mouseY, [-100, 100], [-20, 20]);

  const fgX = useTransform(mouseX, [-100, 100], [-8, 8]);
  const fgY = useTransform(mouseY, [-100, 100], [-8, 8]);

  const onMouseMove = (e) => {
    const x = e.clientX - window.innerWidth / 2;
    const y = e.clientY - window.innerHeight / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <Box
      minH="100vh"
      position="relative"
      overflow="hidden"
      bg="#020617"
      color="gray.100"
      onMouseMove={onMouseMove}
    >
      {/* background grid */}
      <EngineeringGrid />

      {/* ambient glow layer */}
      <MotionBox
        position="absolute"
        inset={0}
        style={{ x: bgX, y: bgY }}
        bg="radial-gradient(circle at 30% 20%, rgba(45,212,191,0.18), transparent 60%)"
        zIndex={1}
      />

      <Container maxW="6xl" position="relative" zIndex={2}>
        <Stack
          spacing={10}
          minH="100vh"
          justify="center"
          style={{ perspective: "1200px" }}
        >
          {/* profile image — floating */}
          <MotionBox
            style={{ x: fgX, y: fgY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src={profileImage}
              alt="Olamilekan Adeyanju"
              boxSize="128px"
              rounded="full"
              border="2px solid"
              borderColor="whiteAlpha.300"
              boxShadow="0 20px 60px rgba(0,0,0,0.6)"
            />
          </MotionBox>

          {/* name */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Heading
              size="2xl"
              lineHeight="1.05"
              letterSpacing="-0.02em"
            >
              Olamilekan Adeyanju Ogunyade
            </Heading>
          </MotionBox>

          {/* subtitle */}
          <MotionBox
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            <Text
              fontSize="xl"
              maxW="2xl"
              color="gray.300"
            >
              Software Engineer crafting elegant, scalable web and mobile
              products with a strong focus on frontend systems, performance,
              and real-world usability.
            </Text>
          </MotionBox>

          {/* actions */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
          >
            <HStack spacing={4}>
              <Button
                size="lg"
                colorScheme="teal"
                rightIcon={<ArrowUpRight size={18} />}
                as="a"
                href="#work"
              >
                View Work
              </Button>

              <Button
                size="lg"
                variant="outline"
                borderColor="whiteAlpha.300"
                as="a"
                href="#contact"
              >
                Contact
              </Button>
            </HStack>
          </MotionBox>

          {/* developer signal line */}
          <MotionBox
            mt={10}
            fontSize="sm"
            color="gray.400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Text>
              React · React Native · Frontend Systems · Cloud-backed Products
            </Text>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
};
/* ============================================================
   PART 3/4 — ENGINEERING PILLARS & SELECTED WORK
=============================================================== */

/* ========= ENGINEERING PILLARS ========= */
const Expertise = () => (
  <Section id="skills">
    <Container maxW="6xl">
      <Stack spacing={14}>
        <Box>
          <Heading size="lg" mb={3}>
            Engineering Focus
          </Heading>
          <Text color="gray.400" maxW="2xl">
            I specialize in building maintainable, production-grade systems
            with a strong emphasis on frontend architecture, cross-platform
            delivery, and cloud integration.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {[
            {
              title: "Frontend Systems",
              desc:
                "Designing scalable UI systems with clean state management, performance optimizations, and accessibility baked in.",
              tech: "React · Framer Motion · Component Architecture",
            },
            {
              title: "Mobile Engineering",
              desc:
                "Building cross-platform mobile applications that feel native, perform reliably, and scale with product growth.",
              tech: "React Native · Expo · Firebase",
            },
            {
              title: "Cloud-Backed Products",
              desc:
                "Integrating authentication, data persistence, and media pipelines into real-world production workflows.",
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
              backdropFilter="blur(12px)"
              whileHover={{
                y: -8,
                boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
              }}
              transition={{ duration: 0.3 }}
            >
              <Heading size="md" mb={4}>
                {item.title}
              </Heading>

              <Text color="gray.400" mb={6}>
                {item.desc}
              </Text>

              <Text
                fontSize="sm"
                color="teal.300"
                letterSpacing="wide"
              >
                {item.tech}
              </Text>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  </Section>
);

/* ========= WORK / PROJECTS ========= */
const Work = () => (
  <Section id="work">
    <Container maxW="6xl">
      <Stack spacing={14}>
        <Box>
          <Heading size="lg" mb={3}>
            Selected Work
          </Heading>
          <Text color="gray.400" maxW="2xl">
            A selection of products I’ve designed and engineered — focusing on
            usability, clarity, and real-world impact.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {PROJECTS.map((project) => (
            <MotionBox
              key={project.title}
              position="relative"
              rounded="2xl"
              overflow="hidden"
              bg="rgba(255,255,255,0.02)"
              border="1px solid"
              borderColor="whiteAlpha.100"
              whileHover={{
                y: -10,
                boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
              }}
              transition={{ duration: 0.35 }}
            >
              {/* image */}
              <Box overflow="hidden">
                <MotionBox
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <Image
                    src={project.img}
                    alt={project.title}
                    objectFit="cover"
                    w="100%"
                    h="220px"
                  />
                </MotionBox>
              </Box>

              {/* content */}
              <Box p={8}>
                <Heading size="md" mb={3}>
                  {project.title}
                </Heading>

                <Text color="gray.400" mb={5}>
                  {project.desc}
                </Text>

                <Text
                  fontSize="sm"
                  color="teal.300"
                  letterSpacing="wide"
                  mb={6}
                >
                  {project.tech}
                </Text>

                <Link
                  href={project.link}
                  isExternal
                  display="inline-flex"
                  alignItems="center"
                  fontWeight="semibold"
                  color="teal.400"
                >
                  View product <ArrowUpRight size={16} style={{ marginLeft: 6 }} />
                </Link>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  </Section>
);
/* ============================================================
   PART 4/4 — CONTACT, FOOTER & FINAL EXPORT
=============================================================== */

/* ========= CONTACT ========= */
const Contact = () => (
  <Section id="contact">
    <Container maxW="5xl">
      <Stack spacing={10} align="center" textAlign="center">
        <Box>
          <Heading size="lg" mb={4}>
            Let’s Build Something Serious
          </Heading>
          <Text color="gray.400" maxW="xl">
            I’m open to frontend, mobile, and product-focused engineering roles,
            as well as collaborations on meaningful, well-crafted software.
          </Text>
        </Box>

        <HStack spacing={6}>
          <Button
            as="a"
            href="mailto:adeyanjuolamilekan080@gmail.com"
            size="lg"
            colorScheme="teal"
            leftIcon={<Mail size={18} />}
          >
            Email Me
          </Button>

          <Button
            as="a"
            href="https://github.com/Ade-yanju"
            size="lg"
            variant="outline"
            borderColor="whiteAlpha.300"
            leftIcon={<Github size={18} />}
          >
            GitHub
          </Button>

          <Button
            as="a"
            href="https://www.linkedin.com/"
            size="lg"
            variant="outline"
            borderColor="whiteAlpha.300"
            leftIcon={<Linkedin size={18} />}
          >
            LinkedIn
          </Button>
        </HStack>
      </Stack>
    </Container>
  </Section>
);

/* ========= FOOTER ========= */
const Footer = () => (
  <Box
    py={10}
    textAlign="center"
    color="gray.500"
    fontSize="sm"
    borderTop="1px solid"
    borderColor="whiteAlpha.100"
  >
    © {new Date().getFullYear()} Olamilekan Adeyanju Ogunyade · Software Engineer
  </Box>
);

/* ============================================================
   FINAL EXPORT — SINGLE FILE PORTFOLIO
=============================================================== */

export default function Portfolio() {
  return (
    <Box bg="#020617" color="gray.100">
      {/* HERO */}
      <Hero />

      {/* ENGINEERING PILLARS */}
      <Expertise />

      {/* WORK */}
      <Work />

      {/* CONTACT */}
      <Contact />

      {/* FOOTER */}
      <Footer />
    </Box>
  );
}
