import './App.css'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {defaultTheme} from "./assets/themes/defaultTheme.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router-dom";
import Game from "./components/game/Game.tsx";
import axios from "axios";
import RouteGuard from "./components/RouteGuard.tsx";
import {AuthHeader} from "./components/AuthHeader.tsx";
import SecurityContextProvider from "./context/SecurityContextProvider.tsx";
import Home from "./components/home/Home.tsx";
import Lobby from "./components/lobby/Lobby.tsx";
import Friends from "./components/profile/Friends.tsx";
import LobbyList from "./components/lobby/LobbyList.tsx";
import Profile from "./components/profile/Profile.tsx";
import Users from "./components/admin/Users.tsx";
import AdminRouteGuard from "./components/AdminRouteGuard.tsx";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SecurityContextProvider>
                <BrowserRouter>
                    <ThemeProvider theme={defaultTheme}>
                        <CssBaseline/> {/* Reset CSS */}
                        <AuthHeader/>
                        <Routes>
                            <Route path="/" element={<RouteGuard component={<Home/>}/>}/>
                            <Route path="/:lobbyCode?" element={<RouteGuard component={<Home />} />} />
                            <Route path="/lobby/:uuid" element={<RouteGuard component={<Lobby/>}/>}/>
                            <Route path="/lobby" element={<RouteGuard component={<LobbyList/>}/>}/>
                            <Route path="/game/:uuid" element={<RouteGuard component={<Game/>}/>}/>
                            <Route path="/profile/friends" element={<RouteGuard component={<Friends/>}/>}/>
                            <Route path="/profile" element={<RouteGuard component={<Profile/>}/>}/>
                            <Route path="/admin/users" element={<RouteGuard component={<AdminRouteGuard component={<Users/>}/>}/>}/>
                        </Routes>
                    </ThemeProvider>
                </BrowserRouter>
            </SecurityContextProvider>
        </QueryClientProvider>
    )
}

export default App
