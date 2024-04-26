'use client'
import styled, { css } from 'styled-components'

export const UserStatusManagementCardContent = styled.div`
  flex: 1;
  gap: 16px;
  display: flex;
  padding: 24px;
  min-width: 570px;
  border-radius: 18px;
  flex-direction: column;
  background-color: ${(props) => props.theme['white']};  
`
export const UserStatusManagementCardSearchContent = styled.div`
  position: relative;

  input{
    width: 100%;
    border-radius: 12px;
    padding: 8px 8px 8px 35px;
    border: 1px solid ${(props) => props.theme['gray-light']};
  };

  .search-icon {
    top: 50%;
    left: 10px;
    position: absolute;
    transform: translateY(-50%);
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
      padding: 0 12px;
      font-size: 1.4rem;
      border-radius: 18px;
      color: ${(props) => props.theme['blue']};
      border: 1px solid ${(props) => props.theme['gray-light']};
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

      &:disabled{
        cursor: not-allowed;
        filter: brightness(0.8);
      };
  
      ${(props) => props.type === 'customer'
        ? css`
          &.associate{
            background-color: ${(props) => props.theme['purple']};
          };
          &.assistant{ 
            display: none;
          }`
        : css`
          background-color: ${(props) => props.theme['orange']};
          &.customer{
            display: none;
          }`
      };
    };
  };
`
export const UserStatusManagementCardTable = styled.table`
  width: 100%;

  border-collapse: separate;
  border-spacing: 0 12px;

  thead{
    tr{
      th{
        padding: 12px 0;
        text-align: left;
        font-size: 1.4rem;
        color: ${(props) => props.theme['gray-dark']};

        &:first-child{
          text-align: center;
          padding-left: 12px;
        };
      };
    };
  };
  
  tbody{
    tr{
      td{
        padding: 12px 0;
        margin-bottom: 12px;
        color: ${(props) => props.theme['blue-dark']};
        background-color: ${(props) => props.theme['gray']};
        
        &:first-child{
          text-align: center;
          padding-left: 12px;
          border-radius: 18px 0 0 18px;
        };
        
        &:last-child{
          width: 100px;
          border-radius: 0 18px 18px 0;
        };
        
        &.code-child{
          width: 70px;
        };
        
        &.name-child{
          width: 350px;
        };
      };
    };
  };
`
export const UserStatusManagementCardClean = styled.div`
  width: 100%;
  display: flex;
  margin-top: 48px;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  h1{
    color: ${(props)=>props.theme['blue-dark']};
  };

  h3{
    color: ${(props) => props.theme['gray-dark']};
  }
`