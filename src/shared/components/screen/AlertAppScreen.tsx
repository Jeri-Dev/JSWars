"use client"

import { AlertCircle, AlertTriangle, CheckCircle, InfoCircle } from '@untitled-ui/icons-react'
import { Modal as ModalMui, Box, Button, Typography } from '@mui/material'
import { useAlert, AlertType } from '@/contexts/Alert'
import { APP_COLORS } from '@/config/colors'
import { IconApp } from '@/types/Icon'

export function AlertAppScreen() {
  const {
    config,
    open,
    closeAlert
  } = useAlert()



  const icons: Record<AlertType, IconApp> = {
    error: AlertCircle,
    info: InfoCircle,
    success: CheckCircle,
    warning: AlertTriangle
  }

  const Icon = icons[config?.type as AlertType]

  return (
    <ModalMui
      sx={{ margin: '24px' }}
      open={open && Boolean(config)}
      disableAutoFocus
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          bgcolor: APP_COLORS.BG_DARK_COLOR,
          boxShadow: "0px 12px 100px 0px #1c1d2029",
          borderRadius: '16px',
          maxWidth: "480px",
          display: 'flex',
          flexDirection: 'column',
          alignItems: "center",
          padding: "32px",
          gap: "32px"
        }}
      >
        {config && (
          <>
            <Box>
              <Icon color={"#F7DF1E"} width={60} height={60} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px"
              }}
            >
              <Box>
                <Typography
                  textAlign="center"
                  fontWeight={500}
                  fontSize={18}
                >
                  {config.title}
                </Typography>
              </Box>
              <Box>
                <Typography
                  color={"white"}
                  textAlign="center"
                  fontWeight={400}
                  fontSize={14}
                >
                  {config.message}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              {config.allowCancel && (
                <Button
                  color='secondary'
                  variant='outlined'
                  onClick={() => {
                    !config.preventClose && closeAlert()
                    config.onCancel?.()
                  }}
                  sx={{
                    padding: "10px 24px",
                    borderRadius: "12px",
                    boxShadow: "none",
                    fontSize: "14px"
                  }}
                >
                  Cancelar
                </Button>
              )}

              <Button
                variant='contained'
                color='primary'
                onClick={() => {
                  !config.preventClose && closeAlert()
                  config.onAccept?.()
                }}
                sx={{
                  padding: "10px 24px",
                  borderRadius: "12px",
                  boxShadow: "none",
                  fontSize: "14px"
                }}
              >
                Aceptar
              </Button>
            </Box>
          </>
        )}
      </Box>
    </ModalMui>
  )
}