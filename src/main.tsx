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
import Home from "./ComponentsV4/Home"
import Landing from "./new_components/Landing"
import UserProfile from './components/UserProfile';

//Import the CSS file
import "./App.css";
import Problemset from './ComponentsV4/Problemset';
import Rankings from './components/Rankings';
import Theory from './new_components/Theory';
import Problem from './new_components/Problem';
import Profile from './ComponentsV4/Profile';
import { AuthProvider } from './auth';
import RequireAuth from './requireAuth';
import CreatePost from './ComponentsV4/CreatePost';
import Article from './new_components/Article';
import Chat from './new_components/Chat';
import Settings from './ComponentsV4/Settings';

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
    path: "/settings",
    element: ( 
      <RequireAuth>
        <Settings/>
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
    path: "/problem/:problem_id",
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
