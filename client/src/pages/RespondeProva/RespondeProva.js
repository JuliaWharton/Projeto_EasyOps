import React, { useEffect, useState } from 'react';
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
import { useRouter } from '../../hooks/useRouter';

const theme = createTheme(themeDefault);

const initialValues = {};
const initialTest = {
  idTest: 0,
  time: 300,
  questions: [],
};

const RespondeProva = () => {
  const [answers, setAnswers] = useState(initialValues);
  const [test, setTest] = useState(initialTest);

  const router = useRouter();
  const { id } = router.query;

  useEffect(async () => {
    await Axios.get('http://localhost:3001/test/loadTest', {
      params: { id: router.query.id },
    })
      .then((response) => {
        setTest(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAnswer = (ev, questionId) => {
    const newAnswers = answers;
    newAnswers[questionId] = ev.target.value;
    setAnswers(newAnswers);
  };
  const submitAnswers = async () => {
    const idAnswers = Object.keys(answers);
    const formatAnswers = idAnswers.map((idAnswer) => ({
      id: idAnswer,
      answer: answers[idAnswer],
    }));
    await Axios.get('http://localhost:3001/test/endTest', {
      params: {
        questions: formatAnswers,
        email: localStorage.getItem('email'),
        id,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          alert(
            `Prova entregue com sucesso, sua pontuação é de ${response.data.data.points}`,
          );
          window.location.href = '/Dashboard';
        }
      })
      .catch((error) => console.log(error));
  };

  const rendererTimer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      alert('Seu tempo acabou! Suas respostas serão enviadas!');
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
            date={Date.now() + test.time * 1000}
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
                {test.questions.map((question, index) => (
                  <Question
                    number={index + 1}
                    {...question}
                    closedQuestion={true}
                    handleAnswer={handleAnswer}
                  />
                ))}
                <Button
                  onClick={submitAnswers}
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
