import { Box } from '@mui/material'
import React, { useState } from 'react'

interface Props {
  label: string
  icon: React.ElementType
  action: (e: React.MouseEvent) => void
  isActive?: boolean
  index?: number
}

export function SideBarItem(props: Props) {

  const { label, icon: Icon, action, isActive = false } = props

  const [isHovered, setIsHovered] = useState(false)

  const iconColor = isActive
    ? "#F7DF1E"
    : isHovered
      ? "white"
      : "#9CA3AF"

  const textColor = isActive
    ? "#F7DF1E"
    : isHovered
      ? "white"
      : "#9CA3AF"

  const backgroundColor = isActive
    ? (isHovered ? "#F7DF1E1A" : "#F7DF1E1A")
    : isHovered
      ? "#40444b79"
      : "transparent"

  return (
    <Box
      sx={{
        color: textColor,
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        fontSize: "13px",
        fontWeight: 300,
        lineHeight: "20px",
        gap: "16px",
        padding: "10px 12px",
        borderRadius: "8px",
        cursor: "pointer",
        border: `1px solid ${isActive ? "rgba(247, 223, 30, 0.2)" : "transparent"}`,
        backgroundColor: backgroundColor,
        transition: "all 0.15s ease-in-out",
        transform: isHovered ? "translateX(6px)" : "none",
      }}
      onClick={action}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon size={20} color={iconColor} />
      {label}
    </Box>
  )
}
