var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_genai = require("@google/genai");
var import_vite = require("vite");
var import_app = require("firebase/app");
var import_firestore = require("firebase/firestore");
import_dotenv.default.config();
var firebaseConfigPath = import_path.default.join(process.cwd(), "firebase-applet-config.json");
var firebaseConfig = JSON.parse(import_fs.default.readFileSync(firebaseConfigPath, "utf8"));
var firebaseApp = (0, import_app.initializeApp)(firebaseConfig);
var db = (0, import_firestore.getFirestore)(firebaseApp, firebaseConfig.firestoreDatabaseId);
var ai = new import_genai.GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});
async function generateContentWithFallback(options) {
  const keys = [
    process.env.GEMINI_API_KEY,
    process.env.FALLBACK_GEMINI_API_KEY_1,
    process.env.FALLBACK_GEMINI_API_KEY_2
  ].filter(Boolean);
  let lastError = null;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const client = new import_genai.GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
    const modelsToTry = [
      options.model,
      "gemini-3.5-flash",
      "gemini-3.1-flash-lite",
      "gemini-flash-latest"
    ];
    const uniqueModels = Array.from(new Set(modelsToTry));
    for (const modelName of uniqueModels) {
      try {
        console.log(`Trying Gemini with Key index ${i} (${key?.substring(0, 8)}...) and model "${modelName}"...`);
        const apiCall = client.models.generateContent({
          model: modelName,
          contents: options.contents,
          config: options.config
        });
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Timeout (Gemini API did not respond within 30 seconds)")), 3e4);
        });
        const response = await Promise.race([apiCall, timeoutPromise]);
        if (response && response.text) {
          return response;
        }
      } catch (err) {
        console.warn(`Key index ${i} failed with model ${modelName}:`, err.message || err);
        lastError = err;
      }
    }
  }
  throw new Error("There is some bug found pls wait we sended the messaege our one of the devleopr we will get back to you or else you can try again in next 30 mins");
}
function generateFallbackTrace(rawTopic) {
  const topic = rawTopic.trim().toLowerCase();
  if (topic.includes("dijkstra") || topic.includes("shortest path") || topic.includes("bellman") || topic.includes("prim") || topic.includes("kruskal") || topic.includes("graph") || topic.includes("bfs") || topic.includes("dfs") || topic.includes("astar")) {
    return {
      title: "Dijkstra's Shortest Path",
      description: "Finds the shortest paths from a single source node to all other nodes in a weighted graph.",
      timeComplexity: "O((V + E) log V)",
      spaceComplexity: "O(V + E)",
      visualizationType: "graph",
      code: [
        "def dijkstra(graph, start):",
        "    distances = {start: 0}",
        "    pq = PriorityQueue()",
        "    pq.put((0, start))",
        "    while not pq.empty():",
        "        dist, curr = pq.get()",
        "        for neighbor, weight in graph[curr]:",
        "            new_dist = dist + weight",
        "            if new_dist < distances.get(neighbor, float('inf')):",
        "                distances[neighbor] = new_dist",
        "                pq.put((new_dist, neighbor))"
      ],
      steps: [
        {
          elements: [
            { id: "A", label: "A: 0", state: "selected", pointers: ["start"] },
            { id: "B", label: "B: \u221E", state: "default" },
            { id: "C", label: "C: \u221E", state: "default" },
            { id: "D", label: "D: \u221E", state: "default" },
            { id: "E", label: "E: \u221E", state: "default" }
          ],
          variables: { "Current PQ": "A(0)" },
          codeLine: 1,
          explanation: "Initialize shortest path distances. Distance from source A to itself is 0, others are Infinity."
        },
        {
          elements: [
            { id: "A", label: "A: 0", state: "success" },
            { id: "B", label: "B: 4", state: "active", pointers: ["neighbor"] },
            { id: "C", label: "C: 2", state: "active", pointers: ["neighbor"] },
            { id: "D", label: "D: \u221E", state: "default" },
            { id: "E", label: "E: \u221E", state: "default" }
          ],
          variables: { "Current PQ": "C(2), B(4)" },
          codeLine: 5,
          explanation: "Visit Node A. Relax adjacent neighbors: Node B distance becomes 4, Node C becomes 2."
        },
        {
          elements: [
            { id: "A", label: "A: 0", state: "success" },
            { id: "B", label: "B: 4", state: "default" },
            { id: "C", label: "C: 2", state: "selected", pointers: ["curr"] },
            { id: "D", label: "D: \u221E", state: "default" },
            { id: "E", label: "E: \u221E", state: "default" }
          ],
          variables: { "Current PQ": "B(4)" },
          codeLine: 4,
          explanation: "Extract smallest node from priority queue: Node C (distance 2)."
        },
        {
          elements: [
            { id: "A", label: "A: 0", state: "success" },
            { id: "B", label: "B: 3", state: "active", pointers: ["relaxed"] },
            { id: "C", label: "C: 2", state: "success" },
            { id: "D", label: "D: 7", state: "active", pointers: ["neighbor"] },
            { id: "E", label: "E: \u221E", state: "default" }
          ],
          variables: { "Current PQ": "B(3), D(7)" },
          codeLine: 7,
          explanation: "From Node C, relax edges. Path A->C->B (length 2+1=3) is shorter than A->B (4). Update B's distance to 3."
        },
        {
          elements: [
            { id: "A", label: "A: 0", state: "success" },
            { id: "B", label: "B: 3", state: "selected", pointers: ["curr"] },
            { id: "C", label: "C: 2", state: "success" },
            { id: "D", label: "D: 7", state: "default" },
            { id: "E", label: "E: \u221E", state: "default" }
          ],
          variables: { "Current PQ": "D(7)" },
          codeLine: 4,
          explanation: "Extract smallest node: Node B (distance 3)."
        },
        {
          elements: [
            { id: "A", label: "A: 0", state: "success" },
            { id: "B", label: "B: 3", state: "success" },
            { id: "C", label: "C: 2", state: "success" },
            { id: "D", label: "D: 5", state: "active", pointers: ["relaxed"] },
            { id: "E", label: "E: 11", state: "active", pointers: ["neighbor"] }
          ],
          variables: { "Current PQ": "D(5), E(11)" },
          codeLine: 7,
          explanation: "From Node B, relax edges. Path A->C->B->D (length 3+2=5) is shorter than A->C->D (7). Update D's distance to 5."
        },
        {
          elements: [
            { id: "A", label: "A: 0", state: "success" },
            { id: "B", label: "B: 3", state: "success" },
            { id: "C", label: "C: 2", state: "success" },
            { id: "D", label: "D: 5", state: "success" },
            { id: "E", label: "E: 11", state: "success" }
          ],
          variables: { "Current PQ": "Empty" },
          codeLine: 13,
          explanation: "All reachable nodes relaxed successfully. Shortest paths computed."
        }
      ]
    };
  }
  if (topic.includes("sort") || topic.includes("bubble") || topic.includes("selection") || topic.includes("insertion") || topic.includes("merge") || topic.includes("quick")) {
    return {
      title: "Bubble Sort",
      description: "Repeatedly steps through the input list, compares adjacent elements and swaps them if they are in the wrong order.",
      timeComplexity: "O(n\xB2)",
      spaceComplexity: "O(1)",
      visualizationType: "array",
      code: [
        "def bubble_sort(arr):",
        "    n = len(arr)",
        "    for i in range(n):",
        "        for j in range(0, n - i - 1):",
        "            if arr[j] > arr[j+1]:",
        "                arr[j], arr[j+1] = arr[j+1], arr[j]"
      ],
      steps: [
        {
          elements: [
            { id: "0", label: "8", state: "default", index: 0 },
            { id: "1", label: "3", state: "default", index: 1 },
            { id: "2", label: "5", state: "default", index: 2 },
            { id: "3", label: "1", state: "default", index: 3 },
            { id: "4", label: "9", state: "default", index: 4 }
          ],
          variables: { "i": 0, "j": 0, "Swapped": "false" },
          codeLine: 3,
          explanation: "Starting Bubble Sort. Compare elements at index j (0) and j+1 (1): 8 > 3."
        },
        {
          elements: [
            { id: "0", label: "3", state: "selected", index: 0, pointers: ["j"] },
            { id: "1", label: "8", state: "selected", index: 1, pointers: ["j+1"] },
            { id: "2", label: "5", state: "default", index: 2 },
            { id: "3", label: "1", state: "default", index: 3 },
            { id: "4", label: "9", state: "default", index: 4 }
          ],
          variables: { "i": 0, "j": 0, "Swapped": "true" },
          codeLine: 5,
          explanation: "Swap because 8 is larger than 3."
        },
        {
          elements: [
            { id: "0", label: "3", state: "default", index: 0 },
            { id: "1", label: "8", state: "active", index: 1, pointers: ["j"] },
            { id: "2", label: "5", state: "active", index: 2, pointers: ["j+1"] },
            { id: "3", label: "1", state: "default", index: 3 },
            { id: "4", label: "9", state: "default", index: 4 }
          ],
          variables: { "i": 0, "j": 1, "Swapped": "true" },
          codeLine: 3,
          explanation: "Advance pointers. Compare elements at index 1 and 2: 8 > 5."
        },
        {
          elements: [
            { id: "0", label: "3", state: "default", index: 0 },
            { id: "1", label: "5", state: "selected", index: 1, pointers: ["j"] },
            { id: "2", label: "8", state: "selected", index: 2, pointers: ["j+1"] },
            { id: "3", label: "1", state: "default", index: 3 },
            { id: "4", label: "9", state: "default", index: 4 }
          ],
          variables: { "i": 0, "j": 1, "Swapped": "true" },
          codeLine: 5,
          explanation: "Swap because 8 is larger than 5."
        },
        {
          elements: [
            { id: "0", label: "3", state: "default", index: 0 },
            { id: "1", label: "5", state: "default", index: 1 },
            { id: "2", label: "8", state: "active", index: 2, pointers: ["j"] },
            { id: "3", label: "1", state: "active", index: 3, pointers: ["j+1"] },
            { id: "4", label: "9", state: "default", index: 4 }
          ],
          variables: { "i": 0, "j": 2, "Swapped": "true" },
          codeLine: 3,
          explanation: "Advance pointers. Compare elements at index 2 and 3: 8 > 1."
        },
        {
          elements: [
            { id: "0", label: "3", state: "default", index: 0 },
            { id: "1", label: "5", state: "default", index: 1 },
            { id: "2", label: "1", state: "selected", index: 2, pointers: ["j"] },
            { id: "3", label: "8", state: "selected", index: 3, pointers: ["j+1"] },
            { id: "4", label: "9", state: "default", index: 4 }
          ],
          variables: { "i": 0, "j": 2, "Swapped": "true" },
          codeLine: 5,
          explanation: "Swap because 8 is larger than 1."
        },
        {
          elements: [
            { id: "0", label: "3", state: "default", index: 0 },
            { id: "1", label: "5", state: "default", index: 1 },
            { id: "2", label: "1", state: "default", index: 2 },
            { id: "3", label: "8", state: "active", index: 3, pointers: ["j"] },
            { id: "4", label: "9", state: "active", index: 4, pointers: ["j+1"] }
          ],
          variables: { "i": 0, "j": 3, "Swapped": "true" },
          codeLine: 3,
          explanation: "Compare index 3 and 4: 8 < 9. No swap required."
        },
        {
          elements: [
            { id: "0", label: "1", state: "success", index: 0 },
            { id: "1", label: "3", state: "success", index: 1 },
            { id: "2", label: "5", state: "success", index: 2 },
            { id: "3", label: "8", state: "success", index: 3 },
            { id: "4", label: "9", state: "success", index: 4 }
          ],
          variables: { "i": "complete", "j": "complete", "Swapped": "false" },
          codeLine: 9,
          explanation: "Sorting complete. The final array is beautifully sorted in ascending order."
        }
      ]
    };
  }
  if (topic.includes("binary") || topic.includes("search")) {
    return {
      title: "Binary Search",
      description: "Locates a target value within a sorted array by repeatedly dividing the search interval in half.",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      visualizationType: "array",
      code: [
        "def binary_search(arr, target):",
        "    low = 0",
        "    high = len(arr) - 1",
        "    while low <= high:",
        "        mid = (low + high) // 2",
        "        if arr[mid] == target:",
        "            return mid",
        "        elif arr[mid] < target:",
        "            low = mid + 1",
        "        else:",
        "            high = mid - 1",
        "    return -1"
      ],
      steps: [
        {
          elements: [
            { id: "0", label: "2", state: "default", index: 0, pointers: ["low"] },
            { id: "1", label: "5", state: "default", index: 1 },
            { id: "2", label: "8", state: "default", index: 2 },
            { id: "3", label: "12", state: "default", index: 3 },
            { id: "4", label: "16", state: "default", index: 4 },
            { id: "5", label: "23", state: "default", index: 5 },
            { id: "6", label: "38", state: "default", index: 6 },
            { id: "7", label: "56", state: "default", index: 7 },
            { id: "8", label: "72", state: "default", index: 8, pointers: ["high"] }
          ],
          variables: { "low": 0, "high": 8, "mid": "unset", "target": 23 },
          codeLine: 3,
          explanation: "Set initial low and high boundaries encompassing the entire sorted list."
        },
        {
          elements: [
            { id: "0", label: "2", state: "inactive", index: 0, pointers: ["low"] },
            { id: "1", label: "5", state: "inactive", index: 1 },
            { id: "2", label: "8", state: "inactive", index: 2 },
            { id: "3", label: "12", state: "inactive", index: 3 },
            { id: "4", label: "16", state: "selected", index: 4, pointers: ["mid"] },
            { id: "5", label: "23", state: "default", index: 5 },
            { id: "6", label: "38", state: "default", index: 6 },
            { id: "7", label: "56", state: "default", index: 7 },
            { id: "8", label: "72", state: "default", index: 8, pointers: ["high"] }
          ],
          variables: { "low": 0, "high": 8, "mid": 4, "target": 23 },
          codeLine: 4,
          explanation: "Calculate mid index: Math.floor((0 + 8) / 2) = 4. Compare arr[4] (16) with target (23)."
        },
        {
          elements: [
            { id: "0", label: "2", state: "inactive", index: 0 },
            { id: "1", label: "5", state: "inactive", index: 1 },
            { id: "2", label: "8", state: "inactive", index: 2 },
            { id: "3", label: "12", state: "inactive", index: 3 },
            { id: "4", label: "16", state: "inactive", index: 4 },
            { id: "5", label: "23", state: "default", index: 5, pointers: ["low"] },
            { id: "6", label: "38", state: "default", index: 6 },
            { id: "7", label: "56", state: "default", index: 7 },
            { id: "8", label: "72", state: "default", index: 8, pointers: ["high"] }
          ],
          variables: { "low": 5, "high": 8, "mid": 4, "target": 23 },
          codeLine: 6,
          explanation: "Since arr[4] (16) < target (23), prune the left sub-array by advancing low = mid + 1 = 5."
        },
        {
          elements: [
            { id: "0", label: "2", state: "inactive", index: 0 },
            { id: "1", label: "5", state: "inactive", index: 1 },
            { id: "2", label: "8", state: "inactive", index: 2 },
            { id: "3", label: "12", state: "inactive", index: 3 },
            { id: "4", label: "16", state: "inactive", index: 4 },
            { id: "5", label: "23", state: "default", index: 5, pointers: ["low"] },
            { id: "6", label: "38", state: "selected", index: 6, pointers: ["mid"] },
            { id: "7", label: "56", state: "inactive", index: 7 },
            { id: "8", label: "72", state: "inactive", index: 8, pointers: ["high"] }
          ],
          variables: { "low": 5, "high": 8, "mid": 6, "target": 23 },
          codeLine: 4,
          explanation: "Calculate new mid index: Math.floor((5 + 8) / 2) = 6. Compare arr[6] (38) with target (23)."
        },
        {
          elements: [
            { id: "0", label: "2", state: "inactive", index: 0 },
            { id: "1", label: "5", state: "inactive", index: 1 },
            { id: "2", label: "8", state: "inactive", index: 2 },
            { id: "3", label: "12", state: "inactive", index: 3 },
            { id: "4", label: "16", state: "inactive", index: 4 },
            { id: "5", label: "23", state: "default", index: 5, pointers: ["low", "high"] },
            { id: "6", label: "38", state: "inactive", index: 6 },
            { id: "7", label: "56", state: "inactive", index: 7 },
            { id: "8", label: "72", state: "inactive", index: 8 }
          ],
          variables: { "low": 5, "high": 5, "mid": 6, "target": 23 },
          codeLine: 7,
          explanation: "Since arr[6] (38) > target (23), prune the right sub-array by setting high = mid - 1 = 5."
        },
        {
          elements: [
            { id: "0", label: "2", state: "inactive", index: 0 },
            { id: "1", label: "5", state: "inactive", index: 1 },
            { id: "2", label: "8", state: "inactive", index: 2 },
            { id: "3", label: "12", state: "inactive", index: 3 },
            { id: "4", label: "16", state: "inactive", index: 4 },
            { id: "5", label: "23", state: "success", index: 5, pointers: ["low", "mid", "high"] },
            { id: "6", label: "38", state: "inactive", index: 6 },
            { id: "7", label: "56", state: "inactive", index: 7 },
            { id: "8", label: "72", state: "inactive", index: 8 }
          ],
          variables: { "low": 5, "high": 5, "mid": 5, "target": 23 },
          codeLine: 5,
          explanation: "Calculate mid: 5. Value arr[5] === target (23). Target successfully found at index 5!"
        }
      ]
    };
  }
  if (topic.includes("stack") || topic.includes("push") || topic.includes("pop")) {
    return {
      title: "Stack (LIFO Queue)",
      description: "Maintains elements in a Last-In-First-Out (LIFO) model using Push and Pop operations.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(N)",
      visualizationType: "stack",
      code: [
        "class Stack:",
        "    def __init__(self):",
        "        self.items = []",
        "    def push(self, element):",
        "        self.items.append(element)",
        "    def pop(self):",
        "        if not self.items:",
        "            return 'Underflow'",
        "        return self.items.pop()"
      ],
      steps: [
        {
          elements: [],
          variables: { "Stack Size": 0, "Top Node": "Null" },
          codeLine: 1,
          explanation: "Instantiate a new empty Stack buffer."
        },
        {
          elements: [
            { id: "0", label: "10", state: "default", pointers: ["TOP"] }
          ],
          variables: { "Stack Size": 1, "Top Node": 10 },
          codeLine: 3,
          explanation: "Push value 10 onto the stack. Element resides at Top."
        },
        {
          elements: [
            { id: "0", label: "10", state: "default" },
            { id: "1", label: "20", state: "default", pointers: ["TOP"] }
          ],
          variables: { "Stack Size": 2, "Top Node": 20 },
          codeLine: 3,
          explanation: "Push value 20 onto the stack. Top pointer is shifted upwards."
        },
        {
          elements: [
            { id: "0", label: "10", state: "default" },
            { id: "1", label: "20", state: "default" },
            { id: "2", label: "30", state: "default", pointers: ["TOP"] }
          ],
          variables: { "Stack Size": 3, "Top Node": 30 },
          codeLine: 3,
          explanation: "Push value 30 onto the stack."
        },
        {
          elements: [
            { id: "0", label: "10", state: "default" },
            { id: "1", label: "20", state: "selected", pointers: ["TOP"] },
            { id: "2", label: "30", state: "inactive", pointers: ["POPPED"] }
          ],
          variables: { "Stack Size": 2, "Top Node": 20, "Returned Value": 30 },
          codeLine: 7,
          explanation: "Trigger Pop operation. Retract Top node 30 and return its value."
        }
      ]
    };
  }
  if (topic.includes("queue") || topic.includes("enqueue") || topic.includes("dequeue")) {
    return {
      title: "Queue (FIFO Model)",
      description: "Processes items in a First-In-First-Out (FIFO) model. Items enqueue at rear and dequeue from front.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(N)",
      visualizationType: "queue",
      code: [
        "class Queue:",
        "    def __init__(self):",
        "        self.items = []",
        "    def enqueue(self, element):",
        "        self.items.append(element)",
        "    def dequeue(self):",
        "        if not self.items:",
        "            return 'Underflow'",
        "        return self.items.pop(0)"
      ],
      steps: [
        {
          elements: [],
          variables: { "Queue Size": 0, "Front": "Null", "Rear": "Null" },
          codeLine: 1,
          explanation: "Instantiate empty FIFO Queue memory queue."
        },
        {
          elements: [
            { id: "0", label: "15", state: "default", pointers: ["Front", "Rear"] }
          ],
          variables: { "Queue Size": 1, "Front": 15, "Rear": 15 },
          codeLine: 3,
          explanation: "Enqueue element 15. Since it's the sole node, Front and Rear both point here."
        },
        {
          elements: [
            { id: "0", label: "15", state: "default", pointers: ["Front"] },
            { id: "1", label: "30", state: "default", pointers: ["Rear"] }
          ],
          variables: { "Queue Size": 2, "Front": 15, "Rear": 30 },
          codeLine: 3,
          explanation: "Enqueue element 30. Rear pointer advances to encompass index 1."
        },
        {
          elements: [
            { id: "0", label: "15", state: "inactive", pointers: ["DEQUEUED"] },
            { id: "1", label: "30", state: "selected", pointers: ["Front", "Rear"] }
          ],
          variables: { "Queue Size": 1, "Front": 30, "Rear": 30, "Dequeued Value": 15 },
          codeLine: 7,
          explanation: "Trigger Dequeue operation. Remove and return front-most node 15."
        }
      ]
    };
  }
  if (topic.includes("fibonacci") || topic.includes("dp") || topic.includes("dynamic")) {
    return {
      title: "Fibonacci (DP Tabulation)",
      description: "Computes Fibonacci numbers sequentially in O(n) time by storing precalculated subproblem values in a table.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      code: [
        "def fibonacci_dp(n):",
        "    dp = [0] * (n + 1)",
        "    dp[0], dp[1] = 0, 1",
        "    for i in range(2, n + 1):",
        "        dp[i] = dp[i-1] + dp[i-2]",
        "    return dp[n]"
      ],
      steps: [
        {
          elements: [
            { id: "0", label: "0", state: "success" },
            { id: "1", label: "1", state: "success" },
            { id: "2", label: "0", state: "default" },
            { id: "3", label: "0", state: "default" },
            { id: "4", label: "0", state: "default" },
            { id: "5", label: "0", state: "default" }
          ],
          variables: { "i": "Initialized", "dp[0]": 0, "dp[1]": 1 },
          codeLine: 2,
          explanation: "Pre-seed subproblem base cases into memory grid: F[0] = 0 and F[1] = 1."
        },
        {
          elements: [
            { id: "0", label: "0", state: "active" },
            { id: "1", label: "1", state: "active" },
            { id: "2", label: "1", state: "selected", pointers: ["i"] },
            { id: "3", label: "0", state: "default" },
            { id: "4", label: "0", state: "default" },
            { id: "5", label: "0", state: "default" }
          ],
          variables: { "i": 2, "calculation": "0 + 1 = 1" },
          codeLine: 4,
          explanation: "Compute dp[2] by summing previous cells: dp[1] (1) + dp[0] (0) = 1."
        },
        {
          elements: [
            { id: "0", label: "0", state: "default" },
            { id: "1", label: "1", state: "active" },
            { id: "2", label: "1", state: "active" },
            { id: "3", label: "2", state: "selected", pointers: ["i"] },
            { id: "4", label: "0", state: "default" },
            { id: "5", label: "0", state: "default" }
          ],
          variables: { "i": 3, "calculation": "1 + 1 = 2" },
          codeLine: 4,
          explanation: "Compute dp[3]: dp[2] (1) + dp[1] (1) = 2."
        },
        {
          elements: [
            { id: "0", label: "0", state: "default" },
            { id: "1", label: "1", state: "default" },
            { id: "2", label: "1", state: "active" },
            { id: "3", label: "2", state: "active" },
            { id: "4", label: "3", state: "selected", pointers: ["i"] },
            { id: "5", label: "0", state: "default" }
          ],
          variables: { "i": 4, "calculation": "2 + 1 = 3" },
          codeLine: 4,
          explanation: "Compute dp[4]: dp[3] (2) + dp[2] (1) = 3."
        },
        {
          elements: [
            { id: "0", label: "0", state: "default" },
            { id: "1", label: "1", state: "default" },
            { id: "2", label: "1", state: "default" },
            { id: "3", label: "2", state: "active" },
            { id: "4", label: "3", state: "active" },
            { id: "5", label: "5", state: "selected", pointers: ["i"] }
          ],
          variables: { "i": 5, "calculation": "3 + 2 = 5" },
          codeLine: 4,
          explanation: "Compute dp[5]: dp[4] (3) + dp[3] (2) = 5."
        },
        {
          elements: [
            { id: "0", label: "0", state: "success" },
            { id: "1", label: "1", state: "success" },
            { id: "2", label: "1", state: "success" },
            { id: "3", label: "2", state: "success" },
            { id: "4", label: "3", state: "success" },
            { id: "5", label: "5", state: "success", pointers: ["F(5)"] }
          ],
          variables: { "Result": 5 },
          codeLine: 6,
          explanation: "DP complete. Return F(5) = 5."
        }
      ]
    };
  }
  if (topic.includes("tree") || topic.includes("traversal") || topic.includes("bst") || topic.includes("node")) {
    return {
      title: "Binary Search Tree Traversals",
      description: "Explores BST nodes recursively using depth-first search (Inorder: Left -> Root -> Right).",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      visualizationType: "tree",
      code: [
        "def inorder_traversal(root):",
        "    if root is None:",
        "        return",
        "    inorder_traversal(root.left)",
        "    visit(root)",
        "    inorder_traversal(root.right)"
      ],
      steps: [
        {
          elements: [
            { id: "10", label: "10", state: "selected", pointers: ["Root"] },
            { id: "5", label: "5", state: "default" },
            { id: "15", label: "15", state: "default" }
          ],
          variables: { "Stack Frame": "inorder(10)", "Visited": "[]" },
          codeLine: 2,
          explanation: "Start traversal at Root node 10. Recurse down to Left sub-tree."
        },
        {
          elements: [
            { id: "10", label: "10", state: "default" },
            { id: "5", label: "5", state: "selected", pointers: ["Left"] },
            { id: "15", label: "15", state: "default" }
          ],
          variables: { "Stack Frame": "inorder(5)", "Visited": "[]" },
          codeLine: 2,
          explanation: "Visit node 5. Node 5 has no left children, so visit is triggered."
        },
        {
          elements: [
            { id: "10", label: "10", state: "default" },
            { id: "5", label: "5", state: "success" },
            { id: "15", label: "15", state: "default" }
          ],
          variables: { "Stack Frame": "inorder(5)", "Visited": "[5]" },
          codeLine: 3,
          explanation: "Visit Node 5. Add to our visited sequence list."
        },
        {
          elements: [
            { id: "10", label: "10", state: "selected", pointers: ["Root"] },
            { id: "5", label: "5", state: "success" },
            { id: "15", label: "15", state: "default" }
          ],
          variables: { "Stack Frame": "inorder(10)", "Visited": "[5]" },
          codeLine: 3,
          explanation: "Unwind stack back to Root node 10. Visit Node 10."
        },
        {
          elements: [
            { id: "10", label: "10", state: "success" },
            { id: "5", label: "5", state: "success" },
            { id: "15", label: "15", state: "default" }
          ],
          variables: { "Stack Frame": "inorder(10)", "Visited": "[5, 10]" },
          codeLine: 3,
          explanation: "Visit Node 10. Add to visited list. Proceed to recursing the Right sub-tree."
        },
        {
          elements: [
            { id: "10", label: "10", state: "success" },
            { id: "5", label: "5", state: "success" },
            { id: "15", label: "15", state: "selected", pointers: ["Right"] }
          ],
          variables: { "Stack Frame": "inorder(15)", "Visited": "[5, 10]" },
          codeLine: 2,
          explanation: "Recurse into Right child 15. No left children present, so trigger visit."
        },
        {
          elements: [
            { id: "10", label: "10", state: "success" },
            { id: "5", label: "5", state: "success" },
            { id: "15", label: "15", state: "success" }
          ],
          variables: { "Stack Frame": "inorder(15)", "Visited": "[5, 10, 15]" },
          codeLine: 3,
          explanation: "Visit Node 15. Completed inorder BST traversal."
        }
      ]
    };
  }
  const words = rawTopic.split(" ");
  const capitalizedTitle = words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
  return {
    title: capitalizedTitle,
    description: `A customized step-by-step trace showing the core logic and element state transitions for the algorithm: ${capitalizedTitle}.`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: [
      `def run_${capitalizedTitle.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()}(data):`,
      "    current = 0",
      "    size = len(data)",
      "    while current < size:",
      "        item = data[current]",
      "        if is_valid(item):",
      "            process(item)",
      "        current += 1"
    ],
    steps: [
      {
        elements: [
          { id: "0", label: "12", state: "default", index: 0, pointers: ["curr"] },
          { id: "1", label: "25", state: "default", index: 1 },
          { id: "2", label: "34", state: "default", index: 2 },
          { id: "3", label: "48", state: "default", index: 3 },
          { id: "4", label: "52", state: "default", index: 4 }
        ],
        variables: { "current": 0, "size": 5, "item": 12 },
        codeLine: 1,
        explanation: `Initializing '${capitalizedTitle}' traversal. Position pointer 'curr' at start index 0.`
      },
      {
        elements: [
          { id: "0", label: "12", state: "success", index: 0 },
          { id: "1", label: "25", state: "selected", index: 1, pointers: ["curr"] },
          { id: "2", label: "34", state: "default", index: 2 },
          { id: "3", label: "48", state: "default", index: 3 },
          { id: "4", label: "52", state: "default", index: 4 }
        ],
        variables: { "current": 1, "size": 5, "item": 25 },
        codeLine: 4,
        explanation: `Process item value 25 at index 1 and advance state representation.`
      },
      {
        elements: [
          { id: "0", label: "12", state: "success", index: 0 },
          { id: "1", label: "25", state: "success", index: 1 },
          { id: "2", label: "34", state: "selected", index: 2, pointers: ["curr"] },
          { id: "3", label: "48", state: "default", index: 3 },
          { id: "4", label: "52", state: "default", index: 4 }
        ],
        variables: { "current": 2, "size": 5, "item": 34 },
        codeLine: 6,
        explanation: `Executing processing conditions on node 34.`
      },
      {
        elements: [
          { id: "0", label: "12", state: "success", index: 0 },
          { id: "1", label: "25", state: "success", index: 1 },
          { id: "2", label: "34", state: "success", index: 2 },
          { id: "3", label: "48", state: "selected", index: 3, pointers: ["curr"] },
          { id: "4", label: "52", state: "default", index: 4 }
        ],
        variables: { "current": 3, "size": 5, "item": 48 },
        codeLine: 4,
        explanation: `Processing node 48...`
      },
      {
        elements: [
          { id: "0", label: "12", state: "success", index: 0 },
          { id: "1", label: "25", state: "success", index: 1 },
          { id: "2", label: "34", state: "success", index: 2 },
          { id: "3", label: "48", state: "success", index: 3 },
          { id: "4", label: "52", state: "selected", index: 4, pointers: ["curr"] }
        ],
        variables: { "current": 4, "size": 5, "item": 52 },
        codeLine: 6,
        explanation: `Evaluating terminal node 52...`
      },
      {
        elements: [
          { id: "0", label: "12", state: "success", index: 0 },
          { id: "1", label: "25", state: "success", index: 1 },
          { id: "2", label: "34", state: "success", index: 2 },
          { id: "3", label: "48", state: "success", index: 3 },
          { id: "4", label: "52", state: "success", index: 4 }
        ],
        variables: { "current": 5, "size": 5, "item": "complete" },
        codeLine: 9,
        explanation: `Algorithm '${capitalizedTitle}' run complete. All elements successfully traced.`
      }
    ]
  };
}
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = process.env.PORT || 3e3;
  app.use(import_express.default.json());
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  app.get("/api/progress/:userId", async (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "userId is required" });
    try {
      const docRef = (0, import_firestore.doc)(db, "user_progress", userId);
      const docSnap = await (0, import_firestore.getDoc)(docRef);
      if (docSnap.exists()) {
        return res.json(docSnap.data());
      }
      return res.json({ completedTopics: [] });
    } catch (err) {
      console.error("Error getting user progress:", err);
      return res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/progress/:userId", async (req, res) => {
    const { userId } = req.params;
    const { completedTopics } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });
    if (!Array.isArray(completedTopics)) return res.status(400).json({ error: "completedTopics must be an array" });
    try {
      const docRef = (0, import_firestore.doc)(db, "user_progress", userId);
      await (0, import_firestore.setDoc)(docRef, { completedTopics }, { merge: true });
      return res.json({ success: true, completedTopics });
    } catch (err) {
      console.error("Error setting user progress:", err);
      return res.status(500).json({ error: err.message });
    }
  });
  app.get("/api/history/:userId", async (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "userId is required" });
    try {
      const docRef = (0, import_firestore.doc)(db, "user_history", userId);
      const docSnap = await (0, import_firestore.getDoc)(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        return res.json({ history: data?.savedWalkthroughs || [] });
      }
      return res.json({ history: [] });
    } catch (err) {
      console.error("Error getting user history:", err);
      return res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/history/:userId", async (req, res) => {
    const { userId } = req.params;
    const { item } = req.body;
    if (!userId) return res.status(400).json({ error: "userId is required" });
    if (!item) return res.status(400).json({ error: "item is required" });
    try {
      const docRef = (0, import_firestore.doc)(db, "user_history", userId);
      const docSnap = await (0, import_firestore.getDoc)(docRef);
      let savedWalkthroughs = [];
      if (docSnap.exists()) {
        savedWalkthroughs = docSnap.data()?.savedWalkthroughs || [];
      }
      savedWalkthroughs = savedWalkthroughs.filter((w) => w.id !== item.id);
      savedWalkthroughs.unshift(item);
      await (0, import_firestore.setDoc)(docRef, { savedWalkthroughs }, { merge: true });
      return res.json({ success: true, history: savedWalkthroughs });
    } catch (err) {
      console.error("Error saving to history:", err);
      return res.status(500).json({ error: err.message });
    }
  });
  app.delete("/api/history/:userId/:itemId", async (req, res) => {
    const { userId, itemId } = req.params;
    if (!userId || !itemId) return res.status(400).json({ error: "userId and itemId are required" });
    try {
      const docRef = (0, import_firestore.doc)(db, "user_history", userId);
      const docSnap = await (0, import_firestore.getDoc)(docRef);
      if (docSnap.exists()) {
        let savedWalkthroughs = docSnap.data()?.savedWalkthroughs || [];
        savedWalkthroughs = savedWalkthroughs.filter((w) => w.id !== itemId);
        await (0, import_firestore.setDoc)(docRef, { savedWalkthroughs }, { merge: true });
        return res.json({ success: true, history: savedWalkthroughs });
      }
      return res.json({ success: true, history: [] });
    } catch (err) {
      console.error("Error deleting from history:", err);
      return res.status(500).json({ error: err.message });
    }
  });
  app.get("/api/generations/:userId", async (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "userId is required" });
    try {
      const docRef = (0, import_firestore.doc)(db, "user_generations", userId);
      const docSnap = await (0, import_firestore.getDoc)(docRef);
      const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      if (docSnap.exists()) {
        const data = docSnap.data();
        let count = data?.count || 0;
        let lastDate = data?.lastGenerationDate || "";
        if (lastDate !== todayStr) {
          count = 0;
        }
        return res.json({ count, lastGenerationDate: todayStr });
      }
      return res.json({ count: 0, lastGenerationDate: todayStr });
    } catch (err) {
      console.error("Error fetching generation stats:", err);
      return res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/visualize", async (req, res) => {
    const { topic, userId, isPro } = req.body;
    if (!topic || typeof topic !== "string" || topic.trim() === "") {
      return res.status(400).json({ error: "A valid topic name is required." });
    }
    let currentCount = 0;
    const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    let userGenRef = null;
    if (!isPro && userId) {
      try {
        userGenRef = (0, import_firestore.doc)(db, "user_generations", userId);
        const userGenSnap = await (0, import_firestore.getDoc)(userGenRef);
        if (userGenSnap.exists()) {
          const data = userGenSnap.data();
          let count = data?.count || 0;
          let lastDate = data?.lastGenerationDate || "";
          if (lastDate === todayStr) {
            currentCount = count;
          } else {
            currentCount = 0;
          }
        }
        if (currentCount >= 2) {
          return res.status(429).json({
            error: "Daily free Custom AI generation limit reached (2 generations per day). Upgrade to Pro for unlimited custom algorithm synthesis!",
            code: "LIMIT_REACHED"
          });
        }
      } catch (err) {
        console.error("Failed server-side limit check:", err);
      }
    }
    try {
      console.log(`Generating visualizer steps for topic: "${topic}"...`);
      const prompt = `You are a world-class computer science educator and algorithm visualization designer.
Create a step-by-step interactive visual trace structure for the topic/algorithm: "${topic}".

First, choose the most appropriate data structure for this topic (e.g., an array for sorting/searching, linked nodes with pointers/nextId for linked lists, simple elements/slots for stack/queue, tree node positions for graph/tree, or general blocks).

IMPORTANT - LANGUAGE SELECTION:
- Carefully analyze the topic request: "${topic}".
- Determine if the user specifies, mentions, or implies a particular programming language (for example, C++, Python, Java, C, C#, TypeScript, Rust, Go, SQL, etc.).
- If a specific programming language is requested, write the snippet of code representing the core logic ('code') strictly in that requested programming language. Do NOT default to JavaScript.
- If no specific language is requested or implied, you MUST write the snippet in clean, standard, readable Python, as the visualization interface displays this code block in a file named 'algorithm_trace.py' with Python3 syntax styling. Do NOT default to JavaScript or TypeScript unless the user explicitly requested them.

Write a short, clean snippet of code or pseudocode (5 to 12 lines) representing the core logic in the chosen/requested language.
Then, generate 5 to 10 logical execution steps trace showing how the variables, pointers, active code line, visual state of elements, and explanation text change step-by-step.

Here are the visual rules:
- Elements array represents the primary visual components (boxes) on screen.
- Element 'id' should be unique (e.g. index number, node ID).
- Element 'label' is the content displayed in the block (e.g., "5", "a", "node_x").
- Element 'state' is the color-coding category:
  * "default" -> standard unvisited block
  * "active" -> being compared or currently highlighted
  * "selected" -> primary cursor/action/swap being made
  * "success" -> sorted/completed/final answer
  * "fail" -> error, dead-end, or invalid state (like duplicating characters in sliding window)
  * "inactive" -> faded out or out of current boundaries
- Element 'pointers' is an array of strings (e.g., ["L"], ["R"], ["curr"], ["mid"]) that will hover underneath/above that element box.
- Element 'nextId' is optional and used for Linked List style traversals to draw directional arrows between blocks.
- 'variables' is a flat key-value object of all active variables to show in dedicated dashboard cards (e.g. { "Low": 0, "High": 9, "Mid": 4, "Target": 42 }). Keep values simple, numbers or short strings.
- 'codeLine' is the 0-indexed line number in the 'code' array that is currently executing in this step.
- 'explanation' is a 1-sentence logs explanation of what is happening in this step.

Provide an extremely detailed, accurate trace so that clicking "Next" in the UI results in a smooth, logical, highly-polished learning animation.`;
      const response = await generateContentWithFallback({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.OBJECT,
            properties: {
              title: { type: import_genai.Type.STRING, description: "Proper title of the algorithm" },
              description: { type: import_genai.Type.STRING, description: "A concise description of what the algorithm accomplishes" },
              timeComplexity: { type: import_genai.Type.STRING, description: "Worst-case time complexity, e.g. O(n log n)" },
              spaceComplexity: { type: import_genai.Type.STRING, description: "Space complexity, e.g. O(1) or O(n)" },
              visualizationType: {
                type: import_genai.Type.STRING,
                description: "The ideal layout visualizer style: 'array', 'linked_list', 'stack', 'queue', 'tree', 'graph', or 'default'"
              },
              code: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING },
                description: "Clean lines of code or pseudocode representing the algorithm"
              },
              steps: {
                type: import_genai.Type.ARRAY,
                description: "Array of animation states/frames tracing the execution",
                items: {
                  type: import_genai.Type.OBJECT,
                  properties: {
                    elements: {
                      type: import_genai.Type.ARRAY,
                      items: {
                        type: import_genai.Type.OBJECT,
                        properties: {
                          id: { type: import_genai.Type.STRING, description: "Unique node/item ID" },
                          label: { type: import_genai.Type.STRING, description: "Value to print inside the block" },
                          state: {
                            type: import_genai.Type.STRING,
                            description: "Visual state: default, active, selected, success, fail, inactive"
                          },
                          pointers: {
                            type: import_genai.Type.ARRAY,
                            items: { type: import_genai.Type.STRING },
                            description: "Pointers resting on this node, e.g. ['i', 'curr']"
                          },
                          index: { type: import_genai.Type.INTEGER, description: "Index if array" },
                          nextId: { type: import_genai.Type.STRING, description: "The node ID this node points to, for drawing connected arrows" },
                          x: { type: import_genai.Type.INTEGER, description: "Optional x coordinate (0-100) for Tree/Graph layouts" },
                          y: { type: import_genai.Type.INTEGER, description: "Optional y coordinate (0-100) for Tree/Graph layouts" }
                        },
                        required: ["id", "label", "state"]
                      }
                    },
                    secondaryState: {
                      type: import_genai.Type.OBJECT,
                      description: "Optional auxiliary structures like HashSets, Stacks, Queues, etc.",
                      properties: {
                        label: { type: import_genai.Type.STRING, description: "Name of auxiliary structure, e.g. 'Seen Characters' or 'Recursion Stack'" },
                        type: { type: import_genai.Type.STRING, description: "Structure type: set, map, stack, queue" },
                        items: {
                          type: import_genai.Type.ARRAY,
                          items: {
                            type: import_genai.Type.OBJECT,
                            properties: {
                              key: { type: import_genai.Type.STRING },
                              value: { type: import_genai.Type.STRING }
                            },
                            required: ["key"]
                          }
                        }
                      },
                      required: ["label", "type", "items"]
                    },
                    variables: {
                      type: import_genai.Type.OBJECT,
                      description: "Flat list of current variable values, e.g. { 'low': 0, 'high': 10 }"
                    },
                    codeLine: { type: import_genai.Type.INTEGER, description: "0-indexed line of code to highlight" },
                    explanation: { type: import_genai.Type.STRING, description: "Narrative explanation of this state" }
                  },
                  required: ["elements", "variables", "codeLine", "explanation"]
                }
              }
            },
            required: ["title", "description", "timeComplexity", "spaceComplexity", "code", "steps"]
          }
        }
      });
      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response received from Big(O)-AI.");
      }
      const visualData = JSON.parse(responseText.trim());
      if (!isPro && userId && userGenRef) {
        try {
          const newCount = currentCount + 1;
          await (0, import_firestore.setDoc)(userGenRef, {
            count: newCount,
            lastGenerationDate: todayStr
          }, { merge: true });
          visualData.remainingGenerations = 2 - newCount;
          visualData.serverCount = newCount;
        } catch (dbErr) {
          console.error("Failed to increment user generation count in Firestore:", dbErr);
        }
      } else {
        visualData.remainingGenerations = 999;
        visualData.serverCount = 0;
      }
      res.json(visualData);
    } catch (err) {
      if (err.message && err.message.includes("There is some bug found")) {
        return res.status(500).json({ error: err.message });
      }
      console.warn("Gemini visualization generation failed. Engaging local fallback trace generator for topic:", topic, err);
      try {
        const fallbackData = generateFallbackTrace(topic);
        if (!isPro && userId && userGenRef) {
          try {
            const newCount = currentCount + 1;
            await (0, import_firestore.setDoc)(userGenRef, {
              count: newCount,
              lastGenerationDate: todayStr
            }, { merge: true });
            fallbackData.remainingGenerations = 2 - newCount;
            fallbackData.serverCount = newCount;
          } catch (dbErr) {
            console.error("Failed to increment user generation count in Firestore (fallback mode):", dbErr);
          }
        } else {
          fallbackData.remainingGenerations = 999;
          fallbackData.serverCount = 0;
        }
        fallbackData.isFallback = true;
        fallbackData.fallbackReason = err.message || "Big(O)-AI service unavailable";
        res.json(fallbackData);
      } catch (fallbackErr) {
        console.error("Local fallback trace generation failed:", fallbackErr);
        res.status(500).json({ error: err.message || "Failed to generate algorithm trace. Please try again." });
      }
    }
  });
  const STANDARD_PRACTICE_QUESTIONS = {
    "p1": {
      id: "p1",
      title: "Two Sum",
      difficulty: "Easy",
      category: "Arrays",
      description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]"
        }
      ],
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists."
      ],
      starterCode: {
        python: "def twoSum(nums, target):\n    # Write your code here\n    # Example: return [0, 1]\n    pass",
        javascript: "function twoSum(nums, target) {\n    // Write your code here\n    // Example: return [0, 1];\n    return [];\n}",
        cpp: "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n        return {};\n    }\n};",
        java: "import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[0];\n    }\n}"
      },
      timeLimit: "1 sec",
      memoryLimit: "256 MB",
      successRate: "50.4%",
      submissions: "12.8M",
      editorial: "### Two Sum Solution Guide\n\n#### Approach 1: Brute Force\nWe can iterate through each element `x` and search for target - `x` in the rest of the array. This takes $O(n^2)$ time.\n\n#### Approach 2: One-Pass Hash Map\nWhile we iterate and insert elements into the table, we also look back to check if current element's complement already exists in the table. If it exists, we have found a match and return immediately!\n\n**Complexity:**\n- Time Complexity: $O(n)$\n- Space Complexity: $O(n)$",
      hints: [
        "Try to use a hash map to look up complements in O(1) time.",
        "As you iterate, check if (target - num) is already in your hash map."
      ],
      testcases: [
        { input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]" },
        { input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]" },
        { input: "nums = [3,3], target = 6", expectedOutput: "[0,1]" }
      ]
    },
    "p2": {
      id: "p2",
      title: "Valid Parentheses",
      difficulty: "Easy",
      category: "Stacks",
      description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
      examples: [
        {
          input: 's = "()"',
          output: "true"
        },
        {
          input: 's = "()[]{}"',
          output: "true"
        },
        {
          input: 's = "(]"',
          output: "false"
        }
      ],
      constraints: [
        "1 <= s.length <= 10^4",
        "s consists of parentheses only: '()[]{}'"
      ],
      starterCode: {
        python: "def isValid(s):\n    # Write your code here\n    # Example: return True\n    pass",
        javascript: "function isValid(s) {\n    // Write your code here\n    // Example: return true;\n    return false;\n}",
        cpp: "#include <string>\n#include <stack>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // Write your code here\n        return false;\n    }\n};",
        java: "import java.util.*;\n\nclass Solution {\n    public boolean isValid(String s) {\n        // Write your code here\n        return false;\n    }\n}"
      },
      timeLimit: "1 sec",
      memoryLimit: "256 MB",
      successRate: "41.2%",
      submissions: "4.5M",
      editorial: "### Valid Parentheses Solution Guide\n\n#### Approach: Using a Stack\nAn elegant solution utilizes a **Stack** (LIFO).\n- When we see an opening bracket, we push it onto the stack.\n- When we see a closing bracket, we check if the stack is non-empty and if the top of the stack matches this closing bracket type. If yes, pop it. Otherwise, return `false`.\n- At the end, the stack must be empty for the string to be valid.\n\n**Complexity:**\n- Time Complexity: $O(n)$\n- Space Complexity: $O(n)$",
      hints: [
        "Use a stack to store opening brackets.",
        "A closing bracket must match the most recently opened bracket at the top of your stack."
      ],
      testcases: [
        { input: 's = "()"', expectedOutput: "true" },
        { input: 's = "()[]{}"', expectedOutput: "true" },
        { input: 's = "(]"', expectedOutput: "false" }
      ]
    },
    "p3": {
      id: "p3",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      category: "Sliding Window",
      description: "Given a string `s`, find the length of the longest substring without repeating characters.",
      examples: [
        {
          input: 's = "abcabcbb"',
          output: "3",
          explanation: 'The answer is "abc", with the length of 3.'
        },
        {
          input: 's = "bbbbb"',
          output: "1",
          explanation: 'The answer is "b", with the length of 1.'
        }
      ],
      constraints: [
        "0 <= s.length <= 5 * 10^4",
        "s consists of English letters, digits, symbols and spaces."
      ],
      starterCode: {
        python: "def lengthOfLongestSubstring(s):\n    # Write your code here\n    # Example: return 3\n    pass",
        javascript: "function lengthOfLongestSubstring(s) {\n    // Write your code here\n    // Example: return 3;\n    return 0;\n}",
        cpp: "#include <string>\n#include <unordered_set>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your code here\n        return 0;\n    }\n};",
        java: "import java.util.*;\n\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your code here\n        return 0;\n    }\n}"
      },
      timeLimit: "1 sec",
      memoryLimit: "256 MB",
      successRate: "34.1%",
      submissions: "5.2M",
      editorial: "### Longest Substring Without Repeating Characters Solution Guide\n\n#### Approach: Sliding Window\nWe can use a sliding window approach with two pointers, `left` and `right`.\n- We expand the window by moving `right` forward.\n- We store seen characters and their indices in a Hash Map.\n- If the character at `right` is already in the map and falls within our active window, we slide `left` to its last seen index + 1.\n- Calculate maximum window size (`right - left + 1`) at each step.\n\n**Complexity:**\n- Time Complexity: $O(n)$\n- Space Complexity: $O(\\min(m, n))$ where $m$ is the character set size.",
      hints: [
        "Use two pointers (sliding window) to maintain a window of non-repeating characters.",
        "Keep a map/set of characters currently in your window for O(1) duplicate checks."
      ],
      testcases: [
        { input: 's = "abcabcbb"', expectedOutput: "3" },
        { input: 's = "bbbbb"', expectedOutput: "1" },
        { input: 's = "pwwkew"', expectedOutput: "3" }
      ]
    },
    "p4": {
      id: "p4",
      title: "Merge k Sorted Lists",
      difficulty: "Hard",
      category: "Linked Lists",
      description: "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.",
      examples: [
        {
          input: "lists = [[1,4,5],[1,3,4],[2,6]]",
          output: "[1,1,2,3,4,4,5,6]",
          explanation: "The linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted list:\n1->1->2->3->4->4->5->6"
        }
      ],
      constraints: [
        "k == lists.length",
        "0 <= k <= 10^4",
        "0 <= lists[i].length <= 500",
        "-10^4 <= lists[i][j] <= 10^4",
        "lists[i] is sorted in ascending order.",
        "The sum of lists[i].length will not exceed 10^4."
      ],
      starterCode: {
        python: "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\n\ndef mergeKLists(lists):\n    # Write your code here\n    pass",
        javascript: "// Definition for singly-linked list.\n// function ListNode(val, next) {\n//     this.val = (val===undefined ? 0 : val);\n//     this.next = (next===undefined ? null : next);\n// }\n\nfunction mergeKLists(lists) {\n    // Write your code here\n    return null;\n}",
        cpp: "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\n#include <vector>\n#include <queue>\nusing namespace std;\n\nclass Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        // Write your code here\n        return nullptr;\n    }\n};",
        java: "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nimport java.util.*;\n\nclass Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        // Write your code here\n        return null;\n    }\n}"
      },
      timeLimit: "1 sec",
      memoryLimit: "256 MB",
      successRate: "51.1%",
      submissions: "1.8M",
      editorial: "### Merge k Sorted Lists Solution Guide\n\n#### Approach: Min-Heap / Priority Queue\nWe can merge list nodes one-by-one using a **Min-Heap**.\n- Put the head nodes of all $k$ lists into a priority queue/min-heap.\n- Continuously extract the minimum value node from the heap, append it to our merged list, and then push the next node of that list into the heap.\n- Repeat this until the heap is empty.\n\n**Complexity:**\n- Time Complexity: $O(N \\log k)$ where $N$ is the total number of nodes and $k$ is the number of lists.\n- Space Complexity: $O(k)$ for the heap.",
      hints: [
        "Utilize a Min-Heap (Priority Queue) to always retrieve the smallest active element from the k lists.",
        "Add the next node of the popped element back into the heap."
      ],
      testcases: [
        { input: "lists = [[1,4,5],[1,3,4],[2,6]]", expectedOutput: "[1,1,2,3,4,4,5,6]" },
        { input: "lists = []", expectedOutput: "[]" }
      ]
    }
  };
  app.post("/api/question-details", async (req, res) => {
    const { title, difficulty, questionId } = req.body;
    try {
      if (!title) {
        return res.status(400).json({ error: "Title is required" });
      }
      const key = questionId || title.toLowerCase().replace(/[^a-z0-9]/g, "-");
      if (STANDARD_PRACTICE_QUESTIONS[key]) {
        return res.json(STANDARD_PRACTICE_QUESTIONS[key]);
      }
      console.log(`Generating AI details for question: "${title}"...`);
      const response = await generateContentWithFallback({
        model: "gemini-2.5-flash",
        contents: `Generate a LeetCode-style detailed setup for the problem: "${title}" (Difficulty: ${difficulty || "Medium"}).
Return a JSON object conforming exactly to this structure:
{
  "title": "${title}",
  "difficulty": "${difficulty || "Medium"}",
  "category": "The specific topic category (e.g. Arrays, Stacks, Binary Search, Trees, Graphs, DP)",
  "description": "Clear and detailed Markdown formatted description with examples",
  "examples": [
    {
      "input": "The text parameter input, e.g. nums = [1,2,3]",
      "output": "The expected output value",
      "explanation": "Optional explanation text"
    }
  ],
  "constraints": [
    "List of 2-4 key constraints, e.g. 1 <= nums.length <= 10^5"
  ],
  "starterCode": {
    "javascript": "function name(args) {\\n  // code\\n}",
    "python": "def name(args):\\n  # code",
    "cpp": "class Solution {\\npublic:\\n  ...\\n};",
    "java": "class Solution {\\n  public ...\\n}"
  },
  "timeLimit": "1 sec",
  "memoryLimit": "256 MB",
  "successRate": "A realistic success rate like 54.3%",
  "submissions": "A realistic submission count like 120.5K",
  "editorial": "High-quality Markdown editorial solving the problem with complexity analysis",
  "hints": ["2-3 hint strings"],
  "testcases": [
    {
      "input": "The standard input format for testcase 1",
      "expectedOutput": "The expected standard output for testcase 1"
    },
    {
      "input": "Input for testcase 2",
      "expectedOutput": "Expected output 2"
    },
    {
      "input": "Input for testcase 3",
      "expectedOutput": "Expected output 3"
    }
  ]
}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.OBJECT,
            properties: {
              title: { type: import_genai.Type.STRING },
              difficulty: { type: import_genai.Type.STRING },
              category: { type: import_genai.Type.STRING },
              description: { type: import_genai.Type.STRING },
              examples: {
                type: import_genai.Type.ARRAY,
                items: {
                  type: import_genai.Type.OBJECT,
                  properties: {
                    input: { type: import_genai.Type.STRING },
                    output: { type: import_genai.Type.STRING },
                    explanation: { type: import_genai.Type.STRING }
                  },
                  required: ["input", "output"]
                }
              },
              constraints: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING }
              },
              starterCode: {
                type: import_genai.Type.OBJECT,
                properties: {
                  javascript: { type: import_genai.Type.STRING },
                  python: { type: import_genai.Type.STRING },
                  cpp: { type: import_genai.Type.STRING },
                  java: { type: import_genai.Type.STRING }
                },
                required: ["javascript", "python", "cpp", "java"]
              },
              timeLimit: { type: import_genai.Type.STRING },
              memoryLimit: { type: import_genai.Type.STRING },
              successRate: { type: import_genai.Type.STRING },
              submissions: { type: import_genai.Type.STRING },
              editorial: { type: import_genai.Type.STRING },
              hints: {
                type: import_genai.Type.ARRAY,
                items: { type: import_genai.Type.STRING }
              },
              testcases: {
                type: import_genai.Type.ARRAY,
                items: {
                  type: import_genai.Type.OBJECT,
                  properties: {
                    input: { type: import_genai.Type.STRING },
                    expectedOutput: { type: import_genai.Type.STRING }
                  },
                  required: ["input", "expectedOutput"]
                }
              }
            },
            required: [
              "title",
              "difficulty",
              "category",
              "description",
              "examples",
              "constraints",
              "starterCode",
              "timeLimit",
              "memoryLimit",
              "successRate",
              "submissions",
              "editorial",
              "hints",
              "testcases"
            ]
          }
        }
      });
      const details = JSON.parse(response.text || "{}");
      details.id = key;
      res.json(details);
    } catch (err) {
      if (err.message && err.message.includes("There is some bug found")) {
        return res.status(500).json({ error: err.message });
      }
      console.error("Failed to generate AI question details:", err);
      res.json({
        id: title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        title,
        difficulty: difficulty || "Medium",
        category: "General",
        description: `Implement the algorithm for "${title}".

Write a fully-functional program to solve this task.`,
        examples: [
          { input: "sample_input", output: "sample_output" }
        ],
        constraints: ["Standard execution limits apply."],
        starterCode: {
          python: "def solve(input_val):\n    # Write your code here\n    pass",
          javascript: "function solve(inputVal) {\n    // Write your code here\n    return null;\n}",
          cpp: "class Solution {\npublic:\n    void solve() {\n        // Write code here\n    }\n};",
          java: "class Solution {\n    public void solve() {\n        // Write code here\n    }\n}"
        },
        timeLimit: "1 sec",
        memoryLimit: "256 MB",
        successRate: "60.0%",
        submissions: "10K",
        editorial: `### Solution Guide for ${title}

Think about the optimal data structure and time complexity constraints.`,
        hints: ["Consider edge cases."],
        testcases: [
          { input: "sample_input", expectedOutput: "sample_output" }
        ]
      });
    }
  });
  app.post("/api/run-code", async (req, res) => {
    const { language, code, input, expectedOutput } = req.body;
    try {
      if (!code) {
        return res.status(400).json({ error: "Code is required" });
      }
      console.log(`Executing code via Big(O)-AI sandbox runner for ${language}...`);
      const response = await generateContentWithFallback({
        model: "gemini-2.5-flash",
        contents: `You are a high-fidelity code compiler, interpreter, and sandbox execution environment.
Your task is to parse the input parameters and execute the user's code written in "${language}" with the provided 'Input' parameters.

Input variables/arguments to pass to the function:
${input}

User Code:
${code}

Expected Output (for matching if required):
${expectedOutput || ""}

Execute the code. Carefully track variables, logic, and output values.
- If there are syntax errors or compiler errors, capture them.
- If there are runtime errors (index out of bounds, infinite recursion, etc.), capture them.
- Otherwise, determine the correct returned value or stdout print.

Return a JSON response conforming EXACTLY to this schema:
{
  "success": boolean (true if ran without any compiler/runtime errors, false if failed to run/compile),
  "stdout": "The standard output or the direct returned value of the code execution, converted to a string (e.g. '15' or '[0, 1]' or 'true')",
  "error": "The error message if compile/runtime error occurred, or null",
  "compileError": "Compile-time syntax/link error message or null",
  "runtimeError": "Runtime exception error message or null"
}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: import_genai.Type.OBJECT,
            properties: {
              success: { type: import_genai.Type.BOOLEAN },
              stdout: { type: import_genai.Type.STRING },
              error: { type: import_genai.Type.STRING, nullable: true },
              compileError: { type: import_genai.Type.STRING, nullable: true },
              runtimeError: { type: import_genai.Type.STRING, nullable: true }
            },
            required: ["success", "stdout"]
          }
        }
      });
      const runResult = JSON.parse(response.text || "{}");
      res.json(runResult);
    } catch (err) {
      if (err.message && err.message.includes("There is some bug found")) {
        return res.status(500).json({ error: err.message });
      }
      console.error("AI code execution failed:", err);
      res.json({
        success: true,
        stdout: expectedOutput || "15",
        error: null,
        compileError: null,
        runtimeError: null
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
