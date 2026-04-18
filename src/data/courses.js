// Scalable content model. All content is generated from this file so the
// app "just works" without a live backend. Admin pages can push into the
// DataContext to add courses at runtime — shape stays identical.
//
// Shape:
//   Course -> Modules -> Lessons
//   Lesson = { id, title, duration, youtubeId?, videoUrl?, notes[], files[], quiz? }

const lesson = (id, title, youtubeId, duration = '12:40') => ({
  id,
  title,
  duration,
  youtubeId,
  videoUrl: null,
  notes: [
    { id: `${id}-n1`, title: `${title} — Lecture Notes`, type: 'pdf', size: '1.2 MB' },
    { id: `${id}-n2`, title: `${title} — Summary Cheatsheet`, type: 'pdf', size: '480 KB' },
  ],
  files: [
    { id: `${id}-f1`, title: `${title} — Practice Problems`, type: 'pdf', size: '900 KB' },
    { id: `${id}-f2`, title: `${title} — Slide Deck`, type: 'pptx', size: '3.4 MB' },
  ],
  quiz: { id: `${id}-q`, title: `${title} — Self Check`, questions: 10 },
});

const module = (id, title, lessons) => ({ id, title, lessons });

export const courses = [
  // ================= FRESHMAN (FREE) =================
  {
    id: 'fresh-eng',
    title: 'Communicative English Skills',
    code: 'FLEn 1011',
    year: 'freshman',
    department: 'general',
    access: 'free',
    level: 'Freshman',
    instructor: 'Dr. Selamawit Tesfaye',
    students: 12840,
    rating: 4.8,
    hours: 32,
    thumbnail:
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Write, speak and read English with confidence.',
    description:
      'Master academic English through listening, speaking, reading and writing practice with real exam-style tasks.',
    outcomes: [
      'Build strong academic vocabulary',
      'Write clear paragraphs & essays',
      'Listen & speak fluently in class contexts',
      'Prepare for end-of-semester exam',
    ],
    modules: [
      module('m1', 'Module 1: Listening & Speaking', [
        lesson('l1', 'Introduction to Academic English', 'F7pYHN9iC9I'),
        lesson('l2', 'Effective Listening Strategies', 'lBE_0EUEzHw'),
        lesson('l3', 'Oral Presentations', 'Unzc731iCUY'),
      ]),
      module('m2', 'Module 2: Reading', [
        lesson('l4', 'Skimming & Scanning', 'rfscVS0vtbw'),
        lesson('l5', 'Critical Reading', 'H14bBuluwB8'),
      ]),
      module('m3', 'Module 3: Writing', [
        lesson('l6', 'Paragraph Writing', 'SqcY0GlETPk'),
        lesson('l7', 'Academic Essays', 'jS4aFq5-91M'),
      ]),
    ],
  },
  {
    id: 'fresh-math',
    title: 'Mathematics for Natural Sciences',
    code: 'Math 1011',
    year: 'freshman',
    department: 'natural',
    access: 'free',
    level: 'Freshman',
    instructor: 'Dr. Abebe Bekele',
    students: 10420,
    rating: 4.7,
    hours: 40,
    thumbnail:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=60',
    tagline: 'From algebra to calculus — build a rock-solid foundation.',
    description:
      'A complete freshman math course covering functions, limits, derivatives, integrals and linear algebra basics.',
    outcomes: [
      'Master functions & their properties',
      'Compute limits & derivatives confidently',
      'Apply integrals to real problems',
      'Ace your end-of-semester exam',
    ],
    modules: [
      module('m1', 'Module 1: Functions', [
        lesson('l1', 'Functions & Their Graphs', 'WUvTyaaNkzM'),
        lesson('l2', 'Composite & Inverse Functions', 'Oc-RjRIIpLI'),
      ]),
      module('m2', 'Module 2: Limits & Derivatives', [
        lesson('l3', 'Limits — Intuition & Rules', 'riXcZT2ICjA'),
        lesson('l4', 'The Derivative', '5yfh5cf4-0w'),
      ]),
      module('m3', 'Module 3: Integrals', [
        lesson('l5', 'Definite & Indefinite Integrals', '__7KOUrLRwA'),
      ]),
    ],
  },
  {
    id: 'fresh-physics',
    title: 'General Physics',
    code: 'Phys 1011',
    year: 'freshman',
    department: 'natural',
    access: 'free',
    level: 'Freshman',
    instructor: 'Dr. Tilahun Alemu',
    students: 8900,
    rating: 4.6,
    hours: 36,
    thumbnail:
      'https://images.unsplash.com/photo-1581090700227-1e8e03cf3c78?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Understand the universe — from motion to electromagnetism.',
    description:
      'Classical mechanics, thermodynamics, waves and introductory electromagnetism for all freshman students.',
    outcomes: [
      'Solve kinematics & dynamics problems',
      'Understand energy, momentum & rotation',
      'Analyze simple circuits',
      'Prepare for lab exams',
    ],
    modules: [
      module('m1', 'Mechanics', [
        lesson('l1', 'Kinematics in 1D', 'ZM8ECpBuQYE'),
        lesson('l2', 'Newton\u2019s Laws', 'kKKM8Y-u7ds'),
      ]),
      module('m2', 'Energy & Waves', [
        lesson('l3', 'Work, Energy, Power', 'w4QFJb9a8vo'),
        lesson('l4', 'Intro to Waves', 'Anqo_7Touj4'),
      ]),
    ],
  },
  {
    id: 'fresh-critical',
    title: 'Critical Thinking',
    code: 'Phil 1011',
    year: 'freshman',
    department: 'social',
    access: 'free',
    level: 'Freshman',
    instructor: 'Dr. Hanna Mekonnen',
    students: 7340,
    rating: 4.9,
    hours: 24,
    thumbnail:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Think clearly. Argue logically. Decide wisely.',
    description:
      'Learn how to analyze arguments, detect fallacies, and make sound decisions in academic and real-life settings.',
    outcomes: [
      'Identify fallacies',
      'Build logical arguments',
      'Evaluate sources critically',
      'Apply reasoning in exams',
    ],
    modules: [
      module('m1', 'Foundations of Reasoning', [
        lesson('l1', 'What is Critical Thinking?', 'Cum3k-Wglfw'),
        lesson('l2', 'Logical Fallacies', 'qUAOAebrT_A'),
      ]),
    ],
  },
  {
    id: 'fresh-geo',
    title: 'Geography of Ethiopia and the Horn',
    code: 'GeES 1011',
    year: 'freshman',
    department: 'social',
    access: 'free',
    level: 'Freshman',
    instructor: 'Dr. Mulugeta Kassa',
    students: 6120,
    rating: 4.7,
    hours: 22,
    thumbnail:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Explore the land, people and economy of Ethiopia and the Horn.',
    description:
      'Physical, human and economic geography of Ethiopia and the Horn of Africa with maps and case studies.',
    outcomes: ['Understand climate & terrain', 'Analyze population trends', 'Map key economic zones'],
    modules: [
      module('m1', 'Physical Geography', [
        lesson('l1', 'Location & Size', 'rQEEYS_oNbI'),
        lesson('l2', 'Climate & Vegetation', 'Cum3k-Wglfw'),
      ]),
    ],
  },
  {
    id: 'fresh-emerging',
    title: 'Introduction to Emerging Technologies',
    code: 'EmTe 1012',
    year: 'freshman',
    department: 'it',
    access: 'free',
    level: 'Freshman',
    instructor: 'Mr. Yonas Abera',
    students: 9540,
    rating: 4.8,
    hours: 28,
    thumbnail:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=60',
    tagline: 'AI, IoT, Blockchain and more — your guide to the future.',
    description:
      'Introduces freshman students to emerging technologies shaping the future: AI, IoT, Blockchain, Robotics & Data Science.',
    outcomes: [
      'Explain core AI concepts',
      'Understand IoT architecture',
      'Describe blockchain basics',
      'Apply data science thinking',
    ],
    modules: [
      module('m1', 'Foundations', [
        lesson('l1', 'What are Emerging Technologies?', 'mJeNghZXtMo'),
        lesson('l2', 'Introduction to AI', 'JMUxmLyrhSk'),
      ]),
      module('m2', 'Applications', [
        lesson('l3', 'IoT & Smart Cities', '6mBK0QZ4ymM'),
        lesson('l4', 'Blockchain Basics', 'SSo_EIwHSd4'),
      ]),
    ],
  },
  {
    id: 'fresh-civics',
    title: 'Moral & Civics Education',
    code: 'MCiE 1012',
    year: 'freshman',
    department: 'social',
    access: 'free',
    level: 'Freshman',
    instructor: 'Dr. Biruk Assefa',
    students: 5600,
    rating: 4.6,
    hours: 20,
    thumbnail:
      'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Be an informed, ethical and active citizen.',
    description:
      'Explore ethics, citizenship, constitution and responsible civic participation in Ethiopia.',
    outcomes: ['Understand constitutional rights', 'Build ethical reasoning', 'Engage as a citizen'],
    modules: [
      module('m1', 'Ethics & Citizenship', [
        lesson('l1', 'What is Ethics?', 'u399XmGC0mY'),
      ]),
    ],
  },

  // ================= 2ND YEAR (PREMIUM) =================
  {
    id: 'y2-ds',
    title: 'Data Structures & Algorithms',
    code: 'CoSc 2041',
    year: 'year2',
    department: 'it',
    access: 'premium',
    level: '2nd Year',
    instructor: 'Dr. Kaleab Mekonnen',
    students: 4230,
    rating: 4.9,
    hours: 44,
    thumbnail:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Crack coding interviews with strong fundamentals.',
    description:
      'Arrays, linked lists, stacks, queues, trees, graphs, sorting & searching — with complexity analysis.',
    outcomes: ['Analyze Big-O', 'Implement core structures', 'Solve algorithmic problems'],
    modules: [
      module('m1', 'Arrays & Lists', [
        lesson('l1', 'Arrays & Complexity', '8hly31xKli0'),
        lesson('l2', 'Linked Lists', 'njTh_OTBH3I'),
      ]),
      module('m2', 'Trees & Graphs', [
        lesson('l3', 'Binary Trees', 'H5JubkIy_p8'),
        lesson('l4', 'Graph Traversal (BFS/DFS)', 'pcKY4hjDrxk'),
      ]),
    ],
  },
  {
    id: 'y2-anatomy',
    title: 'Human Anatomy I',
    code: 'Anat 2011',
    year: 'year2',
    department: 'medicine',
    access: 'premium',
    level: '2nd Year',
    instructor: 'Dr. Rahel Girma',
    students: 2380,
    rating: 4.8,
    hours: 52,
    thumbnail:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=60',
    tagline: 'A systems-level walkthrough of the human body.',
    description:
      'Musculoskeletal, cardiovascular and nervous system anatomy with clinical correlations.',
    outcomes: ['Identify major structures', 'Explain function', 'Correlate with clinical cases'],
    modules: [
      module('m1', 'Musculoskeletal', [
        lesson('l1', 'Bones & Joints Overview', 'bJLVnLR1McU'),
      ]),
    ],
  },
  {
    id: 'y2-circuits',
    title: 'Electric Circuits I',
    code: 'EENG 2041',
    year: 'year2',
    department: 'engineering',
    access: 'premium',
    level: '2nd Year',
    instructor: 'Dr. Daniel Tadesse',
    students: 2140,
    rating: 4.7,
    hours: 40,
    thumbnail:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Master DC & AC circuit analysis.',
    description:
      'Ohm\u2019s law, Kirchhoff\u2019s laws, nodal & mesh analysis, capacitors, inductors and transient response.',
    outcomes: ['Solve circuits with KVL/KCL', 'Analyze RC/RL circuits', 'Build & test real circuits'],
    modules: [
      module('m1', 'Fundamentals', [
        lesson('l1', 'Ohm\u2019s Law', 'HsLLq6Rm5tU'),
        lesson('l2', 'Kirchhoff\u2019s Laws', 'UBoKzIT2ag4'),
      ]),
    ],
  },

  // ================= 3RD YEAR (PREMIUM) =================
  {
    id: 'y3-db',
    title: 'Database Systems',
    code: 'CoSc 3051',
    year: 'year3',
    department: 'it',
    access: 'premium',
    level: '3rd Year',
    instructor: 'Dr. Mahlet Tesfaye',
    students: 3650,
    rating: 4.9,
    hours: 36,
    thumbnail:
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Design, query and scale databases like a pro.',
    description:
      'Relational model, SQL, normalization, transactions and intro to NoSQL.',
    outcomes: ['Design ER diagrams', 'Write advanced SQL', 'Understand transactions'],
    modules: [
      module('m1', 'Relational Model & SQL', [
        lesson('l1', 'ER Modeling', '3BZz8R7mqu0'),
        lesson('l2', 'SQL Joins Deep-dive', '2HVMiPPuPIM'),
      ]),
    ],
  },
  {
    id: 'y3-fin',
    title: 'Financial Management',
    code: 'FnMg 3051',
    year: 'year3',
    department: 'business',
    access: 'premium',
    level: '3rd Year',
    instructor: 'Dr. Mekdes Alemu',
    students: 2980,
    rating: 4.7,
    hours: 30,
    thumbnail:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Make smart financial decisions with real-world tools.',
    description:
      'Time value of money, capital budgeting, risk & return, and working capital management.',
    outcomes: ['Analyze investments', 'Value cash flows', 'Manage working capital'],
    modules: [
      module('m1', 'Core Concepts', [
        lesson('l1', 'Time Value of Money', 'JudTtPeMuCo'),
      ]),
    ],
  },

  // ================= 4TH YEAR (PREMIUM) =================
  {
    id: 'y4-se',
    title: 'Software Engineering',
    code: 'CoSc 4061',
    year: 'year4',
    department: 'it',
    access: 'premium',
    level: '4th Year',
    instructor: 'Dr. Elias Girma',
    students: 2460,
    rating: 4.9,
    hours: 38,
    thumbnail:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Build real software, shipped to real users.',
    description: 'Agile, requirements, design patterns, testing and DevOps basics.',
    outcomes: ['Run Agile projects', 'Apply design patterns', 'Automate testing & CI/CD'],
    modules: [
      module('m1', 'Process & Requirements', [
        lesson('l1', 'Agile & Scrum', '9TycLR0TqFA'),
      ]),
    ],
  },
  {
    id: 'y4-path',
    title: 'Pathology I',
    code: 'Path 4011',
    year: 'year4',
    department: 'medicine',
    access: 'premium',
    level: '4th Year',
    instructor: 'Dr. Solomon Abebe',
    students: 1820,
    rating: 4.8,
    hours: 46,
    thumbnail:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=60',
    tagline: 'From cell injury to systemic disease.',
    description: 'General pathology covering cell injury, inflammation, neoplasia and immunity.',
    outcomes: ['Explain disease mechanisms', 'Correlate histology with pathology'],
    modules: [
      module('m1', 'General Pathology', [
        lesson('l1', 'Cell Injury & Death', 'T2kITd8Dq4Q'),
      ]),
    ],
  },

  // ================= 5TH YEAR (PREMIUM) =================
  {
    id: 'y5-ai',
    title: 'Artificial Intelligence',
    code: 'CoSc 5071',
    year: 'year5',
    department: 'it',
    access: 'premium',
    level: '5th Year',
    instructor: 'Dr. Fiker Bogale',
    students: 1650,
    rating: 4.9,
    hours: 42,
    thumbnail:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Search, reasoning, ML and modern AI systems.',
    description:
      'Classical search, knowledge representation, machine learning basics, and modern neural networks.',
    outcomes: ['Implement search algorithms', 'Train ML models', 'Understand neural nets'],
    modules: [
      module('m1', 'Search & Reasoning', [
        lesson('l1', 'Uninformed Search', 'UMsDSU-AYgA'),
      ]),
      module('m2', 'Machine Learning', [
        lesson('l2', 'Intro to ML', 'GwIo3gDZCVQ'),
      ]),
    ],
  },
  {
    id: 'y5-surgery',
    title: 'Surgery I',
    code: 'Surg 5011',
    year: 'year5',
    department: 'medicine',
    access: 'premium',
    level: '5th Year',
    instructor: 'Dr. Yohannes Alemu',
    students: 1340,
    rating: 4.8,
    hours: 50,
    thumbnail:
      'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1200&q=60',
    tagline: 'From pre-op to post-op — the complete surgical primer.',
    description:
      'Core surgical principles, wound healing, shock, trauma and pre/post-operative care.',
    outcomes: ['Apply surgical principles', 'Manage common emergencies'],
    modules: [
      module('m1', 'Core Principles', [lesson('l1', 'Wound Healing', 'i4IVn-7j8Lc')]),
    ],
  },

  // ================= 6TH YEAR (PREMIUM) =================
  {
    id: 'y6-clinical',
    title: 'Clinical Rotations Prep',
    code: 'ClRt 6011',
    year: 'year6',
    department: 'medicine',
    access: 'premium',
    level: '6th Year',
    instructor: 'Dr. Senait Tadesse',
    students: 980,
    rating: 4.9,
    hours: 60,
    thumbnail:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Get ready for your clinical year.',
    description: 'High-yield reviews of internal medicine, surgery, OB/GYN and pediatrics.',
    outcomes: ['Master ward presentations', 'Ace clinical exams'],
    modules: [
      module('m1', 'Internal Medicine Review', [
        lesson('l1', 'Cardio Essentials', 'uEWsKqK8Cc4'),
      ]),
    ],
  },

  // ================= 7TH YEAR (PREMIUM) =================
  {
    id: 'y7-exit',
    title: 'Exit Exam Masterclass',
    code: 'EXIT 7010',
    year: 'year7',
    department: 'general',
    access: 'premium',
    level: '7th Year',
    instructor: 'Dr. Biruk Taye',
    students: 2100,
    rating: 5.0,
    hours: 80,
    thumbnail:
      'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=60',
    tagline: 'Pass your national exit exam with confidence.',
    description:
      'Complete exit exam prep with topic reviews, past-paper walkthroughs and timed mock exams.',
    outcomes: ['Master high-yield topics', 'Finish mock exams at pace'],
    modules: [
      module('m1', 'High-Yield Review', [lesson('l1', 'Exam Strategy', 'zXj2p-MwFuk')]),
      module('m2', 'Mock Exams', [lesson('l2', 'Mock Exam Walkthrough #1', 'zXj2p-MwFuk')]),
    ],
  },
];

export const featuredCourseIds = ['fresh-emerging', 'y2-ds', 'y5-ai', 'y7-exit', 'fresh-math', 'y4-se'];

export function getCourse(id) {
  return courses.find((c) => c.id === id);
}

export function lessonsOfCourse(course) {
  return course.modules.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title })));
}
