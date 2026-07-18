import { AlgorithmData } from './types';

// Helper to generate visual elements for arrays
function makeArrayElements(arr: (string | number)[], activeIndices: number[] = [], selectedIndex: number | null = null, pointers: Record<string, number> = {}, states: Record<number, 'default' | 'active' | 'selected' | 'success' | 'fail' | 'inactive'> = {}): any[] {
  return arr.map((item, idx) => {
    let state: 'default' | 'active' | 'selected' | 'success' | 'fail' | 'inactive' = 'default';
    if (states[idx]) {
      state = states[idx];
    } else if (idx === selectedIndex) {
      state = 'selected';
    } else if (activeIndices.includes(idx)) {
      state = 'active';
    }

    const itemPointers: string[] = [];
    Object.entries(pointers).forEach(([name, pos]) => {
      if (pos === idx) {
        itemPointers.push(name);
      }
    });

    return {
      id: idx,
      label: String(item),
      value: typeof item === 'number' ? item : undefined,
      state,
      pointers: itemPointers.length > 0 ? itemPointers : undefined,
      index: idx
    };
  });
}

export const templates: Record<string, AlgorithmData> = {
  sliding_window: {
    title: "Sliding Window",
    description: "Longest Substring Without Repeating Characters. Tracks a window of unique characters, expanding with 'right' and shrinking with 'left' when duplicates are found.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(m, n))",
    code: [
      "seen = {}          # Track char positions",
      "left, best = 0, 0",
      "for right, char in enumerate(s):",
      "    if char in seen and seen[char] >= left:",
      "        left = seen[char] + 1",
      "    seen[char] = right",
      "    best = max(best, right - left + 1)",
      "return best"
    ],
    steps: [
      {
        elements: makeArrayElements(["a", "b", "c", "a", "b", "c", "b", "b"], [], null, { L: 0, R: 0 }),
        secondaryState: {
          label: "Seen Lookup",
          type: "map",
          items: []
        },
        variables: { Left: 0, Right: 0, Length: 1, Best: 1, "Current Window": "\"a\"" },
        codeLine: 1,
        explanation: "Initialize the seen map. Pointers Left (L) and Right (R) start at index 0."
      },
      {
        elements: makeArrayElements(["a", "b", "c", "a", "b", "c", "b", "b"], [0], null, { L: 0, R: 0 }),
        secondaryState: {
          label: "Seen Lookup",
          type: "map",
          items: [{ key: "a", value: "0" }]
        },
        variables: { Left: 0, Right: 0, Length: 1, Best: 1, "Current Window": "\"a\"" },
        codeLine: 5,
        explanation: "Character 'a' at R=0 is not in seen. Add 'a': 0 to our lookup map. Record max length of 1."
      },
      {
        elements: makeArrayElements(["a", "b", "c", "a", "b", "c", "b", "b"], [0, 1], null, { L: 0, R: 1 }),
        secondaryState: {
          label: "Seen Lookup",
          type: "map",
          items: [{ key: "a", value: "0" }, { key: "b", value: "1" }]
        },
        variables: { Left: 0, Right: 1, Length: 2, Best: 2, "Current Window": "\"ab\"" },
        codeLine: 6,
        explanation: "R advances to 1 (char 'b'). 'b' is new. Add 'b': 1 to map. Current window length is 2, updating best length to 2."
      },
      {
        elements: makeArrayElements(["a", "b", "c", "a", "b", "c", "b", "b"], [0, 1, 2], null, { L: 0, R: 2 }),
        secondaryState: {
          label: "Seen Lookup",
          type: "map",
          items: [{ key: "a", value: "0" }, { key: "b", value: "1" }, { key: "c", value: "2" }]
        },
        variables: { Left: 0, Right: 2, Length: 3, Best: 3, "Current Window": "\"abc\"" },
        codeLine: 6,
        explanation: "R advances to 2 (char 'c'). 'c' is new. Add 'c': 2 to map. Current window length is 3, updating best to 3."
      },
      {
        elements: makeArrayElements(["a", "b", "c", "a", "b", "c", "b", "b"], [0, 1, 2, 3], null, { L: 0, R: 3 }, { 3: "fail", 0: "fail" }),
        secondaryState: {
          label: "Seen Lookup",
          type: "map",
          items: [{ key: "a", value: "0" }, { key: "b", value: "1" }, { key: "c", value: "2" }]
        },
        variables: { Left: 0, Right: 3, Length: 4, Best: 3, "Current Window": "\"abca\"" },
        codeLine: 3,
        explanation: "R advances to 3 (char 'a'). Duplicate alert! 'a' was already seen at index 0, which is >= Left (0). We must shrink."
      },
      {
        elements: makeArrayElements(["a", "b", "c", "a", "b", "c", "b", "b"], [1, 2, 3], null, { L: 1, R: 3 }),
        secondaryState: {
          label: "Seen Lookup",
          type: "map",
          items: [{ key: "a", value: "3" }, { key: "b", value: "1" }, { key: "c", value: "2" }]
        },
        variables: { Left: 1, Right: 3, Length: 3, Best: 3, "Current Window": "\"bca\"" },
        codeLine: 4,
        explanation: "Shrink window by moving Left pointer past the last seen index of 'a' (0 + 1 = 1). Update 'a': 3 in seen map."
      },
      {
        elements: makeArrayElements(["a", "b", "c", "a", "b", "c", "b", "b"], [1, 2, 3, 4], null, { L: 1, R: 4 }, { 4: "fail", 1: "fail" }),
        secondaryState: {
          label: "Seen Lookup",
          type: "map",
          items: [{ key: "a", value: "3" }, { key: "b", value: "1" }, { key: "c", value: "2" }]
        },
        variables: { Left: 1, Right: 4, Length: 4, Best: 3, "Current Window": "\"bcab\"" },
        codeLine: 3,
        explanation: "R advances to 4 (char 'b'). Duplicate 'b'! 'b' was last seen at index 1, which is >= Left (1). Shrink window!"
      },
      {
        elements: makeArrayElements(["a", "b", "c", "a", "b", "c", "b", "b"], [2, 3, 4], null, { L: 2, R: 4 }),
        secondaryState: {
          label: "Seen Lookup",
          type: "map",
          items: [{ key: "a", value: "3" }, { key: "b", value: "4" }, { key: "c", value: "2" }]
        },
        variables: { Left: 2, Right: 4, Length: 3, Best: 3, "Current Window": "\"cab\"" },
        codeLine: 4,
        explanation: "Move Left pointer to index 2 (1 + 1 = 2). Update map seen['b'] = 4. Window is now 'cab'."
      },
      {
        elements: makeArrayElements(["a", "b", "c", "a", "b", "c", "b", "b"], [2, 3, 4, 5], null, { L: 2, R: 5 }, { 5: "fail", 2: "fail" }),
        secondaryState: {
          label: "Seen Lookup",
          type: "map",
          items: [{ key: "a", value: "3" }, { key: "b", value: "4" }, { key: "c", value: "2" }]
        },
        variables: { Left: 2, Right: 5, Length: 4, Best: 3, "Current Window": "\"cabc\"" },
        codeLine: 3,
        explanation: "R advances to 5 (char 'c'). Duplicate 'c'! 'c' was last seen at index 2, which is >= Left (2). Shrink window!"
      },
      {
        elements: makeArrayElements(["a", "b", "c", "a", "b", "c", "b", "b"], [3, 4, 5], null, { L: 3, R: 5 }),
        secondaryState: {
          label: "Seen Lookup",
          type: "map",
          items: [{ key: "a", value: "3" }, { key: "b", value: "4" }, { key: "c", value: "5" }]
        },
        variables: { Left: 3, Right: 5, Length: 3, Best: 3, "Current Window": "\"abc\"" },
        codeLine: 4,
        explanation: "Move Left pointer to index 3 (2 + 1 = 3). Update map seen['c'] = 5. Window is now 'abc'."
      },
      {
        elements: makeArrayElements(["a", "b", "c", "a", "b", "c", "b", "b"], [3, 4, 5, 6], null, { L: 3, R: 6 }, { 6: "fail", 4: "fail" }),
        secondaryState: {
          label: "Seen Lookup",
          type: "map",
          items: [{ key: "a", value: "3" }, { key: "b", value: "4" }, { key: "c", value: "5" }]
        },
        variables: { Left: 3, Right: 6, Length: 4, Best: 3, "Current Window": "\"abcb\"" },
        codeLine: 3,
        explanation: "R advances to 6 (char 'b'). Duplicate 'b'! 'b' was last seen at index 4, which is >= Left (3). Shrink window!"
      },
      {
        elements: makeArrayElements(["a", "b", "c", "a", "b", "c", "b", "b"], [5, 6], null, { L: 5, R: 6 }),
        secondaryState: {
          label: "Seen Lookup",
          type: "map",
          items: [{ key: "a", value: "3" }, { key: "b", value: "6" }, { key: "c", value: "5" }]
        },
        variables: { Left: 5, Right: 6, Length: 2, Best: 3, "Current Window": "\"cb\"" },
        codeLine: 4,
        explanation: "Move Left pointer to index 5 (4 + 1 = 5). Update map seen['b'] = 6. Window is now 'cb'."
      },
      {
        elements: makeArrayElements(["a", "b", "c", "a", "b", "c", "b", "b"], [5, 6, 7], null, { L: 5, R: 7 }, { 7: "fail", 6: "fail" }),
        secondaryState: {
          label: "Seen Lookup",
          type: "map",
          items: [{ key: "a", value: "3" }, { key: "b", value: "6" }, { key: "c", value: "5" }]
        },
        variables: { Left: 5, Right: 7, Length: 3, Best: 3, "Current Window": "\"cbb\"" },
        codeLine: 3,
        explanation: "R advances to 7 (char 'b'). Duplicate 'b'! 'b' was last seen at index 6, which is >= Left (5). Shrink window!"
      },
      {
        elements: makeArrayElements(["a", "b", "c", "a", "b", "c", "b", "b"], [7], null, { L: 7, R: 7 }),
        secondaryState: {
          label: "Seen Lookup",
          type: "map",
          items: [{ key: "a", value: "3" }, { key: "b", value: "7" }, { key: "c", value: "5" }]
        },
        variables: { Left: 7, Right: 7, Length: 1, Best: 3, "Current Window": "\"b\"" },
        codeLine: 4,
        explanation: "Move Left pointer to index 7 (6 + 1 = 7). Update map seen['b'] = 7. Window is now 'b'."
      },
      {
        elements: makeArrayElements(["a", "b", "c", "a", "b", "c", "b", "b"], [], null, { L: 7, R: 7 }, { 3: "success", 4: "success", 5: "success" }),
        secondaryState: {
          label: "Seen Lookup",
          type: "map",
          items: [{ key: "a", value: "3" }, { key: "b", value: "7" }, { key: "c", value: "5" }]
        },
        variables: { Left: 7, Right: 7, Length: 1, Best: 3, "Current Window": "\"b\"" },
        codeLine: 7,
        explanation: "Algorithm complete! The longest substring of unique characters found has length 3 (substring: 'abc')."
      }
    ]
  },

  binary_search: {
    title: "Binary Search",
    description: "An efficient logarithmic algorithm to locate a target element in a sorted list by repeatedly dividing the search interval in half.",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    code: [
      "low = 0",
      "high = len(arr) - 1",
      "while low <= high:",
      "    mid = (low + high) // 2",
      "    if arr[mid] == target:",
      "        return mid",
      "    elif arr[mid] < target:",
      "        low = mid + 1",
      "    else:",
      "        high = mid - 1",
      "return -1"
    ],
    steps: [
      {
        elements: makeArrayElements([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], [], null, { L: 0, H: 9 }),
        variables: { Low: 0, High: 9, Mid: "?", Target: 56, "Val at Mid": "?" },
        codeLine: 0,
        explanation: "Search for target 56. Initialize low (L) at index 0 and high (H) at index 9."
      },
      {
        elements: makeArrayElements([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], [4], 4, { L: 0, H: 9, M: 4 }),
        variables: { Low: 0, High: 9, Mid: 4, Target: 56, "Val at Mid": 16 },
        codeLine: 3,
        explanation: "Calculate mid index: (0 + 9) // 2 = 4. The value at mid is 16."
      },
      {
        elements: makeArrayElements([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], [4], null, { L: 0, H: 9, M: 4 }, { 0: "inactive", 1: "inactive", 2: "inactive", 3: "inactive", 4: "inactive" }),
        variables: { Low: 0, High: 9, Mid: 4, Target: 56, "Val at Mid": 16 },
        codeLine: 6,
        explanation: "Since 16 < 56, the target must be in the right half. Update low pointer to mid + 1 (5)."
      },
      {
        elements: makeArrayElements([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], [], null, { L: 5, H: 9 }, { 0: "inactive", 1: "inactive", 2: "inactive", 3: "inactive", 4: "inactive" }),
        variables: { Low: 5, High: 9, Mid: "?", Target: 56, "Val at Mid": "?" },
        codeLine: 7,
        explanation: "Pointers updated. Low (L) is now at 5, and High (H) is at 9."
      },
      {
        elements: makeArrayElements([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], [7], 7, { L: 5, H: 9, M: 7 }, { 0: "inactive", 1: "inactive", 2: "inactive", 3: "inactive", 4: "inactive" }),
        variables: { Low: 5, High: 9, Mid: 7, Target: 56, "Val at Mid": 56 },
        codeLine: 3,
        explanation: "Calculate mid index: (5 + 9) // 2 = 7. The value at mid is 56."
      },
      {
        elements: makeArrayElements([2, 5, 8, 12, 16, 23, 38, 56, 72, 91], [], null, { L: 5, H: 9, M: 7 }, { 0: "inactive", 1: "inactive", 2: "inactive", 3: "inactive", 4: "inactive", 7: "success" }),
        variables: { Low: 5, High: 9, Mid: 7, Target: 56, "Val at Mid": 56 },
        codeLine: 5,
        explanation: "Target 56 is found at index 7! The search succeeds and returns index 7."
      }
    ]
  },

  two_pointers: {
    title: "Two Pointers (Pair Sum)",
    description: "Finds if there exists a pair of numbers in a sorted array that sums up to a target value. Uses pointers at both ends and moves them inward.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: [
      "left = 0",
      "right = len(arr) - 1",
      "while left < right:",
      "    current_sum = arr[left] + arr[right]",
      "    if current_sum == target:",
      "        return left, right",
      "    elif current_sum < target:",
      "        left += 1",
      "    else:",
      "        right -= 1",
      "return -1"
    ],
    steps: [
      {
        elements: makeArrayElements([1, 3, 4, 6, 8, 10, 13], [], null, { L: 0, R: 6 }),
        variables: { Left: 0, Right: 6, Target: 14, "Current Sum": "?" },
        codeLine: 1,
        explanation: "Find two numbers that sum up to 14. Initialize left pointer L = 0 and right pointer R = 6."
      },
      {
        elements: makeArrayElements([1, 3, 4, 6, 8, 10, 13], [0, 6], null, { L: 0, R: 6 }),
        variables: { Left: 0, Right: 6, Target: 14, "Current Sum": 14, "Calc": "1 + 13" },
        codeLine: 3,
        explanation: "Calculate sum of elements at L and R: 1 + 13 = 14."
      },
      {
        elements: makeArrayElements([1, 3, 4, 6, 8, 10, 13], [], null, { L: 0, R: 6 }, { 0: "success", 6: "success" }),
        variables: { Left: 0, Right: 6, Target: 14, "Current Sum": 14, "Calc": "1 + 13" },
        codeLine: 5,
        explanation: "The sum matches our target! Return pair of indices (0, 6) containing values 1 and 13."
      }
    ]
  },

  bubble_sort: {
    title: "Bubble Sort",
    description: "A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    code: [
      "n = len(arr)",
      "for i in range(n):",
      "    for j in range(0, n-i-1):",
      "        if arr[j] > arr[j+1]:",
      "            arr[j], arr[j+1] = arr[j+1], arr[j]",
      "            swapped = True",
      "return arr"
    ],
    steps: [
      {
        elements: makeArrayElements([5, 2, 8, 1, 4], [], null, { j: 0 }),
        variables: { i: 0, j: 0, "Swapped": "false" },
        codeLine: 2,
        explanation: "Start pass i = 0. Compare adjacent elements at index j = 0 and j + 1 = 1."
      },
      {
        elements: makeArrayElements([5, 2, 8, 1, 4], [0, 1], null, { j: 0 }),
        variables: { i: 0, j: 0, "Comparing": "5 and 2", "Should Swap": "true" },
        codeLine: 3,
        explanation: "Compare 5 and 2. Since 5 > 2, they are in the wrong order and must be swapped."
      },
      {
        elements: makeArrayElements([2, 5, 8, 1, 4], [0, 1], null, { j: 0 }, { 0: "selected", 1: "selected" }),
        variables: { i: 0, j: 0, "Swapped": "true", "Swapped elements": "5 and 2" },
        codeLine: 4,
        explanation: "Swap 5 and 2. The array is now [2, 5, 8, 1, 4]."
      },
      {
        elements: makeArrayElements([2, 5, 8, 1, 4], [], null, { j: 1 }),
        variables: { i: 0, j: 1, "Swapped": "true" },
        codeLine: 2,
        explanation: "Advance index j to 1. Compare elements at j = 1 and j + 1 = 2."
      },
      {
        elements: makeArrayElements([2, 5, 8, 1, 4], [1, 2], null, { j: 1 }),
        variables: { i: 0, j: 1, "Comparing": "5 and 8", "Should Swap": "false" },
        codeLine: 3,
        explanation: "Compare 5 and 8. Since 5 < 8, they are already in correct order. No swap."
      },
      {
        elements: makeArrayElements([2, 5, 8, 1, 4], [], null, { j: 2 }),
        variables: { i: 0, j: 2, "Swapped": "true" },
        codeLine: 2,
        explanation: "Advance index j to 2. Compare elements at j = 2 and j + 1 = 3."
      },
      {
        elements: makeArrayElements([2, 5, 8, 1, 4], [2, 3], null, { j: 2 }),
        variables: { i: 0, j: 2, "Comparing": "8 and 1", "Should Swap": "true" },
        codeLine: 3,
        explanation: "Compare 8 and 1. Since 8 > 1, swap them!"
      },
      {
        elements: makeArrayElements([2, 5, 1, 8, 4], [2, 3], null, { j: 2 }, { 2: "selected", 3: "selected" }),
        variables: { i: 0, j: 2, "Swapped": "true", "Swapped elements": "8 and 1" },
        codeLine: 4,
        explanation: "Swap 8 and 1. The array becomes [2, 5, 1, 8, 4]."
      },
      {
        elements: makeArrayElements([2, 5, 1, 8, 4], [], null, { j: 3 }),
        variables: { i: 0, j: 3, "Swapped": "true" },
        codeLine: 2,
        explanation: "Advance index j to 3. Compare elements at j = 3 and j + 1 = 4."
      },
      {
        elements: makeArrayElements([2, 5, 1, 8, 4], [3, 4], null, { j: 3 }),
        variables: { i: 0, j: 3, "Comparing": "8 and 4", "Should Swap": "true" },
        codeLine: 3,
        explanation: "Compare 8 and 4. Since 8 > 4, swap them!"
      },
      {
        elements: makeArrayElements([2, 5, 1, 4, 8], [3, 4], null, { j: 3 }, { 3: "selected", 4: "selected" }),
        variables: { i: 0, j: 3, "Swapped": "true", "Swapped elements": "8 and 4" },
        codeLine: 4,
        explanation: "Swap 8 and 4. The array is now [2, 5, 1, 4, 8]. The largest element (8) has successfully bubbled to the end!"
      },
      {
        elements: makeArrayElements([2, 5, 1, 4, 8], [], null, {}, { 4: "success" }),
        variables: { "Sorted Elements": "8" },
        codeLine: 6,
        explanation: "First bubble pass completed. Element 8 is now guaranteed to be in its sorted position. Continue bubble passes until completely sorted."
      }
    ]
  },

  reverse_linked_list: {
    title: "Reverse Linked List",
    description: "Reverses a singly linked list in-place. Redirects each node's 'next' pointer to point to its predecessor instead of its successor.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    code: [
      "prev = None",
      "curr = head",
      "while curr is not None:",
      "    next_node = curr.next",
      "    curr.next = prev",
      "    prev = curr",
      "    curr = next_node",
      "return prev"
    ],
    steps: [
      {
        elements: [
          { id: 1, label: "1", state: "default", pointers: ["curr"], nextId: 2 },
          { id: 2, label: "2", state: "default", nextId: 3 },
          { id: 3, label: "3", state: "default", nextId: 4 },
          { id: 4, label: "4", state: "default", nextId: 5 },
          { id: 5, label: "5", state: "default" }
        ],
        variables: { Prev: "None", Curr: "Node(1)", "Next Node": "None" },
        codeLine: 1,
        explanation: "Initialize prev pointer to None, and curr pointer to head node (Node 1)."
      },
      {
        elements: [
          { id: 1, label: "1", state: "active", pointers: ["curr"], nextId: 2 },
          { id: 2, label: "2", state: "default", pointers: ["next"], nextId: 3 },
          { id: 3, label: "3", state: "default", nextId: 4 },
          { id: 4, label: "4", state: "default", nextId: 5 },
          { id: 5, label: "5", state: "default" }
        ],
        variables: { Prev: "None", Curr: "Node(1)", "Next Node": "Node(2)" },
        codeLine: 3,
        explanation: "Save curr's next node: next_node = curr.next (Node 2). This prevents losing the rest of the list when we reverse pointers."
      },
      {
        elements: [
          { id: 1, label: "1", state: "selected", pointers: ["curr"], nextId: "None" },
          { id: 2, label: "2", state: "default", pointers: ["next"], nextId: 3 },
          { id: 3, label: "3", state: "default", nextId: 4 },
          { id: 4, label: "4", state: "default", nextId: 5 },
          { id: 5, label: "5", state: "default" }
        ],
        variables: { Prev: "None", Curr: "Node(1)", "Next Node": "Node(2)", "Action": "Node(1).next = None" },
        codeLine: 4,
        explanation: "Reverse the link: set curr.next to prev (None). Node 1 now points back to None."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", pointers: ["curr", "prev"], nextId: "None" },
          { id: 2, label: "2", state: "default", pointers: ["next"], nextId: 3 },
          { id: 3, label: "3", state: "default", nextId: 4 },
          { id: 4, label: "4", state: "default", nextId: 5 },
          { id: 5, label: "5", state: "default" }
        ],
        variables: { Prev: "Node(1)", Curr: "Node(1)", "Next Node": "Node(2)" },
        codeLine: 5,
        explanation: "Move prev forward: prev = curr (Node 1)."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", pointers: ["prev"], nextId: "None" },
          { id: 2, label: "2", state: "active", pointers: ["curr"], nextId: 3 },
          { id: 3, label: "3", state: "default", nextId: 4 },
          { id: 4, label: "4", state: "default", nextId: 5 },
          { id: 5, label: "5", state: "default" }
        ],
        variables: { Prev: "Node(1)", Curr: "Node(2)", "Next Node": "Node(2)" },
        codeLine: 6,
        explanation: "Move curr forward to the saved next node: curr = next_node (Node 2). Repeat the loop."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", pointers: ["prev"], nextId: "None" },
          { id: 2, label: "2", state: "active", pointers: ["curr"], nextId: 3 },
          { id: 3, label: "3", state: "default", pointers: ["next"], nextId: 4 },
          { id: 4, label: "4", state: "default", nextId: 5 },
          { id: 5, label: "5", state: "default" }
        ],
        variables: { Prev: "Node(1)", Curr: "Node(2)", "Next Node": "Node(3)" },
        codeLine: 3,
        explanation: "Save the next node: next_node = curr.next (Node 3)."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", pointers: ["prev"], nextId: "None" },
          { id: 2, label: "2", state: "selected", pointers: ["curr"], nextId: 1 },
          { id: 3, label: "3", state: "default", pointers: ["next"], nextId: 4 },
          { id: 4, label: "4", state: "default", nextId: 5 },
          { id: 5, label: "5", state: "default" }
        ],
        variables: { Prev: "Node(1)", Curr: "Node(2)", "Next Node": "Node(3)", "Action": "Node(2).next = Node(1)" },
        codeLine: 4,
        explanation: "Reverse the link: set curr.next to prev (Node 1). Node 2 now points back to Node 1."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", nextId: "None" },
          { id: 2, label: "2", state: "default", pointers: ["curr", "prev"], nextId: 1 },
          { id: 3, label: "3", state: "default", pointers: ["next"], nextId: 4 },
          { id: 4, label: "4", state: "default", nextId: 5 },
          { id: 5, label: "5", state: "default" }
        ],
        variables: { Prev: "Node(2)", Curr: "Node(2)", "Next Node": "Node(3)" },
        codeLine: 5,
        explanation: "Move prev forward: prev = curr (Node 2)."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", nextId: "None" },
          { id: 2, label: "2", state: "default", pointers: ["prev"], nextId: 1 },
          { id: 3, label: "3", state: "active", pointers: ["curr"], nextId: 4 },
          { id: 4, label: "4", state: "default", nextId: 5 },
          { id: 5, label: "5", state: "default" }
        ],
        variables: { Prev: "Node(2)", Curr: "Node(3)", "Next Node": "Node(3)" },
        codeLine: 6,
        explanation: "Move curr forward: curr = next_node (Node 3)."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", nextId: "None" },
          { id: 2, label: "2", state: "default", pointers: ["prev"], nextId: 1 },
          { id: 3, label: "3", state: "active", pointers: ["curr"], nextId: 4 },
          { id: 4, label: "4", state: "default", pointers: ["next"], nextId: 5 },
          { id: 5, label: "5", state: "default" }
        ],
        variables: { Prev: "Node(2)", Curr: "Node(3)", "Next Node": "Node(4)" },
        codeLine: 3,
        explanation: "Save the next node: next_node = curr.next (Node 4)."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", nextId: "None" },
          { id: 2, label: "2", state: "default", pointers: ["prev"], nextId: 1 },
          { id: 3, label: "3", state: "selected", pointers: ["curr"], nextId: 2 },
          { id: 4, label: "4", state: "default", pointers: ["next"], nextId: 5 },
          { id: 5, label: "5", state: "default" }
        ],
        variables: { Prev: "Node(2)", Curr: "Node(3)", "Next Node": "Node(4)", "Action": "Node(3).next = Node(2)" },
        codeLine: 4,
        explanation: "Reverse the link: set curr.next to prev (Node 2). Node 3 now points back to Node 2."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", nextId: "None" },
          { id: 2, label: "2", state: "default", nextId: 1 },
          { id: 3, label: "3", state: "default", pointers: ["curr", "prev"], nextId: 2 },
          { id: 4, label: "4", state: "default", pointers: ["next"], nextId: 5 },
          { id: 5, label: "5", state: "default" }
        ],
        variables: { Prev: "Node(3)", Curr: "Node(3)", "Next Node": "Node(4)" },
        codeLine: 5,
        explanation: "Move prev forward: prev = curr (Node 3)."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", nextId: "None" },
          { id: 2, label: "2", state: "default", nextId: 1 },
          { id: 3, label: "3", state: "default", pointers: ["prev"], nextId: 2 },
          { id: 4, label: "4", state: "active", pointers: ["curr"], nextId: 5 },
          { id: 5, label: "5", state: "default" }
        ],
        variables: { Prev: "Node(3)", Curr: "Node(4)", "Next Node": "Node(4)" },
        codeLine: 6,
        explanation: "Move curr forward: curr = next_node (Node 4)."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", nextId: "None" },
          { id: 2, label: "2", state: "default", nextId: 1 },
          { id: 3, label: "3", state: "default", pointers: ["prev"], nextId: 2 },
          { id: 4, label: "4", state: "active", pointers: ["curr"], nextId: 5 },
          { id: 5, label: "5", state: "default", pointers: ["next"] }
        ],
        variables: { Prev: "Node(3)", Curr: "Node(4)", "Next Node": "Node(5)" },
        codeLine: 3,
        explanation: "Save the next node: next_node = curr.next (Node 5)."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", nextId: "None" },
          { id: 2, label: "2", state: "default", nextId: 1 },
          { id: 3, label: "3", state: "default", nextId: 2 },
          { id: 4, label: "4", state: "selected", pointers: ["curr"], nextId: 3 },
          { id: 5, label: "5", state: "default", pointers: ["next"] }
        ],
        variables: { Prev: "Node(3)", Curr: "Node(4)", "Next Node": "Node(5)", "Action": "Node(4).next = Node(3)" },
        codeLine: 4,
        explanation: "Reverse the link: set curr.next to prev (Node 3). Node 4 now points back to Node 3."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", nextId: "None" },
          { id: 2, label: "2", state: "default", nextId: 1 },
          { id: 3, label: "3", state: "default", nextId: 2 },
          { id: 4, label: "4", state: "default", pointers: ["curr", "prev"], nextId: 3 },
          { id: 5, label: "5", state: "default", pointers: ["next"] }
        ],
        variables: { Prev: "Node(4)", Curr: "Node(4)", "Next Node": "Node(5)" },
        codeLine: 5,
        explanation: "Move prev forward: prev = curr (Node 4)."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", nextId: "None" },
          { id: 2, label: "2", state: "default", nextId: 1 },
          { id: 3, label: "3", state: "default", nextId: 2 },
          { id: 4, label: "4", state: "default", pointers: ["prev"], nextId: 3 },
          { id: 5, label: "5", state: "active", pointers: ["curr"], nextId: "None" }
        ],
        variables: { Prev: "Node(4)", Curr: "Node(5)", "Next Node": "None" },
        codeLine: 6,
        explanation: "Move curr forward: curr = next_node (Node 5)."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", nextId: "None" },
          { id: 2, label: "2", state: "default", nextId: 1 },
          { id: 3, label: "3", state: "default", nextId: 2 },
          { id: 4, label: "4", state: "default", pointers: ["prev"], nextId: 3 },
          { id: 5, label: "5", state: "active", pointers: ["curr"], nextId: "None" }
        ],
        variables: { Prev: "Node(4)", Curr: "Node(5)", "Next Node": "None" },
        codeLine: 3,
        explanation: "Save the next node: next_node = curr.next (None)."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", nextId: "None" },
          { id: 2, label: "2", state: "default", nextId: 1 },
          { id: 3, label: "3", state: "default", nextId: 2 },
          { id: 4, label: "4", state: "default", nextId: 3 },
          { id: 5, label: "5", state: "selected", pointers: ["curr"], nextId: 4 }
        ],
        variables: { Prev: "Node(4)", Curr: "Node(5)", "Next Node": "None", "Action": "Node(5).next = Node(4)" },
        codeLine: 4,
        explanation: "Reverse the link: set curr.next to prev (Node 4). Node 5 now points back to Node 4."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", nextId: "None" },
          { id: 2, label: "2", state: "default", nextId: 1 },
          { id: 3, label: "3", state: "default", nextId: 2 },
          { id: 4, label: "4", state: "default", nextId: 3 },
          { id: 5, label: "5", state: "default", pointers: ["curr", "prev"], nextId: 4 }
        ],
        variables: { Prev: "Node(5)", Curr: "Node(5)", "Next Node": "None" },
        codeLine: 5,
        explanation: "Move prev forward: prev = curr (Node 5)."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", nextId: "None" },
          { id: 2, label: "2", state: "default", nextId: 1 },
          { id: 3, label: "3", state: "default", nextId: 2 },
          { id: 4, label: "4", state: "default", nextId: 3 },
          { id: 5, label: "5", state: "default", pointers: ["prev"], nextId: 4 }
        ],
        variables: { Prev: "Node(5)", Curr: "None", "Next Node": "None" },
        codeLine: 6,
        explanation: "Move curr forward: curr = next_node (None). The loop terminates because curr is None."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", nextId: "None" },
          { id: 2, label: "2", state: "default", nextId: 1 },
          { id: 3, label: "3", state: "default", nextId: 2 },
          { id: 4, label: "4", state: "default", nextId: 3 },
          { id: 5, label: "5", state: "success", pointers: ["New Head"], nextId: 4 }
        ],
        variables: { Prev: "Node(5)", Curr: "None" },
        codeLine: 7,
        explanation: "Reversal complete! Return prev (Node 5) as the new head of our reversed linked list."
      }
    ]
  },

  fibonacci_dp: {
    title: "Fibonacci (Dynamic Programming)",
    description: "Computes the n-th Fibonacci number using DP tabulation. Solves smaller subproblems first and stores their results in an array to avoid redundant calculations.",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    code: [
      "dp = [0] * (n + 1)     # DP table",
      "dp[0] = 0",
      "dp[1] = 1",
      "for i in range(2, n + 1):",
      "    dp[i] = dp[i-1] + dp[i-2]",
      "return dp[n]"
    ],
    steps: [
      {
        elements: makeArrayElements(["?", "?", "?", "?", "?", "?", "?"], [], null, {}),
        variables: { n: 6, i: "?" },
        codeLine: 0,
        explanation: "Initialize DP table of size n + 1 (7 cells) to store computed subproblem answers."
      },
      {
        elements: makeArrayElements([0, "?", "?", "?", "?", "?", "?"], [], null, {}),
        variables: { n: 6, i: "?", "dp[0]": 0 },
        codeLine: 1,
        explanation: "Base case: Set dp[0] = 0."
      },
      {
        elements: makeArrayElements([0, 1, "?", "?", "?", "?", "?"], [], null, {}),
        variables: { n: 6, i: "?", "dp[0]": 0, "dp[1]": 1 },
        codeLine: 2,
        explanation: "Base case: Set dp[1] = 1."
      },
      {
        elements: makeArrayElements([0, 1, "?", "?", "?", "?", "?"], [], null, { i: 2 }),
        variables: { n: 6, i: 2 },
        codeLine: 3,
        explanation: "Begin loop. We will calculate dp[i] for i = 2."
      },
      {
        elements: makeArrayElements([0, 1, 1, "?", "?", "?", "?"], [0, 1], 2, { i: 2 }),
        variables: { n: 6, i: 2, "Sum": "0 + 1", "dp[2]": 1 },
        codeLine: 4,
        explanation: "Calculate dp[2] = dp[1] + dp[0] = 1 + 0 = 1. Highlight dependencies dp[0] and dp[1]."
      },
      {
        elements: makeArrayElements([0, 1, 1, "?", "?", "?", "?"], [], null, { i: 3 }),
        variables: { n: 6, i: 3 },
        codeLine: 3,
        explanation: "Advance loop index to i = 3."
      },
      {
        elements: makeArrayElements([0, 1, 1, 2, "?", "?", "?"], [1, 2], 3, { i: 3 }),
        variables: { n: 6, i: 3, "Sum": "1 + 1", "dp[3]": 2 },
        codeLine: 4,
        explanation: "Calculate dp[3] = dp[2] + dp[1] = 1 + 1 = 2."
      },
      {
        elements: makeArrayElements([0, 1, 1, 2, "?", "?", "?"], [], null, { i: 4 }),
        variables: { n: 6, i: 4 },
        codeLine: 3,
        explanation: "Advance loop index to i = 4."
      },
      {
        elements: makeArrayElements([0, 1, 1, 2, 3, "?", "?"], [2, 3], 4, { i: 4 }),
        variables: { n: 6, i: 4, "Sum": "1 + 2", "dp[4]": 3 },
        codeLine: 4,
        explanation: "Calculate dp[4] = dp[3] + dp[2] = 2 + 1 = 3."
      },
      {
        elements: makeArrayElements([0, 1, 1, 2, 3, "?", "?"], [], null, { i: 5 }),
        variables: { n: 6, i: 5 },
        codeLine: 3,
        explanation: "Advance loop index to i = 5."
      },
      {
        elements: makeArrayElements([0, 1, 1, 2, 3, 5, "?"], [3, 4], 5, { i: 5 }),
        variables: { n: 6, i: 5, "Sum": "2 + 3", "dp[5]": 5 },
        codeLine: 4,
        explanation: "Calculate dp[5] = dp[4] + dp[3] = 3 + 2 = 5."
      },
      {
        elements: makeArrayElements([0, 1, 1, 2, 3, 5, "?"], [], null, { i: 6 }),
        variables: { n: 6, i: 6 },
        codeLine: 3,
        explanation: "Advance loop index to i = 6."
      },
      {
        elements: makeArrayElements([0, 1, 1, 2, 3, 5, 8], [4, 5], 6, { i: 6 }),
        variables: { n: 6, i: 6, "Sum": "3 + 5", "dp[6]": 8 },
        codeLine: 4,
        explanation: "Calculate dp[6] = dp[5] + dp[4] = 5 + 3 = 8."
      },
      {
        elements: makeArrayElements([0, 1, 1, 2, 3, 5, 8], [], null, {}, { 6: "success" }),
        variables: { n: 6, "Result": 8 },
        codeLine: 5,
        explanation: "Calculation complete! Return dp[6] which is 8."
      }
    ]
  },

  stack_operations: {
    title: "Stack (Push & Pop)",
    description: "Visualizes LIFO (Last-In, First-Out) operations on a Stack. Elements are appended to the top of the stack and popped off in reverse order.",
    timeComplexity: "O(1)",
    spaceComplexity: "O(n)",
    code: [
      "stack = []",
      "# Push Operation",
      "stack.append(x)",
      "# Pop Operation",
      "if not stack.is_empty():",
      "    val = stack.pop()",
      "    return val"
    ],
    steps: [
      {
        elements: makeArrayElements([], [], null, {}),
        variables: { "Stack Size": 0, "Action": "\"Initialize empty stack\"" },
        codeLine: 0,
        explanation: "Initialize an empty stack. Pointers like Top will point to None."
      },
      {
        elements: makeArrayElements(["A"], [0], null, { Top: 0 }),
        variables: { "Stack Size": 1, "Action": "\"Push 'A'\"", "Top Element": "\"A\"" },
        codeLine: 2,
        explanation: "Push 'A' onto the stack. It is placed at index 0, and the Top pointer shifts to point to it."
      },
      {
        elements: makeArrayElements(["A", "B"], [1], null, { Top: 1 }),
        variables: { "Stack Size": 2, "Action": "\"Push 'B'\"", "Top Element": "\"B\"" },
        codeLine: 2,
        explanation: "Push 'B' onto the stack. It is appended at index 1. Top pointer advances to index 1."
      },
      {
        elements: makeArrayElements(["A", "B", "C"], [2], null, { Top: 2 }),
        variables: { "Stack Size": 3, "Action": "\"Push 'C'\"", "Top Element": "\"C\"" },
        codeLine: 2,
        explanation: "Push 'C' onto the stack. It is appended at index 2. Top pointer advances to index 2."
      },
      {
        elements: makeArrayElements(["A", "B", "C"], [], null, { Top: 2 }),
        variables: { "Stack Size": 3, "Action": "\"Ready to pop\"", "Top Element": "\"C\"" },
        codeLine: 4,
        explanation: "We check if the stack is empty. It is not, so we can safely pop the top element."
      },
      {
        elements: makeArrayElements(["A", "B", "C"], [2], null, { Top: 2 }, { 2: "selected" }),
        variables: { "Stack Size": 3, "Action": "\"Pop top element\"", "Top Element": "\"C\"" },
        codeLine: 5,
        explanation: "Identify the top element to be popped: 'C' at index 2."
      },
      {
        elements: makeArrayElements(["A", "B"], [], null, { Top: 1 }, { 1: "success" }),
        variables: { "Stack Size": 2, "Action": "\"C popped!\"", "Top Element": "\"B\"", "Returned Value": "\"C\"" },
        codeLine: 6,
        explanation: "Pop complete! 'C' is removed and returned. Top pointer moves back to 'B' at index 1."
      },
      {
        elements: makeArrayElements(["A", "B", "D"], [2], null, { Top: 2 }),
        variables: { "Stack Size": 3, "Action": "\"Push 'D'\"", "Top Element": "\"D\"" },
        codeLine: 2,
        explanation: "Push 'D' onto the stack. It is placed on top of 'B' at index 2. Top pointer advances to index 2."
      }
    ]
  },

  linked_list_insertion: {
    title: "Linked List Insertion",
    description: "Visualizes inserting a new node 'NEW' after a target node in a Singly Linked List. Re-routes the node pointers step-by-step without shifting any existing elements.",
    timeComplexity: "O(1) (at pointer), O(n) (to traverse)",
    spaceComplexity: "O(1)",
    code: [
      "new_node = Node('NEW')",
      "curr = head  # Traverse to target Node 2",
      "while curr.val != '2':",
      "    curr = curr.next",
      "new_node.next = curr.next",
      "curr.next = new_node"
    ],
    steps: [
      {
        elements: [
          { id: 1, label: "1", state: "default", pointers: ["head", "curr"], nextId: 2 },
          { id: 2, label: "2", state: "default", nextId: 3 },
          { id: 3, label: "3", state: "default", nextId: 4 },
          { id: 4, label: "4", state: "default" }
        ],
        variables: { "Current Val": "Node(1)", "New Node": "None" },
        codeLine: 1,
        explanation: "We want to insert a node with value 'NEW' after Node 2. Initialize curr pointer at the head."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", pointers: ["head", "curr"], nextId: 2 },
          { id: 2, label: "2", state: "default", nextId: 3 },
          { id: 3, label: "3", state: "default", nextId: 4 },
          { id: 4, label: "4", state: "default" },
          { id: 99, label: "NEW", state: "active", pointers: ["new_node"] }
        ],
        variables: { "Current Val": "Node(1)", "New Node": "Node('NEW')" },
        codeLine: 0,
        explanation: "Create the new node with value 'NEW' in memory."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", pointers: ["head"], nextId: 2 },
          { id: 2, label: "2", state: "active", pointers: ["curr"], nextId: 3 },
          { id: 3, label: "3", state: "default", nextId: 4 },
          { id: 4, label: "4", state: "default" },
          { id: 99, label: "NEW", state: "default", pointers: ["new_node"] }
        ],
        variables: { "Current Val": "Node(2)", "New Node": "Node('NEW')" },
        codeLine: 3,
        explanation: "Traverse current pointer forward until we reach the target node with value '2'."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", pointers: ["head"], nextId: 2 },
          { id: 2, label: "2", state: "default", pointers: ["curr"], nextId: 3 },
          { id: 99, label: "NEW", state: "selected", pointers: ["new_node"], nextId: 3 },
          { id: 3, label: "3", state: "default", nextId: 4 },
          { id: 4, label: "4", state: "default" }
        ],
        variables: { "Current Val": "Node(2)", "New Node": "Node('NEW')", "new_node.next": "Node(3)" },
        codeLine: 4,
        explanation: "Route the new node's next link to point to curr.next (Node 3). Now 'NEW' is pointing to Node 3."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", pointers: ["head"], nextId: 2 },
          { id: 2, label: "2", state: "selected", pointers: ["curr"], nextId: 99 },
          { id: 99, label: "NEW", state: "success", pointers: ["new_node"], nextId: 3 },
          { id: 3, label: "3", state: "default", nextId: 4 },
          { id: 4, label: "4", state: "default" }
        ],
        variables: { "Current Val": "Node(2)", "New Node": "Node('NEW')", "curr.next": "Node('NEW')" },
        codeLine: 5,
        explanation: "Re-route curr's next pointer to point to the new node. Target Node 2 now points to 'NEW'."
      },
      {
        elements: [
          { id: 1, label: "1", state: "default", pointers: ["head"], nextId: 2 },
          { id: 2, label: "2", state: "default", nextId: 99 },
          { id: 99, label: "NEW", state: "success", nextId: 3 },
          { id: 3, label: "3", state: "default", nextId: 4 },
          { id: 4, label: "4", state: "default" }
        ],
        variables: { "Status": "\"Insertion successful\"" },
        codeLine: 5,
        explanation: "Insertion complete! The linked list order is now 1 -> 2 -> NEW -> 3 -> 4."
      }
    ]
  },

  hashmap_operations: {
    title: "Hashmap Operations",
    description: "Visualizes how a key-value pair is mapped to a bucket index using a Hash Function, and retrieved in O(1) time complexity.",
    timeComplexity: "O(1) (average)",
    spaceComplexity: "O(n)",
    code: [
      "# Hashmap of capacity 5",
      "idx = hash(key) % 5",
      "buckets[idx] = value",
      "# Lookup key",
      "idx_lookup = hash(key) % 5",
      "val = buckets[idx_lookup]"
    ],
    steps: [
      {
        elements: makeArrayElements(["?", "?", "?", "?", "?"], [], null, {}),
        variables: { "Key": "None", "Value": "None", "Bucket Index": "?" },
        codeLine: 0,
        explanation: "Initialize an empty hashmap with 5 buckets (indices 0 to 4)."
      },
      {
        elements: makeArrayElements(["?", "?", "?", "?", "?"], [], null, { "hash(\"data\") % 5": 2 }),
        variables: { "Key": "\"data\"", "Value": 88, "Bucket Index": 2 },
        codeLine: 1,
        explanation: "To insert key 'data' with value 88, calculate hash index: hash('data') % 5 = 2."
      },
      {
        elements: makeArrayElements(["?", "?", 88, "?", "?"], [2], 2, { "buckets[2]": 2 }),
        variables: { "Key": "\"data\"", "Value": 88, "Bucket Index": 2, "Action": "\"Inserted 88\"" },
        codeLine: 2,
        explanation: "Store value 88 inside the bucket at index 2."
      },
      {
        elements: makeArrayElements(["?", "?", 88, "?", "?"], [], null, { "hash(\"token\") % 5": 0 }),
        variables: { "Key": "\"token\"", "Value": 12, "Bucket Index": 0 },
        codeLine: 1,
        explanation: "To insert key 'token' with value 12, calculate hash index: hash('token') % 5 = 0."
      },
      {
        elements: makeArrayElements([12, "?", 88, "?", "?"], [0], 0, { "buckets[0]": 0 }),
        variables: { "Key": "\"token\"", "Value": 12, "Bucket Index": 0, "Action": "\"Inserted 12\"" },
        codeLine: 2,
        explanation: "Store value 12 inside the bucket at index 0."
      },
      {
        elements: makeArrayElements([12, "?", 88, "?", "?"], [2], null, { "hash(\"data\") % 5": 2 }),
        variables: { "Query Key": "\"data\"", "Bucket Index": 2, "Action": "\"Lookup index\"" },
        codeLine: 4,
        explanation: "To retrieve 'data', calculate index hash('data') % 5 = 2. Go straight to bucket index 2."
      },
      {
        elements: makeArrayElements([12, "?", 88, "?", "?"], [], null, { "buckets[2]": 2 }, { 2: "success" }),
        variables: { "Query Key": "\"data\"", "Bucket Index": 2, "Value Found": 88 },
        codeLine: 5,
        explanation: "Constant time lookup complete! Key 'data' retrieved with value 88 directly from index 2."
      }
    ]
  }
};
