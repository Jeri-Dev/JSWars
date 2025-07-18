'use client'

import { ChevronLeft, Code01, Code02, Home04, Settings01, Trophy01, Users01 } from '@untitled-ui/icons-react'
import styles from '@/shared/styles/layouts/main/mainLayout.module.css'
import { Box, Card, CardHeader, Typography } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { SideBarItem } from './SideBarItem'

export function Sidebar() {
  const pathname = usePathname()
  const parts = pathname.split('/').filter(Boolean)

  const router = useRouter()

  const isActiveAddClass = (href: string) => {

    if (href === "/" && parts.length === 0) {
      return true
    }

    if (href === parts[0]) {
      return true
    }

    return false
  }

  const listItems = [
    { label: 'Dashboard', name: "/", icon: Home04 },
    { label: 'Wars', name: "wars", icon: Code01 },
    { label: 'Contests', name: "contests", icon: Trophy01 },
    { label: 'Community', name: "community", icon: Users01 },
    { label: 'Settings', name: "settings", icon: Settings01 },
  ]

  const handleNavigation = (url: string, event?: React.MouseEvent) => {
    const shouldOpenInNewTab = event && (event.ctrlKey || event.metaKey)

    if (shouldOpenInNewTab) {
      globalThis?.open(`/${url}`, '_blank', 'noopener,noreferrer')
    } else {
      router.push(`/${url}`)
    }
  }

  return (
    <Box className={styles.sidebar} sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Box className={styles.sidebarContent} display={"flex"} alignItems={"center"} flexDirection={"column"} width={"100%"}>
        <Box sx={{
          mt: -4,
        }}>
          <Card
            sx={{
              p: 0,
              m: 0,
              boxShadow: "none",
            }}>
            <CardHeader sx={{
              backgroundColor: "#1A1A1A",
            }}
              title={
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  JS<span style={{ color: '#F7DF1E' }}>Wars</span>
                </Typography>
              }
              subheader={
                <Typography sx={{ fontWeight: 300, fontSize: '13px', lineHeight: '16px', letterSpacing: '0.5px', color: '#9CA3AF' }}>
                  Practice Platform
                </Typography>
              }
              avatar={<Code02 />}
            />
          </Card>
        </Box>

        <Box width={"100%"} display={"flex"} flexDirection={"column"} gap={"40px"} mt={2} px={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: "12px" }}>
            {listItems.map((item, index) => (
              <SideBarItem
                key={index}
                label={item.label}
                icon={item.icon}
                index={index}
                isActive={isActiveAddClass(item.name)}
                action={(event) => handleNavigation(item.name, event)}
              />
            ))}
          </Box>
        </Box>
      </Box>

      <Box width={"100%"} pb={2}>
        <Box bgcolor='#2f3030' width={"100%"} height={"0.5px"} mb={2} />
        <Box
          sx={{
            borderRadius: "6px",
            padding: "4px 8px",
            gap: "12px",
            backgroundColor: "#2a313d79",
            display: "flex",
            mx: 2,
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            '&:hover': {
              backgroundColor: "#2a313db2",
              transform: "scale(1.05)",
            },
            transition: "all 0.1s ease-in-out",
          }}
        >
          <ChevronLeft width={"20px"} />
        </Box>
      </Box>
    </Box>

  )
}
