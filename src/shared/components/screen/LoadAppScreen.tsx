"use client"
import styles from '@/shared/styles/components/screen/LoadAppScreen.module.css'
import { useLoader } from '@/contexts/Loader'
import { Modal, Box } from '@mui/material'


export function LoadAppScreen() {
  const {
    loading
  } = useLoader()


  return (
    <Modal
      className={styles.root}
      open={loading}
    >
      <Box
        className={styles.box}
      >
        <svg viewBox="25 25 50 50" className={styles.svg}>
          <circle r="20" cy="50" cx="50" className={styles.circle}></circle>
        </svg>
      </Box>
    </Modal>
  )
}
