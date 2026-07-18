export interface VisualElement {
  id: string | number;
  label: string;
  value?: number | string;
  state: 'default' | 'active' | 'selected' | 'success' | 'fail' | 'inactive' | 'pointer';
  pointers?: string[]; // e.g., ["L"], ["R"], ["i"], ["curr"]
  index?: number;
  x?: number; // Optional positioning (0-100) for graph/tree nodes
  y?: number; // Optional positioning (0-100) for graph/tree nodes
  nextId?: string | number; // For linked list traversal
}

export interface SecondaryState {
  label: string; // Name of structure (e.g., "HashMap", "Seen Set", "Call Stack", "Queue")
  type: 'set' | 'map' | 'stack' | 'queue' | 'list';
  items: { key: string; value?: string }[];
}

export interface AlgoStep {
  elements: VisualElement[];
  secondaryState?: SecondaryState;
  variables: Record<string, string | number>;
  codeLine: number; // 0-indexed line of code to highlight
  explanation: string; // Human-readable log of the current operation
}

export interface AlgorithmData {
  title: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: string[]; // Array of strings representing lines of code
  steps: AlgoStep[];
}

// Built-in topics available
export type BuiltInTopic = 'sliding_window' | 'binary_search' | 'two_pointers' | 'bubble_sort' | 'reverse_linked_list' | 'fibonacci_dp';
