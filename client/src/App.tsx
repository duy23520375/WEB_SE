import './App.css';
import { BrowserRouter } from "react-router-dom";
import Sidebar from './components/Sidebar/Sidebar'
import AppRoutes from "./routes/AppRoutes.tsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reset style và áp font */}
      <BrowserRouter>
        <div className='appContainer'>
          <Sidebar />
          <main className='content'>
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
