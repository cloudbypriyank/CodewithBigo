// Type Definitions for LeetCode Questions
export interface LeetCodeQuestion {
  id: string;
  num: number;
  title: string;
  url: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companies: string[];
  preRequisite?: string;
  done?: boolean;
}

export interface LeetCodeCategory {
  category: string;
  questions: LeetCodeQuestion[];
}

export const leetCodeData: LeetCodeCategory[] = [
  {
    category: "ARRAYS",
    questions: [
          {
                "id": "arrays-1",
                "num": 1,
                "title": "Majority Element",
                "url": "https://leetcode.com/problems/majority-element/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "Google"
                ],
                "done": true
          },
          {
                "id": "arrays-2",
                "num": 2,
                "title": "Repeat & missing number",
                "url": "https://leetcode.com/problems/missing-number/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon"
                ],
                "preRequisite": "Hashing",
                "done": true
          },
          {
                "id": "arrays-3",
                "num": 3,
                "title": "Merge 2 sorted array without xtra space",
                "url": "https://leetcode.com/problems/merge-sorted-array/",
                "difficulty": "Easy",
                "companies": [
                      "Amdocs",
                      "Brocade",
                      "Goldman Sachs",
                      "Juniper Networks",
                      "LinkedIn",
                      "Microsoft",
                      "Quikr",
                      "Snapdeal",
                      "Synopsys",
                      "Zoho",
                      "Adobe"
                ],
                "preRequisite": "Sorting",
                "done": true
          },
          {
                "id": "arrays-4",
                "num": 4,
                "title": "Single Number",
                "url": "https://leetcode.com/problems/single-number/",
                "difficulty": "Easy",
                "companies": [],
                "done": true
          },
          {
                "id": "arrays-5",
                "num": 5,
                "title": "Stock Buy & Sell",
                "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "DEShaw",
                      "Directi",
                      "Flipkart",
                      "Goldman Sachs",
                      "Intuit",
                      "MakeMyTrip",
                      "Microsoft",
                      "Ola Cabs",
                      "Oracle",
                      "Paytm",
                      "Pubmatic",
                      "Quikr",
                      "Salesforce",
                      "Sapient",
                      "Swiggy",
                      "Walmart",
                      "Media.net",
                      "Google"
                ],
                "done": true
          },
          {
                "id": "arrays-6",
                "num": 6,
                "title": "Kadane's Algorithm",
                "url": "https://leetcode.com/problems/maximum-subarray/",
                "difficulty": "Medium",
                "companies": [
                      "Microsoft",
                      "Meta"
                ],
                "done": false
          },
          {
                "id": "arrays-7",
                "num": 7,
                "title": "Pow xn",
                "url": "https://leetcode.com/problems/powx-n/",
                "difficulty": "Medium",
                "companies": [],
                "done": false
          },
          {
                "id": "arrays-8",
                "num": 8,
                "title": "Container with most water",
                "url": "https://leetcode.com/problems/container-with-most-water/",
                "difficulty": "Medium",
                "companies": [
                      "Flipkart",
                      "Dunzo"
                ],
                "done": false
          },
          {
                "id": "arrays-9",
                "num": 9,
                "title": "Sort array of 0s, 1s & 2s",
                "url": "https://leetcode.com/problems/sort-colors/",
                "difficulty": "Medium",
                "companies": [
                      "Microsoft",
                      "Amazon",
                      "MakeMyTrip"
                ],
                "preRequisite": "Sorting",
                "done": false
          },
          {
                "id": "arrays-10",
                "num": 10,
                "title": "3Sum",
                "url": "https://leetcode.com/problems/3sum/",
                "difficulty": "Medium",
                "companies": [
                      "Adobe",
                      "Amazon",
                      "Microsoft",
                      "Morgan Stanley",
                      "Samsung",
                      "Snapdeal",
                      "Times Internet"
                ],
                "preRequisite": "Hashing",
                "done": true
          },
          {
                "id": "arrays-11",
                "num": 11,
                "title": "4Sum",
                "url": "https://leetcode.com/problems/4sum/",
                "difficulty": "Medium",
                "companies": [],
                "preRequisite": "Hashing",
                "done": true
          },
          {
                "id": "arrays-12",
                "num": 12,
                "title": "Search a 2D matrix",
                "url": "https://leetcode.com/problems/search-a-2d-matrix/",
                "difficulty": "Medium",
                "companies": [],
                "preRequisite": "2D Array",
                "done": false
          },
          {
                "id": "arrays-13",
                "num": 13,
                "title": "Next permutation",
                "url": "https://leetcode.com/problems/next-permutation/",
                "difficulty": "Medium",
                "companies": [
                      "Adobe",
                      "GoldmanSachs",
                      "Uber"
                ],
                "preRequisite": "Sorting",
                "done": true
          },
          {
                "id": "arrays-14",
                "num": 14,
                "title": "Merge overlapping intervals",
                "url": "https://leetcode.com/problems/merge-overlapping-intervals/",
                "difficulty": "Medium",
                "companies": [
                      "Google"
                ],
                "preRequisite": "Sorting",
                "done": false
          },
          {
                "id": "arrays-15",
                "num": 15,
                "title": "Longest substring without repeating",
                "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
                "difficulty": "Medium",
                "companies": [
                      "MorganStanley",
                      "Amazon"
                ],
                "preRequisite": "String",
                "done": false
          },
          {
                "id": "arrays-16",
                "num": 16,
                "title": "Set matrix zeroes",
                "url": "https://leetcode.com/problems/set-matrix-zeroes/",
                "difficulty": "Medium",
                "companies": [
                      "Microsoft",
                      "Amazon"
                ],
                "preRequisite": "Sets",
                "done": false
          },
          {
                "id": "arrays-17",
                "num": 17,
                "title": "Word search",
                "url": "https://leetcode.com/problems/word-search/",
                "difficulty": "Medium",
                "companies": [
                      "Ola Cabs",
                      "GoldmanSachs",
                      "Google"
                ],
                "preRequisite": "Recursion",
                "done": false
          },
          {
                "id": "arrays-18",
                "num": 18,
                "title": "Product of array except itself",
                "url": "https://leetcode.com/problems/product-of-array-except-self/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "DEShaw",
                      "Intuit",
                      "MorganStanley",
                      "Flipkart"
                ],
                "done": false
          },
          {
                "id": "arrays-19",
                "num": 19,
                "title": "Subarray sum equals k",
                "url": "https://leetcode.com/problems/subarray-sum-equals-k/",
                "difficulty": "Medium",
                "companies": [],
                "preRequisite": "Hashing",
                "done": true
          },
          {
                "id": "arrays-20",
                "num": 20,
                "title": "Find Duplicate",
                "url": "https://leetcode.com/problems/find-the-duplicate-number/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "DE Shaw",
                      "Flipkart",
                      "Paytm",
                      "Qualcomm",
                      "Zoho"
                ],
                "preRequisite": "LL Cycles",
                "done": true
          },
          {
                "id": "arrays-21",
                "num": 21,
                "title": "Count Inversions",
                "url": "https://leetcode.com/problems/count-inversions/",
                "difficulty": "Hard",
                "companies": [
                      "Adobe",
                      "Amazon",
                      "BankBazaar",
                      "Flipkart",
                      "Microsoft",
                      "Myntra",
                      "MakeMyTrip"
                ],
                "preRequisite": "Merge Sort",
                "done": false
          },
          {
                "id": "arrays-22",
                "num": 22,
                "title": "Trapping Rainwater",
                "url": "https://leetcode.com/problems/trapping-rain-water/",
                "difficulty": "Hard",
                "companies": [
                      "Samsung"
                ],
                "done": false
          },
          {
                "id": "arrays-23",
                "num": 23,
                "title": "Sliding window maximum",
                "url": "https://leetcode.com/problems/sliding-window-maximum/",
                "difficulty": "Hard",
                "companies": [
                      "Amazon",
                      "Directi",
                      "Flipkart",
                      "Microsoft",
                      "Google"
                ],
                "preRequisite": "Hashing",
                "done": false
          },
          {
                "id": "arrays-24",
                "num": 24,
                "title": "Reverse pairs",
                "url": "https://leetcode.com/problems/reverse-pairs/",
                "difficulty": "Hard",
                "companies": [],
                "preRequisite": "Merge Sort",
                "done": false
          },
          {
                "id": "arrays-25",
                "num": 25,
                "title": "Largest rectangle in a histogram",
                "url": "https://leetcode.com/problems/largest-rectangle-in-a-histogram/",
                "difficulty": "Hard",
                "companies": [],
                "done": false
          }
    ]
  },
  {
    category: "BINARY SEARCH",
    questions: [
          {
                "id": "binary search-1",
                "num": 1,
                "title": "Search in rotated sorted",
                "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
                "difficulty": "Medium",
                "companies": [
                      "Microsoft",
                      "Google",
                      "Adobe",
                      "Amazon",
                      "DE Shaw",
                      "Flipkart",
                      "Hike",
                      "Intuit",
                      "MakeMyTrip",
                      "Paytm"
                ],
                "done": false
          },
          {
                "id": "binary search-2",
                "num": 2,
                "title": "Peak index in mountain array",
                "url": "https://leetcode.com/problems/peak-index-in-a-mountain-array/",
                "difficulty": "Medium",
                "companies": [],
                "done": false
          },
          {
                "id": "binary search-3",
                "num": 3,
                "title": "Single element in sorted array",
                "url": "https://leetcode.com/problems/single-element-in-a-sorted-array/",
                "difficulty": "Medium",
                "companies": [],
                "done": false
          },
          {
                "id": "binary search-4",
                "num": 4,
                "title": "Allocate Minimum Pages (Book Allocation)",
                "url": "https://leetcode.com/problems/book-allocation-problem/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Infosys",
                      "Codenation",
                      "Amazon",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "binary search-5",
                "num": 5,
                "title": "Painter’s Partition",
                "url": "https://leetcode.com/problems/painters-partition-problem/",
                "difficulty": "Medium",
                "companies": [],
                "done": false
          },
          {
                "id": "binary search-6",
                "num": 6,
                "title": "Aggressive cows",
                "url": "https://leetcode.com/problems/aggressive-cows/",
                "difficulty": "Medium",
                "companies": [
                      "Adobe"
                ],
                "done": false
          },
          {
                "id": "binary search-7",
                "num": 7,
                "title": "Median of 2 Sorted Arrays",
                "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
                "difficulty": "Hard",
                "companies": [
                      "Amazon",
                      "Samsung",
                      "Microsoft",
                      "Google"
                ],
                "done": false
          }
    ]
  },
  {
    category: "STRINGS",
    questions: [
          {
                "id": "strings-1",
                "num": 1,
                "title": "Valid Palindrome",
                "url": "https://leetcode.com/problems/valid-palindrome/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "Cisco",
                      "DEShaw",
                      "Meta",
                      "FactSet",
                      "MorganStanley",
                      "Paytm",
                      "Zoho"
                ],
                "done": true
          },
          {
                "id": "strings-2",
                "num": 2,
                "title": "Longest Common Prefix",
                "url": "https://leetcode.com/problems/longest-common-prefix/",
                "difficulty": "Easy",
                "companies": [
                      "Adobe",
                      "Blinkit",
                      "Dunzo"
                ],
                "done": false
          },
          {
                "id": "strings-3",
                "num": 3,
                "title": "Valid Anagram",
                "url": "https://leetcode.com/problems/valid-anagram/",
                "difficulty": "Easy",
                "companies": [
                      "Google",
                      "Adobe",
                      "Flipkart",
                      "Nagarro",
                      "Media.net",
                      "Directi"
                ],
                "done": false
          },
          {
                "id": "strings-4",
                "num": 4,
                "title": "Reverse Words in String",
                "url": "https://leetcode.com/problems/reverse-words-in-a-string/",
                "difficulty": "Medium",
                "companies": [],
                "done": true
          },
          {
                "id": "strings-5",
                "num": 5,
                "title": "Remove All Occurrences of String",
                "url": "https://leetcode.com/problems/remove-all-occurrences-of-a-substring/",
                "difficulty": "Medium",
                "companies": [],
                "done": false
          },
          {
                "id": "strings-6",
                "num": 6,
                "title": "Permutation in String",
                "url": "https://leetcode.com/problems/permutation-in-string/",
                "difficulty": "Medium",
                "companies": [
                      "Adobe",
                      "GoldmanSachs",
                      "Uber"
                ],
                "done": false
          },
          {
                "id": "strings-7",
                "num": 7,
                "title": "String Compression",
                "url": "https://leetcode.com/problems/string-compression/",
                "difficulty": "Medium",
                "companies": [],
                "done": false
          },
          {
                "id": "strings-8",
                "num": 8,
                "title": "Group Anagrams",
                "url": "https://leetcode.com/problems/group-anagrams/",
                "difficulty": "Medium",
                "companies": [
                      "Samsung",
                      "Adobe",
                      "Amazon"
                ],
                "done": false
          },
          {
                "id": "strings-9",
                "num": 9,
                "title": "Minimum Window Substring",
                "url": "https://leetcode.com/problems/minimum-window-substring/",
                "difficulty": "Hard",
                "companies": [
                      "Amazon",
                      "Google",
                      "MakeMyTrip",
                      "Streamoid",
                      "Technologies",
                      "Microsoft",
                      "Media.net",
                      "Atlassian",
                      "Flipkart"
                ],
                "done": false
          },
          {
                "id": "strings-10",
                "num": 10,
                "title": "Kmp Algorithm",
                "url": "https://leetcode.com/problems/kmp-algorithm/",
                "difficulty": "Hard",
                "companies": [],
                "done": false
          },
          {
                "id": "strings-11",
                "num": 11,
                "title": "Robin Karp",
                "url": "https://leetcode.com/problems/robin-karp/",
                "difficulty": "Hard",
                "companies": [],
                "done": false
          }
    ]
  },
  {
    category: "RECURSION & BACKTRACKING",
    questions: [
          {
                "id": "recursion & backtracking-1",
                "num": 1,
                "title": "Combination Sum I",
                "url": "https://leetcode.com/problems/combination-sum-i/",
                "difficulty": "Medium",
                "companies": [
                      "Adobe Amazon Microsoft oracle",
                      "DE shaw",
                      "Salesforce"
                ],
                "done": false
          },
          {
                "id": "recursion & backtracking-2",
                "num": 2,
                "title": "Combination Sum II",
                "url": "https://leetcode.com/problems/combination-sum-ii/",
                "difficulty": "Medium",
                "companies": [
                      "Adobe",
                      "Amazon",
                      "Microsoft",
                      "Goldmann",
                      "Sach",
                      "Oracle"
                ],
                "done": false
          },
          {
                "id": "recursion & backtracking-3",
                "num": 3,
                "title": "Palindrome Partitioning",
                "url": "https://leetcode.com/problems/palindrome-partitioning/",
                "difficulty": "Medium",
                "companies": [
                      "Meta",
                      "Adobe",
                      "Infosys",
                      "Walmart Labs",
                      "Amazon Microsoft"
                ],
                "done": false
          },
          {
                "id": "recursion & backtracking-4",
                "num": 4,
                "title": "Knights Tour",
                "url": "https://leetcode.com/problems/knights-tour/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Amazon",
                      "Microsoft",
                      "Oracle",
                      "Meta",
                      "TCS",
                      "Apple",
                      "Salesfoce",
                      "Citadel"
                ],
                "done": false
          },
          {
                "id": "recursion & backtracking-5",
                "num": 5,
                "title": "M Coloring",
                "url": "https://leetcode.com/problems/m-coloring/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Amazon",
                      "Microsoft",
                      "Meta",
                      "Intuit",
                      "Citadel",
                      "Goldman Sachs",
                      "Oracle"
                ],
                "done": false
          },
          {
                "id": "recursion & backtracking-6",
                "num": 6,
                "title": "Rat in a Maze",
                "url": "https://leetcode.com/problems/rat-in-a-maze/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon"
                ],
                "done": false
          },
          {
                "id": "recursion & backtracking-7",
                "num": 7,
                "title": "Subsets II",
                "url": "https://leetcode.com/problems/subsets-ii/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Amazon",
                      "Microsoft",
                      "Meta",
                      "Adobe",
                      "Apple",
                      "TCS",
                      "Flipkart",
                      "Uber",
                      "Swiggy"
                ],
                "done": false
          },
          {
                "id": "recursion & backtracking-8",
                "num": 8,
                "title": "Merge Sort",
                "url": "https://leetcode.com/problems/merge-sort/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Amazon",
                      "Meta",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "recursion & backtracking-9",
                "num": 9,
                "title": "N Queens",
                "url": "https://leetcode.com/problems/n-queens/",
                "difficulty": "Hard",
                "companies": [
                      "Microsoft",
                      "Amazon"
                ],
                "done": false
          },
          {
                "id": "recursion & backtracking-10",
                "num": 10,
                "title": "Sudoku Solver",
                "url": "https://leetcode.com/problems/sudoku-solver/",
                "difficulty": "Hard",
                "companies": [
                      "Amazon",
                      "TCS",
                      "Apple",
                      "Meta",
                      "Infosys",
                      "Oracle",
                      "Adobe",
                      "Hive"
                ],
                "done": false
          },
          {
                "id": "recursion & backtracking-11",
                "num": 11,
                "title": "Count Inversions",
                "url": "https://leetcode.com/problems/count-inversions/",
                "difficulty": "Hard",
                "companies": [
                      "Google",
                      "Amazon",
                      "Salessforce"
                ],
                "done": false
          }
    ]
  },
  {
    category: "LINKED LIST",
    questions: [
          {
                "id": "linked list-1",
                "num": 1,
                "title": "Reverse a LL",
                "url": "https://leetcode.com/problems/reverse-a-ll/",
                "difficulty": "Easy",
                "companies": [
                      "Google",
                      "Meta",
                      "Apple",
                      "Microsoft",
                      "Amazon",
                      "Oracle",
                      "Adobe",
                      "TCS",
                      "Qualcomm",
                      "PayPal",
                      "JP morgan"
                ],
                "done": true
          },
          {
                "id": "linked list-2",
                "num": 2,
                "title": "Middle of LL",
                "url": "https://leetcode.com/problems/middle-of-ll/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "Meta",
                      "Google",
                      "Goldman Sachs",
                      "Qualcomm",
                      "Intuit",
                      "Walmart labs"
                ],
                "done": true
          },
          {
                "id": "linked list-3",
                "num": 3,
                "title": "Merge 2 Sorted LL",
                "url": "https://leetcode.com/problems/merge-2-sorted-ll/",
                "difficulty": "Easy",
                "companies": [
                      "Accolite",
                      "Amazon",
                      "Belzabar",
                      "Brocade",
                      "FactSet",
                      "Flipkart",
                      "MakeMyTrip",
                      "Microsoft",
                      "OATS",
                      "Systems",
                      "Oracle",
                      "Samsung",
                      "Synopsys",
                      "Zoho"
                ],
                "done": true
          },
          {
                "id": "linked list-4",
                "num": 4,
                "title": "Check if LL Is Palindrome or Not",
                "url": "https://leetcode.com/problems/check-if-ll-is-palindrome-or-not/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "Meta",
                      "Google",
                      "Goldman Sachs",
                      "Cisco",
                      "Samsung",
                      "Walmart labs",
                      "Wipro"
                ],
                "done": true
          },
          {
                "id": "linked list-5",
                "num": 5,
                "title": "Detect Cycle in LL",
                "url": "https://leetcode.com/problems/detect-cycle-in-ll/",
                "difficulty": "Easy",
                "companies": [
                      "Google",
                      "Meta",
                      "Microsoft",
                      "Amazon",
                      "Oracle",
                      "Paytm",
                      "Apple",
                      "Nvidia"
                ],
                "done": false
          },
          {
                "id": "linked list-6",
                "num": 6,
                "title": "Remove Cycle in LL",
                "url": "https://leetcode.com/problems/remove-cycle-in-ll/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Meta",
                      "Apple"
                ],
                "done": false
          },
          {
                "id": "linked list-7",
                "num": 7,
                "title": "Flatten LL",
                "url": "https://leetcode.com/problems/flatten-ll/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Amazon",
                      "Meta",
                      "Microsoft",
                      "Qualcomm",
                      "Oracle",
                      "Adobe",
                      "Uber"
                ],
                "done": false
          },
          {
                "id": "linked list-8",
                "num": 8,
                "title": "Clone LL with Random Pointers",
                "url": "https://leetcode.com/problems/clone-ll-with-random-pointers/",
                "difficulty": "Medium",
                "companies": [
                      "Meta",
                      "Amazon",
                      "Microsoft",
                      "Google",
                      "Intel",
                      "Walmart labs",
                      "Nvidia",
                      "Flipkart",
                      "Uber",
                      "Oracle"
                ],
                "done": false
          },
          {
                "id": "linked list-9",
                "num": 9,
                "title": "Add 2 Numbers",
                "url": "https://leetcode.com/problems/add-2-numbers/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Amazon",
                      "Meta",
                      "Microsoft",
                      "Oracle",
                      "Tejas network",
                      "Josh technology",
                      "TCS",
                      "Accenture"
                ],
                "done": false
          },
          {
                "id": "linked list-10",
                "num": 10,
                "title": "Reverse Linked List 2",
                "url": "https://leetcode.com/problems/reverse-linked-list-2/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Amazon",
                      "Meta",
                      "Microsoft",
                      "Adobe",
                      "Uber"
                ],
                "done": false
          },
          {
                "id": "linked list-11",
                "num": 11,
                "title": "LRU Cache",
                "url": "https://leetcode.com/problems/lru-cache/",
                "difficulty": "Medium",
                "companies": [
                      "Nvidia",
                      "Google",
                      "Meta",
                      "Amazon",
                      "Microsoft",
                      "Oracle",
                      "Adobe",
                      "Infoys",
                      "Siemens",
                      "Morgan Stanley"
                ],
                "done": false
          },
          {
                "id": "linked list-12",
                "num": 12,
                "title": "Rotate a LL",
                "url": "https://leetcode.com/problems/rotate-a-ll/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Google",
                      "Meta",
                      "Microsoft",
                      "Salesforce",
                      "Infosys",
                      "Uber",
                      "Apple"
                ],
                "done": false
          },
          {
                "id": "linked list-13",
                "num": 13,
                "title": "Reverse Nodes in K Groups",
                "url": "https://leetcode.com/problems/reverse-nodes-in-k-groups/",
                "difficulty": "Hard",
                "companies": [
                      "Google",
                      "Amazon",
                      "Meta",
                      "Microsoft",
                      "Apple",
                      "Uber",
                      "Adobe",
                      "TCS",
                      "DE shaw",
                      "Zepto"
                ],
                "done": false
          }
    ]
  },
  {
    category: "STACK & QUEUE",
    questions: [
          {
                "id": "stack & queue-1",
                "num": 1,
                "title": "Implement Stack using Queue",
                "url": "https://leetcode.com/problems/implement-stack-using-queue/",
                "difficulty": "Easy",
                "companies": [
                      "Google",
                      "Meta",
                      "Amazon",
                      "Microsoft",
                      "Adobe",
                      "Oracle",
                      "Optum"
                ],
                "done": false
          },
          {
                "id": "stack & queue-2",
                "num": 2,
                "title": "Implement Queue using Stack",
                "url": "https://leetcode.com/problems/implement-queue-using-stack/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "Google",
                      "Microsoft",
                      "Adobe",
                      "Oracle",
                      "Netflix",
                      "Meta",
                      "Uber"
                ],
                "done": false
          },
          {
                "id": "stack & queue-3",
                "num": 3,
                "title": "Next Greater Element I",
                "url": "https://leetcode.com/problems/next-greater-element-i/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "Meta",
                      "Swiggy",
                      "Microsoft",
                      "Google",
                      "Apple",
                      "Morgan Stanley",
                      "Oracle"
                ],
                "done": false
          },
          {
                "id": "stack & queue-4",
                "num": 4,
                "title": "Valid Parenthesis",
                "url": "https://leetcode.com/problems/valid-parenthesis/",
                "difficulty": "Easy",
                "companies": [
                      "Google",
                      "Meta",
                      "Amazon",
                      "LinkedIn",
                      "Intuit",
                      "Visa",
                      "IBM",
                      "TCS",
                      "JP  morgan"
                ],
                "done": false
          },
          {
                "id": "stack & queue-5",
                "num": 5,
                "title": "1st Non Repeating in Stream",
                "url": "https://leetcode.com/problems/1st-non-repeating-in-stream/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "Goldman sach",
                      "Google",
                      "Apple",
                      "Meta",
                      "Microsoft",
                      "Walmart labs",
                      "Adobe",
                      "TCS"
                ],
                "done": false
          },
          {
                "id": "stack & queue-6",
                "num": 6,
                "title": "Reverse 1st K Elements of Queue",
                "url": "https://leetcode.com/problems/reverse-1st-k-elements-of-queue/",
                "difficulty": "Easy",
                "companies": [
                      "Microsoft",
                      "Amdocs",
                      "Amazon"
                ],
                "done": false
          },
          {
                "id": "stack & queue-7",
                "num": 7,
                "title": "Time needed to Buy Tickets",
                "url": "https://leetcode.com/problems/time-needed-to-buy-tickets/",
                "difficulty": "Easy",
                "companies": [
                      "Uber",
                      "Amazon",
                      "Microsoft",
                      "Google",
                      "Meta"
                ],
                "done": false
          },
          {
                "id": "stack & queue-8",
                "num": 8,
                "title": "Next Greater Element II",
                "url": "https://leetcode.com/problems/next-greater-element-ii/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Uber"
                ],
                "done": false
          },
          {
                "id": "stack & queue-9",
                "num": 9,
                "title": "Previous Smaller Element",
                "url": "https://leetcode.com/problems/previous-smaller-element/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Meta",
                      "Microsoft",
                      "Apple",
                      "Visa",
                      "Oracle",
                      "Intuit",
                      "Citadel",
                      "Samsung",
                      "PayPal",
                      "Ebay"
                ],
                "done": false
          },
          {
                "id": "stack & queue-10",
                "num": 10,
                "title": "Celebrity Problem",
                "url": "https://leetcode.com/problems/celebrity-problem/",
                "difficulty": "Medium",
                "companies": [
                      "LinkedIn",
                      "Meta",
                      "Microsoft",
                      "Amazon",
                      "Uber",
                      "Salesforce",
                      "PhonePe"
                ],
                "done": false
          },
          {
                "id": "stack & queue-11",
                "num": 11,
                "title": "Get Min Element from Stack",
                "url": "https://leetcode.com/problems/get-min-element-from-stack/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Meta",
                      "Amazon",
                      "Saleforce",
                      "Intuit",
                      "PayPal",
                      "Adobe",
                      "Salesforce",
                      "Nike"
                ],
                "done": false
          },
          {
                "id": "stack & queue-12",
                "num": 12,
                "title": "Circular Tour / Gas Station",
                "url": "https://leetcode.com/problems/circular-tour-gas-station/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Microsoft",
                      "Goldman Sachs",
                      "Intuit",
                      "IBM"
                ],
                "done": false
          },
          {
                "id": "stack & queue-13",
                "num": 13,
                "title": "Rotten Oranges",
                "url": "https://leetcode.com/problems/rotten-oranges/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Google",
                      "Microsoft",
                      "Meta",
                      "Oracle",
                      "Adobe",
                      "Cisco",
                      "Infosys",
                      "Salesforce",
                      "BNY Mellon"
                ],
                "done": false
          },
          {
                "id": "stack & queue-14",
                "num": 14,
                "title": "Stock Span",
                "url": "https://leetcode.com/problems/stock-span/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Google",
                      "Microsoft",
                      "Oracle",
                      "Samsung",
                      "Meta",
                      "Intuit",
                      "PhonePe",
                      "Zepto",
                      "Flipkart"
                ],
                "done": false
          },
          {
                "id": "stack & queue-15",
                "num": 15,
                "title": "Max Area in Histogram",
                "url": "https://leetcode.com/problems/max-area-in-histogram/",
                "difficulty": "Hard",
                "companies": [
                      "Adobe",
                      "Apple",
                      "Meta",
                      "Amazon",
                      "Google",
                      "Microsoft"
                ],
                "done": false
          }
    ]
  },
  {
    category: "BINARY TREES",
    questions: [
          {
                "id": "binary trees-1",
                "num": 1,
                "title": "Inorder",
                "url": "https://leetcode.com/problems/inorder/",
                "difficulty": "Easy",
                "companies": [
                      "Google",
                      "Amazon",
                      "Meta",
                      "Microsoft",
                      "Adobe",
                      "Uber"
                ],
                "done": true
          },
          {
                "id": "binary trees-2",
                "num": 2,
                "title": "Preorder",
                "url": "https://leetcode.com/problems/preorder/",
                "difficulty": "Easy",
                "companies": [
                      "Salesforce",
                      "Amazon",
                      "Microsoft",
                      "Meta",
                      "Google",
                      "Adobe"
                ],
                "done": true
          },
          {
                "id": "binary trees-3",
                "num": 3,
                "title": "Postorder",
                "url": "https://leetcode.com/problems/postorder/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "Meta",
                      "Google",
                      "Apple",
                      "Adobe"
                ],
                "done": true
          },
          {
                "id": "binary trees-4",
                "num": 4,
                "title": "Symmetric Tree",
                "url": "https://leetcode.com/problems/symmetric-tree/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "Google",
                      "Oracle",
                      "Apple",
                      "Meta",
                      "Uber",
                      "Intuit",
                      "Adobe"
                ],
                "done": false
          },
          {
                "id": "binary trees-5",
                "num": 5,
                "title": "Minimum Distance between Nodes",
                "url": "https://leetcode.com/problems/minimum-distance-between-nodes/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "Google",
                      "Meta",
                      "LinkedIn",
                      "Adobe",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "binary trees-6",
                "num": 6,
                "title": "Are 2 Trees Identical or Not",
                "url": "https://leetcode.com/problems/are-2-trees-identical-or-not/",
                "difficulty": "Easy",
                "companies": [
                      "Meta",
                      "Google",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "binary trees-7",
                "num": 7,
                "title": "Morris Inorder Traversal",
                "url": "https://leetcode.com/problems/morris-inorder-traversal/",
                "difficulty": "Easy",
                "companies": [
                      "Google",
                      "Amazon",
                      "Meta",
                      "Apple",
                      "Adobe",
                      "TCS",
                      "Flipkart",
                      "Uber",
                      "Liinkedin"
                ],
                "done": false
          },
          {
                "id": "binary trees-8",
                "num": 8,
                "title": "Diameter",
                "url": "https://leetcode.com/problems/diameter/",
                "difficulty": "Easy",
                "companies": [
                      "Google",
                      "Amazon",
                      "Meta",
                      "Microsoft",
                      "Apple",
                      "Adobe",
                      "Uber"
                ],
                "done": false
          },
          {
                "id": "binary trees-9",
                "num": 9,
                "title": "Check if Tree is Height Balanced",
                "url": "https://leetcode.com/problems/check-if-tree-is-height-balanced/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "Meta",
                      "Amazon",
                      "Google",
                      "Visa",
                      "Oracle",
                      "TCS",
                      "Adobe"
                ],
                "done": false
          },
          {
                "id": "binary trees-10",
                "num": 10,
                "title": "Subtree of Another Tree",
                "url": "https://leetcode.com/problems/subtree-of-another-tree/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "Google",
                      "Microsoft",
                      "Adobe",
                      "Uber",
                      "Apple"
                ],
                "done": false
          },
          {
                "id": "binary trees-11",
                "num": 11,
                "title": "Check if BT Mirror of itself or not",
                "url": "https://leetcode.com/problems/check-if-bt-mirror-of-itself-or-not/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "Google",
                      "Meta",
                      "Uber",
                      "Morgan Stanley",
                      "Ebay",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "binary trees-12",
                "num": 12,
                "title": "Top View of a Tree",
                "url": "https://leetcode.com/problems/top-view-of-a-tree/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Google",
                      "Meta",
                      "LinkedIn",
                      "Apple",
                      "Adobe",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "binary trees-13",
                "num": 13,
                "title": "Bottom View of a Tree",
                "url": "https://leetcode.com/problems/bottom-view-of-a-tree/",
                "difficulty": "Medium",
                "companies": [
                      "Meta",
                      "Amazon",
                      "Google",
                      "Uber",
                      "Oracle",
                      "Flipkart",
                      "JP morgan",
                      "Accolite"
                ],
                "done": false
          },
          {
                "id": "binary trees-14",
                "num": 14,
                "title": "Level Order",
                "url": "https://leetcode.com/problems/level-order/",
                "difficulty": "Medium",
                "companies": [
                      "Josh technology",
                      "Amazon",
                      "Google",
                      "Adobe"
                ],
                "done": false
          },
          {
                "id": "binary trees-15",
                "num": 15,
                "title": "Kth Level of Tree",
                "url": "https://leetcode.com/problems/kth-level-of-tree/",
                "difficulty": "Medium",
                "companies": [
                      "Meta",
                      "Google",
                      "Amazon",
                      "Adobe",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "binary trees-16",
                "num": 16,
                "title": "LCA",
                "url": "https://leetcode.com/problems/lca/",
                "difficulty": "Medium",
                "companies": [
                      "Meta",
                      "Amazon",
                      "Google",
                      "LinkedIn",
                      "Intuit",
                      "Oracle",
                      "Adobe",
                      "Flipkart",
                      "Salesforce",
                      "Morgan Stanley"
                ],
                "done": false
          },
          {
                "id": "binary trees-17",
                "num": 17,
                "title": "Transform to Sum Tree",
                "url": "https://leetcode.com/problems/transform-to-sum-tree/",
                "difficulty": "Medium",
                "companies": [
                      "SAP",
                      "Amazon",
                      "Ebay",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "binary trees-18",
                "num": 18,
                "title": "Construct BT from Inorder & Pre order",
                "url": "https://leetcode.com/problems/construct-bt-from-inorder-pre-order/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Microsoft",
                      "Meta",
                      "Adobe",
                      "Uber",
                      "VMware",
                      "Apple"
                ],
                "done": false
          },
          {
                "id": "binary trees-19",
                "num": 19,
                "title": "Construct BT from Inorder & Post order",
                "url": "https://leetcode.com/problems/construct-bt-from-inorder-post-order/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Amazon",
                      "Microsoft",
                      "Adobe",
                      "Bloomberg"
                ],
                "done": false
          },
          {
                "id": "binary trees-20",
                "num": 20,
                "title": "Flatten BT to LL",
                "url": "https://leetcode.com/problems/flatten-bt-to-ll/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Meta",
                      "Amazon",
                      "Microsoft",
                      "Myntra",
                      "Adobe",
                      "Oracle",
                      "Apple"
                ],
                "done": false
          },
          {
                "id": "binary trees-21",
                "num": 21,
                "title": "Max Width of BT",
                "url": "https://leetcode.com/problems/max-width-of-bt/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Meta",
                      "Uber",
                      "Microsoft",
                      "Uber",
                      "Adobe",
                      "Apple",
                      "Google"
                ],
                "done": false
          },
          {
                "id": "binary trees-22",
                "num": 22,
                "title": "Zig Zag Traversal of BT",
                "url": "https://leetcode.com/problems/zig-zag-traversal-of-bt/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Meta",
                      "Microsoft",
                      "Google",
                      "Oracle",
                      "Adobe",
                      "Walmart Labs",
                      "Ebay",
                      "Flipkart"
                ],
                "done": false
          },
          {
                "id": "binary trees-23",
                "num": 23,
                "title": "Max Path Sum",
                "url": "https://leetcode.com/problems/max-path-sum/",
                "difficulty": "Hard",
                "companies": [
                      "Google",
                      "Meta",
                      "Amazon",
                      "Oracle",
                      "Salesforce",
                      "Goldman Sachs",
                      "Uber",
                      "Flipkart"
                ],
                "done": false
          },
          {
                "id": "binary trees-24",
                "num": 24,
                "title": "Kth Ancestor",
                "url": "https://leetcode.com/problems/kth-ancestor/",
                "difficulty": "Hard",
                "companies": [
                      "Google",
                      "Amazon",
                      "Microsoft"
                ],
                "done": false
          }
    ]
  },
  {
    category: "BST",
    questions: [
          {
                "id": "bst-1",
                "num": 1,
                "title": "Kth largest in BST",
                "url": "https://leetcode.com/problems/kth-largest-in-bst/",
                "difficulty": "Easy",
                "companies": [
                      "Meta",
                      "Amazon",
                      "Google",
                      "Adobe",
                      "Atlassian",
                      "Salesforce"
                ],
                "done": false
          },
          {
                "id": "bst-2",
                "num": 2,
                "title": "Sorted Array to Balanced BST",
                "url": "https://leetcode.com/problems/sorted-array-to-balanced-bst/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "Google",
                      "Meta",
                      "Apple",
                      "Adobe",
                      "Airbnb",
                      "Samsung"
                ],
                "done": false
          },
          {
                "id": "bst-3",
                "num": 3,
                "title": "Validate BST",
                "url": "https://leetcode.com/problems/validate-bst/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Google",
                      "Meta",
                      "Salesforce",
                      "IBM",
                      "Adobe",
                      "Citadel",
                      "Oracle",
                      "Uber"
                ],
                "done": false
          },
          {
                "id": "bst-4",
                "num": 4,
                "title": "Kth Smallest in BST",
                "url": "https://leetcode.com/problems/kth-smallest-in-bst/",
                "difficulty": "Medium",
                "companies": [
                      "Accolite",
                      "Amazon",
                      "Google",
                      "Uber",
                      "Microsoft",
                      "Meta"
                ],
                "done": false
          },
          {
                "id": "bst-5",
                "num": 5,
                "title": "LCA in BST",
                "url": "https://leetcode.com/problems/lca-in-bst/",
                "difficulty": "Medium",
                "companies": [
                      "Meta",
                      "Amazon",
                      "LinkedIn",
                      "Bloomberg",
                      "Oracle",
                      "Samsung",
                      "Apple"
                ],
                "done": false
          },
          {
                "id": "bst-6",
                "num": 6,
                "title": "Populate Next Right Pointers",
                "url": "https://leetcode.com/problems/populate-next-right-pointers/",
                "difficulty": "Medium",
                "companies": [
                      "Meta",
                      "Amazon",
                      "Walmart Labs",
                      "Flipkart",
                      "Saleforce",
                      "Adobe",
                      "Oracle"
                ],
                "done": false
          },
          {
                "id": "bst-7",
                "num": 7,
                "title": "Recover BST",
                "url": "https://leetcode.com/problems/recover-bst/",
                "difficulty": "Medium",
                "companies": [
                      "Microsoft",
                      "Amazon",
                      "Google",
                      "Oracle",
                      "Adobe"
                ],
                "done": false
          },
          {
                "id": "bst-8",
                "num": 8,
                "title": "Construct from Preorder",
                "url": "https://leetcode.com/problems/construct-from-preorder/",
                "difficulty": "Medium",
                "companies": [
                      "Adobe",
                      "Meta",
                      "Google",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "bst-9",
                "num": 9,
                "title": "BST Iterator",
                "url": "https://leetcode.com/problems/bst-iterator/",
                "difficulty": "Medium",
                "companies": [
                      "Meta",
                      "Amazon",
                      "Microsoft",
                      "LinkedIn",
                      "Adobe"
                ],
                "done": false
          },
          {
                "id": "bst-10",
                "num": 10,
                "title": "Flatten BST to Sorted list",
                "url": "https://leetcode.com/problems/flatten-bst-to-sorted-list/",
                "difficulty": "Medium",
                "companies": [
                      "Meta",
                      "Microsoft",
                      "Amazon",
                      "Nvidia"
                ],
                "done": false
          },
          {
                "id": "bst-11",
                "num": 11,
                "title": "Inorder Successor",
                "url": "https://leetcode.com/problems/inorder-successor/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Google",
                      "Meta",
                      "Citadel",
                      "Nvidia",
                      "LinkedIn",
                      "Uber",
                      "Intuit",
                      "Qualcomm"
                ],
                "done": false
          },
          {
                "id": "bst-12",
                "num": 12,
                "title": "Inorder Predecessor",
                "url": "https://leetcode.com/problems/inorder-predecessor/",
                "difficulty": "Medium",
                "companies": [
                      "Microsoft",
                      "Bloomberg"
                ],
                "done": false
          },
          {
                "id": "bst-13",
                "num": 13,
                "title": "Largest BST in BT",
                "url": "https://leetcode.com/problems/largest-bst-in-bt/",
                "difficulty": "Hard",
                "companies": [
                      "Microsoft",
                      "Meta"
                ],
                "done": false
          },
          {
                "id": "bst-14",
                "num": 14,
                "title": "Serialize & Deserialize BST",
                "url": "https://leetcode.com/problems/serialize-deserialize-bst/",
                "difficulty": "Hard",
                "companies": [
                      "Amazon",
                      "Google",
                      "Meta",
                      "Oracle",
                      "Flipkart",
                      "Adobe",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "bst-15",
                "num": 15,
                "title": "Merge 2 BSTS",
                "url": "https://leetcode.com/problems/merge-2-bsts/",
                "difficulty": "Hard",
                "companies": [
                      "Meta",
                      "Microsoft"
                ],
                "done": false
          }
    ]
  },
  {
    category: "HEAPS",
    questions: [
          {
                "id": "heaps-1",
                "num": 1,
                "title": "Merge K Sorted Arrays",
                "url": "https://leetcode.com/problems/merge-sorted-array/description/?envType=problem-list-v2&envId=sorting",
                "difficulty": "Easy",
                "companies": [
                      "Google",
                      "Meta",
                      "Amazon",
                      "Microsoft",
                      "HCL",
                      "Cisco",
                      "IBM",
                      "Oracle",
                      "Adobe"
                ],
                "done": false
          },
          {
                "id": "heaps-2",
                "num": 2,
                "title": "K most Frequent Elements",
                "url": "https://leetcode.com/problems/top-k-frequent-elements/description/",
                "difficulty": "Medium",
                "companies": [
                      "Meta",
                      "Amazon",
                      "Google",
                      "Microsoft",
                      "Oracle",
                      "Goldman Sachs",
                      "Uber",
                      "Salesforce"
                ],
                "done": false
          },
          {
                "id": "heaps-3",
                "num": 3,
                "title": "Heap Sort",
                "url": "https://leetcode.com/problems/sort-an-array/description/",
                "difficulty": "Medium",
                "companies": [
                      "Adobe",
                      "TCS",
                      "Amazon",
                      "Google",
                      "Meta",
                      "Hive",
                      "Infosys",
                      "Oracle",
                      "Apple"
                ],
                "done": false
          },
          {
                "id": "heaps-4",
                "num": 4,
                "title": "Kth Smallest Element",
                "url": "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/?envType=problem-list-v2&envId=sorting",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Meta",
                      "Apple",
                      "PhonePe",
                      "Salesforce"
                ],
                "done": false
          },
          {
                "id": "heaps-5",
                "num": 5,
                "title": "Median from Stream",
                "url": "https://leetcode.com/problems/find-median-from-data-stream/description/",
                "difficulty": "Hard",
                "companies": [
                      "Google",
                      "Amazon",
                      "Meta",
                      "Apple",
                      "Microsoft",
                      "Pinterest",
                      "PayPal",
                      "Oracle",
                      "Goldman Sachs"
                ],
                "done": false
          },
          {
                "id": "heaps-6",
                "num": 6,
                "title": "Smallest Range in K Sorted List",
                "url": "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/description/",
                "difficulty": "Hard",
                "companies": [
                      "Amazon",
                      "PhonePe",
                      "Meta",
                      "Microsoft",
                      "Flipkart",
                      "DE shaw",
                      "Adobe"
                ],
                "done": false
          }
    ]
  },
  {
    category: "TRIE",
    questions: [
          {
                "id": "trie-1",
                "num": 1,
                "title": "Longest Common Prefix",
                "url": "https://leetcode.com/problems/longest-common-prefix/description/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "TCS",
                      "Visa",
                      "Accenture",
                      "Infosys",
                      "Deloitte",
                      "Google",
                      "Oracle"
                ],
                "done": false
          },
          {
                "id": "trie-2",
                "num": 2,
                "title": "Word Break Problem",
                "url": "https://leetcode.com/problems/word-break/description/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Google",
                      "Netflix",
                      "Intuit",
                      "Walmart Labs",
                      "Salesforce",
                      "Flipkart",
                      "Uber",
                      "Oracle"
                ],
                "done": false
          },
          {
                "id": "trie-3",
                "num": 3,
                "title": "Implement a Phone Directory",
                "url": "https://leetcode.com/problems/design-phone-directory/description/",
                "difficulty": "Medium",
                "companies": [
                      "Google"
                ],
                "done": false
          },
          {
                "id": "trie-4",
                "num": 4,
                "title": "Implement a Trie",
                "url": "https://leetcode.com/problems/implement-trie-prefix-tree/description/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Amazon",
                      "Apple",
                      "Meta",
                      "Uber",
                      "Nvidia",
                      "Samsung"
                ],
                "done": false
          },
          {
                "id": "trie-5",
                "num": 5,
                "title": "Longest String with All Prefix",
                "url": "https://leetcode.com/problems/longest-word-with-all-prefixes/description/",
                "difficulty": "Medium",
                "companies": [
                      "Google"
                ],
                "done": false
          }
    ]
  },
  {
    category: "GRAPH",
    questions: [
          {
                "id": "graph-1",
                "num": 1,
                "title": "Flood Fill Algorithm",
                "url": "https://leetcode.com/problems/flood-fill/description/",
                "difficulty": "Easy",
                "companies": [
                      "Samsung",
                      "Flipkart",
                      "SAP Labs",
                      "Ola Cabs",
                      "Amazon",
                      "Microsoft",
                      "Adobe"
                ],
                "done": false
          },
          {
                "id": "graph-2",
                "num": 2,
                "title": "BFS",
                "url": "https://leetcode.com/problems/clone-graph/description/",
                "difficulty": "Medium",
                "companies": [
                      "Samsung",
                      "Intuit",
                      "Accolite",
                      "Amazon"
                ],
                "done": false
          },
          {
                "id": "graph-3",
                "num": 3,
                "title": "DFS",
                "url": "https://leetcode.com/problems/clone-graph/description/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Meta",
                      "Google",
                      "Visa",
                      "Adobe",
                      "Microsoft",
                      "Apple",
                      "Oracle",
                      "Flipkart"
                ],
                "done": false
          },
          {
                "id": "graph-4",
                "num": 4,
                "title": "Detect cycle in undirected using BFS",
                "url": "https://leetcode.com/problems/redundant-connection/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Meta",
                      "Google",
                      "Visa",
                      "Adobe",
                      "Microsoft",
                      "Apple",
                      "Oracle",
                      "Flipkart"
                ],
                "done": false
          },
          {
                "id": "graph-5",
                "num": 5,
                "title": "Detect cycle in undirected using DFS",
                "url": "https://leetcode.com/problems/redundant-connection/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Meta",
                      "Microsoft",
                      "Inmobi",
                      "Amazon"
                ],
                "done": false
          },
          {
                "id": "graph-6",
                "num": 6,
                "title": "Detect cycle in directed using BFS",
                "url": "https://leetcode.com/problems/course-schedule/description/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Meta",
                      "Microsoft",
                      "Inmobi",
                      "Amazon"
                ],
                "done": false
          },
          {
                "id": "graph-7",
                "num": 7,
                "title": "Detect cycle in directed using DFS",
                "url": "https://leetcode.com/problems/course-schedule/description/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Amazon",
                      "Meta",
                      "Microsoft",
                      "Apple",
                      "Uber",
                      "Adobe",
                      "Yahoo"
                ],
                "done": false
          },
          {
                "id": "graph-8",
                "num": 8,
                "title": "Topological Sorting (DFS)",
                "url": "https://leetcode.com/problems/course-schedule-ii/",
                "difficulty": "Medium",
                "companies": [
                      "Flipkart",
                      "Morgan Stanley",
                      "Accolite",
                      "Amazon",
                      "Microsoft",
                      "OYO",
                      "Samsung",
                      "DE Shaw",
                      "Visa",
                      "Moonfrog Labs"
                ],
                "done": false
          },
          {
                "id": "graph-9",
                "num": 9,
                "title": "Prim's Algorithm (MST)",
                "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/description/",
                "difficulty": "Medium",
                "companies": [
                      "Flipkart",
                      "Morgan Stanley",
                      "Accolite",
                      "Amazon",
                      "Microsoft",
                      "OYO",
                      "Samsung",
                      "DE Shaw",
                      "Visa"
                ],
                "done": false
          },
          {
                "id": "graph-10",
                "num": 10,
                "title": "Bellman Ford Algorithm",
                "url": "https://leetcode.com/problems/group-the-people-given-the-group-size-they-belong-to/description/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Google",
                      "Meta",
                      "Salesforce",
                      "Intuit",
                      "LinkedIn",
                      "Nvidia",
                      "Uber",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "graph-11",
                "num": 11,
                "title": "Floyd Warshall Algo",
                "url": "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/description/",
                "difficulty": "Medium",
                "companies": [
                      "Flipkart",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "graph-12",
                "num": 12,
                "title": "Kosaraju Strongly Connected Components",
                "url": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/description/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Meta",
                      "Stripe",
                      "Airbnb",
                      "Oracle",
                      "DE Shaw",
                      "Apple"
                ],
                "done": false
          },
          {
                "id": "graph-13",
                "num": 13,
                "title": "Check Bi-partite Graph",
                "url": "https://leetcode.com/problems/is-graph-bipartite/description/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Adobe",
                      "Directi",
                      "Uber",
                      "DE shaw",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "graph-14",
                "num": 14,
                "title": "Number of Islands",
                "url": "https://leetcode.com/problems/number-of-islands/description/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Adobe",
                      "Directi",
                      "Uber",
                      "DE shaw",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "graph-15",
                "num": 15,
                "title": "Rotten Oranges",
                "url": "https://leetcode.com/problems/rotting-oranges/description/",
                "difficulty": "Medium",
                "companies": [
                      "Sharechat  + Directi",
                      "Amazon",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "graph-16",
                "num": 16,
                "title": "01 Matrix",
                "url": "https://leetcode.com/problems/01-matrix/description/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Uber",
                      "Meta",
                      "Microsoft",
                      "Amazon"
                ],
                "done": false
          },
          {
                "id": "graph-17",
                "num": 17,
                "title": "Course Schedule I & II",
                "url": "https://leetcode.com/problems/course-schedule-ii/description/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Google",
                      "Zoho",
                      "Oracle",
                      "Samsung",
                      "Meta",
                      "Intuit",
                      "Zepto",
                      "PhonePe",
                      "Fliipkart",
                      "Citadel",
                      "Salesforce"
                ],
                "done": false
          },
          {
                "id": "graph-18",
                "num": 18,
                "title": "Alien Dictionary",
                "url": "https://leetcode.com/problems/alien-dictionary/description/",
                "difficulty": "Hard",
                "companies": [
                      "Google",
                      "Amazon",
                      "LinkedIn",
                      "Doordash",
                      "Flipkart",
                      "Adobe"
                ],
                "done": false
          },
          {
                "id": "graph-19",
                "num": 19,
                "title": "Cheapest Flights within K Stops",
                "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/description/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Amazon",
                      "Meta",
                      "Adobe",
                      "Uber"
                ],
                "done": false
          },
          {
                "id": "graph-20",
                "num": 20,
                "title": "Clone a Graph",
                "url": "https://leetcode.com/problems/clone-graph/description/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Microoft",
                      "Meta",
                      "LinkedIn",
                      "Oracle",
                      "Apple",
                      "Adobe",
                      "Nvidia",
                      "PayPal",
                      "Goldman Sachs",
                      "Salesforce"
                ],
                "done": false
          },
          {
                "id": "graph-21",
                "num": 21,
                "title": "Most Stones Removed",
                "url": "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/description/",
                "difficulty": "Medium",
                "companies": [
                      "Microsoft",
                      "Flipkart",
                      "Pinterest",
                      "Meta",
                      "Uber",
                      "Samung"
                ],
                "done": false
          },
          {
                "id": "graph-22",
                "num": 22,
                "title": "Number of Provinces",
                "url": "https://leetcode.com/problems/number-of-provinces/",
                "difficulty": "Medium",
                "companies": [
                      "Paytm"
                ],
                "done": false
          },
          {
                "id": "graph-23",
                "num": 23,
                "title": "Number of Ways to Arrive at Destination",
                "url": "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/description/",
                "difficulty": "Medium",
                "companies": [
                      "PhonePe",
                      "Google",
                      "Apple",
                      "Microsoft",
                      "Amazon"
                ],
                "done": false
          },
          {
                "id": "graph-24",
                "num": 24,
                "title": "Topoplogical Sorting (BFS)",
                "url": "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/description/?envType=problem-list-v2&envId=topological-sort",
                "difficulty": "Hard",
                "companies": [
                      "Sprinklr",
                      "Google",
                      "Amazon",
                      "Meta"
                ],
                "done": false
          },
          {
                "id": "graph-25",
                "num": 25,
                "title": "Dijkstra's Algorithm",
                "url": "https://leetcode.com/problems/minimum-cost-to-reach-destination-in-time/description/",
                "difficulty": "Hard",
                "companies": [
                      "Google",
                      "Amazon",
                      "Meta"
                ],
                "done": false
          },
          {
                "id": "graph-26",
                "num": 26,
                "title": "Kruskal's Algorithm (MST)",
                "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/description/",
                "difficulty": "Hard",
                "companies": [
                      "Airbnb",
                      "Citadel",
                      "Uber",
                      "Google",
                      "Meta",
                      "Airbnb"
                ],
                "done": false
          }
    ]
  },
  {
    category: "DP",
    questions: [
          {
                "id": "dp-1",
                "num": 1,
                "title": "Buy & Sell Stocks I",
                "url": "https://leetcode.com/problems/buy-sell-stocks-i/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "DE Shaw",
                      "Directi",
                      "Flipkart",
                      "Goldman Sachs",
                      "Intuit",
                      "MakeMyTrip",
                      "Microsoft",
                      "Ola Cabs",
                      "Oracle",
                      "Paytm",
                      "Pubmatic",
                      "Quikr",
                      "Salesforce",
                      "Sapient",
                      "Swiggy",
                      "Walmart",
                      "Media.net",
                      "Google"
                ],
                "done": false
          },
          {
                "id": "dp-2",
                "num": 2,
                "title": "0-1 Knapsack",
                "url": "https://leetcode.com/problems/0-1-knapsack/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Directi",
                      "Flipkart",
                      "GreyOrange",
                      "Microsoft",
                      "Mobicip",
                      "Morgan Stanley",
                      "Oracle",
                      "Payu",
                      "Snapdeal",
                      "Visa"
                ],
                "done": false
          },
          {
                "id": "dp-3",
                "num": 3,
                "title": "Target Sum Subset",
                "url": "https://leetcode.com/problems/target-sum-subset/",
                "difficulty": "Medium",
                "companies": [
                      "Myntra",
                      "Microsoft",
                      "Meta",
                      "Amazon"
                ],
                "done": false
          },
          {
                "id": "dp-4",
                "num": 4,
                "title": "Unbounded Knapsack",
                "url": "https://leetcode.com/problems/unbounded-knapsack/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Google"
                ],
                "done": false
          },
          {
                "id": "dp-5",
                "num": 5,
                "title": "Coin Change",
                "url": "https://leetcode.com/problems/coin-change/",
                "difficulty": "Medium",
                "companies": [
                      "Adobe",
                      "Salesforce",
                      "Amazon",
                      "Google",
                      "Microsoft",
                      "Intuit",
                      "Infosys",
                      "Accenture"
                ],
                "done": false
          },
          {
                "id": "dp-6",
                "num": 6,
                "title": "Longest Common Subsequence",
                "url": "https://leetcode.com/problems/longest-common-subsequence/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Microsoft",
                      "Meta",
                      "TCS",
                      "Oracle"
                ],
                "done": false
          },
          {
                "id": "dp-7",
                "num": 7,
                "title": "Longest Common Substring",
                "url": "https://leetcode.com/problems/longest-common-substring/",
                "difficulty": "Medium",
                "companies": [
                      "Morgan Stanley",
                      "Amazon",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "dp-8",
                "num": 8,
                "title": "Edit Distance",
                "url": "https://leetcode.com/problems/edit-distance/",
                "difficulty": "Medium",
                "companies": [
                      "Goldman Sachs",
                      "PayPal",
                      "Salesforce",
                      "Atlassian",
                      "Intuit",
                      "IBM",
                      "Google",
                      "Amazon"
                ],
                "done": false
          },
          {
                "id": "dp-9",
                "num": 9,
                "title": "Longest Increasing Subsequence",
                "url": "https://leetcode.com/problems/longest-increasing-subsequence/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Google",
                      "LinkedIn",
                      "Cisco",
                      "TCS",
                      "Meta",
                      "Cisco"
                ],
                "done": false
          },
          {
                "id": "dp-10",
                "num": 10,
                "title": "Palindromic Partitioning (MCM)",
                "url": "https://leetcode.com/problems/palindromic-partitioning-mcm/",
                "difficulty": "Medium",
                "companies": [
                      "Google + Goldman Sachs + Citrix",
                      "TCS",
                      "Meta",
                      "Adobe",
                      "Accenture",
                      "Rubrik"
                ],
                "done": false
          },
          {
                "id": "dp-11",
                "num": 11,
                "title": "Max Product Subarray",
                "url": "https://leetcode.com/problems/max-product-subarray/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Goldman Sachs",
                      "Apple",
                      "Adobe",
                      "TCS",
                      "Uber"
                ],
                "done": false
          },
          {
                "id": "dp-12",
                "num": 12,
                "title": "Unique BSTs",
                "url": "https://leetcode.com/problems/unique-bsts/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "+",
                      "Google"
                ],
                "done": false
          },
          {
                "id": "dp-13",
                "num": 13,
                "title": "Longest Palindromic Subsequence",
                "url": "https://leetcode.com/problems/longest-palindromic-subsequence/",
                "difficulty": "Medium",
                "companies": [
                      "Google",
                      "Microsoft",
                      "Tower Research Capital",
                      "Oracle",
                      "Amazon"
                ],
                "done": false
          },
          {
                "id": "dp-14",
                "num": 14,
                "title": "Buy & Sell Stocks II",
                "url": "https://leetcode.com/problems/buy-sell-stocks-ii/",
                "difficulty": "Medium",
                "companies": [
                      "Walmart",
                      "+",
                      "Flipkart"
                ],
                "done": false
          },
          {
                "id": "dp-15",
                "num": 15,
                "title": "Nth Catalan",
                "url": "https://leetcode.com/problems/nth-catalan/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Google",
                      "Meta",
                      "Microsoft",
                      "Infosys"
                ],
                "done": false
          },
          {
                "id": "dp-16",
                "num": 16,
                "title": "Minimum Partitioning",
                "url": "https://leetcode.com/problems/minimum-partitioning/",
                "difficulty": "Hard",
                "companies": [
                      "Oracle",
                      "PhonePe",
                      "Adobe",
                      "Apple"
                ],
                "done": false
          },
          {
                "id": "dp-17",
                "num": 17,
                "title": "Wildcard Pattern Matching",
                "url": "https://leetcode.com/problems/wildcard-pattern-matching/",
                "difficulty": "Hard",
                "companies": [
                      "LinkedIn",
                      "DE Shaw",
                      "Adobe",
                      "Uber",
                      "Meta",
                      "Amazon"
                ],
                "done": false
          },
          {
                "id": "dp-18",
                "num": 18,
                "title": "Rod Cutting",
                "url": "https://leetcode.com/problems/rod-cutting/",
                "difficulty": "Hard",
                "companies": [
                      "Uber",
                      "Samsung",
                      "Arcesium",
                      "Google",
                      "Amazon",
                      "Meta"
                ],
                "done": false
          },
          {
                "id": "dp-19",
                "num": 19,
                "title": "Egg Dropping",
                "url": "https://leetcode.com/problems/egg-dropping/",
                "difficulty": "Hard",
                "companies": [
                      "Microsoft + Amazon + Ola",
                      "Salesforce",
                      "Apple"
                ],
                "done": false
          },
          {
                "id": "dp-20",
                "num": 20,
                "title": "Longest Bitonic Subsequence",
                "url": "https://leetcode.com/problems/longest-bitonic-subsequence/",
                "difficulty": "Hard",
                "companies": [
                      "Amazon",
                      "DE Shaw",
                      "Goldman Sachs",
                      "Google",
                      "Hike",
                      "MakeMyTrip",
                      "MAQ",
                      "Software",
                      "Myntra",
                      "Nearbuy",
                      "Opera",
                      "Oracle",
                      "Philips",
                      "Samsung",
                      "Service",
                      "Now",
                      "Unisys",
                      "VMWare",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "dp-21",
                "num": 21,
                "title": "MCM",
                "url": "https://leetcode.com/problems/mcm/",
                "difficulty": "Hard",
                "companies": [
                      "Amazon",
                      "Microsoft",
                      "Google",
                      "Meta"
                ],
                "done": false
          }
    ]
  },
  {
    category: "GREEDY",
    questions: [
          {
                "id": "greedy-1",
                "num": 1,
                "title": "Assign Cookies",
                "url": "https://leetcode.com/problems/assign-cookies/",
                "difficulty": "Easy",
                "companies": [
                      "Amazon",
                      "Accenture",
                      "Uber",
                      "Adobe",
                      "Meta",
                      "Google"
                ],
                "done": false
          },
          {
                "id": "greedy-2",
                "num": 2,
                "title": "Indian Coins",
                "url": "https://leetcode.com/problems/indian-coins/",
                "difficulty": "Medium",
                "companies": [
                      "Accolite",
                      "Amazon",
                      "Morgan Stanley",
                      "Oracle",
                      "Paytm",
                      "Samsung",
                      "Snapdeal",
                      "Synopsys",
                      "Visa",
                      "Microsoft",
                      "Google"
                ],
                "done": false
          },
          {
                "id": "greedy-3",
                "num": 3,
                "title": "Fractional Knapsack",
                "url": "https://leetcode.com/problems/fractional-knapsack/",
                "difficulty": "Medium",
                "companies": [
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "greedy-4",
                "num": 4,
                "title": "maximum length of pair chain",
                "url": "https://leetcode.com/problems/maximum-length-of-pair-chain/",
                "difficulty": "Medium",
                "companies": [
                      "Amazon",
                      "Bloomberg",
                      "Swiggy",
                      "Adobe",
                      "Apple"
                ],
                "done": false
          },
          {
                "id": "greedy-5",
                "num": 5,
                "title": "Activity Selection",
                "url": "https://leetcode.com/problems/activity-selection/",
                "difficulty": "Medium",
                "companies": [
                      "Meta",
                      "Amazon",
                      "Google",
                      "Microsoft"
                ],
                "done": false
          },
          {
                "id": "greedy-6",
                "num": 6,
                "title": "Job Scheduling",
                "url": "https://leetcode.com/problems/job-scheduling/",
                "difficulty": "Hard",
                "companies": [
                      "Amazon",
                      "Microsoft",
                      "Airbnb",
                      "Adobe",
                      "PhonePe"
                ],
                "done": false
          }
    ]
  },
];
