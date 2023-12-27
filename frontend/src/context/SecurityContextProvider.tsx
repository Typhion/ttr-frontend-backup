import {ReactNode, useEffect, useState} from 'react'
import SecurityContext from './SecurityContext'
import {addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader} from '../services/AuthDataService.ts'
import {isExpired} from 'react-jwt'
import Keycloak from 'keycloak-js'
import {useCreateAccount} from "../hooks/userHooks/useCreateAccount.ts";

interface IWithChildren {
    children: ReactNode
}

const keycloakConfig = {
    url: import.meta.env.VITE_KC_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID,
    redirectUri: import.meta.env.VITE_REACT_APP_URL,
}
const keycloak: Keycloak = new Keycloak(keycloakConfig)

export default function SecurityContextProvider({children}: IWithChildren) {
    const [loggedInUser, setLoggedInUser] = useState<string | undefined>(undefined)
    const [loggedInUserId, setLoggedInUserId] = useState<string | undefined>(undefined)
    const createAccount = useCreateAccount()

    useEffect(() => {
        keycloak.init({ onLoad: 'check-sso' })
    }, [])

    keycloak.onAuthSuccess = () => {
        addAccessTokenToAuthHeader(keycloak.token)
        createAccount.mutate()
        setLoggedInUser(keycloak.idTokenParsed?.name)
        setLoggedInUserId(keycloak.idTokenParsed?.sub)
    }

    keycloak.onAuthLogout = () => {
        removeAccessTokenFromAuthHeader()
    }

    keycloak.onAuthError = () => {
        removeAccessTokenFromAuthHeader()
    }

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(-1).then(function () {
            addAccessTokenToAuthHeader(keycloak.token)
            setLoggedInUser(keycloak.idTokenParsed?.name)
            setLoggedInUserId(keycloak.idTokenParsed?.sub)
        })
    }

    function login() {
        keycloak.login()
    }

    function logout() {
        const logoutOptions = {redirectUri: import.meta.env.VITE_REACT_APP_URL}
        keycloak.logout(logoutOptions)
    }

    function isAuthenticated() {
        if (keycloak.token) return !isExpired(keycloak.token)
        else return false
    }

    function isAdmin() {
        if (keycloak.token) return keycloak.hasRealmRole('admin')
        else return false
    }

    return (
        <SecurityContext.Provider
            value={{
                isAuthenticated,
                loggedInUser,
                loggedInUserId,
                login,
                logout,
                isAdmin
            }}
        >
            {children}
        </SecurityContext.Provider>
    )
}
