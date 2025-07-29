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
  }>
}

export function FriendsList({ data }: Props) {
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
      {data.map((friend) => (
        <FriendsCard
          key={friend.id}
          tagName={friend.name}
          userName={friend.username}
          status={friend.status}
        />
      ))}
    </Box>
  )
}
