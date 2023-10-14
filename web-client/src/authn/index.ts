import { useEffect, useState } from "react"

export const STORAGE_KEY = "authn_data"

const checkAuthn = () => {
  const id_token = localStorage.getItem(STORAGE_KEY)
  return Boolean(id_token)
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

  const { hash } = window.location
  if (hash) {
    const { access_token, id_token, token_type, expires_in } =
      Object.fromEntries(
        hash
          .slice(1)
          .split("&")
          .map((p) => p.split("="))
          .map(([k, v]) => [k, decodeURIComponent(v)])
      )
    if (access_token || id_token || token_type || expires_in) {
      if (access_token && id_token && token_type && expires_in) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ access_token, id_token, token_type, expires_in })
        )
      }
      clearHash()
    }
  }

  return [init, authenticated, logout] as const
}
