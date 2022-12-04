import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Icon,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

const initialValues = {
  question: '',
  closedQuestion: true,
  alternativesQuantity: 2,
  alternatives: {},
  correctAnswer: '',
};

const QuestionForm = ({ questionNumber, handleNumberQuestion }) => {
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    handleNumberQuestion(questionNumber, values);
  }, [values]);

  const handleCorrectAnswer = (e) => {
    setValues({ ...values, correctAnswer: e.target.value });
  };

  const handleChoicesQuantity = (e) => {
    setValues({
      ...values,
      alternativesQuantity: Number.parseInt(e.target.value),
    });
  };

  const handleQuestion = (e) => {
    setValues({ ...values, question: e.target.value });
  };

  const handleAlternatives = (e) => {
    setValues({
      ...values,
      alternatives: { ...values.alternatives, [e.target.name]: e.target.value },
    });
  };
  return (
    <Box component="form" sx={{ mt: 1 }} width="100%">
      <Typography color="red" fontSize="16px">
        Questão {questionNumber}
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        name="question"
        label="Questão"
        id="question"
        multiline
        onChange={handleQuestion}
        rows={5}
      />
      {/* <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Tipo de questão
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          id="questionType"
          onChange={handleQuestionType}
        >
          <FormControlLabel
            value="alternativa"
            control={<Radio />}
            label="Múltipla escolha"
          />
          <FormControlLabel
            value="dissertativa"
            control={<Radio />}
            label="Dissertativa"
          />
        </RadioGroup>
      </FormControl> */}
      {/* {values.closedQuestion && ( */}
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Número de alternativas
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="alternativesQuantity"
          value={values.alternativesQuantity}
          onChange={handleChoicesQuantity}
        >
          <FormControlLabel value="2" control={<Radio />} label="2" />
          <FormControlLabel value="3" control={<Radio />} label="3" />
          <FormControlLabel value="4" control={<Radio />} label="4" />
          <FormControlLabel value="5" control={<Radio />} label="5" />
        </RadioGroup>
      </FormControl>
      {/* )} */}
      {/* {values.closedQuestion && ( */}
      <Box>
        <TextField
          margin="normal"
          required
          fullWidth
          name="a"
          label="Alternativa A"
          id="alternativa-a"
          multiline
          onChange={handleAlternatives}
          rows={2}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="b"
          label="Alternativa B"
          id="alternativa-b"
          multiline
          onChange={handleAlternatives}
          rows={2}
        />
        {values.alternativesQuantity >= 3 && (
          <TextField
            margin="normal"
            required
            fullWidth
            name="c"
            label="Alternativa C"
            id="alternativa-c"
            multiline
            onChange={handleAlternatives}
            rows={2}
          />
        )}
        {values.alternativesQuantity >= 4 && (
          <TextField
            margin="normal"
            required
            fullWidth
            name="d"
            label="Alternativa D"
            id="alternativa-d"
            multiline
            onChange={handleAlternatives}
            rows={2}
          />
        )}
        {values.alternativesQuantity >= 5 && (
          <TextField
            margin="normal"
            required
            fullWidth
            name="e"
            label="Alternativa E"
            id="alternativa-e"
            multiline
            onChange={handleAlternatives}
            rows={2}
          />
        )}
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Alternativa correta
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleCorrectAnswer}
          >
            <FormControlLabel value="a" control={<Radio />} label="A" />
            <FormControlLabel value="b" control={<Radio />} label="B" />
            {values.alternativesQuantity >= 3 && (
              <FormControlLabel value="c" control={<Radio />} label="C" />
            )}
            {values.alternativesQuantity >= 4 && (
              <FormControlLabel value="d" control={<Radio />} label="D" />
            )}
            {values.alternativesQuantity >= 5 && (
              <FormControlLabel value="e" control={<Radio />} label="E" />
            )}
          </RadioGroup>
        </FormControl>
      </Box>
      {/* )} */}
    </Box>
  );
};

export default QuestionForm;
