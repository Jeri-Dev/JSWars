"use client"

import { ThemeProvider } from '@mui/material/styles'
import { APP_COLORS } from '@/config/colors'
import { esES } from '@mui/material/locale'
import { createTheme } from '@mui/material'
import {
  poppins
} from '@/config/fonts'

interface Props {
  children: React.ReactNode
}

const theme = createTheme({

  palette: {
    mode: "dark",
    primary: {
      main: "#FFF",
    },
    secondary: {
      main: APP_COLORS.SECONDARY_ORANGE,
    }
  },
  typography: {

    fontFamily: poppins.style.fontFamily,
    h2: {
      fontSize: "24px"
    },
    body1: {
      fontSize: "20px",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: 'white'
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: "0px",
          color: '#f9e4e4 !important',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: "44px",
          padding: "8px 16px",
          borderRadius: "6px",
          display: "flex",
          color: APP_COLORS.LABEL,
          justifyContent: "center",
          gap: "4px",
          alignItems: "center",
          textTransform: "none",
          fontSize: "14px",
          boxShadow: "none",
          fontWeight: "500",
          background: 'white',
          "&:hover": {
            backgroundColor: "#f7de1edc",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          },
          "&.Mui-disabled": {
            backgroundColor: APP_COLORS.GREY_DISABLED,
            color: APP_COLORS.GREY_DISABLED_LABEL,
          }
        },
        outlined: {
          backgroundColor: "transparent",
          transition: "opacity 0.3s",
          color: "white",
          "&:hover": {
            backgroundColor: "transparent",
            boxShadow: "none",
            cursor: "pointer",
            opacity: "0.6",
            transition: "opacity 0.3s"
          },
          "&.Mui-disabled": {
            backgroundColor: "transparent",
            borderColor: APP_COLORS.GREY_DISABLED_LABEL,
            color: APP_COLORS.GREY_DISABLED_LABEL,
          }
        },
        text: {
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
            color: APP_COLORS.GREEN_300,
            boxShadow: "none",
          },
          "&.Mui-disabled": {
            backgroundColor: "transparent",
            color: APP_COLORS.GREY_DISABLED_LABEL,
          }
        },
        containedSecondary: {
          backgroundColor: APP_COLORS.SECONDARY_ORANGE,
          color: "#ffffff",
          "&:hover": {
            backgroundColor: APP_COLORS.ORANGE_300,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }
        },
        outlinedSecondary: {
          color: 'white',
          borderColor: 'white',
          "&:hover": {
            borderColor: '#ffffffe9',
            color: '#ffffffe9',
            backgroundColor: "transparent",
          }
        },
        textSecondary: {
          color: APP_COLORS.SECONDARY_ORANGE,
          "&:hover": {
            color: APP_COLORS.ORANGE_300,
            backgroundColor: "transparent",
          }
        },
        containedInfo: {
          backgroundColor: APP_COLORS.ACTION_INFO,
          color: "#ffffff",
          "&:hover": {
            backgroundColor: APP_COLORS.INFO_50,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }
        },
        outlinedInfo: {
          color: APP_COLORS.ACTION_INFO,
          borderColor: APP_COLORS.ACTION_INFO,
          "&:hover": {
            borderColor: APP_COLORS.INFO_50,
            color: APP_COLORS.INFO_50,
            backgroundColor: "transparent",
          }
        },
        textInfo: {
          color: APP_COLORS.ACTION_INFO,
          "&:hover": {
            color: APP_COLORS.INFO_50,
            backgroundColor: "transparent",
          }
        },
        containedSuccess: {
          backgroundColor: APP_COLORS.GREEN_500,
          color: "#ffffff",
          "&:hover": {
            backgroundColor: APP_COLORS.SUCCESS_DARK,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }
        },
        outlinedSuccess: {
          color: APP_COLORS.SUCCESS_ACTION,
          borderColor: APP_COLORS.SUCCESS_ACTION,
          "&:hover": {
            borderColor: APP_COLORS.SUCCESS_DARK,
            color: APP_COLORS.SUCCESS_DARK,
            backgroundColor: "transparent",
          }
        },
        textSuccess: {
          color: APP_COLORS.SUCCESS_ACTION,
          "&:hover": {
            color: APP_COLORS.SUCCESS_DARK,
            backgroundColor: "transparent",
          }
        },
        containedWarning: {
          backgroundColor: APP_COLORS.WARNING_ACTION,
          color: "#ffffff",
          "&:hover": {
            backgroundColor: APP_COLORS.WARNING_DARK,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }
        },
        outlinedWarning: {
          color: APP_COLORS.SECONDARY_ORANGE,
          borderColor: APP_COLORS.SECONDARY_ORANGE,
          "&:hover": {
            borderColor: APP_COLORS.WARNING_DARK,
            color: APP_COLORS.WARNING_DARK,
            backgroundColor: "transparent",
          }
        },
        textWarning: {
          color: APP_COLORS.WARNING_ACTION,
          "&:hover": {
            color: APP_COLORS.WARNING_DARK,
            backgroundColor: "transparent",
          }
        },
        containedError: {
          backgroundColor: APP_COLORS.ERROR_ACTION,
          color: "#ffffff",
          "&:hover": {
            backgroundColor: APP_COLORS.ERROR_DARK,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }
        },
        outlinedError: {
          color: APP_COLORS.ERROR_ACTION,
          borderColor: APP_COLORS.ERROR_ACTION,
          "&:hover": {
            borderColor: APP_COLORS.ERROR_DARK,
            color: APP_COLORS.ERROR_DARK,
            backgroundColor: "transparent",
          }
        },
        textError: {
          color: APP_COLORS.ERROR_ACTION,
          "&:hover": {
            color: APP_COLORS.ERROR_DARK,
            backgroundColor: "transparent",
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#D7D8D63D',
          },
          '&.Mui-disabled': {
            opacity: 0.5,
          },
          '&.Mui-disabled :hover': {
            cursor: 'not-allowed',
          }
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          "& .MuiList-root": {
            padding: "0px"
          },
        },
        menuItem: {
          backgroundColor: '#000',
          color: "#FFF",
          "&:hover": {
            backgroundColor: '#2b2b2b',
          },
          "&.Mui-focused": {
            backgroundColor: "#2b2b2b",
          },
          "&:focus": {
            backgroundColor: "#2b2b2b",
          },
          "&.Mui-selected": {
            backgroundColor: "#2b2b2b",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#2b2b2b",
          },
          "&.Mui-selected:focus": {
            backgroundColor: "#2b2b2b",
          },
        },
        select: {

        }

      }
    },
    MuiChip: {
      defaultProps: {
        variant: "filled",
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontSize: 12,
          height: 26,
          fontWeight: 500,
          width: "fit-content",
          userSelect: "none",
          pointerEvents: "none",
          padding: 0,

          "&.MuiChip-colorPrimary": {
            color: '#E5E7EB',
            backgroundColor: '#1F2937',
          },

          "&.MuiChip-colorSecondary": {
            color: '#BFDBFE',
            backgroundColor: '#1E3E8A',
          },
          "&.MuiChip-colorSuccess": {
            color: '#BBF7D0',
            backgroundColor: '#14532D60',
          },
          "&.MuiChip-colorWarning": {
            color: '#FACC15',
            backgroundColor: '#CA8A0433',
          },
          "&.MuiChip-colorInfo": {
            color: "#00B8D9",
            backgroundColor: "#E6F8FB",
            fontWeight: 600,
          },
          "&.MuiChip-colorError": {
            color: '#FECACA',
            backgroundColor: '#7F1D1D80',
          },
        },
        outlined: {
          "&.MuiChip-colorSuccess": {
            backgroundColor: "transparent",
            borderColor: APP_COLORS.GREEN_500,
            color: APP_COLORS.GREEN_500,
          },
          "&.MuiChip-colorError": {
            backgroundColor: "transparent",
            borderColor: APP_COLORS.ERROR_500,
            color: APP_COLORS.ERROR_500,
          },
          "&.MuiChip-colorWarning": {
            backgroundColor: "transparent",
            borderColor: APP_COLORS.SECONDARY_ORANGE,
            color: APP_COLORS.SECONDARY_ORANGE,
          },
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          padding: "18px 16px",
          height: "42px",
          fontSize: "14px",
          color: 'white',
          backgroundColor: "#1A1A1A",
          borderRadius: "6px",
          border: `1px solid ${APP_COLORS.BORDER_COLOR}`,
          '& input:-webkit-autofill': {
            WebkitBoxShadow: 'none',
            WebkitTextFillColor: 'white',
            transition: 'background-color 5000s ease-in-out 0s',
          },
        }
      }
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFFFFF !important',
          },
        },
        notchedOutline: {
          borderColor: '#FFFFFF',
        },
      },
    },

    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: APP_COLORS.BG_DARK_COLOR,
            borderRadius: '6px',
            height: '48px',
            paddingLeft: '10px',
            paddingRight: '10px',
            border: `1px solid ${APP_COLORS.BORDER_COLOR}`,
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
            '&.Mui-focused fieldset': {
              border: 'none',
            },
          },
          '& .MuiAutocomplete-input': {
            padding: 0,
            color: 'white',
            fontSize: '16px',
          },
          '& .MuiAutocomplete-input::placeholder': {
            color: 'white',
            opacity: 1,
            fontSize: '16px',
          },
          '& .MuiAutocomplete-popupIndicator': {
            paddingRight: '8px',
          },
        },

        paper: {
          backgroundColor: APP_COLORS.BG_DARK_COLOR,
          borderRadius: '8px',
          marginTop: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        },

        option: {
          fontSize: '16px',
          margin: '0px 8px',
          borderRadius: '6px',
          cursor: 'pointer',
          '&[aria-selected="true"]': {
            backgroundColor: '#2B2B2B',
            color: 'white',
          },
          '&:hover': {
            backgroundColor: '#2B2B2B',
            color: 'white',
          },
          '&.Mui-focused': {
            backgroundColor: '#2B2B2B',
            color: 'white',
          },
          '&.Mui-selected': {
            backgroundColor: '#2B2B2B',
            color: 'white',
          },
          "&.Mui-selected:focus": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          fontSize: "14px",
          "& .MuiInputBase-root": {

            backgroundColor: APP_COLORS.NEUTRAL_GREY_2,
            fontSize: "14px",
            "&:hover": {
              border: `1px solid ${APP_COLORS.NEUTRAL_BLACK_2}`,
            },
            "&.Mui-focused": {
              border: `1px solid ${APP_COLORS.NEUTRAL_BLACK_2}`,
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",

          },
          "& .MuiMenu-paper": {
            backgroundColor: APP_COLORS.NEUTRAL_GREY_2,
          },
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          maxWidth: 'fit-content',
          '& .MuiSvgIcon-root': {
            color: APP_COLORS.NEUTRAL_BLACK_2,
          },
          '&.Mui-checked': {
            '& .MuiSvgIcon-root': {
              color: '#F7DF1E',
            },
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "16px",

          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: 'none',
              borderRadius: "6px",
            },
            "&.Mui-focused fieldset": {
              border: `1px solid ${APP_COLORS.NEUTRAL_BLACK_2}`,
              borderRadius: "6px",
            },
            "&:hover fieldset": {
              border: `1px solid ${APP_COLORS.NEUTRAL_BLACK_2}`,
              borderRadius: "6px",
            },
            "&.Mui-disabled": {
              "& fieldset": {
                border: 'none',
                backgroundColor: APP_COLORS.DISABLED_BG,
                opacity: .2,

              },
            },

            "&::placeholder": {
              color: '#ffffff80',
              opacity: 1,
            },
          },
        },
      }
    },

    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '& .MuiTypography-root': {
            fontSize: "16px",
          },
        }
      },
      variants: [
        {
          props: { content: "check" },
          style: {
            '& .MuiTypography-root': {
              fontFamily: poppins.style.fontFamily,
            }
          }
        }
      ]
    },
    MuiList: {
      styleOverrides: {
        root: {
          '& .MuiTypography-root': {
            fontSize: "16px",
          },
        }
      },
      variants: [
        {
          props: { content: "check" },
          style: {
            '& .MuiTypography-root': {
              fontFamily: poppins.style.fontFamily,
            }
          }
        }
      ]
    }
  }
}, esES)

export function MaterialUIProvider(props: Props) {
  const {
    children
  } = props

  return (
    <ThemeProvider
      theme={theme}
    >
      {children}
    </ThemeProvider>
  )
}