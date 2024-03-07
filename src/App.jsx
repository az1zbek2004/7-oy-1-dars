import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './components/Home'
import Registr from './components/Registr'
import Login from './components/Login'
import './App.css'
import { useEffect, useState } from 'react'


function ProtectedRoute({children, redirectTo = '/login', isAuthenticated}) {
  const navigate = useNavigate()

  if (!isAuthenticated) {
    navigate(redirectTo);
  }

  return children;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    } else {
      setToken('')
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path='/registr' element={<Registr/>}/>
        <Route path='/login' element={<Login/>}/>

        <Route path='/' element={
          <ProtectedRoute isAuthenticated={token ? true : false}>
            <Home></Home>
          </ProtectedRoute>
        }></Route>
      </Routes>
    </>
  )
}

export default App
