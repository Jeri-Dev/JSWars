export const defaultCode = `function twoSum(nums, target) {
    // Write your solution here
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [];
}`

export const TESTCASES = [
	{
		id: 1,
		input: "nums = [2,7,11,15], target = 9",
		expected: "[0,1]",
		description: "Because nums[0] + nums[1] == 9",
	},
	{
		id: 2,
		input: "nums = [3,2,4], target = 6",
		expected: "[1,2]",
		description: "Because nums[1] + nums[2] == 6",
	},
	{
		id: 3,
		input: "nums = [3,3], target = 6",
		expected: "[0,1]",
		description: "Because nums[0] + nums[1] == 6",
	},
]

export const PROBLEMS = [
	{
		id: 1,
		title: "Two Sum",
		difficulty: "Easy",
		acceptance: 55.9,
		description:
			"Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
	},
	{
		id: 2,
		title: "Add Two Numbers",
		difficulty: "Medium",
		acceptance: 46.5,
		description: "Add two numbers represented by linked lists.",
	},
	{
		id: 3,
		title: "Longest Substring Without Repeating Characters",
		difficulty: "Medium",
		acceptance: 37.1,
		description:
			"Find the length of the longest substring without repeating characters.",
	},
	{
		id: 4,
		title: "Median of Two Sorted Arrays",
		difficulty: "Hard",
		acceptance: 29.4,
		description: "Find the median of two sorted arrays.",
	},
	{
		id: 5,
		title: "Zigzag Conversion",
		difficulty: "Easy",
		acceptance: 44.2,
		description: "Convert string to zigzag pattern on given rows.",
	},
]
