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
import { useEffect, useState } from 'react'

import Loading from '../Components/Loading'

import { useCookies } from 'react-cookie';

const MyApp = () => {

  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    if (cookies.user && cookies.user != []) {
      setOpen(true);
      goto(cookies.user.Role)
    }

  }, []);

  const login = async () => {

    if (username == '' || password == '') return;

    setOpen(true);
    const body = {
      user: { username, password }
    }

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (res.status != 200) {
      setOpen(false);
      return;
    }

    const data = await res.json();
    if (data.length == 0) {
      setOpen(true);
      return;
    }

    setCookie('user', data[0]);
    goto(data[0].Role)
  }

  const goto = (Role) => {
    if (Role) router.push('/' + Role.toLowerCase())
  }


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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 1
            }}
            onClick={() => login()}
          >
            Login
          </Button>
        </Box>
      </Container>
    </>
  );
}

MyApp.displayName = "MyApp"

export default MyApp;