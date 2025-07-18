import { Box, TableCell } from '@mui/material'
import { Typography } from '@mui/material'

export function Td({ children, center = false }: { children?: React.ReactNode, center?: boolean }) {
  return (
    <TableCell
      sx={{
        color: '#FFF',
        border: "none",
        fontSize: "14px"
      }}
    >
      {typeof children === 'string' ? (
        <Typography
          sx={{
            fontSize: "16px",
            textAlign: center ? "center" : "left",
          }}
        >
          {children}
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: center ? "center" : "flex-start",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      )}
    </TableCell>
  )
}