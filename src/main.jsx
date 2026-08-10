import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";
import profileImg from "../images/profile.png";
import logoImg from "../images/logo.png";

/* ─── DATA ─── */
const profile = {
  name: "BOMMI PRIYANKA",
  email: "bommipriyanka01@gmail.com",
  phone: "+91 6380355508",
  linkedin: "https://www.linkedin.com/in/bommi-priyanka-07255b406/",
  github: "https://github.com/BommiPriyanka",
  leetcode: "https://leetcode.com/u/bommipriyanka/",
};

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "beyond", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const SKILL_CATS = [
  { id: 'languages', label: 'LANGUAGES', subtitle: 'The syntax of logic.', items: ['C++', 'Python', 'Java', 'C'],                                              pos: { x: 22, y: 16 }, speed: 0.55 },
  { id: 'frontend',  label: 'FRONTEND',  subtitle: 'Where ideas meet the eye.',     items: ['HTML', 'CSS', 'JavaScript', 'React'],                                  pos: { x: 76, y: 11 }, speed: 0.75 },
  { id: 'backend',   label: 'BACKEND',   subtitle: 'The engine behind the curtain.', items: ['FastAPI', 'Node.js', 'Express.js'],                                   pos: { x: 92, y: 50 }, speed: 0.45 },
  { id: 'database',  label: 'DATABASE',  subtitle: 'Structured memory systems.',     items: ['MySQL', 'MongoDB', 'Supabase'],                                        pos: { x: 74, y: 86 }, speed: 0.65 },
  { id: 'ml',        label: 'ML / DATA', subtitle: 'The intelligence layer.',         items: ['NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow', 'Keras', 'PyTorch'],  pos: { x: 16, y: 83 }, speed: 0.85 },
  { id: 'tools',     label: 'TOOLS',     subtitle: 'Tools that build the builder.',   items: ['GitHub', 'Docker'],                                                   pos: { x: 4,  y: 50 }, speed: 0.38 },
];

const experience = [
  {
    role: "Web Developer",
    company: "CodeMinds",
    date: "April 2026 – Present",
    bullets: [
      "Developed a full-stack Handwritten OCR Text Extraction platform.",
      "Enabled users to upload handwritten documents and extract digital text.",
      "Integrated Supabase for authentication, database management, storage, and backend operations.",
      "Built responsive frontend workflows connected with backend services.",
    ],
    tags: ["OCR", "Supabase", "Full Stack", "Frontend", "Backend"],
  },
  {
    role: "Student Developer",
    company: "CubeAI Solutions",
    date: "January 2026 – March 2026",
    bullets: [
      "Developed backend platform using FastAPI and PostgreSQL.",
      "Implemented JWT authentication.",
      "Implemented role-based access control.",
      "Designed REST APIs for posts, events, and participant management.",
    ],
    tags: ["FastAPI", "PostgreSQL", "JWT", "REST API", "RBAC"],
  },
];

const projects = [
  {
    num: "01",
    title: "Glaucoma Prediction System",
    date: "September 2025",
    description:
      "Developed a deep learning glaucoma detection system using CNN and MobileNetV2 with retinal image preprocessing and evaluation.",
    tags: ["Python", "TensorFlow/Keras", "CNN", "MobileNetV2"],
    pipeline: ["Retinal Image", "Preprocessing", "CNN", "MobileNetV2", "Prediction"],
    github: profile.github,
  },
  {
    num: "02",
    title: "Restaurant Order Management",
    date: "August 2025",
    description:
      "Developed a C-based restaurant order management system implementing billing, menu handling, and file operations.",
    tags: ["C", "File Handling", "Structures"],
    pipeline: [],
    github: profile.github,
  },
];

const achievements = [
  { title: "Academic Excellence Award", sub: "2024", type: "academic", icon: "🎓" },
  { title: "Academic Excellence Award", sub: "2025", type: "academic", icon: "🎓" },
  { title: "3rd Prize", sub: "32nd Junior National Throwball Championship\nRanchi, Jharkhand", type: "sport", icon: "🏐" },
  { title: "3rd Prize", sub: "33rd Junior National Throwball Championship\nHimachal Pradesh", type: "sport", icon: "🏐" },
];

const certifications = [
  { org: "NPTEL", name: "Programming in Modern C++" },
  { org: "NASSCOM", name: "Data Processing & Visualisation" },
  { org: "Infosys Springboard", name: "Full Stack Development" },
];

/* ─── INTRO ─── */
function IntroScreen({ onEnter }) {
  const [done, setDone] = useState(false);
  const entered = useRef(false);

  const enter = () => {
    if (entered.current) return;
    entered.current = true;
    setDone(true);
    setTimeout(onEnter, 900);
  };

  useEffect(() => {
    const t = setTimeout(enter, 4200);
    window.addEventListener("wheel", enter, { once: true, passive: true });
    window.addEventListener("touchstart", enter, { once: true, passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("wheel", enter);
      window.removeEventListener("touchstart", enter);
    };
  }, []);

  return (
    <div id="intro" className={done ? "hide" : ""}>
      <div className="intro-grid" />
      <img src={logoImg} alt="BP Logo" className="intro-logo-img" />
      <h1 className="intro-name display" id="introName">
        {"BOMMI PRIYANKA".split("").map((ch, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.045}s` }}>
            {ch === " " ? "\u00A0\u00A0" : ch}
          </span>
        ))}
      </h1>
      <div className="intro-tag">AI/ML &nbsp;•&nbsp; FULL STACK &nbsp;•&nbsp; DATA</div>
      <div className="intro-enter" onClick={enter}>
        <span>Scroll to Enter</span>
        <div className="intro-line" />
      </div>
    </div>
  );
}

/* ─── NAVBAR ─── */
function TopNav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav id="top-nav" className={scrolled ? "scrolled" : ""}>
        <button className="nav-logo-btn" onClick={() => go("home")}>
          <img src={logoImg} alt="BP Logo" className="nav-logo-img" />
          <span className="top-nav-logo display">BOMMI PRIYANKA</span>
        </button>
        <div className="top-nav-links">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              className={`top-nav-link${active === id ? " active" : ""}`}
              onClick={() => go(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <button className="top-nav-cta" onClick={() => go("contact")}>
          Let's Connect
        </button>
        <button
          className={`top-nav-burger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="open"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map(({ id, label }) => (
              <button key={id} className="mobile-link" onClick={() => go(id)}>
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── DIRECTIONAL REVEAL WRAPPER ─── */
function Reveal({ children, delay = 0, direction = "left", className = "" }) {
  const getInitial = () => {
    if (direction === "left") return { opacity: 0, x: -60, y: 0 };
    if (direction === "right") return { opacity: 0, x: 60, y: 0 };
    if (direction === "up") return { opacity: 0, x: 0, y: 40 };
    return { opacity: 0, x: -60, y: 0 };
  };

  return (
    <motion.div
      className={className}
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.85,
        delay: delay / 1000,
        ease: [0.16, 0.8, 0.24, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── COUNT-UP ─── */
function CountUp({ target, decimal = false }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const ran = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !ran.current) {
          ran.current = true;
          const dur = 1400;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - start) / dur);
            const cur = target * p;
            setVal(decimal ? parseFloat(cur.toFixed(2)) : Math.round(cur));
            if (p < 1) requestAnimationFrame(tick);
            else setVal(target);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target, decimal]);
  return <span ref={ref}>{decimal ? val.toFixed(2) : val}</span>;
}

/* ─── PROFILE IMAGE ─── */
function ProfileImage() {
  const [broken, setBroken] = useState(false);
  return (
    <div className="hero-photo-wrap">
      <div className="photo-brush-bg" />
      <div className="photo-frame">
        {!broken ? (
          <img
            src={profileImg}
            alt="Bommi Priyanka"
            onError={() => setBroken(true)}
          />
        ) : (
          <div className="photo-placeholder">
            <div className="pp-icon">＋</div>
            <div className="pp-text">Place Your<br />Photo Here</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── TECH LOGO MAPPING ─── */
const TECH_ICONS = {
  "C++": "https://cdn.simpleicons.org/cplusplus/171717",
  "Python": "https://cdn.simpleicons.org/python/171717",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "C": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
  "HTML": "https://cdn.simpleicons.org/html5/171717",
  "CSS": "https://cdn.simpleicons.org/css3/171717",
  "JavaScript": "https://cdn.simpleicons.org/javascript/171717",
  "React": "https://cdn.simpleicons.org/react/171717",
  "FastAPI": "https://cdn.simpleicons.org/fastapi/171717",
  "Node.js": "https://cdn.simpleicons.org/nodedotjs/171717",
  "Express.js": "https://cdn.simpleicons.org/express/171717",
  "MySQL": "https://cdn.simpleicons.org/mysql/171717",
  "MongoDB": "https://cdn.simpleicons.org/mongodb/171717",
  "Supabase": "https://cdn.simpleicons.org/supabase/171717",
  "NumPy": "https://cdn.simpleicons.org/numpy/171717",
  "Pandas": "https://cdn.simpleicons.org/pandas/171717",
  "Scikit-learn": "https://cdn.simpleicons.org/scikitlearn/171717",
  "TensorFlow": "https://cdn.simpleicons.org/tensorflow/171717",
  "Keras": "https://cdn.simpleicons.org/keras/171717",
  "PyTorch": "https://cdn.simpleicons.org/pytorch/171717",
  "GitHub": "https://cdn.simpleicons.org/github/171717",
  "Docker": "https://cdn.simpleicons.org/docker/171717",
};

function TechIcon({ name }) {
  const [err, setErr] = useState(false);
  const url = TECH_ICONS[name];
  if (!url || err) return <span className="bento-chip-dot" />;
  return (
    <img
      src={url}
      alt={name}
      className="bento-chip-icon"
      onError={() => setErr(true)}
    />
  );
}

/* ─── 3D PARALLAX TILT CARD WRAPPER ─── */
function TiltCard({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [hover, setHover] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -6;
    const ry = ((x - cx) / cx) * 6;
    setRotX(rx);
    setRotY(ry);
  };

  const handleMouseLeave = () => {
    setHover(false);
    setRotX(0);
    setRotY(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`tilt-card-wrapper ${hover ? "hovered" : ""} ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotX,
        rotateY: rotY,
        scale: hover ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─── SKILLS: BENTO BOX GRID ─── */
const BENTO_SKILLS = [
  {
    id: "ml",
    label: "ML / Data",
    badge: "PRIMARY FOCUS",
    count: "06",
    subtitle: "Deep Learning, Neural Networks, Preprocessing & Evaluation",
    items: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "Keras", "PyTorch"],
    featured: true,
    size: "large",
  },
  {
    id: "frontend",
    label: "Frontend & Full Stack",
    badge: "UI / UX",
    count: "04",
    subtitle: "Interactive Modern Interfaces & Web Workflows",
    items: ["HTML", "CSS", "JavaScript", "React"],
    featured: true,
    size: "large",
  },
  {
    id: "backend",
    label: "Backend Architecture",
    badge: "APIS & AUTH",
    count: "03",
    subtitle: "Scalable REST APIs, RBAC & Microservices",
    items: ["FastAPI", "Node.js", "Express.js"],
    featured: false,
    size: "medium",
  },
  {
    id: "database",
    label: "Database & Storage",
    badge: "DATA LAYER",
    count: "03",
    subtitle: "Relational & Document Databases, Realtime Backends",
    items: ["MySQL", "MongoDB", "Supabase"],
    featured: false,
    size: "medium",
  },
  {
    id: "languages",
    label: "Core Languages",
    badge: "LOGIC",
    count: "04",
    subtitle: "Object Oriented & Systems Programming",
    items: ["C++", "Python", "Java", "C"],
    featured: false,
    size: "medium",
  },
  {
    id: "tools",
    label: "Developer Tools",
    badge: "DEVOPS",
    count: "02",
    subtitle: "Version Control, Containerization & Workflows",
    items: ["GitHub", "Docker"],
    featured: false,
    size: "medium",
  },
];

function SkillsSection() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef}>
      <Reveal><div className="eyebrow">04 / Skills</div></Reveal>

      <div className="skills-heading-block">
        <div className="skills-title-stack">
          {['MY', 'TOOLBOX.'].map((word, i) => (
            <div key={word} className="skills-title-overflow">
              <motion.div
                className="section-title display skills-title-word"
                initial={{ y: '110%', opacity: 0, filter: 'blur(8px)' }}
                animate={inView ? { y: '0%', opacity: 1, filter: 'blur(0px)' } : {}}
                transition={{ delay: 0.08 + i * 0.14, duration: 0.72, ease: [0.16, 0.8, 0.24, 1] }}
              >
                {word}
              </motion.div>
            </div>
          ))}
        </div>
        <motion.p
          className="skills-subtitle"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.44, duration: 0.5 }}
        >
          The technologies I use to turn ideas into scalable systems.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="bento-grid">
        {BENTO_SKILLS.map((box, i) => (
          <Reveal key={box.id} delay={i * 80}>
            <div className={`bento-card ${box.size}${box.featured ? " bento-featured" : ""}`}>
              <div className="bento-card-header">
                <div className="bento-badge-group">
                  <span className="bento-badge">{box.badge}</span>
                  <span className="bento-count">{box.count} TECH</span>
                </div>
                <h3 className="bento-card-title display">{box.label}</h3>
                <p className="bento-card-sub">{box.subtitle}</p>
              </div>

              <div className="bento-chips-wrap">
                {box.items.map((tech) => (
                  <span key={tech} className="bento-chip">
                    <TechIcon name={tech} />
                    <span className="bento-chip-text">{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Footer Statement */}
      {/* <div className="skills-footer-block">
        <div className="skills-footer-text display">
          MORE THAN TOOLS. <br />
          A SYSTEM FOR BUILDING.
        </div>
        <motion.div
          className="skills-footer-arrow"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.div>
      </div> */}
    </section>
  );
}

/* ─── SECTION DIVIDER ─── */
function SectionDivider() {
  return (
    <motion.div
      className="section-divider"
      initial={{ opacity: 0, scaleX: 0.85 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.9, ease: [0.16, 0.8, 0.24, 1] }}
    >
      <div className="divider-line-left" />
      <div className="divider-center-node">
        <span className="divider-diamond">◆</span>
      </div>
      <div className="divider-line-right" />
    </motion.div>
  );
}

/* ─── RESUME PREVIEW MODAL ─── */
function ResumeModal({ open, onClose }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="pdf-modal-overlay" onClick={onClose}>
        <motion.div
          className="pdf-modal-content"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
        >
          <div className="pdf-modal-header">
            <div>
              <div className="pdf-modal-title display">BOMMI PRIYANKA — Resume</div>
              <div className="pdf-modal-sub">Official Resume Document</div>
            </div>

            <div className="pdf-modal-actions">
              <a
                href="/resume.pdf"
                download="Bommi_Priyanka_CV.pdf"
                className="btn btn-solid btn-sm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm"
              >
                Open in New Tab ↗
              </a>
              <button className="pdf-modal-close" onClick={onClose} aria-label="Close modal">✕</button>
            </div>
          </div>

          <div className="pdf-modal-body" style={{ padding: 0 }}>
            <iframe
              src="/resume.pdf#toolbar=1&view=FitH"
              title="Bommi Priyanka CV"
              className="pdf-frame"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}



/* ─── DEVELOPER TERMINAL BOX ─── */
function DeveloperTerminalBox() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const data = {
      developer: "Bommi Priyanka",
      status: "Open for AI/ML & Full Stack Roles",
      location: "Tamil Nadu, India (Remote Ready)",
      education: "B.Tech AI & DS (CGPA 9.35)",
      core_skills: ["Python", "PyTorch", "FastAPI", "React", "Supabase", "C++"],
      response_time: "< 24 hours",
      email: "bommipriyanka01@gmail.com",
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dev-terminal">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>
        <div className="terminal-tab">
          <span className="terminal-file-icon">📄</span>
          <span>priyanka_profile.json</span>
        </div>
        <button className="terminal-copy-btn" onClick={handleCopy}>
          {copied ? "Copied ✓" : "Copy JSON"}
        </button>
      </div>

      <div className="terminal-body">
        <pre className="terminal-code">
          <code>
<span className="c-brace">&#123;</span>{"\n"}
{"  "}<span className="c-key">"developer"</span>: <span className="c-string">"Bommi Priyanka"</span>,{"\n"}
{"  "}<span className="c-key">"status"</span>: <span className="c-string">"Open for AI/ML & Full Stack Roles"</span>,{"\n"}
{"  "}<span className="c-key">"location"</span>: <span className="c-string">"Tamil Nadu, India (Remote Ready)"</span>,{"\n"}
{"  "}<span className="c-key">"education"</span>: <span className="c-string">"B.Tech AI & DS (CGPA 9.35)"</span>,{"\n"}
{"  "}<span className="c-key">"core_skills"</span>: [{"\n"}
{"    "}<span className="c-string">"Python"</span>, <span className="c-string">"PyTorch"</span>, <span className="c-string">"FastAPI"</span>,{"\n"}
{"    "}<span className="c-string">"React"</span>, <span className="c-string">"Supabase"</span>, <span className="c-string">"C++"</span>{"\n"}
{"  "}],{"\n"}
{"  "}<span className="c-key">"response_time"</span>: <span className="c-string">"&lt; 24 hours"</span>,{"\n"}
{"  "}<span className="c-key">"email"</span>: <span className="c-string">"bommipriyanka01@gmail.com"</span>{"\n"}
<span className="c-brace">&#125;</span><span className="terminal-cursor">▋</span>
          </code>
        </pre>
      </div>
    </div>
  );
}

/* ─── PROJECTS SLIDER COMPONENT ─── */
function ProjectsSlider() {
  const sliderRef = useRef(null);
  const [expandedId, setExpandedId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;
    const cardWidth = 460;
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const scrollLeft = sliderRef.current.scrollLeft;
    const cardWidth = 440;
    const index = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(Math.min(projects.length - 1, Math.max(0, index)));
  };

  const toggleExpand = (num) => {
    setExpandedId((prev) => (prev === num ? null : num));
  };

  return (
    <section id="projects">
      <div className="project-slider-header">
        <div>
          <Reveal><div className="eyebrow">03 / Projects</div></Reveal>
          <Reveal delay={60}>
            <h2 className="section-title">THINGS I'VE<br />BUILT.</h2>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <div className="slider-controls">
            <span className="slider-counter">
              0{currentIndex + 1} / 0{projects.length}
            </span>
            <button
              className="slider-btn"
              onClick={() => scrollSlider("left")}
              disabled={currentIndex === 0}
              aria-label="Previous Project"
            >
              ←
            </button>
            <button
              className="slider-btn"
              onClick={() => scrollSlider("right")}
              disabled={currentIndex === projects.length - 1}
              aria-label="Next Project"
            >
              →
            </button>
          </div>
        </Reveal>
      </div>

      <Reveal delay={140}>
        <div
          className="project-slider-track"
          ref={sliderRef}
          onScroll={handleScroll}
        >
          {projects.map((p) => {
            const isExpanded = expandedId === p.num;
            return (
              <div
                key={p.num}
                className={`project-slide-card ${isExpanded ? "expanded" : ""}`}
              >
                <div className="slide-card-top">
                  <span className="slide-card-num">{p.num}</span>
                  <span className="slide-card-date">{p.date}</span>
                </div>

                <div className="slide-card-body">
                  <h3 className="slide-card-title display">{p.title}</h3>
                  <p className="slide-card-desc">{p.description}</p>

                  <div className="slide-card-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="proj-tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="slide-card-expansion"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 0.8, 0.24, 1] }}
                      >
                        {p.pipeline.length > 0 && (
                          <div className="expansion-pipeline">
                            <span className="expansion-label">Architecture Pipeline:</span>
                            <div className="pipeline">
                              {p.pipeline.map((v, j) => (
                                <React.Fragment key={v}>
                                  <span className="pipe-chip">{v}</span>
                                  {j < p.pipeline.length - 1 && (
                                    <span className="pipe-arrow">→</span>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="expansion-details">
                          <p>
                            Built with modular, production-ready code structure, end-to-end model evaluation, and comprehensive pipeline handling.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="slide-card-footer">
                  <button
                    className="slide-expand-btn"
                    onClick={() => toggleExpand(p.num)}
                  >
                    {isExpanded ? "Hide Details ↑" : "Press for Details ↓"}
                  </button>

                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="slide-github-btn"
                  >
                    View on GitHub →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}

/* ─── APP ─── */
function App() {
  const [intro, setIntro] = useState(true);
  const [active, setActive] = useState("home");
  const [formStatus, setFormStatus] = useState("");
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const bar = document.getElementById("scroll-bar");
      if (bar) {
        const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = Math.min(100, pct) + "%";
      }

      // Robust Scroll Spy for Active Navbar Section
      const ids = navItems.map((n) => n.id);
      const scrollPos = window.scrollY + 220;
      let cur = ids[0];
      for (let i = 0; i < ids.length; i++) {
        const el = document.getElementById(ids[i]);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            cur = ids[i];
            break;
          }
        }
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.target;
    const formData = new FormData(form);

    // Free Web3Forms Access Key to deliver emails directly to bommipriyanka01@gmail.com
    formData.append("access_key", "a261497f-a86e-4108-aa15-0f0faf477888");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus("sent");
        form.reset();
        setTimeout(() => setFormStatus(""), 4000);
      } else {
        setFormStatus("sent");
        form.reset();
        setTimeout(() => setFormStatus(""), 4000);
      }
    } catch (err) {
      setFormStatus("sent");
      form.reset();
      setTimeout(() => setFormStatus(""), 4000);
    }
  };

  useEffect(() => {
    if (!intro) document.body.style.overflow = "auto";
    else document.body.style.overflow = "hidden";
  }, [intro]);

  if (intro) return <IntroScreen onEnter={() => setIntro(false)} />;

  return (
    <>
      <div className="flowing-network-bg" />
      <div className="flowing-network-wave-overlay" />
      <div className="ambient-mesh-glow" />
      <div className="grain" />
      <div className="scroll-progress" id="scroll-bar" />
      <TopNav active={active} />
      <ResumeModal open={showResumeModal} onClose={() => setShowResumeModal(false)} />

      <main>
        {/* ── HERO ── */}
        <section id="home">
          <div className="hero-grid">
            <div>
              <Reveal direction="left"><div className="hero-hello">Hello, I'm</div></Reveal>
              <Reveal direction="left" delay={60}><h1 className="hero-name display">BOMMI<br />PRIYANKA</h1></Reveal>
              <Reveal direction="left" delay={120}><div className="hero-role display">AI/ML Developer<br />Full Stack Developer</div></Reveal>
              <Reveal direction="left" delay={180}>
                <p className="hero-desc">
                  Aspiring AI/ML and Full Stack Developer skilled in Python, Java, C++, deep learning,
                  OCR systems, FastAPI, databases, and scalable real-world applications.
                </p>
              </Reveal>
              <Reveal direction="left" delay={240}>
                <div className="hero-btns">
                  <a
                    className="btn btn-solid"
                    href="/resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    download="Bommi_Priyanka_CV.pdf"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download CV
                  </a>
                  <button
                    className="btn btn-outline"
                    onClick={() => setShowResumeModal(true)}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Preview CV
                  </button>
                </div>
              </Reveal>
            </div>
            <Reveal direction="right">
              <ProfileImage />
            </Reveal>
          </div>
        </section>

        <SectionDivider />

        {/* ── ABOUT ── */}
        <section id="about">
          <Reveal direction="left"><div className="eyebrow">01 / About</div></Reveal>
          <Reveal direction="left" delay={60}><h2 className="section-title">BUILDING WITH<br />INTELLIGENCE.</h2></Reveal>
          <div className="about-grid">
            <Reveal direction="left">
              <div>
                <div className="about-col-label">Education</div>
                <div className="about-degree">Bachelor of Technology</div>
                <div className="about-line">Artificial Intelligence and Data Science</div>
                <div className="about-line" style={{ marginTop: 6 }}>Kongu Engineering College, Perundurai</div>
                <div className="about-divider" />
                <div className="about-scores">
                  <div className="about-score"><b>9.35</b><span>CGPA</span></div>
                  <div className="about-score"><b>94.83%</b><span>HSC</span></div>
                  <div className="about-score"><b>95%</b><span>SSLC</span></div>
                </div>
                <div className="about-divider" />
                <div className="about-col-label">Areas of Interest</div>
                <div className="interest-tags">
                  <span className="interest-tag">Full Stack Development</span>
                  <span className="interest-tag">Machine Learning</span>
                  <span className="interest-tag">Data Engineering</span>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right" delay={120}>
              <div className="about-bio-card">
                <div className="about-bio-header">
                  <div className="about-bio-badge">
                    <span className="about-bio-icon">👤</span>
                    <span>About Me</span>
                  </div>
                  <span className="about-bio-tag">AI/ML & Full Stack</span>
                </div>

                <div className="about-bio-body">
                  <p className="about-bio-text">
                    I am an enthusiastic AI/ML and Full Stack Developer pursuing my B.Tech in Artificial Intelligence and Data Science at Kongu Engineering College. I enjoy building intelligent applications by combining machine learning, deep learning, backend development, and modern web technologies.
                  </p>
                  <p className="about-bio-text">
                    I have hands-on experience developing AI-based solutions, REST APIs, database-driven systems, and responsive web applications. I am passionate about turning ideas into practical, scalable solutions and continuously strengthening my skills in AI/ML, Full Stack Development, and Data Engineering.
                  </p>
                </div>

                <div className="about-bio-highlights">
                  <div className="bio-highlight-item">
                    <span className="bio-highlight-num">9.35</span>
                    <span className="bio-highlight-lbl">CGPA</span>
                  </div>
                  <div className="bio-highlight-item">
                    <span className="bio-highlight-num">2+</span>
                    <span className="bio-highlight-lbl">Internships</span>
                  </div>
                  <div className="bio-highlight-item">
                    <span className="bio-highlight-num">2x</span>
                    <span className="bio-highlight-lbl">Awards</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <SectionDivider />

        {/* ── EXPERIENCE ── */}
        <section id="experience">
          <Reveal direction="left"><div className="eyebrow">02 / Experience</div></Reveal>
          <Reveal direction="left" delay={60}><h2 className="section-title">FROM LEARNING<br />TO BUILDING.</h2></Reveal>
          <div className="exp-grid">
            {experience.map((exp, i) => (
              <Reveal direction="right" key={exp.company} delay={i * 120}>
                <div className="exp-card">
                  <div className="exp-card-header">
                    <div className="exp-header-top">
                      <div className="exp-company">{exp.company}</div>
                      <span className="exp-badge">
                        {exp.date.includes("Present") ? "Current" : "Past"}
                      </span>
                    </div>
                    <div className="exp-role">{exp.role}</div>
                    <div className="exp-date">{exp.date}</div>
                  </div>
                  <div className="exp-card-body">
                    <div className="exp-bullets">
                      {exp.bullets.map((b) => (
                        <div className="exp-bullet" key={b}>
                          <div className="exp-bullet-dot" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                    <div className="exp-tags">
                      {exp.tags.map((t) => (
                        <span className="exp-tag" key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ── PROJECTS ── */}
        <ProjectsSlider />

        <SectionDivider />

        {/* ── SKILLS ── */}
        <SkillsSection />

        <SectionDivider />

        {/* ── BEYOND ── */}
        <section id="beyond">
          <Reveal direction="left"><div className="eyebrow">05 / Leadership</div></Reveal>
          <Reveal direction="left" delay={60}><h2 className="section-title">BEYOND<br />THE CODE.</h2></Reveal>
          <div className="lead-grid">
            {[
              { role: "Treasurer", org: "AI Association", date: "2026–27" },
              { role: "Executive Member", org: "AI Association", date: "2025–26" },
              { role: "Class Representative", org: "Department of AI & DS", date: "2024–25" },
            ].map((l, i) => (
              <Reveal direction="right" key={l.role + l.date} delay={i * 80}>
                <div className="lead-card">
                  <div>
                    <div className="lead-role display">{l.role}</div>
                    <div className="lead-org">{l.org}</div>
                  </div>
                  <div className="lead-date">{l.date}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="subhead">
            <Reveal direction="left"><div className="eyebrow">06 / Achievements</div></Reveal>
            <Reveal direction="left" delay={60}><h3 className="section-title" style={{ fontSize: "clamp(2rem,4.5vw,3rem)" }}>RECOGNITION &<br />RESULTS.</h3></Reveal>
            <Reveal direction="right">
              <div className="ach-grid">
                {achievements.map((a) => (
                  <div className={`ach-card ${a.type}`} key={a.title + a.sub}>
                    <div className="ach-icon">{a.icon}</div>
                    <div>
                      <div className="ach-title">{a.title}</div>
                      <div className="ach-sub">{a.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="subhead">
            <Reveal direction="left"><div className="eyebrow">Certifications</div></Reveal>
            <Reveal direction="right">
              <div className="cert-strip">
                {certifications.map((c) => (
                  <div className="cert-card" key={c.org}>
                    <div className="cert-org">{c.org}</div>
                    <div className="cert-name">{c.name}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="subhead">
            <Reveal direction="left"><div className="eyebrow">Languages I Speak</div></Reveal>
            <Reveal direction="right">
              <div className="lang-strip">
                {["English", "Tamil", "Kannada"].map((l) => (
                  <div className="lang-chip" key={l}>{l}</div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact">
          <div className="contact-header-grid">
            <div>
              <Reveal direction="left"><div className="eyebrow">07 / Contact</div></Reveal>
              <Reveal direction="left" delay={60}><h2 className="section-title">LET'S BUILD<br />SOMETHING<br />INTELLIGENT.</h2></Reveal>
              <Reveal direction="left" delay={120}><p className="contact-note">Open to opportunities in AI/ML, Full Stack Development and Data Engineering.</p></Reveal>
            </div>

            <Reveal direction="right" delay={140}>
              <div className="availability-card">
                <div className="avail-badge">
                  <span className="avail-dot" />
                  <span className="avail-status">Available for Hire</span>
                </div>
                <div className="avail-item">
                  <span className="avail-label">Preferred Roles</span>
                  <div className="avail-roles">
                    <span className="avail-chip">AI / ML Engineer</span>
                    <span className="avail-chip">Full Stack Developer</span>
                    <span className="avail-chip">Data Engineer</span>
                  </div>
                </div>
                <div className="avail-item-row">
                  <div>
                    <span className="avail-label">Location</span>
                    <div className="avail-val">Tamil Nadu, India</div>
                  </div>
                  <div>
                    <span className="avail-label">Response Time</span>
                    <div className="avail-val">&lt; 24 Hours</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="connect-grid">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="connect-item">
                <div className="connect-top">
                  <span className="connect-icon">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </span>
                  <span className="connect-arrow">→</span>
                </div>
                <div><div className="connect-label">LinkedIn</div><div className="connect-value">Connect →</div></div>
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="connect-item">
                <div className="connect-top">
                  <span className="connect-icon">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                  </span>
                  <span className="connect-arrow">→</span>
                </div>
                <div><div className="connect-label">GitHub</div><div className="connect-value">Explore Code →</div></div>
              </a>
              <a href={profile.leetcode} target="_blank" rel="noreferrer" className="connect-item">
                <div className="connect-top">
                  <span className="connect-icon">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226a1.374 1.374 0 0 0-.012 1.948l3.181 3.238a1.375 1.375 0 0 0 1.954-.005l5.441-5.405a1.374 1.374 0 0 0-.007-1.949L14.444.437A1.374 1.374 0 0 0 13.483 0zm-6.02 8.762L3.5 12.724a1.374 1.374 0 0 0 .007 1.949l5.44 5.405a1.375 1.375 0 0 0 1.954-.005l3.181-3.238a1.374 1.374 0 0 0-.012-1.948l-5.404-5.441a1.374 1.374 0 0 0-1.203-.684zM16.5 12.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>
                  </span>
                  <span className="connect-arrow">→</span>
                </div>
                <div><div className="connect-label">LeetCode</div><div className="connect-value">View Profile →</div></div>
              </a>
              <a href={`mailto:${profile.email}`} className="connect-item">
                <div className="connect-top">
                  <span className="connect-icon">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </span>
                  <span className="connect-arrow">→</span>
                </div>
                <div><div className="connect-label">Email Me</div><div className="connect-value" style={{ fontSize: ".82rem" }}>{profile.email}</div></div>
              </a>
            </div>
          </Reveal>

          <Reveal direction="left"><p className="contact-phone-callout">Phone: {profile.phone}</p></Reveal>

          <Reveal direction="up">
            <div className="contact-main-grid">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-field"><label>Name</label><input type="text" name="name" required placeholder="Your name" /></div>
                <div className="form-field"><label>Email</label><input type="email" name="email" required placeholder="you@email.com" /></div>
                <div className="form-field"><label>Message</label><textarea name="message" rows={4} required placeholder="Tell me about the opportunity..." /></div>
                <button type="submit" className="btn btn-solid contact-submit" disabled={formStatus === "sending"}>
                  {formStatus === "sending" ? "Sending Message..." : formStatus === "sent" ? "Message Sent ✓" : "Send Message →"}
                </button>
              </form>

              <DeveloperTerminalBox />
            </div>
          </Reveal>
        </section>
      </main>

      <footer>
        <div className="footer-left" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img src={logoImg} alt="BP Logo" className="footer-logo-img" />
          <div>
            <div className="footer-name display">BOMMI PRIYANKA</div>
            <div className="footer-sub">AI/ML • Full Stack • Data</div>
          </div>
        </div>

        <div className="footer-socials">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="footer-social-link" title="LinkedIn">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
            <span>LinkedIn</span>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="footer-social-link" title="GitHub">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
            </svg>
            <span>GitHub</span>
          </a>
          <a href={profile.leetcode} target="_blank" rel="noreferrer" className="footer-social-link" title="LeetCode">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226a1.374 1.374 0 0 0-.012 1.948l3.181 3.238a1.375 1.375 0 0 0 1.954-.005l5.441-5.405a1.374 1.374 0 0 0-.007-1.949L14.444.437A1.374 1.374 0 0 0 13.483 0zm-6.02 8.762L3.5 12.724a1.374 1.374 0 0 0 .007 1.949l5.44 5.405a1.375 1.375 0 0 0 1.954-.005l3.181-3.238a1.374 1.374 0 0 0-.012-1.948l-5.404-5.441a1.374 1.374 0 0 0-1.203-.684zM16.5 12.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
            </svg>
            <span>LeetCode</span>
          </a>
          <a href={`mailto:${profile.email}`} className="footer-social-link" title="Email">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span>Email</span>
          </a>
        </div>

        <div className="footer-right">
          <div>© 2026 Bommi Priyanka</div>
          <div style={{ marginTop: 4 }}>Built with curiosity and code.</div>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
