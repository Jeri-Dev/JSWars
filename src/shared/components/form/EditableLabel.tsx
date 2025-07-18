// components/EditableLabel.tsx
import React, { useState } from 'react'
import { Input } from '@/shared/components/form/Input'

import { Typography, Box } from '@mui/material'

interface EditableLabelProps {
  defaultValue: string
  onChange?: (newValue: string) => void
}

const EditableLabel: React.FC<EditableLabelProps> = ({
  defaultValue = "Nombre por defecto",
  onChange
}) => {
  const [value, setValue] = useState(defaultValue)
  const [isEditing, setIsEditing] = useState(false)

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleStartEditing = () => {
    setIsEditing(true)
  }

  const handleStopEditing = () => {
    setIsEditing(false)
    if (onChange) {
      onChange(value)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleStopEditing()
    }
  }

  return (
    <>
      {isEditing ? (
        <Input
          name='positionName'
          fullWidth
          value={value}
          onChange={handleValueChange}
          onBlur={handleStopEditing}
          onKeyDown={handleKeyDown}
          autoFocus
          size="small"
          variant="outlined"

        />

      ) : (
        <Box onClick={handleStartEditing} sx={{ cursor: 'pointer' }}>
          <Typography fontWeight={600} fontSize={16} color='var(--label)'>
            {value}
          </Typography>
        </Box>
      )}
    </>
  )
}

export default EditableLabel