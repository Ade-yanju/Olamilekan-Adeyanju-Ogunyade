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
  chakra,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Cpu,
  Briefcase,
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

/* ========= SHARED ========= */
const Section = ({ id, children }) => (
  <Box as="section" id={id} py={{ base: 20, md: 28 }}>
    {children}
  </Box>
);

/* ========= HERO ========= */
const Hero = () => (
  <Box
    minH="100vh"
    display="flex"
    alignItems="center"
    bg="linear-gradient(180deg, #020617, #030712)"
    color="gray.100"
  >
    <Container maxW="6xl">
      <Stack spacing={8}>
        <Image
          src={profileImage}
          alt="Olamilekan Adeyanju"
          boxSize="120px"
          rounded="full"
          border="2px solid"
          borderColor="whiteAlpha.300"
        />

        <Heading size="2xl" lineHeight="1.1">
          Olamilekan Adeyanju Ogunyade
        </Heading>

        <Text fontSize="xl" maxW="2xl" color="gray.300">
          Software Engineer building elegant, scalable web and mobile products.
          I focus on frontend systems, cross-platform mobile apps, and cloud-backed solutions.
        </Text>

        <HStack spacing={4}>
          <Button
            rightIcon={<ArrowUpRight size={18} />}
            colorScheme="teal"
            size="lg"
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
      </Stack>
    </Container>
  </Box>
);

/* ========= ABOUT ========= */
const About = () => (
  <Section id="about">
    <Container maxW="5xl">
      <Heading size="lg" mb={6}>
        About
      </Heading>

      <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.300" }}>
        I design and build production-ready applications with a strong focus on
        usability, performance, and maintainability. My work spans web platforms,
        mobile applications, and backend-integrated systems used by real users.
      </Text>
    </Container>
  </Section>
);

/* ========= EXPERTISE ========= */
const Expertise = () => (
  <Section id="skills">
    <Container maxW="6xl">
      <Heading size="lg" mb={10}>
        Technical Expertise
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {[
          {
            title: "Frontend Engineering",
            desc: "Modern, accessible, and high-performance interfaces.",
            tech: "React · Framer Motion · Chakra UI",
          },
          {
            title: "Mobile Development",
            desc: "Cross-platform mobile apps with native-level UX.",
            tech: "React Native · Expo · Firebase",
          },
          {
            title: "Backend & Cloud",
            desc: "Scalable APIs, auth systems, and media pipelines.",
            tech: "Node.js · Firebase · Cloudinary",
          },
        ].map((item) => (
          <MotionBox
            key={item.title}
            p={8}
            rounded="2xl"
            bg="whiteAlpha.50"
            border="1px solid"
            borderColor="whiteAlpha.100"
            whileHover={{ y: -6 }}
          >
            <Heading size="md" mb={3}>
              {item.title}
            </Heading>
            <Text color="gray.400" mb={4}>
              {item.desc}
            </Text>
            <Text fontSize="sm" color="teal.300">
              {item.tech}
            </Text>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Container>
  </Section>
);

/* ========= WORK ========= */
const Work = () => (
  <Section id="work">
    <Container maxW="6xl">
      <Heading size="lg" mb={10}>
        Selected Work
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {PROJECTS.map((project) => (
          <MotionBox
            key={project.title}
            rounded="2xl"
            overflow="hidden"
            bg="whiteAlpha.50"
            border="1px solid"
            borderColor="whiteAlpha.100"
            whileHover={{ y: -8 }}
          >
            <Image src={project.img} alt={project.title} />

            <Box p={6}>
              <Heading size="md" mb={2}>
                {project.title}
              </Heading>

              <Text color="gray.400" mb={4}>
                {project.desc}
              </Text>

              <Text fontSize="sm" color="teal.300" mb={4}>
                {project.tech}
              </Text>

              <Link
                href={project.link}
                isExternal
                color="teal.400"
                fontWeight="semibold"
              >
                View project →
              </Link>
            </Box>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Container>
  </Section>
);

/* ========= CONTACT ========= */
const Contact = () => (
  <Section id="contact">
    <Container maxW="5xl" textAlign="center">
      <Heading size="lg" mb={6}>
        Let’s work together
      </Heading>

      <Text color="gray.400" mb={10}>
        Open to engineering roles, startup collaborations, and product-driven teams.
      </Text>

      <HStack spacing={6} justify="center">
        <Button
          as="a"
          href="mailto:adeyanjuolamilekan080@gmail.com"
          leftIcon={<Mail size={18} />}
        >
          Email
        </Button>
        <Button
          as="a"
          href="https://github.com/Ade-yanju"
          leftIcon={<Github size={18} />}
          variant="outline"
        >
          GitHub
        </Button>
        <Button
          as="a"
          href="https://www.linkedin.com/"
          leftIcon={<Linkedin size={18} />}
          variant="outline"
        >
          LinkedIn
        </Button>
      </HStack>
    </Container>
  </Section>
);

/* ========= FOOTER ========= */
const Footer = () => (
  <Box py={8} textAlign="center" color="gray.500">
    © {new Date().getFullYear()} Olamilekan Adeyanju Ogunyade
  </Box>
);

/* ========= EXPORT ========= */
export default function Portfolio() {
  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <Work />
      <Contact />
      <Footer />
    </>
  );
}
