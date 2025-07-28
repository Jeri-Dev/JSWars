"use client"

import { OptionsMenu } from '@/shared/components/elements/OptionMenu'
import { FriendshipStatus } from '@/shared/enums/Friends'
import { UserX01 } from '@untitled-ui/icons-react'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
  Button,
  Box,
} from '@mui/material'

interface Props {
  userName?: string
  tagName?: string
  status?: FriendshipStatus
  incoming?: boolean
}

export function FriendsCard(props: Props) {
  const {
    tagName = 'defaultTag',
    userName = 'Pepe Martinez',
    status = FriendshipStatus.ACCEPTED,
    incoming = false,
  } = props

  return (
    <Card
      sx={{
        width: { xs: '100%', sm: '350px' },
        border: '1px solid #e0e0e022',
        boxShadow: 'none',
        borderRadius: '8px',
      }}
    >
      <CardHeader
        avatar={
          <Image
            style={{ borderRadius: '50%' }}
            width={50}
            height={50}
            src={"/avatar.png"}
            alt='Avatar'
          />
        }
        title={
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            {userName}
          </Typography>
        }
        subheader={
          <Typography
            sx={{
              fontSize: '12px',
              color: 'text.secondary',
            }}
          >
            {`@${tagName}`}
          </Typography>
        }
        action={
          status === FriendshipStatus.ACCEPTED ? (
            <OptionsMenu
              sx={{
                color: "#FFFFFFB3",
                transform: 'rotate(90deg)',
              }}
              options={[
                {
                  type: 'button',
                  icon: UserX01,
                  label: 'Remove Friend',
                  onClick: () => console.log('Remove Friend clicked'),
                },
              ]}
            />
          ) : null
        }
      />
      <CardContent sx={{ pt: 0 }}>
        {status === FriendshipStatus.PENDING && incoming && (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <Button
              fullWidth
              size="small"
              variant="contained"
              color="success"
              onClick={() => console.log("Accept clicked")}
            >
              Accept
            </Button>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              color="error"
              onClick={() => console.log("Decline clicked")}
            >
              Decline
            </Button>
          </Box>
        )}

        {status === FriendshipStatus.PENDING && !incoming && (
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Chip
              color="warning"
              label="Pending"
              size="small"
            />
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => console.log("Cancel clicked")}
            >
              Cancel
            </Button>
          </Box>
        )}

        {status === FriendshipStatus.ACCEPTED && (
          <Chip
            color="success"
            label="Online"
            size="small"
          />
        )}
      </CardContent>
    </Card>
  )
}
