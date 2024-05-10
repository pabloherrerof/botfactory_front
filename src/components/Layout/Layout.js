import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background: var(--background);
  background: var(--background-linear);
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  background-color: #f1f3f3;
  min-height: 100vh;
  padding: 200px 2rem;
  text-align: center;
  position: relative;
  

  h1{
    font-size: 40px;
    margin-bottom: 10px;
    max-width: 500px;
  }

  p{
    font-size: 18px;
    margin-bottom: 50px;
    max-width: 500px;
  }

  @media (max-width: 570px){

    h1{
      font-size: 40px;
      margin-bottom: 18px;
      max-width: 300px;
    }

    p{
      font-size: 16px;
      margin-bottom: 30px;
    }
  }

`;



