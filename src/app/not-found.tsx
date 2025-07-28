import { ButtonLink } from '@/shared/components/elements/ButtonLink'
import { Box, Card, CardHeader, Typography } from '@mui/material'
import { verifySession } from '@/shared/helpers/session'
import { SessionProvider } from '@/contexts/Session'
import MainLayout from '@/layouts/main/MainLayout'
import { Code02 } from '@untitled-ui/icons-react'
import { headers } from 'next/headers'

export default async function NotFound() {
  const session = await verifySession({ notRedirect: true })
  const headersList = await headers()

  const host = headersList.get('host') ?? 'localhost'
  const path = headersList.get('referer')?.split(host)?.[1] ?? '/'

  if (session && !path.startsWith('/auth') && !path.startsWith('/pages')) {

    return (

      <SessionProvider
        payload={session.payload}
        token={session.token}
        permissions={session.permissions}
      >
        <MainLayout>
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '65vh',
                width: '100%',
                flexDirection: 'column',
                gap: 'var(--gap-3)',
              }}
            >
              <Card
                sx={{
                  p: 0,
                  m: 0,
                  boxShadow: "none",
                }}>
                <CardHeader
                  title={
                    <Typography sx={{ fontWeight: 600, fontSize: '24px' }}>
                      JS<span style={{ color: '#F7DF1E' }}>Wars</span>
                    </Typography>
                  }
                  avatar={<Code02 />}
                />
              </Card>
              <Typography
                fontSize={18}
                maxWidth={"40ch"}
                textAlign="center"
                marginBottom={2}
              >
                We couldn&apos;t find the page you&apos;re looking for,
                please check the URL and try again.
              </Typography>

              <ButtonLink
                href='/'
                text='Ir al Dashboard'
              />
            </Box>
          </>
        </MainLayout>
      </SessionProvider>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        flexDirection: 'column',
        gap: 'var(--gap-3)'
      }}
    >
      <Card
        sx={{
          p: 0,
          m: 0,
          boxShadow: "none",
        }}>
        <CardHeader
          title={
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              JS<span style={{ color: '#F7DF1E' }}>Wars</span>
            </Typography>
          }
          subheader={
            <Typography sx={{ fontWeight: 300, fontSize: '13px', lineHeight: '16px', letterSpacing: '0.5px', color: '#9CA3AF' }}>
              Practice Platform
            </Typography>
          }
          avatar={<Code02 />}
        />
      </Card>
      <Typography
        fontSize={18}
        maxWidth={"40ch"}
        textAlign="center"
        marginBottom={2}
      >
        We couldn&apos;t find the page you&apos;re looking for,
        please check the URL and try again.
      </Typography>

      <ButtonLink
        href='/auth'
        text='Ir al inicio de sesión'
      />
    </Box>
  )
}