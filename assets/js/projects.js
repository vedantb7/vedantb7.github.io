/**
 * projects.js — Single source of truth for all portfolio project data.
 * To add/edit a project: update this array. The UI regenerates automatically.
 * liveLink: set to "#" if the project has no live URL.
 */
const PROJECTS = [
    {
        id: 1,
        title: "Axiom Dashboard",
        category: "Web Design",
        year: "2025",
        tags: ["React", "TypeScript", "D3.js"],
        thumbnail: "./assets/img/proj-1.png",
        summary: "A real-time analytics platform with a precision-engineered dark UI and live data visualisation for enterprise clients.",
        description: "Axiom Dashboard was built for a B2B SaaS client who needed to surface complex sensor data in a way that non-technical operators could parse instantly. The design brief was 'aircraft cockpit meets Bloomberg terminal' — dense with information, but never noisy. I architected the component system using React with a fully typed design-token layer in TypeScript, and hand-rolled every chart in D3.js for maximum control over animation fidelity. The result was a 40% reduction in time-to-insight for end users during usability testing.",
        link: "./project-detail.html?id=1",
        liveLink: "#"
    },
    {
        id: 2,
        title: "Vault Mobile",
        category: "Mobile App",
        year: "2024",
        tags: ["React Native", "Expo", "Figma"],
        thumbnail: "./assets/img/proj-2.png",
        summary: "A premium personal finance app with glassmorphic UI components and biometric-first security flows for iOS and Android.",
        description: "Vault was a 0-to-1 product design and development engagement. The challenge was to make security feel effortless — biometric unlock had to feel faster and more natural than typing a PIN. I designed every screen in Figma using an auto-layout system that mapped directly to React Native Stylesheet properties, cutting the design-to-code translation time by half. The glassmorphism layer system was achieved using react-native-blur with carefully tuned tint intensities for both light ambient and dark environments.",
        link: "./project-detail.html?id=2",
        liveLink: "#"
    },
    {
        id: 3,
        title: "Stratum Identity",
        category: "Brand Design",
        year: "2024",
        tags: ["Illustrator", "Brand Strategy", "Motion"],
        thumbnail: null,
        summary: "A complete visual identity system for a materials science startup — from wordmark to motion guidelines.",
        description: "Stratum came to me with a name, a mission, and a whiteboard full of ideas. I built them a full identity: a logo constructed on a geometric grid derived from crystalline lattice structures, a typographic system pairing a geometric sans with a humanist serif for scientific credibility, and a motion language guide that defined how their brand moved across digital touchpoints. The deliverable included a 60-page brand book, all master files, and a set of After Effects motion templates.",
        link: "./project-detail.html?id=3",
        liveLink: "#"
    },
    {
        id: 4,
        title: "Helix Motion",
        category: "3D & Motion",
        year: "2023",
        tags: ["Three.js", "GLSL", "WebGL"],
        thumbnail: null,
        summary: "An interactive 3D generative art installation for a biotech company's conference stand — shader-driven, real-time.",
        description: "Helix Motion was a commission to create a large-format interactive installation for a biotech company's annual conference keynote stand. Visitors could approach a 4K touchscreen and influence a real-time GLSL shader simulation of protein folding dynamics. Built entirely in Three.js with custom ShaderMaterial, it ran at a locked 60fps on a mid-range GPU. The piece was awarded 'Best Exhibition Experience' at the event. The codebase is now open-sourced and has been starred over 800 times on GitHub.",
        link: "./project-detail.html?id=4",
        liveLink: "#"
    },
    {
        id: 5,
        title: "Meridian Shop",
        category: "E-Commerce",
        year: "2023",
        tags: ["Next.js", "Shopify", "CSS Modules"],
        thumbnail: null,
        summary: "A luxury fashion e-commerce storefront with editorial-first layout and a sub-100ms perceived load time.",
        description: "Meridian Shop was a Shopify Headless Commerce project for a luxury fashion brand entering the direct-to-consumer market. They needed an editorial-first experience where the product was always the hero, never a grid card. I built the frontend in Next.js using the Storefront API, with CSS Modules for zero-runtime styling. Core Web Vitals were a hard requirement — the final LCP sat at 1.1s with full product imagery loaded. I implemented a blur-up placeholder strategy and AVIF encoding pipeline via Cloudflare Images.",
        link: "./project-detail.html?id=5",
        liveLink: "#"
    },
    {
        id: 6,
        title: "Forge CLI",
        category: "Open Source",
        year: "2022",
        tags: ["Node.js", "Ink", "NPM"],
        thumbnail: null,
        summary: "An open-source scaffolding CLI that generates opinionated TypeScript project structures with a single command.",
        description: "Forge CLI grew out of personal frustration with repetitive project setup. Built with Node.js and Ink (React for the terminal), it provides a beautiful TUI for selecting project templates and configuration, then generates a complete folder structure, CI pipeline, and linting config. It has been downloaded over 15,000 times on NPM and has 12 community-contributed templates. The codebase follows a plugin architecture, meaning any developer can publish their own Forge template as an NPM package with the `forge-template-*` naming convention.",
        link: "./project-detail.html?id=6",
        liveLink: "https://www.npmjs.com/package/forge-cli"
    }
];
