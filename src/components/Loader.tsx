import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    border: 2px solid var(--muted-foreground);
    border-left-color: transparent;
    border-radius: 50%;
  }

  .loader {
    border: 2px solid var(--muted-foreground);
    border-left-color: transparent;
    width: 20px;
    height: 20px;
    animation: spin89345 1s linear infinite;
  }

  @keyframes spin89345 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }`;

export default Loader;
