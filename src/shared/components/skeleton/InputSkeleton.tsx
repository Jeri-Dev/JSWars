"use client"

import { Box, Skeleton } from '@mui/material'

interface Props {
  maxWidth?: string | number
}

export function InputSkeleton(props: Props) {
  const { maxWidth } = props
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    }}>
      <Skeleton
        variant="text"
        animation="wave"
        width={"250px"}
      />
      <Skeleton
        variant="rounded"
        height={40}
        animation="wave"
        sx={{
          maxWidth,
          width: '100%',
        }}
      />
    </Box>
  )
}