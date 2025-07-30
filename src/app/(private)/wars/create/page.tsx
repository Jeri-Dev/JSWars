'use client'

import { WARS_DIFFICULTY_LABELS, WarsDifficulty } from '@/shared/enums/Wars'
import { useBattleContext } from '@/modules/wars/contexts/BattleContext'
import { AutoGrid } from '@/shared/components/container/AutoGrid'
import { Select } from '@/shared/components/form/Select'
import { Flash, Plus } from '@untitled-ui/icons-react'
import { Input } from '@/shared/components/form/Input'
import { MOCK_EXERCISES } from '@/shared/mock/Wars'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
  Checkbox,
  Divider,
  SvgIcon,
  Avatar,
  Button,
  Card,
  Chip,
  Box,
} from '@mui/material'

const MotionBox = motion(Box)

export default function CreateWarPage() {

  const [selected, setSelected] = useState<number[]>([])
  const [description, setDescription] = useState('')
  const [roomName, setRoomName] = useState('')
  const [players, setPlayers] = useState('')

  const router = useRouter()
  const { setExercises } = useBattleContext()

  const toggleSelection = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleCreateRoom = () => {
    if (!isFormValid) return

    const selectedExercises = MOCK_EXERCISES.filter((e) =>
      selected.includes(e.id)
    )

    setExercises(selectedExercises)

    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase()
    router.push(`/wars/${roomId}`)
  }

  const isFormValid =
    roomName.trim() !== '' && players !== ''

  return (
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
      <MotionBox
        sx={{
          width: { xs: '100%', sm: '100%', md: '100%', lg: '360px' },
          flexShrink: 0,
          p: 2,
          position: { xs: 'static', md: 'sticky' },
          top: { md: 24 },
          maxHeight: { xs: 'none', md: 'calc(100vh - 48px)' },
          overflowY: { xs: 'visible', md: 'auto' },
          border: '1px solid #333',
          borderRadius: 2,
          backgroundColor: '#282929b0',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SvgIcon component={Plus} sx={{ color: '#F7DF1E' }} />
          <Typography sx={{ fontSize: '20px', fontWeight: 700, color: '#F7DF1E' }}>
            Características de guerra
          </Typography>
        </Box>

        <AutoGrid columnMinWidth="250px" columnMaxWidth="800px">
          <Input
            fullWidth
            type="text"
            name="room"
            placeholder="Nombre de sala"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <Select
            label="Número de jugadores"
            data={[
              { value: '4', label: '4 jugadores' },
              { value: '6', label: '6 jugadores' },
              { value: '8', label: '8 jugadores' },
              { value: '10', label: '10 jugadores' },
            ]}
            onChange={(option) => {
              setPlayers(option?.value ?? '')
            }}
          />
          <Input
            name="location"
            type="text"
            multiline
            placeholder="Describe tu guerra"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </AutoGrid>

        <Divider />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: '14px', color: '#aaa' }}>
            Selected exercises
          </Typography>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              fontSize: '12px',
              backgroundColor: '#F7DF1E',
              color: '#000',
            }}
          >
            {selected.length}
          </Avatar>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            onClick={handleCreateRoom}
            variant="contained"
            sx={{ backgroundColor: '#F7DF1E' }}
            fullWidth
            disabled={!isFormValid}
          >
            Crear sala de guerra
          </Button>
          <Button variant="outlined" color="error" fullWidth>
            Cancelar
          </Button>
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SvgIcon component={Flash} sx={{ color: '#F7DF1E' }} />
          <Typography sx={{ fontWeight: 700, color: '#F7DF1E', fontSize: 18 }}>
            Batallas Seleccionadas ({selected.length})
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '12px', color: '#aaa' }}>
          Selecciona las batallas de código para tu guerra
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'flex-start',
            pb: 2,
          }}
        >
          {MOCK_EXERCISES.map((exercise, index) => {
            const isSelected = selected.includes(exercise.id)
            return (
              <Card
                key={exercise.id}
                sx={{
                  flex: '1 1 240px',
                  minWidth: '240px',
                  maxWidth: '100%',
                  border: `2px solid ${isSelected ? '#F7DF1E' : '#444'}`,
                  backgroundColor: isSelected
                    ? 'rgba(247, 223, 30, 0.05)'
                    : 'transparent',
                  borderRadius: 2,
                }}
              >
                <CardActionArea
                  sx={{ height: '100%' }}
                  onClick={() => toggleSelection(exercise.id)}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{
                          backgroundColor: '#F7DF1E',
                          color: '#000',
                          fontSize: '12px',
                          width: 32,
                          height: 32,
                        }}
                      >
                        {index + 1}
                      </Avatar>
                    }
                    title={
                      <Typography
                        sx={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}
                      >
                        {exercise.title}
                      </Typography>
                    }
                    subheader={
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
                    }
                    action={
                      <Checkbox
                        checked={isSelected}
                        sx={{
                          color: '#F7DF1E',
                          '&.Mui-checked': {
                            color: '#F7DF1E',
                          },
                        }}
                      />
                    }
                  />
                  <CardContent sx={{ color: '#ccc', fontSize: '13px' }}>
                    {exercise.description}
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          })}
        </Box>
      </MotionBox>
    </MotionBox>
  )
}
