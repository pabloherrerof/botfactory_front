import styled from "styled-components";

export const LogoContainer = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid transparent;
    background-image: linear-gradient(0deg, rgba(74,133,252,1) 3%, rgba(62,232,181,1) 65%);
    background-clip: padding-box;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); 

    svg{
        fill: white;
        font-size: 34px;
    }
`

