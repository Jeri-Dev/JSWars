'use client'

import { RecentWarsList } from '@/modules/wars/components/RecentWarsList'
import { CardWins } from '@/modules/wars/components/CardWins'
import { Box, Button, Typography, } from '@mui/material'
import { Plus, } from '@untitled-ui/icons-react'

export default function Page() {
  return (
    <>
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        mb: 4,
      }}>

        <Box>
          <Typography>
            Guerras
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Maneja tus solicitudes de guerra y aliados.
          </Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}>

          <Button
            startIcon={<Plus />}
            href='/wars/create'
            variant='contained'

            sx={{
              minWidth: '175px',
              backgroundColor: '#F7DF1E',
            }}
          >
            Crear Guerra
          </Button>
        </Box>
      </Box>

      <CardWins />
      <RecentWarsList />
    </>
  )
}
