"use client"
import Link from 'next/link'
import { Popover, IconButton, Divider, Button, Typography, SxProps } from '@mui/material'
import { DotsVertical } from '@untitled-ui/icons-react'
import { useState } from 'react'
import { IconApp } from '@/types/Icon'
import { APP_COLORS } from '@/config/colors'

interface IOptionLink {
  type: 'link'
  label: string
  href: string
  disabled?: boolean
  icon?: IconApp
  removeMargin?: boolean
}

interface IOptionButton {
  type: 'button'
  label: string
  disabled?: boolean
  icon?: IconApp
  removeMargin?: boolean
  onClick: () => void
}

interface IOptionDivider {
  type: 'divider'
}

interface Props {
  iconColor?: string
  options?: (Omit<IOptionLink, 'removeMargin'> | Omit<IOptionButton, 'removeMargin'> | IOptionDivider)[]
  disabled?: boolean
  icon?: IconApp
  sx?: SxProps
}

export function OptionsMenu(props: Props) {
  const {
    options = [],
    disabled = false,
    icon: Icon = DotsVertical,
    iconColor = '#FFFFFF',
    sx
  } = props

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton

        disabled={disabled}
        onClick={handleClick}
        sx={{
          height: "40px",
          maxWidth: "fit-content",
          ...sx
        }}
      >
        <Icon
          color={iconColor}
        />
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock
        sx={{
          "& .MuiPaper-root": {
            background: "#000",
            boxShadow: "2px 10px 14px 0px #00000005",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "12px 16px",
            gap: "8px",
            borderRadius: "8px",
            border: "1px solid #3d3d3dc0",
            userSelect: "none",
            marginTop: "40px",
          }
        }}
      >
        {options.map((option, index) => {
          if (option.type === 'link') {
            return (
              <OptionLink
                key={index}
                handler={handleClose}
                {...option}
              />
            )
          }

          if (option.type === 'button') {
            return (
              <OptionButton
                key={index}
                {...option}
                onClick={() => {
                  handleClose()
                  option.onClick()
                }}
              />
            )
          }

          if (option.type === 'divider') {
            return (
              <Divider
                key={index}
                sx={{
                  marginBottom: options.length - 1 === index ? "0px" : "8px",
                }}
              />
            )
          }
        })}
      </Popover>
    </>
  )
}


function OptionLink(props: IOptionLink & { handler: () => void }) {
  const {
    label,
    href,
    disabled = false,
    icon: Icon = () => null,
    handler
  } = props

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handler()
    if (disabled) {
      e.preventDefault()
    }
  }


  return (
    <Link
      className='hoverOpacityEffect boxHoverElement'
      href={href}
      onClick={handleClick}
      prefetch
      style={{
        textDecoration: "none",
        width: "100%",
        minWidth: "fit-content",
        color: "#FFF",
        padding: "12px 16px",
        fontSize: "16px",
        display: "flex",
        gap: "16px",
        borderRadius: "6px",
        height: "44px",
        marginLeft: "-3px",
      }}
    >
      <Icon
        color={`#FFFFFF${disabled ? '70' : ''}`}
        width={20}
        height={20}
      />
      <Typography
        fontSize={16}
        sx={{
          opacity: disabled ? 0.5 : 1,
          color: "#FFF",
        }}
      >
        {label}
      </Typography>
    </Link>
  )
}

function OptionButton(props: IOptionButton) {
  const {
    label,
    disabled = false,
    onClick,
    icon: Icon = () => null,
  } = props

  return (
    <Button
      className='hoverOpacityEffect boxHoverElement'
      disabled={disabled}
      startIcon={<Icon color={APP_COLORS.NEUTRAL_BLACK_2} width={20} height={20} />}
      onClick={onClick}
      sx={{
        padding: "12px 16px",
        gap: "8px",
        color: "var(--neutral-gray-8, #2D3748)",
        textAlign: "left",
        justifyContent: "flex-start",
        width: "100%",
        height: "44px",
        borderRadius: "6px",
      }}
    >

      <Typography
        fontSize={16}
        sx={{
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {label}
      </Typography>
    </Button>
  )
}


