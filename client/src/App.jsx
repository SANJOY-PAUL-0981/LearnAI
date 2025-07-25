import './App.css'
import { HomePage } from './pages/HomePage'
import { AuthPage } from './pages/AuthPage'
import { ChatPage } from './pages/ChatPage';
import ProtectedRoute from "./cmoponents/ProtectedRoute"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected route */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
