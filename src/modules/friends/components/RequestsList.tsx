'use client'

import { FriendsCard } from '@/modules/friends/components/FriendsCard'
import { FriendshipStatus } from '@/shared/enums/Friends'
import { Box } from '@mui/material'

interface Props {
  data: Array<{
    id: number
    name: string
    username: string
    status: FriendshipStatus
    incoming?: boolean
  }>
}

export function RequestsList({ data }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        width: '100%',
        justifyContent: 'flex-start',
      }}
    >
      {data.map((request) => (
        <FriendsCard
          key={request.id}
          tagName={request.name}
          userName={request.username}
          status={request.status}
          incoming={request.incoming}
        />
      ))}
    </Box>
  )
}
