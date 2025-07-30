"use client"
import { Box, Button, Checkbox, FormControlLabel, Link as MaterialLink, Typography } from '@mui/material'
import { AutoGrid } from '@/shared/components/container/AutoGrid'
import { SubmitForm } from '@/shared/components/logic/Form'
import { ArrowNarrowRight } from '@untitled-ui/icons-react'
import { Input } from '@/shared/components/form/Input'
import { APP_COLORS } from '@/config/colors'
import Link from 'next/link'
import { Select } from '@/shared/components/form/Select'
import { GENERAL_INTEGRATION_ERROR_MESSAGE, GLOBAL_TOKEN, STORAGES } from '@/config/constants'
import { setCookies } from '@/shared/utils/cookies'
import { registerUserService } from '@/services/auth'
import { useSubmit } from '@/hooks/useForm'
import { CAPTCHA_PUBLIC_KEY } from '@/config/enviroments'
import ReCAPTCHA from 'react-google-recaptcha'
import { useState } from 'react'

export function RegisterForm() {

  const [captchaKey, setCaptchaKey] = useState<string | null>(null)

  const handleChangeCaptcha = (key: string | null) => {
    setCaptchaKey(key)
  }

  console.log(CAPTCHA_PUBLIC_KEY)


  const submit = useSubmit(async ({ resolve, data: payload, reject }) => {

    if (!captchaKey) {
      return reject("Debe de completar el captcha.")
    }

    try {
      const { error, data, ok } = await registerUserService(payload)

      if (!ok) {
        return reject(error.messages[0].message)
      }

      (window as any)[GLOBAL_TOKEN] = data.result

      await setCookies([
        {
          name: STORAGES.TOKEN,
          value: data.result,
          days: 30
        },
      ])

      resolve({
        message: "Registro exitoso",
        redirect: "/"
      })


    } catch {
      reject(GENERAL_INTEGRATION_ERROR_MESSAGE)
    }
  })

  return (
    <SubmitForm
      submit={submit}
      style={{
        maxWidth: "1000px",
      }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "24px",
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

      <AutoGrid columnMinWidth='50%'>
        <Input
          label="Nombre de usuario"
          name="userName"
          placeholder="JoeDev"
          required
        />
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
      </AutoGrid>

      <ReCAPTCHA
        sitekey={CAPTCHA_PUBLIC_KEY}
        onChange={handleChangeCaptcha}
        hl="es"
      />

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