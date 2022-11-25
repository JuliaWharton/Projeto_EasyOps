import React, { useState } from 'react';
import Axios from 'axios';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Icon,
  Typography,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Countdown from 'react-countdown';
import themeDefault from '../../theme';
import Question from '../../components/Question/Question';

const theme = createTheme(themeDefault);

const initialValues = { 1: '' };

const MOCK_QUESTIONS = {
  time: 30,
  idAluno: 0,
  idProva: 0,
  questions: [
    {
      question:
        'A retomada da Antiguidade clássica pela perspectiva do patrimônio cultural foi realizada com o objetivo de:',
      closedQuestion: true,
      alternatives: {
        a: 'afirmar o ideário cristão para reconquistar a grandeza perdida.',
        b: 'utilizar os vestígios restaurados para justificar o regime político.',
        c: 'difundir os saberes ancestrais para moralizar os costumes sociais.',
        d: 'refazer o urbanismo clássico para favorecer a participação política.',
        e: 'recompor a organização republicana para fortalecer a administração estatal.',
      },
    },
    {
      question:
        'A retomada da Antiguidade clássica pela perspectiva do patrimônio cultural foi realizada com o objetivo de:',
      closedQuestion: true,
      alternatives: {
        a: 'afirmar o ideário cristão para reconquistar a grandeza perdida.',
        b: 'utilizar os vestígios restaurados para justificar o regime político.',
        c: 'difundir os saberes ancestrais para moralizar os costumes sociais.',
      },
    },
    {
      question:
        '“A Técnica de PCR tem inúmeras aplicações. Na clínica, por exemplo, é utilizado no diagnóstico de doenças infecciosas e na detecção de eventos patológicos raros. Na criminalística, um único fio de cabelo pode identificar o doador.” (O que é PCR? in www.madasa.com.br. Acesso em 17/outubro/2007). Esclareça por que a técnica de PCR (reação em cadeia da polimerase) e a técnica de hibridização, conjugadas, podem ser um método eficaz em medicina preventiva nos casos de detecção de anomalias genéticas.',
    },
  ],
};
const RespondeProva = ({
  time,
  idAluno,
  idProva,
  questions,
} = MOCK_QUESTIONS) => {
  const [answers, setAnswers] = useState(initialValues);

  const handleAnswer = (ev, questionNumber) => {
    setAnswers({ ...answers, [questionNumber]: ev.target.value });
  };
  const submitAnswers = () => {};

  const rendererTimer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      submitAnswers();
      return 'Tempo acabou!';
    } else {
      return (
        <Typography fontSize="20px" color="red">
          Tempo restante:{' '}
          {hours.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          :
          {minutes.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
          :
          {seconds.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </Typography>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div
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
      >
        <Box
          position="fixed"
          display="flex"
          alignItems="center"
          justifyContent="right"
          bgcolor="white"
          borderBottom="1px solid black"
          width="100%"
          height="50px"
          zIndex="1"
          px={3}
        >
          <Countdown
            date={Date.now() + MOCK_QUESTIONS.time * 1000}
            renderer={rendererTimer}
          />
        </Box>
        <div
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
            <Button
              onClick={() => {
                console.log(answers);
              }}
            >
              <br />
              Imprime
            </Button>
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
                  backgroundImage: 'url(/aa.png)',
                  backgroundSize: 'cover',
                  width: '70px',
                  height: '70px',
                  m: 1,
                }}
              />

              <Typography component="h1" variant="h5">
                Prova
              </Typography>
              <Box
                component="form"
                onSubmit={submitAnswers}
                sx={{ mt: 1 }}
                width="100%"
              >
                {MOCK_QUESTIONS.questions.map((question, index) => (
                  <Question
                    number={index + 1}
                    {...question}
                    handleAnswer={handleAnswer}
                  />
                ))}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Entregar prova
                </Button>
                <Grid item></Grid>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default RespondeProva;
