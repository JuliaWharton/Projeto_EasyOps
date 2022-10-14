import React from 'react';
import styled from 'styled-components';
import Typography from '../Typography';

const Link = ({ href, children, ...props }) => {
  const StyledLink = styled(Typography)`
    cursor: pointer;
    text-decoration: underline;
  `;

  return (
    <StyledLink component="a" href={href} {...props}>
      {children}
    </StyledLink>
  );
};

export default Link;
