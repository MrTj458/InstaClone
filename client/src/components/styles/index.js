import styled from 'styled-components'

export const Button = styled.button`
  display: block;
  padding: 10px 20px;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  background: #3897f0;
  color: #fff;
  cursor: pointer;
  width: ${props => (props.fill ? '100%' : 'auto')};

  :active,
  :focus {
    outline: none;
  }
`

export const GhostButton = styled(Button)`
  background: 0;
  color: #000;
  padding: 0;
`

export const Input = styled.input`
  display: block;
  width: 100%;
  border: 1px solid #e3e3e3;
  background-color: #f2f2f2;
  font-size: 14px;
  border-radius: 2px;
  padding: 10px 20px;
  margin: 0;
  border-color: ${props => (props.error ? 'red' : '#e3e3e3')};
`

export const FormControl = styled.div`
  margin-bottom: 20px;
`
