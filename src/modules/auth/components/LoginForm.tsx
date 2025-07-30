"use client"
import { Box, Checkbox, FormControlLabel, Button, Link as MaterialLink, Typography } from '@mui/material'
import { GENERAL_INTEGRATION_ERROR_MESSAGE, GLOBAL_TOKEN, STORAGES } from '@/config/constants'
import { ArrowNarrowRight, Lock01, User03 } from '@untitled-ui/icons-react'
import { SubmitForm } from '@/shared/components/logic/Form'
import { Input } from '@/shared/components/form/Input'
import { setCookies } from '@/shared/utils/cookies'
import { APP_COLORS } from '@/config/colors'
import { useState, useEffect } from 'react'
import { useSubmit } from '@/hooks/useForm'
import Link from 'next/link'
import { loginUserService } from '@/services/auth'

export function LoginForm() {
  const [emailStored, setEmailStored] = useState("")
  const [checked, setChecked] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const storedEmail = localStorage.getItem(STORAGES.EMAIL_REMEMBER) || ""
    setEmailStored(storedEmail)
    setChecked(storedEmail.length > 0)
  }, [])


  const submit = useSubmit(async ({ resolve, data: payload, reject }) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGES.EMAIL_REMEMBER, payload.remember ? payload.email : "")
    }

    try {
      const { error, data, ok } = await loginUserService(payload)

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
        message: "Inicio de sesión exitoso",
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
        maxWidth: "410px",
      }}
    >
      <Input
        label="Correo"
        type="email"
        name="email"
        startIcon={User03}
        defaultValue={isClient ? emailStored : ""}
        iconSize={20}
      />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Input
          label="Contraseña"
          type="password"
          name="password"
          startIcon={Lock01}
          iconSize={20}
        />
        {isClient && (
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
                  Recordar mi Usuario
                </Typography>
              }
              control={
                <Checkbox
                  name='remember'
                  checked={checked}
                  onChange={() => {
                    setChecked((prev) => !prev)
                  }}
                />
              }
            />


          </Box>
        )}
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
          Acceder
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
            ¿No tienes una cuenta?
          </Typography>
          <MaterialLink
            color={APP_COLORS.SECONDARY_ORANGE}
            href={"/auth/register"}
            component={Link}
            textAlign="center"
            className='hoverOpacityElement'
            sx={{
              color: '#F7DF1E',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Regístrate Aquí
          </MaterialLink>

        </Box>
      </Box>
    </SubmitForm>
  )
}