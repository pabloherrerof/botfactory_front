import styled from 'styled-components';

const ErrorMessage = styled.p`
  font-size: 0.875rem; 
  color: #b91c1c; 
`;

const InputError = ({ messages = [], className = '' }) => (
    <>
        {messages.length > 0 && (
            <>
                {messages.map((message, index) => (
                    <ErrorMessage className={className} key={index}>
                        {message}
                    </ErrorMessage>
                ))}
            </>
        )}
    </>
);

export default InputError;
