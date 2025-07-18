'use client'

import styles from '@/shared/styles/layouts/main/mainLayout.module.css'
import { ItemMenu } from '@/shared/interfaces/TopBar'
import { Breadcrumb } from './Breadcrumb'
import { Box } from '@mui/material'

interface Props {
  item: ItemMenu | null
}

export function Header({ item }: Props) {

  return (
    <Box className={styles.header} >
      <Breadcrumb item={item} />
    </Box>
  )
}
