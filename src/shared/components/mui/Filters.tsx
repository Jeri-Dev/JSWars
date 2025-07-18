"use client"
import { Box, Button, Chip, Typography, ChipProps, Divider } from "@mui/material"
import { styled } from "@mui/material/styles"
import { memo } from 'react'

export const StyledContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "40px",
  marginTop: "40px",
  marginBottom: "250px",
}))

export const StyledSection = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "24px",
  width: "100%",
}))

export const SectionTitle = styled(Box)(() => ({
  color: "#FFF",
  fontSize: "14px",
  lineHeight: "26px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  marginBottom: "16px",
}))

export const SectionChip = styled(Chip)(() => ({
  padding: "2px 8px",
  borderRadius: "100px",
  textAlign: "center",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "16px",
  letterSpacing: "0.5px",
  "& .MuiChip-label": {
    padding: "0px",
  },
}))

export const MenuContent = styled("div")(() => ({
  display: "flex",
  padding: "0px",
  flexDirection: "column",
  alignSelf: "stretch",
}))

export const MenuHeader = styled("header")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignSelf: "stretch",
  padding: "16px 16px 0px 16px",
  borderBottom: "1px solid var(--neutral-gray-3, #F4F6F8)",
  marginBottom: "16px",
}))

export const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px"
}))

export const MenuTitle = styled("h3")(() => ({
  color: "#FFF",
  fontSize: "15px",
  fontWeight: "600",
  lineHeight: "22px",
}))

export const ClearButton = styled(Button)(() => ({
  fontSize: "14px",
  lineHeight: "26px",
  padding: "4px 16px",
}))

export const MenuFooter = styled("footer")(() => ({
  display: "flex",
  padding: "16px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-end",
  gap: "10px",
  alignSelf: "stretch",
  borderRadius: "0px 0px 13px 16px",
  borderTop: "1px solid var(--neutral-gray-3, #F4F6F8)",
}))

export const MenuLabel = styled("p")(() => ({
  color: "#FFF",
  fontSize: "16px",
  lineHeight: "22px",
}))

export const TagContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "16px",
  flexWrap: "wrap",
}))

export const Tag: React.FC<ChipProps> = memo((props) => {
  const { label, ...rest } = props

  return (
    <Chip
      className='hoverOpacityElement'
      label={
        <Typography
          fontSize={14}
        >
          {label}
        </Typography>
      }
      sx={{
        borderRadius: "6px",
        padding: "2px 8px",
        height: "25px",
        cursor: "pointer",
        userSelect: "none",
        "& .MuiChip-label": {
          padding: 0,
          textAlign: "center",
          fontSize: "12px",

          fontWeight: "500",
          lineHeight: "20px",
        },
        "&.MuiChip-filled": {
          border: "1px solid transparent",
          color: "#FFF",
        },
        "&.MuiChip-outlined": {
          color: "#BBB",
        },
      }}
      {...rest}
    />
  )
})

Tag.displayName = "Tag"

export const Separator = styled(Divider)(() => ({
  width: "100%",
}))


