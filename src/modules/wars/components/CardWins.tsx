import { Box, Typography } from '@mui/material'
import { Trophy02 } from '@untitled-ui/icons-react'

export function CardWins() {
  return (
    <Box sx={{
      border: '1px solid #333',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 2,
      backgroundColor: '#1A1A1A',
      borderRadius: 2,
      width: '100%',
      height: '100px',
      mb: 4,
    }}>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}>
        <Typography sx={{
          fontSize: "14px",
          fontWeight: 300,
          color: 'text.secondary',
        }}>
          Your wins
        </Typography>

        <Typography sx={{
          fontSize: "20px",
          fontWeight: 600,
          color: '#F7DF1E',
        }}>
          47
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50px',
        height: '50px',
        backgroundColor: '#333',
        borderRadius: '50%',
      }}>
        <Trophy02 />
      </Box>
    </Box>
  )
}