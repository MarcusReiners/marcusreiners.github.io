import React, { useMemo, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Github, Mail, Phone, MapPin, Download, ExternalLink, Moon, Sun, Music, Waves } from "lucide-react";
import portrait from "@/assets/img/portrait.jpg";
import smart_crocs from "@/assets/img/smart_crocs.jpg";
import latent_news from "@/assets/img/latent_news.jpg";
import ui_cycle from "@/assets/img/ui_cycle.jpg";
import ffr from "@/assets/img/FFR.jpg";
import sleepWellnessCover from "@/assets/img/sleep_wellness.jpg";
import diving1 from "@/assets/img/diving1.jpg";
import diving2 from "@/assets/img/diving2.jpg";
import diving3 from "@/assets/img/diving3.jpg";

const CONTACT = {
  name: "Marcus Reiners",
  role: "UX / HCI",
  location: "Germering · München",
  email: "reiners.marcus710@gmail.com",
  phone: "01575 6145817",
  github: "https://github.com/MarcusReiners",
  linkedin: "#",
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
    id: "smart-crocs",
    title: "Smart Crocs – Intelligent Footwear",
    cover: smart_crocs,
    tags: ["HCD", "Prototyping", "Sensorik", "Safety"],
    role: "HCD, Prototyping, Systemarchitektur",
    problem:
      "Ältere Menschen stürzen häufig und verlieren Selbstständigkeit. Wie geben wir Sicherheit ohne die Interaktion zu verkomplizieren?",
    process:
      "Interviews, Szenarien, Low→Hi-Fi-Prototypen. Drucksensoren + LED-Feedback, Sturzerkennungslogik, Notfallfluss. Usability-Tests mit Fokus auf Barrierefreiheit.",
    outcome:
      "Funktionierender Hi-Fi-Prototyp, erkennt Stürze, informiert Kontakte. Gelernt: Schwellenwerte, False Positives, erklärbares Feedback.",
    links: [{ label: "Case Study", href: "/case-studies/smart-crocs.html" }],
  },
  {
    id: "latent-news-room",
    title: "Latent News Room – AI in Arts",
    cover: latent_news,
    tags: ["AI", "React/Vite/TS", "ESP32", "MicroPython"],
    role: "Architektur & Frontend",
    problem: "Wie beeinflusst algorithmischer Bias die Wahrnehmung politischer Inhalte?",
    process:
      "SPA mit React/Vite/TS. Medienlogik für Echtzeit-Umschaltung nach politischer Ausrichtung. Hardwaresteuerung per ESP32 + MicroPython.",
    outcome:
      "Installation macht Bias erlebbar. Learnings zu Ethik, Transparenz und UI für Erklärbarkeit (XAI).",
    links: [
      { label: "GitHub", href: "https://github.com/alKerim/news_channels" },
      { label: "Case Study", href: "/case-studies/latent-news-room.html" },
    ],
  },
  {
    id: "sleep-wellness",
    title: "Visualizing Sleep Wellness – Data Physicalization",
    cover: sleepWellnessCover,
    tags: ["Data Physicalization", "UX Research", "Prototyping", "Hardware"],
    role: "Research, Concept & Hardware Prototyping",
    problem:
      "Schlafdaten werden oft erfasst, aber selten als motivierendes, alltagsnahes Feedback erlebbar gemacht.",
    process:
      "Research (Survey, Fokusgruppe) → Konzept für beruhigende, ambient sichtbare Darstellung. ESP32-Prototyp mit Displays & LED-Flamme, gekoppelt an Schlafdaten.",
    outcome:
      "Funktionierender Prototyp, der Schlafqualität subtil visualisiert. Qualitatives Feedback zeigt Potenzial für Verhaltensänderungen.",
    links: [
      // optional: link to your PDF or case page
      // { label: "Thesis (PDF)", href: "/case-studies/Visualizing-Sleep-Wellness.pdf" },
    ],
  },
];

const EXPERIENCE = [
  {
    org: "Quality First Software GmbH",
    period: "Seit 2023",
    role: "Werkstudent & Praktikant – Softwareentwicklung & UX Testing",
    bullets: [
      "Java/Kotlin (Android, Compose UI)",
      "Accessibility-Analyse & Anpassungen (NVDA)",
      "UX-Report & Prototyping basierend auf Nutzerfeedback",
      "Smoke-Tests & QA vor Releases",
    ],
  },
];

const EDUCATION = [
  {
    org: "LMU München",
    period: "seit 04/2024",
    title: "Master Mensch-Computer-Interaktion",
    details: "Schwerpunkte: HCD, Usability Evaluation, Prototyping, KI im UX-Kontext",
  },
  {
    org: "LMU München",
    period: "10/2020 – 03/2024",
    title: "Bachelor Medieninformatik",
    details:
      "BA: Visualisierung von Schlafdaten zur Verbesserung von Schlafgewohnheiten (Interaktive App, Data Viz & Usability)",
  },
  {
    org: "Aarhus Universitet (DK)",
    period: "WS 2024",
    title: "Auslandssemester",
    details: "Teamprojekt UIcycle – Intelligentes Fahrradsicherheits-System",
  },
];

const PASSIONS = {
  music: {
    title: "Falling For Roza",
    description: "Band & Musikprojekt",
    website: "https://fallingforroza.com",
    instagram: "https://instagram.com/fallingforroza",
    spotifyEmbed: "https://open.spotify.com/embed/artist/5qPFGbMxO8xYbVwYWFyLdY",
    image: ffr,
  },
  diving: {
    title: "Tauchen",
    description: "Leidenschaft für die Unterwasserwelt",
    ssiLink: "https://www.divessi.com/profile/4788627",
    images: [
      diving1,
      diving2,
      diving3,
    ],
  },
};

function SectionTitle({ title }) {
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

function TagList({ tags }) {
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

function CaseDialog({ project, open, onOpenChange }) {
  if (!project) return null;

  const mediaSrc = project.cover ?? project.image;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          bg-background text-foreground border border-border
          sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl
        "
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-light">{project.title}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Scaled image — smaller, never cropped */}
          <div className="rounded-lg bg-muted/20 p-2 flex justify-center">
            <img
              src={mediaSrc}
              alt={project.title}
              className="
                w-full max-w-[900px]
                max-h-[45vh]
                object-contain
                rounded-md
              "
            />
          </div>

          {/* Tags */}
          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <Badge key={t} variant="outline" className="font-normal">
                  {t}
                </Badge>
              ))}
            </div>
          )}

          {/* Info columns */}
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Problem</h4>
              <p className="text-muted-foreground">{project.problem}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Prozess</h4>
              <p className="text-muted-foreground">{project.process}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Ergebnis</h4>
              <p className="text-muted-foreground">{project.outcome}</p>
            </div>
          </div>

          {/* Links */}
          {project.links?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.links.map((l) => (
                <Button key={l.href} asChild variant="outline" size="sm">
                  <a href={l.href} target="_blank" rel="noreferrer">
                    {l.label}
                  </a>
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}



export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [activeProject, setActiveProject] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

  const rootClass = useMemo(() => (dark ? "dark" : ""), [dark]);

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
                <a className="text-sm hover:text-foreground transition-colors" href="#work">
                  Work
                </a>
                <a className="text-sm hover:text-foreground transition-colors" href="#experience">
                  Experience
                </a>
                <a className="text-sm hover:text-foreground transition-colors" href="#passions">
                  Passions
                </a>
                <a className="text-sm hover:text-foreground transition-colors" href="#contact">
                  Contact
                </a>
              </nav>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setDark((d) => !d)}>
                  {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href={CONTACT.resumeUrl} download>
                    CV
                  </a>
                </Button>
              </div>
            </div>
          </motion.header>

<section id="content" className="container mx-auto px-4 py-14 md:py-18 lg:py-24">
  <div className="mx-auto grid max-w-screen-2xl grid-cols-1 lg:grid-cols-12 items-center gap-10 md:gap-14 lg:gap-20">
    {/* Text column */}
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-6 xl:col-span-5"
    >
      <h1 className="font-light leading-tight tracking-tight mb-5
                     text-[clamp(1.9rem,3.2vw+1rem,3.75rem)]">
        Ich erforsche und gestalte Nutzererlebnisse
      </h1>

      <p className="text-muted-foreground mb-7
                    text-[clamp(0.95rem,0.6vw+0.8rem,1.25rem)]">
        Masterstudent MCI (LMU) mit Praxis in Software, Hardware und UX.
        Von Research &amp; Konzeption bis zu Hi-Fi-Prototypen.
      </p>

      <div className="flex flex-wrap gap-3 mb-8 md:mb-10">
        <Button asChild className="min-w-[9rem]">
          <a href="#work">View Work</a>
        </Button>
        <Button asChild variant="outline" className="min-w-[9rem]">
          <a href={`mailto:${CONTACT.email}`}>Get in Touch</a>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {SKILLS.map((s) => (
          <Badge
            key={s}
            variant="secondary"
            className="font-normal px-2.5 py-1 text-[13px] md:text-[12px] lg:text-xs"
          >
            {s}
          </Badge>
        ))}
      </div>
    </motion.div>

    {/* Image column */}
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="lg:col-span-6 xl:col-span-7"
    >
      <div className="relative mx-auto w-full
                      max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
                      aspect-[4/5] md:aspect-[5/6] lg:aspect-[16/13]
                      rounded-3xl overflow-hidden shadow-2xl">
        {/* Use <picture> so desktop can load a larger asset without punishing mobile */}
        <picture>
          <source srcSet={`${portrait}?w=1600 1x, ${portrait}?w=2400 2x`} media="(min-width: 1024px)" />
          <source srcSet={`${portrait}?w=900 1x, ${portrait}?w=1400 2x`} media="(min-width: 640px)" />
          <img
            src={portrait}
            alt="Portrait Marcus Reiners"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
            sizes="(min-width:1280px) 720px, (min-width:1024px) 560px, (min-width:640px) 420px, 300px"
          />
        </picture>
      </div>
    </motion.div>
  </div>
</section>


<section id="work" className="container mx-auto px-4 py-20 bg-muted/30">
  <SectionTitle title="Selected Work" />
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {PROJECTS.map((p, i) => (
      <motion.div
        key={p.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.06 }}
        className="group cursor-pointer"
        onClick={() => {
          setActiveProject(p);
          setDialogOpen(true);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setActiveProject(p);
            setDialogOpen(true);
          }
        }}
      >
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img
            src={p.cover}
            alt={p.title}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <h3 className="text-lg font-medium mb-2">{p.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{p.role}</p>
        <TagList tags={p.tags} />
      </motion.div>
    ))}
  </div>
</section>

          <section id="experience" className="container mx-auto px-4 py-20">
            <Tabs defaultValue="experience" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>
              <TabsContent value="experience" className="grid gap-6 md:grid-cols-2">
                {EXPERIENCE.map((e) => (
                  <Card key={e.org}>
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">{e.org}</CardTitle>
                      <CardDescription>
                        {e.period} · {e.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {e.bullets.map((b) => (
                          <li key={b}>• {b}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="education" className="grid gap-6 md:grid-cols-3">
                {EDUCATION.map((ed) => (
                  <Card key={ed.title}>
                    <CardHeader>
                      <CardTitle className="text-base font-medium">{ed.title}</CardTitle>
                      <CardDescription>
                        {ed.org} · {ed.period}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">{ed.details}</CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </section>

          <section id="passions" className="container mx-auto px-4 py-20 bg-muted/30">
            <SectionTitle title="Beyond Work" />

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Music className="h-5 w-5" />
                  <h3 className="text-xl font-medium">{PASSIONS.music.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{PASSIONS.music.description}</p>

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
                    <a href={PASSIONS.music.website} target="_blank" rel="noreferrer">
                      Website
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={PASSIONS.music.instagram} target="_blank" rel="noreferrer">
                      Instagram
                    </a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Waves className="h-5 w-5" />
                  <h3 className="text-xl font-medium">{PASSIONS.diving.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{PASSIONS.diving.description}</p>

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

          <section id="contact" className="container mx-auto px-4 py-20">
            <div className="max-w-2xl">
              <SectionTitle title="Get in Touch" />
              <div className="flex flex-wrap gap-3 mb-8">
                <Button asChild>
                  <a href={`mailto:${CONTACT.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Email
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
                    Download CV
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
                <a className="hover:underline" href="/impressum.html">
                  Impressum
                </a>
                <a className="hover:underline" href="/datenschutz.html">
                  Datenschutz
                </a>
              </div>
            </div>
          </footer>
        </main>

        <CaseDialog project={activeProject} open={dialogOpen} onOpenChange={setDialogOpen} />
      </TooltipProvider>
    </div>
  );
}