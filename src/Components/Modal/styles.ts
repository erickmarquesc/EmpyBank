'use client'
import styled, { css } from 'styled-components'

interface IModalContainerProps {
  isOpen: boolean,
}

export const ModalContainer = styled.div<IModalContainerProps>`
  width: 100vw;
  height: 100vh;
  position: absolute;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.2);
  
  z-index: 9999;
  
  ${(props) => props.isOpen === true ? css`
    display: flex;
  `: props.isOpen === false && css`
    display: none;
  `};
`

export const ModalContent = styled.div`
  width: 800px;
  padding: 14px;
  border-radius: 8px;
  background-color: white;
`

export const ModalFooter = styled.footer`
  gap: 24px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;

  button{
    border: none;
    display: flex;
    width: 255px;
    font-weight: 700;
    padding: 12px 24px;
    border-radius: 22px;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme['white']};
    background-color: ${(props) => props.theme['blue']};

    &:first-child{
      color: ${(props) => props.theme['gray-dark']};
      background-color: ${(props) => props.theme['gray']};
    }

    &:hover{
      cursor: pointer;
      filter: brightness(0.8);
    }
    &:disabled{
      cursor: not-allowed;
      filter: brightness(0.8);
    }

  };
`

export const ModalForm = styled.form`
  gap: 16px;
  display: flex;
  flex-direction: column;

  h1{
    font-size: 2rem;
    color: ${(props) => props.theme['blue-dark']};
  };

  div{
    gap: 24px;
    display: flex;
    padding: 24px;
    border-radius: 18px;
    flex-direction: column;
    border: 1px solid ${(props) => props.theme['gray']};

    section{
      gap: 12px;
      display: flex;
      flex-direction: column;

      label{
        gap: 12px;
        height: 26px;
        display: flex;
        font-size: 1.4rem;
        flex-direction: row;
        align-items: center;
        color: ${(props) => props.theme['blue-dark']};

        strong{
          padding: 6px;
          font-size: 1.2rem;
          border-radius: 4px;
          color: ${(props) => props.theme['white']};
          background-color: ${(props) => props.theme['red-light']};
        };
      };
      
      input{
        width: 100%;
        padding: 12px;
        font-size: 1.6rem;
        border-radius: 12px;
        border: 1px solid ${(props) => props.theme['gray']};
      };
    };
  };
`