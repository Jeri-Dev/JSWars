import { Box, Skeleton, Stack } from '@mui/material'

export function DashboardSkeleton() {

  const skeletonRadius = { borderRadius: '16px' }

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"36px"}>
      <Box sx={{
        width: "100%",
        height: "134px",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
      }}>
        <Stack spacing={2} direction={'row'} width={"100%"} >
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={130}
            sx={skeletonRadius}
          />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={130}
            sx={skeletonRadius}
          />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={130}
            sx={skeletonRadius}
          />
        </Stack>
      </Box>
      <Box display={"flex"} gap={"24px"} width={"100%"}>
        <Skeleton
          variant="rounded"
          width={"100%"}
          height={376}
          sx={skeletonRadius}
        />
        <Skeleton
          variant="rounded"
          width={"25%"}
          height={250}
          sx={skeletonRadius}
        />
      </Box>
      <Box>
        <Skeleton
          variant="rounded"
          width={"100%"}
          height={376}
          sx={skeletonRadius}
        />
      </Box>
    </Box>
  )
}