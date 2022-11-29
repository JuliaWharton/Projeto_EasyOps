import React, { useState, useEffect, Fragment } from 'react';
import * as yup from 'yup';
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
  TableContainer
} from '@mui/material';

const theme = createTheme(themeDefault);


const Validation = () => {

    const [authorizedAccess, setAuthorizedAccess] = useState(false);
  
    useEffect(async () => {
      await Axios.get('http://localhost:3001/validateCredentials', {
        params: { email: localStorage.getItem('email') },
      })
        .then((response) => {
          console.log(response);
          if (response.data.valid && !response.data.admin)
            setAuthorizedAccess(true);
          else if (response.data.valid && response.data.admin)
            window.location.href = '/DashboardProfessor';
          else {
            localStorage.removeItem('email');
            window.location.href = '/login';
          }
        })
        .catch((response) => {
          //handle error
          console.log('error:' + response);
        });
    }, []);
  
  
  
    return authorizedAccess ? (
  
      <Fragment>
  
        
      </Fragment>
    ) : (
      <>proximos capitulos</>
    );
  };

const RegisterForm = () => {
  const [values, setValues] = useState({});
  const [users, setUsers] = useState([]);

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
    Axios.post('http://localhost:3001/cadastro', values)
      .then(function (response) {
        //handle success
        alert(response.data.statusText);
        if (response.data.status == 200) {
          alert('Cadastro realizado com sucesso');
          window.location.href = '/login';
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .email('email inválido')
      .required('O email é obrigatório'),
    senha: yup.string().required('A senha é obrigatória'),
    confirmacao: yup
      .string()
      .oneOf([yup.ref('senha'), null], 'As senhas são diferentes')
      .required('A confirmação da senha é obrigatória'),
  });

  const handleDelete = async(horario, dataHorario) => {

    await Axios.delete(`http://localhost:3001/Agendamento/`, { data: { dia: dataHorario, horario: horario } }).then(function (response) {
        //handle success
        alert(response.data.statusText);
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
          <Button variant="contained" color="secondary"  onClick={logout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <div style={{
            backgroundImage: "url(/xa.jpg)",
            backgroundRepeat: "no-repeat",
            maxWidth: 'false',
            backgroundSize: 'cover', backgroundPositionX: "center", backgroundPositionY: "center",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            position: 'absolute',
        }}>
         <div style={{
                backgroundColor: 'white',
                marginLeft: '5%',
                marginTop: '8%',
                marginRight: '5%',
                borderRadius: '10px'
            }}>
      <Container component="main" >
        <CssBaseline />
        <Box sx ={{ display: 'flex', flexDirection: 'row'}}>
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 500,
            mr: 25
          }}
        >

          <Typography component="h1" variant="h5" sx={{marginTop: 2}}>
            Cadastrar usuário
          </Typography>
          {/* <Validation></Validation> */}
          <Box
            component="form"
            onSubmit={handleRegister}
            validationSchema={validationsRegister}
            sx={{ mt: 1}}
          >
            {/* <TextField
              margin="normal"
              required
              email
              fullWidth
              name="id"
              label="ID"
              id="id"
              onChange={handleInputChange}
            /> */}
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
              name="nUSP"
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
              fullWidth
              required
              name="turma"
              label="Turma"
              id="turma"
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
              <MenuItem value={'Professor'}>Profesor</MenuItem>
              <MenuItem value={'Aluno'}>Aluno</MenuItem>
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 7 }}
            >
              Cadastrar Usuário 
            </Button>
        
            <Grid item>
            </Grid>
            
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
            <Typography component="h1" variant="h5" >
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
                  Clique no agendamento para excluir
                </Typography>
                <TableContainer sx={{ pb: 2 }} >
                  <Table size="small" >
                    <TableHead>
                      <TableRow>
                        {/* <TableCell>ID</TableCell> */}
                        <TableCell>E-mail</TableCell>
                        <TableCell>Número USP</TableCell>
                        <TableCell>CPF</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Turma</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody >
                      {users.map &&
                        users.map((row) => (
                          <TableRow onClick={() => { if (window.confirm('Deseja excluir esse usuário?')) { handleDelete(row.id) } }}>
                            {/* <TableCell>{row.id}</TableCell> */}
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.nUSP}</TableCell>
                            <TableCell>{row.cpf}</TableCell>
                            <TableCell>{row.tipo}</TableCell>
                            <TableCell>{row.turma}</TableCell>
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