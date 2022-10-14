import React from 'react';
import styled from 'styled-components';
import { Formik, Form as FormikForm } from 'formik';

const StyledForm = styled(FormikForm)`
  display: flex;
  flex-direction: column;
`;

const Form = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  ...props
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    <StyledForm {...props}>{children}</StyledForm>
  </Formik>
);

export default Form;
