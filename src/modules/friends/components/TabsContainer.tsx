"use client"
import { TabPanel } from '@/shared/components/elements/TabPanel'
import { Tabs, Tab, Box } from "@mui/material"
import { APP_COLORS } from '@/config/colors'
import { useState } from 'react'

interface TabContent {
  label: string
  content: React.ReactNode
}

interface TabsContainerProps {
  tabs: TabContent[]
  defaultTab?: number
}

export const TabsContainer: React.FC<TabsContainerProps> = ({
  tabs,
  defaultTab = 0
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      gap: "40px",
    }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          "& .MuiTabs-flexContainer": {
            maxWidth: "250px",
            width: "100%",
            justifyContent: "space-between",
          },
          "& .MuiTab-root": {
            width: "100%",
            textTransform: "none",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "22px",
            borderRadius: "8px",
            color: APP_COLORS.NEUTRAL_BLACK_2,
          },
          "& .MuiTabs-indicator": {
            display: "none",
            height: "3px",
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#000",
            background: "#F7DF1E;",
          },
        }}
        aria-label="tab container"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            id={`tab-${index}`}
            sx={{ textTransform: "none" }}
          />
        ))}
      </Tabs>
      {tabs.map((t, index) => (
        <TabPanel key={index} value={activeTab} index={index}>
          {t.content}
        </TabPanel>
      ))}
    </Box>
  )
}