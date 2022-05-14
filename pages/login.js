import {
  Container,
  Box,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
} from '@mui/material'

import Header from '../Components/Header'
import { useRouter } from 'next/router'
import { useState } from 'react'

import Loading from '../Components/Loading'

export default () => {

  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header title="GMMS - Login" />
      <Loading open={open} />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <h2>Login</h2>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: '30%',
            maxWidth: '80%'
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="Username"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            sx={{ width: '100%' }}
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 1
            }}
            onClick={() => { setOpen(true); router.push('/main', undefined) }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </>
  );
}
