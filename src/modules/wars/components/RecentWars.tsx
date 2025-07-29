import { Box, Card, CardActionArea, CardHeader, Chip, Typography } from '@mui/material'
import { ChevronRight, Flash } from '@untitled-ui/icons-react'

interface Props {
  title: string
  createdBy: string
  description: string
  status: string
}

export function RecentWars(props: Props) {
  const { title, createdBy, description, status } = props

  return (
    <Card sx={{
      boxShadow: "none",
      backgroundColor: '#0a0a0a',
      border: '1px solid #333',
      borderRadius: 2,
    }}>
      <CardActionArea>
        <CardHeader
          title={
            <Typography sx={{
              fontSize: "16px",
              fontWeight: 600,
              color: '#F7DF1E',
            }}>
              {title}
            </Typography>
          }
          subheader={
            <>
              <Typography sx={{
                fontSize: "12px",
                color: '#838181',
              }}>
                {description}
              </Typography>
              <Typography sx={{
                fontSize: "12px",
                color: '#838181',
              }}>
                {createdBy}
              </Typography>
            </>
          }
          action={
            <Box sx={{
              mt: 2.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}>
              <Chip
                label={status}
                color='warning'
              />
              <ChevronRight color='#838181' />
            </Box>
          }
          avatar={
            <Box sx={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#F7DF1E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Flash color='#000' width={20} />
            </Box>
          }
        />
      </CardActionArea>
    </Card>
  )
}