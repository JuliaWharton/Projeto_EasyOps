import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard/Dashboard';
import LoginPage from './pages/LoginPage/LoginPage';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import themeDefault from './theme';
import DashboardProfessor from './pages/DashboardProfessor/DashboardProfessor';
import CadastroProva from './pages/CadastroProvas/CadastroProvas';
import RespondeProva from './pages/RespondeProva/RespondeProva';
import RegisterForm from './pages/AdminPage/AdminPage';
import VisualizaTurma from './pages/VisualizaTurma/VisualizaTurma';

const theme = createTheme(themeDefault);

const Routes = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/CadastroProva" component={CadastroProva} />
          <PrivateRoute path="/RespondeProva" component={RespondeProva} />
          <PrivateRoute path="/VisualizaTurma" component={VisualizaTurma} />
          <PrivateRoute path="/Dashboard" component={Dashboard} />
          <PrivateRoute
            path="/DashboardProfessor"
            component={DashboardProfessor}
          />
          <PrivateRoute path="/Perfil" component={Profile} />
          <Route component={LoginPage} path="/login" />
          <PrivateRoute path="/AdminPage" component={RegisterForm} />
          {/* <Route component={CorrecaoQuestoes} path="/CorrecaoQuestoes" /> */}
          <Route component={Home} path="/" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default Routes;
