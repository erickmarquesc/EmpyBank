import styled, { css } from "styled-components"

export const UserStatusManagementCardContent = styled.div`
  flex: 1;
  gap: 16px;
  display: flex;
  padding: 24px;
  min-width: 470px;
  border-radius: 18px;
  flex-direction: column;
  background-color: ${(props) => props.theme['white']};

  input{
    width: 100%;
  };
`
interface IUserStatusManagementCardHeaderProps{
  type: 'customer' | 'assistant',
}
export const UserStatusManagementCardHeader = styled.div<IUserStatusManagementCardHeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  section{
    gap: 16px;
    display: flex;
    align-items: center;
    flex-direction: row;

    h1, h2{
      font-size: 1.6rem;
    };

    ${(props) => props.type === 'customer' && (
     css`
      & h2, .assistant{
        display: none;
      };
    `)};

    ${(props) => props.type === 'customer'
    ? css`
        & h2, .assistant{
        display: none;
      };`
    : css`
        & .customer{
        display: none;
      };`
    };

    label{
      font-size: 1.4rem;
      color: ${(props) => props.theme['blue']};
    };
  };

  div{
    gap: 8px;
    display: flex;

    button{
      gap: 4px;
      border: none;
      display: flex;
      padding: 4px 16px;
      font-size: 1.2rem;
      border-radius: 18px;
      align-items: center;
      justify-content: center;
      color: ${(props) => props.theme['white']};
      background-color: ${(props) => props.theme['blue']};
  
      ${(props) => props.type === 'customer'
        ? css`
          &.vincular{
            background-color: ${(props) => props.theme['purple']};
          };
          &.assistant { 
            display: none;
          }`
        : css`
          background-color: ${(props) => props.theme['orange']};
          &.customer {
            display: none;
          }`
      };
    };
  };
`
export const UserStatusManagementCardTable = styled.table`
  width: 100%;
  border-spacing: 0 12px;
  border-collapse: separate;

  th, td {
    padding: 8px;
    text-align: left; 
    font-size: 1.4rem;
  };

  th {
    color: ${(props) => props.theme['gray-dark']};
  };

  tbody {
    tr {
      td {
        background-color: ${(props) => props.theme['gray']};
        color: ${(props) => props.theme['blue-dark']};
        &.first-child {
          width: 10%;
          border-radius: 18px 0 0 18px;

          :hover{
            cursor: pointer;
          };
        };

        &.last-child {
          width: 15%;
          border-radius: 0 18px 18px 0;
        };

        &.code-child {
          width: 10%;
        };
      };
    };
  };
`