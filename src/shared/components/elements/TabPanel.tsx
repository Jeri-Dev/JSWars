import { Box } from "@mui/material"
import React from "react"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  )
}
