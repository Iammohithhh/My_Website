export const personalInfo = {
  name: "Mohith H",
  email: "mohithiitb@gmail.com",
  github: "https://github.com/Iammohithhh",
  linkedin: "https://www.linkedin.com/in/mohith-h-855667224",
  resume: "#", // Add resume link if available
};

export const about = {
  bio: "Chemical Engineering student at IIT Bombay with a passion for Machine Learning and AI research. Currently pursuing a Minor in Artificial Intelligence and Data Science from the C-MInDS Department. I specialize in developing physics-informed ML models, computer vision applications, and advanced deep learning systems.",
  education: {
    degree: "B.Tech. in Chemical Engineering",
    institution: "Indian Institute of Technology Bombay",
    year: "2023 - 2027",
    cgpa: "8.37",
  },
  achievements: [
    "Received the Undergraduate Research Award 01 (URA 01), IIT Bombay",
    "Achieved top 1 percentile among 1.2 million students in JEE Mains Examination (2023)",
    "Secured State Rank 314 in Karnataka Common Entrance Test (KCET) out of 0.26 million candidates (2023)",
    "Scored a perfect score of 400/400 in PCMCS in the Karnataka 12th Board Examination (2023)",
    "Secured Zonal Rank 240 in SOF International Mathematics Olympiad Exam out of 4000+ students (2019)"
  ]
};

export const skills = {
  "Programming Languages": ["Python", "C++", "JavaScript", "TypeScript", "HTML", "Bash", "LaTeX"],
  "ML/AI Frameworks": ["PyTorch", "TensorFlow", "Scikit-learn", "Qiskit", "Pandas", "NumPy"],
  "Tools & Software": ["Git", "ROS", "Gazebo", "Arduino", "SolidWorks", "AutoCAD P&ID", "Fusion360", "Matplotlib"],
  "Databases": ["MySQL"]
};

export const experiences = [
  {
    title: "Research Intern",
    organization: "Nanyang Technological University (NTU), Singapore",
    location: "Singapore (Remote)",
    date: "Nov '25 - Present",
    lab: "DELI Lab",
    guide: "Prof. Nitish Govindarajan, Chemical Engineering Department, NTU Singapore",
    description: "Working on multi-scale molecular feature engineering and solvation environment classification for multi-solvent electrolyte systems.",
    achievements: [
      "Engineered a unified molecular feature pipeline using SOAP descriptors across MD trajectories, producing a structured dataset for multi-solvent comparative analysis",
      "Trained an unsupervised clustering model on high-dimensional SOAP descriptors to classify distinct solvation environments across ACN/DMF trajectories",
      "Developing MLIP-based methods to predict water activity in multi-solvent electrolyte mixtures using learned solvation geometries"
    ]
  },
  {
    title: "Undergraduate Researcher",
    organization: "IIT Bombay",
    location: "Mumbai, India",
    date: "May '25 - Present",
    guide: "Prof. Sudarshan Vijay, Chemical Engineering Department",
    description: "Developing density-derived atomic charge models for long-range electrostatics. Preprint: opt-DDAP (arXiv:2604.10984).",
    achievements: [
      "Built a production-grade Python DDAP pipeline for reciprocal-space Gaussian fitting and stable atomic charge extraction from plane-wave DFT densities, achieving accurate density reconstruction on ionic benchmarks (NaCl vacancy supercells, 7–63 atoms)",
      "Developed opt-DDAP, a differentiable reformulation of DDAP as a PyTorch computational graph, replacing the numerically fragile Lagrange-multiplier solver with a Moore–Penrose pseudoinverse followed by charge renormalisation — maintaining stability up to condition numbers κ(A) > 10¹⁰",
      "Enabled gradient-based optimisation of Gaussian basis parameters (σ_start, f, g_c) via automatic differentiation, demonstrating robustness to initial conditions with <2% variation in extracted charges across four distinct starting points",
      "Validated framework on NaCl vacancy supercells and MoS₂ monolayer, including faithful reconstruction of difference charge densities (Δρ = ρ_defect − ρ_bulk), confirming applicability to defect-induced charge redistribution",
    ]
  },
  {
    title: "Junior Controls Engineer",
    organization: "Team ChemEca, IIT Bombay",
    location: "Mumbai, India",
    date: "Oct '24 - Apr '25",
    description: "Led chemical engineering innovations on net-zero solutions and sustainability projects.",
    achievements: [
      "Completed 2-week trainee program on chemical engineering concepts and sustainability",
      "Participated in Chem-E-Car Challenge 2025 and ChemE Cube Competition",
      "Designed complete lab-scale Direct Air Capture (DAC) pilot plant",
      "Performed detailed HAZOP analysis and proposed safety controls"
    ]
  }
];

interface Project {
  title: string;
  slug: string;
  description: string;
  tech: string[];
  date: string;
  category: string;
  featured: boolean;
  fullDescription: string;
  images: string[];
  videos: string[];
  pdfs: string[];
}

export const projects: Project[] = [
  {
    title: "Solvation Environment Classification for Multi-Solvent Electrolytes",
    slug: "soap-descriptors-ml",
    description: "Engineered a unified molecular feature pipeline using SOAP descriptors across MD trajectories to classify distinct solvation environments in ACN/DMF mixtures, with ongoing work on MLIP-based prediction of water activity.",
    tech: ["Python", "SOAP Descriptors", "PyTorch", "Scikit-learn", "PCA", "KMeans", "MLIPs"],
    date: "Nov '25 - Present",
    category: "Research",
    featured: true,
    fullDescription: "Engineered a unified molecular feature pipeline using SOAP descriptors across MD trajectories, producing a structured dataset for multi-solvent comparative analysis. Trained an unsupervised clustering model on high-dimensional SOAP descriptors to classify distinct solvation environments across ACN/DMF trajectories. Developing MLIP-based methods to predict water activity in multi-solvent electrolyte mixtures using learned solvation geometries. Work conducted at the DELI Lab, NTU Singapore, under Prof. Nitish Govindarajan.",
    images: [],
    videos: [],
    pdfs: []
  },
  {
    title: "opt-DDAP: Optimisable Density-Derived Atomic Point Charges",
    slug: "ml-interatomic-potentials",
    description: "Developed opt-DDAP, a differentiable PyTorch reformulation of the DDAP method, enabling gradient-based optimisation of Gaussian basis parameters for stable, accurate atomic charge extraction from plane-wave DFT densities.",
    tech: ["Python", "PyTorch", "DFT", "DDAP", "Ewald Summation", "Automatic Differentiation"],
    date: "May '25 - Present",
    category: "Research",
    featured: true,
    fullDescription: "Built a production-grade Python DDAP pipeline for reciprocal-space Gaussian fitting and stable atomic charge extraction from plane-wave DFT densities. Developed opt-DDAP, replacing the numerically fragile Lagrange-multiplier solver with a Moore–Penrose pseudoinverse followed by charge renormalisation, maintaining stability up to condition numbers κ(A) > 10¹⁰. Enabled gradient-based optimisation of Gaussian basis parameters (σ_start, f, g_c) via automatic differentiation, with <2% charge variation across diverse initial conditions. Validated on NaCl vacancy supercells and MoS₂ monolayer, including difference charge density reconstruction. Implemented Ewald-based long-range electrostatics for direct integration with MLIPs. Preprint: arXiv:2604.10984.",
    images: [],
    videos: [],
    pdfs: []
  },

  {
    title: "PlantWhisper — Multimodal AI for Plant Stress Detection",
    slug: "plantwhisper",
    description: "A multimodal AI system that analyzes plant photos to detect stress and synthesizes the acoustic signature the plant would emit — translated to human-audible range, grounded in a 2023 Cell paper on plant bioacoustics.",
    tech: ["Python", "PyTorch", "MobileNetV2", "FastSAM", "Grad-CAM", "Diffusion Models", "FastAPI", "Next.js", "Groq API", "Docker", "HuggingFace"],
    date: "2025",
    category: "Project",
    featured: true,
    fullDescription: "PlantWhisper is a multimodal AI system grounded in Khait et al. (2023, Cell), which demonstrated plants emit ultrasonic clicks (20–150 kHz) under stress via xylem cavitation. Given a plant photo, the pipeline runs FastSAM segmentation, fine-tuned MobileNetV2 classification (95.4% accuracy, 38 disease classes), and Grad-CAM explainability heatmaps to produce a 0–100% stress score. A conditional diffusion UNet generates mel spectrograms conditioned on stress level, converted to audio via Griffin-Lim vocoder and pitch-shifted from 53 kHz to human-audible 1 kHz using a validated hump-shaped stress–emission curve. Groq's Llama 3.3 70B generates plant speech from the plant's perspective, voiced via stress-adaptive Edge-TTS. Deployed as a FastAPI + Docker backend, Gradio app on HuggingFace Spaces, and Next.js 15 / Tailwind CSS portfolio on Vercel. ",
    images: [],
    videos: [],
    pdfs: []
  },

  {
    title: "DWSIM-Pilot — Claude-Guided Process Simulation via MCP",
    slug: "dwsim-pilot",
    description: "An AI-powered chemical process design platform where Claude drives DWSIM simulations through a custom MCP server — taking engineers from a natural language brief to a physics-based process flowsheet in 5 gated stages.",
    tech: ["Python", "MCP", "FastAPI", "DWSIM", "Next.js", "React", "TypeScript", "Claude API", "Docker", "SSE"],
    date: "2025",
    category: "Project",
    featured: true,
    fullDescription: "CPD-Pilot is a full-stack chemical process design platform built around a custom Model Context Protocol (MCP) server exposing 25+ specialized tools for Claude integration. The MCP server covers four domains: a process library with 15+ pre-built industrial synthesis routes (ammonia, ethanol, methanol, etc.), NLP-based parameter extraction with automatic unit normalization, web search for novel processes, and a DWSIM integration layer (2,500+ lines) handling compound management, unit operations, stream conditions, thermodynamic model selection (PR, SRK, NRTL), simulation execution, and PNG/SVG flowsheet export via a 3-strategy fallback. Claude guides users through a gated 5-stage workflow — requirements parsing, route selection, thermodynamic model confirmation, block-flow diagram, and DWSIM-generated PFD — with user approval required at each stage. FastAPI backend manages session-based state persistence and real-time SSE streaming; Next.js 14 / React 18 frontend delivers live chat, interactive BFD visualization, and DWSIM flowsheet rendering. Deployed as a Docker Compose stack with health checks and persistent volume management.",
    images: [],
    videos: [],
    pdfs: []
  },

  {
    title: "Physics-Informed Diffusion Models for CT Reconstruction",
    slug: "physics-informed-diffusion-ct",
    description: "Adapted the PINN-DaDiff framework from MRI to CT by replacing Fourier-domain physics with fully differentiable Radon transform. Built a four-stage physics-informed generative pipeline for X-ray photon statistics.",
    tech: ["Python", "PyTorch", "PINN", "Diffusion Models", "Medical Imaging"],
    date: "Sep '25 - Present",
    category: "Machine Learning",
    featured: true,
    fullDescription: "Adapted the PINN-DaDiff framework from MRI to CT by replacing Fourier-domain physics with fully differentiable Radon transform. Built a four-stage physics-informed generative pipeline for X-ray photon statistics.",
    images: [],
    videos: [],
    pdfs: []
  },
  {
    title: "AI Guard Agent for Room Monitoring",
    slug: "ai-guard-agent",
    description: "Developed an AI guard agent with DeepFace, MediaPipe, Whisper, and TTS for real-time monitoring. Designed guard-level user enrollment and command activation to deter unwanted access.",
    tech: ["Python", "DeepFace", "MediaPipe", "Whisper", "TTS", "Computer Vision"],
    date: "Sep '25",
    category: "Computer Vision",
    featured: true,
    fullDescription: "Developed an AI guard agent with DeepFace, MediaPipe, Whisper, and TTS for real-time monitoring. Designed guard-level user enrollment and command activation to deter unwanted access.",
    images: [],
    videos: [],
    pdfs: []
  },

  {
    title: "DOGGO 1.0 - Quadruped Robot",
    slug: "doggo-quadruped-robot",
    description: "Designed the mechanical structure of the bot using SolidWorks and simulated the environment in Gazebo Fortress. Integrated ROS 2 with Python and implemented 2-DOF leg motion for stable gait generation using Inverse Kinematics.",
    tech: ["Python", "ROS 2", "Gazebo", "SolidWorks", "Inverse Kinematics", "Arduino"],
    date: "Jan '25 - Apr '25",
    category: "Robotics",
    featured: true,
    fullDescription: "Designed the mechanical structure of the bot using SolidWorks and simulated the environment in Gazebo Fortress. Integrated ROS 2 with Python and implemented 2-DOF leg motion for stable gait generation using Inverse Kinematics.",
    images: [],
    videos: [],
    pdfs: []
  },
  {
    title: "Surgical Organ Segmentation with Uncertainty Estimation",
    slug: "surgical-organ-segmentation",
    description: "Course project (CS 736: Medical Image Computing, IIT Bombay) — fine-tuned SegFormer-B0 on the DSAD laparoscopic dataset for multi-organ segmentation across 11 organ classes, with MC-Dropout uncertainty maps and risk-coverage analysis.",
    tech: ["Python", "PyTorch", "SegFormer", "HuggingFace Transformers", "Albumentations", "OpenCV", "DSAD Dataset"],
    date: "2025",
    category: "Project",
    featured: false,
    fullDescription: "Course project for CS 736: Medical Image Computing at IIT Bombay. Built a surgical organ segmentation pipeline on the DSAD laparoscopic dataset covering 11 organ classes (liver, pancreas, colon, spleen, ureter, etc.) across binary and multilabel subsets. Fine-tuned SegFormer-B0 (pre-trained on ADE20K) using a combined Dice + Cross-Entropy loss with AdamW optimisation, gradient accumulation, and cosine LR scheduling, tracking per-organ IoU and HD95 on held-out test splits stratified by surgery ID. Implemented a smoke detection preprocessing stage using dark channel prior scoring and CLAHE-based image enhancement. Added MC-Dropout uncertainty estimation with per-pixel entropy maps, temperature scaling calibration (reliability diagrams), and a risk-coverage curve (AURC) to characterise selective prediction behaviour.",
    images: [],
    videos: [],
    pdfs: []
  },

  {
    title: "CNN-LSTM & CNN-Transformer for Remote Sensing",
    slug: "cnn-lstm-transformer-remote-sensing",
    description: "Implemented CNN-LSTM and CNN-Transformer architectures for automated captioning of satellite images. Experimented with ResNet, MobileNetV2, InceptionV3 for feature extraction.",
    tech: ["Python", "TensorFlow", "CNN", "LSTM", "Transformer", "ResNet"],
    date: "Aug '25",
    category: "Computer Vision",
    featured: false,
    fullDescription: "Implemented CNN-LSTM and CNN-Transformer architectures for automated captioning of satellite images. Experimented with ResNet, MobileNetV2, InceptionV3 for feature extraction.",
    images: [],
    videos: [],
    pdfs: []
  },
  {
    title: "Custom CNN for Chest X-ray Classification",
    slug: "custom-cnn-chest-xray",
    description: "Course project (DS 303: Introduction to ML, IIT Bombay) — built a custom CNN achieving 97% accuracy and 0.978 F1-score on chest X-rays, with Grad-CAM for infected region localisation.",
    tech: ["Python", "Keras", "CNN", "Grad-CAM"],
    date: "Apr '25",
    category: "Computer Vision",
    featured: false,
    fullDescription: "Course project for DS 303: Introduction to ML at IIT Bombay. Built a custom CNN achieving 97% accuracy and 0.978 F1-score on chest X-rays using a tailored Keras architecture, with Grad-CAM applied to highlight infected regions.",
    images: [],
    videos: [],
    pdfs: []
  },

  {
    title: "Wi-Fi Controlled Quadcopter",
    slug: "wifi-controlled-quadcopter",
    description: "Coordinated a team of 6 to assemble a quadcopter achieving a record flight of 120+ seconds. Integrated lightweight, durable components with Arduino, MPU 6050, and NodeMCU.",
    tech: ["Arduino", "NodeMCU", "MPU 6050", "RemoteXY", "C++"],
    date: "Jan '24 - Apr '24",
    category: "Robotics",
    featured: false,
    fullDescription: "Coordinated a team of 16 to assemble a quadcopter achieving a record flight of 120+ seconds. Integrated lightweight, durable components with Arduino, MPU 6050, and NodeMCU.",
    images: [],
    videos: [],
    pdfs: []
  }
];

export const hobbies = [
  {
    title: "Quizzing",
    description: "Secured 1st place in district-level science quiz among 40+ teams. Represented district in Thatt Antha Heli Science Quiz on DD Chandana.",
    icon: "Brain",
    hasGallery: false,
    images: []
  },
  {
    title: "Sketching",
    description: "Creating artistic sketches and drawings.",
    icon: "Pencil",
    hasGallery: true,
    images: [
      "/hobbies/sketches/1.jpeg",
      "/hobbies/sketches/2.jpeg",
      "/hobbies/sketches/3.jpeg",
      "/hobbies/sketches/4.jpeg",
      "/hobbies/sketches/5.jpeg",
      "/hobbies/sketches/6.jpeg"
    ]
  },
  {
    title: "Whistling Songs",
    description: "Enjoy whistling melodies and songs in my free time.",
    icon: "Music",
    hasGallery: false,
    images: []
  },
  {
    title: "Sky Pictures",
    description: "Capturing beautiful moments of the sky through photography.",
    icon: "Camera",
    hasGallery: true,
    images: [
      "/hobbies/sky-pictures/sky1.jpeg",
      "/hobbies/sky-pictures/sky2.jpeg",
      "/hobbies/sky-pictures/sky3.jpeg",
      "/hobbies/sky-pictures/sky4.jpeg",
      "/hobbies/sky-pictures/sky5.jpeg",
      "/hobbies/sky-pictures/sky6.jpeg",
      "/hobbies/sky-pictures/sky7.jpeg",
      "/hobbies/sky-pictures/sky8.jpeg",
      "/hobbies/sky-pictures/sky9.jpeg"

    ]
  }
];
