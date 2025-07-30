import { GLOBAL_TOKEN, STORAGES, GENERAL_INTEGRATION_ERROR_MESSAGE } from '@/config/constants'
import { useSubmit } from '@/hooks/useForm'
import { registerUserService } from '@/services/auth'
import { Input } from '@/shared/components/form/Input'
import { SubmitForm } from '@/shared/components/logic/Form'
import { setCookies } from '@/shared/utils/cookies'
import { Box, Button } from '@mui/material'
import { ArrowNarrowRight } from '@untitled-ui/icons-react'
import React from 'react'

export default function page() {

  const submit = useSubmit(async ({ resolve, data: payload, reject }) => {

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


      </Box>
    </SubmitForm>
  )
}
