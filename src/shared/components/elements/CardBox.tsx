import { APP_COLORS } from '@/config/colors'
import { Box, Typography, Button, SxProps } from '@mui/material'
import { MouseEventHandler, ReactNode } from 'react'

interface ActionProps {
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
  variant?: 'contained' | 'outlined' | 'text'
  color?: 'primary' | 'secondary' | 'error' | 'inherit'
}

interface Props {
  children?: ReactNode
  title?: string
  gap?: string
  sx?: SxProps
  onAction?: MouseEventHandler<HTMLButtonElement>
  action?: ActionProps
}

export function CardBox(props: Props) {
  const hasButton = props.action || props.onAction

  return (
    <Box
      sx={{
        borderRadius: '12px',
        width: '100%',
        padding: '24px',
        border: `1px solid ${APP_COLORS.BORDER_COLOR}`,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#00000080',
        gap: props.gap ?? '24px',
        height: 'fit-content',
        ...props.sx,
      }}
    >
      {(props.title || hasButton) && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {props.title && (
            <Typography fontSize={18} fontWeight={600}>
              {props.title}
            </Typography>
          )}
          {hasButton && (
            <Button
              sx={{
                height: '35px',
              }}
              onClick={
                props.action?.onClick ?? props.onAction!
              }
              variant={props.action?.variant ?? 'contained'}
              color={props.action?.color ?? 'primary'}
              size="small"
            >
              {props.action?.label ?? 'Acción'}
            </Button>
          )}
        </Box>
      )}
      {props.children}
    </Box>
  )
}
