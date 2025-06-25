import React from "react";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <LoginPage />
        </AuthProvider>
    );
}

export default App;