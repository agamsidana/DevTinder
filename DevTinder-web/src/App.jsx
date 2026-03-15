import {createBrowserRouter, RouterProvider} from "react-router-dom"
import RootLayot from "./components/RootLayout"
import Login from "./components/Login"
import Profile from "./components/Profile"
import {Provider} from 'react-redux'
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Connections from "./components/connections"
import Requests from "./components/requests"
import Premium from "./components/premium"



function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<RootLayot/>,
      children:[
        {path:'login',element:<Login/>},
        {path:'profile',element:<Profile/>},
        {path:'feed',element:<Feed/>},
        {path:'connections',element:<Connections/>},
        {path:'requests',element:<Requests/>},
        {path:'premium',element:<Premium/>}
      ]
    }
  ])
  return (
    <>
    <Provider store={appStore}>
      <RouterProvider router={router}/>
    </Provider>
    </>
  )
}

export default App
