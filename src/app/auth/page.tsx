import { LoginForm } from '@/modules/auth/components/LoginForm'
import { LogOut01, } from '@untitled-ui/icons-react'
import { Box, Typography } from '@mui/material'
import "@/shared/styles/layouts/auth/auth.css"
import { APP_COLORS } from '@/config/colors'

export default function AuthPage() {
  return (
    <Box
      sx={{
        gap: "16px",
        display: "flex",
        padding: "24px",
        margin: "0 auto",
        maxWidth: "1440px",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >

        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "480px",
          maxHeight: "fit-content",
          background: "#2A2A2A",
          width: "100%",
          height: "100%",
          padding: "16px",
          borderRadius: "10px",
          border: `1px solid ${APP_COLORS.BORDER_COLOR}`,
        }}
        >
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            mb: "16px",
          }}>
            <Box sx={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#F7DF1E",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <LogOut01 width={50} color='#000000' />
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: '#F7DF1E',
                fontWeight: 'bold',
                mt: '12px',
              }}
            >
              Bienvenido de nuevo
            </Typography>
            <Typography
              sx={{
                color: '#6B7280',
                textAlign: 'center',
                mt: '8px',
                fontSize: '16px',
              }}
            >
              Ingresa tus credenciales para continuar
            </Typography>
          </Box>
          <LoginForm />
        </Box>
      </Box>
    </Box>
  )
}
