import styled from 'styled-components'

export const SidebarContainer = styled.div`
  position: fixed; /* Mantém a sidebar fixa */
  top: 0; /* Ajusta a posição superior */
  bottom: 0; /* Ajusta a posição inferior */

  display: flex;
  padding: 25px;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.105);
  background-color: ${(props) => props.theme["white"]};
  
  div{
    
    img {
      margin-bottom: 32px; 
    };

    menu {
      gap: 12px;
      display: flex;
      flex-direction: column;

      a {
        width: 36px;
        height: 36px;
        border: none;
        display: flex;
        border-radius: 8px;
        align-items: center;
        justify-content: center;
        transition: all 1s ease-in-out;

        .icon {
          transition: all 1s ease-in-out;
          color: rgba(18, 25, 41, 0.64);
        };

        &:hover, :active, :focus {
          cursor: pointer;
          filter: brightness(0.8);
          background-color: ${(props) => props.theme["gray"]};

          .icon {
            color: ${(props) => props.theme["blue"]};
          };
        };
      };
    };
  };
`

export const SidebarContentUserSection = styled.div`
  gap: 22px;
  display: flex;
  align-items: center;
  flex-direction: column;
`