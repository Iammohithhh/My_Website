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
  "Tools & Software": ["Git", "ROS", "Gazebo", "Arduino", "SolidWorks", "AutoCAD P&ID", "Fusion360", "Matplotlib"],
  "Databases": ["MySQL"]
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
    title: "SOAP Descriptors Multi-Scale ML",
    slug: "soap-descriptors-ml",
    description: "Built a unified multi-scale water environment preparation for extracting and standardizing SOAP descriptors across ACN/DMF trajectories, creating a global environment dataset for comparative solvation analysis.",
    tech: ["Python", "PyTorch", "Scikit-learn", "PCA", "KMeans"],
    date: "Nov '25 - Present",
    category: "Research",
    featured: true,
    fullDescription: "Built a unified multi-scale water environment preparation for extracting and standardizing SOAP descriptors across ACN/DMF trajectories, creating a global environment dataset for comparative solvation analysis.",
    images: [],
    videos: [],
    pdfs: []
  },
  {
    title: "ML Interatomic Potentials with Long-Range Interactions",
    slug: "ml-interatomic-potentials",
    description: "Built a production-grade Python DDAP pipeline for reciprocal-space Gaussian fitting and stable atomic charge extraction. Implemented Ewald-based long-range electrostatics using DDAP-derived atomic charges.",
    tech: ["Python", "DDAP", "Gaussian Fitting", "Electrostatics"],
    date: "May '25 - Present",
    category: "Research",
    featured: true,
    fullDescription: "Built a production-grade Python DDAP pipeline for reciprocal-space Gaussian fitting and stable atomic charge extraction. Implemented Ewald-based long-range electrostatics using DDAP-derived atomic charges.",
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
    title: "RAG-Powered ReAct Agent",
    slug: "rag-powered-react-agent",
    description: "Built a LangChain-based ReAct agent with Groq LLMs, integrating Hugging Face embeddings, ChromaDB, and a modular RAG pipeline for semantic retrieval and tool-based control flow.",
    tech: ["Python", "LangChain", "RAG", "LLMs", "ChromaDB", "Hugging Face"],
    date: "May '25 - Jun '25",
    category: "Machine Learning",
    featured: true,
    fullDescription: "Built a LangChain-based ReAct agent with Groq LLMs, integrating Hugging Face embeddings, ChromaDB, and a modular RAG pipeline for semantic retrieval and tool-based control flow.",
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
    title: "Stable Diffusion Text-to-Image Generation",
    slug: "stable-diffusion-text-to-image",
    description: "Built a complete Stable Diffusion pipeline in PyTorch, implementing core components including variational autoencoder (VAE), U-Net encoder, and CLIP-based text encoder.",
    tech: ["Python", "PyTorch", "Stable Diffusion", "VAE", "CLIP"],
    date: "Jan '25",
    category: "Generative AI",
    featured: false,
    fullDescription: "Built a complete Stable Diffusion pipeline in PyTorch, implementing core components including variational autoencoder (VAE), U-Net encoder, and CLIP-based text encoder.",
    images: [],
    videos: [],
    pdfs: []
  },
  {
    title: "Explainable CNN for Pneumonia Detection",
    slug: "explainable-cnn-pneumonia",
    description: "Built a custom CNN with 97% accuracy and 0.978 F1-score on chest X-rays. Applied Grad-CAM to highlight infected regions and generate interpretable clinical insights.",
    tech: ["Python", "TensorFlow", "CNN", "Grad-CAM", "Medical Imaging"],
    date: "Apr '25",
    category: "Computer Vision",
    featured: false,
    fullDescription: "Built a custom CNN with 97% accuracy and 0.978 F1-score on chest X-rays. Applied Grad-CAM to highlight infected regions and generate interpretable clinical insights.",
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
    description: "Built a custom CNN with 97% accuracy and 0.978 F1-score on chest X-rays using a tailored Keras architecture. Applied Grad-CAM to highlight infected regions.",
    tech: ["Python", "Keras", "CNN", "Grad-CAM"],
    date: "Apr '25",
    category: "Computer Vision",
    featured: false,
    fullDescription: "Built a custom CNN with 97% accuracy and 0.978 F1-score on chest X-rays using a tailored Keras architecture. Applied Grad-CAM to highlight infected regions.",
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
