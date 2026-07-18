export interface Lesson {
  id: string;
  title: string;
  completed: boolean;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  desc: string;
  time: string;
  space: string;
  input: string;
  explanation: string;
}

export interface RealWorldApp {
  title: string;
  desc: string;
  icon: string;
  color: string;
}

export interface RelatedTopic {
  title: string;
  key: string;
}

export interface TopicDetailConfig {
  key: string;
  title: string;
  icon: string;
  desc: string;
  lessons: {
    fundamentals: Lesson[];
    operations: Lesson[];
    searching: Lesson[];
    advanced: Lesson[];
  };
  visualizerPreset: string;
  codeSnippets: {
    [op: string]: {
      python: string;
      java: string;
      cpp: string;
      javascript: string;
    }
  };
  practiceProblems: Problem[];
  realWorldApps: RealWorldApp[];
  relatedTopics: RelatedTopic[];
}

export const topicConfigs: { [key: string]: TopicDetailConfig } = {
  arrays: {
    key: "arrays",
    title: "Arrays",
    icon: "Code",
    desc: "Master array operations, searching, traversal, and problem solving.",
    lessons: {
      fundamentals: [
        { id: "fund_1", title: "What is an Array?", completed: true },
        { id: "fund_2", title: "Memory Representation", completed: true },
        { id: "fund_3", title: "Time Complexity", completed: false },
      ],
      operations: [
        { id: "oper_1", title: "Traversal", completed: false },
        { id: "oper_2", title: "Insertion", completed: false },
        { id: "oper_3", title: "Deletion", completed: false },
        { id: "oper_4", title: "Updating Elements", completed: false },
      ],
      searching: [
        { id: "search_1", title: "Linear Search", completed: false },
        { id: "search_2", title: "Binary Search", completed: false },
      ],
      advanced: [
        { id: "adv_1", title: "Prefix Sum", completed: false },
        { id: "adv_2", title: "Kadane's Algorithm", completed: false },
        { id: "adv_3", title: "Sliding Window Basics", completed: false },
      ]
    },
    visualizerPreset: "1, 5, 8, 10, 20",
    codeSnippets: {
      insert: {
        python: `def insert_at_index(arr, value, idx):\n    n = len(arr)\n    new_arr = [None] * (n + 1)\n    for i in range(idx):\n        new_arr[i] = arr[i]\n    new_arr[idx] = value\n    for i in range(idx, n):\n        new_arr[i + 1] = arr[i]\n    return new_arr`,
        java: `public int[] insertAtIndex(int[] arr, int value, int idx) {\n    int n = arr.length;\n    int[] newArr = new int[n + 1];\n    for (int i = 0; i < idx; i++) newArr[i] = arr[i];\n    newArr[idx] = value;\n    for (int i = idx; i < n; i++) newArr[i + 1] = arr[i];\n    return newArr;\n}`,
        cpp: `std::vector<int> insertAtIndex(const std::vector<int>& arr, int value, int idx) {\n    int n = arr.size();\n    std::vector<int> newArr(n + 1);\n    for (int i = 0; i < idx; ++i) newArr[i] = arr[i];\n    newArr[idx] = value;\n    for (int i = idx; i < n; ++i) newArr[i + 1] = arr[i];\n    return newArr;\n}`,
        javascript: `function insertAtIndex(arr, value, idx) {\n    const n = arr.length;\n    const newArr = new Array(n + 1);\n    for (let i = 0; i < idx; i++) newArr[i] = arr[i];\n    newArr[idx] = value;\n    for (let i = idx; i < n; i++) newArr[i + 1] = arr[i];\n    return newArr;\n}`
      },
      delete: {
        python: `def delete_at_index(arr, idx):\n    n = len(arr)\n    new_arr = [None] * (n - 1)\n    for i in range(idx):\n        new_arr[i] = arr[i]\n    for i in range(idx + 1, n):\n        new_arr[i - 1] = arr[i]\n    return new_arr`,
        java: `public int[] deleteAtIndex(int[] arr, int idx) {\n    int n = arr.length;\n    int[] newArr = new int[n - 1];\n    for (int i = 0; i < idx; i++) newArr[i] = arr[i];\n    for (int i = idx + 1; i < n; i++) newArr[i - 1] = arr[i];\n    return newArr;\n}`,
        cpp: `std::vector<int> deleteAtIndex(const std::vector<int>& arr, int idx) {\n    int n = arr.size();\n    std::vector<int> newArr(n - 1);\n    for (int i = 0; i < idx; ++i) newArr[i] = arr[i];\n    for (int i = idx + 1; i < n; ++i) newArr[i - 1] = arr[i];\n    return newArr;\n}`,
        javascript: `function deleteAtIndex(arr, idx) {\n    const n = arr.length;\n    const newArr = new Array(n - 1);\n    for (let i = 0; i < idx; i++) newArr[i] = arr[i];\n    for (let i = idx + 1; i < n; i++) newArr[i - 1] = arr[i];\n    return newArr;\n}`
      }
    },
    practiceProblems: [
      { id: "a_p1", title: "Two Sum", difficulty: "Easy", desc: "Find two numbers that add up to a specific target.", time: "O(n)", space: "O(n)", input: "[2, 7, 11, 15], target = 9", explanation: "Use a hashmap to search for the complement (target - num) while scanning." },
      { id: "a_p2", title: "Maximum Subarray (Kadane's)", difficulty: "Medium", desc: "Find the contiguous subarray with the largest sum.", time: "O(n)", space: "O(1)", input: "[-2, 1, -3, 4, -1, 2, 1, -5, 4]", explanation: "Track local maximums. If the local sum becomes negative, reset it to 0." },
      { id: "a_p3", title: "Best Time to Buy/Sell Stock", difficulty: "Easy", desc: "Maximize single-transaction stock profit.", time: "O(n)", space: "O(1)", input: "[7, 1, 5, 3, 6, 4]", explanation: "Track min price so far and record max gain on any subsequent day." },
      { id: "a_p4", title: "Rotate Array", difficulty: "Medium", desc: "Rotate an array to the right by k steps.", time: "O(n)", space: "O(1)", input: "[1, 2, 3, 4, 5], k = 2", explanation: "Reverse all, reverse first k, reverse remaining n-k elements." }
    ],
    realWorldApps: [
      { title: "Image Pixels", desc: "Represent pixel color channels contiguously for super-fast GPU operations.", icon: "Video", color: "from-pink-500/20 to-fuchsia-500/20" },
      { title: "Data buffers", desc: "Used in operating system memory structures and physical I/O streams.", icon: "Database", color: "from-fuchsia-500/20 to-pink-500/20" }
    ],
    relatedTopics: [
      { title: "Linked List", key: "linked_list" },
      { title: "Strings", key: "string" }
    ]
  },
  linked_list: {
    key: "linked_list",
    title: "Linked Lists",
    icon: "Link",
    desc: "Understand dynamic nodes, pointer tracking, and head/tail manipulations.",
    lessons: {
      fundamentals: [
        { id: "ll_fund1", title: "Nodes and Pointers", completed: false },
        { id: "ll_fund2", title: "Singly vs Doubly Linked", completed: false },
        { id: "ll_fund3", title: "Memory Allocation", completed: false }
      ],
      operations: [
        { id: "ll_oper1", title: "Traverse Nodes", completed: false },
        { id: "ll_oper2", title: "Insert Head/Tail", completed: false },
        { id: "ll_oper3", title: "Delete Node", completed: false }
      ],
      searching: [
        { id: "ll_search1", title: "Linear Scan Search", completed: false }
      ],
      advanced: [
        { id: "ll_adv1", title: "Cycle Detection (Floyd's)", completed: false },
        { id: "ll_adv2", title: "Reverse a Linked List", completed: false }
      ]
    },
    visualizerPreset: "10 -> 20 -> 30 -> 40",
    codeSnippets: {
      insert: {
        python: `class Node:\n    def __init__(self, val):\n        self.val = val\n        self.next = None\n\ndef insert_head(head, val):\n    new_node = Node(val)\n    new_node.next = head\n    return new_node`,
        java: `class Node {\n    int val;\n    Node next;\n    Node(int v) { val = v; }\n}\n\npublic Node insertHead(Node head, int val) {\n    Node newNode = new Node(val);\n    newNode.next = head;\n    return newNode;\n}`,
        cpp: `struct Node {\n    int val;\n    Node* next;\n    Node(int v) : val(v), next(nullptr) {}\n};\n\nNode* insertHead(Node* head, int val) {\n    Node* newNode = new Node(val);\n    newNode->next = head;\n    return newNode;\n}`,
        javascript: `class Node {\n    constructor(val) {\n        this.val = val;\n        this.next = null;\n    }\n}\n\nfunction insertHead(head, val) {\n    const newNode = new Node(val);\n    newNode.next = head;\n    return newNode;\n}`
      },
      delete: {
        python: `def delete_node(head, key):\n    temp = head\n    if temp and temp.val == key:\n        return temp.next\n    while temp and temp.next:\n        if temp.next.val == key:\n            temp.next = temp.next.next\n            break\n        temp = temp.next\n    return head`,
        java: `public Node deleteNode(Node head, int key) {\n    if (head == null) return null;\n    if (head.val == key) return head.next;\n    Node temp = head;\n    while (temp.next != null) {\n        if (temp.next.val == key) {\n            temp.next = temp.next.next;\n            break;\n        }\n        temp = temp.next;\n    }\n    return head;\n}`,
        cpp: `Node* deleteNode(Node* head, int key) {\n    if (!head) return nullptr;\n    if (head->val == key) {\n        Node* nextNode = head->next;\n        delete head;\n        return nextNode;\n    }\n    Node* temp = head;\n    while (temp->next) {\n        if (temp->next->val == key) {\n            Node* toDelete = temp->next;\n            temp->next = temp->next->next;\n            delete toDelete;\n            break;\n        }\n        temp = temp->next;\n    }\n    return head;\n}`,
        javascript: `function deleteNode(head, key) {\n    if (!head) return null;\n    if (head.val === key) return head.next;\n    let temp = head;\n    while (temp.next) {\n        if (temp.next.val === key) {\n            temp.next = temp.next.next;\n            break;\n        }\n        temp = temp.next;\n    }\n    return head;\n}`
      }
    },
    practiceProblems: [
      { id: "ll_p1", title: "Reverse Linked List", difficulty: "Easy", desc: "Reverse a singly linked list in-place.", time: "O(n)", space: "O(1)", input: "1 -> 2 -> 3 -> Null", explanation: "Maintain three pointers: prev, curr, and next. Set curr.next to prev and shift forward." },
      { id: "ll_p2", title: "Linked List Cycle Detection", difficulty: "Easy", desc: "Determine if a linked list has a loop cycle.", time: "O(n)", space: "O(1)", input: "1 -> 2 -> 3 -> 2 (loop)", explanation: "Use Floyd's tortoise and hare algorithm with a slow and fast pointer." }
    ],
    realWorldApps: [
      { title: "Undo/Redo Actions", desc: "Keep browser history track loops using backward and forward doubly links.", icon: "RotateCcw", color: "from-pink-500/20 to-rose-500/20" },
      { title: "Music Playlists", desc: "Move dynamically to the next track using forward node mappings.", icon: "Sliders", color: "from-fuchsia-500/20 to-pink-500/20" }
    ],
    relatedTopics: [
      { title: "Arrays", key: "arrays" },
      { title: "Stacks", key: "stacks" }
    ]
  },
  stacks: {
    key: "stacks",
    title: "Stacks",
    icon: "Layers",
    desc: "Master Last-In-First-Out (LIFO) structures, backtracking, and expression parsing.",
    lessons: {
      fundamentals: [
        { id: "st_fund1", title: "LIFO Principle", completed: false },
        { id: "st_fund2", title: "Stack Overflow & Underflow", completed: false }
      ],
      operations: [
        { id: "st_oper1", title: "Push", completed: false },
        { id: "st_oper2", title: "Pop", completed: false },
        { id: "st_oper3", title: "Peek/Top", completed: false }
      ],
      searching: [],
      advanced: [
        { id: "st_adv1", title: "Infix to Postfix", completed: false },
        { id: "st_adv2", title: "Min Stack Design", completed: false }
      ]
    },
    visualizerPreset: "5, 12, 19, 25",
    codeSnippets: {
      push: {
        python: `stack = []\nstack.append(element)  # Push`,
        java: `Stack<Integer> stack = new Stack<>();\nstack.push(element);`,
        cpp: `std::stack<int> s;\ns.push(element);`,
        javascript: `const stack = [];\nstack.push(element);`
      },
      pop: {
        python: `if stack:\n    val = stack.pop()  # Pop`,
        java: `if (!stack.isEmpty()) {\n    int val = stack.pop();\n}`,
        cpp: `if (!s.empty()) {\n    int val = s.top();\n    s.pop();\n}`,
        javascript: `if (stack.length > 0) {\n    const val = stack.pop();\n}`
      }
    },
    practiceProblems: [
      { id: "st_p1", title: "Valid Parentheses", difficulty: "Easy", desc: "Given a string containing just brackets, determine validity.", time: "O(n)", space: "O(n)", input: "'{[()]}'", explanation: "Push opening brackets to stack, match and pop on closing brackets." },
      { id: "st_p2", title: "Min Stack", difficulty: "Medium", desc: "Design a stack supporting push, pop, top, and retrieving min element in O(1).", time: "O(1)", space: "O(n)", input: "Push(5), Push(3), GetMin()", explanation: "Maintain a secondary stack that tracks the running minimum at each layer." }
    ],
    realWorldApps: [
      { title: "Browser History", desc: "Pressing the back button loads the last visited URL off a navigation stack.", icon: "Activity", color: "from-pink-500/20 to-fuchsia-500/20" },
      { title: "Call Stack VM", desc: "Computers store function execution states and locals on runtime memory stacks.", icon: "Cpu", color: "from-fuchsia-500/20 to-purple-500/20" }
    ],
    relatedTopics: [
      { title: "Queues", key: "queues" },
      { title: "Recursion", key: "recursion" }
    ]
  },
  queues: {
    key: "queues",
    title: "Queues",
    icon: "Sliders",
    desc: "Master First-In-First-Out (FIFO) sequential processing, scheduling, and round-robins.",
    lessons: {
      fundamentals: [
        { id: "q_fund1", title: "FIFO Principle", completed: false },
        { id: "q_fund2", title: "Enqueue & Dequeue", completed: false }
      ],
      operations: [
        { id: "q_oper1", title: "Enqueue (Rear)", completed: false },
        { id: "q_oper2", title: "Dequeue (Front)", completed: false }
      ],
      searching: [],
      advanced: [
        { id: "q_adv1", title: "Circular Queue", completed: false },
        { id: "q_adv2", title: "Double Ended Queue (Deque)", completed: false }
      ]
    },
    visualizerPreset: "8, 15, 22, 29",
    codeSnippets: {
      enqueue: {
        python: `from collections import deque\nqueue = deque()\nqueue.append(val)  # Enqueue`,
        java: `Queue<Integer> q = new LinkedList<>();\nq.add(val);`,
        cpp: `std::queue<int> q;\nq.push(val);`,
        javascript: `const q = [];\nq.push(val); // Enqueue`
      },
      dequeue: {
        python: `if queue:\n    val = queue.popleft() # Dequeue`,
        java: `if (!q.isEmpty()) {\n    int val = q.poll();\n}`,
        cpp: `if (!q.empty()) {\n    int val = q.front();\n    q.pop();\n}`,
        javascript: `if (q.length > 0) {\n    const val = q.shift(); // Dequeue\n}`
      }
    },
    practiceProblems: [
      { id: "q_p1", title: "Implement Queue using Stacks", difficulty: "Easy", desc: "Implement FIFO queue operations using two LIFO stacks.", time: "Amortized O(1)", space: "O(n)", input: "Push(10), Pop()", explanation: "Use input and output stacks. When popping, if output stack is empty, transfer everything." }
    ],
    realWorldApps: [
      { title: "Printer Jobs", desc: "Spool files contiguously into FIFO memory arrays to print chronologically.", icon: "Database", color: "from-pink-500/20 to-rose-500/20" },
      { title: "CPU Scheduling", desc: "OS keeps threads in round-robin ready queues for fair time slicing.", icon: "Cpu", color: "from-fuchsia-500/20 to-pink-500/20" }
    ],
    relatedTopics: [
      { title: "Stacks", key: "stacks" },
      { title: "Graphs (BFS)", key: "graphs" }
    ]
  },
  trees: {
    key: "trees",
    title: "Trees",
    icon: "GitBranch",
    desc: "Grasp hierarchical node relationships, BST properties, and recursive tree search.",
    lessons: {
      fundamentals: [
        { id: "tr_fund1", title: "Root, Leaves, and Depth", completed: false },
        { id: "tr_fund2", title: "Binary Trees vs BST", completed: false }
      ],
      operations: [
        { id: "tr_oper1", title: "BST Insertion", completed: false },
        { id: "tr_oper2", title: "Node Deletion", completed: false }
      ],
      searching: [
        { id: "tr_search1", title: "Preorder, Inorder, Postorder", completed: false }
      ],
      advanced: [
        { id: "tr_adv1", title: "AVL Height Balancing", completed: false },
        { id: "tr_adv2", title: "Lowest Common Ancestor", completed: false }
      ]
    },
    visualizerPreset: "50, 30, 70, 20, 40, 60, 80",
    codeSnippets: {
      inorder: {
        python: `def inorder(root):\n    if root:\n        inorder(root.left)\n        print(root.val)\n        inorder(root.right)`,
        java: `void inorder(Node root) {\n    if (root != null) {\n        inorder(root.left);\n        System.out.println(root.val);\n        inorder(root.right);\n    }\n}`,
        cpp: `void inorder(Node* root) {\n    if (root) {\n        inorder(root->left);\n        std::cout << root->val << std::endl;\n        inorder(root->right);\n    }\n}`,
        javascript: `function inorder(root) {\n    if (root) {\n        inorder(root.left);\n        console.log(root.val);\n        inorder(root.right);\n    }\n}`
      }
    },
    practiceProblems: [
      { id: "tr_p1", title: "Inorder Traversal", difficulty: "Easy", desc: "Return the inorder traversal of a binary tree's nodes.", time: "O(n)", space: "O(h)", input: "Tree [1, null, 2, 3]", explanation: "Recursively traverse the left subtree, visit current node, then traverse right." },
      { id: "tr_p2", title: "Validate Binary Search Tree", difficulty: "Medium", desc: "Check if a binary tree is a valid BST.", time: "O(n)", space: "O(h)", input: "Root 5 with Left 3 and Right 7", explanation: "Pass down allowed min and max range constraints recursively as you descend." }
    ],
    realWorldApps: [
      { title: "HTML DOM", desc: "Browsers model websites as structural nested tag trees for styling scripts.", icon: "Video", color: "from-pink-500/20 to-fuchsia-500/20" },
      { title: "File Directories", desc: "Operating systems group files and directories inside nested folder trees.", icon: "Database", color: "from-purple-500/20 to-pink-500/20" }
    ],
    relatedTopics: [
      { title: "Graphs", key: "graphs" },
      { title: "Recursion", key: "recursion" }
    ]
  },
  graphs: {
    key: "graphs",
    title: "Graphs",
    icon: "Network",
    desc: "Traverse arbitrary node grids, trace shortest paths, and track cycles.",
    lessons: {
      fundamentals: [
        { id: "gr_fund1", title: "Vertices and Edges", completed: false },
        { id: "gr_fund2", title: "Adjacency Matrix & List", completed: false }
      ],
      operations: [
        { id: "gr_oper1", title: "BFS (Breadth-First Search)", completed: false },
        { id: "gr_oper2", title: "DFS (Depth-First Search)", completed: false }
      ],
      searching: [],
      advanced: [
        { id: "gr_adv1", title: "Dijkstra's Algorithm", completed: false },
        { id: "gr_adv2", title: "Kruskal's MST", completed: false }
      ]
    },
    visualizerPreset: "A-B, A-C, B-D, C-D",
    codeSnippets: {
      bfs: {
        python: `def bfs(graph, start):\n    visited = set([start])\n    queue = [start]\n    while queue:\n        node = queue.pop(0)\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)`,
        java: `public void bfs(Map<Integer, List<Integer>> graph, int start) {\n    Set<Integer> visited = new HashSet<>();\n    Queue<Integer> q = new LinkedList<>();\n    q.add(start); visited.add(start);\n    while (!q.isEmpty()) {\n        int node = q.poll();\n        for (int neighbor : graph.getOrDefault(node, new ArrayList<>())) {\n            if (!visited.contains(neighbor)) {\n                visited.add(neighbor); q.add(neighbor);\n            }\n        }\n    }\n}`,
        cpp: `void bfs(const std::map<int, std::vector<int>>& graph, int start) {\n    std::set<int> visited;\n    std::queue<int> q;\n    q.push(start); visited.insert(start);\n    while (!q.empty()) {\n        int node = q.front(); q.pop();\n        for (int neighbor : graph.at(node)) {\n            if (visited.find(neighbor) == visited.end()) {\n                visited.insert(neighbor); q.push(neighbor);\n            }\n        }\n    }\n}`,
        javascript: `function bfs(graph, start) {\n    const visited = new Set([start]);\n    const q = [start];\n    while (q.length > 0) {\n        const node = q.shift();\n        for (let n of graph[node] || []) {\n            if (!visited.has(n)) {\n                visited.add(n); q.push(n);\n            }\n        }\n    }\n}`
      }
    },
    practiceProblems: [
      { id: "gr_p1", title: "Number of Islands", difficulty: "Medium", desc: "Given a 2D binary grid, count connected groups of '1's.", time: "O(R * C)", space: "O(R * C)", input: "Grid of land and water", explanation: "Trigger DFS or BFS whenever a land tile is encountered to sink all adjacent land nodes." }
    ],
    realWorldApps: [
      { title: "Social Networks", desc: "Model user friendships as graph vertices and mutual edges for recommendation.", icon: "Activity", color: "from-pink-500/20 to-rose-500/20" },
      { title: "GPS Maps", desc: "Road networks mapped as nodes with routing algorithms calculation.", icon: "Zap", color: "from-fuchsia-500/20 to-pink-500/20" }
    ],
    relatedTopics: [
      { title: "Trees", key: "trees" },
      { title: "Queues", key: "queues" }
    ]
  },
  sorting: {
    key: "sorting",
    title: "Sorting",
    icon: "ArrowDownUp",
    desc: "Observe numerical swaps, array partitioning, and logarithmic speed-ups.",
    lessons: {
      fundamentals: [
        { id: "srt_fund1", title: "Stability and Inversions", completed: false }
      ],
      operations: [
        { id: "srt_oper1", title: "Bubble Sort", completed: false },
        { id: "srt_oper2", title: "Insertion Sort", completed: false },
        { id: "srt_oper3", title: "Selection Sort", completed: false }
      ],
      searching: [],
      advanced: [
        { id: "srt_adv1", title: "Merge Sort", completed: false },
        { id: "srt_adv2", title: "Quick Sort", completed: false }
      ]
    },
    visualizerPreset: "15, 3, 22, 10, 5",
    codeSnippets: {
      bubble: {
        python: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]`,
        java: `void bubbleSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j+1]) {\n                int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t;\n            }\n        }\n    }\n}`,
        cpp: `void bubbleSort(std::vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n; ++i) {\n        for (int j = 0; j < n - i - 1; ++j) {\n            if (arr[j] > arr[j+1]) std::swap(arr[j], arr[j+1]);\n        }\n    }\n}`,
        javascript: `function bubbleSort(arr) {\n    const n = arr.length;\n    for (let i = 0; i < n; i++) {\n        for (let j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                let temp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = temp;\n            }\n        }\n    }\n}`
      }
    },
    practiceProblems: [
      { id: "srt_p1", title: "Merge Sorted Array", difficulty: "Easy", desc: "Merge two sorted arrays in-place.", time: "O(m+n)", space: "O(1)", input: "arr1 = [1,2,3,0,0,0], arr2 = [2,5,6]", explanation: "Fill values starting from the tail of both arrays to avoid overwriting elements." }
    ],
    realWorldApps: [
      { title: "Query Sorts", desc: "Organizing search results by rank or item prices.", icon: "Sliders", color: "from-pink-500/20 to-fuchsia-500/20" }
    ],
    relatedTopics: [
      { title: "Searching", key: "searching" },
      { title: "Arrays", key: "arrays" }
    ]
  },
  searching: {
    key: "searching",
    title: "Searching",
    icon: "Search",
    desc: "Master logarithmic bisecting scans, key-matches, and intervals.",
    lessons: {
      fundamentals: [
        { id: "sh_fund1", title: "Linear vs Binary Scanning", completed: false }
      ],
      operations: [
        { id: "sh_oper1", title: "Sequential Search", completed: false },
        { id: "sh_oper2", title: "Binary Bisecting Search", completed: false }
      ],
      searching: [],
      advanced: [
        { id: "sh_adv1", title: "Ternary Search", completed: false }
      ]
    },
    visualizerPreset: "2, 4, 8, 16, 32, 64",
    codeSnippets: {
      binary: {
        python: `def binary_search(arr, val):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == val: return mid\n        elif arr[mid] < val: low = mid + 1\n        else: high = mid - 1\n    return -1`,
        java: `public int binarySearch(int[] arr, int val) {\n    int low = 0, high = arr.length - 1;\n    while (low <= high) {\n        int mid = (low + high) / 2;\n        if (arr[mid] == val) return mid;\n        else if (arr[mid] < val) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
        cpp: `int binarySearch(const std::vector<int>& arr, int val) {\n    int low = 0, high = arr.size() - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == val) return mid;\n        else if (arr[mid] < val) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
        javascript: `function binarySearch(arr, val) {\n    let low = 0, high = arr.length - 1;\n    while (low <= high) {\n        const mid = Math.floor((low + high) / 2);\n        if (arr[mid] === val) return mid;\n        else if (arr[mid] < val) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`
      }
    },
    practiceProblems: [
      { id: "sh_p1", title: "Binary Search", difficulty: "Easy", desc: "Find target element index in a sorted array.", time: "O(log n)", space: "O(1)", input: "arr = [-1,0,3,5,9,12], target = 9", explanation: "Maintain low and high bounds, recursively checking the midpoint." }
    ],
    realWorldApps: [
      { title: "Database Lookup", desc: "B-Tree indexed records located instantly using binary splits.", icon: "Database", color: "from-pink-500/20 to-fuchsia-500/20" }
    ],
    relatedTopics: [
      { title: "Sorting", key: "sorting" },
      { title: "Bit Manipulation", key: "bit_manipulation" }
    ]
  },
  dp: {
    key: "dp",
    title: "Dynamic Programming",
    icon: "Cpu",
    desc: "Observe memorization recursion and optimization pathways. Trace state matrices.",
    lessons: {
      fundamentals: [
        { id: "dp_fund1", title: "Overlapping Subproblems", completed: false },
        { id: "dp_fund2", title: "Memoization vs Tabulation", completed: false }
      ],
      operations: [
        { id: "dp_oper1", title: "State Representation", completed: false }
      ],
      searching: [],
      advanced: [
        { id: "dp_adv1", title: "0/1 Knapsack", completed: false },
        { id: "dp_adv2", title: "Longest Common Subsequence", completed: false }
      ]
    },
    visualizerPreset: "1, 1, 2, 3, 5, 8",
    codeSnippets: {
      fibo: {
        python: `def fib(n, memo = {}):\n    if n in memo: return memo[n]\n    if n <= 2: return 1\n    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)\n    return memo[n]`,
        java: `public int fib(int n, int[] memo) {\n    if (memo[n] != 0) return memo[n];\n    if (n <= 2) return 1;\n    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);\n    return memo[n];\n}`,
        cpp: `int fib(int n, std::unordered_map<int, int>& memo) {\n    if (memo.count(n)) return memo[n];\n    if (n <= 2) return 1;\n    memo[n] = fib(n-1, memo) + fib(n-2, memo);\n    return memo[n];\n}`,
        javascript: `function fib(n, memo = {}) {\n    if (n in memo) return memo[n];\n    if (n <= 2) return 1;\n    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);\n    return memo[n];\n}`
      }
    },
    practiceProblems: [
      { id: "dp_p1", title: "Climbing Stairs", difficulty: "Easy", desc: "Count distinct ways to reach n stairs, climbing 1 or 2 at a time.", time: "O(n)", space: "O(1)", input: "n = 3", explanation: "Relies on a simple recurrence relation: ways(n) = ways(n-1) + ways(n-2)." }
    ],
    realWorldApps: [
      { title: "Spell Checker", desc: "Find the Edit Distance between two words using state alignment cells.", icon: "Sliders", color: "from-pink-500/20 to-fuchsia-500/20" }
    ],
    relatedTopics: [
      { title: "Recursion", key: "recursion" },
      { title: "Greedy", key: "greedy" }
    ]
  },
  greedy: {
    key: "greedy",
    title: "Greedy",
    icon: "Flame",
    desc: "Solve step-by-step optimizations by grabbing the immediate best local choice.",
    lessons: {
      fundamentals: [
        { id: "grd_fund1", title: "Greedy Choice Property", completed: false }
      ],
      operations: [
        { id: "grd_oper1", title: "Optimal Substructure", completed: false }
      ],
      searching: [],
      advanced: [
        { id: "grd_adv1", title: "Fractional Knapsack", completed: false },
        { id: "grd_adv2", title: "Huffman Coding", completed: false }
      ]
    },
    visualizerPreset: "25, 10, 5, 1",
    codeSnippets: {
      coins: {
        python: `def make_change(coins, amount):\n    coins.sort(reverse=True)\n    count = 0\n    for coin in coins:\n        while amount >= coin:\n            amount -= coin\n            count += 1\n    return count`,
        java: `public int makeChange(int[] coins, int amount) {\n    Arrays.sort(coins);\n    int count = 0;\n    for (int i = coins.length - 1; i >= 0; i--) {\n        while (amount >= coins[i]) {\n            amount -= coins[i];\n            count++;\n        }\n    }\n    return count;\n}`,
        cpp: `int makeChange(std::vector<int>& coins, int amount) {\n    std::sort(coins.rbegin(), coins.rend());\n    int count = 0;\n    for (int coin : coins) {\n        while (amount >= coin) {\n            amount -= coin;\n            count++;\n        }\n    }\n    return count;\n}`,
        javascript: `function makeChange(coins, amount) {\n    coins.sort((a,b) => b-a);\n    let count = 0;\n    for (let coin of coins) {\n        while (amount >= coin) {\n            amount -= coin;\n            count++;\n        }\n    }\n    return count;\n}`
      }
    },
    practiceProblems: [
      { id: "grd_p1", title: "Coin Change (Greedy Case)", difficulty: "Easy", desc: "Given coin values, find the minimum coins to form a target amount.", time: "O(n log n)", space: "O(1)", input: "Coins = [1, 5, 10, 25], Amount = 36", explanation: "Repeatedly subtract the largest coin size that fits." }
    ],
    realWorldApps: [
      { title: "File Compression", desc: "Huffman coding builds dynamic bit trees to compress documents.", icon: "Database", color: "from-pink-500/20 to-fuchsia-500/20" }
    ],
    relatedTopics: [
      { title: "Dynamic Programming", key: "dp" },
      { title: "Graphs", key: "graphs" }
    ]
  },
  recursion: {
    key: "recursion",
    title: "Recursion",
    icon: "RotateCcw",
    desc: "Observe self-calling execution frames, stack unwinds, and backtrack trees.",
    lessons: {
      fundamentals: [
        { id: "rec_fund1", title: "Base Case and Call Stack", completed: false }
      ],
      operations: [
        { id: "rec_oper1", title: "Recursive Tree Trace", completed: false }
      ],
      searching: [],
      advanced: [
        { id: "rec_adv1", title: "N-Queens Backtracking", completed: false },
        { id: "rec_adv2", title: "Sudoku Solver", completed: false }
      ]
    },
    visualizerPreset: "N = 4",
    codeSnippets: {
      factorial: {
        python: `def fact(n):\n    if n <= 1: return 1\n    return n * fact(n - 1)`,
        java: `public int fact(int n) {\n    if (n <= 1) return 1;\n    return n * fact(n - 1);\n}`,
        cpp: `int fact(int n) {\n    if (n <= 1) return 1;\n    return n * fact(n - 1);\n}`,
        javascript: `function fact(n) {\n    if (n <= 1) return 1;\n    return n * fact(n - 1);\n}`
      }
    },
    practiceProblems: [
      { id: "rec_p1", title: "Fibonacci Numbers", difficulty: "Easy", desc: "Calculate the n-th Fibonacci value.", time: "O(2^n)", space: "O(n)", input: "n = 5", explanation: "Add the results of two self-recursive calls: fib(n-1) + fib(n-2)." }
    ],
    realWorldApps: [
      { title: "Regex Parsers", desc: "Compilers use backtracking recursive splits to match nested brackets.", icon: "Sliders", color: "from-pink-500/20 to-fuchsia-500/20" }
    ],
    relatedTopics: [
      { title: "Trees", key: "trees" },
      { title: "Dynamic Programming", key: "dp" }
    ]
  },
  bit_manipulation: {
    key: "bit_manipulation",
    title: "Bit Manipulation",
    icon: "Binary",
    desc: "Perform lightning-fast register operations, bitmasks, and binary math.",
    lessons: {
      fundamentals: [
        { id: "bit_fund1", title: "AND, OR, XOR, NOT", completed: false },
        { id: "bit_fund2", title: "Bit Shifting Operands", completed: false }
      ],
      operations: [],
      searching: [],
      advanced: [
        { id: "bit_adv1", title: "Bitmask Operations", completed: false }
      ]
    },
    visualizerPreset: "00001101",
    codeSnippets: {
      xor: {
        python: `val = a ^ b  # Bitwise XOR`,
        java: `int val = a ^ b;`,
        cpp: `int val = a ^ b;`,
        javascript: `const val = a ^ b;`
      }
    },
    practiceProblems: [
      { id: "bit_p1", title: "Single Number", difficulty: "Easy", desc: "Find the single element in an array where every other element appears twice.", time: "O(n)", space: "O(1)", input: "[4, 1, 2, 1, 2]", explanation: "XORing any number with itself yields 0. XORing everything leaves the unique item." }
    ],
    realWorldApps: [
      { title: "Cryptography", desc: "Secure cipher keys are combined with cleartext using super-fast bitwise XOR.", icon: "Zap", color: "from-pink-500/20 to-fuchsia-500/20" }
    ],
    relatedTopics: [
      { title: "Math & Logic", key: "math" },
      { title: "Searching", key: "searching" }
    ]
  },
  math: {
    key: "math",
    title: "Math & Logic",
    icon: "Hash",
    desc: "Understand numerical properties, primes, greatest common divisors, and logical induction.",
    lessons: {
      fundamentals: [
        { id: "math_fund1", title: "Modulo and Division Arithmetic", completed: false }
      ],
      operations: [],
      searching: [],
      advanced: [
        { id: "math_adv1", title: "Sieve of Eratosthenes", completed: false },
        { id: "math_adv2", title: "Euclidean GCD Algorithm", completed: false }
      ]
    },
    visualizerPreset: "12, 18",
    codeSnippets: {
      gcd: {
        python: `def gcd(a, b):\n    while b:\n        a, b = b, a % b\n    return a`,
        java: `public int gcd(int a, int b) {\n    while (b != 0) {\n        int t = b;\n        b = a % b;\n        a = t;\n    }\n    return a;\n}`,
        cpp: `int gcd(int a, int b) {\n    while (b) {\n        int t = b;\n        b = a % b;\n        a = t;\n    }\n    return a;\n}`,
        javascript: `function gcd(a, b) {\n    while (b) {\n        let t = b;\n        b = a % b;\n        a = t;\n    }\n    return a;\n}`
      }
    },
    practiceProblems: [
      { id: "math_p1", title: "Count Primes", difficulty: "Medium", desc: "Count the number of prime numbers less than a non-negative number, n.", time: "O(n log log n)", space: "O(n)", input: "n = 10", explanation: "Use Sieve of Eratosthenes: mark multiples of primes as composite starting from 2." }
    ],
    realWorldApps: [
      { title: "RSA Cryptography", desc: "Public key security depends on factoring the product of two huge prime numbers.", icon: "Activity", color: "from-pink-500/20 to-fuchsia-500/20" }
    ],
    relatedTopics: [
      { title: "Bit Manipulation", key: "bit_manipulation" },
      { title: "Sorting", key: "sorting" }
    ]
  },
  string: {
    key: "string",
    title: "Strings",
    icon: "BookOpen",
    desc: "Manipulate text sequences, sliding windows, and matching algorithms.",
    lessons: {
      fundamentals: [
        { id: "str_fund1", title: "Char Arrays & Immutability", completed: false }
      ],
      operations: [],
      searching: [
        { id: "str_search1", title: "Pattern Search", completed: false }
      ],
      advanced: [
        { id: "str_adv1", title: "Rabin-Karp Hashing", completed: false },
        { id: "str_adv2", title: "KMP Matcher", completed: false }
      ]
    },
    visualizerPreset: "H, E, L, L, O",
    codeSnippets: {
      reverse: {
        python: `def reverse_str(s):\n    return s[::-1]`,
        java: `public String reverseStr(String s) {\n    return new StringBuilder(s).reverse().toString();\n}`,
        cpp: `std::string reverseStr(std::string s) {\n    std::reverse(s.begin(), s.end());\n    return s;\n}`,
        javascript: `function reverseStr(s) {\n    return s.split("").reverse().join("");\n}`
      }
    },
    practiceProblems: [
      { id: "str_p1", title: "Valid Palindrome", difficulty: "Easy", desc: "Verify if a string is a palindrome ignoring cases and punctuation.", time: "O(n)", space: "O(1)", input: "'A man, a plan, a canal: Panama'", explanation: "Maintain head and tail pointers. Increment/decrement to ignore non-alphanumeric chars." }
    ],
    realWorldApps: [
      { title: "Text Find/Replace", desc: "Word processors scan long character arrays instantly to locate search targets.", icon: "Video", color: "from-pink-500/20 to-fuchsia-500/20" }
    ],
    relatedTopics: [
      { title: "Arrays", key: "arrays" },
      { title: "Searching", key: "searching" }
    ]
  }
};
