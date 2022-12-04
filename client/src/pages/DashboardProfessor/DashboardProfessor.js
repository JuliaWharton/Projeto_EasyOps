/* eslint-disable react-hooks/exhaustive-deps */
import { styled } from '@mui/material/styles';
import React, { Fragment, useEffect, useState } from 'react';
import Axios from 'axios';
import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableContainer,
  Link,
} from '@mui/material';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Schedule = () => {
  const [authorizedAccess, setAuthorizedAccess] = useState(false);

  useEffect(async () => {
    await Axios.get('http://localhost:3001/user/validateCredentials', {
      params: { email: localStorage.getItem('email') },
    })
      .then((response) => {
        console.log(response);
        if (response.data.valid && response.data.data.tipo === 'professor')
          setAuthorizedAccess(true);
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

  return authorizedAccess ? <Fragment></Fragment> : <></>;
};

const DashboardProfessor = () => {
  const logout = () => {
    localStorage.removeItem('email');
    window.location.href = '/login';
  };

  const [turmas, setTurmas] = useState([]);
  const turmasColumns = ['Nome', 'Descrição'];

  useEffect(async () => {
    await Axios.get('http://localhost:3001/class/listaDoProfessor', {
      params: { email: localStorage.getItem('email') },
    })
      .then((response) => {
        setTurmas(response.data.data);
      })
      .catch((response) => {
        //handle error
        console.log('error:' + response);
      });
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute">
        <Toolbar sx={{ pr: '24px' }}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard: Professor
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
            marginLeft: '5%',
            marginTop: '10%',
            marginRight: '5%',

            borderRadius: '10px',
          }}
        >
          <Toolbar />
          <Schedule />
          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            gap={3}
            p={3}
          >
            <Button variant="contained" fullWidth href="/Perfil">
              Mudar Senha
            </Button>
            <Button variant="contained" fullWidth href="/CadastroProva">
              Nova avaliação
            </Button>
          </Box>
          <Box
            mt={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={3}
          >
            <Typography color="red" fontWeight="600">
              Turmas vinculadas
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {turmasColumns.map((column) => (
                      <TableCell key={column}>
                        <Typography fontWeight="600">{column}</Typography>
                      </TableCell>
                    ))}
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {turmas.map((turma) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={turma.id}
                    >
                      <TableCell key={`${turma.id}-nome`}>
                        <Link href={`/VisualizaTurma?id=${turma.id}`}>
                          {turma.nome}
                        </Link>
                      </TableCell>
                      <TableCell key={`${turma.id}-descricao`}>
                        {turma.descricao}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </div>
      </div>
    </Box>
  );
};

export default DashboardProfessor;
