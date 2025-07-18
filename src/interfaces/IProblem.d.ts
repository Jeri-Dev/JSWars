export interface Problem {
	id: string
	title: string
	description: string
	difficulty: "Easy" | "Medium" | "Hard"
	tags: string[]
	examples: Example[]
	constraints: string[]
	starterCode: string
	solution?: string
	testCases: TestCase[]
}

export interface Example {
	input: string
	output: string
	explanation?: string
}

export interface TestCase {
	id: number
	input: string
	expected: string
	description: string
	status?: "passed" | "failed" | null
	output?: string
	runtime?: string
}
