'use client'

import styles from '@/shared/styles/layouts/main/mainLayout.module.css'
import { ItemMenu } from '@/shared/interfaces/TopBar'
import { Breadcrumb } from './Breadcrumb'
import { Box, IconButton, Typography } from '@mui/material'
import { LogOut01 } from '@untitled-ui/icons-react'
import { toast } from 'sonner'
import { useLoader } from '@/contexts/Loader'
import { useAlert } from '@/contexts/Alert'
import { useDelay } from '@/hooks/useDelay'
import { FORM_ACTION_TIMEOUT } from '@/config/constants'

interface Props {
  item: ItemMenu | null
}

export function Header({ item }: Props) {

  const { setLoading } = useLoader()
  const { openAlert } = useAlert()

  return (
    <Box className={styles.header} >
      <Breadcrumb item={item} />

      <div className='flex justify-end w-full items-center gap-4'>
        <img src="/Avatar.png" alt="logo" className='w-8 h-8 rounded-full' />
        <Typography fontSize={"16px"}>JeriDev</Typography>
        <IconButton onClick={() => {
          openAlert({
            message: "¿Está seguro que desea cerrar sesión?",
            title: "Cerrar Sesión",
            type: "warning",
            allowCancel: true,
            onAccept: async () => {

              setLoading(true)
              await useDelay(FORM_ACTION_TIMEOUT)

              try {

                const response = await fetch('/api/logout', {
                  method: 'POST',
                })

                if (!response.ok) {
                  toast.error('Error al cerrar sesión')
                  return
                }

                globalThis?.location?.reload()
              } catch {
                toast.error('Error al cerrar sesión')
                return
              } finally {
                setLoading(false)
              }
            },
          })
        }}>
          <LogOut01 />
        </IconButton>
      </div>



    </Box>
  )
}
