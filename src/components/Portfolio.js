// src/components/Portfolio.js
import React, { useEffect, useRef, useState } from "react";

// ---- Assets (raster) ----
import profileImage from "../assets/profile.jpg";
import omiHealthImg from "../assets/omi-health.jpg";
import duAlumniImg from "../assets/du-alumni.jpg";
import ibadanJollofImg from "../assets/ibadan-jollof.jpg";
import raffleDrawImg from "../assets/raffle-draw.jpg";
import hillstarImg from "../assets/hillstar.png";
import alxLogo from "../assets/alx-logo.png";
import duLogo from "../assets/du-logo.png";

// ---- Assets (SVG logos for cubes) ----
import reactLogo from "../assets/react.svg";
import expoLogo from "../assets/expo.svg";
import firebaseLogo from "../assets/firebase.svg";
import nodeLogo from "../assets/nodejs.svg";
import cloudinaryLogo from "../assets/cloudinary.svg";
import githubLogo from "../assets/github.svg";

// ---- Chakra v3 ----
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
  Separator,
  chakra,
} from "@chakra-ui/react";

// ---- Motion ----
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  animate,
} from "framer-motion";

// ---- Icons ----
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

// ---- Color mode toggle (your existing helper) ----
import { ColorModeIconButton } from "../color-mode";

// Motion wrappers
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionImage = motion(Image);

// Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(2px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// -------------------- Utilities --------------------
const Magnetic = ({ strength = 0.2, children, ...props }) => {
  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });
  const ref = useRef(null);
  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <MotionBox
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      display="inline-flex"
      {...props}
    >
      {children}
    </MotionBox>
  );
};

const Counter = ({
  from = 0,
  to = 100,
  duration = 1.6,
  suffix = "",
  ...props
}) => {
  const nodeRef = useRef(null);
  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        if (nodeRef.current)
          nodeRef.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [from, to, duration, suffix]);
  return <chakra.span ref={nodeRef} {...props} />;
};

const FloatingBlob = ({
  x = "10%",
  y = "10%",
  size = 280,
  color = "rgba(255,255,255,0.25)",
  duration = 12,
  delay = 0,
  parallax = 12,
}) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useTransform(mx, (v) => v / parallax);
  const ty = useTransform(my, (v) => v / parallax);
  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set(e.clientX - cx);
      my.set(e.clientY - cy);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);
  return (
    <MotionBox
      position="absolute"
      top={y}
      left={x}
      w={`${size}px`}
      h={`${size}px`}
      bg={color}
      rounded="full"
      style={{ x: tx, y: ty }}
      opacity={0.35}
      filter="blur(70px)"
      animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      pointerEvents="none"
    />
  );
};

const Parallax = ({ factor = 20, children, ...props }) => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useTransform(mx, (v) => v / factor);
  const ty = useTransform(my, (v) => v / factor);
  useEffect(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set(e.clientX - cx);
      my.set(e.clientY - cy);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);
  return (
    <MotionBox style={{ x: tx, y: ty }} {...props}>
      {children}
    </MotionBox>
  );
};

const FollowCursor = () => {
  const x = useSpring(-100, { stiffness: 300, damping: 30, mass: 0.6 });
  const y = useSpring(-100, { stiffness: 300, damping: 30, mass: 0.6 });
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
      top={0}
      left={0}
      style={{ x, y }}
      translateX="-50%"
      translateY="-50%"
      w="10px"
      h="10px"
      rounded="full"
      bg="pink.500"
      _dark={{ bg: "pink.300" }}
      boxShadow="0 0 0 6px rgba(236,72,153,0.15)"
      pointerEvents="none"
      zIndex={1000}
    />
  );
};

// -------------------- Data --------------------
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
  {
    title: "Real-Estate for HillStar",
    img: hillstarImg,
    desc: "Real-estate listing website for HillStar Real Estate.",
    link: "https://hillstar-realestate.vercel.app/",
  },
];
const EDUCATION = [
  {
    org: "ALX Africa",
    program: "AWS Cloud Computing (Nanodegree / Program)",
    period: "June 2025 – Present",
    status: "Currently studying",
    location: "Remote",
    logo: alxLogo,
  },
  {
    org: "Dominion University, Ibadan",
    program: "B.Sc. Software Engineering",
    period: "October 2021 – August 2025",
    status: "Completed",
    location: "Ibadan, Nigeria",
    logo: duLogo,
  },
  {
    org: "ALX Africa",
    program: "ALX AI Starter",
    period: "May 2025 – June 2025",
    status: "Completed",
    location: "Remote",
    logo: alxLogo,
  },
];
const SKILLS = [
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

// -------------------- UI building blocks --------------------
const SectionHeading = ({ icon: IconComp, title, kicker }) => (
  <MotionBox variants={fadeUp}>
    <HStack spacing={3} mb={2}>
      <Box
        as={IconComp}
        size="28"
        color="pink.600"
        _dark={{ color: "pink.300" }}
      />
      <Heading as="h2" size="lg">
        {title}
      </Heading>
    </HStack>
    {kicker ? (
      <Text color="gray.600" _dark={{ color: "gray.300" }} mb={6}>
        {kicker}
      </Text>
    ) : null}
  </MotionBox>
);

const ProjectCard = ({ title, img, desc, link }) => (
  <MotionBox
    variants={fadeUp}
    whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
    transition={{ type: "spring", stiffness: 260, damping: 18 }}
    border="1px solid"
    borderColor="pink.200"
    _dark={{ borderColor: "pink.900" }}
    bg="white"
    _dark={{ bg: "gray.800" }}
    rounded="2xl"
    overflow="hidden"
    shadow="lg"
    position="relative"
  >
    <Box
      position="absolute"
      top="-40%"
      left="-10%"
      w="120%"
      h="80%"
      bg="whiteAlpha.300"
      _dark={{ bg: "whiteAlpha.100" }}
      transform="rotate(-8deg)"
      filter="blur(30px)"
      pointerEvents="none"
    />
    <ChakraLink href={link} isExternal _hover={{ textDecoration: "none" }}>
      <Box position="relative" h="210px" overflow="hidden">
        <MotionImage
          src={img}
          alt={title}
          h="100%"
          w="100%"
          objectFit="cover"
          initial={{ scale: 1.08 }}
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.35 }}
        />
      </Box>
      <Box p={5}>
        <HStack
          spacing={2}
          mb={2}
          color="pink.700"
          _dark={{ color: "pink.300" }}
        >
          <Briefcase size={20} />
          <Heading as="h3" size="md">
            {title}
          </Heading>
        </HStack>
        <Text color="gray.600" _dark={{ color: "gray.300" }}>
          {desc}
        </Text>
        <HStack
          mt={4}
          color="pink.600"
          _dark={{ color: "pink.300" }}
          fontWeight="semibold"
        >
          <Sparkles size={16} />
          <Text>View case study</Text>
          <ChevronRight size={18} />
        </HStack>
      </Box>
    </ChakraLink>
  </MotionBox>
);

const EducationCard = ({ logo, org, program, period, status, location }) => {
  const statusVariant = (() => {
    const s = (status || "").toLowerCase();
    if (s.includes("completed")) return "green";
    if (s.includes("progress") || s.includes("currently")) return "yellow";
    return "gray";
  })();
  return (
    <MotionFlex
      variants={fadeUp}
      whileHover={{ y: -6, rotateZ: -0.4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      border="1px solid"
      borderColor="pink.200"
      _dark={{ borderColor: "pink.900" }}
      bg="white"
      _dark={{ bg: "gray.800" }}
      rounded="2xl"
      p={4}
      gap={4}
      align="center"
      shadow="md"
      minH="110px"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        right="-20%"
        bottom="-30%"
        w="60%"
        h="60%"
        bg="pink.200"
        _dark={{ bg: "pink.800" }}
        filter="blur(60px)"
        opacity={0.35}
        pointerEvents="none"
        rounded="full"
      />
      <Image
        src={logo}
        alt={`${org} logo`}
        boxSize="64px"
        objectFit="contain"
        rounded="lg"
        bg="gray.50"
        _dark={{ bg: "gray.700" }}
        border="1px solid"
        borderColor="gray.200"
        _dark={{ borderColor: "gray.600" }}
      />
      <Box flex="1">
        <Heading
          as="h3"
          size="sm"
          color="pink.700"
          _dark={{ color: "pink.300" }}
        >
          {org}
        </Heading>
        <Text fontSize="sm" mt={1}>
          {program}
        </Text>
        <HStack spacing={3} mt={2} wrap="wrap">
          <Badge colorScheme={statusVariant} rounded="full">
            {status}
          </Badge>
          <Text fontSize="sm" color="gray.600" _dark={{ color: "gray.300" }}>
            {period} • {location}
          </Text>
        </HStack>
      </Box>
    </MotionFlex>
  );
};

const SocialButton = ({ href, label, icon, brand }) => {
  const brands = {
    linkedin: { color: "#0A66C2", fg: "white" },
    github: { color: "#181717", fg: "white" },
    email: { color: "#EA4335", fg: "white" },
  };
  const b = brands[brand] || { color: "#6B7280", fg: "white" };
  return (
    <ChakraLink href={href} isExternal _hover={{ textDecoration: "none" }}>
      <Magnetic>
        <Button
          size="md"
          leftIcon={icon}
          variant="outline"
          rounded="full"
          px={5}
          fontWeight="semibold"
          borderColor="gray.300"
          _dark={{ borderColor: "gray.600" }}
          _hover={{
            bg: b.color,
            color: b.fg,
            borderColor: b.color,
            transform: "translateY(-2px)",
          }}
        >
          {label}
        </Button>
      </Magnetic>
    </ChakraLink>
  );
};

// --- Reusable 360° Cube (auto-rotate immediately; drag/zoom/reset) ---
const TechCube = ({
  title,
  faces,
  autoSpeed = 0.25 /* degrees per frame */,
}) => {
  // useMotionValue so we can read/write raw numbers easily
  const rotX = useMotionValue(-20);
  const rotY = useMotionValue(0);
  const zoom = useSpring(1, { stiffness: 120, damping: 20 });

  const isDragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const onPointerDown = (e) => {
    isDragging.current = true;
    last.current = {
      x: e.clientX ?? e.touches?.[0]?.clientX,
      y: e.clientY ?? e.touches?.[0]?.clientY,
    };
  };
  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const cx = e.clientX ?? e.touches?.[0]?.clientX;
    const cy = e.clientY ?? e.touches?.[0]?.clientY;
    const dx = cx - last.current.x;
    const dy = cy - last.current.y;
    last.current = { x: cx, y: cy };
    rotY.set((rotY.get() + dx * 0.35) % 360);
    const nextX = Math.max(-85, Math.min(85, rotX.get() - dy * 0.35));
    rotX.set(nextX);
  };
  const onPointerUp = () => (isDragging.current = false);
  const onWheel = (e) => {
    e.preventDefault();
    const next = Math.max(
      0.7,
      Math.min(1.6, zoom.get() + (e.deltaY > 0 ? -0.08 : 0.08))
    );
    zoom.set(next);
  };
  const onDouble = () => {
    rotX.set(-20);
    rotY.set(0);
    zoom.set(1);
  };

  // Auto-rotate from the moment the component mounts
  useEffect(() => {
    let raf;
    const tick = () => {
      if (!isDragging.current) {
        rotY.set((rotY.get() + autoSpeed) % 360);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [rotY, autoSpeed]);

  return (
    <Container maxW="6xl" py={{ base: 12, md: 16 }}>
      <Box textAlign="center" mb={6}>
        <HStack spacing={3} justify="center">
          <Box
            as={Rocket}
            size="28"
            color="pink.600"
            _dark={{ color: "pink.300" }}
          />
          <Heading size="lg">{title}</Heading>
        </HStack>
        <Text mt={2} color="gray.600" _dark={{ color: "gray.300" }}>
          Drag to rotate • Scroll to zoom • Double-click to reset
        </Text>
      </Box>

      <MotionBox
        role="group"
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
        onWheel={onWheel}
        onDoubleClick={onDouble}
        position="relative"
        mx="auto"
        w={{ base: "320px", md: "420px" }}
        h={{ base: "320px", md: "420px" }}
        perspective="1400px"
        cursor="grab"
        _active={{ cursor: "grabbing" }}
        userSelect="none"
      >
        <MotionBox
          style={{ rotateX: rotX, rotateY: rotY, scale: zoom }}
          position="absolute"
          inset={0}
          margin="auto"
          transformStyle="preserve-3d"
        >
          {faces.map((f, idx) => (
            <Box
              key={f.label + idx}
              className={`face face-${idx}`}
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w={{ base: "230px", md: "300px" }}
              h={{ base: "230px", md: "300px" }}
              rounded="2xl"
              border="1px solid"
              borderColor="whiteAlpha.600"
              _dark={{ borderColor: "whiteAlpha.200" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              color="gray.800"
              _dark={{ color: "gray.100" }}
              boxShadow="0 30px 80px rgba(0,0,0,0.20)"
              style={{ background: f.bg }}
              _dark={{ style: { background: f.darkBg ?? f.bg } }}
            >
              <VStack spacing={3}>
                <Image
                  src={f.logo}
                  alt={`${f.label} logo`}
                  maxH={{ base: "72px", md: "96px" }}
                  maxW="82%"
                  filter="drop-shadow(0 10px 26px rgba(0,0,0,0.25))"
                />
                <HStack color="pink.600" _dark={{ color: "pink.300" }}>
                  <Cpu size={18} />
                  <Text fontWeight="semibold">{f.label}</Text>
                </HStack>
              </VStack>
            </Box>
          ))}
        </MotionBox>

        {/* face positions */}
        <style>{`
          .face-0 { transform: translate(-50%, -50%) rotateY(0deg) translateZ(150px); }
          .face-1 { transform: translate(-50%, -50%) rotateY(90deg) translateZ(150px); }
          .face-2 { transform: translate(-50%, -50%) rotateY(180deg) translateZ(150px); }
          .face-3 { transform: translate(-50%, -50%) rotateY(-90deg) translateZ(150px); }
          .face-4 { transform: translate(-50%, -50%) rotateX(90deg) translateZ(150px); }
          .face-5 { transform: translate(-50%, -50%) rotateX(-90deg) translateZ(150px); }
          @media (min-width: 768px) {
            .face-0 { transform: translate(-50%, -50%) rotateY(0deg) translateZ(190px); }
            .face-1 { transform: translate(-50%, -50%) rotateY(90deg) translateZ(190px); }
            .face-2 { transform: translate(-50%, -50%) rotateY(180deg) translateZ(190px); }
            .face-3 { transform: translate(-50%, -50%) rotateY(-90deg) translateZ(190px); }
            .face-4 { transform: translate(-50%, -50%) rotateX(90deg) translateZ(190px); }
            .face-5 { transform: translate(-50%, -50%) rotateX(-90deg) translateZ(190px); }
          }
        `}</style>

        <Box
          position="absolute"
          bottom="10px"
          right="14px"
          fontSize="xs"
          color="gray.600"
          _dark={{ color: "gray.300" }}
          opacity={0.8}
          pointerEvents="none"
        >
          Drag • Scroll • Double-click
        </Box>
      </MotionBox>
    </Container>
  );
};

// -------------------- Main --------------------
const Portfolio = () => {
  const [whichCube, setWhichCube] = useState("web"); // 'web' | 'mobile'

  const WEB_FACES = [
    {
      label: "React",
      logo: reactLogo,
      bg: "linear-gradient(135deg,#ECFEFF,#A5F3FC)",
      darkBg: "linear-gradient(135deg,#0B5563,#164E63)",
    },
    {
      label: "Expo",
      logo: expoLogo,
      bg: "linear-gradient(135deg,#F3F4F6,#E5E7EB)",
      darkBg: "linear-gradient(135deg,#111827,#374151)",
    },
    {
      label: "Firebase",
      logo: firebaseLogo,
      bg: "linear-gradient(135deg,#FFF3C4,#FFD166)",
      darkBg: "linear-gradient(135deg,#7C2D12,#78350F)",
    },
    {
      label: "NodeJS",
      logo: nodeLogo,
      bg: "linear-gradient(135deg,#D1FAE5,#A7F3D0)",
      darkBg: "linear-gradient(135deg,#064E3B,#065F46)",
    },
    {
      label: "Cloudinary",
      logo: cloudinaryLogo,
      bg: "linear-gradient(135deg,#E0E7FF,#C7D2FE)",
      darkBg: "linear-gradient(135deg,#3730A3,#6D28D9)",
    },
    {
      label: "GitHub",
      logo: githubLogo,
      bg: "linear-gradient(135deg,#F3F4F6,#E5E7EB)",
      darkBg: "linear-gradient(135deg,#0B0F14,#1F2937)",
    },
  ];

  const MOBILE_FACES = [
    {
      label: "React Native",
      logo: reactLogo,
      bg: "linear-gradient(135deg,#ECFEFF,#A5F3FC)",
      darkBg: "linear-gradient(135deg,#0B5563,#164E63)",
    },
    {
      label: "Expo",
      logo: expoLogo,
      bg: "linear-gradient(135deg,#F3F4F6,#E5E7EB)",
      darkBg: "linear-gradient(135deg,#111827,#374151)",
    },
    {
      label: "Firebase",
      logo: firebaseLogo,
      bg: "linear-gradient(135deg,#FFF3C4,#FFD166)",
      darkBg: "linear-gradient(135deg,#7C2D12,#78350F)",
    },
    {
      label: "React Native",
      logo: reactLogo,
      bg: "linear-gradient(135deg,#ECFEFF,#A5F3FC)",
      darkBg: "linear-gradient(135deg,#0B5563,#164E63)",
    },
    {
      label: "Expo",
      logo: expoLogo,
      bg: "linear-gradient(135deg,#F3F4F6,#E5E7EB)",
      darkBg: "linear-gradient(135deg,#111827,#374151)",
    },
    {
      label: "Firebase",
      logo: firebaseLogo,
      bg: "linear-gradient(135deg,#FFF3C4,#FFD166)",
      darkBg: "linear-gradient(135deg,#7C2D12,#78350F)",
    },
  ];

  return (
    <Box
      bg="pink.50"
      _dark={{ bg: "gray.950" }}
      minH="100dvh"
      position="relative"
      overflowX="hidden"
    >
      <FollowCursor />

      {/* Always-visible color-mode toggle */}
      <Box
        position="fixed"
        top={{ base: 3, md: 4 }}
        right={{ base: 3, md: 4 }}
        zIndex={1200}
      >
        <ColorModeIconButton
          aria-label="Toggle color mode"
          size="lg"
          rounded="full"
          border="2px solid"
          borderColor="whiteAlpha.700"
          _dark={{ borderColor: "whiteAlpha.300" }}
          bg="whiteAlpha.900"
          _dark={{ bg: "blackAlpha.600" }}
          boxShadow="lg"
        />
      </Box>

      {/* grain overlay */}
      <Box
        aria-hidden
        pointerEvents="none"
        position="fixed"
        inset={0}
        opacity={0.06}
        mixBlendMode="overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='2' seed='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/ filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* animated gradient & marquee styles */}
      <style>{`
        .animated-gradient {
          background: linear-gradient(120deg, #ec4899, #14b8a6, #a78bfa, #06b6d4);
          background-size: 300% 300%;
          animation: gradMove 18s ease infinite;
        }
        @keyframes gradMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .marquee { white-space: nowrap; overflow: hidden; position: relative; }
        .marquee span { display: inline-block; padding-left: 100%; animation: marquee 20s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
      `}</style>

      <MotionBox variants={containerVariants} initial="hidden" animate="show">
        {/* Hero */}
        <Box
          as="header"
          className="animated-gradient"
          color="whiteAlpha.900"
          py={{ base: 14, md: 18 }}
          position="relative"
          overflow="hidden"
        >
          <FloatingBlob
            x="8%"
            y="10%"
            size={260}
            color="rgba(255,255,255,0.25)"
            duration={12}
          />
          <FloatingBlob
            x="80%"
            y="20%"
            size={220}
            color="rgba(255,255,255,0.18)"
            duration={10}
            delay={1.2}
          />
          <FloatingBlob
            x="50%"
            y="70%"
            size={300}
            color="rgba(255,255,255,0.12)"
            duration={14}
            delay={0.6}
          />

          <Container maxW="6xl" position="relative">
            <Flex justify="flex-end" mb={2}>
              <Magnetic strength={0.12}>
                <ColorModeIconButton />
              </Magnetic>
            </Flex>

            <Parallax factor={25}>
              <MotionFlex
                variants={fadeUp}
                direction="column"
                align="center"
                textAlign="center"
                gap={6}
              >
                <Parallax factor={10}>
                  <MotionImage
                    src={profileImage}
                    alt="Profile"
                    boxSize={{ base: "110px", md: "140px" }}
                    rounded="full"
                    border="4px solid"
                    borderColor="whiteAlpha.700"
                    objectFit="cover"
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </Parallax>

                <Heading as="h1" size="2xl" letterSpacing="-0.02em">
                  <HStack spacing={3} justify="center">
                    <User size={30} />
                    <chakra.span>Olamilekan Adeyanju Ogunyade</chakra.span>
                  </HStack>
                </Heading>
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  maxW="3xl"
                  opacity={0.95}
                >
                  Software Engineer • Front-End Developer • Mobile App Developer
                  ·{" "}
                  <chakra.strong>
                    Currently studying AWS Cloud Computing at ALX
                  </chakra.strong>
                </Text>

                <Wrap spacing={{ base: 3, md: 5 }} justify="center">
                  {[
                    {
                      href: "#about",
                      icon: <Code size={18} />,
                      label: "About",
                    },
                    {
                      href: "#skills",
                      icon: <Layers size={18} />,
                      label: "Skills",
                    },
                    {
                      href: "#education",
                      icon: <GraduationCap size={18} />,
                      label: "Education",
                    },
                    {
                      href: "#projects",
                      icon: <Briefcase size={18} />,
                      label: "Projects",
                    },
                    {
                      href: "#contact",
                      icon: <Mail size={18} />,
                      label: "Contact",
                    },
                  ].map(({ href, icon, label }) => (
                    <WrapItem key={label}>
                      <Magnetic>
                        <Button
                          as="a"
                          href={href}
                          size="sm"
                          leftIcon={icon}
                          variant="outline"
                          color="white"
                          borderColor="whiteAlpha.700"
                          _hover={{
                            transform: "translateY(-2px)",
                            bg: "whiteAlpha.200",
                          }}
                        >
                          {label}
                        </Button>
                      </Magnetic>
                    </WrapItem>
                  ))}
                </Wrap>

                <Box w="100%" opacity={0.92} mt={4}>
                  <Box className="marquee" fontWeight="semibold">
                    <chakra.span as="span">
                      React • React Native • Firebase • Cloudinary • NodeJS •
                      Expo • UI/UX • REST APIs • Git/GitHub • JavaScript •
                      TypeScript • React • React Native • Firebase • Cloudinary
                      • NodeJS • Expo • UI/UX • REST APIs • Git/GitHub •
                      JavaScript • TypeScript •
                    </chakra.span>
                  </Box>
                </Box>
              </MotionFlex>
            </Parallax>
          </Container>
        </Box>

        {/* About */}
        <Parallax factor={30}>
          <Box as="section" id="about" py={{ base: 14, md: 20 }}>
            <Container maxW="5xl">
              <SectionHeading
                icon={User}
                title="About Me"
                kicker="Focused on shipping delightful, performant products with clear UX and measurable outcomes."
              />
              <MotionBox
                variants={fadeUp}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  lineHeight="tall"
                  color="gray.700"
                  _dark={{ color: "gray.300" }}
                >
                  Versatile and committed web & mobile app developer
                  specialising in React and React Native with real-world
                  experience building user-focused applications for mobile and
                  web. Proficient in Firebase, Cloudinary, REST APIs, Expo, and
                  UI/UX principles. Built production-grade healthcare apps and
                  delivered personal tools like a raffle draw system. Eager to
                  contribute to high-impact teams through internship or
                  employment.
                </Text>
              </MotionBox>
            </Container>
          </Box>
        </Parallax>

        {/* Skills (chips) */}
        <Parallax factor={40}>
          <Box
            as="section"
            id="skills"
            py={{ base: 14, md: 20 }}
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
                kicker="Tools & platforms I use to build and scale experiences."
              />
              <Wrap spacing={4}>
                {SKILLS.map(({ name, icon: IconComp }, idx) => (
                  <WrapItem key={name}>
                    <MotionBox
                      variants={fadeUp}
                      viewport={{ once: true, amount: 0.2 }}
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
                      whileHover={{ y: -3, scale: 1.02 }}
                      transition={{ duration: 0.15, delay: idx * 0.025 }}
                    >
                      <Box as={IconComp} size="16" />
                      {name}
                    </MotionBox>
                  </WrapItem>
                ))}
              </Wrap>
            </Container>
          </Box>
        </Parallax>

        {/* Education */}
        <Parallax factor={30}>
          <Box as="section" id="education" py={{ base: 14, md: 20 }}>
            <Container maxW="6xl">
              <SectionHeading icon={GraduationCap} title="Education" />
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {EDUCATION.map((e) => (
                  <EducationCard key={`${e.org}-${e.program}`} {...e} />
                ))}
              </SimpleGrid>
            </Container>
          </Box>
        </Parallax>

        {/* Cube switcher (Web / Mobile) */}
        <Box as="section" id="tech-cubes" py={{ base: 8, md: 10 }}>
          <Container maxW="6xl" textAlign="center">
            <HStack spacing={3} justify="center" mb={2}>
              <Button
                size="sm"
                variant="solid"
                colorScheme={whichCube === "web" ? "pink" : "gray"}
                rounded="full"
                onClick={() => setWhichCube("web")}
              >
                Web Stack
              </Button>
              <Button
                size="sm"
                variant="solid"
                colorScheme={whichCube === "mobile" ? "pink" : "gray"}
                rounded="full"
                onClick={() => setWhichCube("mobile")}
              >
                Mobile Stack
              </Button>
            </HStack>
          </Container>

          {whichCube === "web" ? (
            <TechCube
              title="Tech Cube • Web (360°)"
              faces={WEB_FACES}
              autoSpeed={0.25}
            />
          ) : (
            <TechCube
              title="Tech Cube • Mobile (360°)"
              faces={MOBILE_FACES}
              autoSpeed={0.25}
            />
          )}
        </Box>

        {/* Projects */}
        <Parallax factor={35}>
          <Box
            as="section"
            id="projects"
            py={{ base: 14, md: 20 }}
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
                kicker="Selected work. Hover for a little flair—click through for details."
              />
              <VStack align="stretch" spacing={4} mb={6}>
                <Heading
                  as="h3"
                  size="md"
                  color="gray.800"
                  _dark={{ color: "gray.100" }}
                >
                  Mobile
                </Heading>
                <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
                  {MOBILE_PROJECTS.map((p) => (
                    <ProjectCard key={p.title} {...p} />
                  ))}
                </SimpleGrid>
              </VStack>
              <Separator my={10} />
              <VStack align="stretch" spacing={4}>
                <Heading
                  as="h3"
                  size="md"
                  color="gray.800"
                  _dark={{ color: "gray.100" }}
                >
                  Web
                </Heading>
                <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
                  {WEB_PROJECTS.map((p) => (
                    <ProjectCard key={p.title} {...p} />
                  ))}
                </SimpleGrid>
              </VStack>
            </Container>
          </Box>
        </Parallax>

        {/* Contact */}
        <Parallax factor={25}>
          <Box as="section" id="contact" py={{ base: 14, md: 20 }}>
            <Container maxW="5xl">
              <SectionHeading
                icon={Mail}
                title="Contact"
                kicker="Let’s build something useful, fast, and beautiful."
              />
              <Stack
                direction={{ base: "column", sm: "row" }}
                spacing={6}
                justify="center"
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
            </Container>
          </Box>
        </Parallax>

        {/* Footer */}
        <Box
          as="footer"
          py={8}
          textAlign="center"
          bgGradient="linear(to-r, teal.100, pink.100)"
          _dark={{ bgGradient: "linear(to-r, teal.900, pink.900)" }}
        >
          <Container maxW="6xl">
            <Text fontSize="sm">
              &copy; {new Date().getFullYear()} Olamilekan Adeyanju Ogunyade.
              All Rights Reserved.
            </Text>
          </Container>
        </Box>
      </MotionBox>
    </Box>
  );
};

export default Portfolio;
