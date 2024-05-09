import styled from "styled-components";

export const LoginContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LoginForm = styled.form`
    width: 450px;
    height: 517px;
    padding: 3rem 4rem;
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    gap: 1rem;
    justify-content: center;
    align-items: center;

    @media (max-width: 517px) {
        width: 300px;
        padding: 2rem 2rem;
    }

`

export const FormInfoContainer= styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: centert;
    text-align: center;
    
    h2{
        margin-bottom: 1.5rem;
    }

    @media (max-width: 517px) {
        width: 100%;
        h2{
            font-size: 1.2rem;
        }
    }

`

export const LoginButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`


export const ForgotPassword = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    gap: 5px;           
    p{
        font-size: 0.875rem;
    }

    a{
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        text-decoration: underline;
    }
`