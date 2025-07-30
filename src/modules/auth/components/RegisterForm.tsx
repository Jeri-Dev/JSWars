"use client"
import { Box, Button, Checkbox, FormControlLabel, Link as MaterialLink, Typography } from '@mui/material'
import { AutoGrid } from '@/shared/components/container/AutoGrid'
import { SubmitForm } from '@/shared/components/logic/Form'
import { ArrowNarrowRight } from '@untitled-ui/icons-react'
import { Input } from '@/shared/components/form/Input'
import { APP_COLORS } from '@/config/colors'
import Link from 'next/link'
import { Select } from '@/shared/components/form/Select'

export function RegisterForm() {
  return (
    <SubmitForm
      style={{
        maxWidth: "410px",
      }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
        width: "100%",
      }}>
        <Input
          label="Nombre"
          name="username"
          placeholder="Joe"
          required
        />

        <Input
          label="Apellido"
          name="lastName"
          placeholder="Ingresa tu apellido"
          required
        />
      </Box>

      <AutoGrid columnMinWidth='60%'>
        <Input
          label="Correo"
          name="email"
          placeholder="Joe@example.com"
          required
        />

        <Input
          type='password'
          label="Contraseña"
          name="password"
          placeholder="Ingresa tu contraseña"
          required
        />

        <Input
          type='password'
          label="Confirmar contraseña"
          name="confirmPassword"
          placeholder="Ingresa tu contraseña"
          required
        />

        <Select
          label="Pregunta de seguridad"
          name="securityQuestion"
          placeholder="Selecciona una pregunta de seguridad"
          data={[
            '¿Cuál es el nombre de tu mascota?',
            '¿Cuál es el nombre de tu primer escuela?',
            '¿Cuál es el nombre de tu mejor amigo?',
            '¿Cuál es el nombre de tu ciudad natal?',
            '¿Cuál es el nombre de tu primer amor?',
          ].map((question) => ({
            label: question,
            value: question,
          }))}
        />

        <Input
          type='text'
          label="Respuesta"
          name="securityAnswer"
          placeholder="Ingresa la respuesta a la pregunta de seguridad"
          required
        />
        <Typography>a</Typography>
      </AutoGrid>

      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        mb: "-20px",
      }}>
        <FormControlLabel
          label={
            <Typography sx={{
              fontSize: '14px !important',
              color: '#9CA3AF !important',
              fontWeight: '500 !important',
            }}>
              Acepto los términos y condiciones
            </Typography>
          }
          control={
            <Checkbox
              name='remember'
            />
          }
        />
      </Box>

      <Box
        sx={{
          flexDirection: "column",
          marginTop: "16px",
          display: "flex",
          width: "100%",
          gap: "24px",
        }}
      >
        <Button
          endIcon={<ArrowNarrowRight width={20} height={20} />}
          fullWidth
          type='submit'
          variant='contained'
          sx={{
            borderRadius: "6px",
            backgroundColor: "#F7DF1E",
          }}
        >
          Registrarse
        </Button>

        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: "8px",
        }}>

          <Typography
            sx={{
              fontSize: '16px',
              color: '#6B7280',
              textAlign: 'center',
            }}
          >
            ¿Ya tienes una cuenta?
          </Typography>
          <MaterialLink
            color={APP_COLORS.SECONDARY_ORANGE}
            href={"/auth"}
            component={Link}
            textAlign="center"
            className='hoverOpacityElement'
            sx={{
              color: '#F7DF1E',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Inicia Sesión Aquí
          </MaterialLink>

        </Box>
      </Box>
    </SubmitForm>
  )
}