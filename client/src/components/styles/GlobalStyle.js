import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  body {
    background-color: #f2f2f2;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`

export default GlobalStyle
