import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f2f2f2;
    min-height: 100vh;
  }
`

export default GlobalStyle
