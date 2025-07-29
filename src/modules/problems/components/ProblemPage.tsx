"use client"

import { Check, HelpHexagon, Terminal, X } from '@untitled-ui/icons-react'
import { defaultCode, PROBLEMS } from '@/shared/mock/Problem'
import { motion, AnimatePresence } from "framer-motion"
import { Box, Typography } from '@mui/material'
import { useParams } from 'next/navigation'
import Editor from '@monaco-editor/react'
import { useMemo, useState } from 'react'

enum TabOptions {
  TestCases = "testcases",
  Console = "console",
}

const TABS = [
  {
    key: TabOptions.TestCases,
    label: "Test Cases",
    icon: <HelpHexagon width={16} />,
  },
  {
    key: TabOptions.Console,
    label: "Console",
    icon: <Terminal width={16} />,
  },
]

export function ProblemPage() {
  const { id } = useParams()

  const [activeTab, setActiveTab] = useState<TabOptions>(TabOptions.TestCases)
  const [code, setCode] = useState(defaultCode)

  const problem = useMemo(() => PROBLEMS.find(p => p.id === Number(id)), [id])

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "#1a1a1a", color: "#9ca3af" }}>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ borderBottom: "1px solid #2e2e2e", padding: "16px 24px" }}
      >
        <Typography sx={{ color: "#f7df1e", fontWeight: "bold", fontSize: "1rem" }}>
          Room ID: {problem?.id || "N/A"}
        </Typography>
        <Typography variant="h5" sx={{ mt: 0.5, fontWeight: "600", color: "#fff" }}>
          {problem?.title || "N/A"}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: "#d1d5db" }}>
          {problem?.description || "N/A"}
        </Typography>
      </motion.header>

      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            width: "60%",
            borderRight: "1px solid #2e2e2e",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#212121",
              px: 2,
              py: 1.5,
              borderBottom: "1px solid #2e2e2e",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box sx={{ width: 12, height: 12, bgcolor: "red", borderRadius: "50%" }} />
              <Box sx={{ width: 12, height: 12, bgcolor: "yellow", borderRadius: "50%" }} />
              <Box sx={{ width: 12, height: 12, bgcolor: "green", borderRadius: "50%" }} />
            </Box>
            <Typography variant="body2" sx={{ color: "#9ca3af" }}>
              solution.js
            </Typography>
            <Typography variant="caption" sx={{ marginLeft: "auto", color: "#6b7280" }}>
              JavaScript
            </Typography>
          </Box>

          <Box sx={{ flex: 1, position: "relative", borderTop: "1px solid #2f3030" }}>
            <Editor
              height="100%"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                lineNumbers: "on",
                minimap: { enabled: false },
                padding: { top: 16 },
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
                overviewRulerLanes: 0,
                lineDecorationsWidth: 0,
                glyphMargin: false,
                contextmenu: false,
                wordWrap: "on",
              }}
            />
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#1a1a1a",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#212121",
              borderBottom: "1px solid #2e2e2e",
              display: "flex",
              px: 1,
              gap: 1,
            }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key
              return (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    backgroundColor: isActive ? "#2e2e2e" : "transparent",
                    border: isActive ? "1px solid #f7df1e" : "1px solid transparent",
                    color: isActive ? "#f7df1e" : "#9ca3af",
                    transition: "all 0.2s ease-in-out",
                    cursor: "pointer",
                    flexGrow: 1,
                    justifyContent: "center",
                  }}
                >
                  {tab.icon}
                  {tab.label}
                </motion.button>
              )
            })}
          </Box>

          <Box sx={{ flex: 1, overflowY: "auto", padding: 2 }}>
            <AnimatePresence mode="wait">
              {activeTab === TabOptions.TestCases && (
                <motion.div
                  key="testcases"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#212121",
                      borderLeft: `4px solid #22c55e`,
                      padding: 2,
                      borderRadius: 1.5,
                      mb: 2,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        Test Case 1
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Check width={20} color="#22c55e" />
                        <Box
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            px: 1,
                            py: 0.5,
                            borderRadius: 999,
                            backgroundColor: "rgba(34,197,94,0.2)",
                            color: "#22c55e",
                          }}
                        >
                          PASSED
                        </Box>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ fontFamily: "monospace", color: "#d1d5db" }}>
                      Input: [1, 2, 3]
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: "monospace", color: "#f7df1e" }}>
                      Expected: 6
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: "monospace", color: "#4ade80" }}>
                      Output: 6
                    </Typography>
                    <Typography variant="caption" sx={{ mt: 1, color: "#6b7280" }}>
                      Runtime: 0.002s
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: "#212121",
                      borderLeft: `4px solid #ef4444`,
                      padding: 2,
                      borderRadius: 1.5,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2" fontWeight={600}>
                        Test Case 2
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <X width={20} color="#ef4444" />
                        <Box
                          sx={{
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            px: 1,
                            py: 0.5,
                            borderRadius: 999,
                            backgroundColor: "rgba(239,68,68,0.2)",
                            color: "#ef4444",
                          }}
                        >
                          FAILED
                        </Box>
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ fontFamily: "monospace", color: "#d1d5db" }}>
                      Input: [4, 5]
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: "monospace", color: "#f7df1e" }}>
                      Expected: 9
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: "monospace", color: "#f87171" }}>
                      Output: 8
                    </Typography>
                    <Typography variant="caption" sx={{ mt: 1, color: "#6b7280" }}>
                      Runtime: 0.004s
                    </Typography>
                  </Box>
                </motion.div>
              )}

              {activeTab === TabOptions.Console && (
                <motion.div
                  key="console"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ fontFamily: "monospace", fontSize: 14 }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#0f0f0f",
                      borderRadius: 2,
                      padding: 2,
                      minHeight: 200,
                      color: "#f7df1e",
                    }}
                  >
                    <Typography sx={{ color: "#6b7280" }}>$ Running test case 1...</Typography>
                    <Typography sx={{ color: "#6b7280" }}>$ Output: 42</Typography>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </motion.div>
      </Box>
    </Box>
  )
}
