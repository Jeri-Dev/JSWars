'use client'

import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Divider, IconButton, SvgIcon, Typography } from '@mui/material'
import { CheckDone01, CodeSnippet01, Flash, Users02, UserX02 } from '@untitled-ui/icons-react'
import { WARS_DIFFICULTY_LABELS, WarsDifficulty } from '@/shared/enums/Wars'
import { useBattleContext } from '@/modules/wars/contexts/BattleContext'
import { motion, useSpring, useTransform } from 'framer-motion'
import { getFirstSentence } from '@/shared/utils/formatters'
import { PLAYERS } from '@/shared/mock/Players'
import { useParams } from 'next/navigation'

const MotionBox = motion(Box)

export function LobbyPage() {
  const readyPlayers = 5
  const totalPlayers = 8
  const progress = (readyPlayers / totalPlayers) * 100

  const { id } = useParams()
  const { exercises } = useBattleContext()
  const animatedProgress = useSpring(progress, { stiffness: 80, damping: 20 })
  const progressBarWidth = useTransform(animatedProgress, value => `${value}%`)

  return (

    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" pt={3} px={3}>
        <Typography>
          Lobby
        </Typography>
        <Typography variant="body2" sx={{
          color: '#aaa'
        }}>
          Codigo: <strong style={{ color: '#F7DF1E' }}>{id}</strong>
        </Typography>
      </Box>
      <MotionBox
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' },
          gap: 3,
          p: 3,
          width: '100%',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}>
          <MotionBox
            sx={{
              flexGrow: 1,
              p: 2,
              border: '1px solid #333',
              borderRadius: 2,
              backgroundColor: '#282929b0',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <SvgIcon component={Flash} sx={{ color: '#F7DF1E' }} />
              <Typography sx={{ fontWeight: 700, color: '#F7DF1E', fontSize: 18 }}>
                Información de Sala
              </Typography>
            </Box>

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}>
              <Card sx={{
                boxShadow: 'none',
                border: '1px solid #333',
                borderRadius: 2,
                minWidth: 200,
                width: '100%',
              }}>
                <CardContent sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: '100%',
                }}>
                  <Users02 color='#F7DF1E' />
                  <Typography sx={{ fontSize: '24px', color: '#F7DF1E', fontWeight: 700 }}>
                    {readyPlayers}/{totalPlayers}
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#aaa' }}>
                    Players
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{
                boxShadow: 'none',
                border: '1px solid #333',
                borderRadius: 2,
                minWidth: 200,
                width: '100%',
              }}>
                <CardContent sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: '100%',
                }}>
                  <CheckDone01 color='#4ADE80' />
                  <Typography sx={{ fontSize: '24px', color: '#4ADE80', fontWeight: 700 }}>
                    {readyPlayers}
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#aaa' }}>
                    Ready
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box>
              <Box display="flex" justifyContent="space-between" flexDirection="row">
                <Typography sx={{ fontSize: 14, mb: 1, color: '#ccc' }}>
                  Estatus de jugadores
                </Typography>
                <Typography sx={{ fontSize: 12, mb: 1, color: '#F7DF1E' }}>
                  Estado: {readyPlayers}/{totalPlayers} listos
                </Typography>
              </Box>

              <Box
                sx={{
                  position: 'relative',
                  height: 10,
                  borderRadius: 8,
                  overflow: 'hidden',
                  backgroundColor: '#444',
                }}
              >
                <motion.div
                  style={{
                    height: '100%',
                    backgroundColor: '#F7DF1E',
                    width: progressBarWidth,
                  }}
                />
              </Box>
            </Box>
          </MotionBox>

          <MotionBox
            sx={{
              flexGrow: 1,
              p: 2,
              border: '1px solid #333',
              borderRadius: 2,
              backgroundColor: '#282929b0',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <CodeSnippet01 color='#F7DF1E' />
              <Typography sx={{ fontWeight: 700, color: '#F7DF1E', fontSize: 18 }}>
                Batallas ({exercises.length})
              </Typography>
            </Box>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}>
              {exercises.map((exercise) => (
                <Card
                  key={exercise.id}
                  sx={{
                    boxShadow: 'none',
                    border: '1px solid #333',
                    borderRadius: 2,
                    width: '100%',
                  }}
                >
                  <CardHeader
                    avatar={<CodeSnippet01 color='#F7DF1E' />}
                    title={exercise.title}
                    subheader={
                      <Typography sx={{ fontSize: 12, color: '#aaa', maxWidth: 290 }}>
                        {getFirstSentence(exercise.description)}
                      </Typography>
                    }
                    action={
                      <Box display="flex" gap={1} alignItems="center" mt={1.5}>
                        <Chip
                          label={WARS_DIFFICULTY_LABELS[exercise.difficulty]}
                          color={
                            exercise.difficulty === WarsDifficulty.EASY
                              ? 'success'
                              : exercise.difficulty === WarsDifficulty.MEDIUM
                                ? 'warning'
                                : 'error'
                          }
                          size="small"
                          sx={{ fontSize: '10px', mt: 0.5 }}
                        />
                        <Box display="flex" flexDirection="column">
                          <Typography sx={{ fontSize: 12, color: '#aaa' }}>
                            Tiempo estimado: 10:00
                          </Typography>
                          <Typography sx={{ fontSize: 12, color: '#aaa' }}>
                            Jugadores listos: 0/{totalPlayers}
                          </Typography>
                        </Box>
                      </Box>
                    } />
                </Card>
              ))}
            </Box>
          </MotionBox>
        </Box>

        <MotionBox
          sx={{
            flexGrow: 1,
            p: 2,
            border: '1px solid #333',
            borderRadius: 2,
            backgroundColor: '#282929b0',
            display: 'flex',
            flexDirection: 'column',
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Users02 color="#F7DF1E" />
            <Typography sx={{ fontWeight: 700, color: '#F7DF1E', fontSize: 18 }}>
              Participantes ({PLAYERS.length})
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              pr: 1,
            }}
          >
            {PLAYERS.map((player) => (
              <Card
                key={player.id}
                sx={{
                  boxShadow: 'none',
                  border: '1px solid #333',
                  borderRadius: 2,
                  width: '100%',
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: '#F7DF1E', color: '#000' }}>
                      {player.name.charAt(0)}
                    </Avatar>
                  }
                  title={
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>
                      {player.name}
                    </Typography>
                  }
                  subheader={
                    <Typography sx={{ fontSize: 12, color: '#aaa' }}>
                      {player.tag}
                    </Typography>
                  }
                  action={
                    <Box>
                      <Chip label={player.ready ? "Listo" : "No listo"} color={player.ready ? "success" : "error"} />
                      <IconButton sx={{ ml: 1 }}>
                        <UserX02 color={'#F87171'} />
                      </IconButton>
                    </Box>
                  }
                />
              </Card>
            ))}
          </Box>

          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 2, borderColor: '#444' }} />
            <Button
              href={`/wars/play`}
              variant="contained"
              sx={{ backgroundColor: '#F7DF1E', color: '#000' }}
              fullWidth
            >
              Empezar
            </Button>
          </Box>
        </MotionBox>
      </MotionBox >
    </>
  )
}
