'use client'

import { AutoGrid } from '@/shared/components/container/AutoGrid'
import { Select } from '@/shared/components/form/Select'
import { Flash, Plus } from '@untitled-ui/icons-react'
import { Input } from '@/shared/components/form/Input'
import { MOCK_EXERCISES } from '@/shared/mock/Wars'
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

export default function CreateWarPage() {
  const [selected, setSelected] = useState<number[]>([])

  const toggleSelection = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3,
        p: 3,
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '360px' },
          flexShrink: 0,
          p: 2,
          position: { md: 'sticky' },
          top: { md: 24 },
          maxHeight: { md: 'calc(100vh - 48px)' },
          overflowY: 'auto',
          border: '1px solid #333',
          borderRadius: 2,
          backgroundColor: '#282929b0',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SvgIcon component={Plus} sx={{ color: '#F7DF1E' }} />
          <Typography
            sx={{ fontSize: '20px', fontWeight: 700, color: '#F7DF1E' }}
          >
            Características de guerra
          </Typography>
        </Box>

        <AutoGrid columnMinWidth='250px' columnMaxWidth='800px'>

          <Input fullWidth type='text' name='room' placeholder="Nombre de sala" />
          <Select
            label="Número de jugadores"
            data={[
              { value: "4", label: "4 jugadores" },
              { value: "6", label: "6 jugadores" },
              { value: "8", label: "8 jugadores" },
              { value: "10", label: "10 jugadores" },
            ]}
            defaultValue={{ value: "8", label: "8 jugadores" }}
            onChange={(option) => {
              console.log("Seleccionado:", option)
            }}
          />
          <Input name='location' type='text' multiline placeholder="Describe tu guerra" />

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
          <Button variant="contained" sx={{
            backgroundColor: '#F7DF1E',
          }} fullWidth>
            Crear sala de guerra
          </Button>
          <Button variant="outlined" color="error" fullWidth>
            Cancelar
          </Button>
        </Box>
      </Box>

      <Box
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
                <CardActionArea sx={{
                  height: '100%',
                }} onClick={() => toggleSelection(exercise.id)}>
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
                        sx={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#fff',
                        }}
                      >
                        {exercise.title}
                      </Typography>
                    }
                    subheader={
                      <Chip
                        label={exercise.difficulty}
                        size="small"
                        color="default"
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
                  <CardContent
                    sx={{
                      color: '#ccc',
                      fontSize: '13px',
                    }}
                  >
                    {exercise.description}
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
