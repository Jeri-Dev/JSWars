import { TabsContainer } from '@/modules/friends/components/TabsContainer'
import { RequestsList } from '@/modules/friends/components/RequestsList'
import { FriendsList } from '@/modules/friends/components/FriendsList'
import { MOCK_FRIENDS, MOCK_REQUESTS } from '@/shared/mock/Friends'
import { Box, Button, Typography } from '@mui/material'
import { Input } from '@/shared/components/form/Input'
import { UserPlus01 } from '@untitled-ui/icons-react'
import React from 'react'

export default function FriendsPage() {

  const friendsCount = MOCK_FRIENDS.length
  const requestsCount = MOCK_REQUESTS.length

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
              label: `Amigos (${friendsCount})`,
              content: <FriendsList data={MOCK_FRIENDS} />,
            },
            {
              label: `Solicitudes (${requestsCount})`,
              content: <RequestsList data={MOCK_REQUESTS} />,
            },
          ]}
        />
      </Box>
    </>
  )
}
