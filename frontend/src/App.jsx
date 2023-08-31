import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
// import PrivateRouter from "./Utils/PrivateRouter"
import { AuthProvider } from "./Context/AuthContext"
import Home from "./views/Home"
import Login from "./views/Login"
import Register from "./views/Register"
import Dashboard from "./views/Dashboard"
import Navbar from "./views/Navbar"


function App() {

  return (
    <Router>
      <AuthProvider> 
          <Navbar />
          <Routes>
            <Route  element={<Dashboard />} path='/dashboard' />
            <Route element={<Login />} path="/login"/>
            <Route element={<Register />} path="/register"/>
            <Route element={<Home />} path="/" />
          </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
