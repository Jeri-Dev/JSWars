"use client"
import styles from '@/shared/styles/components/table/Table.module.css'
import { ClearButton, MenuContent, MenuFooter, MenuHeader, MenuTitle } from '@/shared/components/mui/Filters'
import { SearchSm, ChevronDown, ArrowUp, ArrowDown, FilterLines } from '@untitled-ui/icons-react'
import { Drawer, Menu, Typography } from '@mui/material'
import { useMemo, useState, useRef, JSX } from 'react'
import { Pagination } from '@/contracts/API'
import { APP_COLORS } from '@/config/colors'
import {
  Table as MuiTable,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Box,
  InputAdornment,
  TextField,
  Button,
  TableContainer,
  TablePagination,
} from '@mui/material'
import { useDelay } from '@/hooks/useDelay'

interface IColumnSort<T> {
  title: string
  key: keyof T
  center?: boolean
}

interface Props<T, F> {
  columns: Array<IColumnSort<T> | string>
  filterData: F
  dataKeyId: keyof T
  result: Pagination<T>
  filterWidth: string | number
  render: (props: T & { index: number }) => JSX.Element
  filter: (props: F & { closeFilter: () => void }) => JSX.Element
  actions: () => JSX.Element
  onFilter: () => void
  onSearch: (search: string) => void
  onClearFilter: () => void
  handleSetPage: (page: number) => void
  handleSetRowsPerPage: (max: number) => void
  hiddenHeader?: boolean
}


export function Table<T, F>(props: Partial<Props<T, F>>) {
  const {
    columns = [],
    render: Item = () => <></>,
    filter: Filters = () => <></>,
    actions: Actions = () => <></>,
    dataKeyId = 'id',
    handleSetPage,
    handleSetRowsPerPage,
    onSearch,
    onClearFilter,
    hiddenHeader = false,
    onFilter,
    filterWidth = '230px',
    filterData = {},
    result = {
      data: [],
      metadata: {
        max: 10,
        page: 1,
        next: false,
        total: 0,
        previous: false,
        totalPages: 0
      }
    },
  } = props

  const refTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (refTimeout.current) {
      clearTimeout(refTimeout.current)
    }

    refTimeout.current = setTimeout(() => {
      onSearch?.(e.target.value)
    }, 500)
  }

  const refPagination = useRef<HTMLDivElement>(null)

  const columnsMemo = useMemo(() => {
    return columns.map((column) => {
      if (typeof column === 'string') {
        return {
          id: crypto.randomUUID(),
          title: column,
          center: false
        }
      }

      return {
        id: crypto.randomUUID(),
        title: column.title,
        key: column.key,
        center: column.center ?? false
      }
    })
  }, [])

  const { data } = result
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | null, direction: 'asc' | 'desc' | null }>({ key: null, direction: null })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const onSort = (column: keyof T) => {
    let direction: 'asc' | 'desc' | null = 'asc'

    if (sortConfig.key === column) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc'
      } else if (sortConfig.direction === 'desc') {
        direction = null
      }
    }

    setSortConfig({ key: direction ? column : null, direction })
  }

  const sortedData = () => {
    if (!sortConfig.key) return data

    return [...data].sort((a, b) => {
      if (a[sortConfig.key!] < b[sortConfig.key!]) return sortConfig.direction === 'asc' ? -1 : 1
      if (a[sortConfig.key!] > b[sortConfig.key!]) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }






  return (
    <>
      <Box
        className={styles.root}
        sx={{
          backgroundColor: APP_COLORS.PRIMARY_BLACK,
          width: "100%",
          borderRadius: "8px",
          boxShadow: "2px 10px 14px 0px #00000005",
          display: "flex",
          flexDirection: "column",
          border: `1px solid #303030b3`,
        }}
      >
        {!hiddenHeader && (
          <header
            className={styles.header}
          >
            <Box
              sx={{
                backgroundColor: APP_COLORS.NEUTRAL_GREY_2,
                borderRadius: "6px",
                width: "100%",
                maxWidth: {
                  md: "384px",
                  xs: "100%"
                },
              }}
            >
              <TextField
                placeholder="Buscador"
                onInput={handleSearch}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchSm color={APP_COLORS.NEUTRAL_BLACK_2} width={20} height={20} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: "100%",
                  ".MuiInputBase-root": {
                    height: "41px",
                    backgroundColor: APP_COLORS.BG_DARK_COLOR,
                    border: `1px solid ${APP_COLORS.BORDER_COLOR}`,
                    borderRadius: "5px",
                  },
                  input: {
                    fontSize: "16px",
                    "&::placeholder": {
                      fontSize: "14px",
                    },
                  },
                  "& .MuiInputAdornment-root": {
                    paddingRight: "10px",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none !important",
                  },
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

            <Button
              variant='outlined'
              onClick={handleClick}
              sx={{
                color: "#000",
                height: "34px",
                textTransform: "none",
                padding: "10px 16px",
                gap: "8px",
                borderRadius: "8px",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                backgroundColor: APP_COLORS.NEUTRAL_GREY_2,
                border: "none",
                '&:hover': {
                  backgroundColor: APP_COLORS.NEUTRAL_GREY_2,
                },
              }}
            >
              <div style={{
                display: "flex",
              }}>
                <FilterLines
                  width={18}
                  height={18}
                  color="black"
                />
              </div>
              <Typography
                fontSize={14}
                color="black"
              >
                Filtros
              </Typography>
              <div style={{
                display: "flex",
              }}>
                <ChevronDown
                  width={16}
                  height={16}
                  color={"b"}
                />
              </div>
            </Button>


          </header>
        )}
        <TableContainer>
          <MuiTable>
            <TableHead>
              <TableRow
                sx={{
                  height: "70px",
                  background: APP_COLORS.PRIMARY_BLACK,
                  borderBottom: `1px solid ${APP_COLORS.BORDER_COLOR}`,
                  borderTop: `1px solid ${APP_COLORS.BORDER_COLOR}`,
                }}
              >
                {columnsMemo.map((column) => {
                  if (!column?.key) return (
                    <TableCell
                      sx={{
                        borderBottom: "none",
                        color: APP_COLORS.LABEL,
                        userSelect: "none",
                        fontSize: '14px',
                        fontWeight: 500
                      }}
                      key={column.id}>
                      <Typography
                        fontSize={14}
                        sx={{
                          minWidth: "max-content",
                          textAlign: column.center ? "center" : "left",
                          fontWeight: 600,

                        }}
                      >
                        {column.title}
                      </Typography>
                    </TableCell>
                  )

                  return (
                    <TableCell
                      sx={{
                        borderBottom: "none",
                        color: APP_COLORS.LABEL,
                        fontSize: 14,
                        fontWeight: 500
                      }}
                      key={column.id}
                      onClick={() => onSort(column.key as keyof T)}
                    >
                      <div className={styles.sortableContent}
                        style={{
                          justifyContent: column.center ? "center" : "flex-start"
                        }}
                      >
                        <Typography
                          fontSize={14}
                          sx={{
                            minWidth: "max-content",
                            fontWeight: 600,
                          }}
                        >
                          {column.title}
                        </Typography>
                        <div style={{
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: "4px"
                        }}>
                          {sortConfig.key === column.key && (
                            sortConfig.direction === 'asc' ? <ArrowUp width={20} height={20} /> :
                              sortConfig.direction === 'desc' ? <ArrowDown width={20} height={20} /> : null
                          )}
                        </div>
                      </div>
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            {data.length > 0 ? (
              <TableBody>
                {
                  sortedData().map((item: any, index) => (
                    <TableRow key={item[dataKeyId]} className={styles.tr} sx={{
                      borderBottom: `1px solid #3d3d3dc0`,
                    }}>
                      <Item {...item} index={index} />
                    </TableRow>
                  ))
                }
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={columnsMemo.length} sx={{ border: "none" }}>
                    <Box
                      sx={{
                        height: "200px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#666666",
                        fontSize: "20px",
                      }}
                    >
                      <Typography>
                        No se encontraron resultados
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </MuiTable>
        </TableContainer>
        <Box
          sx={{
            borderTop: `1px solid #3d3d3dc0`,
          }}
        >
          <TablePagination
            ref={refPagination}
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            className='select-table-pagination'
            count={result.metadata.total}
            rowsPerPage={result.metadata.max}
            page={result.metadata.page - 1}

            sx={{
              color: 'white !important',
              '& .MuiTablePagination-actions > button': {
                color: 'white',
              },
              "& .MuiButtonBase-root.Mui-disabled": {
                opacity: 0.4,
              }

            }}
            onPageChange={(event, page) => {
              handleSetPage?.(page + 1)
            }}
            onRowsPerPageChange={(event) => {
              handleSetRowsPerPage?.(Number(event.target.value))
            }}
            slotProps={{
              select: {
                MenuProps: {
                  disableScrollLock: true
                },
                onOpen: async () => {
                  await useDelay(10)
                  const elements = document.querySelectorAll(".MuiList-root")

                  for (const el of elements) {
                    const element = el as HTMLUListElement


                    const rootId = el.parentElement?.parentElement?.attributes.getNamedItem("id")?.textContent

                    if (rootId === 'menu-') {
                      element.style.padding = '0px'
                      element.style.backgroundColor = '#000'
                      element.style.border = `1px solid ${APP_COLORS.BORDER_COLOR}`
                      break
                    }
                  }

                },
                IconComponent: () => (
                  <div
                    style={{
                      position: "absolute",
                      right: "0px",
                      zIndex: 0,
                      pointerEvents: "none",
                      background: "transparent",
                      color: 'white !important',
                      border: "none !important",
                    }}
                  >
                    <ChevronDown />
                  </div>
                ),
                sx: {
                  alignItems: "center",
                  position: "relative",
                  background: "transparent",
                  zIndex: 1,
                  color: 'white !important',
                  border: "none !important",

                }
              },

            }}

          />
        </Box>
      </Box>
      <Menu
        disableScrollLock
        sx={{
          mt: "45px",
          display: { xs: "none", md: "flex" },
          "& .MuiMenu-paper": {
            border: `1px solid ${APP_COLORS.BORDER_COLOR}`,
            padding: "16px",
            borderRadius: "8px",
            background: "#000000",
            boxShadow: "2px 10px 14px 0px #00000005",
            display: "flex",
            flexDirection: "column",
            "& .MuiList-root": { paddingBlock: 0 },
          },
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuContent
          sx={{
            width: filterWidth,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `1px solid ${APP_COLORS.BORDER_COLOR}`,
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: 16, lineHeight: "22px" }}>
              Filtros
            </Typography>

            <ClearButton
              variant="text"
              color="error"
              onClick={() => {
                handleClose()
                onClearFilter?.()
              }}
            >
              Limpiar
            </ClearButton>
          </Box>

          <Filters
            {...filterData as F}
            closeFilter={handleClose}
          />

        </MenuContent>

        <Box
          sx={{
            marginTop: "24px"
          }}
        >
          <Button
            onClick={() => {
              handleClose()
              onFilter?.()
            }}

            variant='contained'
            sx={{
              width: "100%",
              height: "35px",
            }}
          >
            Filtrar
          </Button>
        </Box>
      </Menu>

      <Drawer
        disableScrollLock
        anchor={"bottom"}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          display: { xs: "flex", md: "none" },
          "& .MuiDrawer-paper": {
            borderRadius: "16px 16px 0px 0px",
            background: "var(--neutral-white, #FFF)",
            boxShadow: "0px 4px 20px 0px rgba(189, 191, 212, 0.16)",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <MenuContent
          sx={{
            width: "100%",
            padding: "16px",
          }}
        >
          <MenuHeader>
            <MenuTitle>
              Filtrar
            </MenuTitle>

            <ClearButton
              variant="text"
              color="error"
              onClick={() => {
                handleClose()
                onClearFilter?.()
              }}
            >
              Limpiar
            </ClearButton>
          </MenuHeader>
          <Filters
            {...filterData as F}
            closeFilter={handleClose}
          />
        </MenuContent>

        <MenuFooter>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              handleClose()
              onFilter?.()
            }}
            sx={{
              lineHeight: "26px"
            }}
            type="submit"
          >
            <Typography
              fontSize={16}
              color='#FFF'
            >
              Filtrar
            </Typography>
          </Button>
        </MenuFooter>
      </Drawer>
    </>
  )
}