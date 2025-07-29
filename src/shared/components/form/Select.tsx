"use client"
import { ChevronDown as IconChevronDown } from "@untitled-ui/icons-react"
import { Select as SelectMui, Typography, MenuItem } from "@mui/material"
import styles from "@/shared/styles/components/form/Select.module.css"
import { APP_COLORS } from '@/config/colors'
import { useState } from 'react'
export interface IOption {
  value: string
  label: string | React.ReactNode
}
interface Props {
  placeholder?: string
  value?: string
  name?: string
  optional?: boolean
  data?: IOption[]
  customError?: string | null
  onChange?: (value: IOption | null) => void
  label?: string,
  defaultValue?: IOption,
  size?: "small" | "medium" | "large",
  valueMaxWidth?: string,
}
export function Select(props: Props) {
  const {
    placeholder = "Seleccionar",
    data = [],
    optional = false,
    customError = null,
    name,
    value: fieldValue = null,
    onChange,
    label,
    defaultValue,
    size = "large",
    valueMaxWidth
  } = props

  const getHeightBySize = () => {
    switch (size) {
      case "small":
        return 32
      case "medium":
        return 40
      case "large":
      default:
        return 48
    }
  }

  const [error, setError] = useState<string | null>(customError)
  const [value, setValue] = useState<string | null>(fieldValue)
  const handleOnInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setError("Debe seleccionar una opción.")
  }
  return (
    <div
      className={styles.container}
      title={placeholder}
      data-error={error}
      style={{
        marginBottom: error ? "30px" : 0,
      }}
    >
      {
        label &&
        <Typography gutterBottom sx={{
          fontSize: "14px",
          marginBottom: "8px",
        }}>
          {label}
        </Typography>
      }
      <SelectMui
        fullWidth
        displayEmpty
        defaultValue={defaultValue}
        value={value || ""}
        name={name}
        required={!optional}
        IconComponent={(props) => <IconChevronDown {...props}
          style={{
            textAlign: "center",
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--neutral-black-2)"
          }} />}
        onInvalid={handleOnInvalid}
        error={Boolean(error)}
        renderValue={(value: any) => {
          if (!value) {
            return (
              <Typography sx={{
                color: "#FFF",
                fontSize: size === "small" ? "14px" : "14px",
              }}>
                {placeholder}
              </Typography>
            )
          }
          const option = data.find((option) => option.value === value) || null
          if (!option) {
            return null
          }
          return (
            typeof option.label === 'string' ? (
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "clip",
                  textOverflow: "ellipsis",
                  color: "#FFF",
                  maxWidth: valueMaxWidth,
                  fontSize: size === "small" ? "12px" : "14px",
                }}
              >
                {option.label}
              </Typography>
            ) : option.label
          )
        }}
        onChange={(e) => {
          const value = e.target.value as string
          const option = data.find((option) => option.value === value) || null
          if (error && option) {
            setError(null)
          }
          setValue(value)
          onChange?.(option)
        }}
        sx={{
          fontSize: size === "small" ? "14px" : "16px",
          height: getHeightBySize(),
          borderRadius: "6px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "red !important",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "red",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "red",
          },
          "& .MuiSelect-select": {
            padding: size === "small" ? "4px 16px 4px 0px" : "8px 16px 8px 0px",
          },
        }}

        MenuProps={{
          disableScrollLock: true,
          PaperProps: {
            style: {
              marginTop: "4px",
              borderRadius: "12px",
              padding: "0px 8px",
              border: `1px solid ${APP_COLORS.BORDER_COLOR}`,
              boxShadow: "2px 10px 14px 0px #00000005",
              backgroundColor: "#000",
            },
            sx: {
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#1a1a1a",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "red",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "#cc0000",
                },
              },
              "&::-webkit-scrollbar-thumb:active": {
                backgroundColor: "#990000",
              },
              scrollbarWidth: "thin",
              scrollbarColor: "red #1a1a1a",
            },
          },
        }}
      >
        {data.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              fontSize: size === "small" ? "14px" : "16px",
              color: "#FFF",
              fontWeight: 400,
              ":hover": {
                backgroundColor: "#2b2b2b",
              },
              "&.Mui-focused": {
                backgroundColor: "#2b2b2b",
              },
              "&:focus": {
                backgroundColor: "#2b2b2b",
              },
              "&.Mui-selected": {
                backgroundColor: "#2b2b2b",
              },
              "&.Mui-selected:hover": {
                backgroundColor: "#2b2b2b",
              },
              "&.Mui-selected:focus": {
                backgroundColor: "#2b2b2b",
              },
              borderRadius: "6px",
              "&:last-of-type": {
                marginBottom: 0,
              },
            }}
          >
            {option.label}
          </MenuItem>

        ))}
      </SelectMui>
    </div>
  )
}