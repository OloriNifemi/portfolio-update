import Ecommerce from "../assets/Ecommerce.png";
import WeddingWeb from "../assets/WeddingWeb.png";
import Birthday from "../assets/Birthday.png";

export const PROJECT_CATEGORIES = {
  ECOMMERCE: "ecommerce",
  WEDDING: "wedding",
  DESIGN_SYSTEM: "design-system",
};

export const FEATURED_PROJECTS_COUNT = 2;

export const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Storefront",
    image: Ecommerce,
    desc: "A responsive storefront with cart, checkout flow, and product filtering. Built with modern React patterns and styled with Tailwind CSS for a seamless shopping experience.",
    shortDesc: "Full-featured jewelry e-commerce platform",
    role: "Full Stack Developer",
    timeline: "3 weeks",
    category: PROJECT_CATEGORIES.ECOMMERCE,
    featured: true,
    rating: 5,
    technologies: ["React", "Tailwind CSS", "Context API", "Vercel"],
    tags: ["React", "Tailwind CSS", "Context API"],
    outcomes: [
      "Responsive design across all devices",
      "Smooth checkout experience",
      "Advanced product filtering",
      "Mobile-first approach",
    ],
    liveHref: "https://loc-jewelry-store.vercel.app/",
    codeHref: "https://github.com/OloriNifemi/Loc-Jewelry-store.git",
    color: {
      light: "#F5E6D3",
      dark: "#8B7355",
      accent: "#D4A574",
    },
  },
  {
    id: 2,
    title: "Wedding Website",
    image: WeddingWeb,
    desc: "An elegant wedding website featuring RSVP functionality, interactive countdown timer, and an immersive photo gallery. Designed with attention to detail and smooth animations.",
    shortDesc: "Elegant celebration website with RSVP",
    role: "Frontend Developer",
    timeline: "2.5 weeks",
    category: PROJECT_CATEGORIES.WEDDING,
    featured: true,
    rating: 5,
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Vercel"],
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    outcomes: [
      "Beautiful, animated user experience",
      "Functional RSVP system",
      "Real-time countdown timer",
      "Optimized image gallery",
    ],
    liveHref: "https://muyiwa-weds-debby.vercel.app/",
    codeHref: "https://github.com/OloriNifemi/Wedding-web.git",
    color: {
      light: "#FFF5F7",
      dark: "#8B5A6B",
      accent: "#D4A5B8",
    },
  },
  {
    id: 3,
    title: "Birthday Card Design System",
    image: Birthday,
    desc: "A comprehensive design system and component library built with React and Storybook. Includes accessible, reusable components following accessibility best practices and design consistency.",
    shortDesc: "Interactive component library & design system",
    role: "Design System Developer",
    timeline: "1.5 weeks",
    category: PROJECT_CATEGORIES.DESIGN_SYSTEM,
    featured: false,
    rating: 4,
    technologies: ["React", "Storybook", "Tailwind CSS", "Accessibility"],
    tags: ["React", "Storybook", "Tailwind CSS"],
    outcomes: [
      "Reusable component library",
      "Comprehensive documentation",
      "WCAG 2.1 accessibility compliance",
      "Developer-friendly API",
    ],
    liveHref: "#",
    codeHref: "https://github.com/OloriNifemi",
    color: {
      light: "#FFE4D6",
      dark: "#8B6B5A",
      accent: "#D4A89E",
    },
  },
];

export const PROJECT_ANIMATION_CONFIG = {
  staggerDelay: 0.1,
  containerDelay: 0.2,
  hoverScale: 1.02,
  tapScale: 0.98,
};
