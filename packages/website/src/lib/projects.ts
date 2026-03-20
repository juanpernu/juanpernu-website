export interface ProjectImage {
  src: string;
  alt: string;
  full?: boolean;
}

export interface ProjectGradient {
  colors: string[];
  borderHover: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  techStack: string[];
  url: string;
  gradient: ProjectGradient;
  slideoverBg: string;
  images: ProjectImage[];
  position: { left?: string; right?: string; top: string };
}

export const projects: Project[] = [
  {
    id: "iangela",
    number: "01",
    title: "iAngela — AI Virtual Assistant",
    description:
      "Asistente virtual con inteligencia artificial para clínicas odontológicas. Gestión de turnos, pacientes y consultas con interacción por voz y texto, integrado con el ecosistema Bilog.",
    techStack: ["AI", "NLP", "Voice", "Astro", "Claude API"],
    url: "https://ai.bilog.com.ar",
    gradient: {
      colors: ["#7C3AED", "#A855F7", "#6D28D9"],
      borderHover: "#A855F7",
    },
    slideoverBg: "#1a0022",
    images: [
      { src: "/projects/iangela1.png", alt: "iAngela es innovación", full: true },
      { src: "/projects/iangela2.png", alt: "iAngela chat interface" },
      { src: "/projects/iangela3.png", alt: "iAngela features" },
    ],
    position: { left: "30%", top: "70px" },
  },
  {
    id: "bilog",
    number: "02",
    title: "Bilog — Dental Tech Ecosystem",
    description:
      "Ecosistema tecnológico integral para clínicas y consultorios odontológicos. Software de gestión, historia clínica digital, facturación y herramientas de productividad para profesionales de la salud.",
    techStack: ["React", "Node.js", "AWS", "PostgreSQL"],
    url: "https://www.bilog.com.ar",
    gradient: {
      colors: ["#1D4ED8", "#3B82F6", "#1E40AF"],
      borderHover: "#3B82F6",
    },
    slideoverBg: "#001a1a",
    images: [
      { src: "/projects/bilog1.png", alt: "Bilog agenda desktop y mobile", full: true },
      { src: "/projects/bilog5.png", alt: "Bilog estadísticas y facturación" },
      { src: "/projects/bilog3.png", alt: "Bilog turno agendado mobile" },
    ],
    position: { left: "52%", top: "70px" },
  },
];
