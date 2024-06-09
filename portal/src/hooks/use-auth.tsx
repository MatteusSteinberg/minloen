import axios from "axios"
import _cloneDeep from "lodash/cloneDeep"
import React, { memo, useContext } from "react"
import useLocalStorage from "react-use/lib/useLocalStorage"
import { IOrganization } from "../../../interfaces/organization.interface"
import { IUser } from "../../../interfaces/user.interface"
import { IRequestData, requestWithBody, useAPI } from "./use-api"

interface IAuth {
  authenticate: (email: string, password: string) => Promise<{ error?: any }>
  unauthenticate: () => void
  updateMe: (user: Partial<IUser>) => Promise<IRequestData<IUser>>
  updateOrganization: (org: Partial<IOrganization>) => Promise<IRequestData<IOrganization>>
  organization?: IOrganization
  user?: IUser
  token?: string
}

interface IAuthToken {
  /** ISO string Date */
  expires: string
  token: string
}

const AuthContext = React.createContext<IAuth>({} as any)

export const useAuth = () => {
  return useContext<IAuth>(AuthContext)
}

const api = (process.env.REACT_APP_API || "") + "/api"

export const AuthProvider = memo(({ children }: { children: React.ReactNode }) => {
  const [token, setToken, clearToken] = useLocalStorage<string>("token")

  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common.Authorization
  }

  const { data, update, mutate, setData } = useAPI<IUser>({ url: "/user" })
  const organizationAPI = useAPI<IOrganization>({ url: "/organization", opts: { autoGet: !!token } })

  const authenticate = async (email: string, password: string) => {
    const result = await requestWithBody(`${api}/user/login`, "post", {
      email,
      password,
    })

    if (result?.data) {
      const token = (result.data as IAuthToken).token
      setToken(token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      await mutate()
    } else {
      return { error: result?.error }
    }

    return {}
  }

  const unauthenticate = async () => {
    clearToken()
    setData(undefined)
    delete axios.defaults.headers.common.Authorization
  }

  const updateMe = async (user: Partial<IUser>) => {
    setData(_cloneDeep(user))
    return await update(user)
  }

  const updateOrganization = async (org: Partial<IOrganization>) => {
    organizationAPI.setData(_cloneDeep(org))
    return await organizationAPI.update(org)
  }

  const contextValue = {
    user: data,
    authenticate,
    unauthenticate,
    updateMe,
    organization: organizationAPI.data,
    updateOrganization,
    token
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
})
