import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import ErrorPage from "./pages/ErrorPage";
import LoggedInLayout from "./layout/LoggedInLayout";
import Dashboard from "./pages/Dashboard";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route errorElement={<ErrorPage />}>
        <Route path="/" element={<Login />}/>
        <Route path="/otp" element={<Otp />}/>

        <Route element={<LoggedInLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
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