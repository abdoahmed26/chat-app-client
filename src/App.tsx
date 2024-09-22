import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
// import GlobalPages from './pages/GlobalPages'
import ProctectPages from './pages/ProctectPages'
import ConfirmEmail from './pages/confirmEmail'
import ConfirmCode from './pages/confirmCode'
import ResetPassword from './pages/resetPassword'

function App() {

  return (
    <>
      <Routes>
        {/* <Route element={<GlobalPages />} > */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirmEmail" element={<ConfirmEmail />} />
          <Route path="/confirmCode" element={<ConfirmCode />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
        {/* </Route> */}
        <Route element={<ProctectPages />} >
          <Route path="/home/*" element={<Home />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
