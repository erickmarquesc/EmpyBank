import styled from "styled-components"

export const ContainerGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 85px 1fr;
  grid-template-rows: 80px 1fr;
  grid-template-areas: 
  "sidebar header header"
  "sidebar content content"  
  "sidebar content content"; 

  .sidebar{
    display: grid;
    padding: 25px; 
    grid-area: sidebar;
    background-color: ${(props)=>props.theme['white']};

    box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.105);
    
    img{ 
      margin-bottom: 32px; 
    };

    .content{
      gap: 12px;
      display: flex;
      margin-top: auto;
      align-items: center;
      flex-direction: column;
    };

    menu{
      gap: 12px;
      display: flex;
      flex-direction: column;
 
      a{
        width: 36px;
        height: 36px;
        border: none;
        display: flex;
        border-radius: 8px;
        align-items: center;
        justify-content: center; 

        transition: all 1s ease-in-out;

        .icon{
          transition: all 1s ease-in-out;
          color: rgba(18, 25, 41, 0.64);
        };
        
        &:hover, :active, :focus{
          cursor: pointer;
          filter: brightness(0.8);
          background-color: ${(props) => props.theme['gray']};

          .icon{
            color: ${(props) => props.theme['blue']};
          };
        };
      };
    };
  };
`