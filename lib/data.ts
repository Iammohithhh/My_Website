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
    "Achieved top 1 percentile among 1.2 million students in JEE Mains Examination (2023)",
    "Secured State Rank 314 in Karnataka Common Entrance Test (KCET) out of 0.26 million candidates (2023)",
    "Scored a perfect score of 400/400 in PCMCS in the Karnataka 12th Board Examination (2023)",
    "Secured Zonal Rank 240 in SOF International Mathematics Olympiad Exam out of 4000+ students (2019)"
  ]
};

export const skills = {
  "Programming Languages": ["Python", "C++", "JavaScript", "TypeScript", "HTML", "Bash", "LaTeX"],
  "ML/AI Frameworks": ["PyTorch", "TensorFlow", "Scikit-learn", "Qiskit", "Pandas", "NumPy"],
  "Web Development": ["React", "Next.js", "Tailwind CSS", "Node.js"],
  "Tools & Software": ["Git", "ROS", "Gazebo", "Arduino", "SolidWorks", "AutoCAD P&ID", "Fusion360", "Matplotlib"],
  "Databases": ["MySQL"],
};

export const experiences = [
  {
    title: "Research Intern",
    organization: "Nanyang Technological University (NTU), Singapore",
    location: "Singapore",
    date: "Nov '25 - Present",
    description: "Working on multi-scale water environment preparation for extracting and standardizing SOAP descriptors across ACN/DMF trajectories.",
    achievements: [
      "Built a unified multi-scale water environment preparation for extracting and standardizing SOAP descriptors",
      "Implemented unsupervised solvation classifier using experimental PCA + KMeans",
      "Developed MLP-based chemical potential framework using learned solvation geometries"
    ]
  },
  {
    title: "Machine Learning Research Intern",
    organization: "IIT Bombay",
    location: "Mumbai, India",
    date: "May '25 - Present",
    description: "Building production-grade ML pipelines for reciprocal-space Gaussian fitting and developing DDAP parameter corridors.",
    achievements: [
      "Built a production-grade Python DDAP pipeline for reciprocal-space Gaussian fitting",
      "Identified a robust DDAP parameter corridor through systematic sweeps",
      "Implemented Ewald-based long-range electrostatics using DDAP-derived atomic charges"
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

export const projects = [
  {
    title: "SOAP Descriptors Multi-Scale ML",
    description: "Built a unified multi-scale water environment preparation for extracting and standardizing SOAP descriptors across ACN/DMF trajectories, creating a global environment dataset for comparative solvation analysis.",
    tech: ["Python", "PyTorch", "Scikit-learn", "PCA", "KMeans"],
    date: "Nov '25 - Present",
    category: "Research",
    featured: true
  },
  {
    title: "ML Interatomic Potentials with Long-Range Interactions",
    description: "Built a production-grade Python DDAP pipeline for reciprocal-space Gaussian fitting and stable atomic charge extraction. Implemented Ewald-based long-range electrostatics using DDAP-derived atomic charges.",
    tech: ["Python", "DDAP", "Gaussian Fitting", "Electrostatics"],
    date: "May '25 - Present",
    category: "Research",
    featured: true
  },
  {
    title: "Physics-Informed Diffusion Models for CT Reconstruction",
    description: "Adapted the PINN-DaDiff framework from MRI to CT by replacing Fourier-domain physics with fully differentiable Radon transform. Built a four-stage physics-informed generative pipeline for X-ray photon statistics.",
    tech: ["Python", "PyTorch", "PINN", "Diffusion Models", "Medical Imaging"],
    date: "Sep '25 - Present",
    category: "Machine Learning",
    featured: true
  },
  {
    title: "AI Guard Agent for Room Monitoring",
    description: "Developed an AI guard agent with DeepFace, MediaPipe, Whisper, and TTS for real-time monitoring. Designed guard-level user enrollment and command activation to deter unwanted access.",
    tech: ["Python", "DeepFace", "MediaPipe", "Whisper", "TTS", "Computer Vision"],
    date: "Sep '25",
    category: "Computer Vision",
    featured: true
  },
  {
    title: "RAG-Powered ReAct Agent",
    description: "Built a LangChain-based ReAct agent with Groq LLMs, integrating Hugging Face embeddings, ChromaDB, and a modular RAG pipeline for semantic retrieval and tool-based control flow.",
    tech: ["Python", "LangChain", "RAG", "LLMs", "ChromaDB", "Hugging Face"],
    date: "May '25 - Jun '25",
    category: "Machine Learning",
    featured: true
  },
  {
    title: "DOGGO 1.0 - Quadruped Robot",
    description: "Designed the mechanical structure of the bot using SolidWorks and simulated the environment in Gazebo Fortress. Integrated ROS 2 with Python and implemented 2-DOF leg motion for stable gait generation using Inverse Kinematics.",
    tech: ["Python", "ROS 2", "Gazebo", "SolidWorks", "Inverse Kinematics", "Arduino"],
    date: "Jan '25 - Apr '25",
    category: "Robotics",
    featured: true
  },
  {
    title: "Stable Diffusion Text-to-Image Generation",
    description: "Built a complete Stable Diffusion pipeline in PyTorch, implementing core components including variational autoencoder (VAE), U-Net encoder, and CLIP-based text encoder.",
    tech: ["Python", "PyTorch", "Stable Diffusion", "VAE", "CLIP"],
    date: "Jan '25",
    category: "Generative AI",
    featured: false
  },
  {
    title: "Explainable CNN for Pneumonia Detection",
    description: "Built a custom CNN with 97% accuracy and 0.978 F1-score on chest X-rays. Applied Grad-CAM to highlight infected regions and generate interpretable clinical insights.",
    tech: ["Python", "TensorFlow", "CNN", "Grad-CAM", "Medical Imaging"],
    date: "Apr '25",
    category: "Computer Vision",
    featured: false
  },
  {
    title: "CNN-LSTM & CNN-Transformer for Remote Sensing",
    description: "Implemented CNN-LSTM and CNN-Transformer architectures for automated captioning of satellite images. Experimented with ResNet, MobileNetV2, InceptionV3 for feature extraction.",
    tech: ["Python", "TensorFlow", "CNN", "LSTM", "Transformer", "ResNet"],
    date: "Aug '25",
    category: "Computer Vision",
    featured: false
  },
  {
    title: "Custom CNN for Chest X-ray Classification",
    description: "Built a custom CNN with 97% accuracy and 0.978 F1-score on chest X-rays using a tailored Keras architecture. Applied Grad-CAM to highlight infected regions.",
    tech: ["Python", "Keras", "CNN", "Grad-CAM"],
    date: "Apr '25",
    category: "Computer Vision",
    featured: false
  },
  {
    title: "Wi-Fi Controlled Quadcopter",
    description: "Coordinated a team of 16 to assemble a quadcopter achieving a record flight of 120+ seconds. Integrated lightweight, durable components with Arduino, MPU 6050, and NodeMCU.",
    tech: ["Arduino", "NodeMCU", "MPU 6050", "RemoteXY", "C++"],
    date: "Jan '24 - Apr '24",
    category: "Robotics",
    featured: false
  }
];

export const hobbies = [
  {
    title: "Quizzing",
    description: "Secured 1st place in district-level science quiz among 40+ teams. Represented district in Thatt Antha Heli Science Quiz on DD Chandana.",
    icon: "Brain"
  },
  {
    title: "Problem Solving",
    description: "Love tackling complex algorithmic challenges and competitive programming problems.",
    icon: "Code"
  },
  {
    title: "Sustainable Tech",
    description: "Volunteered with NSS, IIT Bombay for impactful sustainable social initiatives and completed two terms in UCMAS Abacus.",
    icon: "Leaf"
  },
  {
    title: "Research & Innovation",
    description: "Passionate about exploring cutting-edge ML/AI research and building innovative solutions.",
    icon: "Lightbulb"
  }
];
