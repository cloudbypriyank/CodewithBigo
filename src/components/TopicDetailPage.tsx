import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  Cpu, 
  Check, 
  AlertCircle,
  Zap,
  Bookmark,
  BookOpen,
  Award,
  Search,
  Copy,
  Info,
  Layers,
  Sliders,
  Database,
  ArrowRight,
  Plus,
  Trash2,
  Video,
  Activity,
  Link,
  GitBranch,
  Network,
  ArrowDownUp,
  Binary,
  Hash,
  Flame
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { topicConfigs, TopicDetailConfig } from "../data/topicData";

// Icon mapping helper
const iconMap: { [key: string]: any } = {
  Code: Cpu,
  Link: Link,
  Layers: Layers,
  Sliders: Sliders,
  GitBranch: GitBranch,
  Network: Network,
  ArrowDownUp: ArrowDownUp,
  Search: Search,
  Cpu: Cpu,
  Flame: Flame,
  RotateCcw: RotateCcw,
  Binary: Binary,
  Hash: Hash,
  BookOpen: BookOpen
};

interface TopicDetailPageProps {
  topicKey: string;
  onBack: () => void;
  isPro: boolean;
  onUpgrade: () => void;
  onSelectTopic: (key: string) => void;
}

export default function TopicDetailPage({ topicKey, onBack, isPro, onUpgrade, onSelectTopic }: TopicDetailPageProps) {
  // Grab topic configuration, fallback to arrays
  const config: TopicDetailConfig = topicConfigs[topicKey] || topicConfigs["arrays"];

  const [isSaved, setIsSaved] = useState(false);
  const [lessons, setLessons] = useState(config.lessons);

  // Sync state if topicKey changes
  useEffect(() => {
    setLessons(config.lessons);
    setIsSaved(false);
    resetAnimation();
    setVisualizerLog("Select an operation and click Animate!");
  }, [topicKey]);

  // Calculate metrics
  const totalLessons = 
    lessons.fundamentals.length + 
    lessons.operations.length + 
    lessons.searching.length + 
    lessons.advanced.length;

  const completedCount = 
    lessons.fundamentals.filter(l => l.completed).length +
    lessons.operations.filter(l => l.completed).length +
    lessons.searching.filter(l => l.completed).length +
    lessons.advanced.filter(l => l.completed).length;

  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const toggleLesson = (category: "fundamentals" | "operations" | "searching" | "advanced", id: string) => {
    setLessons(prev => ({
      ...prev,
      [category]: prev[category].map(l => l.id === id ? { ...l, completed: !l.completed } : l)
    }));
  };

  // --- Dynamic Visualizer State ---
  const [inputValue, setInputValue] = useState(config.visualizerPreset);
  const [visualizerLog, setVisualizerLog] = useState("Select an operation and click Animate!");
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Custom inputs for operations
  const [insertVal, setInsertVal] = useState("15");
  const [insertIdx, setInsertIdx] = useState("2");
  const [deleteVal, setDeleteVal] = useState("20");
  const [searchTarget, setSearchTarget] = useState("30");

  // Code Snippet state
  const [activeLang, setActiveLang] = useState<"python" | "java" | "cpp" | "javascript">("python");
  const [copied, setCopied] = useState(false);

  // Practice problem modal state
  const [selectedProblem, setSelectedProblem] = useState<any | null>(null);

  // Clean animation
  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
    setSteps([]);
  };

  // Manage animation play loop
  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playbackSpeed);
    } else {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying, steps, playbackSpeed]);

  // Generate steps tailored for each topic
  const generateAnimation = (operation: string) => {
    resetAnimation();
    const newSteps: any[] = [];

    if (config.key === "arrays") {
      const arr = inputValue.split(",").map(v => parseInt(v.trim())).filter(v => !isNaN(v));
      if (operation === "insert") {
        const val = parseInt(insertVal) || 15;
        const idx = Math.min(Math.max(parseInt(insertIdx) || 0, 0), arr.length);
        
        newSteps.push({ desc: `Initial array: [${arr.join(", ")}]`, arr: [...arr], temp: null, highlights: [] });
        newSteps.push({ desc: `Create new buffer of size ${arr.length + 1}`, arr: [...arr], temp: new Array(arr.length + 1).fill(null), highlights: [] });
        
        const copiedTemp = [...arr];
        copiedTemp.splice(idx, 0, val);
        newSteps.push({ desc: `Copy elements up to index ${idx}, insert value ${val}, shift remainder.`, arr: [...arr], temp: [...copiedTemp], highlights: [idx] });
        newSteps.push({ desc: `Finished! Value ${val} placed at index ${idx}.`, arr: [...copiedTemp], temp: null, highlights: [idx] });
        
        setSteps(newSteps);
        setIsPlaying(true);
        setVisualizerLog(`Animating insertion of ${val} at index ${idx}`);
      } else if (operation === "delete") {
        const idx = Math.min(Math.max(parseInt(insertIdx) || 0, 0), arr.length - 1);
        newSteps.push({ desc: `Initial array: [${arr.join(", ")}]`, arr: [...arr], highlights: [idx] });
        
        const copiedTemp = [...arr];
        const removed = copiedTemp.splice(idx, 1);
        newSteps.push({ desc: `Remove item at index ${idx} (value ${removed[0]}) and shift remainder left.`, arr: [...copiedTemp], highlights: [] });
        
        setSteps(newSteps);
        setIsPlaying(true);
        setVisualizerLog(`Animating deletion at index ${idx}`);
      } else {
        const val = parseInt(searchTarget) || 8;
        newSteps.push({ desc: `Sequential Scan: looking for target ${val}`, arr: [...arr], highlights: [] });
        let found = false;
        for (let i = 0; i < arr.length; i++) {
          newSteps.push({ desc: `Check index ${i}: Is ${arr[i]} === ${val}?`, arr: [...arr], highlights: [i] });
          if (arr[i] === val) {
            newSteps.push({ desc: `Match! Found target ${val} at index ${i}`, arr: [...arr], highlights: [i], status: "success" });
            found = true;
            break;
          }
        }
        if (!found) {
          newSteps.push({ desc: `Target ${val} not found in array. Return -1`, arr: [...arr], highlights: [], status: "fail" });
        }
        setSteps(newSteps);
        setIsPlaying(true);
      }
    } 
    
    else if (config.key === "linked_list") {
      const list = inputValue.split("->").map(v => parseInt(v.trim())).filter(v => !isNaN(v));
      const val = parseInt(insertVal) || 5;

      if (operation === "prepend") {
        newSteps.push({ desc: "Initial list", list: [...list], highlights: [] });
        newSteps.push({ desc: `Create new node containing ${val}`, list: [...list], newNode: val, highlights: [] });
        newSteps.push({ desc: `Point new node's next field to current Head (${list[0] || "Null"})`, list: [...list], newNode: val, linkNewNode: true, highlights: [] });
        newSteps.push({ desc: `Successfully prepended. Update Head pointer.`, list: [val, ...list], highlights: [0] });
      } else if (operation === "append") {
        newSteps.push({ desc: "Initial list", list: [...list], highlights: [] });
        newSteps.push({ desc: `Traverse list nodes to locate the Tail element...`, list: [...list], highlights: [list.length - 1] });
        newSteps.push({ desc: `Create new node containing ${val}`, list: [...list], newNode: val, highlights: [list.length - 1] });
        newSteps.push({ desc: `Point current Tail node's next link to new node.`, list: [...list, val], highlights: [list.length] });
      } else { // Delete
        const target = parseInt(deleteVal) || list[1] || 20;
        newSteps.push({ desc: `Traversing list to locate and remove node with value ${target}`, list: [...list], highlights: [] });
        let idx = list.indexOf(target);
        if (idx !== -1) {
          newSteps.push({ desc: `Found node ${target} at index ${idx}. Point prev node next to target's next node.`, list: [...list], highlights: [idx] });
          const updated = [...list];
          updated.splice(idx, 1);
          newSteps.push({ desc: `Node ${target} unlinked and garbage collected.`, list: updated, highlights: [] });
        } else {
          newSteps.push({ desc: `Node ${target} not found in the list.`, list: [...list], highlights: [], status: "fail" });
        }
      }
      setSteps(newSteps);
      setIsPlaying(true);
    } 

    else if (config.key === "stacks") {
      const stack = inputValue.split(",").map(v => parseInt(v.trim())).filter(v => !isNaN(v));
      const val = parseInt(insertVal) || 99;

      if (operation === "push") {
        newSteps.push({ desc: "Initial stack state", stack: [...stack], highlights: [] });
        newSteps.push({ desc: `Incoming element ${val} aligned to the top.`, stack: [...stack], incoming: val, highlights: [] });
        newSteps.push({ desc: `Pushed! Node ${val} occupies the new Top index.`, stack: [...stack, val], highlights: [stack.length] });
      } else { // pop
        if (stack.length === 0) {
          newSteps.push({ desc: "Stack Underflow! No items to pop.", stack: [], status: "fail" });
        } else {
          newSteps.push({ desc: `Locate top element: ${stack[stack.length - 1]}`, stack: [...stack], highlights: [stack.length - 1] });
          const popped = [...stack];
          const removed = popped.pop();
          newSteps.push({ desc: `Popped value ${removed} off the stack!`, stack: popped, highlights: [] });
        }
      }
      setSteps(newSteps);
      setIsPlaying(true);
    } 

    else if (config.key === "queues") {
      const q = inputValue.split(",").map(v => parseInt(v.trim())).filter(v => !isNaN(v));
      const val = parseInt(insertVal) || 42;

      if (operation === "enqueue") {
        newSteps.push({ desc: "Initial FIFO Queue state", queue: [...q], highlights: [] });
        newSteps.push({ desc: `Enqueue: Value ${val} enters from Rear position.`, queue: [...q, val], highlights: [q.length] });
      } else { // dequeue
        if (q.length === 0) {
          newSteps.push({ desc: "Queue Underflow! Nothing to dequeue.", queue: [], status: "fail" });
        } else {
          newSteps.push({ desc: `Locate Front element: ${q[0]}`, queue: [...q], highlights: [0] });
          const dequeued = [...q];
          const removed = dequeued.shift();
          newSteps.push({ desc: `Dequeued value ${removed} from the front of queue.`, queue: dequeued, highlights: [] });
        }
      }
      setSteps(newSteps);
      setIsPlaying(true);
    } 

    else if (config.key === "trees") {
      // Preorder traversal trace (Root, Left, Right)
      const nodes = [50, 30, 20, 40, 70, 60, 80];
      const inorderNodes = [20, 30, 40, 50, 60, 70, 80];
      const postorderNodes = [20, 40, 30, 60, 80, 70, 50];

      let order = nodes;
      let label = "Preorder";
      if (operation === "inorder") {
        order = inorderNodes;
        label = "Inorder";
      } else if (operation === "postorder") {
        order = postorderNodes;
        label = "Postorder";
      }

      newSteps.push({ desc: `Start ${label} traversal (DFS style recursively).`, visited: [] });
      const currentVisited: number[] = [];
      for (let i = 0; i < order.length; i++) {
        currentVisited.push(order[i]);
        newSteps.push({ 
          desc: `Visit node ${order[i]}. Added to output list.`, 
          visited: [...currentVisited], 
          currentNode: order[i] 
        });
      }
      setSteps(newSteps);
      setIsPlaying(true);
    }

    else if (config.key === "graphs") {
      // Nodes: A, B, C, D
      // BFS or DFS trace
      const order = operation === "bfs" ? ["A", "B", "C", "D"] : ["A", "B", "D", "C"];
      newSteps.push({ desc: `Start ${operation.toUpperCase()} traversal from Source vertex 'A'`, visited: [] });
      const currentVisited: string[] = [];
      for (let i = 0; i < order.length; i++) {
        currentVisited.push(order[i]);
        newSteps.push({ 
          desc: `Retrieve next node from queue/stack: '${order[i]}'. Traverse adjacent edges.`, 
          visited: [...currentVisited], 
          currentNode: order[i] 
        });
      }
      setSteps(newSteps);
      setIsPlaying(true);
    }

    else if (config.key === "sorting") {
      const arr = [15, 3, 22, 10, 5];
      newSteps.push({ desc: "Initial unsorted array bars", arr: [...arr], activeIdxs: [] });
      // Simulate bubble sort step-by-step
      newSteps.push({ desc: "Compare index 0 and 1: 15 > 3. Swap needed.", arr: [15, 3, 22, 10, 5], activeIdxs: [0, 1] });
      newSteps.push({ desc: "Swapped! Array updated.", arr: [3, 15, 22, 10, 5], activeIdxs: [0, 1] });
      newSteps.push({ desc: "Compare index 1 and 2: 15 < 22. No swap.", arr: [3, 15, 22, 10, 5], activeIdxs: [1, 2] });
      newSteps.push({ desc: "Compare index 2 and 3: 22 > 10. Swap needed.", arr: [3, 15, 22, 10, 5], activeIdxs: [2, 3] });
      newSteps.push({ desc: "Swapped!", arr: [3, 15, 10, 22, 5], activeIdxs: [2, 3] });
      newSteps.push({ desc: "Remaining iterations continue until fully sorted...", arr: [3, 5, 10, 15, 22], activeIdxs: [], sorted: true });
      
      setSteps(newSteps);
      setIsPlaying(true);
    }

    else if (config.key === "searching") {
      const arr = [2, 4, 8, 16, 32, 64];
      const target = parseInt(searchTarget) || 16;
      newSteps.push({ desc: `Searching sorted array for target ${target}`, arr, low: 0, high: arr.length - 1, mid: -1 });
      
      let low = 0;
      let high = arr.length - 1;
      let found = false;

      while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        newSteps.push({ desc: `Check mid index ${mid} (value ${arr[mid]}). Target is ${target}.`, arr, low, high, mid });
        if (arr[mid] === target) {
          newSteps.push({ desc: `Match! Target ${target} located at index ${mid}`, arr, low, high, mid, success: true });
          found = true;
          break;
        } else if (arr[mid] < target) {
          low = mid + 1;
          newSteps.push({ desc: `${arr[mid]} < target ${target}. Prune left half. Set low = ${low}`, arr, low, high, mid });
        } else {
          high = mid - 1;
          newSteps.push({ desc: `${arr[mid]} > target ${target}. Prune right half. Set high = ${high}`, arr, low, high, mid });
        }
      }

      if (!found) {
        newSteps.push({ desc: `low > high. Target ${target} not present. Return -1`, arr, low, high, mid: -1, fail: true });
      }

      setSteps(newSteps);
      setIsPlaying(true);
    }

    else if (config.key === "dp") {
      newSteps.push({ desc: "DP Tabulation: computing Fibonacci states sequentially.", table: [1, 1, 0, 0, 0, 0] });
      newSteps.push({ desc: "Cell [2] = Cell [1] + Cell [0] = 1 + 1 = 2", table: [1, 1, 2, 0, 0, 0], activeIdx: 2 });
      newSteps.push({ desc: "Cell [3] = Cell [2] + Cell [1] = 2 + 1 = 3", table: [1, 1, 2, 3, 0, 0], activeIdx: 3 });
      newSteps.push({ desc: "Cell [4] = Cell [3] + Cell [2] = 3 + 2 = 5", table: [1, 1, 2, 3, 5, 0], activeIdx: 4 });
      newSteps.push({ desc: "Cell [5] = Cell [4] + Cell [3] = 5 + 3 = 8", table: [1, 1, 2, 3, 5, 8], activeIdx: 5 });
      setSteps(newSteps);
      setIsPlaying(true);
    }

    else if (config.key === "greedy") {
      const target = 36;
      newSteps.push({ desc: `Target total: ${target}. Sorting denominations descending: [25, 10, 5, 1]`, remaining: target, coinsPicked: [] });
      newSteps.push({ desc: "Step 1: 36 >= 25. Pick one coin 25.", remaining: 11, coinsPicked: [25] });
      newSteps.push({ desc: "Step 2: 11 < 25 but >= 10. Pick one coin 10.", remaining: 1, coinsPicked: [25, 10] });
      newSteps.push({ desc: "Step 3: 1 < 10, 1 < 5. Pick one coin 1.", remaining: 0, coinsPicked: [25, 10, 1] });
      newSteps.push({ desc: "Finished! Total amount met using 3 optimal coins.", remaining: 0, coinsPicked: [25, 10, 1], done: true });
      setSteps(newSteps);
      setIsPlaying(true);
    }

    else if (config.key === "recursion") {
      newSteps.push({ desc: "Trigger factorial(3) on call stack", frames: ["fact(3)"] });
      newSteps.push({ desc: "fact(3) self-invokes fact(2)", frames: ["fact(3)", "fact(2)"] });
      newSteps.push({ desc: "fact(2) self-invokes fact(1) [Base Case]", frames: ["fact(3)", "fact(2)", "fact(1) [Base Case]"] });
      newSteps.push({ desc: "fact(1) resolves to 1. Unwinding stack.", frames: ["fact(3)", "fact(2) -> returns 2 * 1 = 2"] });
      newSteps.push({ desc: "fact(3) returns 3 * 2 = 6.", frames: ["fact(3) -> returns 6"] });
      newSteps.push({ desc: "Stack cleared. Final resolved return value: 6", frames: [] });
      setSteps(newSteps);
      setIsPlaying(true);
    }

    else if (config.key === "bit_manipulation") {
      // AND mask trace
      newSteps.push({ desc: "AND mask trace. Initial 8-bit register: 00001101 (13)", register: "00001101" });
      newSteps.push({ desc: "Apply AND mask overlay:   00001000 (8)", register: "00001101", mask: "00001000" });
      newSteps.push({ desc: "Resolved bit result:      00001000 (8)", register: "00001000", resolved: true });
      setSteps(newSteps);
      setIsPlaying(true);
    }

    else if (config.key === "math") {
      newSteps.push({ desc: "Find GCD of 18 and 12 using Euclidean Modulo", a: 18, b: 12 });
      newSteps.push({ desc: "GCD(18, 12) => GCD(12, 18 % 12) = GCD(12, 6)", a: 12, b: 6 });
      newSteps.push({ desc: "GCD(12, 6) => GCD(6, 12 % 6) = GCD(6, 0)", a: 6, b: 0 });
      newSteps.push({ desc: "Remainder is 0. Great common divisor is 6.", a: 6, b: 0, done: true });
      setSteps(newSteps);
      setIsPlaying(true);
    }

    else if (config.key === "string") {
      newSteps.push({ desc: "Pattern Matching: searching pattern 'ABC' inside text 'ABABC'", text: "ABABC", pattern: "ABC", index: 0 });
      newSteps.push({ desc: "Check text[0]: 'A' === 'A', 'B' === 'B', text[2] 'A' !== 'C'. Shift.", text: "ABABC", pattern: "ABC", index: 0, activeChars: [0, 1, 2] });
      newSteps.push({ desc: "Check text[1]: text[1] 'B' !== pattern[0] 'A'. Shift.", text: "ABABC", pattern: "ABC", index: 1, activeChars: [1] });
      newSteps.push({ desc: "Check text[2]: text[2] 'A' === 'A', text[3] 'B' === 'B', text[4] 'C' === 'C'. Match!", text: "ABABC", pattern: "ABC", index: 2, activeChars: [2, 3, 4], matchFound: true });
      setSteps(newSteps);
      setIsPlaying(true);
    }
  };

  const copyCodeToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get active step information
  const activeStep = steps.length > 0 ? steps[currentStepIdx] : null;

  // Render current Topic icon dynamically
  const TargetIconComponent = iconMap[config.icon] || Cpu;

  return (
    <div className="space-y-8 text-slate-100 pb-16">
      
      {/* 1. Breadcrumbs Header with Pink and White theme */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-pink-500/10 pb-5 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1 text-xs text-pink-400 font-semibold uppercase tracking-wider">
            <span className="hover:text-pink-300 cursor-pointer transition-colors" onClick={onBack}>All Topics</span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-white">{config.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
              <TargetIconComponent className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white font-display">
                {config.title}
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm">
                {config.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Start Learning & Save actions */}
        <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
          <button 
            onClick={() => {
              setLessons(prev => ({
                ...prev,
                operations: prev.operations.map(l => ({ ...l, completed: true }))
              }));
              setVisualizerLog("Lessons started! Running live visual dry-runs!");
            }}
            className="px-5 py-2.5 rounded-xl bg-white text-pink-600 hover:bg-pink-50 active:scale-95 font-bold text-xs transition-all flex items-center gap-2 shadow-[0_4px_14px_rgba(255,255,255,0.15)] border border-pink-100 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            Start Learning
          </button>
          
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2.5 rounded-xl border transition-all ${
              isSaved 
                ? "bg-pink-500/20 border-pink-500/50 text-pink-400" 
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
            }`}
            title="Save Topic"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-pink-400" : ""}`} />
          </button>
        </div>
      </div>

      {/* 2. Top Analytics / Progress Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Progress box */}
        <div className="lg:col-span-4 glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between border-pink-500/15">
          <div className="absolute top-0 right-0 w-32 h-12 bg-pink-500/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Progress</span>
              <span className="text-xs font-mono font-bold text-pink-400">{progressPercent}% Completed</span>
            </div>
            
            <div className="space-y-1">
              <div className="text-2xl font-black text-white tracking-tight">
                {completedCount} <span className="text-sm font-normal text-slate-400">/ {totalLessons} lessons completed</span>
              </div>
              
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  className="bg-gradient-to-r from-pink-500 to-fuchsia-500 h-full rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 mt-4 text-center">
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                <span className="text-lg font-bold font-mono text-white">{completedCount}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Completed</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-lg font-bold font-mono text-white">1</span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Active</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                <span className="text-lg font-bold font-mono text-white">{totalLessons - completedCount - 1}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">Remaining</span>
            </div>
          </div>
        </div>

        {/* Info blocks */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-center">
            
            <div className="flex items-center gap-3.5 p-4 bg-white/2 rounded-2xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block uppercase">Scope</span>
                <span className="text-sm font-bold text-white">{totalLessons} Full Lessons</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 bg-white/2 rounded-2xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shadow-md">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block uppercase">Estimated time</span>
                <span className="text-sm font-bold text-white">45-90 Minutes</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-4 bg-white/2 rounded-2xl border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shadow-md">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-400 block uppercase">Status</span>
                <span className="text-sm font-bold text-emerald-400">Available</span>
              </div>
            </div>

          </div>
          
          <div className="text-xs text-slate-400 mt-4 pt-4 border-t border-white/5 leading-relaxed">
            <Info className="w-4 h-4 inline-block mr-1 text-pink-400" />
            Check the items on the Lesson Roadmap below to track your learning journey. Checkboxes synchronize dynamically with the visual state.
          </div>
        </div>

      </div>

      {/* 3. Lesson Roadmap checklist modules */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight text-white font-display flex items-center gap-2">
          <Zap className="w-4 h-4 text-pink-400" />
          Lesson Roadmap Checklist
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Fundamentals Category */}
          <div className="glass-panel p-5 rounded-2xl border-white/5 hover:border-pink-500/20 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-bold text-slate-300">1. Fundamentals</span>
                <span className="text-[10px] font-mono text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded">
                  {lessons.fundamentals.filter(l => l.completed).length}/{lessons.fundamentals.length}
                </span>
              </div>
              <ul className="space-y-2">
                {lessons.fundamentals.map(l => (
                  <li 
                    key={l.id} 
                    onClick={() => toggleLesson("fundamentals", l.id)}
                    className="flex items-center justify-between p-2 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 cursor-pointer transition-all text-xs text-slate-200"
                  >
                    <span className={l.completed ? "text-slate-400 line-through" : ""}>{l.title}</span>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${l.completed ? "bg-emerald-500 border-emerald-400 text-slate-900" : "border-white/20"}`}>
                      {l.completed && <Check className="w-3 h-3 font-extrabold" />}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Operations Category */}
          <div className="glass-panel p-5 rounded-2xl border-white/5 hover:border-pink-500/20 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-bold text-slate-300">2. Operations</span>
                <span className="text-[10px] font-mono text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded">
                  {lessons.operations.filter(l => l.completed).length}/{lessons.operations.length}
                </span>
              </div>
              <ul className="space-y-2">
                {lessons.operations.map(l => (
                  <li 
                    key={l.id} 
                    onClick={() => toggleLesson("operations", l.id)}
                    className="flex items-center justify-between p-2 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 cursor-pointer transition-all text-xs text-slate-200"
                  >
                    <span className={l.completed ? "text-slate-400 line-through" : ""}>{l.title}</span>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${l.completed ? "bg-emerald-500 border-emerald-400 text-slate-900" : "border-white/20"}`}>
                      {l.completed && <Check className="w-3 h-3 font-extrabold" />}
                    </div>
                  </li>
                ))}
                {lessons.operations.length === 0 && <span className="text-[10px] text-slate-500">No core operations listed</span>}
              </ul>
            </div>
          </div>

          {/* Searching Category */}
          <div className="glass-panel p-5 rounded-2xl border-white/5 hover:border-pink-500/20 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-bold text-slate-300">3. Searching</span>
                <span className="text-[10px] font-mono text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded">
                  {lessons.searching.filter(l => l.completed).length}/{lessons.searching.length}
                </span>
              </div>
              <ul className="space-y-2">
                {lessons.searching.map(l => (
                  <li 
                    key={l.id} 
                    onClick={() => toggleLesson("searching", l.id)}
                    className="flex items-center justify-between p-2 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 cursor-pointer transition-all text-xs text-slate-200"
                  >
                    <span className={l.completed ? "text-slate-400 line-through" : ""}>{l.title}</span>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${l.completed ? "bg-emerald-500 border-emerald-400 text-slate-900" : "border-white/20"}`}>
                      {l.completed && <Check className="w-3 h-3 font-extrabold" />}
                    </div>
                  </li>
                ))}
                {lessons.searching.length === 0 && <span className="text-[10px] text-slate-500">No search lessons listed</span>}
              </ul>
            </div>
          </div>

          {/* Advanced Category */}
          <div className="glass-panel p-5 rounded-2xl border-white/5 hover:border-pink-500/20 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-bold text-slate-300">4. Advanced</span>
                <span className="text-[10px] font-mono text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded">
                  {lessons.advanced.filter(l => l.completed).length}/{lessons.advanced.length}
                </span>
              </div>
              <ul className="space-y-2">
                {lessons.advanced.map(l => (
                  <li 
                    key={l.id} 
                    onClick={() => toggleLesson("advanced", l.id)}
                    className="flex items-center justify-between p-2 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 cursor-pointer transition-all text-xs text-slate-200"
                  >
                    <span className={l.completed ? "text-slate-400 line-through" : ""}>{l.title}</span>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${l.completed ? "bg-emerald-500 border-emerald-400 text-slate-900" : "border-white/20"}`}>
                      {l.completed && <Check className="w-3 h-3 font-extrabold" />}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Interactive "Visualize" Section */}
      <section className="glass-panel p-6 rounded-3xl relative border-pink-500/15">
        <div className="absolute top-0 right-0 w-48 h-12 bg-pink-500/5 rounded-full blur-2xl pointer-events-none" />
        
        {/* Header Visualizer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white font-display">
                Visualize {config.title}
              </h2>
              <span className="text-[10px] font-bold bg-pink-500/10 text-pink-400 px-2 py-0.5 rounded-full uppercase">
                Interactive Canvas
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Set inputs and run step-by-step state animations.
            </p>
          </div>

          {/* Action trigger selections */}
          <div className="flex flex-wrap gap-2 items-center">
            {config.key === "arrays" && (
              <>
                <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-white/5">
                  <input type="text" value={insertVal} onChange={e => setInsertVal(e.target.value)} className="w-10 text-center bg-transparent border-none text-xs focus:outline-none" placeholder="Val" title="Value to insert" />
                  <span className="text-slate-600 text-xs">@</span>
                  <input type="text" value={insertIdx} onChange={e => setInsertIdx(e.target.value)} className="w-8 text-center bg-transparent border-none text-xs focus:outline-none" placeholder="Idx" title="Index to insert" />
                </div>
                <button onClick={() => generateAnimation("insert")} className="px-3.5 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold transition-all cursor-pointer">Insert</button>
                <button onClick={() => generateAnimation("delete")} className="px-3.5 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold transition-all cursor-pointer">Delete</button>
                
                <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-white/5">
                  <input type="text" value={searchTarget} onChange={e => setSearchTarget(e.target.value)} className="w-12 text-center bg-transparent border-none text-xs focus:outline-none" placeholder="Target" title="Search Target" />
                </div>
                <button onClick={() => generateAnimation("search")} className="px-3.5 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold transition-all cursor-pointer">Search</button>
              </>
            )}

            {config.key === "linked_list" && (
              <>
                <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-white/5">
                  <input type="text" value={insertVal} onChange={e => setInsertVal(e.target.value)} className="w-12 text-center bg-transparent border-none text-xs focus:outline-none" placeholder="Val" title="Value" />
                </div>
                <button onClick={() => generateAnimation("prepend")} className="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">Prepend</button>
                <button onClick={() => generateAnimation("append")} className="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">Append</button>
                
                <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-white/5">
                  <input type="text" value={deleteVal} onChange={e => setDeleteVal(e.target.value)} className="w-12 text-center bg-transparent border-none text-xs focus:outline-none" placeholder="Val" title="Value to Delete" />
                </div>
                <button onClick={() => generateAnimation("delete")} className="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">Delete Node</button>
              </>
            )}

            {config.key === "stacks" && (
              <>
                <input type="text" value={insertVal} onChange={e => setInsertVal(e.target.value)} className="w-12 text-center bg-slate-950 border border-white/5 p-1.5 rounded-xl text-xs focus:outline-none" placeholder="Val" />
                <button onClick={() => generateAnimation("push")} className="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">Push</button>
                <button onClick={() => generateAnimation("pop")} className="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">Pop</button>
              </>
            )}

            {config.key === "queues" && (
              <>
                <input type="text" value={insertVal} onChange={e => setInsertVal(e.target.value)} className="w-12 text-center bg-slate-950 border border-white/5 p-1.5 rounded-xl text-xs focus:outline-none" placeholder="Val" />
                <button onClick={() => generateAnimation("enqueue")} className="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">Enqueue</button>
                <button onClick={() => generateAnimation("dequeue")} className="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">Dequeue</button>
              </>
            )}

            {config.key === "trees" && (
              <>
                <button onClick={() => generateAnimation("preorder")} className="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">Preorder</button>
                <button onClick={() => generateAnimation("inorder")} className="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">Inorder</button>
                <button onClick={() => generateAnimation("postorder")} className="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">Postorder</button>
              </>
            )}

            {config.key === "graphs" && (
              <>
                <button onClick={() => generateAnimation("bfs")} className="px-3.5 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">BFS Traversal</button>
                <button onClick={() => generateAnimation("dfs")} className="px-3.5 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">DFS Traversal</button>
              </>
            )}

            {config.key === "sorting" && (
              <button onClick={() => generateAnimation("bubble")} className="px-4 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer flex items-center gap-1"><ArrowDownUp className="w-3.5 h-3.5" /> Bubble Sort</button>
            )}

            {config.key === "searching" && (
              <>
                <input type="text" value={searchTarget} onChange={e => setSearchTarget(e.target.value)} className="w-14 text-center bg-slate-950 border border-white/5 p-1.5 rounded-xl text-xs focus:outline-none" placeholder="Val" />
                <button onClick={() => generateAnimation("binary")} className="px-3.5 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">Binary Search</button>
              </>
            )}

            {config.key === "dp" && (
              <button onClick={() => generateAnimation("tabulate")} className="px-4 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">Fibonacci DP</button>
            )}

            {config.key === "greedy" && (
              <button onClick={() => generateAnimation("make_change")} className="px-4 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">Pick Coins</button>
            )}

            {config.key === "recursion" && (
              <button onClick={() => generateAnimation("fact")} className="px-4 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">Factorial Call-Stack</button>
            )}

            {config.key === "bit_manipulation" && (
              <button onClick={() => generateAnimation("and_mask")} className="px-4 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">Apply AND Mask</button>
            )}

            {config.key === "math" && (
              <button onClick={() => generateAnimation("euclid")} className="px-4 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">Euclidean GCD</button>
            )}

            {config.key === "string" && (
              <button onClick={() => generateAnimation("match")} className="px-4 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-500/30 text-xs font-bold cursor-pointer">Match 'ABC'</button>
            )}

          </div>
        </div>

        {/* Input buffer editor configuration */}
        <div className="p-3 bg-slate-950/40 border border-white/5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400" />
            <span className="text-xs font-bold text-slate-300">Base configuration/Preset array:</span>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                resetAnimation();
              }}
              className="bg-slate-950/60 border border-white/10 text-xs font-mono font-bold text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-pink-500/50 w-full md:w-56 text-center"
            />
            <button 
              onClick={() => { setInputValue(config.visualizerPreset); resetAnimation(); }}
              className="text-[10px] text-pink-400 hover:text-pink-300 font-semibold underline shrink-0 cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Interactive canvas view display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          <div className="lg:col-span-8 flex flex-col justify-between bg-slate-950/30 border border-white/5 p-6 rounded-2xl min-h-[340px] relative">
            <span className="absolute top-3 left-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Live memory view</span>
            
            <div className="flex flex-col items-center justify-center my-auto space-y-6 py-4">
              
              {/* Dynamic rendering by topic */}

              {/* 1. ARRAYS */}
              {config.key === "arrays" && (
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {(activeStep?.arr || inputValue.split(",").map(v => parseInt(v.trim())).filter(v => !isNaN(v))).map((val, idx) => {
                    const isHigh = activeStep?.highlights?.includes(idx);
                    return (
                      <div key={idx} className="flex flex-col items-center">
                        <span className="text-[10px] font-mono text-slate-500">[{idx}]</span>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm border-2 transition-all ${
                          isHigh ? "bg-pink-900/40 border-pink-400 text-pink-100 shadow-[0_0_12px_rgba(236,72,153,0.4)]" : "bg-white/5 border-white/10 text-slate-300"
                        }`}>
                          {val}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 2. LINKED LISTS */}
              {config.key === "linked_list" && (
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {(activeStep?.list || inputValue.split("->").map(v => parseInt(v.trim())).filter(v => !isNaN(v))).map((val, idx) => {
                    const isHigh = activeStep?.highlights?.includes(idx);
                    return (
                      <React.Fragment key={idx}>
                        <div className="flex flex-col items-center">
                          <span className="text-[9px] font-mono text-slate-500">Node</span>
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xs border-2 transition-all ${
                            isHigh ? "bg-pink-900/40 border-pink-400 text-pink-100 shadow-[0_0_12px_rgba(236,72,153,0.4)]" : "bg-white/5 border-white/10 text-slate-300"
                          }`}>
                            {val}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-pink-400 shrink-0" />
                      </React.Fragment>
                    );
                  })}
                  <div className="w-12 h-12 rounded-lg bg-slate-950 border border-white/10 flex items-center justify-center text-[10px] text-slate-500 font-mono">
                    Null
                  </div>
                </div>
              )}

              {/* 3. STACKS */}
              {config.key === "stacks" && (
                <div className="flex flex-col items-center justify-end w-40 border-b-4 border-x-2 border-white/10 p-4 min-h-[160px] bg-white/2 rounded-b-2xl">
                  <div className="flex flex-col-reverse gap-2 w-full">
                    {(activeStep?.stack || inputValue.split(",").map(v => parseInt(v.trim())).filter(v => !isNaN(v))).map((val, idx) => {
                      const isHigh = activeStep?.highlights?.includes(idx);
                      return (
                        <div 
                          key={idx} 
                          className={`w-full py-2.5 rounded-xl text-center font-bold text-xs border transition-all ${
                            isHigh ? "bg-pink-950/50 border-pink-400 text-pink-300" : "bg-slate-900 border-white/10 text-white"
                          }`}
                        >
                          {val} {idx === (activeStep?.stack || []).length - 1 && "← TOP"}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. QUEUES */}
              {config.key === "queues" && (
                <div className="w-full max-w-md bg-white/2 border-y-2 border-white/10 p-3 flex items-center justify-center rounded-lg min-h-[80px]">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500">FRONT ←</span>
                    {(activeStep?.queue || inputValue.split(",").map(v => parseInt(v.trim())).filter(v => !isNaN(v))).map((val, idx) => {
                      const isHigh = activeStep?.highlights?.includes(idx);
                      return (
                        <div 
                          key={idx} 
                          className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xs border transition-all ${
                            isHigh ? "bg-pink-950/40 border-pink-400 text-pink-300" : "bg-slate-900 border-white/10 text-slate-200"
                          }`}
                        >
                          {val}
                        </div>
                      );
                    })}
                    <span className="text-[10px] font-mono text-slate-500">← REAR</span>
                  </div>
                </div>
              )}

              {/* 5. TREES */}
              {config.key === "trees" && (
                <div className="flex flex-col items-center space-y-4">
                  {/* Visual simulated tree map */}
                  <div className="flex items-center gap-12">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 ${activeStep?.currentNode === 50 ? "bg-pink-950/60 border-pink-400 text-pink-300 animate-bounce" : "bg-white/5 border-white/10"}`}>50</div>
                      
                      <div className="flex gap-8 mt-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 ${activeStep?.currentNode === 30 ? "bg-pink-950/60 border-pink-400 text-pink-300 animate-bounce" : "bg-white/5 border-white/10"}`}>30</div>
                          <div className="flex gap-4 mt-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border ${activeStep?.currentNode === 20 ? "bg-pink-950/60 border-pink-400 text-pink-300" : "bg-white/5 border-white/10"}`}>20</div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border ${activeStep?.currentNode === 40 ? "bg-pink-950/60 border-pink-400 text-pink-300" : "bg-white/5 border-white/10"}`}>40</div>
                          </div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 ${activeStep?.currentNode === 70 ? "bg-pink-950/60 border-pink-400 text-pink-300 animate-bounce" : "bg-white/5 border-white/10"}`}>70</div>
                          <div className="flex gap-4 mt-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border ${activeStep?.currentNode === 60 ? "bg-pink-950/60 border-pink-400 text-pink-300" : "bg-white/5 border-white/10"}`}>60</div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border ${activeStep?.currentNode === 80 ? "bg-pink-950/60 border-pink-400 text-pink-300" : "bg-white/5 border-white/10"}`}>80</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {activeStep?.visited && (
                    <div className="text-xs p-2.5 bg-slate-900 border border-white/5 rounded-xl w-full max-w-sm text-center">
                      <span className="text-pink-400 font-bold block mb-1">Visited Buffer:</span>
                      <span className="font-mono text-white text-sm">{activeStep.visited.join(" -> ")}</span>
                    </div>
                  )}
                </div>
              )}

              {/* 6. GRAPHS */}
              {config.key === "graphs" && (
                <div className="flex flex-col items-center space-y-4">
                  {/* Render node visual mesh */}
                  <div className="flex items-center gap-6">
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold ${activeStep?.currentNode === "A" ? "bg-pink-950 border-pink-400" : "bg-slate-900 border-white/10"}`}>A</div>
                    <div className="flex flex-col gap-4">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold ${activeStep?.currentNode === "B" ? "bg-pink-950 border-pink-400" : "bg-slate-900 border-white/10"}`}>B</div>
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold ${activeStep?.currentNode === "C" ? "bg-pink-950 border-pink-400" : "bg-slate-900 border-white/10"}`}>C</div>
                    </div>
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold ${activeStep?.currentNode === "D" ? "bg-pink-950 border-pink-400" : "bg-slate-900 border-white/10"}`}>D</div>
                  </div>
                  {activeStep?.visited && (
                    <div className="text-xs p-2.5 bg-slate-900 border border-white/5 rounded-xl w-full max-w-sm text-center">
                      <span className="text-pink-400 font-bold block mb-1">BFS/DFS Visited:</span>
                      <span className="font-mono text-white text-sm">{activeStep.visited.join(" -> ")}</span>
                    </div>
                  )}
                </div>
              )}

              {/* 7. SORTING */}
              {config.key === "sorting" && (
                <div className="flex flex-col items-center space-y-4 w-full">
                  <div className="flex items-end justify-center gap-4 h-32 w-full max-w-xs">
                    {(activeStep?.arr || [15, 3, 22, 10, 5]).map((val, idx) => {
                      const isActive = activeStep?.activeIdxs?.includes(idx);
                      return (
                        <div key={idx} className="flex flex-col items-center gap-1.5 w-10">
                          <span className="text-[10px] text-slate-400">{val}</span>
                          <div 
                            className={`w-full rounded-t-lg transition-all ${isActive ? "bg-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.5)]" : "bg-white/15"}`}
                            style={{ height: `${val * 4}px` }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 8. SEARCHING */}
              {config.key === "searching" && (
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex gap-2">
                    {(activeStep?.arr || [2, 4, 8, 16, 32, 64]).map((val, idx) => {
                      const isLow = activeStep?.low === idx;
                      const isHigh = activeStep?.high === idx;
                      const isMid = activeStep?.mid === idx;
                      return (
                        <div key={idx} className="flex flex-col items-center relative pb-6">
                          <div className={`w-11 h-11 rounded-lg border-2 flex items-center justify-center font-bold text-xs ${
                            isMid ? "bg-pink-950 border-pink-400 text-pink-200" : "bg-slate-900 border-white/10"
                          }`}>
                            {val}
                          </div>
                          <div className="absolute bottom-0 flex flex-wrap gap-0.5 justify-center">
                            {isLow && <span className="text-[8px] bg-emerald-500/20 text-emerald-300 px-1 rounded font-bold">L</span>}
                            {isMid && <span className="text-[8px] bg-pink-500/20 text-pink-300 px-1 rounded font-bold">M</span>}
                            {isHigh && <span className="text-[8px] bg-amber-500/20 text-amber-300 px-1 rounded font-bold">H</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 9. DYNAMIC PROGRAMMING */}
              {config.key === "dp" && (
                <div className="flex items-center gap-2">
                  {(activeStep?.table || [1, 1, 2, 3, 5, 8]).map((val, idx) => {
                    const isActive = activeStep?.activeIdx === idx;
                    return (
                      <div key={idx} className="flex flex-col items-center">
                        <span className="text-[9px] text-slate-500 font-mono">F[{idx}]</span>
                        <div className={`w-11 h-11 rounded border flex items-center justify-center font-bold text-xs ${isActive ? "bg-pink-950 border-pink-400 text-pink-300 animate-pulse" : "bg-slate-900 border-white/5"}`}>
                          {val || "?"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 10. GREEDY */}
              {config.key === "greedy" && (
                <div className="flex flex-col items-center gap-3">
                  <div className="text-xs text-slate-400">Remaining Target: <span className="text-pink-400 font-mono font-bold">{activeStep?.remaining ?? 36}</span></div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Coins Bag:</span>
                    {(activeStep?.coinsPicked || []).map((coin: number, idx: number) => (
                      <div key={idx} className="w-9 h-9 rounded-full bg-pink-500/25 border border-pink-400 flex items-center justify-center text-xs font-bold text-pink-300">
                        {coin}
                      </div>
                    ))}
                    {(activeStep?.coinsPicked || []).length === 0 && <span className="text-[10px] text-slate-500 font-mono">Empty</span>}
                  </div>
                </div>
              )}

              {/* 11. RECURSION */}
              {config.key === "recursion" && (
                <div className="flex flex-col items-center gap-2 w-full max-w-xs">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest">VM Execution Frame Stack</span>
                  <div className="flex flex-col-reverse gap-1.5 w-full">
                    {(activeStep?.frames || []).map((frame: string, idx: number) => (
                      <div key={idx} className="p-2 rounded bg-pink-950/40 border border-pink-500/30 text-center font-mono text-xs text-pink-300">
                        {frame}
                      </div>
                    ))}
                    {(activeStep?.frames || []).length === 0 && (
                      <div className="p-3 text-center border border-dashed border-white/5 rounded-xl text-[10px] text-slate-600">
                        Stack Empty
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 12. BIT MANIPULATION */}
              {config.key === "bit_manipulation" && (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex gap-1.5 font-mono">
                    {(activeStep?.register || "00001101").split("").map((bit: string, idx: number) => (
                      <div key={idx} className={`w-9 h-11 rounded border flex flex-col items-center justify-center font-bold text-sm ${bit === "1" ? "bg-pink-500/10 border-pink-400 text-pink-300" : "bg-slate-900 border-white/5 text-slate-600"}`}>
                        <span>{bit}</span>
                        <span className="text-[7px] text-slate-500 font-normal">2^{7 - idx}</span>
                      </div>
                    ))}
                  </div>
                  {activeStep?.mask && (
                    <div className="text-xs font-mono text-slate-400">Mask: <span className="text-white">{activeStep.mask}</span></div>
                  )}
                </div>
              )}

              {/* 13. MATH */}
              {config.key === "math" && (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-6 p-4 bg-slate-900 border border-white/5 rounded-2xl">
                    <div className="text-center">
                      <span className="text-[10px] text-slate-500 block font-mono">A</span>
                      <span className="text-xl font-bold font-mono text-white">{activeStep?.a ?? 18}</span>
                    </div>
                    <div className="text-pink-400 font-extrabold text-xl">%</div>
                    <div className="text-center">
                      <span className="text-[10px] text-slate-500 block font-mono">B</span>
                      <span className="text-xl font-bold font-mono text-white">{activeStep?.b ?? 12}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 14. STRING */}
              {config.key === "string" && (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex gap-1 font-mono text-xs">
                    {(activeStep?.text || "ABABC").split("").map((char: string, idx: number) => {
                      const isActive = activeStep?.activeChars?.includes(idx);
                      return (
                        <div key={idx} className={`w-9 h-9 rounded flex items-center justify-center font-bold ${isActive ? "bg-pink-950 border border-pink-400 text-pink-300 animate-pulse" : "bg-slate-900 border border-white/5 text-white"}`}>
                          {char}
                        </div>
                      );
                    })}
                  </div>
                  {activeStep?.pattern && (
                    <div className="text-[10px] text-slate-400 font-mono">Pattern: <span className="text-pink-400">"{activeStep.pattern}"</span></div>
                  )}
                </div>
              )}

            </div>

            {/* Visualizer controls footer */}
            <div className="border-t border-white/5 pt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 font-bold font-mono text-pink-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeStep?.desc || "Select an operation and click Animate above!"}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setCurrentStepIdx(0);
                    setIsPlaying(false);
                  }}
                  className="p-1.5 rounded-lg hover:bg-white/5 transition-all cursor-pointer"
                  title="Reset Animation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1 bg-pink-500 hover:bg-pink-400 text-white font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? "Pause" : "Animate"}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Side Steps Log (4 cols) */}
          <div className="lg:col-span-4 glass-panel p-5 rounded-2xl border-white/5 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block border-b border-white/5 pb-2">Execution trace logs</span>
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-2">
                {steps.length > 0 ? (
                  steps.map((st, sidx) => (
                    <div 
                      key={sidx}
                      onClick={() => setCurrentStepIdx(sidx)}
                      className={`p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                        sidx === currentStepIdx 
                          ? "bg-pink-500/10 border-pink-500/40 text-white font-bold" 
                          : "bg-white/2 border-transparent text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-[9px] uppercase font-mono text-pink-400">Step {sidx + 1}</span>
                        {sidx === currentStepIdx && <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />}
                      </div>
                      <p className="line-clamp-2 leading-relaxed">{st.desc}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center border border-dashed border-white/5 rounded-2xl text-[11px] text-slate-600 leading-relaxed">
                    No active runtime execution loaded.<br />Select a preset or trigger a custom action above to animate trace frames.
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
              <span>Steps Count: <span className="text-white font-mono">{steps.length}</span></span>
              <span>Current: <span className="text-white font-mono">{steps.length > 0 ? currentStepIdx + 1 : 0}</span></span>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Code Example Block */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-white font-display flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-pink-400" />
            Code Example
          </h2>

          {/* Language selector tabs */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5">
            {["python", "java", "cpp", "javascript"].map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang as any)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-all ${
                  activeLang === lang ? "bg-white/10 text-white" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {lang === "cpp" ? "C++" : lang}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic code blocks styled matching the White and Pink aesthetic */}
        <div className="glass-panel rounded-3xl overflow-hidden border-white/5 relative">
          <button 
            onClick={() => copyCodeToClipboard(
              config.codeSnippets[Object.keys(config.codeSnippets)[0]]?.[activeLang] || ""
            )}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/60 hover:bg-slate-950 border border-white/10 text-slate-400 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer text-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>

          <pre className="p-6 overflow-x-auto text-xs font-mono text-slate-300 bg-slate-950/40 leading-relaxed">
            <code>
              {config.codeSnippets[Object.keys(config.codeSnippets)[0]]?.[activeLang] || `// Code snippet loading for ${config.title}`}
            </code>
          </pre>
        </div>
      </section>

      {/* 6. Practice Problems Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-white font-display flex items-center gap-2">
            <Award className="w-4 h-4 text-pink-400" />
            Practice Problems (Common Interview Questions)
          </h2>
          <span className="text-xs text-slate-400 font-mono">DSA Curated</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.practiceProblems.map((problem) => (
            <div 
              key={problem.id} 
              className="glass-panel p-5 rounded-2xl border-white/5 hover:border-pink-500/20 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white">{problem.title}</h3>
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${
                    problem.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-400" :
                    problem.difficulty === "Medium" ? "bg-amber-500/10 text-amber-400" : "bg-rose-500/10 text-rose-400"
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{problem.desc}</p>
                
                <div className="flex items-center gap-3 pt-1 text-[10px] font-mono text-slate-500">
                  <span>Time: <span className="text-slate-300">{problem.time}</span></span>
                  <span>Space: <span className="text-slate-300">{problem.space}</span></span>
                </div>
              </div>

              <button 
                onClick={() => setSelectedProblem(problem)}
                className="w-full py-2 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border border-pink-500/20 hover:border-pink-500/40 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Solve & Show Explanation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Real World Applications */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight text-white font-display flex items-center gap-2">
          <Sliders className="w-4 h-4 text-pink-400" />
          Real World Applications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.realWorldApps.map((app, idx) => (
            <div 
              key={idx}
              className="glass-panel p-5 rounded-2xl border-white/5 flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 shrink-0">
                <Database className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-white">{app.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{app.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Related Topics Footer */}
      <section className="space-y-4 border-t border-white/5 pt-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Related Topics</h2>
        
        <div className="flex flex-wrap gap-2">
          {config.relatedTopics.map((rel, idx) => (
            <button
              key={idx}
              onClick={() => onSelectTopic(rel.key)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-white/3 border border-white/5 hover:border-pink-500/30 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{rel.title}</span>
              <ArrowRight className="w-3.5 h-3.5 text-pink-400" />
            </button>
          ))}
        </div>
      </section>

      {/* Practice Problem Explanation Modal Popup */}
      <AnimatePresence>
        {selectedProblem && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-filter backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-pink-500/20 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl shadow-pink-500/10"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                  <Award className="w-5 h-5 text-pink-400" />
                  {selectedProblem.title}
                </h3>
                <button 
                  onClick={() => setSelectedProblem(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 font-bold cursor-pointer text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <span className="text-slate-500 font-bold block mb-1 uppercase tracking-wider">Problem Description:</span>
                  <p className="text-slate-300">{selectedProblem.desc}</p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs border border-white/5">
                  <span className="text-pink-400 font-bold block mb-1">Input Sample:</span>
                  <span className="text-white">{selectedProblem.input}</span>
                </div>

                <div className="p-4 bg-pink-500/5 rounded-2xl border border-pink-500/20">
                  <span className="text-pink-400 font-extrabold block mb-1 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-4 h-4 fill-pink-500/10" />
                    Optimal Solution Walkthrough
                  </span>
                  <p className="text-slate-300 leading-relaxed font-semibold">{selectedProblem.explanation}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-white/5 pt-4">
                <button 
                  onClick={() => setSelectedProblem(null)}
                  className="px-5 py-2 rounded-xl bg-pink-500 hover:bg-pink-400 text-white font-bold text-xs cursor-pointer transition-all active:scale-95 shadow-md shadow-pink-500/20"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
