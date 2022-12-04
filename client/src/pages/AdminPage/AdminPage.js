import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import themeDefault from '../../theme';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Toolbar,
  AppBar,
  TextField,
  Typography,
  MenuItem,
  TableContainer,
  Link,
} from '@mui/material';

const theme = createTheme(themeDefault);

const initialValues = {
  email: '',
  tipo: 'aluno',
  cpf: 0,
  nusp: 0,
};

const RegisterForm = () => {
  const [values, setValues] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    await Axios.get('http://localhost:3001/user/listAllStudents')
      .then((response) => setUsers(response.data.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const logout = () => {
    localStorage.removeItem('email');
    window.location.href = '/login';
  };

  const handleRegister = async (e) => {
    console.log(values);
    Axios.post(
      `http://localhost:3001/user/createUser?email=${values.email}&nusp=${values.nusp}&cpf=${values.cpf}&tipo=${values.tipo}`,
      {
        email: values.email,
        nusp: values.nusp,
        cpf: values.cpf,
        tipo: values.tipo,
      },
    )
      .then(function (response) {
        alert(response.data.statusText);
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  const removeUser = async (email) => {
    await Axios.delete(`http://localhost:3001/user/deleteUser`, {
      params: {
        email,
      },
    })
      .then(function (response) {
        //handle success
        alert(response.data.data.message);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    window.location.reload(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="absolute">
        <Toolbar sx={{ pr: '24px' }}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard - Administrador
          </Typography>
          <Button variant="contained" color="secondary" onClick={logout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <div
        style={{
          backgroundImage: 'url(/xa.jpg)',
          backgroundRepeat: 'no-repeat',
          maxWidth: 'false',
          backgroundSize: 'cover',
          backgroundPositionX: 'center',
          backgroundPositionY: 'center',
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
            marginLeft: '5%',
            marginTop: '8%',
            marginRight: '5%',
            borderRadius: '10px',
          }}
        >
          <Container component="main">
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  marginTop: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: 500,
                  mr: 25,
                }}
              >
                <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
                  Cadastrar usuário
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    email
                    fullWidth
                    name="email"
                    label="Email"
                    id="email"
                    onChange={handleInputChange}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    name="nusp"
                    label="Número USP"
                    id="nUSP"
                    onChange={handleInputChange}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    required
                    name="cpf"
                    label="CPF"
                    id="cpf"
                    onChange={handleInputChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="tipo"
                    label="Professor ou aluno"
                    id="tipo"
                    onChange={handleInputChange}
                    select
                  >
                    <MenuItem value={'professor'}>Professor</MenuItem>
                    <MenuItem value={'aluno'}>Aluno</MenuItem>
                  </TextField>
                  <Button
                    onClick={handleRegister}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 7 }}
                  >
                    Cadastrar Usuário
                  </Button>

                  <Grid item></Grid>
                </Box>
              </Box>
              <Box
                sx={{
                  marginTop: 6,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left',
                }}
              >
                <Typography component="h1" variant="h5">
                  Usuários cadastrados
                </Typography>
                <Typography
                  component="h9"
                  variant="h9"
                  color="black"
                  gutterBottom
                  inline
                  pb={2}
                >
                  Clique no usuário para excluir
                </Typography>
                <TableContainer sx={{ pb: 2 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>E-mail</TableCell>
                        <TableCell>Número USP</TableCell>
                        <TableCell>CPF</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map &&
                        users.map((row) => (
                          <TableRow>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.nusp}</TableCell>
                            <TableCell>{row.cpf}</TableCell>
                            <TableCell>{row.tipo}</TableCell>
                            <TableCell>
                              <Link
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      'Deseja excluir esse usuário?',
                                    )
                                  ) {
                                    removeUser(row.email);
                                  }
                                }}
                                href="#"
                              >
                                Remover
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default RegisterForm;
