import styled from 'styled-components'

export const WalletHeaderContent = styled.div`
  gap: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
   
  h1{
    font-size: 2.8rem;
    font-weight: 700;
    color: ${(props) => props.theme['blue-dark']};
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
        border: 1px solid ${(props) => props.theme['gray-light']};
      };
      
      
      option {
        padding: 12px;
        background-color: white;
        color: ${(props) => props.theme['blue-dark']};
      }

      button{
        border: none;
        display: flex;
        min-width: 54px;
        padding: 16px 4px;
        border-radius: 22px;
        align-items: center;
        justify-content: center;
        color: ${(props) => props.theme['white']};
        background-color: ${(props) => props.theme['blue']};
      };
    };
  };
`