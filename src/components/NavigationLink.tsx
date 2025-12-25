import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode,
  onClick?: () => void,
  className?: string
}

const NavigationLink = ({ children, onClick, className }: Props) => {
  return (
    <StyledWrapper>
      <button className="cta" onClick={onClick}>
        <span className={`hover-underline-animation ${className + "text-foreground after:bg-foreground"}`}>{children}</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cta {
    border: none;
    background: none;
    cursor: pointer;
  }

  .cta span {
    padding-bottom: 7px;
    text-transform: uppercase;
  }

  .hover-underline-animation {
    position: relative;
    padding-bottom: 20px;
  }

  .hover-underline-animation:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  .cta:hover .hover-underline-animation:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }`;

export default NavigationLink;