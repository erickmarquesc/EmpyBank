import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html{
    font-size: 10px;
    -webkit-font-smootming: 'antialiased';
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }
  
  body {
    background: ${(props) => props.theme['gray']};
  }
  
  body, input, textarea, button, strong, select  {
    font-size: 1.6rem; //16px
  }

  button, select{
    &:hover{
      cursor: pointer;
    }
  }

  /* Estilos para a barra de rolagem */
  /* Largura da barra de rolagem */
  ::-webkit-scrollbar {
    width: 10px; /* Você pode ajustar a largura conforme necessário */
  }

  /* Rastreamento da barra de rolagem */
  ::-webkit-scrollbar-track {
    background: ${(props) => props.theme['gray']}; /* Cor de fundo */
  }

  /* Alça da barra de rolagem */
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme['base-blue']}; /* Cor da alça */
  }

  /* Alça da barra de rolagem ao passar o mouse */
  ::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
    filter: brightness(1.9);
  }

`