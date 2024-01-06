import './App.css'
import {defaultTheme} from "./assets/themes/defaultTheme.ts";
import {CssBaseline, ThemeProvider} from "@mui/material";
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
import LobbyList from "./components/lobby/LobbyList.tsx";
import ProfilePage from "./components/profile/ProfilePage.tsx";
import LobbyDisbanded from "./components/lobby/LobbyDisbanded.tsx";
import LeaderBoard from "./components/leaderboard/LeaderBoard.tsx";
import Users from "./components/admin/Users.tsx";
import AdminRouteGuard from "./components/AdminRouteGuard.tsx";
import {useState} from "react";
import Navigation from "./components/Navigation.tsx";
import About from "./components/about/About.tsx";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
const queryClient = new QueryClient()

function App() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <QueryClientProvider client={queryClient}>
            <SecurityContextProvider>
                <BrowserRouter>
                    <ThemeProvider theme={defaultTheme}>
                        <CssBaseline/> {/* Reset CSS */}
                        <AuthHeader onOpenDrawer={() => setDrawerOpen(!drawerOpen)}/>
                        <Navigation isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}></Navigation>
                        <Routes>
                            <Route path="/" element={<RouteGuard component={<Home/>}/>}/>
                            <Route path="/:lobbyCode?" element={<RouteGuard component={<Home />} />} />
                            <Route path="/lobby/:uuid" element={<RouteGuard component={<Lobby/>}/>}/>
                            <Route path="/lobby" element={<RouteGuard component={<LobbyList/>}/>}/>
                            <Route path="/lobby/disbanded" element={<RouteGuard component={<LobbyDisbanded/>}/>}/>
                            <Route path="/game/:uuid" element={<RouteGuard component={<Game/>}/>}/>
                            <Route path="/profile/:uuid" element={<RouteGuard component={<ProfilePage/>}/>}/>
                            <Route path="/profile" element={<RouteGuard component={<ProfilePage/>}/>}/>
                            <Route path="/leaderboard" element={<RouteGuard component={<LeaderBoard/>}/>}/>
                            <Route path="/admin/users" element={<RouteGuard component={<AdminRouteGuard component={<Users/>}/>}/>}/>
                            <Route path="/about" element={<About />}/>
                        </Routes>
                    </ThemeProvider>
                </BrowserRouter>
            </SecurityContextProvider>
        </QueryClientProvider>
    )
}

export default App
