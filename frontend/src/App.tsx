import './App.css'
import {CssBaseline, ThemeProvider} from "@mui/material";
import {defaultTheme} from "./assets/themes/defaultTheme.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router-dom";
import Game from "./components/game/Game.tsx";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeProvider theme={defaultTheme}>
                    <CssBaseline/> {/* Reset CSS */}
                    <Routes>
                        <Route path="/" element={<div>Home</div>}/>
                        <Route path="/game/:uuid" element={<Game/>}/>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
