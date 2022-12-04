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
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableBody,
  TableHead,
  Link,
  Modal,
} from '@mui/material';
import { formatDateTime, formatTime } from '../../utils/formatDateTime';

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
        console.log('error:' + response);
      });
  }, []);

  return authorizedAccess ? <Fragment></Fragment> : <>proximos capitulos</>;
};

const initialFeedbackData = {
  email: '',
  grade: 0,
  questions_resp: [
    {
      enunciado: '',
      userAnswer: '',
      correctAnswer: '',
      correct: false,
    },
  ],
};

const Dashboard = () => {
  const [pendingTests, setPendingTests] = useState([]);
  const [doneTests, setDoneTests] = useState([]);
  const [feedback, setFeedback] = useState(initialFeedbackData);
  const [openModal, setOpenModal] = useState(false);

  const logout = () => {
    localStorage.removeItem('email');
    window.location.href = '/login';
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const columns = ['Avaliação', 'Disponível desde:', 'Duração'];

  useEffect(async () => {
    await Axios.get('http://localhost:3001/test/listTestsForUser', {
      params: { email: localStorage.getItem('email') },
    })
      .then((response) => {
        const tests = response.data.data.map((test) => ({
          id: test.id,
          nome: test.nome,
          horarioComeco: new Date(test.horarioComeco),
          duracao: Number.parseInt(test.duracao),
          descricao: test.descricao,
          done: test.done,
          fkTurma: test.fkTurma,
        }));
        const tempPendingTests = tests.filter((test) => !test.done);
        const tempDoneTests = tests.filter((test) => test.done);
        setPendingTests(tempPendingTests);
        setDoneTests(tempDoneTests);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const loadFeedback = async (idProva) => {
    await Axios.get('http://localhost:3001/test/feedbackAluno', {
      params: { email: localStorage.getItem('email'), idProva },
    })
      .then((response) => {
        setFeedback(response.data.data);
        handleModal();
      })
      .catch((error) => {
        console.log(error);
      });
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
            Dashboard: aluno
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
          <Box p={3}>
            <Button variant="contained" href="/Perfil" fullWidth>
              Mudar Senha
            </Button>
          </Box>

          {pendingTests.length ? (
            <Box
              mt={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={3}
            >
              <Typography color="red" fontWeight="600">
                Avaliações pendentes
              </Typography>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column}>
                          <Typography fontWeight="600">{column}</Typography>
                        </TableCell>
                      ))}
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pendingTests.map((test) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={test.id}
                      >
                        <TableCell key={`${test.id}-nome`}>
                          <Link href={`/RespondeProva?id=${test.id}`}>
                            {test.nome}
                          </Link>
                        </TableCell>
                        <TableCell key={`${test.id}-comeco`}>
                          {formatDateTime(test.horarioComeco)}
                        </TableCell>
                        <TableCell key={`${test.id}-duracao`}>
                          {formatTime(test.duracao)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : null}
          {doneTests.length ? (
            <Box
              mt={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={3}
            >
              <Typography color="red" fontWeight="600">
                Avaliações realizadas
              </Typography>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column}>
                          <Typography fontWeight="600">{column}</Typography>
                        </TableCell>
                      ))}
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {doneTests.map((test) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={test.id}
                      >
                        <TableCell key={`${test.id}-nome`}>
                          <Link
                            href={`#`}
                            onClick={() => {
                              loadFeedback(test.id);
                            }}
                          >
                            {test.nome}
                          </Link>
                        </TableCell>
                        <TableCell key={`${test.id}-comeco`}>
                          {formatDateTime(test.horarioComeco)}
                        </TableCell>
                        <TableCell key={`${test.id}-duracao`}>
                          {formatTime(test.duracao)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Modal
                open={openModal}
                onClose={handleModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  bgcolor="#fff"
                  color="white"
                  p={3}
                  position="absolute"
                  top="50%"
                  left="50%"
                  sx={{
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Typography fontWeight="600" color="#222">
                    Feedback
                  </Typography>
                  <Typography color="#222">Nota: {feedback.grade}</Typography>
                  {feedback.questions_resp.map((question, index) => (
                    <Box pt={2}>
                      <Typography color="#222" fontWeight={600}>
                        Questão {index + 1}
                      </Typography>
                      <Typography color="#222">{question.enunciado}</Typography>
                      {question.correct ? (
                        <Box pt={1}>
                          <Typography color="darkgreen">
                            Resposta correta
                          </Typography>
                          <Typography color="#222">
                            Sua resposta é: {question.correctAnswer}
                          </Typography>
                        </Box>
                      ) : (
                        <Box pt={1}>
                          <Typography color="red">Resposta errada</Typography>
                          <Typography color="#222">
                            A resposta correta é: {question.correctAnswer}
                          </Typography>
                          <Typography color="#222">
                            Sua resposta é: {question.userAnswer}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              </Modal>
            </Box>
          ) : null}
        </div>
      </div>
    </Box>
  );
};

export default Dashboard;
