"use client"

import { APP_COLORS } from '@/config/colors'
import styles from '@/shared/styles/components/table/Table.module.css'
import {
  Skeleton, TableCell, TableRow, Box, Table as MuiTable,
  TableContainer,
  TableHead,
  TableBody,
} from '@mui/material'
import { JSX } from 'react'
import { ButtonSkeleton } from './ButtonSkeleton'

interface Props {
  columns?: number
  rows?: number
  actions?: () => JSX.Element
}

export function TableSkeleton(props: Props) {
  const {
    columns = 5,
    rows = 5,
    actions: Actions = () => <></>,
  } = props

  return (
    <>
      <Box
        className={styles.root}
        sx={{
          backgroundColor: "#FFF",
          width: "100%",
          borderRadius: "8px",
          boxShadow: "2px 10px 14px 0px #00000005",
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${APP_COLORS.NEUTRAL_GREY}`
        }}
      >
        <header
          className={styles.header}
        >
          <Box
            sx={{
              borderRadius: "6px",
              width: "100%",
              maxWidth: {
                md: "384px",
                xs: "100%"
              },
            }}
          >
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={40}
              animation="wave"
              sx={{
                borderRadius: "6px",
                marginBottom: "8px"
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Actions />
          </Box>
          <ButtonSkeleton
            height={40}
            width={100}
          />
        </header>
        <TableContainer sx={{ width: '100%' }}>
          <MuiTable sx={{ width: '100%', tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow
                sx={{
                  height: "70px",
                  background: "#F4F6F8",
                  borderBottom: "none",
                  width: "100%",
                  display: "table",
                  tableLayout: "fixed",
                }}
              >
                {Array.from({ length: columns }, (_, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      padding: "16px",
                      borderBottom: "none",
                      height: "70px",
                      width: `${100 / columns}%`,
                    }}
                  >
                    <Skeleton
                      variant="rounded"
                      width={"100%"}
                      height={25}
                      animation="wave"
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: rows }, (_, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  sx={{
                    display: "table",
                    tableLayout: "fixed",
                    width: "100%"
                  }}
                >
                  {Array.from({ length: columns }, (_, colIndex) => (
                    <TableCell
                      key={colIndex}
                      sx={{
                        width: `${100 / columns}%`,
                        padding: "16px"
                      }}
                    >
                      <Skeleton
                        variant="rounded"
                        width={"100%"}
                        height={20}
                        animation="wave"
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <Box
          sx={{
            borderTop: `1px solid ${APP_COLORS.NEUTRAL_GREY}`,
            padding: "16px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="rounded"
            width={"200px"}
            height={30}
            animation="wave"
            sx={{
              borderRadius: "6px",
              marginBottom: "8px"
            }}
          />
        </Box>
      </Box>
    </>
  )
}