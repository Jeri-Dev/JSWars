import { Box, Card, CardContent, CardHeader, Chip, Stack, Typography } from '@mui/material'
import { CalendarCheck01, NavigationPointer01, Shield01 } from '@untitled-ui/icons-react'
import React from 'react'

export function ProfileCard() {
  return (
    <Card sx={{
      p: 0,
      m: 0,
      borderRadius: '8px',
      boxShadow: 'none',
      position: 'relative',
    }}>
      <CardHeader sx={{
        height: '120px',
        backgroundColor: '#f7de1e45',
      }} />

      <CardContent sx={{
        px: '35px',
        py: '60px',
      }}>

        <Box sx={{
          position: 'absolute',
          top: '65px',
          left: '30px',
          width: "100px",
          height: "100px",
          borderRadius: '50%',
          backgroundColor: '#f7de1e',
        }}>

        </Box>

        <Typography sx={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: "#f7de1e",
        }}>
          Alex Rodriguez
        </Typography>

        <Typography sx={{
          fontSize: '16px',
          fontWeight: 'light',
          color: "#9CA3AF",
        }}>
          @alexdev
        </Typography>

        <Typography sx={{
          fontSize: '15px',
          fontWeight: 'light',
          color: "#949597",
          mt: 1,
        }}>
          Passionate gamer and developer. Always looking for new challenges and friends to play with!
        </Typography>

        <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, minWidth: '150px' }}>
            <NavigationPointer01 width={18} color='#9CA3AF' />
            <Typography sx={{
              fontSize: '12px',
              fontWeight: 'light',
              color: "#9CA3AF",
            }}>
              San Francisco, CA
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, minWidth: '150px' }}>
            <CalendarCheck01 width={18} color='#9CA3AF' />
            <Typography sx={{
              fontSize: '12px',
              fontWeight: 'light',
              color: "#9CA3AF",
            }}>
              Joined March 2023
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, minWidth: '150px' }}>
            <Shield01 width={18} color='#9CA3AF' />
            <Typography sx={{
              fontSize: '12px',
              fontWeight: 'light',
              color: "#9CA3AF",
            }}>
              Verified Account
            </Typography>
          </Box>
        </Stack>

        <Stack direction={"row"} spacing={2} sx={{ mt: 2 }}>
          <Chip label="Game Developer" color='warning' />
          <Chip label="Unity" color='success' />
          <Chip label="Streamer" color='secondary' />
        </Stack>

      </CardContent>
    </Card>
  )
}