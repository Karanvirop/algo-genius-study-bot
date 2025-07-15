export interface DSAResponse {
  content: string;
  code?: string;
  language?: string;
  type: 'text' | 'code' | 'question';
  followUp?: string[];
}

export const dsaKnowledge: Record<string, DSAResponse> = {
  "big o notation": {
    content: "Big O notation describes the upper bound of time complexity for algorithms. It helps us understand how an algorithm's performance scales with input size.\n\n• O(1) - Constant time\n• O(log n) - Logarithmic time\n• O(n) - Linear time\n• O(n log n) - Linearithmic time\n• O(n²) - Quadratic time",
    type: 'text',
    followUp: ["Show me examples of each complexity", "How to calculate Big O?"]
  },
  
  "stack vs queue": {
    content: "Stack follows LIFO (Last In, First Out) principle - like a stack of plates. Queue follows FIFO (First In, First Out) principle - like a line of people.\n\nStack operations: push(), pop(), peek()\nQueue operations: enqueue(), dequeue(), front()",
    code: `# Stack implementation
class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        if not self.is_empty():
            return self.items.pop()
    
    def is_empty(self):
        return len(self.items) == 0

# Queue implementation  
from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, item):
        self.items.append(item)
    
    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()
    
    def is_empty(self):
        return len(self.items) == 0`,
    language: 'python',
    type: 'code',
    followUp: ["When to use stack vs queue?", "Practice problems on stacks"]
  },

  "binary search": {
    content: "Binary search is an efficient algorithm for finding an item in a sorted array. It works by repeatedly dividing the search interval in half.\n\nTime Complexity: O(log n)\nSpace Complexity: O(1) iterative, O(log n) recursive",
    code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # Target not found

# Example usage
arr = [1, 3, 5, 7, 9, 11, 13]
result = binary_search(arr, 7)  # Returns index 3`,
    language: 'python',
    type: 'code',
    followUp: ["Binary search variants", "Practice binary search problems"]
  },

  "practice question arrays": {
    content: "**Array Practice Question:**\n\nGiven an array of integers, find two numbers that add up to a specific target.\n\nExample:\nInput: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1] (because nums[0] + nums[1] = 2 + 7 = 9)\n\n**Hint:** Think about using a hash map to store numbers you've seen and their indices.",
    type: 'question',
    followUp: ["Show me the solution", "More array problems", "Explain hash map approach"]
  },

  "linked list": {
    content: "A linked list is a linear data structure where elements are stored in nodes, and each node contains data and a pointer to the next node.\n\nAdvantages:\n• Dynamic size\n• Efficient insertion/deletion at beginning\n\nDisadvantages:\n• No random access\n• Extra memory for pointers",
    code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert_at_beginning(self, val):
        new_node = ListNode(val)
        new_node.next = self.head
        self.head = new_node
    
    def delete_node(self, val):
        if not self.head:
            return
        
        if self.head.val == val:
            self.head = self.head.next
            return
        
        current = self.head
        while current.next and current.next.val != val:
            current = current.next
        
        if current.next:
            current.next = current.next.next`,
    language: 'python',
    type: 'code',
    followUp: ["Doubly linked lists", "Linked list problems", "Reverse a linked list"]
  }
};

export function findBestMatch(query: string): DSAResponse {
  const lowercaseQuery = query.toLowerCase();
  
  // Direct matches
  for (const [key, response] of Object.entries(dsaKnowledge)) {
    if (lowercaseQuery.includes(key)) {
      return response;
    }
  }
  
  // Keyword matching
  if (lowercaseQuery.includes('complexity') || lowercaseQuery.includes('big o')) {
    return dsaKnowledge["big o notation"];
  }
  
  if (lowercaseQuery.includes('stack') || lowercaseQuery.includes('queue')) {
    return dsaKnowledge["stack vs queue"];
  }
  
  if (lowercaseQuery.includes('binary search') || lowercaseQuery.includes('search')) {
    return dsaKnowledge["binary search"];
  }
  
  if (lowercaseQuery.includes('array') && lowercaseQuery.includes('practice')) {
    return dsaKnowledge["practice question arrays"];
  }
  
  if (lowercaseQuery.includes('linked list')) {
    return dsaKnowledge["linked list"];
  }
  
  // Default response
  return {
    content: "I'd be happy to help you with Data Structures and Algorithms! I can explain concepts, provide code examples, and give you practice questions. Try asking about:\n\n• Big O notation\n• Stack vs Queue\n• Binary search implementation\n• Array problems\n• Linked lists\n• Trees and graphs\n• Dynamic programming\n\nWhat specific topic would you like to explore?",
    type: 'text',
    followUp: ["Show me DSA topics", "Give me a practice question", "Explain algorithms basics"]
  };
}