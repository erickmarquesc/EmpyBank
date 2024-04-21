import styled, { css } from "styled-components";

interface IModalContainerProps{
  isOpen: boolean
}

export const ModalContainer = styled.div<IModalContainerProps>`
  background-color: rgba(0, 0, 0, 0.2); /* EAEDEE com 40% de transparência */
  position: absolute;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
  
  ${(props) => props.isOpen === true ? css`
    display: flex;
  `: props.isOpen === false && css`
    display: none;
  `};
`;

export const ModalContent = styled.div`
  padding: 14px;
  background-color: white;
  width: 800px;
  border-radius: 8px;

`

export const ModalFooter = styled.footer`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: end;
  gap: 24px;

  button{
    border: none;
    display: flex;
    padding: 12px;
    border-radius: 22px;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme['white']};
    background-color: ${(props) => props.theme['blue']};
  };
`

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h1{
    font-size: 2rem;
  };

  div{
    border: 1px solid ${(props) => props.theme['gray']};
    border-radius: 18px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;

    section{
      display: flex;
      flex-direction: column;
      gap: 12px;

      label{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 1.4rem;
        height: 26px;
        gap: 12px;

        strong{
          font-size: 1.2rem;
          color: ${(props) => props.theme['white']};
          background-color: ${(props) => props.theme['red-light']};
          padding: 6px;
          border-radius: 4px;
        }
      };
      
      input{
        width: 100%;
        border: 1px solid ${(props) => props.theme['gray']};
        font-size: 1.6rem;
        border-radius: 12px;
        padding: 12px;

      };
    }
  }
`