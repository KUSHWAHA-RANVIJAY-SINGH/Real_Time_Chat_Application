import { RouterProvider } from 'react-router-dom';
import './App.css';
import {router} from './router/Route.jsx'

function App() {

  return (
    // <Provider store={store}>
   <div className='h-screen flex items-center justify-center p-4   '>
    <RouterProvider router={router}/>
   </div>
  //  </Provider>
  )
}

export default App