// All site content lives here. Edit this file to update the website;
// blog posts live separately in content/writing/*.md.

export const site = {
  name: "Mohith H",
  title: "Mohith H — ML for atomistic simulation",
  description:
    "Chemical Engineering undergraduate at IIT Bombay working on machine learning interatomic potentials, long-range electrostatics and differentiable scientific computing.",
  url: "https://mohith-h.vercel.app",
};

export const personalInfo = {
  name: "Mohith H",
  role: "Chemical Engineering · IIT Bombay",
  email: "mohithiitb@gmail.com",
  github: "https://github.com/Iammohithhh",
  linkedin: "https://www.linkedin.com/in/mohith-h-855667224",
  // Paste your Google Scholar profile URL here; the link is hidden while empty.
  scholar: "",
  // Put your CV at public/cv.pdf; the CV link appears automatically once the file exists.
  cv: "/cv.pdf",
};

export const intro = [
  "I'm drawn to the space where physics meets machine learning: teaching models to respect the physics of atoms and molecules, and making simulations fast and accurate enough to answer real chemical questions.",
  "I like understanding a problem from first principles and then building the tools to explore it, from simulation pipelines and differentiable code to the occasional robot.",
];

export const researchInterests = [
  "AI for science",
  "ML interatomic potentials",
  "Atomistic machine learning",
  "Long-range electrostatics",
  "Differentiable scientific computing",
];

// Newest first. Keep each item to one sentence.
export const news: { date: string; text: string; href?: string }[] = [
  {
    date: "Aug 2026",
    text: "Started my undergraduate thesis on long-range ML potentials for metal/water interfaces with Prof. Sudarshan Vijay.",
    href: "/research/metal-water-mlips",
  },
  {
    date: "Jul 2026",
    text: "opt-DDAP published in the Journal of Chemical Theory and Computation.",
    href: "https://doi.org/10.1021/acs.jctc.6c00727",
  },
  {
    date: "Jun 2026",
    text: "Joined Deep Forest Sciences as a Scientific Research Intern, adding DFT to Physika.",
    href: "/projects/physika-dft",
  },
  {
    date: "2026",
    text: "Received IIT Bombay's Undergraduate Research Award (URA-01).",
  },
  {
    date: "Apr 2026",
    text: "opt-DDAP preprint posted on arXiv.",
    href: "https://arxiv.org/abs/2604.10984",
  },
  {
    date: "Dec 2025",
    text: "Joined the DELI Lab at NTU Singapore to work on water activity in organic–water electrolytes.",
    href: "/research/water-activity",
  },
];

// ---------------------------------------------------------------------------
// Publications — the single source for papers. Research entries refer to them by id.
// ---------------------------------------------------------------------------

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  details?: string;
  doi?: string;
  arxiv?: string;
  code?: string;
}

export const publications: Publication[] = [
  {
    id: "opt-ddap",
    title: "opt-DDAP: Optimizable Density-Derived Atomic Point Charges via Automatic Differentiation",
    authors: ["Mohith H", "Sudarshan Vijay"],
    venue: "Journal of Chemical Theory and Computation",
    year: 2026,
    details: "22(14), 7362–7369",
    doi: "10.1021/acs.jctc.6c00727",
    arxiv: "2604.10984",
  },
];

export function publicationLinks(pub: Publication) {
  const links: { label: string; href: string }[] = [];
  if (pub.doi) links.push({ label: "Paper", href: `https://doi.org/${pub.doi}` });
  if (pub.arxiv) links.push({ label: "arXiv", href: `https://arxiv.org/abs/${pub.arxiv}` });
  if (pub.code) links.push({ label: "Code", href: pub.code });
  return links;
}

// ---------------------------------------------------------------------------
// Research — selected projects, each answering: what problem, what I did,
// what evidence supports it, what remains open, and where the outputs are.
// ---------------------------------------------------------------------------

export interface ResearchProject {
  slug: string;
  title: string;
  status: string;
  period: string;
  place: string;
  advisor: string;
  summary: string;
  problem: string;
  contribution: string[];
  evidence: string[];
  // Open questions and known limitations; the section is hidden while empty.
  limitations: string[];
  methods: string[];
  publicationId?: string;
  links: { label: string; href: string }[];
  // Defaults to the schematic at public/thumbs/<slug>.svg. To use a real plot or molecular
  // visualisation instead, put it in public/research/ and set image (and imageCaption) here.
  image?: string;
  imageCaption?: string;
}

export function imageFor(item: { slug: string; image?: string }) {
  return item.image ?? `/thumbs/${item.slug}.svg`;
}

export const research: ResearchProject[] = [
  {
    slug: "opt-ddap",
    title: "Differentiable atomic charges from DFT densities (opt-DDAP)",
    status: "Published in JCTC, 2026",
    period: "May 2025 – March 2026",
    place: "IIT Bombay",
    advisor: "Prof. Sudarshan Vijay",
    summary:
      "Reformulated density-derived atomic point (DDAP) charges as a differentiable PyTorch pipeline, yielding DFT-derived charges for long-range electrostatics in ML potentials.",
    problem:
      "Interatomic potentials with long-range electrostatics need atomic charges that are consistent with the electron density from DFT. DDAP obtains these charges by fitting Gaussians to the plane-wave density, but its Lagrange-multiplier solve breaks down for ill-conditioned fits, and the Gaussian basis has to be tuned by hand.",
    contribution: [
      "Cast the full DDAP fit (Gaussian basis, weighted reciprocal-space loss, linear solve) as an end-to-end differentiable graph, optimizing basis widths and cutoff with Adam.",
      "Replaced the Lagrange-multiplier solve with an SVD pseudoinverse and charge rescaling.",
    ],
    evidence: [
      "Charges stay physical up to κ ∼ 10¹⁷, versus 10¹¹ for the constrained solve.",
      "Validated on ionic and covalent solids (NaCl vacancy supercells up to 63 atoms, MoS₂ monolayer), recovering the 7-electron Cl-vacancy charge from DFT difference densities.",
      "Four starting points converged to consistent basis widths and atomic charges within 1.6%, removing manual parameter tuning.",
    ],
    limitations: [],
    methods: ["DFT", "PyTorch", "Automatic differentiation", "SVD pseudoinverse"],
    publicationId: "opt-ddap",
    links: [],
  },
  {
    slug: "metal-water-mlips",
    title: "Long-range ML potentials for metal/water interfaces",
    status: "Undergraduate thesis, ongoing",
    period: "August 2026 – present",
    place: "IIT Bombay",
    advisor: "Prof. Sudarshan Vijay",
    summary:
      "Investigating which DFT electrostatic information long-range ML potentials need to avoid spurious water metallization at Au/water/Na⁺ interfaces.",
    problem:
      "In large-cell molecular dynamics with machine-learned interatomic potentials (MLIPs), water at an Au/water/Na⁺ interface can become spuriously metallic. The question is which electrostatic information from DFT a long-range potential needs to be trained on to avoid this.",
    contribution: [
      "Traced spurious water metallization in large-cell MLIP MD to short-range electrostatics.",
      "Built long-range MLIPs (ACE+Q; MACE with charges and dipoles) trained on the DFT cell dipole.",
      "Developing interfacial potential-profile supervision for long-range MLIPs, testing its transfer to larger interfaces and field-driven electronic response.",
    ],
    evidence: [
      "With short-range electrostatics, water over-orients about 2× beyond the DFT training data, confirmed by the DFT density of states.",
      "Long-range MLIPs cut water states at the Fermi level by about 30× in DFT-validated MD.",
      "opt-DDAP captures water–metal potential shifts 4× better than the cell dipole, which per-atom charge labels fail to transfer to models.",
    ],
    limitations: [],
    methods: ["DFT", "MLIPs", "ACE", "MACE", "Molecular dynamics", "opt-DDAP"],
    links: [],
  },
  {
    slug: "water-activity",
    title: "Learning water activity in organic–water electrolytes",
    status: "Research internship",
    period: "December 2025 – August 2026",
    place: "DELI Lab, NTU Singapore",
    advisor: "Prof. Nitish Govindarajan",
    summary:
      "Built an ML pipeline mapping water environments in 100+ MD-simulated organic–water electrolytes to experimental water activity, a key lever on CO₂-reduction selectivity.",
    problem:
      "Water activity in organic–water electrolytes is a key lever on CO₂-reduction selectivity. The aim was to predict it from the local environments of water molecules in molecular dynamics simulations, in a way that stays physically interpretable.",
    contribution: [
      "Encoded 423K water molecules from 59 DMF systems with Li⁺, TBA⁺ and TEA⁺ salts as 14,560-dimensional SOAP descriptors, compressed to 50 dimensions with out-of-core incremental PCA.",
      "Identified water states with UMAP and HDBSCAN density-based clustering, interpreted with physics descriptors.",
      "Fit a physics-constrained regression mapping state fractions to water activity, with interpretable per-state terms.",
      "Transferred the pipeline to DMSO electrolytes (38 systems; Li⁺, Cs⁺, TBA⁺ salts).",
    ],
    evidence: [
      "Three transferable water states in the DMF systems: Li⁺-bound, DMF-caged and bulk-like.",
      "Leave-one-out R² = 0.93 for water activity, versus 0.28 with K-means clustering.",
      "In DMSO electrolytes, HDBSCAN resolved six water states and leave-one-out R² reached 0.84.",
    ],
    limitations: [
      "A 33% underprediction for LiTFSI traces to an anion-specific binding effect that purely geometric descriptors cannot see.",
    ],
    methods: ["Molecular dynamics", "SOAP descriptors", "Incremental PCA", "UMAP", "HDBSCAN"],
    links: [],
  },
];

// ---------------------------------------------------------------------------
// Other projects — software and course projects, listed on the Research page.
// ---------------------------------------------------------------------------

export interface Project {
  slug: string;
  title: string;
  label: "Internship" | "Self project" | "Course project" | "Club project" | "Team project";
  year: number;
  // Defaults to the schematic at public/thumbs/<slug>.svg; point this at a real figure to replace it.
  image?: string;
  // Where the project came from: course, club, internship or self project.
  context: string;
  date: string;
  summary: string;
  points: string[];
  methods: string[];
  links: { label: string; href: string }[];
  images: string[];
  videos: string[];
  pdfs: string[];
}

export const projects: Project[] = [
  {
    slug: "physika-dft",
    title: "Plane-wave DFT in Physika",
    label: "Internship",
    year: 2026,
    context: "Scientific Research Intern, Deep Forest Sciences · Supervisor: Dr. Bharath Ramsundar",
    date: "June – August 2026",
    summary:
      "Added density functional theory to Physika, an open-source typed, differentiable programming language for writing physical models and their solvers in math-like notation.",
    points: [
      "Implemented plane-wave Kohn–Sham DFT in Physika by rewriting SimpleDFT from Julia as 7 typed modules, matching the reference energies of H, He and H₂ to 10⁻⁶ Ha.",
      "Replaced hand-derived Kohn–Sham gradients with automatic differentiation of the total energy, then used the solver to find the equilibrium bond length of the H₂ molecule.",
      "Added differentiable Fourier transforms to Physika (Cooley–Tukey and N-D FFTs), the core step of plane-wave codes, and authored 3 tutorials on Physika, FFTs and DFT.",
    ],
    methods: ["Physika", "Julia", "Kohn–Sham DFT", "FFT", "Automatic differentiation"],
    links: [{ label: "Code", href: "https://github.com/deepforestsci/physika" }],
    images: [],
    videos: [],
    pdfs: [],
  },
  {
    slug: "plantwhisper",
    title: "PlantWhisper",
    label: "Self project",
    year: 2026,
    context: "Self project",
    date: "February – April 2026",
    summary:
      "Predicts plant stress from a single photo and synthesizes the ultrasonic clicks plants emit under drought.",
    points: [
      "Architected a 6-stage photo-to-audio pipeline predicting plant stress, served via a Dockerized FastAPI backend.",
      "Trained a 500-step stress-conditioned diffusion UNet on 20k+ ultrasonic clips, generating cavitation spectrograms.",
      "Engineered the vision stack: FastSAM segmentation, a 38-class MobileNetV2 classifier and Grad-CAM heatmaps.",
    ],
    methods: ["PyTorch", "Diffusion models", "FastSAM", "MobileNetV2", "Grad-CAM", "FastAPI", "Docker"],
    links: [],
    images: [],
    videos: [],
    pdfs: [],
  },
  {
    slug: "dwsim-pilot",
    title: "DWSIM-Pilot — AI copilot for chemical process design",
    label: "Self project",
    year: 2026,
    context: "Self project",
    date: "March 2026",
    summary: "Turns a plain-English process brief into a simulator-ready DWSIM chemical flowsheet.",
    points: [
      "Automated flowsheet drafting for 11 industrial processes using an LLM driving DWSIM via 26 tools over MCP.",
      "Structured LLM output with JSON schemas and an 11-process library, reducing invalid downstream simulator calls.",
      "Designed a staged LLM workflow where each artifact informs the next, refining raw briefs into DWSIM process flow diagrams.",
    ],
    methods: ["Python", "MCP", "LLMs", "JSON Schema", "DWSIM"],
    links: [],
    images: [],
    videos: [],
    pdfs: [],
  },
  {
    slug: "drywall-segmentation",
    title: "Prompted segmentation for drywall quality assurance",
    label: "Self project",
    year: 2026,
    context: "Self project · Vision-language segmentation",
    date: "February – March 2026",
    summary: "Fine-tuned CLIPSeg to segment drywall taping and cracks from text prompts.",
    points: [
      "Fine-tuned CLIPSeg for prompt-driven drywall QA, training only its 1.78M-parameter decoder (1.2% of 150.7M parameters).",
      "Rebuilt 4,473 coarse bounding-box labels into dense COCO polygon masks, unlocking pixel-accurate crack supervision.",
      "Achieved 0.61 and 0.47 mIoU on taping and crack prompts at 45 ms per image, stable across 6 prompt paraphrases.",
    ],
    methods: ["PyTorch", "CLIPSeg", "HuggingFace", "COCO"],
    links: [],
    images: [],
    videos: [],
    pdfs: [],
  },
  {
    slug: "brain-mri-segmentation",
    title: "Brain MRI segmentation",
    label: "Course project",
    year: 2026,
    context: "CS 736 course project · Instructor: Prof. Suyash P. Awate",
    date: "February – March 2026",
    summary: "Brain tissue segmentation with bias-field correction, fuzzy c-means and an MRF-regularized Gaussian mixture model.",
    points: [
      "Modeled MRI bias-field artifacts jointly with tissue clustering via a spatially regularized fuzzy c-means algorithm.",
      "Built an MRF-regularized Gaussian mixture model via EM-ICM for coherent brain tissue segmentation.",
    ],
    methods: ["Fuzzy c-means", "Gaussian mixture models", "Markov random fields", "EM"],
    links: [],
    images: [],
    videos: [],
    pdfs: [],
  },
  {
    slug: "ai-guard-agent",
    title: "Multi-modal real-time AI surveillance system",
    label: "Course project",
    year: 2025,
    context: "EE 782 course project · Instructor: Prof. Amit Sethi",
    date: "October – November 2025",
    summary:
      "A multi-modal pipeline fusing speech recognition, face recognition and an LLM through a state-machine orchestrator with four-level threat escalation.",
    points: [
      "Engineered an Avengers-themed multi-modal AI pipeline fusing Faster-Whisper ASR, dlib 128-D face embeddings and Gemini 1.5 Pro via a state-machine orchestrator driving 4-level threat escalation.",
      "Built a Telegram Bot API integration for real-time intruder image capture and automated threat alerts.",
      "Optimized multi-threaded TTS, frame skipping and intruder-ID tracking for concurrent audio-visual processing.",
      "Achieved 95% voice activation and 87% face recognition accuracy across 4 enrolled users, with a 1.3 s voice response.",
    ],
    methods: ["Faster-Whisper", "dlib", "Gemini 1.5 Pro", "Telegram Bot API"],
    links: [],
    images: [],
    videos: [],
    pdfs: [],
  },
  {
    slug: "cnn-lstm-transformer-remote-sensing",
    title: "End-to-end image captioning for remote sensing",
    label: "Course project",
    year: 2025,
    context: "EE 782 course project · Instructor: Prof. Amit Sethi",
    date: "October – November 2025",
    summary: "CNN-LSTM and CNN-Transformer captioning of aerial images on RSICD.",
    points: [
      "Built CNN-LSTM and CNN-Transformer captioning pipelines on RSICD (10.9k aerial images) in PyTorch.",
      "Improved BLEU-4 by 86% and METEOR by 35% using Transformer decoding over a tuned LSTM baseline.",
      "Trained 21M- and 47M-parameter decoders with AdamW, label smoothing, mixed precision and causal + key-padding masks.",
    ],
    methods: ["PyTorch", "LSTM", "Transformer"],
    links: [],
    images: [],
    videos: [],
    pdfs: [],
  },
  {
    slug: "custom-cnn-chest-xray",
    title: "Explainable CNN for pneumonia detection",
    label: "Course project",
    year: 2025,
    context: "DS 303 course project · Instructor: Prof. Manjesh Hanawal",
    date: "April 2025",
    summary: "A custom CNN reaching 97% accuracy and 0.978 F1 on chest X-rays, with Grad-CAM explanations.",
    points: [
      "Built a custom CNN with 97% accuracy and 0.978 F1-score on chest X-rays using a tailored Keras architecture.",
      "Applied Grad-CAM to highlight attention on infected lung regions and generate interpretable clinical insights.",
      "Used dropout and confusion-matrix analysis to improve generalization on imbalanced medical data.",
    ],
    methods: ["Keras", "CNN", "Grad-CAM"],
    links: [],
    images: [],
    videos: [],
    pdfs: [],
  },
  {
    slug: "doggo-quadruped-robot",
    title: "DOGGO 1.0 — a quadruped robot",
    label: "Club project",
    year: 2025,
    context: "ERC project · Electronics and Robotics Club, IIT Bombay",
    date: "January – April 2025",
    summary: "Designed and simulated a quadruped robot with inverse-kinematics gait control in ROS 2.",
    points: [
      "Designed the robot's mechanical structure in SolidWorks and simulated the environment in Gazebo Fortress.",
      "Integrated ROS 2, visualizing joint trajectories in RViz2, and implemented 2-DOF leg motion for stable gait generation using inverse kinematics.",
      "Calibrated 8 MG996 servos via a PCA9685-controlled PWM interface.",
    ],
    methods: ["ROS 2", "Gazebo", "SolidWorks", "Inverse kinematics"],
    links: [],
    images: [],
    videos: [],
    pdfs: [],
  },
  {
    slug: "optimization-algorithms",
    title: "Exploring optimization algorithms",
    label: "Club project",
    year: 2024,
    context: "Winter in Data Science · Analytics Club, IIT Bombay",
    date: "December 2024",
    summary: "Gradient descent, Newton's method and BFGS from scratch, with an Armijo line search.",
    points: [
      "Implemented gradient descent, Newton's method and BFGS from scratch, benchmarking convergence on ridge regression.",
      "Built an Armijo backtracking line search for adaptive step sizes, stabilizing descent on ill-conditioned losses.",
    ],
    methods: ["Python", "NumPy", "Numerical optimization"],
    links: [],
    images: [],
    videos: [],
    pdfs: [],
  },
  {
    slug: "physics-informed-diffusion-ct",
    title: "Physics-informed diffusion models for CT reconstruction",
    label: "Course project",
    year: 2025,
    context: "Course project",
    date: "2025",
    summary:
      "Adapted the PINN-DaDiff framework from MRI to CT by replacing Fourier-domain physics with a differentiable Radon transform.",
    points: [
      "Adapted the PINN-DaDiff framework from MRI to CT by replacing Fourier-domain physics with a fully differentiable Radon transform.",
      "Built a four-stage physics-informed generative pipeline that models X-ray photon statistics.",
    ],
    methods: ["PyTorch", "Diffusion models", "Medical imaging"],
    links: [],
    images: [],
    videos: [],
    pdfs: [],
  },
  {
    slug: "surgical-organ-segmentation",
    title: "Surgical organ segmentation with uncertainty estimation",
    label: "Course project",
    year: 2025,
    context: "CS 736 course project",
    date: "2025",
    summary:
      "Fine-tuned SegFormer-B0 for 11-class organ segmentation on laparoscopic images, with MC-Dropout uncertainty and risk–coverage analysis.",
    points: [
      "Built a segmentation pipeline on the DSAD laparoscopic dataset covering 11 organ classes, fine-tuning SegFormer-B0 with a combined Dice + cross-entropy loss and tracking per-organ IoU and HD95.",
      "Added smoke detection with a dark-channel-prior score and CLAHE enhancement.",
      "Estimated uncertainty with MC-Dropout entropy maps, calibrated with temperature scaling, and evaluated selective prediction with a risk–coverage curve (AURC).",
    ],
    methods: ["PyTorch", "SegFormer", "MC-Dropout"],
    links: [],
    images: [],
    videos: [],
    pdfs: [],
  },
  {
    slug: "wifi-controlled-quadcopter",
    title: "Wi-Fi controlled quadcopter",
    label: "Team project",
    year: 2024,
    context: "Team project",
    date: "2024",
    summary: "Led a student team that built a quadcopter with a record flight of over 120 seconds.",
    points: [
      "Coordinated a student team to assemble a quadcopter that achieved a record flight of over 120 seconds.",
      "Integrated lightweight components with an Arduino, an MPU 6050 IMU and a NodeMCU.",
    ],
    methods: ["Arduino", "NodeMCU", "C++"],
    links: [],
    images: [],
    videos: [],
    pdfs: [],
  },
];

// ---------------------------------------------------------------------------
// About page
// ---------------------------------------------------------------------------

export const about = {
  bio: [
    "I study Chemical Engineering at IIT Bombay, with a minor in Artificial Intelligence and Data Science from the Centre for Machine Intelligence and Data Science (C-MInDS).",
    "My research interests are machine learning interatomic potentials, atomistic machine learning, long-range electrostatics and differentiable scientific computing: AI for science, broadly.",
  ],
  education: [
    {
      degree: "B.Tech. in Chemical Engineering, Minor in AI and Data Science",
      institution: "Indian Institute of Technology Bombay",
      year: "2023 – 2027",
    },
  ],
  awards: ["Undergraduate Research Award (URA-01), IIT Bombay, for excellence in undergraduate research (2026)"],
  earlierAchievements: [
    "400/400 in PCMCs, Karnataka Class XII board examination (2022)",
    "Zonal rank 240 among 4,000+ students, SOF International Mathematics Olympiad (2019)",
  ],
};

export const experiences = [
  {
    title: "Undergraduate Thesis",
    organization: "IIT Bombay",
    date: "August 2026 – present",
    advisor: "Prof. Sudarshan Vijay",
    description: "Long-range ML potentials for metal/water interfaces.",
    link: "/research/metal-water-mlips",
  },
  {
    title: "Scientific Research Intern",
    organization: "Deep Forest Sciences",
    date: "June – August 2026",
    advisor: "Dr. Bharath Ramsundar",
    description: "Added plane-wave density functional theory to Physika, an open-source differentiable programming language.",
    link: "/projects/physika-dft",
  },
  {
    title: "Research Intern",
    organization: "DELI Lab, Nanyang Technological University, Singapore",
    date: "December 2025 – August 2026",
    advisor: "Prof. Nitish Govindarajan",
    description: "Learned water activity in organic–water electrolytes from MD-simulated water environments.",
    link: "/research/water-activity",
  },
  {
    title: "Supervised Learning Project",
    organization: "IIT Bombay",
    date: "May 2025 – March 2026",
    advisor: "Prof. Sudarshan Vijay",
    description: "Differentiable density-derived atomic charges (opt-DDAP), published in JCTC.",
    link: "/research/opt-ddap",
  },
  {
    title: "Controls Engineer",
    organization: "Team ChemEca, IIT Bombay",
    date: "October 2024 – April 2025",
    description:
      "Designed control strategies for a lab-scale direct air capture (DAC) pilot plant for the OpenAir Carbon Removal Challenge 2025 and AIChE's ChemE Cube Competition. Drafted PFDs and P&IDs for a shallow-bed adsorption DAC system in AutoCAD and performed a HAZOP analysis, proposing safety controls for thermal and vacuum risks.",
  },
];

export type InterestIcon = "quiz" | "dance" | "volunteer" | "sketch" | "camera" | "music";

export const interests: {
  summary: string;
  items: { title: string; icon: InterestIcon; description: string; images: string[] }[];
} = {
  summary:
    "Outside research I quiz, dance, sketch, whistle songs, photograph the sky, and keep an eye on what I'm listening to.",
  items: [
    {
      title: "Quizzing",
      icon: "quiz",
      description:
        "Finalist (top 12 of 300+ teams) in the Bottomline Business Quiz at IIM Indore, against premier B-schools (2024). Earlier, won a district-level science quiz among 40+ teams and represented my district on DD Chandana (2019).",
      images: [],
    },
    {
      title: "Dance",
      icon: "dance",
      description: "Part of the second-runner-up team in Gyrations, IIT Bombay's inter-hostel dance championship (2024).",
      images: [],
    },
    {
      title: "Volunteering",
      icon: "volunteer",
      description: "Volunteered with the National Service Scheme (NSS) at IIT Bombay on sustainable social initiatives (2024).",
      images: [],
    },
    {
      title: "Sketching",
      icon: "sketch",
      description: "Pencil sketches and drawings.",
      images: [1, 2, 3, 4, 5, 6].map((n) => `/hobbies/sketches/${n}.jpeg`),
    },
    {
      title: "Sky pictures",
      icon: "camera",
      description: "Photographs of the sky.",
      images: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `/hobbies/sky-pictures/sky${n}.jpeg`),
    },
    {
      title: "Whistling",
      icon: "music",
      description: "Whistling melodies in my free time.",
      images: [],
    },
  ],
};
