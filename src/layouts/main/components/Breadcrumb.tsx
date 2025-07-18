"use client"

import Link from 'next/link'
import { Typography, Link as MuiLink, Box, IconButton, Chip } from '@mui/material'
import { ChevronLeft, Play, SlashDivider } from '@untitled-ui/icons-react'
import { ItemMenu, ItemMenuSubItem, } from '@/shared/interfaces/TopBar'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { formatDateCapitalize } from '@/shared/utils/date'
import { getItemBarMenuItem } from '@/shared/helpers/menu'
import { motion, AnimatePresence } from "framer-motion"
import { TOP_BAR_ITEMS } from '@/shared/data/menu'
import { PROBLEMS } from '@/shared/mock/Problem'
import { TYPE_MENU } from '@/shared/enums/Menu'
import { useSession } from '@/contexts/Session'
import { APP_COLORS } from '@/config/colors'
import { useAlert } from '@/contexts/Alert'
import { Fragment } from 'react'

interface Props {
  item: ItemMenu | null
}

export function Breadcrumb({ item }: Props) {

  const { id } = useParams()

  const problem = PROBLEMS.find(p => p.id === Number(id))

  const pathname = usePathname()

  if (pathname === `/wars/${id}`) {
    return (
      <Box sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
      }}>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexGrow: 1,
        }}>
          <Typography sx={{
            color: "white",
            fontWeight: 500,
            fontSize: "17px",
          }}
          >
            {problem?.title}
          </Typography>
          <Chip
            variant='filled'
            color={problem?.difficulty === 'Easy' ? 'success' : problem?.difficulty === 'Medium' ? 'warning' : 'error'}
            label={problem?.difficulty}
          />
        </Box>
        <Box>
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(247, 223, 30, 0.3)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#f7df1e",
              color: "black",
              padding: "10px 24px",
              borderRadius: 8,
              fontWeight: 500,
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              transition: "all 0.3s",
              cursor: "pointer",
              opacity: 1,
            }}
          >
            <AnimatePresence mode="wait">

              <motion.div
                key="play"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Play width={16} />
              </motion.div>
            </AnimatePresence>
            Run Code
          </motion.button>
        </Box>
      </Box>
    )
  }

  const slotIndex = item?.items?.findIndex((item) => item.type === TYPE_MENU.SLOTTED)

  let items: ItemMenuSubItem[] = []

  if (slotIndex !== -1 && item && item.items) {
    const data: ItemMenuSubItem = {
      title: item.title,
      url: item.url
    }

    items = [
      ...item.items?.slice(0, slotIndex),
      data,
      ...item.items?.slice((slotIndex ?? 0) + 1)
    ] as ItemMenuSubItem[]


  } else {
    items = item?.items?.filter((item) => item.type === TYPE_MENU.SUB_ITEM || item.type === undefined) as ItemMenuSubItem[] ?? []
  }

  return (
    <>

      {item && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "var(--space-3)"
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "8px",
            }}
          >
            {items.length === 0 && (
              <Box
                sx={{
                  display: "flex",
                  gap: "4px",
                  alignItems: "center",
                }}
              >
                <MuiLink
                  href="/"
                  component={Link}
                  sx={{
                    textDecoration: "none",
                    fontWeight: 400,
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  Dashboard
                </MuiLink>
                <SlashDivider
                  color={APP_COLORS.NEUTRAL_BLACK_2}
                  width={"16px"}
                  height={"16px"}
                  style={{
                    transform: "rotate(-10deg)",
                  }}
                />
                <MuiLink
                  href={item.url}
                  component={Link}
                  sx={{
                    textDecoration: "none",
                    fontWeight: 500,
                    color: 'white',
                    fontSize: "14px",
                  }}
                >
                  {item.title}
                </MuiLink>
              </Box>
            )}

            {items.length > 0 && (
              <>
                <MuiLink
                  href={"/"}
                  component={Link}
                  sx={{
                    textDecoration: "none",
                    fontWeight: 400,
                    color: APP_COLORS.NEUTRAL_BLACK_2,
                    fontSize: "14px",
                  }}
                >
                  Dashboard
                </MuiLink>
                <SlashDivider
                  color={APP_COLORS.NEUTRAL_BLACK_2}
                  width={"16px"}
                  height={"16px"}
                  style={{
                    transform: "rotate(-10deg)",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: "4px",
                    alignItems: "center",
                    width: "100%"
                  }}
                >
                  {items.map((link, index) => (
                    <Fragment key={link.url}>
                      <MuiLink
                        key={link.url}
                        href={index === items.length - 1 ? "#" : link.url}
                        component={Link}
                        sx={{
                          textDecoration: "none",
                          fontWeight: index === items.length - 1 ? 500 : 400,
                          fontSize: "14px",
                          color: index === items.length - 1 ? "#fff" : "#C3C6CD",
                        }}
                      >
                        {link.title}
                      </MuiLink>

                      {index !== items.length - 1 && (
                        <SlashDivider
                          color={APP_COLORS.NEUTRAL_BLACK_2}
                          width={"16px"}
                          height={"16px"}
                          style={{
                            transform: "rotate(-10deg)",
                          }}
                        />
                      )}
                    </Fragment>
                  ))}
                </Box>
              </>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}

export const PageHeader = () => {
  const pathname = usePathname()
  const { data } = useSession()
  const router = useRouter()
  const alert = useAlert()

  if (pathname === '/') {
    const formattedDate = formatDateCapitalize()

    return (
      <>
        <Typography
          variant="h1"
          component="h1"
          sx={{ marginBottom: "8px", color: "white", fontSize: "24px", fontWeight: 400 }}
        >
          Bienvenido, {data.name}
        </Typography>

        <Typography
          variant='subtitle1'
          color='white'
          fontSize={"16px"}
          fontWeight={"400"}
          sx={{
            marginBottom: "var(--space-3)",
          }}
        >
          {formattedDate}
        </Typography>
      </>
    )
  }

  const item = getItemBarMenuItem(pathname, TOP_BAR_ITEMS)

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        {item?.backUrl && (
          <IconButton
            onClick={() => {
              if (!item?.preventBack) {
                router.push(item.backUrl ?? '')
                return
              }
              alert.openAlert({
                type: 'warning',
                title: item.prenvetText?.title ?? 'Abandonar proceso',
                message: item.prenvetText?.description ?? '¿Está seguro que quiere abandonar el proceso?',
                allowCancel: true,

                onAccept: () => {
                  router.push(item.backUrl ?? '')
                },
              })
            }}
          >
            <ChevronLeft
              color={APP_COLORS.NEUTRAL_BLACK_2}
            />
          </IconButton>
        )}
        <Typography
          variant="h1"
          component="h1"
          sx={{ color: "var(--neutral-black)", fontSize: "24px", fontWeight: 400 }}
        >
          {item?.title}
        </Typography>
      </Box>
      {item?.render}
    </Box>
  )
}