// Recruiter-Optimized Portfolio Dataset — /test2
const PORTFOLIO_DATA = {
  about: {
    name: "John Edward (Jed) Padilla",
    title: "Lead Creative Technologist &amp; Multimedia Specialist",
    tagline: "Bridging software engineering, AI workflow orchestration, and broadcast-grade media production.",
    location: "Mandaluyong City, Metro Manila, Philippines",
    availability: "Available for Strategic Senior Roles &amp; High-Impact Technical Creative Leadership",
    paragraphs: [
      "I'm John Edward (Jed) Padilla, a Lead Creative Technologist and Multimedia Specialist based in Mandaluyong City, Philippines. I operate at the rare intersection of full-stack engineering, local AI orchestration, and broadcast-level visual storytelling.",
      "As the IT &amp; Multimedia Operations Lead at ICAN Academy for over 9 years, I direct organizational media channels across video, publications, and brand infrastructure, while having architected and deployed over 40 full-stack applications and automated internal tools using AI CLIs (Claude, AGY, Codex), local LLM orchestration (Ollama, Exo), and modern web stacks.",
      "I hold a Master of Science in Media Engineering from Soongsil University in Seoul, South Korea—where I developed computer-vision-driven educational robotics pedagogies using Python and OpenCV—alongside a Bachelor of Arts in Multimedia Studies and an Associate in Arts from the University of the Philippines."
    ],
    stats: [
      { count: 40, plus: true, label: "Deployed Apps & Tools" },
      { count: 9, plus: true, label: "Years IT & Media Leadership" },
      { count: 3, plus: false, label: "Academic Degrees (MS, BA, AA)" },
      { count: 12, plus: false, label: "Industry Certifications" }
    ]
  },

  // Top 4 Flagship Case Studies for Recruiters
  flagships: [
    {
      id: "flag_scheduling",
      category: "Full-Stack Enterprise Tool",
      badge: "Flagship Engineering",
      name: "Academy Multi-Room Scheduling Engine",
      role: "Lead Architect & Full-Stack Developer",
      impact: "Automated faculty scheduling across multiple campuses; eliminated room conflict overlaps and reduced administrative coordination time by ~70%.",
      description: "Comprehensive scheduling system engineered for real-time room assignment, faculty allocation, drag-and-drop timeline reordering, conflict detection heuristics, and automated substitute teacher tracking.",
      stack: ["React", "Node.js", "PostgreSQL", "Docker", "Tailwind CSS"],
      screenshot: "../assets/apps/scheduling-app.png",
      github: "https://github.com/icanacademy/scheduling-app",
      highlights: [
        "Real-time visual conflict detection algorithm",
        "Automated substitute assignment dispatch",
        "Multi-campus calendar sync and export"
      ]
    },
    {
      id: "flag_herald",
      category: "Digital Publishing Platform",
      badge: "Flagship Platform",
      name: "The ICAN Herald Publishing Platform",
      role: "Product Architect, Lead Designer & Developer",
      impact: "Replaced legacy paper distribution with a high-performance digital publishing engine and responsive reader serving hundreds of academy students and faculty.",
      description: "Digital magazine ecosystem featuring dual portal modes (School Magazine and Student Books), high-resolution canvas PDF rendering, flipbook navigation, and a secure editorial administration pipeline.",
      stack: ["JavaScript", "HTML5 Canvas", "PDF.js", "Express", "Cloudflare"],
      screenshot: "../assets/apps/ican-herald.png",
      github: "https://github.com/icanacademy/ican-herald-app",
      highlights: [
        "Zero-latency canvas-based cover rendering",
        "Mobile-optimized digital flipbook reader",
        "Secure role-based editorial management"
      ]
    },
    {
      id: "flag_ai_robotics",
      category: "AI & Computer Vision Research",
      badge: "Master's Thesis Research",
      name: "Q.bo AI Robotics ESL Pedagogies",
      role: "Graduate Research Lead (Soongsil University, Seoul)",
      impact: "Developed autonomous computer vision interaction protocols that increased non-native student engagement and vocabulary retention in ESL learning sessions.",
      description: "Development of Q.bo Robot-Assisted Pedagogies using Python, OpenCV, and ArUco spatial fiducial tracking. Built interactive behavioral loops enabling autonomous object recognition, visual card assessment, and adaptive verbal guidance.",
      stack: ["Python", "OpenCV", "ArUco Markers", "Robotics Hardware", "Computer Vision"],
      screenshot: "../assets/ai/qbo-system.png",
      highlights: [
        "Real-time ArUco 6DOF marker pose estimation",
        "Interactive object recognition feedback loop",
        "Published graduate academic research presentation"
      ]
    },
    {
      id: "flag_masterminds",
      category: "Video Creative Direction & Motion",
      badge: "Flagship Media Production",
      name: "The Truth About Masterminds — Executive Video Production",
      role: "Director of Post-Production, Editor & Motion Designer",
      impact: "Crafted a high-retention YouTube executive production featuring kinetic typography, calibrated sound design, and color grading tailored for audience watch time.",
      description: "Broadcast-quality video production combining crisp audio mastering, dynamic B-roll pacing, branded kinetic title cards, and multi-layered sound design engineered for modern social engagement.",
      stack: ["Final Cut Pro", "After Effects", "Sound Design", "Color Grading", "H.264 FastStart"],
      videoSrc: "../assets/videos/the-truth-about-masterminds.mp4",
      poster: "../assets/videography/the-truth-about-masterminds-poster.jpg",
      highlights: [
        "Web-optimized fast-start H.264 streaming encode",
        "Custom After Effects motion graphic supers",
        "Broadcast loudness normalization & EQ"
      ]
    }
  ],

  // 5 Official Digital Publications (All Hosted Locally)
  publications: [
    {
      id: "pub_herald_summer_2026",
      title: "The ICAN Herald",
      issue: "Summer 2026",
      tag: "Latest Edition",
      description: "Quarterly academy publication showcasing student journalism, institutional research essays, and creative literature.",
      cover: "../assets/publications/covers/ican-herald-summer-2026-cover.jpg",
      pdf: "../assets/publications/pdf/ican-herald-summer-2026.pdf",
      fileSize: "12.0 MB"
    },
    {
      id: "pub_ai_literacy_winter_2025",
      title: "AI Literacy",
      issue: "Winter 2025",
      tag: "Special Issue",
      description: "Curated feature exploring generative AI, algorithmic thinking, and ethical digital integration in modern education.",
      cover: "../assets/publications/covers/ai-literacy-winter-2025-cover.jpg",
      pdf: "../assets/publications/pdf/ai-literacy-winter-2025.pdf",
      fileSize: "9.8 MB"
    },
    {
      id: "pub_corona_virus_winter_2019",
      title: "Corona Virus",
      issue: "Winter 2019",
      tag: "Archival Issue",
      description: "Investigative coverage of the emerging pandemic, global healthcare challenges, and institutional distance-learning transition.",
      cover: "../assets/publications/covers/corona-virus-winter-2019-cover.jpg",
      pdf: "../assets/publications/pdf/corona-virus-winter-2019.pdf",
      fileSize: "2.8 MB"
    },
    {
      id: "pub_east_asia_summer_2019",
      title: "East Asia and the World",
      issue: "Summer 2019",
      tag: "Global Perspectives",
      description: "Regional analytical publication examining cross-cultural diplomacy, economic ties, and student international research.",
      cover: "../assets/publications/covers/east-asia-and-the-world-summer-2019-cover.jpg",
      pdf: "../assets/publications/pdf/east-asia-and-the-world-summer-2019.pdf",
      fileSize: "5.7 MB"
    },
    {
      id: "pub_deep_freeze_winter_2018",
      title: "Deep Freeze",
      issue: "Winter 2018",
      tag: "Inaugural Issue",
      description: "Foundational seasonal edition featuring creative writing, seasonal perspectives, and academy photojournalism.",
      cover: "../assets/publications/covers/deep-freeze-winter-2018-cover.jpg",
      pdf: "../assets/publications/pdf/deep-freeze-winter-2018.pdf",
      fileSize: "12.0 MB"
    }
  ],

  publicationSpreads: [
    {
      src: "../assets/publications/f2ff9d_08c28d01c3c4463badc4b5a28f680281~mv2.png",
      alt: "ICAN Herald — Editorial Layout Spread 01",
      id: "pub_spread_1"
    },
    {
      src: "../assets/publications/f2ff9d_6806d6ff1a6b436b9568996f4fadef47~mv2.png",
      alt: "ICAN Herald — Editorial Layout Spread 02",
      id: "pub_spread_2"
    },
    {
      src: "../assets/publications/f2ff9d_898998c6466748998b01f28d044cf165~mv2.png",
      alt: "ICAN Herald — Editorial Layout Spread 03",
      id: "pub_spread_3"
    },
    {
      src: "../assets/publications/f2ff9d_f855001c31d04ab38340a70046299159~mv2.png",
      alt: "ICAN Herald — Editorial Layout Spread 04",
      id: "pub_spread_5"
    }
  ],

  // Videography & Motion
  videography: [
    {
      src: "../assets/videos/the-truth-about-masterminds.mp4",
      poster: "../assets/videography/the-truth-about-masterminds-poster.jpg",
      title: "The Truth About Masterminds",
      tag: "YouTube Edit",
      id: "vid_masterminds"
    },
    {
      src: "../assets/videos/f2ff9d_67812df33bc64e698e4ee216483ebdce.mp4",
      poster: "../assets/videography/f2ff9d_67812df33bc64e698e4ee216483ebdcef000.jpg",
      title: "Creative Edit & Visual Effects Test",
      tag: "VFX Test",
      id: "vid_1"
    },
    {
      src: "../assets/videos/f2ff9d_6cbe8b37e19f4e95a13105a53bea1dba.mp4",
      poster: "../assets/videography/f2ff9d_6cbe8b37e19f4e95a13105a53bea1dbaf000.jpg",
      title: "Ben Interview & Executive Showcase",
      tag: "Interview Reel",
      id: "vid_2"
    },
    {
      src: "../assets/videos/f2ff9d_2be3f1695cbf487994a2ab04bcd640e7.mp4",
      poster: "../assets/videography/f2ff9d_2be3f1695cbf487994a2ab04bcd640e7f000.jpg",
      title: "Clipped Presentation",
      tag: "Presentation",
      id: "vid_3"
    },
    {
      src: "../assets/videos/f2ff9d_a797bbaff6de4c4e9e6d95a3fec8b3df.mp4",
      poster: "../assets/videography/f2ff9d_a797bbaff6de4c4e9e6d95a3fec8b3dff000.jpg",
      title: "Successful Company Brand Production",
      tag: "Commercial",
      id: "vid_4"
    },
    {
      src: "../assets/videos/f2ff9d_42829aef8b674dbdb52bd50adfa002c5.mp4",
      poster: "../assets/videography/f2ff9d_42829aef8b674dbdb52bd50adfa002c5f000.jpg",
      title: "Motion Graphics & Color Sequence",
      tag: "Motion Reel",
      id: "vid_5"
    },
    {
      src: "../assets/videos/f2ff9d_b58b5289fd174735a6bfa30400284047.mp4",
      poster: "../assets/videography/f2ff9d_b58b5289fd174735a6bfa30400284047f000.jpg",
      title: "Kinetic Typography & Creative Animation",
      tag: "Typography",
      id: "vid_6"
    }
  ],

  // Curated Cinematography & Lighting Stills (6 selected from 35)
  cinematography: [
    {
      src: "../assets/videography/f2ff9d_2050a0bdd5914c0694b5bbc384e2affd~mv2.jpg",
      title: "Portraiture & Contrast Study",
      location: "Studio Production",
      id: "cst_1"
    },
    {
      src: "../assets/videography/f2ff9d_301617a157aa48ef8729b3b228cf9f69~mv2.png",
      title: "Atmospheric Exterior Lighting",
      location: "Urban Sequence",
      id: "cst_2"
    },
    {
      src: "../assets/videography/f2ff9d_48763773cc6b4355846ce58d7d719ab4~mv2.png",
      title: "Color Grading & Frame Pacing",
      location: "Night Cinematography",
      id: "cst_3"
    },
    {
      src: "../assets/videography/f2ff9d_59142e01fb3341b1875c74fb91e0134f~mv2.png",
      title: "Depth of Field & Composition",
      location: "Architectural Perspective",
      id: "cst_4"
    },
    {
      src: "../assets/videography/f2ff9d_6b34be9ce5194551ae0bfdd2762a4f66~mv2.png",
      title: "Documentary Subject Framing",
      location: "Campus Showcase",
      id: "cst_5"
    },
    {
      src: "../assets/videography/f2ff9d_76a917e76aa6498f828a2a9193132e4d~mv2.png",
      title: "Kinetic Motion Capture",
      location: "Executive Spotlight",
      id: "cst_6"
    }
  ],

  // Curated Brand Systems & Visual Design (Top 6)
  brandSystems: [
    {
      src: "../assets/graphics/f2ff9d_0890f576e2c34df0aa3f7d10e527f311~mv2.png",
      title: "Brand Identity & Crest Guidelines",
      category: "Institutional Identity",
      id: "brand_1"
    },
    {
      src: "../assets/graphics/f2ff9d_1e00e00828d54904a4392eb182875b06~mv2.png",
      title: "Vector Illustration & Character Design",
      category: "Digital Illustration",
      id: "brand_2"
    },
    {
      src: "../assets/graphics/f2ff9d_2dbd5225bf4842579df668742d4a53ae~mv2.png",
      title: "Color Harmony & Editorial Iconography",
      category: "Visual Language",
      id: "brand_3"
    },
    {
      src: "../assets/graphics/f2ff9d_5bf36706e22f4277833ba3802be672a9~mv2.png",
      title: "Marketing Campaign Typography",
      category: "Promotional Graphics",
      id: "brand_4"
    },
    {
      src: "../assets/graphics/f2ff9d_78eb0dfb414e4aeeb46a4897f1f0a0d9~mv2.png",
      title: "Digital Art & Creative Concept Art",
      category: "Concept Design",
      id: "brand_5"
    },
    {
      src: "../assets/graphics/f2ff9d_85b46b0a6da9446f8fcce4d3ae52a657~mv2.png",
      title: "Social Media Campaign Visual Suite",
      category: "Brand Collateral",
      id: "brand_6"
    }
  ],

  // Complete 37 Apps Roster (Curated with category tags for filtering)
  apps: [
    {
      name: "Scheduling App",
      category: "Operations",
      description: "Full-stack scheduling system for managing teacher and student assignments across rooms and time slots with conflict detection.",
      screenshot: "../assets/apps/scheduling-app.png",
      tags: ["React", "Node.js", "PostgreSQL", "Docker", "Tailwind"],
      featured: true,
      id: "app_1",
      github: "https://github.com/icanacademy/scheduling-app"
    },
    {
      name: "Teacher Endorsement App",
      category: "Academic",
      description: "Teacher endorsement and credential management system for academic staff tracking and verification.",
      screenshot: "../assets/apps/teacher-endorsement.png",
      tags: ["React", "Express", "Node.js", "MongoDB"],
      featured: true,
      id: "app_2",
      github: "https://github.com/icanacademy/teacher-endorsement-app"
    },
    {
      name: "ICAN Herald App",
      category: "Publishing",
      description: "Digital publication platform for academy newsletter and student-authored books with interactive flipbook reader.",
      screenshot: "../assets/apps/ican-herald.png",
      tags: ["JavaScript", "HTML5", "CSS3", "Express"],
      featured: true,
      id: "app_3",
      github: "https://github.com/icanacademy/ican-herald-app"
    },
    {
      name: "Teacher Contract Viewer",
      category: "Operations",
      description: "Web portal for teachers to review and track contract terms, status updates, and renewal cycles.",
      screenshot: "../assets/apps/contract-viewer.png",
      tags: ["React", "Node.js", "CSS3"],
      featured: true,
      id: "app_4",
      github: "https://github.com/icanacademy/teacher-contract-viewer"
    },
    {
      name: "Curriculum Viewer",
      category: "Academic",
      description: "Interactive curriculum browsing tool for faculty and students across grade levels and language tracks.",
      tags: ["React", "Node.js", "REST API"],
      id: "app_5",
      github: "https://github.com/icanacademy/curriculum-viewer"
    },
    {
      name: "Staff Appraisal System",
      category: "Operations",
      description: "Performance review and appraisal workflow tool with rubric-based scoring and review cycles.",
      tags: ["React", "Express", "PostgreSQL"],
      id: "app_6",
      github: "https://github.com/icanacademy/staff-appraisal"
    },
    {
      name: "Book Inventory App",
      category: "Operations",
      description: "Library and textbook inventory tracker with check-out logging, barcode scanning, and status monitoring.",
      tags: ["Vue.js", "Node.js", "SQLite"],
      id: "app_7",
      github: "https://github.com/icanacademy/book-inventory-app"
    },
    {
      name: "Student Assessment Tool",
      category: "Academic",
      description: "Student evaluation platform supporting scoring rubrics, grade computation, and performance reporting.",
      tags: ["React", "TypeScript", "Node.js"],
      id: "app_8",
      github: "https://github.com/icanacademy/student-assessment-tool"
    },
    {
      name: "Online Placement Test",
      category: "Academic",
      description: "Web-based diagnostic placement test for incoming language center students with auto-scoring.",
      tags: ["JavaScript", "HTML5", "CSS3"],
      id: "app_9",
      github: "https://github.com/icanacademy/online-placement-test"
    },
    {
      name: "Video Annotation Tool",
      category: "Multimedia",
      description: "Browser-based video player with timestamped annotation and feedback capabilities for teaching reviews.",
      tags: ["JavaScript", "HTML5 Video", "Web Audio API"],
      id: "app_10",
      github: "https://github.com/icanacademy/video-annotation-tool"
    },
    {
      name: "Attendance System",
      category: "Operations",
      description: "Daily attendance recording and reporting application with exportable roll sheets and absence alerts.",
      tags: ["React", "Firebase"],
      id: "app_11",
      github: "https://github.com/icanacademy/attendance-system"
    },
    {
      name: "Tuition Fee Calculator",
      category: "Operations",
      description: "Tuition and fee estimation tool factoring in course credits, discounts, payment terms, and schedules.",
      tags: ["JavaScript", "CSS3", "HTML5"],
      id: "app_12",
      github: "https://github.com/icanacademy/tuition-fee-calculator"
    },
    {
      name: "Resource Booking App",
      category: "Operations",
      description: "Equipment and classroom facility booking application with calendar view and conflict prevention.",
      tags: ["React", "Node.js", "PostgreSQL"],
      id: "app_13",
      github: "https://github.com/icanacademy/resource-booking"
    },
    {
      name: "Student ID Generator",
      category: "Operations",
      description: "Bulk student ID card generator with printable barcode layouts and custom template rendering.",
      tags: ["Node.js", "HTML5 Canvas", "SVG"],
      id: "app_14",
      github: "https://github.com/icanacademy/student-id-generator"
    },
    {
      name: "Notification Dispatcher",
      category: "Operations",
      description: "Internal communication broadcaster sending targeted announcements via email and webhooks.",
      tags: ["Node.js", "Nodemailer", "Express"],
      id: "app_15",
      github: "https://github.com/icanacademy/notification-dispatcher"
    },
    {
      name: "Certificate Generator",
      category: "Academic",
      description: "Automated graduation and course-completion certificate generator producing print-ready PDFs.",
      tags: ["Python", "ReportLab", "PDF"],
      id: "app_16",
      github: "https://github.com/icanacademy/certificate-generator"
    },
    {
      name: "Vocabulary Flashcard App",
      category: "Academic",
      description: "Spaced-repetition vocabulary learning progressive web app designed for ESL students.",
      tags: ["React", "PWA", "IndexedDB"],
      id: "app_17",
      github: "https://github.com/icanacademy/vocab-flashcards"
    },
    {
      name: "Digital Signage Controller",
      category: "Multimedia",
      description: "Centralized dashboard for scheduling announcements and media playback across campus display screens.",
      tags: ["React", "Node.js", "WebSocket"],
      id: "app_18",
      github: "https://github.com/icanacademy/digital-signage"
    },
    {
      name: "Audio Recorder & Submitter",
      category: "Academic",
      description: "In-browser voice recording tool for student pronunciation practice and teacher feedback submission.",
      tags: ["JavaScript", "Web Audio API", "MediaRecorder"],
      id: "app_19",
      github: "https://github.com/icanacademy/audio-recorder"
    },
    {
      name: "Survey & Feedback Collector",
      category: "Academic",
      description: "Custom course-evaluation survey tool with response analytics and aggregated summary dashboards.",
      tags: ["React", "Node.js", "Chart.js"],
      id: "app_20",
      github: "https://github.com/icanacademy/feedback-collector"
    },
    {
      name: "Asset Manager",
      category: "Multimedia",
      description: "Digital media asset manager for organizing, tagging, and retrieving promotional photography and videos.",
      tags: ["Node.js", "Express", "Sharp", "SQLite"],
      id: "app_21",
      github: "https://github.com/icanacademy/asset-manager"
    },
    {
      name: "Gradebook Portal",
      category: "Academic",
      description: "Faculty grade entry portal with weighted category computations and report card generation.",
      tags: ["React", "TypeScript", "Node.js"],
      id: "app_22",
      github: "https://github.com/icanacademy/gradebook-portal"
    },
    {
      name: "Class Roster Manager",
      category: "Operations",
      description: "Class list management and batch-enrollment tool for academic term transitions.",
      tags: ["React", "REST API"],
      id: "app_23",
      github: "https://github.com/icanacademy/class-roster-manager"
    },
    {
      name: "Homework Submission Portal",
      category: "Academic",
      description: "Lightweight portal for student assignment uploads with deadline enforcement and teacher grading.",
      tags: ["React", "Express", "Multer"],
      id: "app_24",
      github: "https://github.com/icanacademy/homework-portal"
    },
    {
      name: "Teacher Schedule Viewer",
      category: "Operations",
      description: "Responsive mobile-first weekly timetable viewer tailored for teaching faculty on the go.",
      tags: ["JavaScript", "CSS Grid", "HTML5"],
      id: "app_25",
      github: "https://github.com/icanacademy/teacher-schedule-viewer"
    },
    {
      name: "Student Attendance Checker",
      category: "Operations",
      description: "Quick-tap classroom attendance tracker optimized for tablet and mobile browser usage.",
      tags: ["JavaScript", "PWA", "LocalStorage"],
      id: "app_26",
      github: "https://github.com/icanacademy/student-attendance-checker"
    },
    {
      name: "Tuition Tracker",
      category: "Operations",
      description: "Tuition payment and balance tracking ledger for student financial accounts and payment history.",
      tags: ["React", "Node.js", "SQLite"],
      id: "app_27",
      github: "https://github.com/icanacademy/tuition-tracker"
    },
    {
      name: "Student Profile Viewer",
      category: "Academic",
      description: "Comprehensive student records viewer showing enrollment history, grades, attendance, and teacher notes.",
      tags: ["React", "Express", "PostgreSQL"],
      id: "app_28",
      github: "https://github.com/icanacademy/student-profile-viewer"
    },
    {
      name: "Book Borrowing Logger",
      category: "Operations",
      description: "Kiosk application for self-service book check-out and return logging in academy reading centers.",
      tags: ["JavaScript", "HTML5", "CSS3"],
      id: "app_29",
      github: "https://github.com/icanacademy/book-borrowing-logger"
    },
    {
      name: "Event Registration Portal",
      category: "Operations",
      description: "Public-facing registration portal for academy workshops, cultural fairs, and graduation ceremonies.",
      tags: ["React", "Node.js", "Tailwind"],
      id: "app_30",
      github: "https://github.com/icanacademy/event-registration-portal"
    },
    {
      name: "Announcement Board",
      category: "Operations",
      description: "Real-time digital bulletin board displaying campus news, weather alerts, and schedule changes.",
      tags: ["JavaScript", "CSS3", "REST API"],
      id: "app_31",
      github: "https://github.com/icanacademy/announcement-board"
    },
    {
      name: "Document Request System",
      category: "Operations",
      description: "Self-service form system for students and alumni requesting transcripts, certificates, and records.",
      tags: ["React", "Express", "Nodemailer"],
      id: "app_32",
      github: "https://github.com/icanacademy/document-request-system"
    },
    {
      name: "ICAN Hiring Protocol",
      category: "Operations",
      description: "Applicant tracking and scoring pipeline for vetting, interviewing, and onboarding faculty.",
      tags: ["React", "Node.js", "Tailwind"],
      id: "app_33",
      github: "https://github.com/icanacademy/ican-hiring-protocol"
    },
    {
      name: "ICAN Herald Reader",
      category: "Publishing",
      description: "Interactive flipbook publication engine designed for multi-format magazine distribution.",
      tags: ["JavaScript", "Canvas", "PDF.js"],
      id: "app_34",
      github: "https://github.com/icanacademy/ican-herald-app"
    },
    {
      name: "Teacher Evaluation Tool",
      category: "Academic",
      description: "Peer-review and supervisor evaluation system with criteria weighting and feedback summaries.",
      tags: ["React", "Express", "Chart.js"],
      id: "app_35",
      github: "https://github.com/icanacademy/teacher-evaluation-tool"
    },
    {
      name: "Course Catalog Viewer",
      category: "Academic",
      description: "Searchable and filterable course catalog with prerequisites, credit hours, and syllabus links.",
      tags: ["React", "Tailwind", "REST API"],
      id: "app_36",
      github: "https://github.com/icanacademy/course-catalog-viewer"
    },
    {
      name: "Facility Maintenance Logger",
      category: "Operations",
      description: "Internal ticketing and task-dispatch system for reporting and tracking campus IT and facility repairs.",
      tags: ["React", "Node.js", "Express", "SQLite"],
      id: "app_37",
      github: "https://github.com/icanacademy/facility-maintenance-logger"
    }
  ],

  // Education Credentials
  education: [
    {
      degree: "Master of Science in Media Engineering",
      school: "Soongsil University",
      location: "Seoul, South Korea • 2024",
      flag: "🇰🇷",
      details: "Educational Research Assistant in AI Robotics (Python, OpenCV, ArUco fiducial vision tracking). Published findings on AI-assisted pedagogy.",
      id: "edu_1"
    },
    {
      degree: "Bachelor of Arts in Multimedia Studies",
      school: "University of the Philippines",
      location: "Philippines • 2020",
      flag: "🇵🇭",
      details: "Focused on interactive media engineering, digital narrative production, and human-computer interaction.",
      id: "edu_2"
    },
    {
      degree: "Associate in Arts",
      school: "University of the Philippines",
      location: "Philippines • 2016",
      flag: "🇵🇭",
      details: "Foundational coursework in humanities, visual communication, and digital design.",
      id: "edu_3"
    }
  ],

  // Industry Certifications
  certificates: [
    { src: "../assets/certificates/f2ff9d_083ae832a8ba42ebbe79c05e1a3848a6~mv2.jpg", alt: "Specialized Media & Tech Credential 01", id: "cert_1" },
    { src: "../assets/certificates/f2ff9d_30a5ca6aa6494191a62d4c0678fa58c6~mv2.jpg", alt: "Specialized Media & Tech Credential 02", id: "cert_2" },
    { src: "../assets/certificates/f2ff9d_46fcb9a30d954caea75c4eb57a3e9c70~mv2.jpg", alt: "Specialized Media & Tech Credential 03", id: "cert_3" },
    { src: "../assets/certificates/f2ff9d_494420e6a8d74ec6a53696771d9d9006~mv2.jpg", alt: "Specialized Media & Tech Credential 04", id: "cert_4" },
    { src: "../assets/certificates/f2ff9d_49b99df1936c4b2ebff78479532fe1d1~mv2.jpg", alt: "Specialized Media & Tech Credential 05", id: "cert_5" },
    { src: "../assets/certificates/f2ff9d_59ae8bb188f74a81b2df9ddc48c66e40~mv2.jpg", alt: "Specialized Media & Tech Credential 06", id: "cert_6" },
    { src: "../assets/certificates/f2ff9d_76a445d4c8fc4029ae06ef7f16f3933c~mv2.jpg", alt: "Specialized Media & Tech Credential 07", id: "cert_7" },
    { src: "../assets/certificates/f2ff9d_91823ebbb1694f8398e040ae22c8cb31~mv2.jpg", alt: "Specialized Media & Tech Credential 08", id: "cert_8" },
    { src: "../assets/certificates/f2ff9d_93ec3b55c65440d99908cf692c84e1b8~mv2.jpg", alt: "Specialized Media & Tech Credential 09", id: "cert_9" },
    { src: "../assets/certificates/f2ff9d_c56b7f3ba30248a3952f190eec2605dc~mv2.jpg", alt: "Specialized Media & Tech Credential 10", id: "cert_10" },
    { src: "../assets/certificates/f2ff9d_f1fffa2cbe824982998f5a6f23ae5860~mv2.jpg", alt: "Specialized Media & Tech Credential 11", id: "cert_11" },
    { src: "../assets/certificates/f2ff9d_f8a927d353ec4e7ab5ee865c19ceca75~mv2.jpg", alt: "Specialized Media & Tech Credential 12", id: "cert_12" }
  ]
};
