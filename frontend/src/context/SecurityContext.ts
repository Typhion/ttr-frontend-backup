import { createContext } from 'react'

export interface ISecurityContext {
    isAuthenticated: () => boolean
    isLoading: boolean
    loggedInUser: string | undefined
    loggedInUserId: string | undefined
    login: () => void
    logout: () => void
    isAdmin: () => boolean
}

export default createContext<ISecurityContext>({
    isAuthenticated: () => false,
    isLoading: true,
    loggedInUser: undefined,
    loggedInUserId: undefined,
    login: () => {},
    logout: () => {},
    isAdmin: () => false,
})
