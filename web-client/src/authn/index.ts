import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const AUTH_URL = process.env.REACT_APP_AUTH_URL ?? ""
const CLIENT_ID = process.env.REACT_APP_AUTH_CLIENT_ID ?? ""
const RESPONSE_TYPE = "token"
const { protocol, hostname, port } = window.location
const REDIRECT_URI = `${protocol}//${hostname}${port ? ":" + port : ""}`
export const LOGIN_URL = `${AUTH_URL}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}`

export const STORAGE_KEY = "authn_data"

const checkAuthn = () => {
  const authnData = localStorage.getItem(STORAGE_KEY)
  return Boolean(authnData)
}

const clearHash = () => {
  window.location.href = "/"
}

const logout = () => {
  localStorage.removeItem(STORAGE_KEY)
  window.location.href = "/"
}

export const useAuthn = () => {
  const [init, setInit] = useState<boolean>(false)
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  useEffect(() => {
    setInit(true)
    if (!checkAuthn()) return setAuthenticated(false)
    setAuthenticated(true)
  }, [])

  const { hash = "" } = window.location
  const query = Object.fromEntries(
    hash
      .slice(1)
      .split("&")
      .map((p) => p.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  )
  const { access_token, id_token, token_type, expires_in, error_description } =
    query

  if (access_token || id_token || token_type || expires_in) {
    if (access_token && id_token && token_type && expires_in) {
      const authnData = { access_token, id_token, token_type, expires_in }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authnData))
    }
    clearHash()
  }

  useEffect(() => {
    if (!error_description) return
    toast(decodeURIComponent(error_description).replace(/\+/g, " ").trim())
    window.history.replaceState({}, "", "/")
  }, [error_description])

  return [init, authenticated, logout] as const
}
