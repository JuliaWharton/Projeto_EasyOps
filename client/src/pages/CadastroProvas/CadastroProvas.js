import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import InputMask from 'react-input-mask';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import ptBRLocale from 'date-fns/locale/pt-BR';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import themeDefault from '../../theme';
import QuestionForm from '../../components/QuestionForm/QuestionForm';

const theme = createTheme(themeDefault);

const initialValues = {
  name: '',
  initialDate: new Date(),
  time: 0,
  class: '',
  questions: [
    {
      question: '',
      closedQuestion: true,
      correctAnswer: '',
      alternatives: {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
      },
    },
  ],
};

const CadastroProva = () => {
  const [values, setValues] = useState(initialValues);
  const [data, setData] = useState('');
  const [numberQuestions, setNumberQuestions] = useState(1);
  const [turmas, setTurmas] = useState([]);

  const setDataInicio = (e) => {
    setData(e);
    if (e !== 'Invalid Date') {
      const date = new Date(e);
      setValues({ ...values, initialDate: date });
    }
  };

  const handleNumberQuestions = (n) => {
    setNumberQuestions(n);
    const questions = values.questions;
    questions.length = n;
    setValues({ ...values, questions });
  };

  const handleClass = (e) => {
    setValues({ ...values, class: e.target.value });
  };

  const handleValue = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const setDuracao = (e) => {
    const duracao = e.target.value.replaceAll('_', '').split(':');
    console.log(duracao);
    const segundos =
      Number.parseInt(duracao[0] * 3600) +
      Number.parseInt(duracao[1] * 60) +
      Number.parseInt(duracao[2]);
    setValues({ ...values, time: segundos });
  };

  const handleNumberQuestion = (numberQuestion, value) => {
    const questions = values.questions;
    questions[numberQuestion - 1] = value;
    setValues({ ...values, questions: questions });
  };

  useEffect(async () => {
    await Axios.get(
      `http://localhost:3001/class/listaDoProfessor?email=${localStorage.getItem(
        'email',
      )}`,
    ).then((response) => {
      console.log(response);
      response.data.data && setTurmas(response.data.data);
    });
  }, []);

  const onSubmit = async (e) => {
    await Axios.post('http://localhost:3001/test/createTest', { prova: values })
      .then(function (response) {
        console.log(response);
        if (response.status == 401 || response.status == 400) {
          alert(response.statusText);
        } else {
          alert(response.data.statusText);
          window.location.href = '/DashboardProfessor';
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };

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
        <Box
          py={3}
          sx={{
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
            <Button
              onClick={() => {
                console.log(values);
              }}
            >
              Imprime
            </Button>
            <Box
              my={8}
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={3}
            >
              <Typography component="h1" variant="h5">
                Cadastro de Prova
              </Typography>
              <Box width="100%" display="flex" gap={3}>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={ptBRLocale}
                >
                  <TextField
                    fullWidth
                    required
                    onChange={handleValue}
                    label="Nome"
                    id="turmaEscolhida"
                    name="name"
                  ></TextField>
                  <DateTimePicker
                    label="Data Inicio"
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        sx={{ pb: 2, maxWidth: '200px' }}
                        required
                      />
                    )}
                    value={data}
                    onChange={setDataInicio}
                  />
                </LocalizationProvider>
                <InputMask mask="99:99:99" onChange={setDuracao}>
                  {() => (
                    <TextField
                      fullWidth
                      label="Duração"
                      sx={{ pb: 2, maxWidth: '100px' }}
                      required
                    />
                  )}
                </InputMask>

                <TextField
                  fullWidth
                  required
                  onChange={handleClass}
                  select
                  label="Turma(s)"
                  id="turmaEscolhida"
                  name="class"
                  multiple
                  sx={{ maxWidth: 300 }}
                >
                  {turmas.map((turma) => (
                    <MenuItem value={turma.id}>{turma.nome}</MenuItem>
                  ))}
                </TextField>
              </Box>
              {Array(numberQuestions)
                .fill(true)
                .map((_, index) => (
                  <QuestionForm
                    handleNumberQuestion={handleNumberQuestion}
                    questionNumber={index + 1}
                  />
                ))}
              <Box display="flex" gap={2}>
                <Button
                  onClick={() => {
                    handleNumberQuestions(numberQuestions + 1);
                  }}
                  variant="outlined"
                >
                  <AddIcon fontSize="large" /> Adicionar Questão
                </Button>
                <Button
                  onClick={() => {
                    handleNumberQuestions(numberQuestions - 1);
                  }}
                  disabled={numberQuestions <= 1}
                  variant="outlined"
                >
                  <RemoveIcon fontSize="large" /> Remover Questão
                </Button>
                <Button onClick={onSubmit} variant="contained">
                  Finalizar
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default CadastroProva;
