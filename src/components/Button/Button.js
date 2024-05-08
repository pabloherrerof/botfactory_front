import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 0.375rem; 
  font-weight: 600;
  font-size: 0.75rem; 
  color: white; 
  text-transform: uppercase;
  letter-spacing: 0.1em; 
  background-color: #000; 
  padding: 0.5rem 1rem; 
  height: 40px;
  width: 200px;
  border: none;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out; // Tailwind transition ease-in-out duration-150

  &:hover {
    background-color: #1f2937; // Tailwind .hover:bg-gray-700
  }

  &:active {
    background-color: #111827; // Tailwind .active:bg-gray-900
  }

  &:focus {
    outline: none;
    border-color: #111827; // Tailwind .focus:border-gray-900
    box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.5); // Tailwind .ring .ring-gray-300
  }

  &:disabled {
    opacity: 0.25; // Tailwind .disabled:opacity-25
  }
`;

const Button = ({ type = 'submit', className = "", ...props }) => (
    <StyledButton type={type} className={className} {...props} />
);

export default Button;