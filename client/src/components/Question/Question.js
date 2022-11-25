import {
  Box,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React from 'react';

const Question = ({
  number,
  question,
  closedQuestion,
  alternatives,
  handleAnswer,
}) => {
  const setAnswer = (e) => {
    handleAnswer(e, number);
  };

  return (
    <Box my={3}>
      <Box mb={1} display="inline">
        <Typography color="red">{number}.</Typography>
        <Typography>{question}</Typography>
      </Box>
      {closedQuestion ? (
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={setAnswer}
          >
            <FormControlLabel
              value="a"
              control={<Radio />}
              label={alternatives.a}
            />
            <FormControlLabel
              value="b"
              control={<Radio />}
              label={alternatives.b}
            />
            {alternatives.c && (
              <FormControlLabel
                value="c"
                control={<Radio />}
                label={alternatives.c}
              />
            )}
            {alternatives.d && (
              <FormControlLabel
                value="d"
                control={<Radio />}
                label={alternatives.d}
              />
            )}
            {alternatives.e && (
              <FormControlLabel
                value="e"
                control={<Radio />}
                label={alternatives.e}
              />
            )}
          </RadioGroup>
        </FormControl>
      ) : (
        <TextField
          margin="normal"
          required
          fullWidth
          name="answer"
          label="Resposta"
          id="answer"
          multiline
          onChange={setAnswer}
          rows={5}
        />
      )}
    </Box>
  );
};

export default Question;
