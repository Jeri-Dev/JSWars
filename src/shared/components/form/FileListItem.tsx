"use client"
import { ListItem, ListItemIcon, ListItemText, IconButton, Box } from '@mui/material'
import { useDownloadResource } from '@/hooks/useDownloadResource'
import { formatFileSize } from '@/shared/utils/formatters'
import { Download03 } from "@untitled-ui/icons-react"
import { useAlert } from '@/contexts/Alert'

export interface FileItemData {
  name: string
  size: number
  type?: string
  url?: string
}

interface FileListItemProps {
  file: FileItemData
  index: string
  totalItems: number
  onRemove?: (index: number) => void
  downloadable?: boolean
  onDownload?: (file: FileItemData) => void
  iconSrc?: string
}

export function FileListItem({
  file,
  index,
  totalItems,
  onRemove,
  downloadable = false,
  iconSrc = "/File.svg"
}: FileListItemProps) {

  const { downloadFile } = useDownloadResource()
  const alert = useAlert()

  return (
    <Box sx={{
      border: "1px solid #eee",
      borderRadius: "8px",
    }}>
      <ListItem
        secondaryAction={
          downloadable ? (
            <IconButton
              edge="end"
              aria-label="download"
              onClick={async () => {
                try {
                  const response = await downloadFile(file.url || '', file.name)

                  if (!response) {
                    throw new Error('Error al descargar el archivo')
                  }

                  alert.openAlert({
                    title: "Descarga exitosa",
                    message: `El archivo ${file.name} se ha descargado correctamente`,
                    type: "success",
                  })

                } catch {
                  alert.openAlert({
                    title: "Error al descargar",
                    message: `No se pudo descargar el archivo ${file.name}`,
                    type: "error",
                  })
                }
              }}>
              <Download03 />
            </IconButton>
          ) : onRemove ? (
            <IconButton edge="end" aria-label="delete" onClick={() => onRemove(parseInt(index))}>
              &times;
            </IconButton>
          ) : null
        }
        sx={{
          borderBottom: parseInt(index) < totalItems - 1 ? '1px solid #eee' : 'none',
          padding: "8px 16px"
        }}
      >
        <ListItemIcon>
          <img src={iconSrc} alt='Icono de archivo' width="auto" height="26px" />
        </ListItemIcon>
        <ListItemText
          primary={file.name}
          secondary={formatFileSize(file.size)}
          primaryTypographyProps={{ fontSize: "14px" }}
          secondaryTypographyProps={{ fontSize: "12px" }}
        />
      </ListItem>
    </Box>
  )
}