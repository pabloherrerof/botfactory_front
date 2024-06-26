import styled from "styled-components";

const Input = ({ disabled = false, className = "", ...props }) => (
  <StyledInput disabled={disabled} className={className} {...props} />
);

export default Input;

const StyledInput = styled.input`
  transition: 0.3s;
  width: 100%;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: white !important;
  border: 1.5px solid #d1d5db;
  height: 35px;
  padding: 8px 12px;
  font-size: 16px;
  min-width: ${(props) => (props.minwidth ? props.minwidth : "200px")};

  &:focus {
    border-color: #4f46e5;
    outline: none;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.5);
  }
`;

export const FileInput = styled.input`
  transition: 0.3s;
  width: 100%;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: white !important;
  border: 1.5px solid #d1d5db;
  height: 40px;
  padding: 8px 12px;
  font-size: 16px;
  min-width: 250px;
  &:focus {
    border-color: #4f46e5;
    outline: none;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.5);
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;
  align-items: start;
  justify-content: center;
  margin-bottom: 0.6rem;
  width: 100%;

  &.last {
    margin-bottom: 1.5rem;
  }

  .range {
    background: #ddd;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    &:focus {
      opacity: 1;
      outline: unset;
      border-color: unset;
      box-shadow: unset;
    }
  }
`;
export const Select = styled.select`
  transition: 0.3s;
  width: 100%;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: white !important;
  border: 1.5px solid #d1d5db;
  height: 35px;
  padding: 6px 12px;
  font-size: 14px;
  min-width: ${(props) => (props.minwidth ? props.minwidth : "200px")};
  font-family: "Poppins", sans-serif;
  display: flex;
  align-items: center;
  &:focus {
    border-color: #4f46e5;
    outline: none;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.5);
  }
`;
