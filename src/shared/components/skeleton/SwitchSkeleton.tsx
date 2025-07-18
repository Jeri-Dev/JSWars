"use client"

import { Box, Skeleton } from '@mui/material'

export function SwitchSkeleton() {
  return (
    <Box sx={{
      display: "flex",
      gap: "16px",
      alignItems: "center",
      width: "100%",
    }}>
      <Skeleton
        variant='rounded'
        animation="wave"
        width={60}
      />
      <Skeleton
        variant='text'
        animation="wave"
        width={"125px"}
      />
    </Box>
  )
}