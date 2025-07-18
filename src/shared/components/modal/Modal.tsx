import { Modal as ModalMui, Box, Button, Typography, SxProps } from '@mui/material'
import { APP_COLORS } from '@/config/colors'

interface Props {
  children?: React.ReactNode
  width?: string
  maxHeight?: string
  open?: boolean
  onClose?: () => void
  title?: string
  userSelection?: boolean
  close?: (value: boolean) => void
  contentContainerStyle?: React.CSSProperties
  preventClose?: boolean
  preventCloseAction?: boolean
  preventCloseBackdropMobile?: boolean
  handlePrimary?: () => void
  handleSecondary?: () => void
  sx?: SxProps
  closeButton?: string
  acceptButton?: string
  submit?: boolean
}

export function Modal(props: Props) {
  const {
    children,
    width = '780px',
    open = false,
    close,
    onClose,
    handlePrimary,
    handleSecondary,
    closeButton = 'Cancelar',
    acceptButton = 'Aceptar',
    preventClose = false,
    preventCloseBackdropMobile = false,
    preventCloseAction = false,
    sx = {},
    title,
    submit = false
  } = props

  const style: SxProps = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: APP_COLORS.BG_DARK_COLOR,
    boxShadow: 24,
    maxHeight: '80%',
    borderRadius: '16px',
    maxWidth: width,
    display: 'flex',
    flexDirection: 'column',
  }

  const handleClose = () => {
    if (close && !preventClose) {
      close(false)
      onClose?.()
    }
  }

  return (
    <ModalMui
      sx={{ margin: '24px' }}
      open={open}
      disableAutoFocus
      onClose={(_event, reason) => {
        const matches = window.matchMedia('(max-width: 768px)').matches
        if (reason === 'backdropClick' && preventCloseBackdropMobile && matches) return
        if (reason === 'backdropClick') handleClose()
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') handleClose()
      }}
    >
      <Box sx={{ ...style, ...sx }}>
        <Box
          sx={{
            padding: '16px 24px',
            borderBottom: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            height: '100%',
            marginTop: '16px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              textAlign: 'center',
              fontSize: '18px',
              lineHeight: '26px',
              mb: '8px',
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Content */}
        <Box
          sx={{
            padding: '24px',
            paddingTop: 0,
            height: 'fit-content',
            maxHeight: 'calc(100% - 158px)',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          {children}
        </Box>

        {/* Actions */}
        {(handlePrimary || handleSecondary) && (
          <Box
            sx={{
              width: '100%',
              height: '98px',
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px',
              flexShrink: 0,
            }}
          >
            {handleSecondary && (
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                onClick={() => {
                  if (!preventCloseAction) close?.(false)
                  handleSecondary()
                }}
              >
                {closeButton}
              </Button>
            )}

            {handlePrimary && (
              <Button
                type={submit ? 'submit' : 'button'}
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  if (!preventCloseAction) close?.(false)
                  handlePrimary()
                }}
              >
                {acceptButton}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </ModalMui>
  )
}
