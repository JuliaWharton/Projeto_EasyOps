import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Link,
  Modal,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import themeDefault from '../../theme';
import { useRouter } from '../../hooks/useRouter';
import { formatDateTime, formatTime } from '../../utils/formatDateTime';

const theme = createTheme(themeDefault);

const initialTest = [
  {
    id: 0,
    nome: '',
    horarioComeco: new Date(),
    duracao: 0,
    descricao: '',
  },
];

const VisualizaTurma = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [tests, setTests] = useState(initialTest);
  const [newEmail, setNewEmail] = useState('');
  const columns = ['Email', 'Número USP', 'Opções'];
  const testColumns = ['Nome', 'Horário', 'Duração'];
  const feedbackColumns = ['Email', 'Nota'];
  const router = useRouter();
  const { id } = router.query;

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleFeedbackModal = () => {
    setFeedbackModalOpen(!feedbackModalOpen);
  };

  useEffect(() => {
    Axios.get('http://localhost:3001/class/listaAlunos', {
      params: { idTurma: id },
    })
      .then((response) => {
        setAlunos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:3001/test/listaTestTurma', {
      params: { turma: id },
    })
      .then((response) => {
        const formattedTests = response.data.data.map((test) => ({
          id: test.id,
          nome: test.nome,
          horarioComeco: new Date(test.horarioComeco),
          duracao: Number.parseInt(test.duracao),
          descricao: test.descricao,
        }));
        setTests(formattedTests);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addStudent = async () => {
    await Axios.get('http://localhost:3001/class/addstudent', {
      params: {
        email: newEmail,
        idClass: id,
      },
    })
      .then((response) => {
        alert(response.data.statusText);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeStudent = async (email) => {
    await Axios.delete('http://localhost:3001/class/removeUser', {
      params: {
        email,
        idClass: id,
      },
    })
      .then((response) => {
        alert(response.data.statusText);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFeedback = async (idProva) => {
    await Axios.get('http://localhost:3001/test/feedbackProfessor', {
      params: {
        idProva,
      },
    })
      .then((response) => {
        setFeedbacks(response.data.data.users_resp);
        setFeedbackModalOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Toolbar sx={{ pr: '24px' }}>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              Turma
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        style={{
          backgroundImage: 'url(/xa.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll',
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
        mt={8}
      >
        <Box
          style={{
            backgroundColor: 'white',
            marginLeft: '10px',
            marginTop: '2%',
            marginRight: '10px',
            bottom: 50,
            borderRadius: '10px',
          }}
        >
          <Container component="main">
            <CssBaseline />
            <Box
              mt={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography fontWeight="600" color="red">
                Alunos
              </Typography>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column}>{column}</TableCell>
                      ))}
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {alunos.map((aluno) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={aluno.id}
                      >
                        <TableCell key={`${aluno.id}-email`}>
                          {aluno.email}
                        </TableCell>
                        <TableCell key={`${aluno.id}-nusp`}>
                          {aluno.nusp}
                        </TableCell>
                        <TableCell key={`${aluno.id}-remove`} align="left">
                          <Link
                            href="#"
                            onClick={() => {
                              removeStudent(aluno.email);
                            }}
                            align="left"
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
          </Container>
          <Box
            justifyContent="center"
            p={2}
            display="flex"
            width="100%"
            gap={3}
          >
            <Button variant="contained" onClick={handleModal}>
              + Adicionar Aluno
            </Button>
            <Modal
              open={modalOpen}
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
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  align="center"
                  color="red"
                >
                  Cadastrar aluno
                </Typography>
                <Box sx={{ mt: 1 }} width="100%">
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    id="email"
                    type="email"
                    onChange={(e) => {
                      setNewEmail(e.target.value);
                    }}
                  />

                  <Button
                    onClick={addStudent}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Cadastrar
                  </Button>
                </Box>
              </Box>
            </Modal>
          </Box>
          <Box
            mt={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={3}
          >
            <Typography fontWeight="600" color="red">
              Avaliações
            </Typography>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {testColumns.map((column) => (
                      <TableCell key={column}>{column}</TableCell>
                    ))}
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tests.map((test) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={test.id}>
                      <TableCell key={`${test.id}-nome`}>{test.nome}</TableCell>
                      <TableCell
                        key={`${test.id}-horario`}
                        onClick={() => {
                          console.log(test);
                        }}
                      >
                        {formatDateTime(test.horarioComeco)}
                      </TableCell>
                      <TableCell key={`${test.id}-duracao`}>
                        {formatTime(test.duracao)}
                      </TableCell>
                      <TableCell key={`${test.id}-feedback`} align="left">
                        <Link
                          href="#"
                          onClick={() => {
                            getFeedback(test.id);
                          }}
                          align="left"
                        >
                          Feedback
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Modal
              open={feedbackModalOpen}
              onClose={handleFeedbackModal}
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
                <Typography fontWeight="600" color="red">
                  Avaliações
                </Typography>
                {feedbacks.length ? (
                  <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {feedbackColumns.map((column) => (
                            <TableCell key={column}>{column}</TableCell>
                          ))}
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {feedbacks.map((feedback) => (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={feedback.email}
                          >
                            <TableCell key={`${feedback.email}-email`}>
                              {feedback.email}
                            </TableCell>
                            <TableCell key={`${feedback.email}-nota`}>
                              {feedback.grade}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography color="black" mt={3}>
                    Não há respostas
                  </Typography>
                )}
              </Box>
            </Modal>
            <Box p={3}>
              <Button
                onClick={() => {
                  window.location.href = '/DashboardProfessor';
                }}
                variant="outlined"
              >
                Voltar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default VisualizaTurma;
