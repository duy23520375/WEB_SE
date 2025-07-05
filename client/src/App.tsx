import './App.css';
import { BrowserRouter, useNavigate } from "react-router-dom";
import Sidebar from './components/Sidebar/Sidebar';
import AppRoutes from "./routes/AppRoutes.tsx";
import { ThemeProvider, CssBaseline, CircularProgress } from "@mui/material";
import theme from "./theme";
import { AuthProvider, useAuth } from './auth/AuthContext';

function AuthLayout() {
  return (
    <div className="fullScreenContainer">
      <AppRoutes />
    </div>
  );
}

function MainLayout() {
  return (
    <div className="appContainer">
      <Sidebar />

      <main className="content">
        <AppRoutes />
      </main>
    </div>
  );
}

function LayoutWrapper() {
  const { role, isInitialized } = useAuth();
  const navigate = useNavigate();

  if (!isInitialized) {
    return <CircularProgress />
  }

  if (!role) {
    navigate("/login");
  }

  return role ? <MainLayout /> : <AuthLayout />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <LayoutWrapper />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
