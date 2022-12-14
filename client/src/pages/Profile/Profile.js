/* eslint-disable react-hooks/exhaustive-deps */
import * as yup from 'yup';
import Axios from 'axios';
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  Icon,
  TextField,
  Typography,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import themeDefault from '../../theme';

const theme = createTheme(themeDefault);

const Profile = () => {
  const [values, setValues] = useState({});
  const email = localStorage.getItem('email');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleChangePassword = async (e) => {
    if (values.senha !== values.confirmacao) {
      alert('As senhas são diferentes');
      return;
    }
    Axios.get('http://localhost:3001/user/mudaSenha', {
      params: {
        email: email,
        senha: values.senha,
      },
    })
      .then(function (response) {
        //handle success
        alert(response.statusText);
        if (response.status === 200) {
          window.history.back();
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const validationsProfile = yup.object().shape({
    senha: yup.string().required('A senha é obrigatória'),
    confirmacao: yup
      .string()
      .oneOf([yup.ref('senha'), null], 'As senhas são diferentes')
      .required('A confirmação da senha é obrigatória'),
  });

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundImage: 'url(/xa.jpg)',
          backgroundRepeat: 'no-repeat',
          maxWidth: 'false',
          backgroundSize: 'cover',
          backgroundPositionX: 'center',
          backgroundPositionY: 'center',
          backgroundColor: '#48D1CC',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          position: 'absolute',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            marginLeft: '20%',
            marginTop: '2%',
            marginRight: '20%',
            bottom: 500,
            borderRadius: '10px',
          }}
        >
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
              <Icon
                sx={{
                  backgroundImage: 'url(/profile.png)',
                  backgroundSize: 'cover',
                  width: '70px',
                  height: '70px',
                  m: 1,
                }}
              />
              <Typography component="h1" variant="h5" align="left">
                Perfil de usuário
              </Typography>
              <Typography component="h7" variant="h7" mt={'10px'}>
                Email: {email}
              </Typography>
              <Box sx={{ mt: 1 }}>
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmacao"
                  label="Confirme sua senha"
                  type="password"
                  id="confirmacao"
                  onChange={handleInputChange}
                />
                <Button
                  onClick={handleChangePassword}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Alterar Senha
                </Button>

                <Grid item sx={{ mb: 5 }}>
                  <Link href="/Dashboard" variant="body2">
                    Voltar para o catálogo de provas
                  </Link>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Profile;
