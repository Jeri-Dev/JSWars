"use client"
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton, CircularProgress } from '@mui/material'
import styles from "@/shared/styles/components/form/UploadImage.module.css"
import { UploadCloud01 } from "@untitled-ui/icons-react"
import { APP_COLORS } from '@/config/colors'
import { useState, useEffect } from "react"

interface FileItem {
  name: string
  size: number | string
  type: string
  file: File
}

interface UploaderConfig {
  maxSizeMB: number
  limitFiles: number
  mimeTypes: string[]
}

interface UploadImageProps {
  label?: string
  setFiles?: (files: File[]) => void
  actualFiles?: any[]
  name?: string
  required?: boolean
  config: UploaderConfig
  onRemove?: (fileName: string) => void // Nuevo prop para manejar eliminación en el componente padre
}

export function UploaderBox(props: UploadImageProps) {
  const {
    label,
    setFiles,
    actualFiles = [],
    name,
    required,
    config,
    onRemove
  } = props

  const [uploadedFiles, setUploadedFiles] = useState<FileItem[]>([])
  const [errors, setErrors] = useState<{
    type?: boolean,
    size?: boolean,
    limit?: boolean,
    duplicate?: boolean
  }>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (actualFiles && actualFiles.length > 0) {
      const fileItems = actualFiles.map(file => {
        const fileObj = file instanceof File ? file : new File([], file.name, {
          type: file.type,
          lastModified: new Date().getTime()
        })
        return {
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type,
          file: fileObj
        }
      })
      setUploadedFiles(fileItems)
    } else {
      // Limpiar los archivos si actualFiles está vacío
      setUploadedFiles([])
    }
  }, [actualFiles])

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const validateFile = (file: File) => {
    const newErrors = { ...errors }
    let isValid = true

    const isValidType = config.mimeTypes.includes(file.type)
    if (!isValidType) {
      newErrors.type = true
      isValid = false
    } else {
      newErrors.type = false
    }

    const maxSizeBytes = config.maxSizeMB * 1024 * 1024
    if (file.size > maxSizeBytes) {
      newErrors.size = true
      isValid = false
    } else {
      newErrors.size = false
    }

    const isDuplicate = uploadedFiles.some(
      existingFile =>
        existingFile.name === file.name &&
        existingFile.file.size === file.size
    )
    if (isDuplicate) {
      newErrors.duplicate = true
      isValid = false
    } else {
      newErrors.duplicate = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleFilesChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (!fileList || fileList.length === 0) return

    setIsLoading(true)
    const newErrors = { ...errors }

    const currentFilesCount = uploadedFiles.length
    if (currentFilesCount + fileList.length > config.limitFiles) {
      newErrors.limit = true
      setErrors(newErrors)
      setIsLoading(false)
      return
    } else {
      newErrors.limit = false
    }

    const newFiles: FileItem[] = []
    const validFiles: File[] = []
    let hasDuplicates = false

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      const isDuplicate = uploadedFiles.some(
        existingFile =>
          existingFile.name === file.name &&
          existingFile.file.size === file.size
      )

      if (isDuplicate) {
        hasDuplicates = true
        continue
      }

      if (validateFile(file)) {
        newFiles.push({
          name: file.name,
          size: formatFileSize(file.size),
          type: file.type,
          file: file
        })
        validFiles.push(file)
      }
    }

    if (hasDuplicates) {
      newErrors.duplicate = true
    } else {
      newErrors.duplicate = false
    }

    setErrors(newErrors)

    if (newFiles.length > 0) {
      const updatedFiles = [...uploadedFiles, ...newFiles]
      setUploadedFiles(updatedFiles)
      if (setFiles) {
        const fileArray = validFiles // Solo enviar los archivos nuevos y válidos
        setFiles(fileArray)
      }
    }

    setIsLoading(false)
    if (event.target.value) {
      event.target.value = ''
    }
  }

  const handleRemoveFile = (index: number) => {
    const fileToRemove = uploadedFiles[index]
    const newFiles = [...uploadedFiles]
    newFiles.splice(index, 1)
    setUploadedFiles(newFiles)

    // Llamar a la función onRemove del padre si existe
    if (onRemove && fileToRemove) {
      onRemove(fileToRemove.name)
    }

    // Ya no necesitamos enviar todos los archivos, el padre maneja la lista completa ahora
    if (setFiles) {
      // Para mantener compatibilidad con implementación anterior, enviamos array vacío
      // para indicar que debe recalcular estado en base a eliminación
      setFiles([])
    }

    if (newFiles.length === 0) {
      setErrors({})
    }
  }

  const getAcceptedFileTypes = () => {
    const typeGroups: { [key: string]: string[] } = {}
    config.mimeTypes.forEach(mime => {
      const [type] = mime.split('/')
      if (!typeGroups[type]) {
        typeGroups[type] = []
      }
      const extension = mime.split('/')[1]
      typeGroups[type].push(extension)
    })
    return Object.entries(typeGroups).map(([type, extensions]) => {
      return `${type.toUpperCase()}: ${extensions.join(', ')}`
    }).join(' • ')
  }

  const getAcceptAttribute = () => {
    return config.mimeTypes.join(', ')
  }

  return (
    <Box className={styles.container} sx={{ width: '100%' }}>
      <Typography variant="subtitle1" component="label" className={styles.label}>
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </Typography>
      <Box
        sx={{
          border: Object.values(errors).some(e => e) ? "1px dashed red" : "1px dashed #ccc",
          borderRadius: "8px",
          padding: "24px",
          textAlign: "center",
          cursor: "pointer",
          width: "100%",
          minHeight: "240px",
          marginBottom: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9f9f9",
          position: "relative"
        }}
        className={styles.dropzone}
      >
        <input
          onInvalid={(e) => {
            e.preventDefault()
            setErrors(prev => ({ ...prev, type: true }))
          }}
          name={name}
          required={required && uploadedFiles.length === 0}
          type="file"
          accept={getAcceptAttribute()}
          className={styles.hiddenInput}
          onChange={handleFilesChange}
          multiple
        />
        {isLoading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={40} sx={{ color: APP_COLORS.GREEN_500 }} />
            <Typography variant="body2">Procesando archivos...</Typography>
          </Box>
        ) : (
          <Box className={styles.textContainer} sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}>
            <Box sx={{ pb: 2 }}>
              <UploadCloud01 width="auto" height="40px" color={APP_COLORS.NEUTRAL_BLACK_2} />
            </Box>
            <Typography sx={{
              fontSize: "16px",
              fontWeight: "500",
              color: APP_COLORS.LABEL,
            }}>
              Adjuntar archivos ({uploadedFiles.length}/{config.limitFiles})
            </Typography>
            <Typography variant="body2" sx={{ color: "#666", mt: 1 }}>
              Coloca archivos aquí o <span style={{ color: APP_COLORS.GREEN_500, fontWeight: '500', textDecoration: 'underline' }}>selecciónalos</span> desde tu dispositivo.
            </Typography>
            <Typography variant="caption" sx={{ color: "#888", mt: 2 }}>
              {getAcceptedFileTypes()}
            </Typography>
            <Typography variant="caption" sx={{ color: "#888", mt: 0.5 }}>
              Tamaño máximo: {config.maxSizeMB}MB por archivo
            </Typography>
          </Box>
        )}
      </Box>
      {uploadedFiles.length > 0 && (
        <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: '8px', border: '1px solid #eee', mb: 1 }}>
          {uploadedFiles.map((file, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFile(index)}>
                  &times;
                </IconButton>
              }
              sx={{
                borderBottom: index < uploadedFiles.length - 1 ? '1px solid #eee' : 'none',
                padding: "8px 16px"
              }}
            >
              <ListItemIcon>
                <img src="/File.svg" alt="Icono de archivo" width="auto" height="26px" />
              </ListItemIcon>
              <ListItemText
                primary={file.name}
                secondary={`${file.type} • ${file.size}`}
                primaryTypographyProps={{ fontSize: "14px" }}
                secondaryTypographyProps={{ fontSize: "12px" }}
              />
            </ListItem>
          ))}
        </List>
      )}
      {errors.type && (
        <Typography variant="caption" sx={{ color: "red", mt: 1, display: 'block' }}>
          Solo se permiten los formatos especificados.
        </Typography>
      )}
      {errors.size && (
        <Typography variant="caption" sx={{ color: "red", mt: 1, display: 'block' }}>
          El tamaño máximo permitido es de {config.maxSizeMB}MB por archivo.
        </Typography>
      )}
      {errors.limit && (
        <Typography variant="caption" sx={{ color: "red", mt: 1, display: 'block' }}>
          Solo puedes subir un máximo de {config.limitFiles} archivos.
        </Typography>
      )}
      {errors.duplicate && (
        <Typography variant="caption" sx={{ color: "red", mt: 1, display: 'block' }}>
          Se han omitido archivos duplicados (mismo nombre y tamaño).
        </Typography>
      )}
    </Box>
  )
}