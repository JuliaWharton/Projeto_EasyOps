import React from 'react';
import styled, { css } from 'styled-components';
import theme from '../../theme';

const StyledButton = styled.button`
  padding: 10px 20px;
  font-family: Montserrat, Arial, sans-serif;
  font-size: 30px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  ${({ inverse, variant }) => css`
    background-color: ${inverse ? 'white' : theme.colors.default[variant]};
    color: ${inverse ? theme.colors.default[variant] : 'white'};

    :hover {
      background-color: ${inverse ? 'white' : theme.colors.hover[variant]};
      color: ${inverse ? theme.colors.hover[variant] : 'white'};
    }

    :active {
      background-color: ${inverse ? 'white' : theme.colors.active[variant]};
      color: ${inverse ? theme.colors.active[variant] : 'white'};
    }
  `}
`;

const Button = ({ children, type, variant = 'lighter', ...props }) => (
  <StyledButton type={type} variant={variant} {...props}>
    {children}
  </StyledButton>
);

export default Button;
