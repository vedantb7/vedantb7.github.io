/**
 * skills.js — Hierarchical data for the Skills Graph.
 * Tier 1 (Root), Tier 2 (Group), Tier 3 (Node)
 */
const SKILLS = [
    // Tier 1: Root
    { id: "root", name: "SKILLS", parent: null, level: 0 },

    // Tier 2: Groups (Muted Colors)
    { id: "programming", name: "Programming", parent: "root", level: 1, color: "#0A192F" },
    { id: "tools", name: "Tools", parent: "root", level: 1, color: "#062019" },
    { id: "security", name: "Security", parent: "root", level: 1, color: "#2D0B0B" },

    // Tier 3: Nodes (Programming)
    { id: "python", name: "Python", parent: "programming", level: 2 },
    { id: "c/cpp", name: "C/C++", parent: "programming", level: 2 },
    { id: "javascript", name: "JavaScript", parent: "programming", level: 2 },
    { id: "SQL", name: "SQL", parent: "programming", level: 2 },
    { id: "css", name: "CSS", parent: "programming", level: 2 },
    { id: "js", name: "JavaScript", parent: "programming", level: 2 },
    { id: "html", name: "HTML", parent: "programming", level: 2 },

    // Tier 3: Nodes (Tools)
    { id: "gitgithub", name: "Git/GitHub", parent: "tools", level: 2 },
    { id: "docker", name: "Docker", parent: "tools", level: 2 },
    { id: "vercel", name: "Vercel", parent: "tools", level: 2 },
    { id: "Render", name: "Render", parent: "tools", level: 2 },
    { id: "mongodb", name: "MongoDB", parent: "tools", level: 2 },
    { id: "postman", name: "Postman", parent: "tools", level: 2 },
    { id: "mysql", name: "MySQL", parent: "tools", level: 2 },

    // Tier 3: Nodes (Security)
    { id: "kali", name: "Kali Linux", parent: "security", level: 2 },
    { id: "burp", name: "Burp Suite", parent: "security", level: 2 },
    { id: "metasploit", name: "Metasploit", parent: "security", level: 2 },
    { id: "ghidra", name: "Ghidra", parent: "security", level: 2 },
    { id: "wireshark", name: "Wireshark", parent: "security", level: 2 },
    { id: "nmap", name: "Nmap", parent: "security", level: 2 },
    { id: "John", name: "John", parent: "security", level: 2 },
];
