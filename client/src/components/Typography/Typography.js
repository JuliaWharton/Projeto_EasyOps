import React from 'react';
import styled from 'styled-components';
import theme from '../../theme';

const Typography = ({
  component = 'span',
  weight = theme.typography[component].weight,
  size = theme.typography[component].size,
  variant = 'primary',
  children,
  ...props
}) => {
  const StyledTypography = styled(component)`
    font-family: Montserrat, Arial, sans-serif;

    ${({ weight, size, variant }) => `
        color: ${theme.colors.text[variant]};
        font-weight: ${weight};
        font-size: ${size}
    `}
  `;

  return (
    <StyledTypography
      component={component}
      weight={weight}
      size={size}
      variant={variant}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};

export default Typography;
