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
    await Axios.get('http://localhost:3001/validateCredentials', {
      params: { email: localStorage.getItem('email') },
    })
      .then((response) => {
        console.log(response);
        if (response.data.valid && response.data.admin)
          setAuthorizedAccess(true);
        else if (response.data.valid && !response.data.admin)
          window.location.href = '/Dashboard';
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

const DashboardProfessor = () => {
  const logout = () => {
    localStorage.removeItem('email');
    window.location.href = '/login';
  };
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
                marginLeft: '5%',
                marginTop: '10%',
                marginRight: '5%',
                
                borderRadius: '10px'
            }}>
        <Toolbar />
<Schedule />
            <Button
              type="submit"
              variant="contained"
              sx={{ ml: 25, mb: 2 }}
              href='/Perfil'
            >
              Mudar Senha
            </Button>
            <Button
              variant="contained"
              sx={{ ml: 30, mb: 2 }}
            >
              Historico de provas
            </Button>
            <Button
              variant="contained"
              sx={{ ml: 30, mb: 2 }}
            >
              Nova avaliação
            </Button>
         </div>
    </div>
      </Box>
         
  );
};

export default DashboardProfessor;