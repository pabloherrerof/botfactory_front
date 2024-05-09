import styled from 'styled-components';

export const CheckboxContainer = styled.div`
    display: flex;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  border-radius: 0.375rem; 
  border: 1px solid #d1d5db; 
  color: #6366f1; 
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); 

  &:focus {
    border-color: #cbd5e1; 
    outline: none;
  }
`;

