import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'

//Import the react-router-dom library
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//Import the components
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import Home from "./new_components/Home"
import Landing from "./new_components/Landing"
import UserProfile from './components/UserProfile';

//Import the CSS file
import "./App.css";
import Problemset from './new_components/Problemset';
import Rankings from './components/Rankings';
import Theory from './new_components/Theory';
import Problem from './new_components/Problem';
import Profile from './new_components/Profile';
import { AuthProvider } from './auth';
import RequireAuth from './requireAuth';
import CreatePost from './new_components/CreatePost';
import Article from './new_components/Article';
import Chat from './new_components/Chat';

const router = createBrowserRouter([
  {
    path: "/home",
    element: ( 
      <RequireAuth>
        <Home/>
      </RequireAuth>
    )
  },
  {
    path: "/chat/:follower_id",
    element: ( 
      <RequireAuth>
        <Chat/>
      </RequireAuth>
    )
  },
  {
    path: "/problem",
    element: ( 
      <RequireAuth>
        <Problem/>
      </RequireAuth>
    )
  },
  {
    path: "/",
    element: <Landing/>
  },
  {
    path: "/landing",
    element: <Landing/>
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/theory",
    element: ( 
      <RequireAuth>
        <Theory/>
      </RequireAuth>
    )
  },
  {
    path: "/article/:article_id",
    element: ( 
      <RequireAuth>
        <Article/>
      </RequireAuth>
    )
  },
  {
    path: "/problemset",
    element: ( 
      <RequireAuth>
        <Problemset/>
      </RequireAuth>
    )
  },
  {
    path: "/sign-in",
    element: <SignIn/>
  },
  {
    path: "/sign-up",
    element: <SignUp/>
  },
  {
    path: "/profile/:global_user_id",
    element: ( 
      <RequireAuth>
        <Profile/>
      </RequireAuth>
    )
  },
  {
    path: "/problem/:id",
    element: <Problem/>
  },
  {
    path: "/rankings",
    element: <Rankings/>
  },
  {
    path: "/user-profile",
    element: <UserProfile/>
  },
  {
    path: "/create_post",
    element: <CreatePost/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
