import { ButtonLink } from '@/shared/components/elements/ButtonLink'
import { Box, Typography } from "@mui/material"
import { IconApp } from '@/types/Icon'

interface ErrorProps {
  title: string
  icon: IconApp
  link?: string
}


export const ErrorScreen = (props: ErrorProps) => {
  const { title, icon: Icon, link } = props

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={"center"} minHeight={'70vh'} gap={'24px'}>
      <Icon width={100} height={100} color={"var(--neutral-black-300)"} />
      <Typography fontWeight={600} fontSize={"20px"} >{title}</Typography>
      {
        link &&
        <ButtonLink
          href={link}
          text="Volver a la atrás"
        />
      }
    </Box>
  )

}