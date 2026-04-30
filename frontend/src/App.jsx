import './App.css'
import { Route, Routes } from 'react-router'
import InverseProtectedRoute from './protectedRoutes/InverseProtectedRoute'
import ProtectedRoute from './protectedRoutes/ProtectedRoute'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast';
import UserRoutes from './protectedRoutes/UserRoutes'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import AppRoutes from './protectedRoutes/AppRoutes'
import AddTask from './pages/taskOperations/AddTask'

function App() {

  return (
    <div className="App">
      <Toaster />
      <Routes>

        <Route path='/' element={<UserRoutes/>}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>

        <Route path='/' element={<AppRoutes/>} >
          <Route index element={<Home />} />
          <Route path='/add-task' element={<AddTask />} />
        </Route>


      </Routes>
    </div>
  )
}

export default App
