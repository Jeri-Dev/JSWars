import { TabsContainer } from '@/modules/friends/components/TabsContainer'
import { FriendsCard } from '@/modules/friends/components/FriendsCard'
import { FriendshipStatus } from '@/shared/enums/Friends'
import { Box, Button, Typography } from '@mui/material'
import { Input } from '@/shared/components/form/Input'
import { UserPlus01 } from '@untitled-ui/icons-react'
import React from 'react'

export default function FriendsPage() {
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
            Friends
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Maneja tus solicitudes de amistad y amigos.
          </Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          width: "40%",
        }}>
          <Input
            fullWidth
            placeholder="Buscar amigos"
            variant="outlined"
            size="small"
          />
          <Button
            startIcon={<UserPlus01 />}
            variant='contained'

            sx={{
              minWidth: '175px',
              backgroundColor: '#F7DF1E',
            }}
          >
            Agregar amigo
          </Button>
        </Box>
      </Box>

      <Box >
        <TabsContainer
          defaultTab={0}
          tabs={[
            {
              label: "Friends (1)",
              content: (
                <FriendsCard status={FriendshipStatus.ACCEPTED} />
              ),
            },
            {
              label: "Solicitudes (2)",
              content: (
                <Box sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '24px',
                }}>
                  <FriendsCard status={FriendshipStatus.PENDING} />
                  <FriendsCard status={FriendshipStatus.PENDING} incoming />
                </Box>
              )
            },
          ]}
        />
      </Box>
    </>
  )
}
