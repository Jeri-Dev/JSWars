import { Box, Card, CardHeader, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
  title: string
  subheader: string
  icon: ReactNode
}

export function CardInfo(props: Props) {

  const {
    title,
    subheader,
    icon
  } = props

  return (
    <Card sx={{
      boxShadow: 'none',
      border: '1px solid #3A3A3A',
      borderRadius: '8px',
      background: "#2A2A2A",
      width: '100%',
    }}>
      <CardHeader
        title={
          <Typography sx={{
            color: "#6B7280",
            fontSize: '12px',
            fontWeight: 400
          }}>
            {title}
          </Typography>
        }
        subheader={
          <Typography sx={{
            color: "#F7DF1E",
            fontSize: '24px',
            fontWeight: 700
          }}>
            {subheader}
          </Typography>
        }
        action={
          <Box sx={{
            width: '50px',
            height: '50px',
            bgcolor: '#1E1E1E',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {icon}
          </Box>
        }
      />
    </Card>
  )
}