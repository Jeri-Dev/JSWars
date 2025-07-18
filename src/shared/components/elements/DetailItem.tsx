import { Box, Typography } from '@mui/material'
import { IconApp } from '@/types/Icon'

interface Props {
  title: string
  children: React.ReactNode
  icon: IconApp
}

export function DetailItem(props: Props) {
  const {
    title,
    children,
    icon: Icon
  } = props

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        width: "100%",
      }}
    >
      <Icon
        width={22}
        height={22}
        color={"#C3C6CD"}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "start",
          width: "100%",
        }}
      >

        <Typography
          fontSize={16}
          fontWeight={400}
          color='#C3C6CD'
        >
          {title}
        </Typography>
        <Box
          fontSize={16}
        >
          {children}
        </Box>
      </Box>


    </Box>
  )
}