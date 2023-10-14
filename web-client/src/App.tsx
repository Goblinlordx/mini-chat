import React from "react"
import "./App.css"
import { LOGIN_URL, useAuthn } from "./authn"

function App() {
  const [init, authenticated, logout] = useAuthn()
  // const href = `https://mini-chat-837930595040.auth.ap-northeast-2.amazoncognito.com/login?client_id=5sbp8j8fo8if1uqmkp9tunfg4g&response_type=token&redirect_uri=${encodeURIComponent(
  //   "https://mini-chat.dev-kat.com"
  // )}`
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
