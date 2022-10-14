import React from 'react';
import styled from 'styled-components';
import { Field as FormikField, ErrorMessage } from 'formik';
import theme from '../../theme';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 14px 0;
  font-family: Montserrat, Arial, sans-serif;
`;

const StyledInput = styled(FormikField)`
  background-color: ${theme.colors.input.background};
  padding: 5px 10px;
  font-size: 18px;
  color: ${theme.colors.input.text};
  border: none;
  font-family: inherit;
`;

const StyledLabel = styled.label`
  color: ${theme.colors.text.primary};
  font-size: 20px;
`;

const Input = ({ title, password, name, ...props }) => {
  return (
    <StyledContainer>
      <StyledLabel htmlFor={name}>{title}</StyledLabel>
      <StyledInput
        name={name}
        type={password ? 'password' : 'text'}
        className="form-field"
        {...props}
      />
      <ErrorMessage component="span" name={name} className="form-error" />
    </StyledContainer>
  );
};

export default Input;
