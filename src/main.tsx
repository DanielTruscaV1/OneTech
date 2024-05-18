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
import UserProfile from './components/UserProfile';

//Import the CSS file
import "./App.css";
import Problemset from './components/Problemset';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>
  },
  {
    path: "/sign-up",
    element: <SignUp/>
  },
  {
    path: "/problemset",
    element: <Problemset/>
  },
  {
    path: "/user-profile",
    element: <UserProfile/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
