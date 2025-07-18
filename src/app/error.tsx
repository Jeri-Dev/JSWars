"use client"

import { Box, Card, CardHeader, Typography } from '@mui/material'
import { Code02 } from '@untitled-ui/icons-react'

export default function Error() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Card
        sx={{
          p: 0,
          m: 0,
          boxShadow: "none",
        }}>
        <CardHeader sx={{
          backgroundColor: "#1A1A1A",
        }}
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
      >
        En este momento nuestra aplicación no está disponible,
        por favor intenta de nuevo más tarde.
      </Typography>

    </Box>
  )
}