import {createBrowserRouter} from 'react-router-dom';
import HomePage from '../components/HomePage';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Chat from '../components/Chat';


export const router = createBrowserRouter([
    {
      path:"/",
      element:<HomePage/>
    },
    {
      path:"/login",
      element:<Login/>
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
