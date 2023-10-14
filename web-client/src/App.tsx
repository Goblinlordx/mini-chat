import React from "react"
import "./App.css"
import { useAuthn } from "./authn"

function App() {
  const [init, authenticated, logout] = useAuthn()
  const href = `https://mini-chat-837930595040.auth.ap-northeast-2.amazoncognito.com/login?client_id=5sbp8j8fo8if1uqmkp9tunfg4g&response_type=token&redirect_uri=${encodeURIComponent(
    "http://localhost:8080"
  )}`
  if (!init) return null
  return (
    <div className="App">
      <h1>Mini Chat</h1>
      {authenticated ? (
        <button type="button" onClick={logout}>
          Logout
        </button>
      ) : (
        <a className="btn log" href={href}>
          Login
        </a>
      )}
    </div>
  )
}

export default App
