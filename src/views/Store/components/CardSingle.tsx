import React, { useEffect, useCallback, useContext, useState } from "react";
import styled from "styled-components";



export const StyledPepemonCard = styled.div<{ isLoaded: boolean }>`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  & {
    cursor: ${({ isLoaded }) => (isLoaded ? "pointer" : "not-allowed")};
  }
`;

export const StyledPepemonCardPrice = styled.span<{ styling?: string }>`
  & {
    background-color: ${(props) =>
      props.styling === "alt"
        ? props.theme.color.white
        : props.theme.color.black};
    color: ${(props) =>
      props.styling === "alt"
        ? props.theme.color.black
        : props.theme.color.white};
    font-family: ${(props) => props.theme.font.spaceMace};
    border-radius: 6px;
    display: inline-flex;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    padding: ${(props) => (props.styling === "alt" ? "" : "2px 8px")};
    font-size: ${(props) => (props.styling === "alt" ? "1rem" : ".8rem")};
    transform: ${(props) => (props.styling === "alt" ? "" : "translateY(40%)")};
    position: relative;
    z-index: 1;
  }

  & img {
    width: 1.8em;
  }
`;



export const StyledPepemonCardMeta = styled.dl`
  & {
    display: flex;
    font-family: ${(props) => props.theme.font.inter};
    justify-content: space-between;
    margin-bottom: 0;
    margin-top: 0;
  }

  & dt,
  dd {
    font-size: 0.8rem;
    margin-top: 0.5em;
  }

  & dt {
    color: ${(props) => props.theme.color.gray[300]};
    text-transform: uppercase;
    letter-spacing: 1.2px;
  }

  & dd {
    color: ${(props) => props.theme.color.gray[600]};
    font-weight: bold;
    text-align: right;
  }
`;


