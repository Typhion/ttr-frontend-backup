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
                            <Route path="/" element={<div>Home</div>}/>
                            <Route path="/game/:uuid" element={<RouteGuard component={<Game/>}/>}/>
                        </Routes>
                    </ThemeProvider>
                </BrowserRouter>
            </SecurityContextProvider>
        </QueryClientProvider>
    )
}

export default App
