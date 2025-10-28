import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import ProtectedRoute from "./components/ProtectedRoute";
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <div className='relative h-full w-full'>
      <div className='absolute inset-0 -z-10 h-screen w-full px-5 py-24 bg-[radial-gradient(125%_125%_at_50%_10%,_#000_60%,_#3b237d_100%)]' />

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='/note/:id' element={<NoteDetailPage />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App