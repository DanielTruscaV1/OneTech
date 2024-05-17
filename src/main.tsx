import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

//Import the react-router-dom library
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//Import the components
import App from './App';
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import Home from "./components/Home"
import Landing from "./components/Landing"

//Import the CSS file
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>
  },
  {
    path: "/sign-up",
    element: <SignUp/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
