/**
 * projects.js — Single source of truth for all portfolio project data.
 * To add/edit a project: update this array. The UI regenerates automatically.
 * liveLink: set to "#" if the project has no live URL.
 */
const PROJECTS = [
    {
        id: 1,
        title: "urlX",
        category: "Web Dev",
        year: "2025",
        tags: ["NextJS", "MongoDB", "Vercel"],
        thumbnail: "./assets/img/proj-2.png",
        summary: "urlX is a modern URL shortener built using Next.js App Router and MongoDB.",
        description: "urlX is a modern URL shortener built using Next.js App Router and MongoDB. It converts long URLs into short, shareable links and redirects users instantly.",
        link: "./project-detail.html?id=1",
        liveLink: "https://urlx-s.vercel.app"
    },
    {
        id: 2,
        title: "KYT",
        category: "Generation Engine",
        year: "2026",
        tags: ["Rust", "Cargo", "CLI"],
        thumbnail: "./assets/img/proj-3.png",
        summary: "KYT (Know Your Target) is a high-performance, persona-driven password generation engine written in Rust.",
        description: `KYT (Know Your Target) is a high-performance, persona-driven password generation engine written in Rust.

            It is designed for: \n
            ✅ Authorized red-team simulations \n
            ✅ Enterprise IAM password policy auditing \n
            ✅ CTF challenge development\n 

            KYT intelligently models how humans create passwords based on personal, professional, and contextual data.`,
        link: "./project-detail.html?id=2",
        liveLink: "https://github.com/vedantb7/kyt"
    },
    {
        id: 3,
        title: "PassOP",
        category: "Web Dev",
        year: "2025",
        tags: ["React", "Tailwind", "React Router"],
        thumbnail: "./assets/img/proj-3.png",
        summary: "PassOP is a minimalist password manager.",
        description: `🔐 PassOP — Password Manager

PassOP is a modern, minimal, and secure password manager built using React, Vite, and Tailwind CSS.
It allows users to store, manage, and organize their credentials through a clean cyber-themed interface.

    🚀 This project is built as a learning-focused yet production-style React application.

✨ Features

    🏠 Home Page with animated visuals and cyber theme\n
    🔑 Password Management Dashboard \n
        Add website/app credentials
        View stored usernames
        Masked password display
        Edit & delete entries \n
    👤 User-based structure (frontend)\n
        Each user can have their own password vault \n
    🎨 Dark cyber UI
        Black & green theme
        Animated navbar
        Responsive design\n
    🌐 Client-side Routing
        Home (/home)
        Manage (/manage)\n
    ☁️ Deployed on Vercel
 `,
        link: "./project-detail.html?id=3",
        liveLink: "https://passop-manage.vercel.app/home"
    },
    {
        id: 4,
        title: "urTODO",
        category: "Web Dev",
        year: "2025",
        tags: ["React", "JavaScript", "CSS"],
        thumbnail: "./assets/img/proj-4.png",
        summary: "A Simple Todo app built using React.",
        description: `UrTODO is a simple and clean Todo application built using React.
It helps users add, manage, complete, and delete their daily tasks in an easy and intuitive way.

This project is my first complete React-based application that involves state management, component structuring, routing, responsiveness, and deployment.\n
🚀 Features

    ➕ Add new todos\n
    ✏️ Edit existing todos\n
    ✅ Mark todos as completed\n
    👀 Toggle visibility of completed todos (Show Finished)\n
    🗑 Delete todos permanently\n
    💾 Persistent storage using LocalStorage\n
    📱 Fully responsive (mobile & desktop)\n
    🎨 Clean violet–blue themed UI
`,
        link: "./project-detail.html?id=4",
        liveLink: "https://todo-57.vercel.app"
    },
    {
        id: 5,
        title: "PhishingShield",
        category: "Cybersecurity & AI",
        year: "2026",
        tags: ["PyTorch", "DistilBERT", "NLP", "Machine Learning"],
        thumbnail: "./assets/img/proj-5.png",
        summary: "Context-aware phishing detection system using dual-channel NLP and URL intelligence.",
        description: `Context-Aware Phishing Detection is an AI-powered cybersecurity project that combines NLP and URL analysis to identify phishing attempts.

🚀 Features

    🎯 DistilBERT-based message analysis
    🔗 URL feature extraction and modeling
    🧠 Multi-task classification pipeline
    ⚡ Ensemble scoring for improved reliability
    📊 Risk scoring with interpretable outputs

📈 Results

    Achieved ~75% accuracy
    F1 Score ~0.76
    Improved detection performance over single-modality approaches

This system captures intent, manipulation patterns, and impersonation signals commonly found in phishing campaigns.`,
        link: "./project-detail.html?id=5",
        liveLink: "#"
    },
    {
        id: 6,
        title: "Trado",
        category: "Full Stack",
        year: "2026",
        tags: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
        thumbnail: "./assets/img/proj-6.png",
        summary: "Real-time campus marketplace platform with live negotiation and trust mechanisms.",
        description: `Trado is a real-time marketplace platform designed for campus communities to buy, sell, and negotiate products securely.

🚀 Features

    🛒 Product listing and marketplace management
    🔐 Secure authentication and role-based access control
    💬 Real-time messaging using Socket.io
    🤝 Live offer and counter-offer negotiations
    ⭐ Karma scoring and trust mechanisms
    🛡 Moderation tools for safer transactions

Built during HackRush '26, Trado focuses on enabling trustworthy peer-to-peer trading through real-time interactions and community-driven reputation systems.`,
        link: "./project-detail.html?id=6",
        liveLink: "#"
    },
    {
        id: 7,
        title: "FreshWash",
        category: "Database Systems",
        year: "2026",
        tags: ["C++", "Python", "SQL", "Database Systems"],
        thumbnail: "./assets/img/proj-7.png",
        summary: "Full-stack laundry management system with a custom B+ Tree indexing engine.",
        description: `FreshWash is a scalable laundry management platform built around a custom database engine and indexing system.

🚀 Features

    👥 Role-Based Access Control (RBAC)
    🔌 REST API-driven architecture
    📦 End-to-end laundry order management
    🌳 Custom B+ Tree indexing engine
    🔄 ACID-compliant transaction support
    📝 Write-Ahead Logging (WAL)
    ⚡ Horizontal sharding and optimized indexing

📈 Highlights

    Improved query efficiency through custom indexing
    Implemented rollback and recovery mechanisms
    Enabled scalable and concurrency-safe operations

FreshWash combines full-stack application development with advanced database system concepts and storage engine design.`,
        link: "./project-detail.html?id=7",
        liveLink: "#"
    }

]

