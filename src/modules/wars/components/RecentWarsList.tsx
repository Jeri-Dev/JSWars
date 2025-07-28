import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import { RECENT_WARS_MOCK } from '@/shared/mock/Wars'
import { Trophy02 } from '@untitled-ui/icons-react'
import { RecentWars } from './RecentWars'

export function RecentWarsList() {
  return (
    <Card sx={{
      boxShadow: "none",
    }}>
      <CardHeader
        avatar={<Trophy02 color='#F7DF1E' />}
        title={
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#F7DF1E' }}>
            Guerras
          </Typography>
        }
      />
      <CardContent sx={{
        m: 0,
      }}>
        <Stack spacing={2}>
          {RECENT_WARS_MOCK.map((war) => (
            <RecentWars
              key={war.title}
              title={war.title}
              createdBy={war.createdBy}
              description={war.description}
              status={war.status}
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  )
}