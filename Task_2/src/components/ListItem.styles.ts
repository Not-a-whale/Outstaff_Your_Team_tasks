import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: 2px solid ${props => props.color || '#000'};
  
  div {
    min-width: 50px;
    margin: .5rem;
  }
  
  div.plus {
    margin-top: 1.5rem;
    
    &:hover {
        cursor: pointer;
    }
  }

  p {
    flex: 1;
    padding: 1rem 1rem 0;
  }

  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
  }
`;
