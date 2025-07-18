"use client"

import { Skeleton } from '@mui/material'

interface Props {
  height?: number | string
  width?: number | string
}

export function ButtonSkeleton(props: Props) {

  const {
    height = 56,
    width = 150
  } = props

  return (
    <Skeleton
      animation='wave'
      variant='rounded'
      width={width}
      height={height}
    />
  )
}