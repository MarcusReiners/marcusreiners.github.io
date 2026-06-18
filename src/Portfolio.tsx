import React, { useMemo, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Github, Mail, MapPin, Download, Moon, Sun, Music, Waves, ChevronLeft, ChevronRight } from "lucide-react";
import portrait from "@/assets/img/portrait.jpg";
import smart_crocs from "@/assets/img/smart_crocs.jpg";
import latent_news from "@/assets/img/latent_news.jpg";
import ffr from "@/assets/img/FFR.jpg";
import sleepWellnessCover from "@/assets/img/sleep_wellness.jpg";
import gripEchoCover from "@/assets/img/grip_echo.jpg";
import diving1 from "@/assets/img/diving1.jpg";
import diving2 from "@/assets/img/diving2.jpg";
import diving3 from "@/assets/img/diving3.jpg";

type Lang = "de" | "en";

const UI = {
  de: {
    nav: { work: "Projekte", experience: "Erfahrung", passions: "Hobbys", contact: "Kontakt" },
    hero: {
      headline: "Ich erforsche und gestalte Nutzererlebnisse",
      sub: "Masterstudent MCI (LMU) mit Praxis in Software, Hardware und UX. Von Research & Konzeption bis zu Hi-Fi-Prototypen.",
      cta1: "Projekte ansehen",
      cta2: "Kontakt aufnehmen",
    },
    work: "Ausgewählte Projekte",
    dialog: { problem: "Problem", process: "Prozess", outcome: "Ergebnis" },
    tabs: { exp: "Erfahrung", edu: "Ausbildung" },
    passions: {
      title: "Persönliches",
      musicDesc: "Band & Musikprojekt",
      divingTitle: "Tauchen",
      divingDesc: "Leidenschaft für die Unterwasserwelt",
    },
    contact: "Kontakt aufnehmen",
    email: "E-Mail",
    downloadCv: "Lebenslauf herunterladen",
    cv: "Lebenslauf",
    imprint: "Impressum",
    privacy: "Datenschutz",
  },
  en: {
    nav: { work: "Work", experience: "Experience", passions: "Passions", contact: "Contact" },
    hero: {
      headline: "I research and design user experiences",
      sub: "HCI Master's student (LMU) with hands-on experience in software, hardware and UX — from research to hi-fi prototypes.",
      cta1: "View Work",
      cta2: "Get in Touch",
    },
    work: "Selected Work",
    dialog: { problem: "Problem", process: "Process", outcome: "Outcome" },
    tabs: { exp: "Experience", edu: "Education" },
    passions: {
      title: "Beyond Work",
      musicDesc: "Band & Music Project",
      divingTitle: "Diving",
      divingDesc: "A passion for the underwater world",
    },
    contact: "Get in Touch",
    email: "Email",
    downloadCv: "Download CV",
    cv: "CV",
    imprint: "Imprint",
    privacy: "Privacy Policy",
  },
} as const;

const CONTACT = {
  name: "Marcus Reiners",
  role: "UX / HCI",
  location: "Germering · München",
  email: "reiners.marcus710@gmail.com",
  github: "https://github.com/MarcusReiners",
  resumeUrl: "/Lebenslauf_Marcus_Reiners_UX_1Page_Modern.docx",
  avatar: portrait,
};

const SKILLS = [
  "Human-Centered Design",
  "Prototyping",
  "Usability Testing",
  "React / TypeScript",
  "Python",
  "Java / Kotlin",
  "MicroPython / ESP32",
  "Accessibility",
  "Data Visualization",
];

const PROJECTS = [
  {
    id: "grip-echo",
    title: "Grip Echo",
    cover: gripEchoCover,
    tags: ["Wearable", "Sensory Substitution", "Python", "Hardware", "HCI"],
    role: { de: "Konzept, Hardware-Prototyping, Programmierung", en: "Concept, Hardware Prototyping, Programming" },
    problem: {
      de: "Periphere Neuropathie lässt Patienten ihr eigenes Griffgefühl verlieren – sie können nicht spüren, wie fest sie etwas halten, was zu Verletzungen oder Sachschäden führt.",
      en: "Peripheral Neuropathy causes patients to lose hand sensation, making it impossible to gauge grip strength — risking injury or damage to objects.",
    },
    process: {
      de: "FSR-Sensorhandschuh erfasst Druckdaten an Fingerkuppen und Handfläche. Python-System überträgt die Griffkraft in Echtzeit auf den Unterarm – per LED-Streifen (visuell) und Vibrationsmotor (haptisch). Kalibrierphase von 5 Sekunden beim Start.",
      en: "An FSR sensor glove captures pressure from fingertips and palm. A Python system relays grip force in real time to the forearm via an LED strip (visual) and vibration motor (haptic), with a 5-second calibration on startup.",
    },
    outcome: {
      de: "Funktionierender Hi-Fi-Prototyp mit automatischer Kalibrierung und Echtzeit-Sensory-Substitution. Zeigt die Machbarkeit eines nicht-invasiven, tragbaren Griff-Feedback-Systems.",
      en: "Working hi-fi prototype with automatic calibration and real-time sensory substitution, demonstrating the feasibility of a non-invasive wearable grip feedback system.",
    },
    links: [
      { label: "GitHub", href: "https://github.com/MarcusReiners/Grip-Echo" },
      { label: "Case Study (PDF)", href: "/Grip_Echo_Report.pdf" },
    ],
  },
  {
    id: "latent-news-room",
    title: "Latent News Room",
    cover: latent_news,
    tags: ["AI", "React/Vite/TS", "ESP32", "MicroPython"],
    role: { de: "Architektur & Frontend", en: "Architecture & Frontend" },
    problem: {
      de: "Wie beeinflusst algorithmischer Bias die Wahrnehmung politischer Inhalte?",
      en: "How does algorithmic bias shape the perception of political news content?",
    },
    process: {
      de: "SPA mit React/Vite/TS. Medienlogik für Echtzeit-Umschaltung nach politischer Ausrichtung. Hardwaresteuerung per ESP32 + MicroPython.",
      en: "SPA built with React/Vite/TS. Media logic for real-time switching based on political leaning. Hardware control via ESP32 & MicroPython.",
    },
    outcome: {
      de: "Installation macht Bias erlebbar. Learnings zu Ethik, Transparenz und UI für Erklärbarkeit (XAI).",
      en: "Installation makes bias tangible. Learnings on ethics, transparency and UI for explainability (XAI).",
    },
    links: [
      { label: "GitHub", href: "https://github.com/alKerim/news_channels" },
      { label: "Case Study (PDF)", href: "/AI_in_Arts_Latent_News_Room.pdf" },
    ],
  },
  {
    id: "sleep-wellness",
    title: "Visualizing Sleep Wellness",
    cover: sleepWellnessCover,
    tags: ["Data Physicalization", "UX Research", "Prototyping", "Hardware"],
    role: { de: "Research, Konzept & Hardware-Prototyping", en: "Research, Concept & Hardware Prototyping" },
    problem: {
      de: "Schlafdaten werden oft erfasst, aber selten als motivierendes, alltagsnahes Feedback erlebbar gemacht.",
      en: "Sleep data is often tracked but rarely experienced as motivating, everyday feedback.",
    },
    process: {
      de: "Research (Survey, Fokusgruppe) → Konzept für beruhigende, ambient sichtbare Darstellung. ESP32-Prototyp mit Displays & LED-Flamme, gekoppelt an Schlafdaten.",
      en: "Research (survey, focus group) → concept for a calming, ambient display. ESP32 prototype with displays & LED flame linked to sleep data.",
    },
    outcome: {
      de: "Funktionierender Prototyp, der Schlafqualität subtil visualisiert. Qualitatives Feedback zeigt Potenzial für Verhaltensänderungen.",
      en: "Working prototype that subtly visualises sleep quality. Qualitative feedback indicates potential for behaviour change.",
    },
    links: [
      { label: "GitHub", href: "https://github.com/MarcusReiners/SleepVisualization" },
      { label: "Case Study (PDF)", href: "/BA_Marcus_Reiners_Sleep_Physicalization.pdf" },
    ],
  },
  {
    id: "smart-crocs",
    title: "Smart Crocs",
    cover: smart_crocs,
    tags: ["HCD", "Prototyping", "Sensorik", "Safety"],
    role: { de: "HCD, Prototyping, Systemarchitektur", en: "HCD, Prototyping, System Architecture" },
    problem: {
      de: "Ältere Menschen stürzen häufig und verlieren Selbstständigkeit. Wie geben wir Sicherheit ohne die Interaktion zu verkomplizieren?",
      en: "Older adults fall frequently and lose independence. How do we provide safety without complicating the interaction?",
    },
    process: {
      de: "Interviews, Szenarien, Low→Hi-Fi-Prototypen. Drucksensoren + LED-Feedback, Sturzerkennungslogik, Notfallfluss. Usability-Tests mit Fokus auf Barrierefreiheit.",
      en: "Interviews, scenarios, lo→hi-fi prototypes. Pressure sensors + LED feedback, fall-detection logic, emergency flow. Usability tests focused on accessibility.",
    },
    outcome: {
      de: "Funktionierender Hi-Fi-Prototyp, erkennt Stürze, informiert Kontakte. Gelernt: Schwellenwerte, False Positives, erklärbares Feedback.",
      en: "Working hi-fi prototype that detects falls and notifies contacts. Learnings: threshold tuning, false positives, explainable feedback.",
    },
    links: [{ label: "Case Study (PDF)", href: "/Design_Workshop_2_Smart_Crocs.pdf" }],
  },
];

const EXPERIENCE = [
  {
    org: "Quality First Software GmbH",
    period: { de: "Seit 2023", en: "Since 2023" },
    role: {
      de: "Werkstudent & Praktikant – Softwareentwicklung & UX Testing",
      en: "Working Student & Intern – Software Development & UX Testing",
    },
    bullets: {
      de: [
        "Java/Kotlin (Android, Compose UI)",
        "Accessibility-Analyse & Anpassungen (NVDA)",
        "UX-Report & Prototyping basierend auf Nutzerfeedback",
        "Smoke-Tests & QA vor Releases",
      ],
      en: [
        "Java/Kotlin (Android, Compose UI)",
        "Accessibility analysis & adaptations (NVDA)",
        "UX reporting & prototyping based on user feedback",
        "Smoke testing & QA before releases",
      ],
    },
  },
];

const EDUCATION = [
  {
    org: "LMU München",
    period: { de: "seit 04/2024", en: "since 04/2024" },
    title: { de: "Master Mensch-Computer-Interaktion", en: "M.Sc. Human-Computer Interaction" },
    details: {
      de: "Schwerpunkte: HCD, Usability Evaluation, Prototyping, KI im UX-Kontext",
      en: "Focus: HCD, usability evaluation, prototyping, AI in UX",
    },
  },
  {
    org: "LMU München",
    period: { de: "10/2020 – 03/2024", en: "10/2020 – 03/2024" },
    title: { de: "Bachelor Medieninformatik", en: "B.Sc. Media Informatics" },
    details: {
      de: "BA: Visualisierung von Schlafdaten zur Verbesserung von Schlafgewohnheiten (Interaktive App, Data Viz & Usability)",
      en: "Thesis: Visualising sleep data to improve sleep habits (interactive app, data viz & usability)",
    },
  },
  {
    org: "Aarhus Universitet (DK)",
    period: { de: "WS 2024", en: "Winter Semester 2024" },
    title: { de: "Auslandssemester", en: "Exchange Semester" },
    details: {
      de: "Teamprojekt UIcycle – Intelligentes Fahrradsicherheits-System",
      en: "Team project UIcycle – Intelligent Bicycle Safety System",
    },
  },
];

const PASSIONS = {
  music: {
    title: "Falling For Roza",
    website: "https://fallingforroza.com",
    instagram: "https://instagram.com/fallingforroza",
    spotifyEmbed: "https://open.spotify.com/embed/artist/5qPFGbMxO8xYbVwYWFyLdY",
    image: ffr,
  },
  diving: {
    ssiLink: "https://www.divessi.com/profile/4788627",
    images: [diving1, diving2, diving3],
  },
};

function SectionTitle({ title }: { title: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-2xl font-light tracking-tight mb-8"
    >
      {title}
    </motion.h2>
  );
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <Badge key={t} variant="outline" className="font-normal">
          {t}
        </Badge>
      ))}
    </div>
  );
}

function CaseDialog({ project, open, onOpenChange, lang, dark }: {
  project: typeof PROJECTS[number] | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  lang: Lang;
  dark: boolean;
}) {
  if (!project) return null;
  const d = UI[lang].dialog;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${dark ? "dark" : ""} bg-background text-foreground border border-border sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl`}>
        <DialogHeader>
          <DialogTitle className="text-xl font-light">{project.title}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="rounded-lg bg-muted/20 p-2 flex justify-center">
            <img
              src={project.cover}
              alt={project.title}
              className="w-full max-w-[900px] max-h-[45vh] object-contain rounded-md"
            />
          </div>

          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <Badge key={t} variant="outline" className="font-normal">{t}</Badge>
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">{d.problem}</h4>
              <p className="text-muted-foreground">{project.problem[lang]}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">{d.process}</h4>
              <p className="text-muted-foreground">{project.process[lang]}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">{d.outcome}</h4>
              <p className="text-muted-foreground">{project.outcome[lang]}</p>
            </div>
          </div>

          {project.links?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.links.map((l) => (
                <Button key={l.href} asChild variant="outline" size="sm">
                  <a href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProjectCarousel({ projects, onSelect, lang }: {
  projects: typeof PROJECTS;
  onSelect: (p: typeof PROJECTS[number]) => void;
  lang: Lang;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(projects.length > 1);

  const updateNav = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  const shift = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const amount = card ? card.offsetWidth + 24 : 380;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-light tracking-tight"
        >
          {UI[lang].work}
        </motion.h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => shift(-1)} disabled={!canPrev} aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => shift(1)} disabled={!canNext} aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={updateNav}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6
                   [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
      >
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            data-card=""
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex-none w-[85vw] sm:w-[45vw] lg:w-[32vw] snap-start group cursor-pointer"
            onClick={() => onSelect(p)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(p); }}
          >
            <div className="relative overflow-hidden rounded-lg mb-4 bg-muted/20">
              <img
                src={p.cover}
                alt={p.title}
                className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="text-lg font-medium mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{p.role[lang]}</p>
            <TagList tags={p.tags} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [lang, setLang] = useState<Lang>("de");
  const [activeProject, setActiveProject] = useState<typeof PROJECTS[number] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  const rootClass = useMemo(() => (dark ? "dark" : ""), [dark]);
  const t = UI[lang];

  return (
    <div className={rootClass}>
      <TooltipProvider>
        <main className="min-h-screen bg-background text-foreground">
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 bg-primary text-primary-foreground px-3 py-1 rounded"
          >
            Zum Inhalt springen
          </a>

          {/* Header */}
          <motion.header
            style={{ opacity: headerOpacity }}
            className="sticky top-0 z-40 backdrop-blur-sm bg-background/80 border-b"
          >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={CONTACT.avatar} alt="Portrait Marcus Reiners" />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{CONTACT.name}</div>
                  <div className="text-sm text-muted-foreground">{CONTACT.role}</div>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a className="text-sm hover:text-foreground transition-colors" href="#work">{t.nav.work}</a>
                <a className="text-sm hover:text-foreground transition-colors" href="#experience">{t.nav.experience}</a>
                <a className="text-sm hover:text-foreground transition-colors" href="#passions">{t.nav.passions}</a>
                <a className="text-sm hover:text-foreground transition-colors" href="#contact">{t.nav.contact}</a>
              </nav>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLang((l) => (l === "de" ? "en" : "de"))}
                  className="text-xs font-medium w-10"
                >
                  {lang === "de" ? "EN" : "DE"}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setDark((d) => !d)}>
                  {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href={CONTACT.resumeUrl} download>{t.cv}</a>
                </Button>
              </div>
            </div>
          </motion.header>

          {/* Hero */}
          <section id="content" className="container mx-auto px-4 py-14 md:py-18 lg:py-24">
            <div className="mx-auto grid max-w-screen-2xl grid-cols-1 lg:grid-cols-12 items-center gap-10 md:gap-14 lg:gap-20">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-6 xl:col-span-5"
              >
                <h1 className="font-light leading-tight tracking-tight mb-5 text-[clamp(1.9rem,3.2vw+1rem,3.75rem)]">
                  {t.hero.headline}
                </h1>
                <p className="text-muted-foreground mb-7 text-[clamp(0.95rem,0.6vw+0.8rem,1.25rem)]">
                  {t.hero.sub}
                </p>
                <div className="flex flex-wrap gap-3 mb-8 md:mb-10">
                  <Button asChild className="min-w-[9rem]">
                    <a href="#work">{t.hero.cta1}</a>
                  </Button>
                  <Button asChild variant="outline" className="min-w-[9rem]">
                    <a href={`mailto:${CONTACT.email}`}>{t.hero.cta2}</a>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((s) => (
                    <Badge key={s} variant="secondary" className="font-normal px-2.5 py-1 text-[13px] md:text-[12px] lg:text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="lg:col-span-6 xl:col-span-7"
              >
                <div className="relative mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl aspect-[4/5] md:aspect-[5/6] lg:aspect-[16/13] rounded-3xl overflow-hidden shadow-2xl">
                  <picture>
                    <source srcSet={`${portrait}?w=1600 1x, ${portrait}?w=2400 2x`} media="(min-width: 1024px)" />
                    <source srcSet={`${portrait}?w=900 1x, ${portrait}?w=1400 2x`} media="(min-width: 640px)" />
                    <img
                      src={portrait}
                      alt="Portrait Marcus Reiners"
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </picture>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Work */}
          <section id="work" className="container mx-auto px-4 py-20 bg-muted/30">
            <ProjectCarousel
              projects={PROJECTS}
              onSelect={(p) => { setActiveProject(p); setDialogOpen(true); }}
              lang={lang}
            />
          </section>

          {/* Experience / Education */}
          <section id="experience" className="container mx-auto px-4 py-20">
            <Tabs defaultValue="experience" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="experience">{t.tabs.exp}</TabsTrigger>
                <TabsTrigger value="education">{t.tabs.edu}</TabsTrigger>
              </TabsList>
              <TabsContent value="experience" className="grid gap-6 md:grid-cols-2">
                {EXPERIENCE.map((e) => (
                  <Card key={e.org}>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">{e.org}</CardTitle>
                      <CardDescription>{e.period[lang]} · {e.role[lang]}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {e.bullets[lang].map((b) => (
                          <li key={b}>• {b}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="education" className="grid gap-6 md:grid-cols-3">
                {EDUCATION.map((ed) => (
                  <Card key={ed.org + ed.period.de}>
                    <CardHeader>
                      <CardTitle className="text-base font-medium">{ed.title[lang]}</CardTitle>
                      <CardDescription>{ed.org} · {ed.period[lang]}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">{ed.details[lang]}</CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </section>

          {/* Passions */}
          <section id="passions" className="container mx-auto px-4 py-20 bg-muted/30">
            <SectionTitle title={t.passions.title} />
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-2 mb-4">
                  <Music className="h-5 w-5" />
                  <h3 className="text-xl font-medium">{PASSIONS.music.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{t.passions.musicDesc}</p>
                <div className="rounded-lg overflow-hidden mb-6">
                  <img src={PASSIONS.music.image} alt="Falling For Roza" className="w-full h-64 object-cover" />
                </div>
                <div className="rounded-lg overflow-hidden mb-6 bg-background p-4">
                  <iframe
                    src={PASSIONS.music.spotifyEmbed}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="encrypted-media"
                    title="Spotify Player"
                    className="rounded"
                  />
                </div>
                <div className="flex gap-3">
                  <Button asChild variant="outline" size="sm">
                    <a href={PASSIONS.music.website} target="_blank" rel="noreferrer">Website</a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={PASSIONS.music.instagram} target="_blank" rel="noreferrer">Instagram</a>
                  </Button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <div className="flex items-center gap-2 mb-4">
                  <Waves className="h-5 w-5" />
                  <h3 className="text-xl font-medium">{t.passions.divingTitle}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{t.passions.divingDesc}</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {PASSIONS.diving.images.map((img, i) => (
                    <div key={i} className="rounded-lg overflow-hidden aspect-square">
                      <img
                        src={img}
                        alt={`Diving ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="container mx-auto px-4 py-20">
            <div className="max-w-2xl">
              <SectionTitle title={t.contact} />
              <div className="flex flex-wrap gap-3 mb-8">
                <Button asChild>
                  <a href={`mailto:${CONTACT.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    {t.email}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={CONTACT.github} target="_blank" rel="noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={CONTACT.resumeUrl} download>
                    <Download className="h-4 w-4 mr-2" />
                    {t.downloadCv}
                  </a>
                </Button>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {CONTACT.location}
                </div>
              </div>
            </div>
          </section>

          <footer className="border-t">
            <div className="container mx-auto px-4 py-6 text-sm text-muted-foreground flex items-center justify-between">
              <div>© {new Date().getFullYear()} Marcus Reiners</div>
              <div className="flex gap-4">
                <a className="hover:underline" href="/impressum.html">{t.imprint}</a>
                <a className="hover:underline" href="/datenschutz.html">{t.privacy}</a>
              </div>
            </div>
          </footer>
        </main>

        <CaseDialog project={activeProject} open={dialogOpen} onOpenChange={setDialogOpen} lang={lang} dark={dark} />
      </TooltipProvider>
    </div>
  );
}
