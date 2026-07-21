import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  Code, 
  Cpu, 
  Database, 
  HelpCircle, 
  ArrowRight, 
  Check, 
  AlertCircle,
  Hash,
  Activity,
  Layers,
  ChevronDown,
  Video,
  Sliders,
  Smartphone,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Mic,
  Disc,
  Download,
  Globe,
  ExternalLink,
  Shield,
  Zap,
  Terminal,
  ChevronUp,
  Lock,
  Unlock,
  Save,
  Trash2,
  Bookmark,
  History,
  Search,
  BookOpen,
  Award,
  Flame,
  Grid,
  List,
  Compass,
  ArrowDownUp,
  Binary,
  Link,
  Network,
  GitBranch,
  Home,
  Map,
  Layout,
  Youtube
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import TopicDetailPage from "./components/TopicDetailPage";
import LeetCodeQuestions from "./components/LeetCodeQuestions";
import PracticeSandbox from "./components/PracticeSandbox";
import logoImg from "./assets/images/logo_neon_1783521037770.jpg";
import { 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  SignUpButton, 
  UserButton, 
  useUser,
  useAuth,
  PricingTable
} from "@clerk/clerk-react";
import { templates } from "./templates";
import { AlgorithmData, AlgoStep, VisualElement, BuiltInTopic } from "./types";
import { db, handleFirestoreError, OperationType } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const dsaTopicsList = [
  {
    key: "arrays",
    title: "Arrays",
    category: "Arrays & Strings",
    lessons: "12 Lessons",
    difficulty: "Easy",
    icon: "Code",
    desc: "Learn array operations, traversals, and problem solving."
  },
  {
    key: "linked_list",
    title: "Linked List",
    category: "Linked Lists",
    lessons: "10 Lessons",
    difficulty: "Easy",
    icon: "Link",
    desc: "Singly, doubly, circular linked lists, pointer tracking, and more."
  },
  {
    key: "stacks",
    title: "Stacks",
    category: "Stacks & Queues",
    lessons: "9 Lessons",
    difficulty: "Easy",
    icon: "Layers",
    desc: "Stack operations, applications, and dry-run problems."
  },
  {
    key: "queues",
    title: "Queues",
    category: "Stacks & Queues",
    lessons: "8 Lessons",
    difficulty: "Easy",
    icon: "Sliders",
    desc: "Queue concepts, types, and real-world applications."
  },
  {
    key: "trees",
    title: "Trees",
    category: "Trees",
    lessons: "15 Lessons",
    difficulty: "Medium",
    icon: "GitBranch",
    desc: "Binary trees, BST, traversals, and advanced trees."
  },
  {
    key: "graphs",
    title: "Graphs",
    category: "Graphs",
    lessons: "14 Lessons",
    difficulty: "Medium",
    icon: "Network",
    desc: "Graph representation, traversals, and shortest-path algorithms."
  },
  {
    key: "sorting",
    title: "Sorting",
    category: "Searching & Sorting",
    lessons: "7 Lessons",
    difficulty: "Easy",
    icon: "ArrowDownUp",
    desc: "Sorting algorithms and their runtime complexities."
  },
  {
    key: "searching",
    title: "Searching",
    category: "Searching & Sorting",
    lessons: "6 Lessons",
    difficulty: "Easy",
    icon: "Search",
    desc: "Searching algorithms and lookup problem solving."
  },
  {
    key: "dp",
    title: "Dynamic Programming",
    category: "Dynamic Programming",
    lessons: "12 Lessons",
    difficulty: "Hard",
    icon: "Cpu",
    desc: "Solve complex problems using dynamic programming techniques."
  },
  {
    key: "greedy",
    title: "Greedy",
    category: "Greedy",
    lessons: "6 Lessons",
    difficulty: "Medium",
    icon: "Flame",
    desc: "Greedy algorithms and optimization problem solving."
  },
  {
    key: "recursion",
    title: "Recursion & Backtracking",
    category: "Recursion & Backtracking",
    lessons: "8 Lessons",
    difficulty: "Medium",
    icon: "RotateCcw",
    desc: "Recursive thinking and backtracking problems."
  },
  {
    key: "bit_manipulation",
    title: "Bit Manipulation",
    category: "Bit Manipulation",
    lessons: "5 Lessons",
    difficulty: "Medium",
    icon: "Binary",
    desc: "Bitwise operators and system-level applications."
  },
  {
    key: "math",
    title: "Math & Logic",
    category: "Math & Logic",
    lessons: "4 Lessons",
    difficulty: "Easy",
    icon: "Hash",
    desc: "Mathematical concepts for computer science and interview prep."
  },
  {
    key: "string",
    title: "String",
    category: "Arrays & Strings",
    lessons: "7 Lessons",
    difficulty: "Easy",
    icon: "BookOpen",
    desc: "String manipulation, string hashing, and matching algorithms."
  },
  {
    key: "heap",
    title: "Heap / Priority Queue",
    category: "Advanced Topics",
    lessons: "6 Lessons",
    difficulty: "Medium",
    icon: "Compass",
    desc: "Heap data structures and priority queue operations."
  },
  {
    key: "hashing",
    title: "Hashing",
    category: "Hashmaps & Hashing",
    lessons: "6 Lessons",
    difficulty: "Medium",
    icon: "Database",
    desc: "Hash tables, sets, maps, and custom hash functions."
  },
  {
    key: "tries",
    title: "Tries",
    category: "Advanced Topics",
    lessons: "5 Lessons",
    difficulty: "Medium",
    icon: "Disc",
    desc: "Prefix trees, retrieval keys, and auto-complete problems."
  },
  {
    key: "dsu",
    title: "Disjoint Set (DSU)",
    category: "Advanced Topics",
    lessons: "4 Lessons",
    difficulty: "Medium",
    icon: "ExternalLink",
    desc: "Union-Find operations and dynamic connectivity problems."
  },
  {
    key: "sliding_window",
    title: "Sliding Window",
    category: "Arrays & Strings",
    lessons: "6 Lessons",
    difficulty: "Medium",
    icon: "Maximize2",
    desc: "Sliding window technique and subarray problem solving."
  },
  {
    key: "advanced_graph",
    title: "Advanced Graph",
    category: "Advanced Topics",
    lessons: "6 Lessons",
    difficulty: "Hard",
    icon: "Globe",
    desc: "Advanced graph algorithms, network flow, and matching."
  }
];

const getTopicIcon = (iconName: string) => {
  switch (iconName) {
    case "Layers": return <Layers className="w-5 h-5 text-fuchsia-400" />;
    case "Sliders": return <Sliders className="w-5 h-5 text-fuchsia-400" />;
    case "Activity": return <Activity className="w-5 h-5 text-fuchsia-400" />;
    case "History": return <History className="w-5 h-5 text-fuchsia-400" />;
    case "Disc": return <Disc className="w-5 h-5 text-fuchsia-400" />;
    case "ExternalLink": return <ExternalLink className="w-5 h-5 text-fuchsia-400" />;
    case "Cpu": return <Cpu className="w-5 h-5 text-fuchsia-400" />;
    case "Terminal": return <Terminal className="w-5 h-5 text-fuchsia-400" />;
    case "Database": return <Database className="w-5 h-5 text-fuchsia-400" />;
    case "Code": return <Code className="w-5 h-5 text-fuchsia-400" />;
    case "Link": return <Link className="w-5 h-5 text-fuchsia-400" />;
    case "GitBranch": return <GitBranch className="w-5 h-5 text-fuchsia-400" />;
    case "Network": return <Network className="w-5 h-5 text-fuchsia-400" />;
    case "ArrowDownUp": return <ArrowDownUp className="w-5 h-5 text-fuchsia-400" />;
    case "Search": return <Search className="w-5 h-5 text-fuchsia-400" />;
    case "Flame": return <Flame className="w-5 h-5 text-fuchsia-400" />;
    case "RotateCcw": return <RotateCcw className="w-5 h-5 text-fuchsia-400" />;
    case "Binary": return <Binary className="w-5 h-5 text-fuchsia-400" />;
    case "Hash": return <Hash className="w-5 h-5 text-fuchsia-400" />;
    case "BookOpen": return <BookOpen className="w-5 h-5 text-fuchsia-400" />;
    case "Compass": return <Compass className="w-5 h-5 text-fuchsia-400" />;
    case "Maximize2": return <Maximize2 className="w-5 h-5 text-fuchsia-400" />;
    case "Globe": return <Globe className="w-5 h-5 text-fuchsia-400" />;
    default: return <Code className="w-5 h-5 text-fuchsia-400" />;
  }
};

export default function App() {
  // Clerk Authentication & Billing hooks
  const { has, isLoaded: authIsLoaded } = useAuth();
  const { user, isLoaded: userIsLoaded } = useUser();

  // Navigation View Mode ("sandbox" | "topics" | "practice" | "roadmap" | "saved" | "pricing" | "topic-detail" | "leetcode" | "practice-sandbox")
  const [viewMode, setViewMode] = useState<"sandbox" | "topics" | "practice" | "roadmap" | "saved" | "pricing" | "topic-detail" | "leetcode" | "practice-sandbox">("topics");

  // Selected question in the end-to-end interactive sandbox
  const [selectedSandboxQuestion, setSelectedSandboxQuestion] = useState<any>(null);

  // Developer Simulation Mode for manual billing checks in sandbox
  const [simulatedPlan, setSimulatedPlan] = useState<"free" | "pro" | "none">("none");

  // Upgrade Gating & Modal State
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [upgradeModalFeature, setUpgradeModalFeature] = useState<"presets" | "ai" | "steplimit" | "recorder" | "history">("presets");

  // Walkthrough Saved History State
  const [savedHistory, setSavedHistory] = useState<{ id: string; title: string; timestamp: string; algoData: AlgorithmData }[]>([]);

  // DSA Topics Dynamic State List
  const [topicsList, setTopicsList] = useState(dsaTopicsList);

  // Add Custom Topic Dialog Form State
  const [showAddTopicModal, setShowAddTopicModal] = useState<boolean>(false);
  const [newTopicTitle, setNewTopicTitle] = useState<string>("");
  const [newTopicCategory, setNewTopicCategory] = useState<string>("Arrays & Strings");
  const [newTopicDifficulty, setNewTopicDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [newTopicDesc, setNewTopicDesc] = useState<string>("");

  const handleAddTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicTitle.trim() || !newTopicDesc.trim()) {
      setNotification({ message: "Please fill out all required fields.", type: "error" });
      return;
    }

    const newKey = newTopicTitle.toLowerCase().trim().replace(/[^a-z0-9]+/g, "_");
    
    // Check if key already exists
    if (topicsList.some(t => t.key === newKey)) {
      setNotification({ message: "A topic with this title already exists.", type: "error" });
      return;
    }

    const newTopic = {
      key: newKey,
      title: newTopicTitle.trim(),
      category: newTopicCategory,
      lessons: "5 Lessons",
      difficulty: newTopicDifficulty,
      icon: "Code",
      desc: newTopicDesc.trim()
    };

    const updated = [...topicsList, newTopic];
    setTopicsList(updated);
    
    // Reset form
    setNewTopicTitle("");
    setNewTopicDesc("");
    setNewTopicDifficulty("Easy");
    setShowAddTopicModal(false);
    
    setNotification({ message: `Successfully added custom topic "${newTopic.title}"! 🎉`, type: "success" });
  };

  // AI Generations Counter (Free Tier limited to 2 total generations)
  const [aiGenerationsCount, setAiGenerationsCount] = useState<number>(() => {
    const saved = localStorage.getItem("ai_generations_count_v1");
    return saved ? Number(saved) : 0;
  });

  // App Notifications Toast
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // DSA Syllabus Tracking State (Firestore-backed)
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [progressLoading, setProgressLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Topics");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch syllabus progress from backend API on user login
  useEffect(() => {
    if (user?.id) {
      const fetchProgress = async () => {
        setProgressLoading(true);
        try {
          const response = await fetch(`/api/progress/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data.completedTopics)) {
              setCompletedTopics(data.completedTopics);
            }
          }
        } catch (err) {
          console.error("Error fetching progress from backend:", err);
        } finally {
          setProgressLoading(false);
        }
      };
      fetchProgress();
    } else {
      setCompletedTopics([]);
    }
  }, [user?.id]);

  // Toggle completion of a syllabus topic via backend API
  const toggleTopicCompletion = async (topicKey: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Avoid triggering loading the topic in sandbox
    }
    if (!user?.id) return;

    const isCompleted = completedTopics.includes(topicKey);
    const updatedList = isCompleted
      ? completedTopics.filter(key => key !== topicKey)
      : [...completedTopics, topicKey];

    setCompletedTopics(updatedList);

    try {
      const response = await fetch(`/api/progress/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completedTopics: updatedList })
      });
      if (response.ok) {
        setNotification({ 
          message: isCompleted 
            ? "Topic removed from completed list." 
            : "Topic marked as Completed! Syllabus progress saved live. ⚡", 
          type: "success" 
        });
      } else {
        throw new Error("Failed to save progress via backend");
      }
    } catch (err) {
      console.error("Error saving progress to backend:", err);
      setNotification({ message: "Failed to save progress to Firestore.", type: "error" });
    }
  };

  // Interactive Quiz State
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const quizQuestions = [
    {
      q: "What is the worst-case time complexity of standard Quick Sort?",
      options: ["O(n log n)", "O(n²)", "O(n)", "O(2ⁿ)"],
      answer: 1,
      explanation: "In the worst case (e.g., when the pivot is always the smallest or largest element), Quick Sort runs in O(n²) time."
    },
    {
      q: "Which data structure uses LIFO (Last In First Out) order?",
      options: ["Queue", "Binary Tree", "Stack", "Linked List"],
      answer: 2,
      explanation: "A stack pushes and pops items from the same end, resulting in Last In First Out behavior."
    },
    {
      q: "What algorithm is used to find the shortest path in a weighted graph without negative edges?",
      options: ["Kruskal's Algorithm", "Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Floyd-Warshall Algorithm"],
      answer: 1,
      explanation: "Dijkstra's algorithm is a greedy algorithm that finds the single-source shortest path in graphs with non-negative edge weights."
    },
    {
      q: "In a Binary Search Tree (BST), which traversal visits nodes in strictly ascending order?",
      options: ["Pre-order", "Post-order", "In-order", "Breadth-First"],
      answer: 2,
      explanation: "An In-order traversal visits the left subtree, the root, and then the right subtree, which retrieves elements in sorted ascending order in a BST."
    }
  ];

  const handleSelectTopic = (topic: any) => {
    const isUnlocked = true; // All topics unlocked for free plan!
    if (!isUnlocked) {
      setUpgradeModalFeature("presets");
      setShowUpgradeModal(true);
      setNotification({ message: "Upgrade to PRO to unlock advanced DSA preset topics! ⚡", type: "info" });
      return;
    }

    setNotification({ message: `Loading visual logic for ${topic.title}... 🚀`, type: "success" });
    
    setViewMode("topic-detail");
    setCurrentTopicKey(topic.key);
  };

  const renderQuizModal = () => {
    if (!showQuiz) return null;
    const currentQ = quizQuestions[currentQuestionIdx];

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-white/10 p-6 rounded-3xl max-w-lg w-full space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
          <div className="absolute top-0 right-0 w-32 h-12 bg-fuchsia-500/15 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-fuchsia-400" />
              <span className="font-bold text-white text-sm uppercase tracking-wider font-display">DSA Interactive Quiz</span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Question {currentQuestionIdx + 1} of {quizQuestions.length}
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-white leading-relaxed">
              {currentQ.q}
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.options.map((option, idx) => {
                let btnStyle = "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10";
                if (quizAnswered) {
                  if (idx === currentQ.answer) {
                    btnStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-300";
                  } else if (selectedOption === idx) {
                    btnStyle = "bg-rose-500/20 border-rose-500/50 text-rose-300";
                  } else {
                    btnStyle = "bg-white/5 border-white/5 text-slate-500 pointer-events-none";
                  }
                } else if (selectedOption === idx) {
                  btnStyle = "bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-300";
                }

                return (
                  <button
                    key={idx}
                    disabled={quizAnswered}
                    onClick={() => setSelectedOption(idx)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-semibold transition-all ${btnStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {quizAnswered && (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed space-y-1 animate-in fade-in duration-300">
              <span className="font-bold block text-fuchsia-400 uppercase tracking-wider text-[10px]">Explanation:</span>
              <span>{currentQ.explanation}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setShowQuiz(false);
                setCurrentQuestionIdx(0);
                setQuizScore(0);
                setQuizAnswered(false);
                setSelectedOption(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>

            {!quizAnswered ? (
              <button
                disabled={selectedOption === null}
                onClick={() => {
                  if (selectedOption === currentQ.answer) {
                    setQuizScore(prev => prev + 1);
                  }
                  setQuizAnswered(true);
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-bold text-xs disabled:opacity-50 transition-all"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={() => {
                  if (currentQuestionIdx < quizQuestions.length - 1) {
                    setCurrentQuestionIdx(prev => prev + 1);
                    setQuizAnswered(false);
                    setSelectedOption(null);
                  } else {
                    // Completed
                    setNotification({
                      message: `Quiz finished! Score: ${quizScore + (selectedOption === currentQ.answer ? 1 : 0)}/${quizQuestions.length} 🎉`,
                      type: "success"
                    });
                    setShowQuiz(false);
                    setCurrentQuestionIdx(0);
                    setQuizScore(0);
                    setQuizAnswered(false);
                    setSelectedOption(null);
                  }
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all"
              >
                {currentQuestionIdx < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderTopicsPage = (isUserSignedIn: boolean) => {
    // Left categories list matching the image
    const categories = [
      "All Topics",
      "Arrays & Strings",
      "Linked Lists",
      "Stacks & Queues",
      "Trees",
      "Graphs",
      "Searching & Sorting",
      "Dynamic Programming",
      "Greedy",
      "Recursion & Backtracking",
      "Bit Manipulation",
      "Math & Logic",
      "Advanced Topics",
      "Hashmaps & Hashing"
    ];

    // Filter by selected category and search query
    const filteredTopics = topicsList.filter((topic) => {
      const matchesCategory = selectedCategory === "All Topics" || topic.category === selectedCategory;
      const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            topic.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            topic.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    const totalTopicsCount = topicsList.length;
    const completedCount = completedTopics.length;
    const progressPercent = totalTopicsCount > 0 ? Math.round((completedCount / totalTopicsCount) * 100) : 0;

    return (
      <div className="space-y-6 text-slate-100">
        {/* Banner with heading */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono text-fuchsia-400 font-bold uppercase tracking-widest">Explore Concepts</div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white font-display flex items-center gap-2">
              All <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500">Topics</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              Explore all Data Structures & Algorithms topics. Click on any topic to boot up its visual logic dry-run sandbox.
            </p>
          </div>
          
          <button
            onClick={() => setShowAddTopicModal(true)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-500 hover:from-fuchsia-500 hover:to-pink-400 active:scale-95 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-fuchsia-500/10 cursor-pointer self-start sm:self-auto shrink-0 border border-fuchsia-400/20"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            Add Custom Topic
          </button>
        </div>

        {/* 3-Column main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 1. Left Sidebar: Categories list */}
          <div className="lg:col-span-3 space-y-4">
            <div className="glass-panel p-4 rounded-2xl border border-white/5 space-y-2.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block px-2">Categories</span>
              <div className="space-y-1">
                {categories.map((cat) => {
                  // Count matches
                  const count = cat === "All Topics" 
                    ? topicsList.length 
                    : topicsList.filter(t => t.category === cat).length;

                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all text-left ${
                        isSelected 
                          ? "bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20" 
                          : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isSelected ? "bg-fuchsia-500/20 text-fuchsia-300" : "bg-white/5 text-slate-500"
                      }`}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. Middle Grid of Topics */}
          <div className="lg:col-span-6 space-y-4">
            {/* Filter Search Bar controls */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between glass-panel p-4 rounded-2xl border border-white/5">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search topics (e.g., Binary Search, Graph, DP...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950/40 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-fuchsia-500/50 transition-all font-semibold"
                />
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <select className="bg-slate-950/40 border border-white/10 text-xs font-semibold text-slate-400 rounded-xl px-3 py-2 focus:outline-none focus:border-fuchsia-500/50">
                  <option>Sort by: Popular</option>
                  <option>Sort by: Difficulty</option>
                </select>

                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                  <button className="p-1 rounded bg-white/10 text-white"><Grid className="w-3.5 h-3.5" /></button>
                  <button className="p-1 rounded text-slate-500 hover:text-slate-300"><List className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>

            {/* Grid display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredTopics.map((topic, index) => {
                const isCompleted = completedTopics.includes(topic.key);
                const isTopicActive = currentTopicKey === topic.key && viewMode === "sandbox";
                
                // All items are unlocked for free plan!
                const isItemUnlocked = true;

                return (
                  <div
                    key={topic.key}
                    onClick={() => handleSelectTopic(topic)}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 text-left cursor-pointer group relative overflow-hidden ${
                      isTopicActive
                        ? "bg-fuchsia-500/10 border-fuchsia-500/40 shadow-lg shadow-fuchsia-500/5"
                        : "bg-slate-900/30 border-white/5 hover:border-fuchsia-500/30 hover:bg-slate-900/50"
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Icon & Lock indicator row */}
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105 ${
                          isTopicActive
                            ? "bg-fuchsia-500/20 border-fuchsia-500/30 text-fuchsia-300"
                            : "bg-white/5 border-white/10 text-fuchsia-400"
                        }`}>
                          {getTopicIcon(topic.icon)}
                        </div>

                        {/* Unlocked / Locked status */}
                        {isItemUnlocked ? (
                          <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <div className="flex items-center gap-1 text-[9px] font-mono font-bold bg-indigo-500/15 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
                            <Lock className="w-2.5 h-2.5 text-indigo-400" />
                            PRO
                          </div>
                        )}
                      </div>

                      {/* Header details */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-widest font-bold">
                          {topic.category}
                        </span>
                        <h3 className="text-sm font-bold text-white group-hover:text-fuchsia-100 transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {topic.desc}
                        </p>
                      </div>
                    </div>

                    {/* Progress tracking button & metadata footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-slate-500">
                          {topic.lessons}
                        </span>
                        <span className="text-slate-600 font-mono text-[10px]">•</span>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                          topic.difficulty === "Easy" 
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                            : topic.difficulty === "Medium"
                            ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                            : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                        }`}>
                          {topic.difficulty}
                        </span>
                      </div>

                      {/* Checkmark to toggle completion */}
                      {isUserSignedIn ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation(); // prevent loading topic
                            toggleTopicCompletion(topic.key, e);
                          }}
                          className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all cursor-pointer select-none shrink-0 ${
                            isCompleted
                              ? "bg-gradient-to-br from-emerald-500 to-teal-500 border-emerald-400/40 text-white shadow-lg shadow-emerald-500/20"
                              : "bg-white/5 border-white/15 text-transparent hover:border-fuchsia-500/50 hover:bg-fuchsia-500/5"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 text-white" />
                        </button>
                      ) : (
                        <SignInButton mode="modal">
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); }}
                            className="w-6 h-6 rounded-full flex items-center justify-center border bg-white/5 border-white/15 text-slate-500 hover:border-fuchsia-500 hover:text-fuchsia-400 cursor-pointer select-none shrink-0"
                          >
                            <Check className="w-3 h-3 text-slate-500/40 hover:text-fuchsia-400" />
                          </button>
                        </SignInButton>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Right Sidebar: HUD & Overall Progress metrics */}
          <div className="lg:col-span-3 space-y-4">
            {/* Progress Circular Widget */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5 text-center space-y-4 relative">
              <div className="absolute top-0 right-0 w-24 h-12 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Your Progress</span>

              {/* Dynamic circular radial indicator */}
              <div className="relative flex items-center justify-center w-28 h-28 mx-auto mt-2">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="45"
                    className="stroke-white/5 fill-transparent"
                    strokeWidth="8"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r="45"
                    className="stroke-fuchsia-500 fill-transparent"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={2 * Math.PI * 45 - (progressPercent / 100) * (2 * Math.PI * 45)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-xl font-black font-mono text-white leading-none">
                    {progressPercent}%
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400 mt-1 uppercase tracking-widest font-sans">
                    Overall
                  </span>
                </div>
              </div>

              {/* Stats detail list */}
              <div className="space-y-2.5 pt-2 text-left border-t border-white/5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-fuchsia-500" /> Completed Topics
                  </span>
                  <span className="font-bold text-white font-mono">{completedCount}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" /> In Progress
                  </span>
                  <span className="font-bold text-white font-mono">{completedCount > 0 ? 2 : 0}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-600" /> Not Started
                  </span>
                  <span className="font-bold text-white font-mono">{totalTopicsCount - completedCount}</span>
                </div>
              </div>

              <button
                onClick={() => setViewMode("roadmap")}
                className="w-full mt-3 py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/20 text-indigo-300 hover:text-white text-xs font-bold transition-all"
              >
                View Learning Roadmap
              </button>
            </div>

            {/* Difficulty Guide widget */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Difficulty Guide</span>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">Easy</span>
                    <span className="text-[10px] text-slate-400 leading-none">Beginner friendly concept</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">Medium</span>
                    <span className="text-[10px] text-slate-400 leading-none">For building a strong DSA base</span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">Hard</span>
                    <span className="text-[10px] text-slate-400 leading-none">Rigorous, interview level questions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions widget */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Quick Actions</span>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => setViewMode("practice")}
                  className="flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-left transition-all"
                >
                  <Sliders className="w-4 h-4 text-fuchsia-400" /> Go to Practice
                </button>
                <button
                  onClick={() => setViewMode("saved")}
                  className="flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-left transition-all"
                >
                  <History className="w-4 h-4 text-fuchsia-400" /> View Saved Walkthroughs
                </button>
                <button
                  onClick={() => {
                    setSelectedOption(null);
                    setQuizAnswered(false);
                    setCurrentQuestionIdx(0);
                    setQuizScore(0);
                    setShowQuiz(true);
                  }}
                  className="flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-left transition-all"
                >
                  <Award className="w-4 h-4 text-fuchsia-400" /> Take Interactive Quiz
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  };

  const renderPracticePage = () => {
    const practiceProblems = [
      { id: "p1", title: "Two Sum", difficulty: "Easy", time: "O(n)", space: "O(n)", category: "Arrays", input: "Generate step-by-step visualizer for Two Sum hashmap solution using array [2, 7, 11, 15] and target 9" },
      { id: "p2", title: "Valid Parentheses", difficulty: "Easy", time: "O(n)", space: "O(n)", category: "Stacks", input: "Generate interactive dry-run trace for Valid Parentheses stack check using input string '{[()]}'" },
      { id: "p3", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", time: "O(n)", space: "O(k)", category: "Sliding Window", input: "Show dry-run tracing for Longest Substring without repeating characters on string 'abcabcbb' with sliding window" },
      { id: "p4", title: "Merge k Sorted Lists", difficulty: "Hard", time: "O(N log k)", space: "O(k)", category: "Linked Lists", input: "Build a dry-run step visualizer showing merge k sorted lists heap insertions" },
      { id: "arrays-1", title: "Majority Element", difficulty: "Easy", time: "O(n)", space: "O(1)", category: "Arrays", input: "Generate step-by-step visualizer for Majority Element (Boyer-Moore Voting) with array [2,2,1,1,1,2,2]" },
      { id: "arrays-4", title: "Single Number", difficulty: "Easy", time: "O(n)", space: "O(1)", category: "Arrays", input: "Generate visual walkthrough for Single Number bitwise XOR solution using array [4,1,2,1,2]" },
      { id: "arrays-5", title: "Stock Buy & Sell", difficulty: "Easy", time: "O(n)", space: "O(1)", category: "Arrays", input: "Show dynamic logic tracking for Best Time to Buy and Sell Stock on prices array [7,1,5,3,6,4]" },
    ];

    return (
      <div className="space-y-6 text-slate-100">
        <div className="space-y-1">
          <div className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-widest">Interactive Challenges</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-display">
            Practice <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">Hub</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Put your knowledge into action. Click 'Boot Visualizer' on any classic interview problem to generate its live logic simulator.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practiceProblems.map((prob) => (
            <div key={prob.id} className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-900/30 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{prob.category}</span>
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                    prob.difficulty === "Easy" 
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                      : prob.difficulty === "Medium"
                      ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                      : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                  }`}>{prob.difficulty}</span>
                </div>
                <h3 className="text-base font-bold text-white">{prob.title}</h3>
                <div className="flex gap-2.5">
                  <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">Time: {prob.time}</span>
                  <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">Space: {prob.space}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setCustomTopicInput(prob.title);
                    setViewMode("sandbox");
                    generateCustomVisualizer(prob.input);
                    setNotification({ message: `Synthesizing visual dry-run simulator for "${prob.title}"...`, type: "success" });
                  }}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 font-bold text-xs hover:scale-[1.01] transition-transform cursor-pointer"
                >
                  Boot Dynamic Logic Visualizer ⚡
                </button>
                <button
                  onClick={() => {
                    setSelectedSandboxQuestion(prob);
                    setViewMode("practice-sandbox");
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-bold text-xs hover:scale-[1.01] transition-transform cursor-pointer"
                >
                  Solve Challenge in Sandbox 💻
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRoadmapPage = () => {
    const roadmapSteps = [
      { step: "1", title: "Linear Structures (Arrays & Lists)", desc: "Build spatial intuition of memory buffers. Track single-pointer traversals, search queries, index arithmetic, and node pointers in linked lists.", topics: ["arrays", "linked_list"], unlocked: true },
      { step: "2", title: "LIFO & FIFO Mechanics (Stacks & Queues)", desc: "Master memory allocation flow. Walk through function call stacks, postfix solvers, bracket validators, and standard circular queue buffers.", topics: ["stacks", "queues"], unlocked: true },
      { step: "3", title: "Divide & Conquer (Sorting & Searching)", desc: "Explore subproblem sorting and partitioning. Step-by-step pivots of Quick Sort, index midpoints in Binary Search, and pointer merges in Merge Sort.", topics: ["sorting", "searching"], unlocked: true },
      { step: "4", title: "Non-Linear Hierarchies (Trees & Graphs)", desc: "Visualize graph traversals and relational networks. Walkthrough BST nodes, in-order print paths, DFS/BFS colors, and shortest paths.", topics: ["trees", "graphs"], unlocked: true },
      { step: "5", title: "Dynamic Optimization (DP & Greedy)", desc: "Observe memorization recursion and optimization pathways. Trace Fibonacci memoization arrays, coin change grids, and knapsack tables.", topics: ["dp", "greedy"], unlocked: true }
    ];

    return (
      <div className="space-y-6 text-slate-100">
        <div className="space-y-1 text-center max-w-xl mx-auto">
          <div className="text-xs font-mono text-fuchsia-400 font-bold uppercase tracking-widest">Mastery Pathway</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-display">
            DSA Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">Roadmap</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            A comprehensive, sequential timeline to mastering algorithms. Click on any roadmap node to learn more.
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6 relative pl-8 border-l border-white/10 py-2">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-fuchsia-500 via-indigo-500 to-slate-800" />

          {roadmapSteps.map((node) => (
            <div key={node.step} className="relative space-y-3">
              {/* timeline bullet node */}
              <div className={`absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-extrabold ${
                node.unlocked 
                  ? "bg-fuchsia-500 text-white border-fuchsia-400 shadow-md shadow-fuchsia-500/20" 
                  : "bg-slate-950 text-slate-500 border-slate-800"
              }`}>
                {node.step}
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-900/20 hover:border-white/10 transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-white">{node.title}</h3>
                  {!node.unlocked && (
                    <span className="text-[9px] font-mono font-bold bg-indigo-500/15 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5 text-indigo-400" /> PRO Required
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{node.desc}</p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {node.topics.map((tKey) => {
                    const matched = topicsList.find(t => t.key === tKey);
                    if (!matched) return null;
                    return (
                      <button
                        key={tKey}
                        onClick={() => handleSelectTopic(matched)}
                        className="px-2.5 py-1 text-[10px] font-semibold rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-fuchsia-300 transition-colors flex items-center gap-1"
                      >
                        {matched.title}
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLeetCodePage = () => {
    return (
      <div className="space-y-6 text-slate-100 max-w-6xl mx-auto">
        <LeetCodeQuestions 
          onSelectQuestion={(q) => {
            setSelectedSandboxQuestion(q);
            setViewMode("practice-sandbox");
          }} 
        />
      </div>
    );
  };

  const renderSavedPage = () => {
    return (
      <div className="space-y-6 text-slate-100">
        <div className="space-y-1">
          <div className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-widest">Knowledge Archive</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-display">
            Saved <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">Walkthroughs</span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Access your previously compiled dry-run simulations, steps, and custom AI tracing logs saved in your history.
          </p>
        </div>

        {savedHistory.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl text-center space-y-4 max-w-xl mx-auto border border-white/5">
            <Bookmark className="w-12 h-12 text-slate-600 mx-auto animate-bounce" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">No Saved History Yet</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                Launch the interactive dry-run sandbox, compile any custom algorithm trace, and click the 'Save Tracing' button to store your walkthroughs here.
              </p>
            </div>
            <button
              onClick={() => setViewMode("sandbox")}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white transition-all shadow"
            >
              Start Custom Tracing Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedHistory.map((item) => (
              <div key={item.id} className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-900/30 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500">{item.timestamp}</span>
                    <button
                      onClick={(e) => deleteHistoryItem(item.id, e)}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
                      title="Delete walkthrough"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="text-base font-bold text-white leading-tight">{item.title}</h3>
                  <div className="flex gap-2">
                    <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">Time: {item.algoData.timeComplexity}</span>
                    <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">Space: {item.algoData.spaceComplexity}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setAlgoData(item.algoData);
                    setCurrentStepIdx(0);
                    setViewMode("sandbox");
                    setNotification({ message: `Loaded walkthrough "${item.title}" successfully!`, type: "success" });
                  }}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white font-semibold transition-all"
                >
                  Load to Dry-Run Sandbox
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Load Saved Walkthroughs & AI Generations Count on Mount / User change
  useEffect(() => {
    if (user?.id) {
      const fetchHistory = async () => {
        try {
          const response = await fetch(`/api/history/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data.history)) {
              setSavedHistory(data.history);
            }
          }
        } catch (err) {
          console.error("Error fetching history from backend:", err);
        }
      };
      const fetchGenerations = async () => {
        try {
          const response = await fetch(`/api/generations/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            if (typeof data.count === "number") {
              setAiGenerationsCount(data.count);
              localStorage.setItem("ai_generations_count_v1", String(data.count));
            }
          }
        } catch (err) {
          console.error("Error fetching generations count from backend:", err);
        }
      };
      fetchHistory();
      fetchGenerations();
    } else {
      const loaded = localStorage.getItem("blockviz_history_v1");
      if (loaded) {
        try {
          setSavedHistory(JSON.parse(loaded));
        } catch (e) {
          console.error("Error parsing history from local storage:", e);
        }
      } else {
        setSavedHistory([]);
      }
    }
  }, [user?.id]);

  // Sync notification timer
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Determine Active Billing Status
  const isPro = (() => {
    if (simulatedPlan === "pro") return true;
    if (simulatedPlan === "free") return false;
    
    if (has) {
      if (
        has({ plan: 'pro_tier' }) || 
        has({ plan: 'cplan_3FrBocqye1K04JeBAyrHKta7mOW' }) || 
        has({ feature: 'pro_tier' }) || 
        has({ role: 'pro_tier' }) || 
        has({ plan: 'pro' }) || 
        has({ plan: 'gold' }) || 
        has({ plan: 'bronze' }) || 
        has({ feature: 'premium_access' }) ||
        has({ feature: 'widgets' })
      ) {
        return true;
      }
    }
    
    if (
      user?.publicMetadata?.plan === "pro_tier" ||
      user?.publicMetadata?.plan === "cplan_3FrBocqye1K04JeBAyrHKta7mOW" ||
      user?.publicMetadata?.role === "pro_tier" ||
      user?.publicMetadata?.plan === "pro" || 
      user?.publicMetadata?.plan === "gold"
    ) {
      return true;
    }
    
    return false;
  })();

  const incrementAiGeneration = () => {
    const nextVal = aiGenerationsCount + 1;
    setAiGenerationsCount(nextVal);
    localStorage.setItem("ai_generations_count_v1", String(nextVal));
  };

  const saveCurrentWalkthrough = async () => {
    if (!isPro) {
      setUpgradeModalFeature("history");
      setShowUpgradeModal(true);
      return;
    }

    const newHistoryItem = {
      id: `history_${Date.now()}`,
      title: `${algoData.title} (Saved)`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      algoData: algoData
    };

    if (user?.id) {
      try {
        const response = await fetch(`/api/history/${user.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ item: newHistoryItem })
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.history)) {
            setSavedHistory(data.history);
          } else {
            setSavedHistory(prev => [newHistoryItem, ...prev]);
          }
          setNotification({ message: "Algorithm saved to your Pro walkthrough history! 🌟", type: "success" });
        } else {
          throw new Error("Failed to save history via backend");
        }
      } catch (err) {
        console.error("Error saving history via backend:", err);
        setNotification({ message: "Failed to save walkthrough to history.", type: "error" });
      }
    } else {
      const updated = [newHistoryItem, ...savedHistory];
      setSavedHistory(updated);
      localStorage.setItem("blockviz_history_v1", JSON.stringify(updated));
      setNotification({ message: "Algorithm saved to your Pro walkthrough history! 🌟", type: "success" });
    }
  };

  const deleteHistoryItem = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (user?.id) {
      try {
        const response = await fetch(`/api/history/${user.id}/${id}`, {
          method: "DELETE"
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.history)) {
            setSavedHistory(data.history);
          } else {
            setSavedHistory(prev => prev.filter(item => item.id !== id));
          }
          setNotification({ message: "Saved walkthrough deleted.", type: "info" });
        } else {
          throw new Error("Failed to delete history item via backend");
        }
      } catch (err) {
        console.error("Error deleting history item from backend:", err);
        setNotification({ message: "Failed to delete item from history.", type: "error" });
      }
    } else {
      const updated = savedHistory.filter(item => item.id !== id);
      setSavedHistory(updated);
      localStorage.setItem("blockviz_history_v1", JSON.stringify(updated));
      setNotification({ message: "Saved walkthrough deleted.", type: "info" });
    }
  };

  const loadHistoryItem = (item: typeof savedHistory[0]) => {
    setAlgoData(item.algoData);
    setCurrentTopicKey(item.id);
    setCurrentStepIdx(0);
    setIsPlaying(false);
    setErrorMessage(null);
    setViewMode("sandbox");
    setNotification({ message: `Loaded saved walkthrough: ${item.algoData.title} ⚡`, type: "success" });
  };

  // Navigation & Data State
  const [currentTopicKey, setCurrentTopicKey] = useState<string>("sliding_window");
  const [customTopicInput, setCustomTopicInput] = useState<string>("");
  const [algoData, setAlgoData] = useState<AlgorithmData>(templates.sliding_window);

  // Determine layout type based on data.visualizationType or keywords in title/topic
  const getVisualizationLayoutType = (): 'array' | 'linked_list' | 'stack' | 'queue' | 'tree' | 'graph' | 'default' => {
    const anyAlgo: any = algoData;
    if (anyAlgo && anyAlgo.visualizationType) {
      const vt = String(anyAlgo.visualizationType).toLowerCase();
      if (['array', 'linked_list', 'stack', 'queue', 'tree', 'graph', 'default'].includes(vt)) {
        return vt as any;
      }
    }
    
    // Auto-detect based on title or description
    const title = (algoData.title || "").toLowerCase();
    const desc = (algoData.description || "").toLowerCase();
    
    if (title.includes("stack") || desc.includes("stack") || title.includes("lifo") || title.includes("push") || title.includes("pop")) return "stack";
    if (title.includes("queue") || desc.includes("queue") || title.includes("fifo") || title.includes("enqueue") || title.includes("dequeue")) return "queue";
    if (title.includes("tree") || desc.includes("tree") || title.includes("heap") || title.includes("bst") || title.includes("trie") || title.includes("node") || title.includes("traversal")) return "tree";
    if (title.includes("graph") || desc.includes("graph") || title.includes("shortest path") || title.includes("dfs") || title.includes("bfs") || title.includes("dijkstra") || title.includes("mesh") || title.includes("bellman") || title.includes("prim") || title.includes("kruskal") || title.includes("astar")) return "graph";
    if (title.includes("link") || desc.includes("link") || title.includes("linked list") || title.includes("reverse")) return "linked_list";
    if (title.includes("sort") || title.includes("search") || title.includes("array") || title.includes("sliding window") || title.includes("pointers") || desc.includes("array") || desc.includes("index")) return "array";
    
    return "default";
  };

  // Heuristic auto-layout for tree or graph nodes if coordinates are missing
  const assignNodeCoordinates = (elements: VisualElement[], layoutType: string) => {
    return elements.map((elem, idx) => {
      if (elem.x !== undefined && elem.y !== undefined) {
        return { ...elem };
      }
      
      const cloned = { ...elem };
      if (layoutType === "tree") {
        // Level order layout for tree nodes
        const index = idx;
        if (index === 0) { cloned.x = 50; cloned.y = 15; }
        else if (index === 1) { cloned.x = 25; cloned.y = 40; }
        else if (index === 2) { cloned.x = 75; cloned.y = 40; }
        else if (index === 3) { cloned.x = 12; cloned.y = 65; }
        else if (index === 4) { cloned.x = 37; cloned.y = 65; }
        else if (index === 5) { cloned.x = 62; cloned.y = 65; }
        else if (index === 6) { cloned.x = 87; cloned.y = 65; }
        else {
          const count = elements.length - 7;
          const step = 80 / Math.max(1, count + 1);
          cloned.x = 10 + (idx - 7) * step;
          cloned.y = 88;
        }
      } else {
        // Circle layout for graph vertices
        const count = elements.length;
        const angle = (idx * 2 * Math.PI) / count - Math.PI / 2; // offset to top
        cloned.x = 50 + 35 * Math.cos(angle);
        cloned.y = 50 + 35 * Math.sin(angle);
      }
      return cloned;
    });
  };
  
  // Player state
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(4000); // ms per step (4 seconds break)
  
  // Custom generation status
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [showCustomInputDropdown, setShowCustomInputDropdown] = useState<boolean>(false);

  // Mobile / Video Recording Layout Parameters
  const [blockScale, setBlockScale] = useState<number>(0.85); // 0.5 to 1.3
  const [blockGap, setBlockGap] = useState<number>(10); // 4px to 24px
  const [ideFontSize, setIdeFontSize] = useState<number>(11); // 9px to 15px
  const [recordingLayout, setRecordingLayout] = useState<"standard" | "phone" | "youtube">("standard");
  const recordingMode = recordingLayout === "phone"; // Backward-compatibility
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false); // tick-tock synthesizer on step update
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false); // premium female voice reader

  // Custom video creator enhancements state
  const [visualFilter, setVisualFilter] = useState<"none" | "crt" | "matrix" | "obsidian" | "neon">("none");
  const [creatorWatermark, setCreatorWatermark] = useState<string>("@priyank_codes");
  const [creatorTitle, setCreatorTitle] = useState<string>(""); // Custom lesson/video header overlay
  const [autoPlayTimingMode, setAutoPlayTimingMode] = useState<"dynamic" | "constant">("dynamic");
  const [constantDelayMs, setConstantDelayMs] = useState<number>(3000); // 3 seconds per step constant
  const [autoPlayWithRecord, setAutoPlayWithRecord] = useState<boolean>(true);
  const [recordingCountdown, setRecordingCountdown] = useState<number>(0); // countdown: 3, 2, 1 before record starts
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>("");

  // Screen recording engine state
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const startHDRecording = async () => {
    if (!isPro) {
      setUpgradeModalFeature("recorder");
      setShowUpgradeModal(true);
      return;
    }
    try {
      if (typeof navigator === "undefined" || !navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        setNotification({ 
          message: "HD screen capturing is not supported or is blocked by your browser. Open the app in a new tab to record!", 
          type: "error" 
        });
        return;
      }

      // We request full HD display capture stream with 60 FPS preference
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          frameRate: { ideal: 60, max: 60 },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: true
      });

      streamRef.current = stream;
      recordedChunksRef.current = [];

      // Determine supported mime types for the recorder
      let mimeType = "video/webm;codecs=vp9,opus";
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = "video/webm;codecs=vp8,opus";
      }
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = "video/webm";
      }

      const mediaRecorder = new MediaRecorder(stream, { mimeType });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        
        // Trigger high-quality direct download of the recorded file
        const a = document.createElement("a");
        a.href = url;
        const topicSlug = algoData.title.toLowerCase().replace(/[^a-z0-9]+/g, "_");
        a.download = `${topicSlug}_hd_60fps.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Clean up resources
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 100);

        setIsCapturing(false);
        setRecordingCountdown(0);
      };

      // Automatically handle track end (e.g. user clicks "Stop Sharing" native chrome bar)
      stream.getVideoTracks()[0].onended = () => {
        if (mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(1000); // chunk slices every second
      setIsCapturing(true);

      // Start 3-2-1 visual countdown
      setRecordingCountdown(3);
      const countdownInterval = setInterval(() => {
        setRecordingCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            if (autoPlayWithRecord) {
              setCurrentStepIdx(0); // Reset to start
              setTimeout(() => {
                setIsPlaying(true);
              }, 50);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 500);

      setNotification({ message: "Recording active! Start countdown triggered...", type: "success" });
    } catch (err: any) {
      console.warn("User cancelled or browser blocked HD Recording:", err);
      const isSandboxError = err.name === "SecurityError" || err.message?.toLowerCase().includes("permission") || err.message?.toLowerCase().includes("sandbox");
      
      if (isSandboxError) {
        setNotification({ 
          message: "⚠️ Browser sandbox is blocking screen capture inside the iframe. Please open the app in a new tab (button in header) to record without sandbox constraints!", 
          type: "error" 
        });
      } else {
        setNotification({ 
          message: `Recording cancelled or failed: ${err.message || err}`, 
          type: "error" 
        });
      }
    }
  };

  const stopHDRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCapturing(false);
    setRecordingCountdown(0);
  };

  const hasMountedRef = useRef<boolean>(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Hook to load available high-quality English voices on voiceschanged event
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const loadVoicesList = () => {
      const voices = window.speechSynthesis.getVoices();
      // Filter for English languages
      const englishVoices = voices.filter(v => v.lang.toLowerCase().startsWith("en"));
      setAvailableVoices(englishVoices);

      // Auto-select a high-quality Google UK English Male default if possible
      if (englishVoices.length > 0) {
        setSelectedVoiceName((prevSelected) => {
          if (prevSelected && englishVoices.some(v => v.name === prevSelected)) {
            return prevSelected;
          }

          // Strict filter to exclude any female voices to guarantee a deep, nice, loud male accent
          const maleEnglishVoices = englishVoices.filter(v => {
            const name = v.name.toLowerCase();
            const isFemale = name.includes("female") || 
                             name.includes("samantha") || 
                             name.includes("zira") || 
                             name.includes("hazel") || 
                             name.includes("tessa") || 
                             name.includes("karen") || 
                             name.includes("moira") || 
                             name.includes("susan") || 
                             name.includes("veena") || 
                             name.includes("siri") ||
                             name.includes("victoria") ||
                             name.includes("fiona") ||
                             name.includes("microsoft zira") ||
                             name.includes("heera");
            return !isFemale;
          });

          // Prioritize Google UK English Male as the absolute preferred crisp, loud, professional accent
          const googleUKMale = maleEnglishVoices.find(v => {
            const n = v.name.toLowerCase();
            const lang = v.lang.toLowerCase();
            return n.includes("google") && (lang.includes("gb") || lang.includes("uk")) && n.includes("male");
          });
          const googleUKAny = maleEnglishVoices.find(v => {
            const n = v.name.toLowerCase();
            const lang = v.lang.toLowerCase();
            return n.includes("google") && (lang.includes("gb") || lang.includes("uk"));
          });
          const generalUKMale = maleEnglishVoices.find(v => {
            const lang = v.lang.toLowerCase();
            return (lang.includes("gb") || lang.includes("uk")) && (v.name.toLowerCase().includes("daniel") || v.name.toLowerCase().includes("george") || v.name.toLowerCase().includes("oliver"));
          });
          const googleUSMale = maleEnglishVoices.find(v => {
            const n = v.name.toLowerCase();
            const lang = v.lang.toLowerCase();
            return n.includes("google") && lang.includes("us") && n.includes("male");
          });
          const googleUSAny = maleEnglishVoices.find(v => {
            const n = v.name.toLowerCase();
            const lang = v.lang.toLowerCase();
            return n.includes("google") && lang.includes("us");
          });
          const microsoftDavid = maleEnglishVoices.find(v => {
            const n = v.name.toLowerCase();
            return n.includes("david") || (n.includes("microsoft") && n.includes("david"));
          });
          const generalUSMale = maleEnglishVoices.find(v => {
            const lang = v.lang.toLowerCase();
            return lang.includes("us") && (v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("alex") || v.name.toLowerCase().includes("fred") || v.name.toLowerCase().includes("mark"));
          });
          
          const defaultVoice = googleUKMale || googleUKAny || generalUKMale || googleUSMale || googleUSAny || microsoftDavid || generalUSMale || maleEnglishVoices[0] || englishVoices[0];
          return defaultVoice.name;
        });
      }
    };

    loadVoicesList();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoicesList;
    }
  }, []);

  // High-fidelity Web Speech API reader using a chosen clear nice accent
  const speakStepExplanation = (text: string) => {
    try {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      
      // Cancel any ongoing speech first to avoid overlapping or queuing delays
      window.speechSynthesis.cancel();
      
      if (!text) return;
      
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();
      
      // Find the Google UK Male voice or robust premium voice with clear accents
      let chosenVoice = voices.find(v => v.name === selectedVoiceName);
      
      if (!chosenVoice) {
        const englishVoices = voices.filter(v => v.lang.toLowerCase().startsWith("en"));
        const maleEnglishVoices = englishVoices.filter(v => {
          const name = v.name.toLowerCase();
          const isFemale = name.includes("female") || 
                           name.includes("samantha") || 
                           name.includes("zira") || 
                           name.includes("hazel") || 
                           name.includes("tessa") || 
                           name.includes("karen") || 
                           name.includes("moira") || 
                           name.includes("susan") || 
                           name.includes("veena") || 
                           name.includes("siri") ||
                           name.includes("victoria") ||
                           name.includes("fiona") ||
                           name.includes("microsoft zira") ||
                           name.includes("heera");
          return !isFemale;
        });

        chosenVoice = maleEnglishVoices.find(v => {
          const n = v.name.toLowerCase();
          const lang = v.lang.toLowerCase();
          return n.includes("google") && (lang.includes("gb") || lang.includes("uk")) && n.includes("male");
        }) || maleEnglishVoices.find(v => {
          const n = v.name.toLowerCase();
          const lang = v.lang.toLowerCase();
          return n.includes("google") && (lang.includes("gb") || lang.includes("uk"));
        }) || maleEnglishVoices.find(v => {
          const lang = v.lang.toLowerCase();
          return (lang.includes("gb") || lang.includes("uk")) && (v.name.toLowerCase().includes("daniel") || v.name.toLowerCase().includes("george") || v.name.toLowerCase().includes("oliver"));
        }) || maleEnglishVoices.find(v => {
          const n = v.name.toLowerCase();
          const lang = v.lang.toLowerCase();
          return n.includes("google") && lang.includes("us") && n.includes("male");
        }) || maleEnglishVoices.find(v => {
          const n = v.name.toLowerCase();
          const lang = v.lang.toLowerCase();
          return n.includes("google") && lang.includes("us");
        }) || maleEnglishVoices.find(v => {
          const n = v.name.toLowerCase();
          return n.includes("david") || (n.includes("microsoft") && n.includes("david"));
        }) || maleEnglishVoices.find(v => {
          const lang = v.lang.toLowerCase();
          return lang.includes("us") && (v.name.toLowerCase().includes("male") || v.name.toLowerCase().includes("alex") || v.name.toLowerCase().includes("fred") || v.name.toLowerCase().includes("mark"));
        }) || maleEnglishVoices[0] || englishVoices[0];
      }
      
      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }
      
      // Perfect crystal-clear playback settings for screen records & tutorials:
      // A rate of 1.18x sounds energetic, crisp, clear, and highly natural—never slow!
      utterance.rate = 1.18; 
      utterance.pitch = 1.0; 
      utterance.volume = 1.0; // Max volume for a very loud and clear signal
      
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech Synthesis error:", e);
    }
  };

  // High-fidelity Web Audio Synthesizer to create futuristic soft sounds on frame transition
  const playStepSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      // We will generate a nice cybernetic/mechanical pleasant drop/tick chime
      osc.type = "sine";
      
      // Slightly different pitches to keep it playful and dynamic based on index modulo
      const pitchOffset = (currentStepIdx % 3) * 40;
      const startFreq = 523.25 + pitchOffset; // E.g. C5 base
      const endFreq = 392.00; // G4 base
      
      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.12);
      
      // Extremely quick and soft volume envelope to act as an aesthetic mechanical click/tock
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.008); // quiet, pleasant peak 4% volume
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12); // smooth fade
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {
      console.warn("AudioContext playback blocked by system", e);
    }
  };

  // Play step transition sound and speak explanation
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    playStepSound();

    if (voiceEnabled) {
      const explanation = algoData.steps[currentStepIdx]?.explanation || "";
      speakStepExplanation(explanation);
    }
  }, [currentStepIdx]);

  // Handle voice state toggling on/off
  useEffect(() => {
    if (!voiceEnabled) {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } else {
      const explanation = algoData.steps[currentStepIdx]?.explanation || "Ready to start.";
      speakStepExplanation(explanation);
    }
  }, [voiceEnabled]);

  // Clean up any remaining speech on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Suggested custom topics for inspiration
  const suggestedTopics = [
    "Dijkstra's Shortest Path",
    "Stack push and pop operations",
    "Quick Sort Partitioning",
    "Breadth First Search (BFS)",
    "Queue Enqueue/Dequeue",
    "Binary Tree Inorder Traversal"
  ];

  // Load a built-in algorithm
  const loadBuiltIn = (key: string) => {
    // All built-in algorithms are fully unlocked for the free plan!

    if (templates[key]) {
      setAlgoData(templates[key]);
      setCurrentTopicKey(key);
      setCurrentStepIdx(0);
      setIsPlaying(false);
      setErrorMessage(null);
      setViewMode("sandbox");
    }
  };

  // Manage Autoplay loop with smart dynamic reading durations
  useEffect(() => {
    if (!isPlaying) {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      return;
    }

    const explanationText = algoData.steps[currentStepIdx]?.explanation || "";
    // Choose between Constant Delay (ideal for quick recording clips) or Speech-dynamic delay
    const delayDuration = autoPlayTimingMode === "constant" 
      ? constantDelayMs 
      : Math.max(5000, (explanationText.length * 85) + 4000);

    autoPlayTimerRef.current = setTimeout(() => {
      setCurrentStepIdx((prevIdx) => {
        if (prevIdx < algoData.steps.length - 1) {
          if (!isPro && prevIdx >= 11) {
            setIsPlaying(false);
            setUpgradeModalFeature("steplimit");
            setShowUpgradeModal(true);
            return prevIdx;
          }
          return prevIdx + 1;
        } else {
          setIsPlaying(false);
          return prevIdx;
        }
      });
    }, delayDuration);

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };
  }, [isPlaying, currentStepIdx, algoData, isPro, autoPlayTimingMode, constantDelayMs]);

  // Handle manual steps
  const nextStep = () => {
    setIsPlaying(false);
    if (currentStepIdx < algoData.steps.length - 1) {
      if (!isPro && currentStepIdx >= 11) {
        setUpgradeModalFeature("steplimit");
        setShowUpgradeModal(true);
        return;
      }
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setIsPlaying(false);
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  // Generate custom visualizer via server-side Gemini call
  const generateCustomVisualizer = async (topicName: string) => {
    if (!topicName || topicName.trim() === "") return;
    
    if (!isPro && aiGenerationsCount >= 2) {
      setUpgradeModalFeature("ai");
      setShowUpgradeModal(true);
      return;
    }
    
    setIsPlaying(false);
    setIsGenerating(true);
    setErrorMessage(null);
    setShowCustomInputDropdown(false);
    
    // Aesthetic fake/real step feedback
    setGenerationLogs(["Analyzing algorithm semantics...", "Bootstrapping state-space trace..."]);
    const logInterval = setInterval(() => {
      const logs = [
        "Consulting Big(O)-AI...",
        "Structuring variable dependencies...",
        "Formulating visualization frame sequence...",
        "Validating block colors and state transitions...",
        "Finalizing interactive walkthrough nodes..."
      ];
      setGenerationLogs(prev => {
        const nextIdx = prev.length - 2;
        if (nextIdx < logs.length) {
          return [...prev, logs[nextIdx]];
        }
        return prev;
      });
    }, 1500);

    try {
      const response = await fetch("/api/visualize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          topic: topicName,
          userId: user?.id || null,
          isPro: isPro
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429 || data.code === "LIMIT_REACHED") {
          setUpgradeModalFeature("ai");
          setShowUpgradeModal(true);
        }
        throw new Error(data.error || "Failed to generate visualization trace");
      }

      if (!data.steps || data.steps.length === 0) {
        throw new Error("Invalid visualization output received. Please try again.");
      }

      setAlgoData(data);
      setCurrentTopicKey(`custom_${Date.now()}`);
      setCurrentStepIdx(0);
      setCustomTopicInput("");
      
      // Successfully generated custom algorithm - track and save
      if (!isPro) {
        if (data.serverCount !== undefined) {
          setAiGenerationsCount(data.serverCount);
          localStorage.setItem("ai_generations_count_v1", String(data.serverCount));
        } else {
          incrementAiGeneration();
        }
        
        const count = data.serverCount !== undefined ? data.serverCount : aiGenerationsCount + 1;
        if (data.isFallback) {
          setNotification({ 
            message: `Optimized compiler engaged! Generated high-fidelity visualization for "${data.title}" 🚀`, 
            type: "success" 
          });
        } else {
          setNotification({ 
            message: `Generated! ${2 - count} of 2 free generations remaining today. 🌟`, 
            type: "info" 
          });
        }
      } else {
        // Automatically save to history for Pro members!
        const newHistoryItem = {
          id: `history_${Date.now()}`,
          title: `${data.title} (Auto-Saved)`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          algoData: data
        };

        if (user?.id) {
          try {
            const histRes = await fetch(`/api/history/${user.id}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ item: newHistoryItem })
            });
            if (histRes.ok) {
              const resData = await histRes.json();
              if (Array.isArray(resData.history)) {
                setSavedHistory(resData.history);
              }
            }
          } catch (err) {
            console.error("Error auto-saving custom walkthrough via backend:", err);
          }
        } else {
          setSavedHistory(prev => {
            const updated = [newHistoryItem, ...prev];
            localStorage.setItem("blockviz_history_v1", JSON.stringify(updated));
            return updated;
          });
        }

        if (data.isFallback) {
          setNotification({ message: `Optimized compiler engaged! Generated and auto-saved trace for "${data.title}" 🚀`, type: "success" });
        } else {
          setNotification({ message: "Custom logic trace generated & saved to your history! ⚡", type: "success" });
        }
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "An unexpected error occurred while generating the visualization.");
    } finally {
      clearInterval(logInterval);
      setIsGenerating(false);
    }
  };

  const currentStep: AlgoStep = algoData.steps[currentStepIdx] || {
    elements: [],
    variables: {},
    codeLine: 0,
    explanation: "Ready to start."
  };

  // Determine element state classes
  const getElementStateClasses = (state: string) => {
    switch (state) {
      case "active":
        return "border-2 border-l-4 border-teal-400 bg-teal-950/40 text-teal-200 shadow-[0_8px_32px_rgba(20,184,166,0.25)] scale-105 z-10 backdrop-blur-md";
      case "selected":
        return "border-2 border-l-4 border-amber-400 bg-amber-950/40 text-amber-200 shadow-[0_8px_32px_rgba(245,158,11,0.25)] scale-105 z-10 backdrop-blur-md";
      case "success":
        return "border-2 border-l-4 border-emerald-400 bg-emerald-950/40 text-emerald-200 shadow-[0_8px_32px_rgba(16,185,129,0.25)] backdrop-blur-md";
      case "fail":
        return "border-2 border-l-4 border-rose-500 bg-rose-950/40 text-rose-200 shadow-[0_8px_32px_rgba(244,63,94,0.25)] backdrop-blur-md animate-pulse";
      case "inactive":
        return "border border-white/5 bg-white/2 text-slate-500 opacity-30 scale-95 backdrop-blur-sm";
      default:
        return "glass-panel border-l-4 border-l-indigo-500 text-slate-300 hover:border-l-indigo-400 hover:bg-white/5";
    }
  };

  const getFilteredBlockStyles = (state: string) => {
    if (visualFilter === "none") return "";
    
    if (visualFilter === "crt") {
      if (state === "active") return "!border-emerald-400 !bg-emerald-950/80 !text-emerald-300 retro-glow-text shadow-[0_0_12px_rgba(16,185,129,0.6)]";
      if (state === "selected") return "!border-amber-400 !bg-amber-950/80 !text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.6)]";
      if (state === "success") return "!border-emerald-500 !bg-emerald-950/90 !text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.7)]";
      if (state === "fail") return "!border-rose-500 !bg-rose-950/90 !text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.6)] animate-pulse";
      if (state === "inactive") return "!opacity-20 !border-slate-800 !text-slate-600";
      return "!border-emerald-800/40 !bg-black/60 !text-emerald-400 font-mono";
    }

    if (visualFilter === "matrix") {
      if (state === "active") return "!border-green-400 !bg-green-950/80 !text-green-300 shadow-[0_0_18px_rgba(34,197,94,0.6)]";
      if (state === "selected") return "!border-yellow-500 !bg-yellow-950/80 !text-yellow-300 shadow-[0_0_18px_rgba(234,179,8,0.5)]";
      if (state === "success") return "!border-green-500 !bg-black !text-green-300 shadow-[0_0_22px_rgba(34,197,94,0.8)]";
      if (state === "fail") return "!border-red-600 !bg-red-950/80 !text-red-300 shadow-[0_0_18px_rgba(220,38,38,0.6)] animate-pulse";
      if (state === "inactive") return "!opacity-15 !border-green-950/20 !text-green-900";
      return "!border-green-900/40 !bg-black/80 !text-green-500 font-mono";
    }

    if (visualFilter === "obsidian") {
      if (state === "active") return "!border-rose-500 !bg-rose-950/50 !text-rose-100 midnight-active-glow";
      if (state === "selected") return "!border-amber-400 !bg-amber-950/50 !text-amber-100 shadow-[0_0_18px_rgba(245,158,11,0.5)]";
      if (state === "success") return "!border-cyan-400 !bg-cyan-950/50 !text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.6)]";
      if (state === "fail") return "!border-red-500 !bg-red-950/50 !text-red-100 animate-pulse";
      if (state === "inactive") return "!opacity-20 !border-slate-900 !text-slate-800";
      return "!border-slate-800/80 !bg-black/95 !text-slate-300";
    }

    if (visualFilter === "neon") {
      if (state === "active") return "!border-fuchsia-400 !bg-fuchsia-950/70 !text-fuchsia-100 neon-pulse-fuchsia";
      if (state === "selected") return "!border-amber-400 !bg-amber-950/70 !text-amber-100 shadow-[0_0_18px_rgba(251,191,36,0.6)]";
      if (state === "success") return "!border-cyan-400 !bg-cyan-950/70 !text-cyan-100 neon-pulse-cyan";
      if (state === "fail") return "!border-rose-500 !bg-rose-950/70 !text-rose-100 shadow-[0_0_18px_rgba(244,63,94,0.6)] animate-pulse";
      if (state === "inactive") return "!opacity-30 !border-white/5 !text-slate-600";
      return "!border-indigo-500/40 !bg-indigo-950/50 !text-indigo-200 shadow-[0_0_12px_rgba(99,102,241,0.2)]";
    }

    return "";
  };

  return (
    <div id="visualizer-root" className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden relative">
      
      {/* Mesh background from design theme */}
      <div className="mesh-bg fixed inset-0 z-0" />

      {/* Production Launch Announcement Banner */}
     

      {/* Main Header */}
      <SignedOut>
        <header className="relative z-40 border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="Logo"
                className="w-10 h-10 rounded-xl object-cover border border-white/10 shadow-lg shadow-pink-500/15 hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div>
                <h1 className="text-xl font-extrabold tracking-tight font-display text-white">
                  Big <span className="text-indigo-400 font-normal italic font-sans text-lg">O(n)</span>
                </h1>
                <p className="text-xs text-slate-400">
                  Interactive logic frames • Live trace engine
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a 
                href="#pricing"
                className="px-3.5 py-2 text-slate-400 hover:text-white font-semibold text-xs transition-colors hidden sm:inline-block"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Pricing & Plans
              </a>
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-xs text-white transition-all shadow-md shadow-indigo-500/10 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 font-bold text-xs transition-all cursor-pointer">
                  Get Started
                </button>
              </SignUpButton>
            </div>
          </div>
        </header>

        <main className="relative z-10 max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-16 flex flex-col items-center justify-center">
          
          {/* Hero Section */}
          <div className="text-center space-y-6 max-w-3xl mt-8">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
              Interactive Algorithms Dry-Run Sandbox
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-white"
            >
              Visualize the mechanics of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400">
                Algorithm Execution
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto"
            >
              Go beyond reading code. Walk step-by-step through sliding windows, pointer offsets, and call-stacks. Generate custom visual walkthroughs powered by Gemini in real-time.
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 pt-4"
            >
              <SignUpButton mode="modal">
                <button className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-400 hover:to-fuchsia-400 text-white font-bold text-sm shadow-xl shadow-indigo-500/20 hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer">
                  Create Free Account
                  <ArrowRight className="w-4 h-4" />
                </button>
              </SignUpButton>
              
              <SignInButton mode="modal">
                <button className="px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-sm transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer">
                  Sign In to Access
                </button>
              </SignInButton>
            </motion.div>
          </div>

          {/* Feature Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 hover:border-indigo-500/20 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Terminal className="w-5 h-5 text-indigo-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Live Trace Engine</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dissect exact pointer indexes, arrays, variables, and lookups at each microstep of runtime.
                </p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 hover:border-fuchsia-500/20 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5 text-fuchsia-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">AI Visualizer</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Describe any unique data structure or dynamic algorithm, and watch Gemini generate custom visual frames.
                </p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 hover:border-amber-500/20 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Video className="w-5 h-5 text-amber-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">HD Recording Mode</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Record pristine HD videos directly in your browser tab for step-by-step tutorials, shorts, and slides.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Graphic: Simulated Pointer Visualizer */}
          <div className="w-full max-w-3xl glass-panel p-6 rounded-3xl border border-indigo-500/10 relative overflow-hidden bg-slate-900/40 backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-12 bg-indigo-500/5 rounded-full blur-xl" />
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-slate-500 font-mono ml-2">demo_tracer.py</span>
              </div>
              <span className="text-[10px] text-indigo-400 font-mono font-bold bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                ACTIVE STEP: 4/12
              </span>
            </div>

            <div className="space-y-6">
              <div className="flex justify-center gap-3">
                {[12, 18, 4, 9, 21, 15, 8, 14].map((num, i) => {
                  const isLeft = i === 2;
                  const isRight = i === 5;
                  const inWindow = i >= 2 && i <= 5;
                  return (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xs border transition-all ${
                        inWindow 
                          ? "bg-indigo-500/10 border-indigo-500/80 text-white shadow-lg shadow-indigo-500/10" 
                          : "bg-white/5 border-white/10 text-slate-400"
                      }`}>
                        {num}
                      </div>
                      <div className="h-6 font-mono text-[9px] font-bold">
                        {isLeft && <span className="text-amber-400">left</span>}
                        {isRight && <span className="text-fuchsia-400">right</span>}
                        {!isLeft && !isRight && inWindow && <span className="text-indigo-400/60">•</span>}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 bg-slate-950/60 rounded-2xl border border-white/5 space-y-1 text-center font-mono text-xs">
                <span className="text-slate-500 text-[10px]">CURRENT EXPLANATION</span>
                <p className="text-slate-200 text-xs">
                  The <span className="text-amber-400 font-semibold">left</span> pointer stays at index 2, while the <span className="text-fuchsia-400 font-semibold">right</span> pointer expands to index 5. Sum: <span className="text-emerald-400 font-bold">49</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing & Plans Section on Home Page */}
          <section id="pricing" className="w-full max-w-4xl space-y-8 pt-12 border-t border-white/10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide">
                <Zap className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                Affordable, Developer-Friendly Pricing
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white">
                Choose Your Plan & Limit
              </h2>
              <p className="text-sm text-slate-400 max-w-lg mx-auto">
                Start for free or upgrade to gain unlimited custom algorithm traces, pristine water-mark free recording downloads, and custom histories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {/* Free Tier Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/5 bg-slate-900/20 flex flex-col justify-between space-y-6 relative group hover:border-white/10 transition-all">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase bg-white/5 px-2.5 py-0.5 rounded border border-white/5">
                        Tier Key: free_user
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1.5">Free Plan</h3>
                    </div>
                    <span className="text-2xl font-extrabold text-white font-mono">$0</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Perfect for students and developers learning the basics of sliding windows, pointer loops, and simple sort tracing.
                  </p>
                  
                  <div className="border-t border-white/5 pt-4 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>3 built-in visualizer presets</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>Max 12 execution steps per dry-run</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>Standard browser screen capture helper</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 line-through">
                      <span>Unlimited custom algorithm AI synthesis</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 line-through">
                      <span>Pristine 9:16 vertical phone layout recordings</span>
                    </div>
                  </div>
                </div>

                <SignUpButton mode="modal">
                  <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-bold text-xs transition-all cursor-pointer">
                    Get Started Free
                  </button>
                </SignUpButton>
              </div>

              {/* Pro Tier Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-slate-900/40 flex flex-col justify-between space-y-6 relative shadow-2xl shadow-indigo-500/10 hover:border-indigo-500/50 transition-all">
                <div className="absolute top-0 right-0 w-32 h-12 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
                <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-[10px] font-bold text-white uppercase tracking-wider shadow">
                  <Sparkles className="w-3 h-3 text-white animate-spin" />
                  Most Popular
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-indigo-400 font-mono font-bold tracking-wider uppercase bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20">
                        Tier Key: pro_tier
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1.5 flex items-center gap-1.5">
                        Pro Tier
                        <span className="text-[9px] font-mono font-semibold text-slate-500">cplan_3FrBocqye1K04JeBAyrHKta7mOW</span>
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-indigo-300 font-mono">$9.99</span>
                      <span className="text-[9px] text-slate-500 block font-medium">per month</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Designed for programmers, interviewees, content creators, and educators who need advanced structures and unlimited AI visualizer generation.
                  </p>
                  
                  <div className="border-t border-white/5 pt-4 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-semibold text-indigo-200">All advanced structures (DP, Graphs, Trees)</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="font-semibold text-indigo-200">Unlimited custom algorithm AI generations</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Unlimited dry-run steps & call stack nesting</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Pristine 60fps watermark-free screen capture</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>9:16 vertical smartphone format tutorials layout</span>
                    </div>
                  </div>
                </div>

                <SignUpButton mode="modal">
                  <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-400 hover:to-fuchsia-400 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 hover:scale-[1.01] active:scale-99 transition-all cursor-pointer">
                    Upgrade to Pro ⚡
                  </button>
                </SignUpButton>
              </div>
            </div>
          </section>

          {/* Footer inside signed-out view */}
          <div className="text-center pt-8 border-t border-white/5 w-full text-xs text-slate-500 space-y-2">
            <p>Designed and hosted on AI Studio for programmers, interviewees, and visual thinkers.</p>
            <div className="flex justify-center items-center gap-2">
              <a href="https://codewithbigo.me/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors font-semibold flex items-center gap-1 font-mono">
                codewithbigo.me <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </main>
      </SignedOut>

      <SignedIn>
        {/* Main Header */}
        <header className="relative z-40 border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            <div className="flex items-center justify-between xl:justify-start gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={logoImg}
                  alt="Logo"
                  className="w-10 h-10 rounded-xl object-cover border border-white/10 shadow-lg shadow-pink-500/15 hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h1 className="text-xl font-extrabold tracking-tight font-display text-white flex items-center gap-2">
                    Big <span className="text-indigo-400 font-normal italic font-sans text-lg">O(n)</span>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                      isPro 
                        ? "bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 border border-indigo-500/30 text-indigo-300 animate-pulse" 
                        : "bg-white/5 border border-white/10 text-slate-400"
                    }`}>
                      {isPro ? "🌟 PRO MEMBER" : "🍃 FREE TIER"}
                    </span>
                  </h1>
                  <p className="text-xs text-slate-400">
                    Interactive logic frames • Live trace engine
                  </p>
                </div>
              </div>

              {/* Mobile / Tablet Mode Toggles */}
              <div className="flex items-center gap-1 xl:hidden bg-white/5 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setViewMode("sandbox")}
                  className={`p-2 rounded-lg text-xs transition-all ${viewMode === "sandbox" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}
                  title="Home"
                >
                  <Home className="w-4 h-4 text-fuchsia-400" />
                </button>
                <button
                  onClick={() => setViewMode("topics")}
                  className={`p-2 rounded-lg text-xs transition-all ${viewMode === "topics" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}
                  title="Topics"
                >
                  <Grid className="w-4 h-4 text-fuchsia-400" />
                </button>
                <button
                  onClick={() => setViewMode("practice")}
                  className={`p-2 rounded-lg text-xs transition-all ${viewMode === "practice" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}
                  title="Practice"
                >
                  <Award className="w-4 h-4 text-fuchsia-400" />
                </button>
                <button
                  onClick={() => setViewMode("roadmap")}
                  className={`p-2 rounded-lg text-xs transition-all ${viewMode === "roadmap" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}
                  title="Roadmap"
                >
                  <Map className="w-4 h-4 text-fuchsia-400" />
                </button>
                <button
                  onClick={() => setViewMode("leetcode")}
                  className={`p-2 rounded-lg text-xs transition-all ${viewMode === "leetcode" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}
                  title="LeetCode"
                >
                  <Sparkles className="w-4 h-4 text-fuchsia-400" />
                </button>
                <button
                  onClick={() => setViewMode("saved")}
                  className={`p-2 rounded-lg text-xs transition-all ${viewMode === "saved" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"}`}
                  title="Saved"
                >
                  <Bookmark className="w-4 h-4 text-fuchsia-400" />
                </button>
                <button
                  onClick={() => setViewMode("pricing")}
                  className={`p-2 rounded-lg text-xs transition-all ${viewMode === "pricing" ? "bg-white/10 text-indigo-300" : "text-slate-400 hover:text-white"}`}
                  title="Pricing"
                >
                  <Zap className="w-4 h-4 text-indigo-400" />
                </button>
              </div>
            </div>

            {/* Navigation tabs & User Menu */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Desktop Mode Tab Toggles */}
              <div className="hidden xl:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setViewMode("sandbox")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === "sandbox"
                      ? "bg-white/10 text-white border border-white/5 shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Home className="w-3.5 h-3.5 text-fuchsia-400" />
                  Home
                </button>
                <button
                  onClick={() => setViewMode("topics")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === "topics"
                      ? "bg-white/10 text-white border border-white/5 shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Grid className="w-3.5 h-3.5 text-fuchsia-400" />
                  Topics
                </button>
                <button
                  onClick={() => setViewMode("practice")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === "practice"
                      ? "bg-white/10 text-white border border-white/5 shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-fuchsia-400" />
                  Practice
                </button>
                <button
                  onClick={() => setViewMode("roadmap")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === "roadmap"
                      ? "bg-white/10 text-white border border-white/5 shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Map className="w-3.5 h-3.5 text-fuchsia-400" />
                  Roadmap
                </button>
                <button
                  onClick={() => setViewMode("leetcode")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === "leetcode"
                      ? "bg-white/10 text-white border border-white/5 shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
                  LeetCode
                </button>
                <button
                  onClick={() => setViewMode("saved")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === "saved"
                      ? "bg-white/10 text-white border border-white/5 shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 text-fuchsia-400" />
                  Saved
                </button>
                <button
                  onClick={() => setViewMode("pricing")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === "pricing"
                      ? "bg-white/10 text-indigo-300 border border-white/5 shadow"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-indigo-400" />
                  Pricing & Plans
                </button>
              </div>

              {/* User Button Wrapper matching the theme */}
              <div className="shrink-0 bg-white/5 border border-white/10 p-1 rounded-xl flex items-center justify-center backdrop-blur-md">
                <UserButton />
              </div>
            </div>
          </div>
        </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {viewMode === "pricing" ? (
          <PricingSection 
            isPro={isPro} 
            simulatedPlan={simulatedPlan} 
            setSimulatedPlan={setSimulatedPlan} 
            ClerkPricingTable={PricingTable} 
          />
        ) : viewMode === "topic-detail" ? (
          <TopicDetailPage 
            topicKey={currentTopicKey}
            onBack={() => setViewMode("topics")} 
            isPro={isPro}
            onUpgrade={() => {
              setUpgradeModalFeature("presets");
              setShowUpgradeModal(true);
            }}
            onSelectTopic={(key) => {
              const matchedTopic = topicsList.find(t => t.key === key);
              if (matchedTopic) {
                handleSelectTopic(matchedTopic);
              } else {
                setCurrentTopicKey(key);
              }
            }}
          />
        ) : viewMode === "topics" ? (
          renderTopicsPage(!!user)
        ) : viewMode === "practice" ? (
          renderPracticePage()
        ) : viewMode === "roadmap" ? (
          renderRoadmapPage()
        ) : viewMode === "leetcode" ? (
          renderLeetCodePage()
        ) : viewMode === "saved" ? (
          renderSavedPage()
        ) : viewMode === "practice-sandbox" && selectedSandboxQuestion ? (
          <PracticeSandbox 
            question={selectedSandboxQuestion}
            onBack={() => {
              if (selectedSandboxQuestion.id && selectedSandboxQuestion.id.startsWith("p")) {
                setViewMode("practice");
              } else {
                setViewMode("leetcode");
              }
            }}
            user={user}
          />
        ) : (
          <>
            {/* AI Prompt Section - Let's visualize *any* topic */}
        <section id="ai-generator-panel" className="glass-panel p-6 rounded-3xl relative z-30 shadow-2xl overflow-visible backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-48 h-12 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider font-display">
                <Sparkles className="w-4 h-4 animate-pulse" />
                AI Visualization Engine
              </div>
              <h2 className="text-lg font-bold tracking-tight">
                Animate any algorithm or data structure
              </h2>
              <p className="text-slate-300 text-sm max-w-xl">
                Type any algorithm (e.g. <span className="text-indigo-300">"Quick Sort"</span>, <span className="text-indigo-300">"Kruskal's MST"</span>, or <span className="text-indigo-300">"DFS on a Graph"</span>) and Gemini will instantly build a custom step-by-step interactive simulator.
              </p>
            </div>

            {/* Prompt Search Bar */}
            <div className="relative w-full lg:max-w-md">
              <form onSubmit={(e) => { e.preventDefault(); generateCustomVisualizer(customTopicInput); }} className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <Cpu className="w-4.5 h-4.5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter algorithm topic (e.g., Quick Sort)..."
                  value={customTopicInput}
                  onChange={(e) => setCustomTopicInput(e.target.value)}
                  onFocus={() => setShowCustomInputDropdown(true)}
                  disabled={isGenerating}
                  className="w-full pl-11 pr-40 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  disabled={isGenerating || !customTopicInput.trim()}
                  className="absolute right-1.5 px-3.5 py-1.5 text-xs font-bold bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:brightness-110 active:scale-95 text-white rounded-lg transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-500/20 disabled:opacity-55 disabled:hover:shadow-none"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  GENERATE ENGINE
                </button>
              </form>

              {/* Suggestions dropdown on focus */}
              {showCustomInputDropdown && (
                <div className="absolute left-0 right-0 mt-2 bg-slate-950 border border-white/10 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Suggested Topics</span>
                    <button 
                      onClick={() => setShowCustomInputDropdown(false)}
                      className="text-[10px] text-slate-400 hover:text-slate-200"
                    >
                      Close
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {suggestedTopics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => {
                          setCustomTopicInput(topic);
                          generateCustomVisualizer(topic);
                        }}
                        className="text-left text-xs px-2.5 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-indigo-300 rounded-lg transition-all truncate border border-transparent hover:border-white/10 flex items-center gap-1.5"
                      >
                        <ArrowRight className="w-3 h-3 text-indigo-500/60" />
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Loading Animation Area */}
          {isGenerating && (
            <div className="mt-4 p-4 bg-slate-950/90 border border-white/10 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <div className="w-10 h-10 border-2 border-indigo-500/20 border-t-indigo-400 rounded-full animate-spin" />
                  <Sparkles className="w-4.5 h-4.5 text-indigo-400 absolute animate-bounce" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-indigo-300">Big-(O) AI is synthesizing code and visual frames...</h4>
                  <p className="text-xs text-slate-500">Creating custom animations for "{customTopicInput || "your request"}"</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-right">
                <span className="text-[10px] font-mono text-indigo-500/70 uppercase tracking-widest">Compiler status</span>
                <span className="text-xs font-mono text-slate-400 italic">
                  {generationLogs[generationLogs.length - 1]}
                </span>
              </div>
            </div>
          )}

          {/* Fallback info if API key is missing */}
          {errorMessage && (
            <div className="mt-4 p-4 bg-rose-950/20 border border-rose-500/20 rounded-xl flex gap-3 text-rose-200">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-rose-300">Generation Failed</p>
                <p className="text-xs text-rose-400/90 leading-relaxed">{errorMessage}</p>
                {errorMessage.includes("API key") && (
                  <div className="mt-2 text-xs bg-slate-950/60 p-2 rounded-lg border border-slate-800 text-slate-400">
                    💡 <span className="font-semibold text-slate-200">To fix this:</span> Locate the <span className="text-indigo-400">Settings &gt; Secrets</span> panel in AI Studio and add a variable named <span className="font-mono text-indigo-400">GEMINI_API_KEY</span> with your Gemini API Key.
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Algorithm General Information Card */}
        <section className="glass-panel rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl relative z-10">
          <div className="space-y-1 md:max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] font-semibold text-slate-400 rounded-md uppercase tracking-wider">
                Active Topic
              </span>
              <h2 className="text-xl font-bold font-display text-white">{algoData.title}</h2>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{algoData.description}</p>
          </div>

          <div className="flex gap-2.5 shrink-0">
            <div className="px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 shadow-sm backdrop-blur-md">
              <Clock className="w-4 h-4 text-indigo-400" />
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">Time</span>
                <span className="text-xs font-bold text-indigo-300 font-mono">{algoData.timeComplexity}</span>
              </div>
            </div>
            <div className="px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 shadow-sm backdrop-blur-md">
              <Database className="w-4 h-4 text-fuchsia-400" />
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">Space</span>
                <span className="text-xs font-bold text-fuchsia-300 font-mono">{algoData.spaceComplexity}</span>
              </div>
            </div>
            <div className="px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 shadow-sm backdrop-blur-md">
              <Layers className="w-4 h-4 text-amber-400" />
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono">Steps</span>
                <span className="text-xs font-bold text-amber-300 font-mono">
                  {currentStepIdx + 1} / {algoData.steps.length}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Visualizer Grid Content */}
        <div className={`grid gap-5 ${
          recordingLayout === "phone" 
            ? "grid-cols-1 max-w-md mx-auto" 
            : recordingLayout === "youtube"
            ? "grid-cols-1 lg:grid-cols-12 max-w-5xl aspect-[16/9] w-full mx-auto p-5 bg-slate-950 border border-indigo-500/20 rounded-3xl shadow-2xl relative overflow-hidden" 
            : "grid-cols-1 lg:grid-cols-12"
        } relative z-10 transition-all duration-300`}>

          {/* Left / Top Side: Visual Stage */}
          <div className={`${
            recordingLayout === "phone" 
              ? "col-span-1" 
              : recordingLayout === "youtube"
              ? "lg:col-span-7"
              : "lg:col-span-8"
          } space-y-4 flex flex-col justify-start`}>

            {/* The Visual Block Canvas */}
            <div className={`glass-panel rounded-3xl relative overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-300 ${
              visualFilter === "crt" ? "crt-effect" : ""
            } ${
              visualFilter === "matrix" ? "border-emerald-500/30 bg-black/90 matrix-glow" : ""
            } ${
              visualFilter === "obsidian" ? "midnight-gradient border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.15)]" : ""
            } ${
              visualFilter === "neon" ? "shadow-[0_0_30px_rgba(129,140,248,0.25)] border-indigo-500/40" : ""
            } ${
              recordingLayout === "phone" 
                ? "p-4 min-h-[220px]" 
                : recordingLayout === "youtube"
                ? "p-4 h-[255px] justify-center" 
                : "p-8 min-h-[380px]"
            }`}>
              
              {/* Giant Recording Countdown Overlay */}
              {recordingCountdown > 0 && (
                <div className="absolute inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center backdrop-blur-md">
                  <motion.div 
                    key={recordingCountdown}
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 font-display"
                  >
                    {recordingCountdown}
                  </motion.div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 mt-4 tracking-widest animate-pulse uppercase">
                    RECORDER STARTING... GET READY!
                  </span>
                </div>
              )}

              {/* Creator Watermark and Lesson Title Overlay */}
              {(creatorWatermark || creatorTitle) && (
                <div className="absolute top-4 left-4 z-20 flex flex-col pointer-events-none items-start">
                  {creatorTitle && (
                    <span className="text-[10px] font-extrabold tracking-tight text-white uppercase font-display bg-indigo-600 px-2 py-0.5 rounded shadow-md border border-indigo-400/20">
                      {creatorTitle}
                    </span>
                  )}
                  {creatorWatermark && (
                    <span className="text-[9px] text-slate-400 font-mono mt-1 opacity-75 drop-shadow-md">
                      @{creatorWatermark}
                    </span>
                  )}
                </div>
              )}

              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>

              {/* Corner Watermark */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-40 text-[10px] font-mono tracking-wider text-indigo-300">
                <Activity className="w-3.5 h-3.5 text-fuchsia-400" />
                BLOCKVIZ_TRACE_ACTIVE
              </div>

              {/* Left pointer tag indicator block */}
              <div className="mb-1 relative z-10">
                <span className="text-[9px] uppercase font-semibold text-slate-400 tracking-wider">State Visualizer</span>
              </div>

              {/* Main Visualization element list with layout-specific styles */}
              <div 
                ref={scrollContainerRef}
                className="my-auto flex flex-col justify-center items-center overflow-x-auto min-w-full relative z-10 transition-all py-4"
              >
                {(() => {
                  const layoutType = getVisualizationLayoutType();
                  
                  // STACK (Bucket Style)
                  if (layoutType === "stack") {
                    return (
                      <div className="flex flex-col items-center justify-end w-52 border-b-4 border-x-4 border-white/20 px-4 pb-4 pt-12 min-h-[260px] bg-slate-950/40 rounded-b-3xl relative my-4 shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
                        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono uppercase tracking-widest text-slate-500">Stack Container (LIFO)</span>
                        <div className="flex flex-col-reverse gap-2 w-full">
                          <AnimatePresence mode="popLayout">
                            {currentStep.elements.map((elem: VisualElement, idx: number) => {
                              const isTop = idx === currentStep.elements.length - 1;
                              return (
                                <motion.div
                                  key={`${elem.id}-${idx}`}
                                  layout
                                  initial={{ opacity: 0, scale: 0.8, y: -40 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.8, y: -40 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                  className={`w-full py-3 px-4 rounded-xl text-center font-bold text-sm border-2 transition-all relative flex items-center justify-between shadow-md select-none ${
                                    elem.state === "inactive"
                                      ? "border-white/5 bg-white/2 text-slate-500 opacity-30"
                                      : elem.state === "active"
                                      ? "border-emerald-400 bg-emerald-950/90 text-emerald-100 shadow-[0_0_15px_rgba(52,211,153,0.4)]"
                                      : elem.state === "selected"
                                      ? "border-amber-400 bg-amber-950/90 text-amber-100 shadow-[0_0_15px_rgba(251,191,36,0.4)]"
                                      : elem.state === "success"
                                      ? "border-green-400 bg-green-950/90 text-green-100 shadow-[0_0_15px_rgba(74,222,128,0.4)]"
                                      : elem.state === "fail"
                                      ? "border-rose-500 bg-rose-950/90 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse"
                                      : "border-indigo-500/50 bg-indigo-950/60 text-indigo-100 hover:border-indigo-400"
                                  } ${getFilteredBlockStyles(elem.state)}`}
                                >
                                  <div className="text-[10px] font-mono text-slate-400">[{idx}]</div>
                                  <div className="font-display font-extrabold text-base text-white">{elem.label}</div>
                                  <div className="flex items-center gap-1.5 min-w-[40px] justify-end">
                                    {isTop && (
                                      <span className="text-[8px] font-extrabold bg-indigo-500 text-white px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                                        TOP
                                      </span>
                                    )}
                                    {elem.pointers && elem.pointers.map((p, pIdx) => (
                                      <span key={pIdx} className="text-[8px] font-extrabold bg-pink-500 text-white px-1.5 py-0.5 rounded shadow-sm uppercase">
                                        {p}
                                      </span>
                                    ))}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  }
                  
                  // QUEUE (Conveyor / Pipe Style)
                  if (layoutType === "queue") {
                    return (
                      <div className="relative flex items-center justify-center w-full max-w-2xl bg-slate-950/40 border-y-4 border-white/20 p-6 rounded-xl min-h-[140px] shadow-[inset_0_4px_24px_rgba(0,0,0,0.5)] my-4">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[8px] font-mono text-indigo-400 uppercase tracking-widest font-bold">FRONT ◄ OUT</span>
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-mono text-indigo-400 uppercase tracking-widest font-bold">IN ◄ REAR</span>
                        <div className="flex items-center justify-center gap-3 px-16">
                          <AnimatePresence mode="popLayout">
                            {currentStep.elements.map((elem: VisualElement, idx: number) => {
                              return (
                                <motion.div
                                  key={`${elem.id}-${idx}`}
                                  layout
                                  initial={{ opacity: 0, scale: 0.8, x: 50 }}
                                  animate={{ opacity: 1, scale: 1, x: 0 }}
                                  exit={{ opacity: 0, scale: 0.8, x: -50 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                  className="flex flex-col items-center shrink-0"
                                >
                                  <div className="h-5 flex gap-0.5 mb-1.5">
                                    {elem.pointers && elem.pointers.map((p, pIdx) => (
                                      <span key={pIdx} className="text-[8px] bg-pink-500 text-white font-extrabold px-1 rounded shadow-sm uppercase">
                                        {p}
                                      </span>
                                    ))}
                                    {idx === 0 && <span className="text-[8px] bg-emerald-500 text-white font-extrabold px-1 rounded shadow-sm">FRONT</span>}
                                    {idx === currentStep.elements.length - 1 && <span className="text-[8px] bg-indigo-500 text-white font-extrabold px-1 rounded shadow-sm">REAR</span>}
                                  </div>
                                  <div
                                    style={{
                                      width: `${blockScale * 68}px`,
                                      height: `${blockScale * 68}px`,
                                    }}
                                    className={`rounded-2xl flex flex-col items-center justify-center font-bold text-base border-2 transition-all duration-300 shadow-md select-none ${
                                      elem.state === "inactive"
                                        ? "border-white/5 bg-white/2 text-slate-500 opacity-30"
                                        : elem.state === "active"
                                        ? "border-emerald-400 bg-emerald-950/90 text-emerald-100 shadow-[0_0_15px_rgba(52,211,153,0.4)]"
                                        : elem.state === "selected"
                                        ? "border-amber-400 bg-amber-950/90 text-amber-100 shadow-[0_0_15px_rgba(251,191,36,0.4)]"
                                        : elem.state === "success"
                                        ? "border-green-400 bg-green-950/90 text-green-100 shadow-[0_0_15px_rgba(74,222,128,0.4)]"
                                        : elem.state === "fail"
                                        ? "border-rose-500 bg-rose-950/90 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse"
                                        : "border-indigo-500/50 bg-indigo-950/60 text-indigo-100 hover:border-indigo-400"
                                    } ${getFilteredBlockStyles(elem.state)}`}
                                  >
                                    <span className="text-white font-extrabold">{elem.label}</span>
                                  </div>
                                  <span className="text-[9px] font-mono text-slate-500 mt-1">[{idx}]</span>
                                </motion.div>
                              );
                            })}
                          </AnimatePresence>
                        </div>
                      </div>
                    );
                  }
                  
                  // TREE & GRAPH (2D Position Canvas)
                  if (layoutType === "tree" || layoutType === "graph") {
                    const nodes = assignNodeCoordinates(currentStep.elements, layoutType);
                    return (
                      <div className="relative w-full h-[320px] bg-slate-950/40 border border-white/5 rounded-3xl overflow-hidden shadow-inner my-4">
                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                          <defs>
                            <marker
                              id="arrowhead"
                              markerWidth="10"
                              markerHeight="7"
                              refX="25"
                              refY="3.5"
                              orient="auto"
                            >
                              <polygon points="0 0, 10 3.5, 0 7" fill="rgba(129,140,248,0.5)" />
                            </marker>
                          </defs>
                          {nodes.map((node) => {
                            const edges: VisualElement[] = [];
                            
                            if (node.nextId !== undefined && node.nextId !== "None" && node.nextId !== null) {
                              const target = nodes.find(n => n.id === node.nextId || String(n.id) === String(node.nextId) || n.label === node.nextId);
                              if (target) edges.push(target);
                            }
                            
                            if (layoutType === "tree" && (!node.nextId || node.nextId === "None")) {
                              const idx = nodes.indexOf(node);
                              const leftChildIdx = 2 * idx + 1;
                              const rightChildIdx = 2 * idx + 2;
                              if (leftChildIdx < nodes.length) edges.push(nodes[leftChildIdx]);
                              if (rightChildIdx < nodes.length) edges.push(nodes[rightChildIdx]);
                            }
                            
                            return edges.map((target, eIdx) => {
                              const x1 = `${node.x}%`;
                              const y1 = `${node.y}%`;
                              const x2 = `${target.x}%`;
                              const y2 = `${target.y}%`;
                              
                              return (
                                <line
                                  key={`${node.id}-${target.id}-${eIdx}`}
                                  x1={x1}
                                  y1={y1}
                                  x2={x2}
                                  y2={y2}
                                  stroke="rgba(129,140,248,0.3)"
                                  strokeWidth="2.5"
                                  markerEnd="url(#arrowhead)"
                                  className="transition-all duration-300"
                                />
                              );
                            });
                          })}
                        </svg>
                        
                        {nodes.map((node, idx) => {
                          return (
                            <motion.div
                              key={`${node.id}-${idx}`}
                              layout
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              style={{
                                position: "absolute",
                                left: `calc(${node.x}% - 22px)`,
                                top: `calc(${node.y}% - 22px)`,
                                width: "44px",
                                height: "44px",
                              }}
                              className={`rounded-full flex items-center justify-center font-extrabold text-xs border-2 select-none z-10 shadow-md transition-all duration-300 ${
                                node.state === "inactive"
                                  ? "border-white/5 bg-white/2 text-slate-500 opacity-30"
                                  : node.state === "active"
                                  ? "border-emerald-400 bg-emerald-950/95 text-emerald-100 shadow-[0_0_12px_rgba(52,211,153,0.5)] animate-bounce"
                                  : node.state === "selected"
                                  ? "border-amber-400 bg-amber-950/95 text-amber-100 shadow-[0_0_12px_rgba(251,191,36,0.5)] scale-105"
                                  : node.state === "success"
                                  ? "border-green-400 bg-green-950/95 text-green-100 shadow-[0_0_12px_rgba(74,222,128,0.5)]"
                                  : node.state === "fail"
                                  ? "border-rose-500 bg-rose-950/95 text-rose-100 shadow-[0_0_12px_rgba(244,63,94,0.5)] animate-pulse"
                                  : "border-indigo-500/50 bg-indigo-950/60 text-indigo-100 hover:border-indigo-400"
                              } ${getFilteredBlockStyles(node.state)}`}
                            >
                              <span className="text-white">{node.label}</span>
                              {node.pointers && node.pointers.length > 0 && (
                                <div className="absolute -bottom-6 flex flex-wrap gap-0.5 justify-center">
                                  {node.pointers.map((p, pIdx) => (
                                    <span key={pIdx} className="text-[8px] bg-pink-500 text-white font-mono font-extrabold px-1 rounded shadow-sm uppercase">
                                      {p}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                      </div>
                    );
                  }
                  
                  // LINKED LIST (Node with arrow indicator style)
                  if (layoutType === "linked_list") {
                    return (
                      <div className="flex flex-wrap items-center justify-center gap-3 py-6 overflow-x-auto w-full">
                        <AnimatePresence mode="popLayout">
                          {currentStep.elements.map((elem: VisualElement, idx: number) => {
                            const hasNext = elem.nextId !== undefined && elem.nextId !== "None" && elem.nextId !== null;
                            return (
                              <React.Fragment key={`${elem.id}-${idx}`}>
                                <motion.div
                                  layout
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  className="flex flex-col items-center shrink-0"
                                >
                                  <span className="text-[9px] font-mono text-slate-500 mb-1">
                                    {elem.index !== undefined ? `Node ${elem.index}` : `Node ${idx}`}
                                  </span>
                                  
                                  <div
                                    style={{
                                      width: `${blockScale * 72}px`,
                                      height: `${blockScale * 72}px`,
                                    }}
                                    className={`rounded-xl flex flex-col items-center justify-center font-bold text-sm border-2 transition-all duration-300 shadow-md select-none ${
                                      elem.state === "inactive"
                                        ? "border-white/5 bg-white/2 text-slate-500 opacity-30"
                                        : elem.state === "active"
                                        ? "border-emerald-400 bg-emerald-950/90 text-emerald-100 shadow-[0_0_15px_rgba(52,211,153,0.4)]"
                                        : elem.state === "selected"
                                        ? "border-amber-400 bg-amber-950/90 text-amber-100 shadow-[0_0_15px_rgba(251,191,36,0.4)]"
                                        : elem.state === "success"
                                        ? "border-green-400 bg-green-950/90 text-green-100 shadow-[0_0_15px_rgba(74,222,128,0.4)]"
                                        : elem.state === "fail"
                                        ? "border-rose-500 bg-rose-950/90 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse"
                                        : "border-indigo-500/50 bg-indigo-950/60 text-indigo-100 hover:border-indigo-400"
                                    } ${getFilteredBlockStyles(elem.state)}`}
                                  >
                                    <span className="text-white font-extrabold text-base">{elem.label}</span>
                                  </div>
                                  
                                  <div className="h-6 mt-1 flex flex-col items-center">
                                    {elem.pointers && elem.pointers.length > 0 && (
                                      <div className="flex gap-1">
                                        {elem.pointers.map((p, pIdx) => (
                                          <span key={pIdx} className="bg-pink-500 text-white font-extrabold text-[8px] px-1 rounded shadow-sm font-mono uppercase">
                                            {p}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                                
                                {hasNext && (
                                  <div className="shrink-0 flex items-center justify-center pb-6">
                                    <ArrowRight className="w-5 h-5 text-indigo-400 animate-pulse" />
                                  </div>
                                )}
                              </React.Fragment>
                            );
                          })}
                          <div className="flex flex-col items-center shrink-0">
                            <span className="text-[9px] font-mono text-slate-500 mb-1">Pointer</span>
                            <div className="w-[72px] h-[72px] rounded-xl bg-slate-950/80 border border-dashed border-white/10 flex items-center justify-center text-xs text-slate-500 font-mono">
                              Null
                            </div>
                            <div className="h-6 mt-1"></div>
                          </div>
                        </AnimatePresence>
                      </div>
                    );
                  }
                  
                  // ARRAY & GENERAL (Row of blocks)
                  return (
                    <div className="flex flex-wrap items-center justify-center gap-2 py-6 overflow-x-auto w-full">
                      <AnimatePresence mode="popLayout">
                        {currentStep.elements.map((elem: VisualElement, idx: number) => {
                          return (
                            <motion.div
                              key={`${elem.id}-${idx}`}
                              layout
                              initial={{ opacity: 0, scale: 0.8, y: 10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.8, y: -10 }}
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                              className="flex flex-col items-center shrink-0"
                            >
                              <span style={{ fontSize: `${Math.max(9, blockScale * 11)}px` }} className="font-mono text-slate-500 mb-1 font-bold">
                                [{elem.index !== undefined ? elem.index : idx}]
                              </span>
                              
                              <div
                                style={{
                                  width: `${blockScale * 72}px`,
                                  height: `${blockScale * 72}px`,
                                }}
                                className={`rounded-xl flex flex-col items-center justify-center font-bold text-base border-2 transition-all duration-300 shadow-md select-none ${
                                  elem.state === "inactive"
                                    ? "border-white/5 bg-white/2 text-slate-500 opacity-30 scale-95"
                                    : elem.state === "active"
                                    ? "border-emerald-400 bg-emerald-950/90 text-emerald-100 shadow-[0_0_15px_rgba(52,211,153,0.4)] scale-105 z-10"
                                    : elem.state === "selected"
                                    ? "border-amber-400 bg-amber-950/90 text-amber-100 shadow-[0_0_15px_rgba(251,191,36,0.4)] scale-105 z-10"
                                    : elem.state === "success"
                                    ? "border-green-400 bg-green-950/90 text-green-100 shadow-[0_0_15px_rgba(74,222,128,0.4)]"
                                    : elem.state === "fail"
                                    ? "border-rose-500 bg-rose-950/90 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.4)] animate-pulse"
                                    : "border-indigo-500/50 bg-indigo-950/60 text-indigo-100 hover:border-indigo-400"
                                } ${getFilteredBlockStyles(elem.state)}`}
                              >
                                <span className="text-white font-extrabold text-lg">{elem.label}</span>
                              </div>
                              
                              <div className="h-8 mt-1.5 flex flex-col items-center relative">
                                {elem.pointers && elem.pointers.length > 0 && (
                                  <motion.div 
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center"
                                  >
                                    <div className="text-indigo-400/80 text-[10px] select-none leading-none mb-0.5">▲</div>
                                    <div className="flex gap-1">
                                      {elem.pointers.map((p, pIdx) => (
                                        <span key={pIdx} className="bg-indigo-500 text-white font-extrabold text-[8px] px-1 py-0.5 rounded shadow-sm font-mono uppercase">
                                          {p}
                                        </span>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  );
                })()}
              </div>

              {/* Narrative Step Log explanation at the bottom */}
              <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-start gap-3 relative z-10">
                <div className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-indigo-400 shadow-sm">
                  <Activity className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-semibold block">Execution Explanation</span>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                    {currentStep.explanation}
                  </p>
                </div>
              </div>

              {/* Integrated Media Player Controls inside the Video Container */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                {/* Left controls: Restart, Prev, Auto-Play, Next */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={resetAnimation}
                    disabled={currentStepIdx === 0}
                    className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-slate-200 rounded-xl disabled:opacity-30 disabled:pointer-events-none transition-all shadow-md cursor-pointer"
                    title="Restart from beginning"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStepIdx === 0}
                    className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-slate-200 rounded-xl disabled:opacity-30 disabled:pointer-events-none transition-all shadow-md cursor-pointer"
                    title="Previous frame"
                  >
                    <ChevronLeft className="w-4.5 h-4.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (!isPlaying) {
                        setVoiceEnabled(true);
                        setSoundEnabled(true);
                      }
                      setIsPlaying(!isPlaying);
                    }}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer ${
                      isPlaying 
                        ? "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/25" 
                        : "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:brightness-110 active:scale-95 shadow-indigo-500/25"
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-slate-950" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-white" />
                        Auto Play
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={currentStepIdx === algoData.steps.length - 1}
                    className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-slate-200 rounded-xl disabled:opacity-30 disabled:pointer-events-none transition-all shadow-md cursor-pointer"
                    title="Next frame"
                  >
                    <ChevronRight className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Right controls: Timeline Slider / Frame counter ("fram") */}
                <div className="flex-1 flex items-center gap-3 min-w-[200px]">
                  <span className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">Frame</span>
                  <input
                    type="range"
                    min="0"
                    max={algoData.steps.length - 1}
                    value={currentStepIdx}
                    onChange={(e) => {
                      setIsPlaying(false);
                      setCurrentStepIdx(Number(e.target.value));
                    }}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <span className="text-xs font-mono font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10 shrink-0">
                    {currentStepIdx + 1} / {algoData.steps.length}
                  </span>
                </div>
              </div>

            </div>

            {/* Secondary Structure Area (e.g. HashMap, Seen characters, Call Stack) */}
            {currentStep.secondaryState && (
              <div className="p-5 bg-slate-900/40 border border-white/5 rounded-3xl space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 font-display">
                      Auxiliary Storage
                    </span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-slate-400 font-mono">
                    {currentStep.secondaryState.label}
                  </span>
                </div>

                {/* Auxiliary structure list */}
                {currentStep.secondaryState.items.length === 0 ? (
                  <div className="py-4 text-center text-xs text-slate-500 italic">
                    Lookup container is empty.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {currentStep.secondaryState.items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl flex items-center gap-1.5 text-xs text-slate-300 shadow-sm"
                      >
                        <span className="font-mono text-indigo-400 font-bold">{item.key}</span>
                        {item.value !== undefined && (
                          <>
                            <span className="text-slate-500 font-mono">:</span>
                            <span className="font-mono text-fuchsia-300 font-semibold">{item.value}</span>
                          </>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Dashboard / Variables & Metrics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              <AnimatePresence mode="popLayout">
                {Object.entries(currentStep.variables).map(([name, val]) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-3 bg-slate-900/40 border border-white/5 hover:bg-slate-900/60 rounded-xl flex flex-col justify-between min-h-[75px] shadow-md transition-all border-l-2 border-l-indigo-500/50"
                  >
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">{name}</span>
                    <span className="text-lg font-bold font-display text-white bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent truncate">
                      {val !== "" ? String(val) : "None"}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>




          </div>

          {/* Right Side: Code IDE Panel */}
          <div className={`${
            recordingLayout === "phone" 
              ? "col-span-1" 
              : recordingLayout === "youtube"
              ? "lg:col-span-5"
              : "lg:col-span-4"
          } space-y-4`}>
            
            {/* IDE Mock Panel */}
            <div className={`glass-panel rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
              visualFilter === "crt" ? "crt-effect" : ""
            } ${
              visualFilter === "matrix" ? "border-emerald-500/30 bg-black/90 matrix-glow" : ""
            } ${
              visualFilter === "obsidian" ? "midnight-gradient border-rose-500/20" : ""
            } ${
              recordingLayout === "phone" 
                ? "min-h-[260px] h-[340px]" 
                : recordingLayout === "youtube"
                ? "h-[420px]" 
                : "h-[500px]"
            }`}>
              
              {/* IDE Tab Header */}
              <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 tracking-wider flex items-center gap-1 ml-2">
                    <Code className="w-3.5 h-3.5 text-indigo-400" />
                    algorithm_trace.py
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  Python3
                </div>
              </div>

              {/* Code Panel Body with Active Highlighting */}
              <div 
                style={{ fontSize: `${ideFontSize}px` }}
                className="p-4 flex-1 font-mono overflow-y-auto leading-relaxed text-slate-300 space-y-1"
              >
                {algoData.code.map((line, idx) => {
                  const isActive = idx === currentStep.codeLine;
                  return (
                    <motion.div
                      key={idx}
                      className={`relative flex items-start py-1 px-2 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? "bg-indigo-950/40 border-l-[3px] border-indigo-400 pl-1.5 shadow-[inset_1px_0_10px_rgba(99,102,241,0.05)] text-slate-100 font-medium" 
                          : "opacity-60 hover:opacity-90 pl-2.5"
                      }`}
                    >
                      {/* Line Number */}
                      <span className="w-6 text-slate-600 select-none text-[10px] text-right pr-2">
                        {idx + 1}
                      </span>
                      
                      {/* Line Text */}
                      <pre 
                        style={{ fontSize: `${ideFontSize}px` }}
                        className="whitespace-pre-wrap font-mono flex-1"
                      >
                        {line}
                      </pre>

                      {/* Code Execution Indicator Bullet */}
                      {isActive && (
                        <span className="absolute left-1 top-2.5 w-1 h-1 rounded-full bg-indigo-400 animate-ping" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* IDE Footer */}
              <div className="bg-white/5 px-4 py-3 border-t border-white/10 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                <span>UTF-8 • Line {currentStep.codeLine + 1}</span>
                <span className="text-indigo-400/80 animate-pulse">● RUNNING_EXEC</span>
              </div>

            </div>

            {/* Creator Walkthrough Studio commented out for production release */}
            {/*
            <div className="p-6 glass-panel rounded-3xl space-y-4 shadow-xl bg-slate-900/50">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 font-display">
                    Creator's Studio
                  </span>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  isPro 
                    ? "bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 animate-pulse" 
                    : "bg-white/5 border border-white/10 text-slate-500"
                }`}>
                  {isPro ? "STUDIO_PRO" : "STUDIO_FREE"}
                </span>
              </div>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400 font-medium">Block Scale</span>
                    <span className="font-mono text-indigo-300 font-semibold">{Math.round(blockScale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="1.3"
                    step="0.05"
                    value={blockScale}
                    onChange={(e) => setBlockScale(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-400 font-medium">Element Gap</span>
                    <span className="font-mono text-indigo-300 font-semibold">{blockGap}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="24"
                    step="2"
                    value={blockGap}
                    onChange={(e) => setBlockGap(Number(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`p-2.5 rounded-xl border text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      soundEnabled 
                        ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-300" 
                        : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    Synth Sound
                  </button>
                  <button
                    onClick={() => {
                      if (!isPro) {
                        setUpgradeModalFeature("presets");
                        setShowUpgradeModal(true);
                        return;
                      }
                      setVoiceEnabled(!voiceEnabled);
                      setNotification({ message: `TTS Voice Reader ${!voiceEnabled ? "Enabled" : "Disabled"} 🗣️`, type: "info" });
                    }}
                    className={`p-2.5 rounded-xl border text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      voiceEnabled 
                        ? "bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-300 animate-pulse" 
                        : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5 text-fuchsia-400" />
                    Narrator {!isPro && <Lock className="w-2.5 h-2.5 text-amber-500/60" />}
                  </button>
                </div>

                <div className="space-y-3 pt-2.5 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Presentation Layouts</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setRecordingLayout("standard")}
                      className={`py-2 rounded-xl border text-[10px] font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        recordingLayout === "standard"
                          ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-md"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10"
                      }`}
                    >
                      <Layout className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Standard</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setRecordingLayout("phone")}
                      className={`py-2 rounded-xl border text-[10px] font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        recordingLayout === "phone"
                          ? "bg-orange-500/20 border-orange-500 text-orange-300 shadow-md"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10"
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5 text-orange-400" />
                      <span>9:16 Phone</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setRecordingLayout("youtube")}
                      className={`py-2 rounded-xl border text-[10px] font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        recordingLayout === "youtube"
                          ? "bg-rose-500/20 border-rose-500 text-rose-300 shadow-md"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10"
                      }`}
                    >
                      <Youtube className="w-3.5 h-3.5 text-rose-400" />
                      <span>16:9 YouTube</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Aesthetic Video Filters
                    </span>
                    {visualFilter !== "none" && (
                      <button 
                        onClick={() => setVisualFilter("none")}
                        className="text-[9px] text-indigo-400 hover:text-indigo-300 font-semibold uppercase cursor-pointer"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setVisualFilter("crt");
                        setNotification({ message: "Vintage CRT scanline skin applied! 📺", type: "success" });
                      }}
                      className={`py-2 px-1 rounded-xl border text-[9px] font-bold transition-all flex items-center gap-1.5 justify-center cursor-pointer ${
                        visualFilter === "crt"
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10"
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)] animate-pulse" />
                      <span>Retro CRT</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setVisualFilter("matrix");
                        setNotification({ message: "Matrix digitizer rain applied! 🌌", type: "success" });
                      }}
                      className={`py-2 px-1 rounded-xl border text-[9px] font-bold transition-all flex items-center gap-1.5 justify-center cursor-pointer ${
                        visualFilter === "matrix"
                          ? "bg-green-500/20 border-green-500 text-green-300 shadow-[0_0_10px_rgba(34,197,94,0.2)]"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10"
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
                      <span>Matrix Rain</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setVisualFilter("obsidian");
                        setNotification({ message: "Midnight Obsidian crimson energy applied! 🌹", type: "success" });
                      }}
                      className={`py-2 px-1 rounded-xl border text-[9px] font-bold transition-all flex items-center gap-1.5 justify-center cursor-pointer ${
                        visualFilter === "obsidian"
                          ? "bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.2)]"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10"
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.8)]" />
                      <span>Obsidian Crimson</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setVisualFilter("neon");
                        setNotification({ message: "Neon Electric Indigo applied! ⚡", type: "success" });
                      }}
                      className={`py-2 px-1 rounded-xl border text-[9px] font-bold transition-all flex items-center gap-1.5 justify-center cursor-pointer ${
                        visualFilter === "neon"
                          ? "bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10"
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.8)] animate-pulse" />
                      <span>Neon Electric</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
                    Branding & Overlays
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[8px] font-mono text-slate-500 uppercase">Lesson Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Binary Search"
                        value={creatorTitle}
                        onChange={(e) => setCreatorTitle(e.target.value)}
                        className="w-full text-[10px] p-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-mono text-slate-500 uppercase">Creator Tag</label>
                      <input
                        type="text"
                        placeholder="e.g. CodeDave"
                        value={creatorWatermark}
                        onChange={(e) => setCreatorWatermark(e.target.value)}
                        className="w-full text-[10px] p-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5 pb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Recording Pace & Timing
                  </span>
                  
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setAutoPlayTimingMode("constant");
                        setNotification({ message: "Pacing changed to Snappy Constant! Steps transition at fixed intervals. ⏱️", type: "info" });
                      }}
                      className={`py-2 px-1 rounded-xl border text-[9px] font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        autoPlayTimingMode === "constant"
                          ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                          : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className="text-[9px] uppercase">⚡ Snappy Constant</span>
                      <span className="text-[8px] font-normal text-slate-400">Fixed ({constantDelayMs}ms)</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setAutoPlayTimingMode("dynamic");
                        setNotification({ message: "Dynamic pacing active! Step durations lock automatically to speech length. 🗣️", type: "info" });
                      }}
                      className={`py-2 px-1 rounded-xl border text-[9px] font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        autoPlayTimingMode === "dynamic"
                          ? "bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-300"
                          : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className="text-[9px] uppercase">🗣️ Voice-Adaptive</span>
                      <span className="text-[8px] font-normal text-slate-400">Dynamic Speak Lock</span>
                    </button>
                  </div>
                  
                  {autoPlayTimingMode === "constant" && (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[8px] font-mono text-slate-400">
                        <span>Speed slider</span>
                        <span>{constantDelayMs}ms</span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="4000"
                        step="250"
                        value={constantDelayMs}
                        onChange={(e) => setConstantDelayMs(Number(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-lg cursor-pointer accent-amber-500"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-1.5">
                  {isCapturing ? (
                    <button
                      onClick={stopHDRecording}
                      className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 animate-pulse cursor-pointer"
                    >
                      <Disc className="w-4 h-4 text-white animate-spin" />
                      STOP SCREEN CAPTURE & SAVE
                    </button>
                  ) : (
                    <button
                      onClick={startHDRecording}
                      className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                        isPro 
                          ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:brightness-110 text-white shadow-indigo-500/15" 
                          : "bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Video className="w-4 h-4 text-indigo-400" />
                      {isPro ? "START HD WALKTHROUGH RECORDER" : "START RECORDER (Locked)"}
                      {!isPro && <Lock className="w-3 h-3 text-amber-500" />}
                    </button>
                  )}
                  <p className="text-[10px] text-slate-500 text-center mt-1.5">
                    {isPro ? "Record lossless, high-fidelity 60fps tutorials direct from browser" : "Pro subscription required for watermark-free export"}
                  </p>
                </div>

              </div>
            </div>
            */}

            {/* Walkthrough Saved History */}
            <div className="p-6 bg-slate-900/60 border border-white/10 rounded-3xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 font-display">
                    Saved Walkthroughs
                  </span>
                </div>
                <span className="text-[10px] font-mono font-semibold text-slate-400">
                  {savedHistory.length} Saved
                </span>
              </div>

              <div className="space-y-3">
                {/* Save Current Walkthrough button */}
                <button
                  onClick={saveCurrentWalkthrough}
                  className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-indigo-500/10 hover:border-indigo-500/20 text-slate-300 hover:text-indigo-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4 text-indigo-400" />
                  Save Current Trace to History
                  {!isPro && <Lock className="w-3 h-3 text-amber-500/85" />}
                </button>

                {/* Saved list */}
                {savedHistory.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-500 space-y-1.5">
                    <History className="w-8 h-8 text-slate-600 mx-auto opacity-40 animate-pulse" />
                    <p>No saved walkthroughs yet.</p>
                    <p className="text-[10px] max-w-[200px] mx-auto leading-relaxed">
                      Pro members can save custom Gemini-generated algorithm traces to recall instantly in one click!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {savedHistory.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => loadHistoryItem(item)}
                        className={`p-2.5 rounded-xl border transition-all text-left flex items-center justify-between gap-3 cursor-pointer group ${
                          currentTopicKey === item.id 
                            ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-200" 
                            : "bg-white/2 border-white/5 hover:bg-white/5 text-slate-300"
                        }`}
                      >
                        <div className="space-y-0.5 min-w-0 flex-1">
                          <p className="text-xs font-bold font-display truncate text-white group-hover:text-indigo-300 transition-colors">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-mono">
                            <span>{item.timestamp}</span>
                            <span>•</span>
                            <span>{item.algoData.steps.length} Frames</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => deleteHistoryItem(item.id, e)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 border border-white/5 transition-all opacity-0 group-hover:opacity-100"
                          title="Delete saved walkthrough"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Tips Box */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex gap-3 text-slate-400">
              <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-300">Quick Walkthrough Guide</span>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  Click <span className="text-indigo-300">"Auto Play"</span> to let the visualizer animate naturally at your configured speed, or use the <span className="text-indigo-300">Timeline slider</span> and step arrows to manually dissect individual instructions. Use the AI prompt to construct animations for custom algorithms on the fly.
                </p>
              </div>
            </div>

          </div>

        </div>
          </>
        )}
      </main>

      {/* Aesthetic Footer */}
      <footer className="border-t border-white/10 mt-16 py-8 bg-black/40 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="text-xs text-slate-500">
            Designed for interactive learning and conceptual algorithms logic tracing.
          </p>
          <div className="text-[10px] text-slate-600 font-mono">
            &copy; {new Date().getFullYear()} CodeWithBigO. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Add Custom Topic Modal */}
      <AnimatePresence>
        {showAddTopicModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddTopicModal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            
            {/* Modal content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden space-y-6 z-10"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-fuchsia-400" />
                    Add Custom DSA Topic
                  </h3>
                  <p className="text-xs text-slate-400">
                    Add a custom topic to expand your visual logic dry-run syllabus.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddTopicModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-semibold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddTopicSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Topic Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kruskal's MST, AVL Trees, Suffix Automaton"
                    value={newTopicTitle}
                    onChange={(e) => setNewTopicTitle(e.target.value)}
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-fuchsia-500 transition-all font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Category</label>
                    <select
                      value={newTopicCategory}
                      onChange={(e) => setNewTopicCategory(e.target.value)}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-fuchsia-500 transition-all font-semibold"
                    >
                      <option value="Arrays & Strings">Arrays & Strings</option>
                      <option value="Linked Lists">Linked Lists</option>
                      <option value="Stacks & Queues">Stacks & Queues</option>
                      <option value="Trees">Trees</option>
                      <option value="Graphs">Graphs</option>
                      <option value="Searching & Sorting">Searching & Sorting</option>
                      <option value="Dynamic Programming">Dynamic Programming</option>
                      <option value="Greedy">Greedy</option>
                      <option value="Recursion & Backtracking">Recursion & Backtracking</option>
                      <option value="Bit Manipulation">Bit Manipulation</option>
                      <option value="Math & Logic">Math & Logic</option>
                      <option value="Advanced Topics">Advanced Topics</option>
                      <option value="Hashmaps & Hashing">Hashmaps & Hashing</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Difficulty</label>
                    <select
                      value={newTopicDifficulty}
                      onChange={(e) => setNewTopicDifficulty(e.target.value as any)}
                      className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-fuchsia-500 transition-all font-semibold"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">Description</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="e.g. Find the minimum spanning tree of an undirected, connected, and weighted graph using disjoint set union..."
                    value={newTopicDesc}
                    onChange={(e) => setNewTopicDesc(e.target.value)}
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-fuchsia-500 transition-all font-semibold leading-relaxed"
                  />
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowAddTopicModal(false)}
                    className="px-4 py-2 text-xs font-bold rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-pink-500 hover:from-fuchsia-500 hover:to-pink-400 active:scale-95 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-lg shadow-fuchsia-500/10"
                  >
                    Add Topic
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upgrade Modal Dialog */}
      <AnimatePresence>
        {showUpgradeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUpgradeModal(false)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
            />
            
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/20 shadow-2xl bg-slate-950/95 z-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-12 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 text-indigo-400 animate-bounce" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-indigo-400 font-mono font-bold bg-indigo-500/10 px-2.5 py-0.5 rounded border border-indigo-500/20 uppercase tracking-widest">
                    PRO UPGRADE REQUIRED
                  </span>
                  <h3 className="text-xl font-bold font-display text-white">
                    {upgradeModalFeature === "presets" && "Unlock Premium Walkthroughs"}
                    {upgradeModalFeature === "ai" && "AI custom generation limit reached"}
                    {upgradeModalFeature === "steplimit" && "Step limit reached (Free Plan)"}
                    {upgradeModalFeature === "recorder" && "Unlock Pristine HD Recorder"}
                    {upgradeModalFeature === "history" && "Unlock Custom Walkthrough History"}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {upgradeModalFeature === "presets" && "Advanced interactive presets like Linked Lists, Fibonacci Dynamic Programming, and Sliding Windows require Pro membership. Upgrade to view all advanced algorithms step-by-step!"}
                {upgradeModalFeature === "ai" && "Free accounts are limited to 2 custom AI visualizers. Upgrade to Pro for unlimited custom algorithm synthesis — just describe any logic and let Gemini build the simulator!"}
                {upgradeModalFeature === "steplimit" && "Standard dry-runs are limited to 12 execution steps. Upgrade to Pro to trace complex, multi-frame code paths and nested logic loops with zero limits!"}
                {upgradeModalFeature === "recorder" && "Capture direct, high-fidelity, 60fps walkthrough downloads watermark-free. Includes 9:16 aspect ratio vertical optimizations perfect for mobile tutorials, Shorts, Reels, and slides!"}
                {upgradeModalFeature === "history" && "Save your custom AI-generated algorithms to your personal dashboard so you can load them back instantly in one click. Pro users get unlimited saved execution trace states!"}
              </p>

              {/* Core Perks List */}
              <div className="p-4 bg-slate-950/50 rounded-2xl border border-white/5 space-y-3 mb-6">
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>All advanced algorithm presets (Graphs, DP, Trees)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Unlimited AI generations (Explain any custom code)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Unlimited steps & complex execution trace loops</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Pristine watermark-free 60fps HD recorder downloads</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    setShowUpgradeModal(false);
                    setViewMode("pricing");
                  }}
                  className="w-full sm:flex-1 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-400 hover:to-fuchsia-400 text-white font-bold text-sm shadow-xl shadow-indigo-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  Upgrade to Pro ⚡
                </button>
                {/*
                <button
                  onClick={() => {
                    setSimulatedPlan("pro");
                    setShowUpgradeModal(false);
                    setNotification({ message: "🛠️ Developer Sandbox: Simulated Pro Tier Activated! Enjoy unlimited access.", type: "success" });
                  }}
                  className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white font-semibold text-xs active:scale-98 transition-all cursor-pointer text-center"
                >
                  Simulate Pro 🛠️
                </button>
                */}
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="w-full sm:w-auto px-4 py-3.5 text-slate-400 hover:text-slate-200 text-xs font-medium text-center cursor-pointer"
                >
                  Maybe Later
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Slide-in Notifications Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl border bg-slate-900/90 shadow-2xl backdrop-blur-md flex items-center gap-3 max-w-sm"
            style={{
              borderColor: notification.type === "success" ? "rgba(16,185,129,0.3)" : notification.type === "error" ? "rgba(239,68,68,0.3)" : "rgba(99,102,241,0.3)"
            }}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              notification.type === "success" ? "bg-emerald-500/10 text-emerald-400" : notification.type === "error" ? "bg-rose-500/10 text-rose-400" : "bg-indigo-500/10 text-indigo-400"
            }`}>
              {notification.type === "success" && <Check className="w-5 h-5" />}
              {notification.type === "error" && <AlertCircle className="w-5 h-5" />}
              {notification.type === "info" && <Sparkles className="w-5 h-5" />}
            </div>
            <p className="text-xs font-medium text-slate-200 leading-relaxed">
              {notification.message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      </SignedIn>

    </div>
  );
}

// Sub-component for billing tiers and comparison
function PricingSection({ isPro, simulatedPlan, setSimulatedPlan, ClerkPricingTable }: { 
  isPro: boolean; 
  simulatedPlan: string; 
  setSimulatedPlan: (plan: "free" | "pro" | "none") => void;
  ClerkPricingTable: any;
}) {
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-8 px-4 animate-in fade-in duration-300">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide">
          <Zap className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          Flexible Premium Plans
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
          Choose Your Speed & Limit
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Upgrade to unlock advanced data structures, unlimited custom AI dry-runs, HD export, and continuous walk-through sequences.
        </p>
      </div>

      {/* Clerk Official Pricing Table Widget */}
      <div className="p-6 rounded-3xl border border-slate-800 shadow-2xl overflow-visible bg-slate-950/95">
        <div className="absolute top-0 right-0 w-32 h-12 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">Clerk Official Billing Integration</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
            SECURE CHECKOUT
          </span>
        </div>
        
        {/* Render Clerk's official PricingTable widget with full layout support */}
        <div className="min-h-[200px] w-full rounded-2xl overflow-visible bg-black/25 border border-white/5">
          {ClerkPricingTable ? (
            <div className="w-full p-4 text-slate-200 overflow-visible">
              <p className="text-sm font-semibold text-white"> Pricing is being refreshed — please check back shortly for the latest plan options. </p>
              <ClerkPricingTable />
            </div>
          ) : (
            <div className="text-center p-8 space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto animate-pulse" />
              <p className="text-sm font-semibold text-slate-300">Clerk Subscription Portal Active</p>
              <p className="text-xs text-slate-500 max-w-md">
                Clerk's subscription billing is synced live with your Stripe accounts. Subscribe using the secure customer checkout portal below or toggle the simulator in the developer bar.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detailed comparison of features */}
      <div className="glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-slate-900/20">
        <div className="p-6 border-b border-white/10 bg-white/5">
          <h3 className="text-base font-bold text-white">Compare Plans & Visual Gating</h3>
          <p className="text-xs text-slate-400">Review exactly what you get at each subscription tier.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5 text-slate-400 font-mono text-[10px] uppercase bg-white/5">
                <th className="p-4 font-semibold">Core Features</th>
                <th className="p-4 font-semibold text-slate-300">Free Tier (Standard)</th>
                <th className="p-4 font-semibold text-indigo-300">Pro Tier ($9.99/mo)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300 bg-black/10">
              <tr>
                <td className="p-4 font-semibold text-white">Basic Trace Engine</td>
                <td className="p-4 flex items-center gap-1.5 text-slate-400"><Check className="w-4 h-4 text-emerald-500" /> Unlimited (Built-in presets only)</td>
                <td className="p-4 text-indigo-300 font-semibold"><Check className="w-4 h-4 text-indigo-400" /> Unlimited (All presets)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Interactive Presets</td>
                <td className="p-4 text-slate-400">3 Presets (Binary Search, Bubble Sort, Two Pointers)</td>
                <td className="p-4 text-indigo-300 font-semibold"><Check className="w-4 h-4 text-indigo-400" /> All Presets (Graphs, DP, Trees...)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">AI Custom Generation</td>
                <td className="p-4 text-slate-400">Locked (or limited to 2 total generations)</td>
                <td className="p-4 text-indigo-300 font-semibold"><Check className="w-4 h-4 text-indigo-400" /> Unlimited Custom Dry-Runs (Describe any logic)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Step Limits</td>
                <td className="p-4 text-slate-400">Max 12 execution steps</td>
                <td className="p-4 text-indigo-300 font-semibold"><Check className="w-4 h-4 text-indigo-400" /> Unlimited complex Dry-Runs</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Visual Export / Recorder</td>
                <td className="p-4 text-slate-400">Standard capture (with watermarks)</td>
                <td className="p-4 text-indigo-300 font-semibold"><Check className="w-4 h-4 text-indigo-400" /> Pristine HD Recording (Watermark-free, 9:16 vertical stack)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Execution History</td>
                <td className="p-4 text-slate-400">Locked</td>
                <td className="p-4 text-indigo-300 font-semibold"><Check className="w-4 h-4 text-indigo-400" /> Save/load previous custom dry-runs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Developer Sandbox Simulator Control Panel commented out for production release
      <div className="p-6 bg-indigo-950/20 border border-indigo-500/20 rounded-3xl space-y-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-indigo-400 animate-pulse" />
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-white">🛠️ Developer Billing Sandbox</h4>
            <p className="text-xs text-slate-400">Instantly test visual feature-gating across the entire app before connecting to a live Stripe key.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => { setSimulatedPlan("free"); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              simulatedPlan === "free"
                ? "bg-slate-800 text-white border-slate-700 shadow-lg"
                : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
            }`}
          >
            Simulate FREE Tier 🍃
          </button>
          <button
            onClick={() => { setSimulatedPlan("pro"); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              simulatedPlan === "pro"
                ? "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white border-indigo-500/30 shadow-lg shadow-indigo-500/20 animate-pulse"
                : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
            }`}
          >
            Simulate PRO Tier ⚡
          </button>
          <button
            onClick={() => { setSimulatedPlan("none"); }}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              simulatedPlan === "none"
                ? "bg-indigo-600/30 text-indigo-200 border-indigo-500/30"
                : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
            }`}
          >
            Reset (Live Clerk Sync Only)
          </button>
        </div>
        <p className="text-[11px] text-slate-500">
          Active Status: {isPro ? <span className="text-indigo-400 font-bold">PRO ACTIVE ⚡</span> : <span className="text-slate-400 font-bold">FREE TIER 🍃</span>}
          {simulatedPlan !== "none" && <span className="text-amber-500 ml-1 italic">(Simulating {simulatedPlan.toUpperCase()})</span>}
        </p>
      </div>
      */}

    </div>
  );
}
