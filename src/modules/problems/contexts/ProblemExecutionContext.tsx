"use client"

import { createContext, useContext, useState } from "react"
import { TestCase } from "@/interfaces/IProblem"

interface ExecutionResult extends TestCase {
  passed: boolean
  runtime: string
  output: string
}

interface ProblemExecutionContextProps {
  isRunning: boolean
  results: ExecutionResult[]
  consoleOutput: string[]
  runCode: (code: string) => void
  code: string
  setCode: (code: string) => void
}

const ProblemExecutionContext = createContext<ProblemExecutionContextProps | undefined>(undefined)

export const useProblemExecutionContext = () => {
  const context = useContext(ProblemExecutionContext)
  if (!context) throw new Error("useProblemExecutionContext must be used within ProblemExecutionProvider")
  return context
}

export const ProblemExecutionProvider = ({
  children,
  testCases,
}: {
  children: React.ReactNode
  testCases: TestCase[]
}) => {
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<ExecutionResult[]>([])
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [code, setCode] = useState<string>(`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}`)

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
      `${mockResults.filter((r) => r.passed).length}/${testCases.length} tests passed`,
      "Runtime: 45ms | Memory: 42.1MB",
    ])

    setIsRunning(false)
  }

  return (
    <ProblemExecutionContext.Provider
      value={{ isRunning, results, consoleOutput, runCode, code, setCode }}
    >
      {children}
    </ProblemExecutionContext.Provider>
  )
}
