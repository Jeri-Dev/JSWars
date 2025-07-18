"use client"
import { DatePicker, LocalizationProvider, DatePickerProps } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { handleInvalidField } from '@/shared/helpers/fields'
import { Calendar } from '@untitled-ui/icons-react'
import { Box, Typography } from '@mui/material'
import { APP_COLORS } from '@/config/colors'
import { useState } from 'react'
import { Dayjs } from 'dayjs'

interface Props extends DatePickerProps {
  label?: string
  height?: number
  helperText?: string
  required?: boolean
}

export function DateField(props: Props) {
  const {
    label,
    height = 44,
    helperText,
    required = true,
    ...rest
  } = props

  const [error, setError] = useState<string | null>(null)

  const handleChange = (value: Dayjs | null) => {
    if (error) {
      setError(null)
    }

    if (rest.onChange) {
      rest.onChange(value, { validationError: null })
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {label && (
          <Typography sx={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: "24px",
            color: "#FFF",
            marginBottom: "8px",
          }}>
            {label}
          </Typography>
        )}
        <DatePicker
          slots={{
            openPickerIcon: ({ ownerState: _Owner, ...rest }) => <Calendar {...rest} color={APP_COLORS.NEUTRAL_BLACK_2} width={20} height={20} />,
          }}
          slotProps={{
            desktopPaper: {
              sx: {
                "& .MuiDateCalendar-root": {
                  backgroundColor: '#000 !important',
                  border: `1px solid ${APP_COLORS.BORDER_COLOR}`,
                },
              }
            },
            textField: {
              required,
              error: Boolean(error),
              helperText: error ?? helperText,
              onInvalid: (e) => handleInvalidField(e, setError),
              sx: {
                fontSize: "16px",
                "& .MuiPickersInputBase-root": {
                  color: "#FFFFFF"
                },
                '& .MuiInputBase-root': {
                  height: `${height}px`,
                  borderRadius: '16px',
                },
                '& .MuiOutlinedInput-root': {
                  height: `${height}px`,
                  borderRadius: '16px',
                },
                '& .MuiPickersOutlinedInput-notchedOutline': {
                  borderColor: "#3d3d3dc0 !important",
                  borderRadius: '6px !important',
                },
                '& .MuiPickersSectionList-root': {
                  fontSize: "14px",

                }
              },
            },
          }}
          onChange={handleChange}
          {...rest}
        />
      </LocalizationProvider>
    </Box>
  )
}