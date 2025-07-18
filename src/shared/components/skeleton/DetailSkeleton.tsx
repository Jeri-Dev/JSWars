"use client"

import { AutoGrid } from '../container/AutoGrid'
import { Box, Skeleton } from '@mui/material'
import { APP_COLORS } from '@/config/colors'

interface Props {
  items?: number
  children?: React.ReactNode
}

export function DetailSkeleton(props: Props) {
  const {
    items = 7,
    children,
  } = props

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
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
            width={"40%"}
            height={25}
          />
        </Box>
        <AutoGrid>
          {Array.from({ length: items || 3 }).map((_) => (
            <Box>
              <Box sx={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}>
                <Skeleton
                  variant="circular"
                  animation="wave"
                  width={30}
                  height={30}
                />
                <Skeleton
                  variant="text"
                  animation="wave"
                  width={"50%"}
                  height={25}
                />
              </Box>
              <Skeleton
                variant="text"
                animation="wave"
                width={"100%"}
                height={25}
              />
            </Box>
          ))}
        </AutoGrid>

      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          marginTop: "24px",
          justifyContent: "space-between",
        }}>
        {
          children
        }
      </Box>
    </Box>
  )
}