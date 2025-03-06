import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login></Login>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/chat",
    element:<Chat/>
  }
])
function App() {

  return (
   <div className='h-screen flex items-center justify-center p-4   '>
    <RouterProvider router={router}/>
   </div>
  )
}

export default App
