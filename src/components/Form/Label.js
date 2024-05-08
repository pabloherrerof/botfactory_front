import styled from 'styled-components'

const Label = ({ children, ...props }) => (
    <LabelStyled {...props}>{children}</LabelStyled>
)

export default Label

const LabelStyled = styled.label`
    color: black;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.75rem;
    text-align: center;
`
