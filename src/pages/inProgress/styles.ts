import styled from 'styled-components'

export const InProgressContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  h1{
    color: ${(props)=>props.theme['red-light']};
  };

  h2{
    color: ${(props) => props.theme['blue']};
  };

  h3{
    color: ${(props) => props.theme['blue']};
  };
`