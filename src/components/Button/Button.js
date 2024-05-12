import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 0.375rem; 
  font-weight: 600;
  font-size: 1rem; 
  color: white; 
  text-transform: uppercase;
  letter-spacing: 0.1em; 
  background-color: ${props => props.color ? props.color : '#000'}; 
  padding: 0.5rem 1rem; 
  height: 45px;
  width: 200px;
  border: none;
  margin-top: 1.2rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out; 

  &:hover {
    background-color: #1f2937; 
  }

  &:active {
    background-color: #111827; 
  }

  &:focus {
    outline: none;
    border-color: #111827; // Tailwind .focus:border-gray-900
    box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.5); 
  }

  &:disabled {
    opacity: 0.25; 
  }
`;


const Button = ({type, ...props }) => (
    <StyledButton type={type} {...props} />
);

export default Button;

export const AddButton = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--background);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  padding: 1rem;
  border-radius: 5px;
  width: 40%;
  width: 200px;
  color: white;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  z-index: 0;

  &:hover {
    scale: 1.1;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    transition: 0.3s;
  }

  svg {
    font-size: 24px;
  }
`;



export const CardButton = styled.div`
  display: flex;
  background: ${props => props.color ? props.color : '#000'};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  width: ${props => props.size ? props.size : '40px'};
  height: ${props => props.size ? props.size : '40px'};
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  font-size: 10px;
  color: white;

  &:hover {
    scale: 1.1;
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    transition: 0.3s;
  }

  .icon{
    font-size: 20px;
    color: white;
    margin-bottom: 0;
  }
`;

export const DeleteButton = styled(CardButton)`
  width: 80px;
  font-size: 14px;

`
