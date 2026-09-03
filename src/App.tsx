import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import ErrorPage from "./pages/ErrorPage";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route errorElement={<ErrorPage />}>
        <Route path="/" element={<Login />}/>
        <Route path="/otp" element={<Otp />}/>

      
      </Route>
    </>
  )
)

function App() {
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App