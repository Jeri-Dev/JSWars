"use client"

import { useState } from "react"
import { useTranformFileToBase64 } from '@/hooks/useBase64'
import { Box, Typography, Avatar, IconButton } from '@mui/material'
import { Camera01, Delete } from "@untitled-ui/icons-react"

interface AvatarUploaderProps {
  label?: string
  setImage?: (image: string | null) => void
  actualImage?: string | null
  name?: string
  required?: boolean
  size?: number
}

export function AvatarUploader(props: AvatarUploaderProps) {
  const {
    label = "Foto de perfil",
    setImage,
    actualImage = null,
    name,
    required = false,
    size = 120
  } = props

  const [avatar, setAvatar] = useState<string | null>(actualImage)
  const [error, setError] = useState<boolean>(false)

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      if (!file.type.startsWith('image/')) {
        setError(true)
        return
      }

      const result = await useTranformFileToBase64(file)

      setAvatar(result)
      if (setImage) {
        setImage(result)
      }
      setError(false)

      if (event.target.value) {
        event.target.value = ''
      }
    }
  }

  const handleRemoveAvatar = () => {
    setAvatar(null)
    if (setImage) {
      setImage(null)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'fit-content' }}>
      {label && (
        <Typography variant="subtitle1" component="label" sx={{ mb: 1, alignSelf: 'center' }}>
          {label}{required ? '*' : ''}
        </Typography>
      )}

      <Box
        sx={{
          position: 'relative',
          width: size,
          height: size,
          borderRadius: '50%',
          border: error ? "2px solid red" : (avatar ? "none" : "2px dashed #ccc"),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: avatar ? 'transparent' : '#f5f5f5'
        }}
      >
        <input
          onInvalid={(e) => {
            e.preventDefault()
            if (!error) setError(true)
          }}
          name={name}
          required={required}
          type="file"
          accept="image/png, image/jpeg, image/gif"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer',
            zIndex: 2
          }}
          onChange={handleAvatarChange}
        />

        {avatar ? (
          <>
            <Avatar
              src={avatar}
              alt="Avatar"
              sx={{
                width: '100%',
                height: '100%'
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                height: '30%',
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0,
                transition: 'opacity 0.2s',
                '&:hover': {
                  opacity: 1
                },
                zIndex: 1
              }}
            >
              <IconButton
                size="small"
                onClick={handleRemoveAvatar}
                sx={{ color: 'white' }}
              >
                <Delete />
              </IconButton>
            </Box>
          </>
        ) : (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#666'
          }}>
            <Camera01 style={{ fontSize: 24, marginBottom: 4 }} />
            <Typography variant="caption" textAlign="center">
              Subir foto
            </Typography>
          </Box>
        )}
      </Box>

      {error && (
        <Typography variant="caption" sx={{ color: "red", mt: 1 }}>
          Solo se permiten archivos de imagen
        </Typography>
      )}
    </Box>
  )
}