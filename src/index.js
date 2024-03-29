import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#618527"
    },
    secondary: {
      main: "#f89a20"
    },
  },
  status: {
    danger: 'orange',
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
//
// Add reCaptcha
const script = document.createElement("script")
script.src = "https://www.google.com/recaptcha/api.js?render=6Lc1z-kUAAAAADiKHTtebSZaGy48MYsWKf5Vkvud"
document.body.appendChild(script)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
