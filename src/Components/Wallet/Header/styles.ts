import styled from "styled-components"

export const WalletHeaderContent = styled.div`
  gap: 32px;
  display: flex;
  flex-direction: column;
   
  h1{
    font-size: 2.8rem;
  };

  section{
    gap: 8px;
    display: flex;
    max-width: 388px;
    flex-direction: column;
    
    label{
      font-size: 1.4rem;
    };

    div{
      gap: 8px;
      display: flex;

      select{
        padding: 12px;
        min-width: 388px;
        font-size: 1.6rem;
        border-radius: 12px;
      };

      button{
        border: none;
        display: flex;
        min-width: 54px;
        border-radius: 22px;
        align-items: center;
        justify-content: center;
        color: ${(props) => props.theme['white']};
        background-color: ${(props) => props.theme['blue']};
      };
    };
  };
`