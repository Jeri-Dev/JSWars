'use client'

import { Box, Typography, TextField, Chip, IconButton, ButtonBase, InputAdornment } from '@mui/material'
import { FilterFunnel01, BarChartSquare02, SearchSm } from '@untitled-ui/icons-react'
import { PROBLEMS } from '@/shared/mock/Problem'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'



export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return { bg: 'rgba(34,197,94,0.2)', color: '#22c55e' }
    case 'Medium':
      return { bg: 'rgba(234,179,8,0.2)', color: '#eab308' }
    case 'Hard':
      return { bg: 'rgba(239,68,68,0.2)', color: '#ef4444' }
    default:
      return { bg: '#2f3030', color: '#9CA3AF' }
  }
}

export default function Page() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const filteredProblems = PROBLEMS.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Box sx={{ backgroundColor: '#1A1A1A', }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ color: '#F7DF1E', fontWeight: 700 }}>
          Wars
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mb: 4,
      }}>
        <TextField
          placeholder="Search problems..."
          variant="outlined"
          size="small"
          onChange={e => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchSm style={{ color: '#9CA3AF', width: 18, height: 18 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            input: {
              color: '#9CA3AF',
              fontSize: '0.85rem',
              py: 1,
              borderRadius: '8px',
            },
            fieldset: {
              borderColor: '#2f3030',
              borderRadius: '8px',
            },
            '& .MuiOutlinedInput-root:hover fieldset': {
              borderColor: '#F7DF1E',
              borderRadius: '8px',
            },
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#1A1A1A',
              borderRadius: '12px',
            },
          }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <IconButton sx={{ color: '#9CA3AF' }} size="small">
            <FilterFunnel01 width={18} />
          </IconButton>
          <IconButton sx={{ color: '#9CA3AF' }} size="small">
            <BarChartSquare02 width={18} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {filteredProblems.map((problem, i) => {
          const isEven = i % 2 === 0
          const { bg, color } = getDifficultyColor(problem.difficulty)

          return (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{
                backgroundColor: isEven ? '#1A1A1A' : '#2a2a2a',
                borderRadius: 6,
                marginBottom: 8,
              }}
            >
              <ButtonBase
                onClick={() => router.push(`/wars/${problem.id}`)}
                sx={{
                  width: '100%',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '10px 16px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                    mb: 0.5,
                  }}
                >
                  <Typography
                    sx={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 400 }}
                  >
                    {problem.id}. {problem.title}
                  </Typography>

                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}>
                    <Typography sx={{ fontSize: '0.8rem', color: '#9CA3AF' }}>
                      {problem.acceptance.toFixed(1)}%
                    </Typography>
                    <Chip
                      label={problem.difficulty}
                      size="small"
                      sx={{
                        backgroundColor: bg,
                        color,
                        fontSize: '0.7rem',
                        fontWeight: 500,
                      }}
                    />
                  </Box>
                </Box>
              </ButtonBase>
            </motion.div>
          )
        })}
      </Box>
    </Box>
  )
}
