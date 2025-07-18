"use client"
import { Select as SelectMui, Typography, MenuItem, Checkbox, ListItemText, Chip, Box } from "@mui/material"
import { ChevronDown as IconChevronDown } from "@untitled-ui/icons-react"
import styles from "@/shared/styles/components/form/Select.module.css"
import { APP_COLORS } from '@/config/colors'
import { useState, useEffect } from 'react'

export interface IOption {
  value: string
  label: string
}

interface Props {
  placeholder: string
  value?: string[]
  name?: string
  optional?: boolean
  data?: IOption[]
  customError?: string | null
  onChange?: (value: IOption[] | null) => void
  label?: string,
  defaultValue?: IOption[] | string[]
  size?: "small" | "medium" | "large"
}

export function MultiSelect(props: Props) {
  const {
    placeholder,
    data = [],
    optional = false,
    customError = null,
    name,
    value: fieldValue = [],
    onChange,
    label,
    defaultValue = [],
    size = "large",
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

  const initialValues =
    Array.isArray(defaultValue) && defaultValue.length > 0
      ? typeof defaultValue[0] === 'string'
        ? defaultValue as string[]
        : (defaultValue as IOption[]).map(option => option.value)
      : fieldValue

  const [selectedOptions, setSelectedOptions] = useState<string[]>(initialValues)

  useEffect(() => {
    if (defaultValue.length > 0) {
      const isStringArray = typeof defaultValue[0] === 'string'
      const values = isStringArray
        ? defaultValue as string[]
        : (defaultValue as IOption[]).map(option => option.value)

      setSelectedOptions(values)

      if (onChange) {
        onChange(data.filter((option) => values.includes(option.value)))
      }
    } else if (fieldValue.length > 0 && selectedOptions.length === 0) {
      setSelectedOptions(fieldValue)
    }
  }, [])

  const handleOnInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    setError("Debe seleccionar al menos una opción.")
  }

  const handleSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedValues = event.target.value as string[]
    setSelectedOptions(selectedValues)
    setError(null)
    onChange?.(data.filter((option) => selectedValues.includes(option.value)))
  }

  const handleDelete = (valueToDelete: string) => {
    const newSelected = selectedOptions.filter(value => value !== valueToDelete)
    setSelectedOptions(newSelected)
    onChange?.(data.filter((option) => newSelected.includes(option.value)))
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
      <Typography gutterBottom sx={{
        fontSize: "14px",
        color: "#fff",
        marginBottom: "8px",
      }}>
        {label}
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <SelectMui
          multiple
          fullWidth
          displayEmpty
          value={selectedOptions}
          name={name}
          required={!optional}

          onInvalid={handleOnInvalid}
          error={Boolean(error)}
          renderValue={(selected: any) => {
            if (selected.length === 0) {
              return (
                <Typography sx={{
                  fontSize: "16px",
                }}>
                  {placeholder}
                </Typography>
              )
            }

            return (
              <Box sx={{
                display: 'flex',
                flexWrap: 'nowrap', // Cambio clave para una sola fila
                overflowX: 'auto', // Permite scroll horizontal
                gap: '8px',
                paddingRight: '32px',
                whiteSpace: 'nowrap', // Evita saltos de línea
                '::-webkit-scrollbar': {
                  height: '4px',
                },
                '::-webkit-scrollbar-thumb': {
                  backgroundColor: APP_COLORS.NEUTRAL_GREY,
                  borderRadius: '4px',
                },
              }}>
                {selected.map((value: string) => {
                  const option = data.find((option) => option.value === value)
                  return option ? (
                    <Chip
                      key={value}
                      label={option.label}
                      size="small"
                      sx={{
                        gap: "2px",
                        textAlign: "center",
                        borderRadius: "50px",
                        background: '#1d2536',
                        color: '#fff',
                        fontSize: "14px",
                        flexShrink: 0,
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation()
                      }}
                      onDelete={(e) => {
                        e.stopPropagation()
                        handleDelete(value)
                      }}
                    />
                  ) : null
                })}
              </Box>
            )
          }}
          onChange={handleSelect as any}
          IconComponent={(props) => (
            <>
              <Box
                sx={{
                  height: "40px",
                  width: "40px",
                  background: APP_COLORS.BG_DARK_COLOR,
                  marginTop: "-10px",
                  position: "absolute", // Posicionamiento absoluto
                  right: 0,           // Alineado a la derecha
                  top: 0,             // Alineado arriba
                  zIndex: 2,          // Por encima del contenido
                }}
                {...props}
              />

              <IconChevronDown {...props}
                style={{
                  textAlign: "center",
                  position: "absolute",
                  right: 16,
                  top: "calc(50% )",
                  transform: "translateY(-50%)",
                  color: "var(--neutral-black-2)",
                  zIndex: 3,
                }} />
            </>
          )}
          sx={{
            height: getHeightBySize(),
            color: APP_COLORS.GREY_1000,
            fontSize: "16px",
            borderRadius: "6px",
            border: `1px solid ${APP_COLORS.BORDER_COLOR}`,
            "&.Mui-focused": {
              border: `1px solid ${APP_COLORS.NEUTRAL_BLACK_2}`,
            },
            "& .MuiSelect-select": {
              padding: size === "small" ? "4px 16px 4px 0px" : "8px 16px 8px 0px",
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'flex',
              alignItems: 'center',
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: error ? APP_COLORS.ERROR_500 : "rgba(0, 0, 0, 0.23)",
            },
            "&.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: APP_COLORS.ERROR_500,
            },
          }}
          MenuProps={{
            disableScrollLock: true,
            PaperProps: {
              style: {
                marginTop: "4px",
                borderRadius: "12px",
                border: `1px solid ${APP_COLORS.BORDER_COLOR}`,
                boxShadow: "2px 10px 14px 0px #00000005",
              },
            },
          }}
        >
          {
            data.map((option) => (
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
                  padding: size === "small" ? "4px 16px" : "8px 16px",
                  borderRadius: "6px",
                  "&:last-of-type": {
                    marginBottom: 0,
                  },
                }}
              >
                <Checkbox checked={selectedOptions.indexOf(option.value) > -1} />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))
          }
        </SelectMui>
      </Box>
    </div>
  )
}