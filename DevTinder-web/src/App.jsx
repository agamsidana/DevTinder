import {createBrowserRouter, RouterProvider} from "react-router-dom"
import RootLayot from "./RootLayout"
import Login from "./Login"
import Profile from "./Profile"


function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<RootLayot/>,
      children:[
        {path:'login',element:<Login/>},
        {path:'profile',element:<Profile/>}
      ]
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
