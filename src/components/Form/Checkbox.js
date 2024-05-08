import styled from 'styled-components';

// Contenedor del bloque
const Container = styled.div`
  display: block;
  margin-top: 1rem; /* equivalente a mt-4 en Tailwind */
`;

// Estilos para el label
const StyledLabel = styled.label`
  display: inline-flex;
  align-items: center;
`;

// Estilos para el checkbox
const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  border-radius: 0.375rem; /* equivalente a rounded en Tailwind */
  border: 1px solid #d1d5db; /* equivalente a border-gray-300 en Tailwind */
  color: #6366f1; /* equivalente a text-indigo-600 en Tailwind */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* equivalente a shadow-sm en Tailwind */

  &:focus {
    border-color: #cbd5e1; /* equivalente a focus:border-indigo-300 en Tailwind */
    outline: none;
    ring: 2px; /* Anillo */
    ring-color: #c7d2fe; /* equivalente a focus:ring-indigo-200 en Tailwind */
    ring-opacity: 50%;
  }
`;

// Estilos para el texto del checkbox
const CheckboxLabel = styled.span`
  margin-left: 0.5rem; /* equivalente a ml-2 en Tailwind */
  font-size: 0.875rem; /* equivalente a text-sm en Tailwind */
  color: #ffffff; /* text-white en Tailwind combinado con text-gray-600 */
`;
