import React from "react"
import "./App.css"
import { LOGIN_URL, useAuthn } from "./authn"

function App() {
  const [init, authenticated, logout] = useAuthn()
  if (!init) return null
  return (
    <div className="App">
      <h1>Mini Chat</h1>
      {authenticated ? (
        <button type="button" onClick={logout}>
          Logout
        </button>
      ) : (
        <a className="btn log" href={LOGIN_URL}>
          Login
        </a>
      )}
    </div>
  )
}

export default App
