"use client"
import { TextField, Autocomplete as MuiAutocomplete, Typography } from "@mui/material"
import { ChevronDown as IconChevronDown } from "@untitled-ui/icons-react"
import styles from "@/shared/styles/components/form/Select.module.css"
import { useRef, useState } from 'react'

export interface IOptionAutoComplete {
  value: string | number
  label: string | React.ReactNode
}

interface Props {
  placeholder?: string
  value?: string | number
  name?: string
  optional?: boolean
  data?: IOptionAutoComplete[]
  customError?: string | null
  onChange?: (value: IOptionAutoComplete | null) => void
  label?: string
  defaultValue?: IOptionAutoComplete
  size?: "small" | "medium" | "large"
  valueMaxWidth?: string
  disabled?: boolean
  onSearch?: (searchTerm: string) => void
}

export function Autocomplete(props: Props) {
  const {
    placeholder = "Buscar...",
    data = [],
    optional = false,
    customError = null,
    name,
    value: fieldValue = null,
    onChange,
    onSearch,
    label,
    defaultValue,
    disabled = false,
  } = props


  const [error, setError] = useState<string | null>(customError)
  const [value, setValue] = useState<IOptionAutoComplete | null>(
    fieldValue ? data.find(option => option.value === fieldValue) || null : defaultValue || null
  )
  const refTimeout = useRef<NodeJS.Timeout | null>(null)

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
      {label && (
        <Typography gutterBottom sx={{
          fontSize: "14px",
          marginBottom: "8px",
        }}>
          {label}
        </Typography>
      )}

      <MuiAutocomplete
        options={data}
        value={value}
        disabled={disabled}
        clearIcon={null}
        popupIcon={<IconChevronDown />}
        getOptionLabel={(option) => typeof option.label === 'string' ? option.label : String(option.value)}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        noOptionsText={
          <Typography
            sx={{
              color: 'white',
              fontSize: '16px',
            }}
          >
            No hay opciones disponibles
          </Typography>
        }
        onChange={(event, newValue) => {
          if (error && newValue) {
            setError(null)
          }
          setValue(newValue)
          onChange?.(newValue)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            required={!optional}
            placeholder={placeholder}
            onInvalid={handleOnInvalid}
            onInput={(e) => {
              const input = e.target as HTMLInputElement
              const value = input.value
              if (value.trim() === "") {
                onSearch?.(input.value)
                return
              }
              if (refTimeout.current) {
                clearTimeout(refTimeout.current)
              }
              refTimeout.current = setTimeout(() => {
                onSearch?.(input.value)
              }, 800)
            }}
            error={Boolean(error)}
            sx={{
              '& .MuiInputBase-root': {
                px: '10px',
              },
              '& .MuiInputBase-input': {
                px: 0,
                color: 'white',
                fontSize: '16px',
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'white',
                opacity: 1,
                fontSize: '16px',
              },
              '& .MuiAutocomplete-popupIndicator': {
                pr: 1,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none !important',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none !important',
                },
                '&:hover fieldset': {
                  border: 'none !important',
                },
                '&.Mui-focused fieldset': {
                  border: 'none !important',
                },
              },
            }}
          />
        )}
      />

      <input
        type="hidden"
        name={name}
        value={value ? value.value : ''}
      />
    </div>
  )
}