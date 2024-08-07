import { useMediaQuery } from '@mui/material';
import { createTheme } from "@mui/material/styles";

const Theme = () => {
  const isSmall = useMediaQuery('(max-width: 450px)')
  const isMedium = useMediaQuery('(min-width: 450px) and (max-width: 800px)')

  if (isSmall) {
    return createTheme({
      typography: {
        h1: {
          fontSize: '40px',
          fontWeight: '600',
          lineHeight: '46px'
        },
        h2: {
          fontSize: '32px',
          fontWeight: '600',
          lineHeight: '36px'
        },
        h3: {
          fontSize: '24px',
          fontWeight: '600',
          lineHeight: '30px'
        },
        h5: {
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: '20px'
        },
        h4: {
          fontSize: '14px',
          fontWeight: '600',
          lineHeight: '18px'
        },
        body1: {
          fontSize: '10px',
          fontWeight: '500',
          lineHeight: '14px'
        }
      }
    })
  }

  if (isMedium) {
    return createTheme({
      typography: {
        h1: {
          fontSize: '64px',
          fontWeight: '600',
          lineHeight: '68px'
        },
        h2: {
          fontSize: '48px',
          fontWeight: '600',
          lineHeight: '56px'
        },
        h3: {
          fontSize: '40px',
          fontWeight: '600',
          lineHeight: '48px'
        },
        h4: {
          fontSize: '24px',
          fontWeight: '600',
          lineHeight: '32px'
        },
        h5: {
          fontSize: '16px',
          fontWeight: '500',
          lineHeight: '20px'
        },
        body1: {
          fontSize: '12px',
          fontWeight: '500',
          lineHeight: '18px'
        }
      }
    })
  }

  return createTheme({
    typography: {
      h1: {
        fontSize: '80px',
        fontWeight: '600',
        lineHeight: '96px'
      },
      h2: {
        fontSize: '64px',
        fontWeight: '600',
        lineHeight: '72px'
      },
      h3: {
        fontSize: '54px',
        fontWeight: '600',
        lineHeight: '62px'
      },
      h4: {
        fontSize: '34px',
        fontWeight: '600',
        lineHeight: '42px'
      },
      h5: {
        fontSize: '24px',
        fontWeight: '500',
        lineHeight: '30px'
      },
      body1: {
        fontSize: '16px',
        fontWeight: '500',
        lineHeight: '20px'
      }
    }
  })
}

export default Theme