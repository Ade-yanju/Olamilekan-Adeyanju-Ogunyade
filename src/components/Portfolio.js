import React, { useRef, useEffect } from "react";
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
  Badge,
  Icon,
  chakra,
  shouldForwardProp,
} from "@chakra-ui/react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
  isValidMotionProp,
} from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Cpu, Layout, Globe } from "lucide-react";

/* ===================== ASSETS ===================== */
// (Assuming these paths remain the same as your setup)
import profileImage from "../assets/profile.jpg";
import omiHealthImg from "../assets/omi-health.jpg";
import duAlumniImg from "../assets/du-alumni.jpg";
import VodiumImg from "../assets/Vodium-logo.png";
import HillstarImg from "../assets/hillstar.png";

/* ===================== CONFIG & MOTION ===================== */
const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ===================== COMPONENTS ===================== */

const SpotlightCard = ({ children, ...props }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <MotionBox
      onMouseMove={onMouseMove}
      role="group"
      position="relative"
      rounded="2xl"
      border="1px solid"
      borderColor="whiteAlpha.100"
      bg="whiteAlpha.50"
      p={8}
      overflow="hidden"
      _hover={{ borderColor: "teal.500" }}
      transition="border-color 0.3s ease"
      {...props}
    >
      <MotionBox
        position="absolute"
        inset="-1px"
        rounded="inherit"
        pointerEvents="none"
        bg={useTransform(
          [mouseX, mouseY],
          ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(20, 184, 166, 0.15), transparent 80%)`
        )}
      />
      {children}
    </MotionBox>
  );
};

const BackgroundEffects = () => (
  <Box position="fixed" inset={0} zIndex={0} pointerEvents="none" overflow="hidden">
    {/* Engineering Grid */}
    <Box
      inset={0}
      position="absolute"
      opacity={0.03}
      style={{
        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    />
    {/* Noise Texture Overaly */}
    <Box
      inset={0}
      position="absolute"
      opacity={0.02}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  </Box>
);

/* ===================== SECTIONS ===================== */

const Hero = () => {
  return (
    <Container maxW="7xl" pt={{ base: 32, md: 48 }} pb={20} position="relative" zIndex={1}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16} alignItems="center">
        <MotionBox initial="hidden" animate="visible" variants={containerVariants}>
          <MotionBox variants={itemVariants}>
            <Badge colorScheme="teal" variant="outline" mb={4} px={3} py={1} rounded="full">
              Available for new opportunities
            </Badge>
            <Heading as="h1" size="4xl" fontWeight="800" letterSpacing="tight" lineHeight="0.9" mb={6}>
              Olamilekan <chakra.span color="teal.400">Ogunyade</chakra.span>
            </Heading>
          </MotionBox>

          <MotionBox variants={itemVariants}>
            <Text fontSize="xl" color="gray.400" mb={10} maxW="lg">
              Software Engineer specialized in building high-performance 
              <chakra.span color="white"> Frontend Systems </chakra.span> and 
              <chakra.span color="white"> Mobile Products</chakra.span>.
            </Text>
          </MotionBox>

          <MotionBox variants={itemVariants}>
            <HStack spacing={4}>
              <Button size="lg" colorScheme="teal" px={8} rightIcon={<ExternalLink size={18} />}>
                View Work
              </Button>
              <HStack spacing={4} ml={4}>
                <Icon as={Github} boxSize={6} color="gray.500" _hover={{ color: "white" }} cursor="pointer" />
                <Icon as={Linkedin} boxSize={6} color="gray.500" _hover={{ color: "white" }} cursor="pointer" />
              </HStack>
            </HStack>
          </MotionBox>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          position="relative"
        >
          <Box
            position="absolute"
            inset="-10%"
            bg="teal.500"
            filter="blur(120px)"
            opacity={0.15}
            rounded="full"
          />
          <Image
            src={profileImage}
            rounded="3xl"
            border="1px solid"
            borderColor="whiteAlpha.200"
            filter="grayscale(20%)"
            _hover={{ filter: "grayscale(0%)" }}
            transition="0.5s ease"
          />
        </MotionBox>
      </SimpleGrid>
    </Container>
  );
};

const Work = () => {
  const PROJECTS = [
    {
      title: "OMI Health",
      category: "Healthcare · Mobile",
      desc: "Architected a bilingual telehealth system reducing appointment wait times by 40%.",
      tech: ["React Native", "Firebase", "Expo"],
      image: omiHealthImg
    },
    {
      title: "DU Alumni",
      category: "Community · Web",
      desc: "Full-stack engagement platform with real-time networking and event management.",
      tech: ["React", "Firebase", "Cloudinary"],
      image: duAlumniImg
    },
    {
      title: "Vodium",
      category: "Fintech · Mobile",
      desc: "Biometric-secured digital wallet with integrated concierge and analytics dashboard.",
      tech: ["ReactNative", "Biometrics", "Fintech"],
      image: VodiumImg
    },
    {
      title: "Hillstar",
      category: "Real Estate · Web",
      desc: "Dynamic real estate SPA with headless CMS functionality and Cloudinary integration.",
      tech: ["React", "Headless CMS", "Vercel"],
      image: HillstarImg
    }
  ];

  return (
    <Container maxW="7xl" py={32}>
      <Stack spacing={16}>
        <Box>
          <Text color="teal.400" fontWeight="bold" letterSpacing="widest" mb={2}>PORTFOLIO</Text>
          <Heading size="2xl">Featured Engineering Projects</Heading>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {PROJECTS.map((proj, i) => (
            <SpotlightCard key={i} p={0}>
              <Box overflow="hidden" h="300px">
                <Image 
                  src={proj.image} 
                  w="100%" h="100%" 
                  objectFit="cover" 
                  transition="0.5s ease"
                  _groupHover={{ transform: "scale(1.05)" }}
                />
              </Box>
              <Stack p={8} spacing={4}>
                <Text fontSize="xs" fontWeight="bold" color="teal.400" textTransform="uppercase">
                  {proj.category}
                </Text>
                <Heading size="lg">{proj.title}</Heading>
                <Text color="gray.400">{proj.desc}</Text>
                <HStack wrap="wrap" spacing={2}>
                  {proj.tech.map(t => (
                    <Badge key={t} bg="whiteAlpha.100" color="gray.300" variant="solid" px={2}>
                      {t}
                    </Badge>
                  ))}
                </HStack>
              </Stack>
            </SpotlightCard>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

const Expertise = () => {
  const SKILLS = [
    { title: "Frontend Architecture", icon: Layout, desc: "Building modular, scalable UI systems using React & Next.js." },
    { title: "Mobile Development", icon: Cpu, desc: "Cross-platform engineering with React Native & Expo ecosystem." },
    { title: "Cloud Systems", icon: Globe, desc: "Serverless deployments, Real-time DBs, and Media pipelines." }
  ];

  return (
    <Box bg="whiteAlpha.50" py={32}>
      <Container maxW="7xl">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12}>
          {SKILLS.map((skill, i) => (
            <Stack key={i} spacing={6}>
              <Icon as={skill.icon} boxSize={10} color="teal.400" />
              <Heading size="md">{skill.title}</Heading>
              <Text color="gray.400" lineHeight="tall">{skill.desc}</Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

/* ===================== MAIN LAYOUT ===================== */

export default function App() {
  return (
    <Box bg="#020617" color="gray.100" minH="100vh" selection={{ bg: "teal.400", color: "white" }}>
      <BackgroundEffects />
      
      <Box position="relative" zIndex={1}>
        <Hero />
        <Expertise />
        <Work />
        
        {/* Contact Footer */}
        <Container maxW="7xl" py={32} textAlign="center">
          <SpotlightCard maxW="3xl" mx="auto" py={16}>
            <Heading size="2xl" mb={6}>Ready to build?</Heading>
            <Text color="gray.400" fontSize="lg" mb={10}>
              Currently seeking Senior/Mid-level roles in product-driven teams.
            </Text>
            <Button size="lg" colorScheme="teal" px={10} as="a" href="mailto:adeyanjuolamilekan080@gmail.com">
              Start a Conversation
            </Button>
          </SpotlightCard>
          
          <Box mt={20} color="gray.600" fontSize="sm">
            © {new Date().getFullYear()} OGUNYADE · ENGINEERED WITH REACT & CHAKRA
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
