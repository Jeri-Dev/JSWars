"use client"

import { Box, Skeleton } from '@mui/material'
import { AutoGrid } from '../container/AutoGrid'
import { APP_COLORS } from '@/config/colors'
import { InputSkeleton } from './InputSkeleton'
import { ButtonSkeleton } from './ButtonSkeleton'

interface Props {
  fields?: number
}

export function FormSkeleton(props: Props) {
  const {
    fields = 7,
  } = props

  return (
    <>
      <Box
        sx={{
          borderRadius: "12px",
          width: "100%",
          padding: "24px",
          border: `1px solid ${APP_COLORS.NEUTRAL_GREY}`,
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}>
        <Box mb={1}>
          <Skeleton
            variant='text'
            animation="wave"
            width={"50%"}
            height={25}
          />
        </Box>
        <AutoGrid>
          {Array.from({ length: fields || 3 }).map((_, index) => (
            <InputSkeleton key={index} />
          ))}
        </AutoGrid>

      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          marginTop: "24px",
          justifyContent: "flex-end",
        }}>
        <ButtonSkeleton />
        <ButtonSkeleton />
      </Box>
    </>
  )
}