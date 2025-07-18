"use client"

import { SCIENTIFIC_NOTATION_ELEMENTS, REGEX_CONTAINS_SCIENCE_NOTATION, } from '@/config/constants'
import { handleInvalidField } from '@/shared/helpers/fields'
import { EyeOff, Eye } from "@untitled-ui/icons-react"
import { useMask, format } from '@react-input/mask'
import { forwardRef, useState } from "react"
import { APP_COLORS } from '@/config/colors'
import { IconApp } from '@/types/Icon'
import {
  Box,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  TextFieldProps,
} from "@mui/material"

interface PropsMask {
  template: string
  replace: Record<string, RegExp>
}

type Props = TextFieldProps & {
  startIcon?: IconApp
  endIcon?: IconApp
  iconSize?: number
  height?: string | number
  mask?: Partial<PropsMask>
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    label,
    type,
    required = true,
    startIcon: StartIcon = () => null,
    endIcon: EndIcon = () => null,
    onInput: externalOnInput,
    onChange: externalOnChange,
    onKeyDown: externalOnKeyDown,
    iconSize = 24,
    fullWidth = true,
    helperText,
    height = '48px',
    multiline,
    defaultValue,
    mask,
    ...textFieldProps
  } = props

  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const inputRef = mask ? useMask({ mask: mask.template, replacement: mask.replace }) : ref

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    externalOnChange?.(e)
  }

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    externalOnInput?.(e)

    if (error) {
      setError(null)
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const { type } = e.target as HTMLInputElement

    if (type === 'number' && REGEX_CONTAINS_SCIENCE_NOTATION.test(e.clipboardData.getData('text'))) {
      e.preventDefault()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    externalOnKeyDown?.(e)

    const { type } = e.target as HTMLInputElement

    if (type === 'number' && SCIENTIFIC_NOTATION_ELEMENTS.includes(e.key)) {
      e.preventDefault()
    }
  }

  const inputHeight = multiline ? 128 : (height || undefined)

  return (
    <Box
      sx={{
        maxWidth: fullWidth ? "100%" : "500px",
        width: "100%",
      }}
    >
      {label && (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            color: '#ffffff',
            marginBottom: "8px",
          }}
        >
          {label}
        </Typography>
      )}
      <TextField
        inputRef={inputRef}
        required={required}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        multiline={multiline}
        InputProps={{
          startAdornment: StartIcon ? (
            <InputAdornment position="start">
              <StartIcon color={APP_COLORS.NEUTRAL_BLACK_2} width={iconSize} height={iconSize} />
            </InputAdornment>
          ) : null,
          endAdornment: type === "password" ? (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <EyeOff color={APP_COLORS.NEUTRAL_BLACK_2} width={iconSize} height={iconSize} /> : <Eye color={APP_COLORS.NEUTRAL_BLACK_2} width={iconSize} height={iconSize} />}
              </IconButton>
            </InputAdornment>
          ) : EndIcon ? (
            <InputAdornment position="end">
              <EndIcon color={APP_COLORS.NEUTRAL_BLACK_2} width={iconSize} height={iconSize} />
            </InputAdornment>
          ) : null,
          style: inputHeight ? { height: inputHeight } : undefined,
        }}
        inputProps={{
          min: type === 'number' ? 0 : undefined,
          style: multiline ? { height: 128 - 32 } : undefined, // Ajuste para el padding interno
        }}
        sx={{
          width: "100%",
          maxWidth: "100%",
          '& .MuiOutlinedInput-root': {
            borderRadius: '6px',
            height: inputHeight,
          },
          '& .MuiInputBase-inputMultiline': {
            height: '100% !important',
          }
        }}
        {...textFieldProps}
        onInvalid={(e) => handleInvalidField(e, setError)}
        onInput={handleInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        error={Boolean(error)}
        helperText={error ?? helperText}
        onPaste={handlePaste}
        defaultValue={(mask && defaultValue) ? format(defaultValue as string, {
          mask: mask.template!,
          replacement: mask.replace!,
        }) : defaultValue}
      />
    </Box>
  )
})

Input.displayName = "Input"