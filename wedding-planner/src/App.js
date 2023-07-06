import "./App.css";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import HomePage from "./Pages/HomePage";
import GuestsPage from "./Pages/GuestsPage";
import TablesPage from "./Pages/TablesPage";
// import { loader as getUserLoader } from "./Pages/RootLayout";
import UserProvider from "./Store/userProvider";
import {SignUpForm} from "./Components/SignUpForm/SignUpForm"
import {LoginForm} from "./Components/LoginForm/LoginForm"
import { Redirect } from "react-router-dom";


function App() {

const isLoggedIn = localStorage.getItem("token") ? true : false;
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    // loader: getUserLoader,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/guests", element: <GuestsPage /> },
      { path: "/tables", element: <TablesPage /> },
      { path: "/signup",element: isLoggedIn ? <HomePage />  : <SignUpForm /> },
        { path: "/", element: isLoggedIn ? <HomePage />  : <LoginForm /> },

    ],
  },
]);

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
