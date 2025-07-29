'use client'

import styles from '@/shared/styles/layouts/main/mainLayout.module.css'
import { ButtonLink } from '@/shared/components/elements/ButtonLink'
import { EaseInOut } from '@/shared/components/animation/EaseInOut'
import { getItemBarMenuItem } from '@/shared/helpers/menu'
import { PageHeader } from './components/Breadcrumb'
import { TOP_BAR_ITEMS } from '@/shared/data/menu'
import { Lock01 } from '@untitled-ui/icons-react'
import { Box, Typography } from '@mui/material'
import { Sidebar } from './components/Sidebar'
import { usePathname } from 'next/navigation'
import { Header } from './components/Header'
import { useEffect, useState } from 'react'
import Script from 'next/script'

interface Props {
  children: React.ReactNode
  permissions?: string[]
  evaluatedPermissions?: boolean
}

export default function MainLayout({ children, evaluatedPermissions = false, permissions = [] }: Props) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const item = getItemBarMenuItem(pathname, TOP_BAR_ITEMS)
  const showUnauthorized = evaluatedPermissions && item?.permission && !permissions.includes(item.permission)

  const isProblemPage = /^\/wars\/[^/]+$/.test(pathname)

  return (
    <Box className={styles.main}>
      <Sidebar permissions={permissions} hiddenSession={false} />
      <Box
        className={styles.headerMain}
        sx={{
          boxShadow: scrollPosition > 0 ? "0px 2px 4px rgba(0, 0, 0, 0.1)" : "none",
          transition: "box-shadow 0.3s ease-in-out",
        }}
      >
        <Header item={item} />
      </Box>
      <EaseInOut>
        <Box className={styles.contentMain}>
          <Box
            className={styles.content}
            sx={{
              ...(isProblemPage && {
                p: 0,
                maxWidth: '100%',
              }),
            }}
          >
            {showUnauthorized ? (
              <>
                <Script src="/permission.js" />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: "80vh",
                    gap: "12px"
                  }}
                >
                  <Lock01 width={100} height={100} />
                  <Typography textAlign="center">
                    No tienes permisos para esta sección
                  </Typography>
                  <ButtonLink href='/' text='Volver al inicio' />
                </Box>
              </>
            ) : (
              <>
                {!isProblemPage && <PageHeader />}
                {!isProblemPage && <Box height={"40px"} />}
                {children}
              </>
            )}
          </Box>
        </Box>
      </EaseInOut>
    </Box>
  )
}
