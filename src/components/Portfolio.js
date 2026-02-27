import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  HStack,
  Badge,
  Icon,
  Button,
  chakra,
  Input,
  Kbd,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import {
  Terminal as TermIcon,
  Cpu,
  Github,
  Linkedin,
  Zap,
  Activity,
  ChevronRight,
  Monitor,
  Database,
  Code2,
  ExternalLink,
  GitBranch,
} from "lucide-react";

/* ===================== MOTION FACTORY (V3) ===================== */
const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

/* ===================== ARCHITECTURE VISUALIZER ===================== */
const StackMap = () => (
  <Box
    p={4}
    borderLeft="2px solid"
    borderColor="teal.500"
    bg="whiteAlpha.50"
    fontFamily="mono"
    fontSize="2xs"
  >
    <Text color="teal.300" mb={2}>
      [STACK_MANIFEST_v5.0]
    </Text>
    <Stack spacing={1}>
      <Text>├─ FRONTEND: [React, Next.js, Framer Motion]</Text>
      <Text>├─ MOBILE: [React Native, Expo, Native Modules]</Text>
      <Text>├─ BACKEND: [Node.js, Serverless Functions]</Text>
      <Text>└─ DB/INFRA: [Firebase, Firestore, Cloudinary]</Text>
    </Stack>
  </Box>
);

/* ===================== CORE SYSTEM ===================== */

export default function EngineeringDashboard() {
  const [termInput, setTermInput] = useState("");
  const [showStackMap, setShowStackMap] = useState(false);
  const [logs, setLogs] = useState([
    {
      cmd: "sys_boot",
      res: "Olamilekan Ogunyade Engineering Core v5.0.0-PROD initialized.",
    },
    { cmd: "env_check", res: "Identity Verified: Software Architect." },
  ]);
  const [time, setTime] = useState("");
  const logEndRef = useRef(null);

  useEffect(() => {
    const updateTime = () =>
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (cmd, res, type = "sys") => {
    setLogs((prev) => [...prev.slice(-12), { cmd, res, type }]);
  };

  const handleTerminal = (e) => {
    if (e.key === "Enter") {
      const input = termInput.toLowerCase().trim();
      let res = "COMMAND_NOT_FOUND. Type 'help' for available directives.";

      switch (input) {
        case "help":
          res = "DIRECTIVES: projects, stack, status, clear, contact.";
          break;
        case "status":
          res = "UPLINK: 980Mbps | CPU_LOAD: 12% | LATENCY: 8ms";
          break;
        case "projects":
          res = "INDEXING_REPOS: OMI_HEALTH, VODIUM, HILLSTAR, DU_ALUMNI...";
          break;
        case "stack":
          res = "INITIALIZING_STACK_MAP_PROTOCOL...";
          setShowStackMap(true);
          break;
        case "contact":
          res = "MAIL_PROTOCOL: adeyanjuolamilekan080@gmail.com";
          break;
        case "clear":
          setLogs([]);
          setShowStackMap(false);
          setTermInput("");
          return;
        default:
          break;
      }
      addLog(termInput, res);
      setTermInput("");
    }
  };

  const PROJECTS = [
    {
      id: "01",
      name: "OMI_HEALTH",
      tech: "React Native / Firebase",
      link: "https://expo.dev/artifacts/eas/s8LgczG1J7EgAwLrMLdLno.apk",
    },
    { id: "02", name: "VODIUM", tech: "ReactNative / Fintech", link: "#" },
    {
      id: "03",
      name: "DU_ALUMNI",
      tech: "React / Cloudinary",
      link: "https://du-alumni-steel.vercel.app/",
    },
    {
      id: "04",
      name: "HILLSTAR",
      tech: "React / Headless CMS",
      link: "https://hillstar-realestate.vercel.app/",
    },
  ];

  return (
    <Box
      bg="#02040a"
      color="gray.100"
      minH="100vh"
      position="relative"
      fontFamily="mono"
      overflowX="hidden"
    >
      {/* Background Grid */}
      <Box
        position="fixed"
        inset={0}
        opacity={0.04}
        zIndex={0}
        pointerEvents="none"
        style={{
          backgroundImage: `linear-gradient(#14b8a6 1px, transparent 1px), linear-gradient(90deg, #14b8a6 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* TOP HUD BAR */}
      <Box
        borderBottom="1px solid"
        borderColor="whiteAlpha.100"
        bg="rgba(2, 4, 10, 0.8)"
        backdropFilter="blur(15px)"
        position="sticky"
        top={0}
        zIndex={100}
      >
        <Container maxW="8xl" py={2}>
          <HStack justify="space-between">
            <HStack spacing={6}>
              <HStack color="teal.400" spacing={2}>
                <GitBranch size={14} />
                <Text fontSize="2xs" fontWeight="bold">
                  PROD_BRANCH_V5
                </Text>
              </HStack>
              <Text fontSize="2xs" color="gray.600">
                RUNTIME: {time}
              </Text>
              <Badge variant="outline" colorScheme="teal" fontSize="2xs" px={2}>
                SYSTEM: ONLINE
              </Badge>
            </HStack>
            <HStack spacing={8} fontSize="2xs" fontWeight="bold">
              <Link href="https://github.com/Ade-yanju" isExternal>
                /GITHUB
              </Link>
              <Link href="mailto:adeyanjuolamilekan080@gmail.com">/MAIL</Link>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* HERO SECTION */}
      <Container maxW="8xl" pt={24} pb={20} position="relative" zIndex={1}>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={20}
          alignItems="center"
        >
          <Stack spacing={8}>
            <Box>
              <HStack color="teal.500" mb={3} spacing={3}>
                <Activity size={18} />
                <Text fontSize="xs" fontWeight="black" letterSpacing="0.4em">
                  SOFTWARE_ENGINEER
                </Text>
              </HStack>
              <Heading
                size="4xl"
                letterSpacing="-0.06em"
                lineHeight="0.85"
                fontWeight="900"
              >
                OLAMILEKAN <br />
                <chakra.span
                  color="teal.500"
                  textShadow="0 0 25px rgba(20, 184, 166, 0.3)"
                >
                  OGUNYADE
                </chakra.span>
              </Heading>
            </Box>

            <Text
              fontSize="lg"
              color="gray.400"
              maxW="500px"
              lineHeight="1.6"
              borderLeft="4px solid"
              borderColor="teal.600"
              pl={8}
            >
              Building performant frontend systems and native mobile
              infrastructure with clean code protocols.
            </Text>

            <HStack spacing={4}>
              <Button
                size="lg"
                bg="teal.600"
                color="white"
                rounded="none"
                px={10}
                h="60px"
                _hover={{ bg: "teal.500", transform: "translateY(-2px)" }}
                leftIcon={<Zap size={18} />}
              >
                SYNC_REPOS
              </Button>
            </HStack>
          </Stack>

          {/* REAL-TIME MONITOR */}
          <MotionBox
            p={10}
            bg="whiteAlpha.50"
            border="1px solid"
            borderColor="whiteAlpha.100"
            position="relative"
          >
            <Box
              position="absolute"
              top={0}
              right={0}
              bg="teal.500"
              color="black"
              px={2}
              py={1}
              fontSize="2xs"
              fontWeight="bold"
            >
              NETWORK_TELEMETRY
            </Box>
            <Stack spacing={6}>
              <HStack justify="space-between">
                <Text fontSize="xs" color="gray.400">
                  REACT_JS
                </Text>
                <Text color="teal.400" fontSize="xs">
                  ACTIVE
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="xs" color="gray.400">
                  REACT_NATIVE
                </Text>
                <Text color="teal.400" fontSize="xs">
                  OPTIMIZED
                </Text>
              </HStack>
              <Box pt={4}>
                <Text fontSize="2xs" color="gray.600" mb={2}>
                  BUILD_STABILITY_INDEX
                </Text>
                <Box h="1px" bg="whiteAlpha.200" w="100%">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "92%" }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{
                      height: "100%",
                      background: "#14b8a6",
                      boxShadow: "0 0 10px #14b8a6",
                    }}
                  />
                </Box>
              </Box>
            </Stack>
          </MotionBox>
        </SimpleGrid>
      </Container>

      {/* PROJECTS SECTION */}
      <Container maxW="8xl" py={12} mb={40}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {PROJECTS.map((proj) => (
            <MotionBox
              key={proj.id}
              p={8}
              bg="whiteAlpha.50"
              border="1px solid"
              borderColor="whiteAlpha.100"
              _hover={{ borderColor: "teal.500", bg: "whiteAlpha.100" }}
              cursor="pointer"
            >
              <Text color="teal.500" fontSize="2xs" mb={4}>
                [RE_0{proj.id}]
              </Text>
              <Heading size="md" mb={2}>
                {proj.name}
              </Heading>
              <Text fontSize="xs" color="gray.500" mb={6}>
                {proj.tech}
              </Text>
              <Link href={proj.link} isExternal>
                <Button
                  size="xs"
                  variant="outline"
                  colorScheme="teal"
                  rounded="none"
                  w="full"
                >
                  ACCESS_REPO
                </Button>
              </Link>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Container>

      {/* TERMINAL HUD */}
      <Box
        position="fixed"
        bottom={0}
        insetX={0}
        bg="rgba(2, 4, 10, 0.98)"
        backdropFilter="blur(25px)"
        borderTop="2px solid"
        borderColor="teal.900"
        zIndex={1100}
      >
        <Container maxW="8xl" py={4}>
          <Box
            maxH="180px"
            overflowY="auto"
            mb={3}
            pr={4}
            css={{
              "&::-webkit-scrollbar": { width: "3px" },
              "&::-webkit-scrollbar-thumb": { background: "#14b8a6" },
            }}
          >
            {logs.map((log, i) => (
              <Box key={i} mb={1}>
                <HStack
                  color="blue.400"
                  spacing={2}
                  fontFamily="mono"
                  fontSize="2xs"
                >
                  <Text opacity={0.6}>[ADE_ENGINE]~#</Text>
                  <Text color="gray.100">{log.cmd}</Text>
                </HStack>
                <Text
                  color="gray.500"
                  ml={4}
                  borderLeft="1px solid"
                  borderColor="whiteAlpha.200"
                  pl={3}
                  fontSize="2xs"
                >
                  {log.res}
                </Text>
              </Box>
            ))}
            {showStackMap && <StackMap />}
            <div ref={logEndRef} />
          </Box>
          <HStack
            spacing={4}
            borderTop="1px solid"
            borderColor="whiteAlpha.100"
            pt={3}
          >
            <Icon as={TermIcon} color="teal.500" boxSize={4} />
            <Input
              variant="unstyled"
              fontSize="xs"
              placeholder="TYPE DIRECTIVE (help, stack, projects)..."
              value={termInput}
              onChange={(e) => setTermInput(e.target.value)}
              onKeyDown={handleTerminal}
              autoFocus
            />
            <HStack spacing={6} opacity={0.3} fontSize="2xs" fontWeight="bold">
              <Text>UPLINK: ACTIVE</Text>
              <Kbd bg="whiteAlpha.100">ENTER</Kbd>
            </HStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
}
