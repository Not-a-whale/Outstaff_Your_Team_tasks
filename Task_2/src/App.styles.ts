import styled from "styled-components";

export const AppWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(320px, min-content));
  grid-template-rows: max-content max-content;
  align-items: start;
  justify-content: center;
  justify-items: center;
  column-gap: 10rem;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0 auto;
  `;