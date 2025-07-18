"use client"

import { useMediaQuery, useTheme, Box, SxProps } from '@mui/material'

interface AutoGridProps {
  children?: React.ReactNode
  fullWidthMaxWidth?: number
  columnMinWidth?: string
  columnMaxWidth?: string
  gap?: string
  sx?: SxProps
}

export function AutoGrid({
  children,
  fullWidthMaxWidth = 998,
  columnMinWidth = "49%",
  columnMaxWidth = '1fr',
  gap = '24px',
  sx = {},
}: AutoGridProps) {
  const theme = useTheme()
  const isFullWidth = useMediaQuery(theme.breakpoints.down(fullWidthMaxWidth))

  const min = `calc(${columnMinWidth} - ${gap})`

  return (
    <Box
      sx={{
        display: {
          md: "grid",
          xs: "flex"
        },
        flexDirection: "column",
        gridTemplateColumns: isFullWidth
          ? '1fr'
          : `repeat(auto-fit, minmax(${min}, ${columnMaxWidth}))`,
        gap,
        width: '100%',
        maxWidth: "100%",
        ...sx
      }}
    >
      {children}
    </Box>
  )
}

