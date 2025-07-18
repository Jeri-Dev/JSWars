"use client"

import { TestCase } from "@/interfaces/IProblem"
import { useState } from "react"

interface ExecutionResult extends TestCase {
	passed: boolean
	runtime: string
	output: string
}

export function useProblemExecution(testCases: TestCase[]) {
	const [isRunning, setIsRunning] = useState(false)
	const [results, setResults] = useState<ExecutionResult[]>([])
	const [consoleOutput, setConsoleOutput] = useState<string[]>([])

	const runCode = async (_code: string) => {
		setIsRunning(true)
		setConsoleOutput([])

		await new Promise((resolve) => setTimeout(resolve, 1500))

		const mockResults: ExecutionResult[] = testCases.map((testCase, index) => ({
			...testCase,
			passed: Math.random() > 0.3,
			runtime: `${Math.floor(Math.random() * 50) + 10}ms`,
			output: index === 0 ? "[0,1]" : index === 1 ? "[1,2]" : "[0,1]",
		}))

		setResults(mockResults)
		setConsoleOutput([
			"Running test cases...",
			`Executed ${testCases.length} test cases`,
			`${mockResults.filter((r) => r.passed).length}/${
				testCases.length
			} tests passed`,
			"Runtime: 45ms | Memory: 42.1MB",
		])

		setIsRunning(false)
	}

	return {
		isRunning,
		results,
		consoleOutput,
		runCode,
	}
}
