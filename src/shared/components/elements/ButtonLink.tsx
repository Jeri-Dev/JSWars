import { Box, Typography } from '@mui/material'
import { APP_COLORS } from '@/config/colors'
import { IconApp } from '@/types/Icon'
import Link from 'next/link'

interface Props {
  href: string
  text: string
  style?: React.CSSProperties
  variant?: 'primary' | 'secondary' | 'default'
  icon?: IconApp
  endIcon?: IconApp
}

export function ButtonLink(props: Props) {
  const {
    href,
    text,
    icon: Icon,
    endIcon: EndIcon,
    style
  } = props


  return (
    <Link
      className='hoverOpacityElement'
      href={href}
      style={{
        display: "flex",
        background: 'white',
        gap: "12px",
        alignItems: "center",
        textDecoration: "none",
        justifyContent: "center",
        borderRadius: "8px",
        padding: "14px 24px",
        ...style
      }}
    >
      {Icon && <Icon color="#000" />}
      <Box>
        <Typography
          color={APP_COLORS.LABEL}
          fontSize={16}
        >
          {text}
        </Typography>
      </Box>
      {EndIcon && <EndIcon />}
    </Link>
  )
}