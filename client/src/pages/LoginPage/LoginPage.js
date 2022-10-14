import React, { useState } from 'react';
import * as yup from 'yup';
import Axios from 'axios';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Icon,
  TextField,
  Typography,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import themeDefault from '../../theme';

const theme = createTheme(themeDefault);

const LoginPage = () => {
  const [values, setValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleLogin = async (e) => {
    await Axios.post('http://localhost:3001/login', values)
      .then(function (response) {
        //handle success
        console.log(response);
        if (response.status == 401 || response.status == 400) {
          alert(response.statusText);
        } else {
          alert(response.data.statusText);
          localStorage.setItem('email', values.email);
          if (response.admin) window.location.href = '/DashboardProfessor';
          else {
            localStorage.setItem('email', values.email);
            window.location.href = '/Dashboard';

          }
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  const validationsLogin = yup.object().shape({
    email: yup
      .string()
      .email('Este endereço de email é inválido')
      .required('O email é obrigatório'),
    senha: yup.string().matches(/.{8}/g).required('A senha é obrigatória'),
  });

  return (
    <ThemeProvider theme={theme}>
       <div style={{
            backgroundImage: "url(/xa.jpg)",
            backgroundRepeat: "no-repeat",
            maxWidth: 'false',
            backgroundSize: 'cover', backgroundPositionX: "center", backgroundPositionY: "center",
            backgroundColor: "#48D1CC", top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            position: 'absolute',
        }}>
         <div style={{
                backgroundColor: 'white',
                marginLeft: '35%',
                marginTop: '2%',
                marginRight: '35%',
                bottom: 50,
                borderRadius: '10px'
            }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        
            <Icon sx={{ backgroundImage: "url(/aa.png)", backgroundSize: 'cover', width: '70px', height: '70px', m: 1}} />
          
          <Typography component="h1" variant="h5" >
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            validationSchema={validationsLogin}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              id="email"
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid item>

            </Grid>
          </Box>
        </Box>
      </Container>
      </div>
      </div>
    </ThemeProvider>
  );
};

export default LoginPage;
